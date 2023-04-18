import React, { useState, useEffect, Fragment } from "react";
import LikeReplyForPost from "./Component/LikeReplyForPost";
import axios from "axios";
import { IoCreateOutline } from "react-icons/io5";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import ModalPost from "../Sidebar/Component/ModalPost";
import Navbar from "../Navbar/NavbarUser";
import Sidebar from "../Sidebar/Sidebar";
import RightbarForum from "../Sidebar/RightbarForum";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";
import NotFoundImage from "../404 Not Found/404.png";
import relativeTime from "dayjs/plugin/relativeTime";
import { CgSpinner } from "react-icons/cg";
import InfiniteScroll from "react-infinite-scroll-component";
dayjs().format();
dayjs.extend(relativeTime);

export default function ContentByForum() {
  const navigate = useNavigate();
  const { idForum } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [postExist, setPostExist] = useState(true);
  // Method create post, hanya untuk yang sudah login saja
  const [token, setToken] = useState("");
  const [jmlhCommentPost, setJmlhCommentPost] = useState("");
  const [login, setLogin] = useState(false);
  const [tempId, setTempId] = useState(0);
  const [lastId, setLastId] = useState(0);
  const [limit, setLimit] = useState(8);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);

  // UseState Modal
  const [showModal, setShowModal] = useState(false);

  // Get Refresh Token
  const refrehToken = async () => {
    try {
      await axios.get("http://localhost:5000/token").then((response) => {
        const decoded = jwt_decode(response.data.accessToken);
        setToken(response.data.accessToken);
        setRole(decoded.roleId);
        setUserId(decoded.userId);
        setLoading(false);
        setLogin(true);
      });
    } catch (error) {}
  };

  // Memanggil fungsi refresh token menggunakan Use Effect
  useEffect(() => {
    refrehToken();
  }, []);

  // Method untuk fetch data
  const getPost = async () => {
    const response = await axios.get(
      `http://localhost:5000/forum/show/${idForum}?search_query=${keyword}`
    );

    setLoading(false);
    setPostExist(true);

    const newPost = response.data.result;
    setPost(newPost);
    setTempId(response.data.lastId);
    setHasMore(response.data.hasMore);
    // console.log(idForum);
  };

  // Call Method getPost pada useEffect
  useEffect(() => {
    setLoading(true); // mengatur loading ke true karena akan memuat data baru
    // membersihkan nilai variabel post

    getPost();
  }, [idForum, keyword]);

  // Fungsi fetchmore
  const fetchMore = () => {
    setLastId(tempId);
  };

  // Fungsi Search
  const searchDataByForumId = (e) => {
    e.preventDefault();
    if (query !== keyword) {
      setLastId(0);
      setPost([]);
    }
    setKeyword(query);

    // console.log(query);
  };

  // console.log(post && post.length > 0 && post[0].forum.namaForum);
  return (
    <>
      {/* Call Modal */}
      {showModal && <ModalPost setShowModal={setShowModal} getPost={getPost} />}
      // Navbar
      <Navbar
        setQueryByForumId={setQuery}
        queryByForumId={query}
        searchDataByForumId={searchDataByForumId}
      />
      // SideBar
      <Sidebar setShowModal={setShowModal} />
      <div
        className="flex justify-center mt-20 sm:ml-14 mx-2
    "
      >
        {loading ? (
          <>
            <div className="grid grid-flow-row-dense grid-cols-1 grid-rows-1 justify-end sm:w-6/12 w-full">
              <div className="grid grid-cols-1 gap-4 justify-end h-auto mt-2">
                <div className="flex justify-center shadow-lg">
                  <div className="bg-white border rounded-md h-auto shadow-lg w-full pb-2">
                    <div className="flex justify-center ">
                      <CgSpinner className="text-6xl animate-spin" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-flow-row-dense grid-cols-1 grid-rows-1 justify-end sm:w-6/12 w-full">
              {/* Create Post Button */}
              <div className="sm:collapse sm:hidden">
                {login ? (
                  <Fragment>
                    <div className="flex space-x-4 justify-start mt-5 sm:collapse">
                      <div className="justify-start relative mt-5 mb-5 w-72 sm:collapse">
                        <div className="absolute inset-y-0 left-2 flex items-center pl- pointer-events-none"></div>
                        <button
                          onClick={() => setShowModal(true)}
                          className="text-white bg-button hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-regular rounded-lg lg:text-lg text-sm h-12 px-5 py-2.5 inline-flex mr-auto4 w-full dark:bg-button  dark:hover:bg-buttonHover focus:outline-none dark:focus:ring-buttonHover text-center items-center transition-colors duration-300 sm:collapse"
                        >
                          <IoCreateOutline className="h-7 w-7 mr-2 -ml-1 sm:collapse" />
                          Create New Post
                        </button>
                      </div>
                    </div>
                    {/* <ModalPost /> */}
                  </Fragment>
                ) : (
                  <div className="sm:collapse">{null}</div>
                )}
              </div>
              {/* jika post exist munculkan post, jika tidak munculkan halaman postingan belum ada */}
              {post.length > 0 && postExist ? (
                <>
                  <RightbarForum />

                  <div className="ml-2 text-md font-medium ">
                    Home/{post && post.length > 0 && post[0].forum.namaForum}
                  </div>
                  <InfiniteScroll
                    dataLength={post.length}
                    next={fetchMore}
                    hasMore={hasMore}
                    loader={
                      <>
                        <div className="flex justify-center overflow-hidden ">
                          <CgSpinner className="text-6xl animate-spin" />
                        </div>
                      </>
                    }
                  >
                    <div>
                      <div className="grid grid-cols-1 gap-4 justify-end h-auto mt-2 ">
                        {/* Post */}
                        {post &&
                          post.map((post, user, index) => (
                            // console.log(post.forum.namaForum),
                            <div
                              className="flex justify-center shadow-lg"
                              key={post.id}
                            >
                              <div className="bg-white border rounded-md h-auto shadow-lg w-full ">
                                <NavLink
                                  to={`/forum/post/${post.forum.id}/showPost/${post.id}`}
                                >
                                  <div className="flex items-center ml-10 mt-2">
                                    <div className="w-14 h-12 rounded-full overflow-hidden border-2 border-button">
                                      <img
                                        className="object-cover w-full h-full"
                                        src={`http://localhost:5000/${post.user.foto}`}
                                        alt="Profile User"
                                      />
                                    </div>
                                    <div className="flex flex-col ml-3 w-1/2">
                                      <div className="text-lg text-dark font-medium">
                                        {post.user.name}
                                        {post.user.roleId === "admin" && (
                                          <label className="text-xs text-green-500">
                                            {" "}
                                            {"("}
                                            {post.user.roleId}
                                            {")"}
                                          </label>
                                        )}
                                      </div>
                                      <div className="text-xs">
                                        /{post.forum.namaForum}
                                      </div>
                                    </div>
                                    <div className="flex justify-end w-1/2 mr-10">
                                      <div className="flex right-0 text-sm text-gray-500">
                                        {dayjs().diff(
                                          dayjs(post.createdAt),
                                          "day"
                                        ) < 7
                                          ? dayjs(post.createdAt).fromNow()
                                          : dayjs(post.createdAt).format(
                                              "YY-MM-DD"
                                            )}
                                      </div>
                                    </div>
                                  </div>
                                  {/* Isi Post */}
                                  <div className="flex items-center ml-12 mt-4">
                                    <div className="flex flex-col ml-3 w-9/12">
                                      <div className="text-lg font-semibold text-dark">
                                        {post.judulPost}
                                      </div>
                                      <div className="text-xs break-words truncate">
                                        {post.isiPost}
                                      </div>
                                    </div>
                                  </div>
                                </NavLink>
                                {/* Like & Reply */}
                                <div className="mt-4 mb-5">
                                  <LikeReplyForPost
                                    setPost={setPost}
                                    postId={post.id}
                                    likesForum={post.likes.length}
                                    idForum={idForum}
                                    userIdForum={userId}
                                    likeUserForum={post.likes}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </InfiniteScroll>
                </>
              ) : (
                <>
                  <div className="h-auto w-[900px] flex items-center ml-16">
                    <div className="container flex flex-col md:flex-row items-center justify-center text-gray-700">
                      <div className="max-w-md">
                        <div className="text-5xl font-dark font-bold">
                          Oopps
                        </div>
                        <p className="text-2xl md:text-3xl font-light leading-normal">
                          Postingan pada forum ini belum ada.{" "}
                        </p>
                        <p className="mb-8">
                          Jangan khawatir, kau bisa menjadi yang pertama membuat
                          postingan pada forum ini. Ayo klik tombol Create Post
                          atau kembali ke Home
                        </p>

                        <NavLink
                          to={"/"}
                          className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700"
                        >
                          back to homepage
                        </NavLink>
                      </div>
                      <div className="max-w-lg">
                        <img
                          src={NotFoundImage}
                          alt="404 Image"
                          className="w-[400px]"
                        ></img>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
