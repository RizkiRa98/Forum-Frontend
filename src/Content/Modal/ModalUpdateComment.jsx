import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ModalUpdateComment({
  comment,
  setModalUpdateComment,
  userId,
  getComment,
  alertUpdateComment,
}) {
  const { id } = useParams();
  const [isiComment, setIsiComment] = useState("");
  const [msg, setMsg] = useState("");

  // Get Comment untuk di modal
  useEffect(() => {
    const getCommentById = async () => {
      await axios
        .get(`http://localhost:5000/post/${id}/comment/${comment}`)
        .then((response) => {
          setIsiComment(response.data.isiComment);
        });
    };
    getCommentById();
  }, [comment]);

  // Update Comment
  const updateComment = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/post/${id}/comment/${comment}`, {
        isiComment: isiComment,
      });
      setModalUpdateComment(false);
      alertUpdateComment();
      getComment();
      // navigate(0);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        setTimeout(() => {
          setMsg("");
        }, 7000);
        // navigate(0);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-dark bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto">
      <div className="w-[700px] flex flex-col sm:mr-0 sm:ml-0 mr-3 ml-3 top-0 z-99  overflow-y-auto max-h-full">
        <div className="bg-slate-100 p-5 rounded shadow-2xl overflow-y-auto z-auto">
          <div className="justify-end items-end">
            {/* Trigger Close Modal Button */}
            <p>{msg}</p>
            <button
              className="text-dark place-self-end justify-end items-end"
              onClick={() => setModalUpdateComment(false)}
            >
              <AiOutlineClose className="h-5 w-5" />
            </button>
          </div>
          <div className="flex justify-center">
            <h1 className="justify-center items-center text-3xl font-medium text-dark">
              Update Comment
            </h1>
          </div>
          <hr className="border-1 border-gray-300" />

          <div className="relative z-0 w-full mb-6 group">
            {/* FORM */}
            <form className="mt-5" onSubmit={updateComment}>
              {/* Button Post */}
              <textarea
                type="textarea"
                id="floating_textarea"
                className="shadow-lg min-h-mheight block p-2  w-[95%] text-gray-900 bg-transparent border-2  border-gray-600 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mt-10 text-justify text-md resize-none ml-2"
                placeholder=" "
                value={isiComment}
                onChange={(e) => setIsiComment(e.target.value)}
                required
              ></textarea>
              <label
                htmlFor="floating_textarea"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-10 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 ml-4"
              >
                Write a comment here..
              </label>

              {/* Button Comment */}

              {/* Button Comment */}
              <div className="flex justify-start items-end mt-5">
                <button className="text-white bg-button hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-regular rounded-lg text-sm h-8 px-5 py-2.5 inline-flex w-auto dark:bg-button  dark:hover:bg-buttonHover focus:outline-none dark:focus:ring-buttonHover text-center items-center justify-center transition-colors duration-300 ">
                  Update Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
