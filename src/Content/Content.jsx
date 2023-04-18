import React, { useState, useEffect, Fragment, useRef } from "react";
import { useInView } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import LikeReplyForPost from "./Component/LikeReplyForPost";
import axios from "axios";
import { IoCreateOutline } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";
import ModalPost from "../Sidebar/Component/ModalPost";
import Navbar from "../Navbar/NavbarUser";
import Sidebar from "../Sidebar/Sidebar";
import Rightbar from "../Sidebar/Rightbar";
import jwt_decode from "jwt-decode";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs().format();
dayjs.extend(relativeTime);

export default function Content() {
  // set animation InView
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [post, setPost] = useState([]);
  const [postId, setPostId] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  // Method create post, hanya untuk yang sudah login saja
  const [token, setToken] = useState("");
  const [jmlhCommentPost, setJmlhCommentPost] = useState("");
  const [login, setLogin] = useState(false);
  const [role, setRole] = useState("");
  const [tempId, setTempId] = useState(0);
  const [lastId, setLastId] = useState(0);
  const [limit, setLimit] = useState(8);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [userLike, setUserLike] = useState([]);

  // UseState Modal
  const [showModal, setShowModal] = useState(false);

  // Get Refresh Token
  const refrehToken = async () => {
    try {
      await axios.get("http://localhost:5000/token").then((response) => {
        const decoded = jwt_decode(response.data.accessToken);
        setToken(response.data.accessToken);
        setUserId(decoded.userId);
        setRole(decoded.roleId);
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
      `http://localhost:5000/listPost?search_query=${keyword}&lastId=${lastId}&limit=${limit}`
    );
    const newPost = response.data.result;
    setPost([...post, ...newPost]);
    setTempId(response.data.lastId);
    setHasMore(response.data.hasMore);

    // console.log(response.data.result);
  };

  // Call Method getPost pada useEffect
  useEffect(() => {
    // const id = setInterval(() => {
    // }, 500);
    getPost();
    // return () => clearInterval(id);
  }, [lastId, keyword]);

  // Fungsi fetchmore
  const fetchMore = () => {
    setLastId(tempId);
  };

  // Fungsi Search
  const searchData = (e) => {
    e.preventDefault();
    if (query !== keyword) {
      setLastId(0);
      setPost([]);
    }
    setKeyword(query);
  };

  return (
    <>
      {/* Call Modal */}
      {showModal && <ModalPost setShowModal={setShowModal} getPost={getPost} />}
      // Navbar
      <Navbar setQuery={setQuery} query={query} searchData={searchData} />
      // SideBar
      <Sidebar setShowModal={setShowModal} />
      <Rightbar />
      <div
        className="flex justify-center mt-20 sm:ml-14 mx-2
    "
      >
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
          <div className="ml-2 text-md font-medium ">Home</div>
          {/* Infinite Scroll */}
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
            <div
              className="grid grid-cols-1 gap-4 justify-end h-auto mt-2 "
              ref={ref}
              style={{
                transform: isInView ? "none" : "translateY(200px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
              }}
            >
              {/* Post */}
              {post.map((post, user, index) => (
                <div className="flex justify-center shadow-lg" key={post.id}>
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
                          <div className="text-xs">/{post.forum.namaForum}</div>
                        </div>

                        <div className="flex justify-end w-1/2 mr-10">
                          <div className="flex right-0 text-sm text-gray-500">
                            {dayjs().diff(dayjs(post.createdAt), "day") < 7
                              ? dayjs(post.createdAt).fromNow()
                              : dayjs(post.createdAt).format("YY-MM-DD")}
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
                        postLikes={post.likes}
                        likes={post.likes.length}
                        getPost={getPost}
                        userId={userId}
                        likeUser={post.likes}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}
