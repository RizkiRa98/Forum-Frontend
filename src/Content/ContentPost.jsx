import React, { useState, useEffect, Fragment } from "react";
import Navbar from "../Navbar/NavbarUser";
import Sidebar from "../Sidebar/Sidebar";
import LikeReply from "./Component/LikeReply";
import Comment from "./Component/Comment";
import Dropdown from "./Component/Dropdown";
import axios from "axios";
import { CgSpinner } from "react-icons/cg";
import { useParams, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";
import relativeTime from "dayjs/plugin/relativeTime";
import ModalDeletePost from "./Modal/ModalDelete";
import ModalDeleteComment from "./Modal/ModalDeleteComment";
import ModalUpdate from "./Modal/ModalUpdate";
import ModalUpdateComment from "./Modal/ModalUpdateComment";

dayjs().format();
dayjs.extend(relativeTime);

export default function ContentPost() {
  const { id, idForum } = useParams();
  const [post, setPost] = useState([]);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [postId, setPostId] = useState(`${id}`);
  const [role, setRole] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false);
  const [updateCommentAlert, setUpdateCommentAlert] = useState(false);
  const navigate = useNavigate();

  // useState Modal
  const [modalDelete, setModalDelete] = useState(false);
  const [modalComment, setModalComment] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalUpdateComment, setModalUpdateComment] = useState(false);

  // untuk post comment
  const [isiComment, setIsiComment] = useState("");

  // Untuk di Get di child component comment
  const [comment, setComment] = useState([]);

  // Handle alert jika berhasil delete comment
  const alertDeleteComment = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  // Handle alert jika berhasil delete comment
  const alertUpdatePost = () => {
    setUpdateAlert(true);
    setTimeout(() => {
      setUpdateAlert(false);
    }, 3000);
  };

  // Handle alert jika berhasil delete comment
  const alertUpdateComment = () => {
    setUpdateCommentAlert(true);
    setTimeout(() => {
      setUpdateCommentAlert(false);
    }, 3000);
  };

  // Decode jwt token
  const refrehToken = async () => {
    try {
      await axios.get("http://localhost:5000/token").then((response) => {
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setUserName(decoded.userName);
        setUserId(decoded.userId);
        setRole(decoded.roleId);
        setIsLogin(true);
        // setLogin(true);
      });
    } catch (error) {}
  };

  // Memanggil fungsi refresh token menggunakan Use Effect
  useEffect(() => {
    refrehToken();
  }, []);

  // get comment data dari API
  const getComment = async () => {
    const response = await axios.get(
      `http://localhost:5000/post/${id}/comment`
    );
    setComment(response.data);
    // console.log(response.data.id);
    return response.data;
  };

  // Call Method pada useEffect
  useEffect(() => {
    const dataCom = async () => {
      getComment().then((res) => {
        // console.log(res);
        setComment(res);
      });
    };
    dataCom();
  }, []);

  // Method untuk fetch data post berdasarkan id forum dan ID post
  const getPostById = async () => {
    try {
      await axios
        .get(`http://localhost:5000/forum/post/${idForum}/showPost/${id}`)
        .then((response) => {
          setLoading(true);
          setPost(response.data);
          // console.log(response.data);
        });
    } catch (error) {
      navigate("/PageNotFound");
    }
  };

  // Call Method pada useEffect
  useEffect(() => {
    getPostById();
    // console.log(getPostById);
  }, [isiComment, successMsg]);

  // Handle untuk Create Comment
  const createComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/post/${id}/comment`, {
        isiComment: isiComment,
        userId: userId,
        postId: postId,
      });

      setSuccessMsg("Komentar anda berhasil dikirim");
      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
      getComment();
      setIsiComment("");
      // navigate(0);
    } catch (error) {
      if (error.response) {
        setErrMsg(error.response.data.msg);
        setTimeout(() => {
          setSuccessMsg("");
        }, 3000);
        // navigate(0);
      }
    }
  };

  // Use Effect untuk auto close alert Error
  useEffect(() => {
    const errMsgTimer = setTimeout(() => {
      setErrMsg("");
    }, 3000);
    return () => clearTimeout(errMsgTimer);
  }, [errMsg]);

  // Use Effect untuk auto close alert Success
  useEffect(() => {
    const successMsgTimer = setTimeout(() => {
      setSuccessMsg("");
    }, 3000);
    return () => clearTimeout(successMsgTimer);
  }, [successMsg]);

  // Use Effect untuk auto close alert Delete Comment
  useEffect(() => {
    const alertMsgTimer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);
    return () => clearTimeout(alertMsgTimer);
  }, [showAlert]);

  // Use Effect untuk auto close alert Update Post
  useEffect(() => {
    const alertUpdateTimer = setTimeout(() => {
      setUpdateAlert(false);
    }, 3000);
    return () => clearTimeout(alertUpdateTimer);
  }, [updateAlert]);

  // Use Effect untuk auto close alert Update Comment
  useEffect(() => {
    const alertUpdateCommentTimer = setTimeout(() => {
      setUpdateCommentAlert(false);
    }, 3000);
    return () => clearTimeout(alertUpdateCommentTimer);
  }, [updateCommentAlert]);

  // Fungsi set id comment untuk delete
  const [idCommentForModal, setIdCommentForModal] = useState("");
  const deleteCommentModal = (id) => {
    setModalComment(true);
    setIdCommentForModal(id);
  };

  // Fungsi set id comment untuk update
  const [idCommentUpdate, setIdCommentUpdate] = useState("");
  const updateCommentModal = (id) => {
    setModalUpdateComment(true);
    setIdCommentUpdate(id);
  };

  return (
    <>
      {/* Call Modal */}
      {modalDelete && <ModalDeletePost setModalDelete={setModalDelete} />}
      {/* Modal Delete Comment */}
      {modalComment && (
        <ModalDeleteComment
          setModalComment={setModalComment}
          comment={idCommentForModal}
          alertDeleteComment={alertDeleteComment}
          getComment={getComment}
          userId={userId}
        />
      )}
      {/* Modal Update Post */}
      {modalUpdate && (
        <ModalUpdate
          setModalUpdate={setModalUpdate}
          post={post}
          getPostById={getPostById}
          alertUpdatePost={alertUpdatePost}
          userId={userId}
          setComment={setComment}
          comment={comment}
        />
      )}
      {/* Modal Update Comment */}
      {modalUpdateComment && (
        <ModalUpdateComment
          setModalUpdateComment={setModalUpdateComment}
          comment={idCommentUpdate}
          alertUpdateComment={alertUpdateComment}
          getComment={getComment}
          userId={userId}
        />
      )}
      // {/* // Navbar */}
      <Navbar />
      {/* // Sidebar */}
      <Sidebar />
      <div
        className="flex justify-center mt-14 sm:ml-14 mx-2
    "
      >
        {loading ? (
          <div className="grid grid-flow-row-dense grid-cols-1 grid-rows-1 justify-end sm:w-6/12 w-full">
            <div className="ml-2 text-md font-medium mt-6">
              Home/{post.forum.namaForum}/{post.judulPost}
            </div>
            <div className="grid grid-cols-1 gap-4 justify-end h-auto mt-2">
              <div className="flex justify-center shadow-lg">
                <div
                  className="bg-white border rounded-md h-auto shadow-lg w-full pb-2"
                  key={post.id}
                >
                  {/* Dropdown untuk postingan */}
                  {userId === post.user.id || role === "admin" ? (
                    <div className="flex justify-end -mb-5">
                      <Dropdown
                        setModalDelete={setModalDelete}
                        setModalUpdate={setModalUpdate}
                        role={role}
                        userId={userId}
                        postUserId={post.user.id}
                      />{" "}
                    </div>
                  ) : (
                    ""
                  )}

                  {/* Error/Success Message */}
                  {errMsg && (
                    <div className="flex justify-evenly">
                      <div className="absolute bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded  z-30 align-middle">
                        <strong className=" text-center font-bold text-sm">
                          {errMsg}
                        </strong>{" "}
                      </div>
                    </div>
                  )}
                  {/* Jika Berhasil Komentar
                   */}
                  {successMsg && (
                    <div className="flex justify-evenly ">
                      <div className=" bg-green-100  border border-green-400 text-green-700 px-4 py-3 rounded absolute z-10 items-center justify-items-end">
                        <strong className=" text-center font-bold text-sm">
                          {successMsg}
                        </strong>{" "}
                      </div>
                    </div>
                  )}

                  {/* Alert update post */}
                  {updateAlert && (
                    <div className="flex justify-evenly ">
                      <div className=" bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded absolute z-10 items-center justify-items-end">
                        <strong className=" text-center font-bold text-sm">
                          Update Post Berhasil
                        </strong>{" "}
                      </div>
                    </div>
                  )}

                  {/* Headers dan isi konten */}
                  <div className="flex items-center ml-10 mt-5 ">
                    {post.user && (
                      <div className="w-14 h-12 rounded-full overflow-hidden border-2 border-button">
                        <img
                          className="object-cover w-full h-full"
                          src={`http://localhost:5000/${post.user.foto}`}
                          alt="Profile User"
                        />
                      </div>
                    )}
                    <div className="flex flex-col ml-3 w-1/2">
                      <div className="text-lg text-dark font-medium">
                        {post.user && (
                          <>
                            Posted By {post.user.name}
                            {role && post.user.roleId === "admin" && (
                              <span className="text-xs text-green-500">
                                {" "}
                                {"("}
                                {post.user.roleId}
                                {")"}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                      {post.forum && (
                        <div className="text-xs">/{post.forum.namaForum}</div>
                      )}
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
                  <div className="flex items-center ml-12 mt-5 mb-5">
                    <div className="flex flex-col  w-[95%]">
                      <div className="text-lg font-semibold text-dark">
                        {post.judulPost}
                      </div>
                      <div className="text-sm mt-5 ">{post.isiPost}</div>
                    </div>
                  </div>

                  {/* Foto Postingan */}
                  {post.foto ? (
                    <div className="flex border-2 justify-center ml-12 mr-6">
                      <img
                        src={`http://localhost:5000/${post.foto}`}
                        alt="Image Post"
                      ></img>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* Like dan jumlah comment */}
                  <div className="mb-5 -ml-3">
                    <LikeReply
                      postId={post.id}
                      likes={post.likes.length}
                      userId={userId}
                      likeUser={post.likes}
                    />
                  </div>
                  {/* Text Area Untuk Comment */}
                  <div className="flex flex-col items-start ml-12 mt-5 mb-5">
                    <span className="text-xs text-gray-500 mb-3">
                      Comment As {userName}
                    </span>
                    <div className="relative z-0 w-full mb-6 group">
                      <form onSubmit={createComment}>
                        {isLogin ? (
                          <>
                            <textarea
                              type="textarea"
                              id="floating_textarea"
                              className="shadow-lg min-h-mheight block p-2  w-[95%] text-gray-900 bg-transparent border-2  border-gray-600 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mt-2 text-justify text-md resize-none"
                              placeholder=" "
                              value={isiComment}
                              onChange={(e) => setIsiComment(e.target.value)}
                              required
                            ></textarea>
                            <label
                              htmlFor="floating_textarea"
                              className="peer-focus:font-medium absolute text-sm ml-1  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Write a comment here..
                            </label>

                            {/* Button Comment */}
                            <div className="flex justify-start items-end mt-5">
                              <button className="text-white bg-button hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-regular rounded-lg text-sm h-8 px-5 py-2.5 inline-flex w-28 dark:bg-button  dark:hover:bg-buttonHover focus:outline-none dark:focus:ring-buttonHover text-center items-center justify-center transition-colors duration-300 ">
                                Comment
                              </button>
                            </div>
                            {/* Alert Update Comment */}
                            {updateCommentAlert && (
                              <div className=" flex justify-evenly ">
                                <div className=" bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded absolute z-10 items-center justify-items-end ">
                                  <strong className=" text-center font-bold text-sm">
                                    Update Comment Berhasil
                                  </strong>{" "}
                                </div>
                              </div>
                            )}
                            {/* Alert Delete Comment */}
                            {showAlert && (
                              <div className="flex justify-evenly ">
                                <div className=" bg-red-100  border border-red-400 text-red-700 px-4 py-3 rounded absolute z-10 items-center justify-items-end">
                                  <strong className=" text-center font-bold text-sm">
                                    Delete Comment Berhasil
                                  </strong>{" "}
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <textarea
                              type="textarea"
                              id="floating_textarea"
                              className="shadow-lg min-h-mheight block p-2  w-[95%] text-gray-900 bg-transparent border-2  border-gray-600 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mt-2 text-justify text-md resize-none rounded-lg"
                              placeholder=" "
                              value={isiComment}
                              onChange={(e) => setIsiComment(e.target.value)}
                              disabled
                            ></textarea>
                            <label
                              htmlFor="floating_textarea"
                              className="peer-focus:font-medium absolute text-sm ml-1  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Mohon Login Terlebih Dahulu
                            </label>
                          </>
                        )}
                      </form>
                      <hr className="h-px mt-8 mb-6 bg-gray-200 border-0 dark:bg-gray-700 w-[95%]" />

                      {/* Komponen Comment */}
                      <Comment
                        comment={comment}
                        userId={userId}
                        deleteCommentModal={deleteCommentModal}
                        updateCommentModal={updateCommentModal}
                      ></Comment>
                      <hr className="h-px mt-8 mb-6 bg-gray-200 border-0 dark:bg-gray-700 w-[95%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Jika Loading
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
        )}
      </div>
    </>
  );
}
