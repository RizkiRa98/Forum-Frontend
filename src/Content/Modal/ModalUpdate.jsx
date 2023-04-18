import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ModalUpdatePost({
  setModalUpdate,
  getPostById,
  userId,
  alertUpdatePost,
}) {
  // UseState Upload Post
  const [judulPost, setJudulPost] = useState("");
  const [isiPost, setIsiPost] = useState("");
  const [forumId, setForumId] = useState("");
  const [forums, setForums] = useState([]);
  const [foto, setFoto] = useState("");
  const [msg, setMsg] = useState("");
  const [preview, setPreview] = useState("");
  const { id, idForum } = useParams();
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  // Method untuk fetch data
  const getForum = async () => {
    const response = await axios.get("http://localhost:5000/forums");
    setForums(response.data);
    if (response.data.length > 0) {
      setForumId(response.data[0].id);
    }
  };

  // Call Method pada useEffect untuk Get Forum
  useEffect(() => {
    getForum();
  }, []);

  // Get Post by forum & post ID
  useEffect(() => {
    const getPostById = async () => {
      try {
        await axios
          .get(`http://localhost:5000/forum/post/${idForum}/showPost/${id}`)
          .then((response) => {
            setJudulPost(response.data.judulPost);
            setIsiPost(response.data.isiPost);
            setForumId(response.data.forumId);
            setFoto(response.data.foto);
            // console.log(response.data);
          });
      } catch (error) {
        navigate("/PageNotFound");
      }
    };
    getPostById();
  }, [id]);
  // Handle Untuk Save/Create Postingan
  const updatePost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("judulPost", judulPost);
      formData.append("isiPost", isiPost);
      formData.append("forumId", forumId);
      formData.append("foto", foto);
      formData.append("userId", userId);
      await axios.patch(`http://localhost:5000/post/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "multipart/form-data",
        },
      });
      setModalUpdate(false);
      alertUpdatePost();
      getPostById();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        setTimeout(() => {
          setMsg("");
        }, 7000);
      }
    }
  };

  // Handle perubahan file
  const handleFile = (e) => {
    const file = e.target.files[0];
    setFoto(file);
    setPreview(URL.createObjectURL(file));
  };

  // Use Effect untuk auto close alert Error
  useEffect(() => {
    const errMsgTimer = setTimeout(() => {
      setMsg("");
    }, 7000);
    return () => clearTimeout(errMsgTimer);
  }, [msg]);

  // Set limit pada input title
  const maxLength = 50; //Batas limit title
  const sisaChar = maxLength - judulPost.length; //jumlah karakter yang tersisa

  // Handle perubahan jumlah char
  const handleCharChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setJudulPost(e.target.value);
    }
  };
  // console.log(userId, "-", forumId, "-", judulPost, "-", isiPost, "-", foto);
  return (
    <div className="fixed inset-0 bg-dark bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto">
      <div className="w-[700px] flex flex-col sm:mr-0 sm:ml-0 mr-3 ml-3 top-0 z-99  overflow-y-auto max-h-full">
        <div className="bg-slate-100 p-5 rounded shadow-2xl overflow-y-auto z-auto">
          <div className="justify-end items-end">
            {/* Trigger Close Modal Button */}
            <button
              className="text-dark place-self-end justify-end items-end"
              onClick={() => setModalUpdate(false)}
            >
              <AiOutlineClose className="h-5 w-5" />
            </button>
          </div>
          <div className="flex justify-center">
            <h1 className="justify-center items-center text-3xl font-medium text-dark">
              Update Post
            </h1>
          </div>
          <hr className="border-1 border-gray-300" />
          {msg && (
            <div className=" bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <strong className=" text-center font-bold text-sm">{msg}</strong>{" "}
            </div>
          )}

          {/* FORM */}
          <form className="mt-5" onSubmit={updatePost}>
            {/* Select Forum */}
            <span>Select Forum</span>
            <select
              className="flex justify-start h-10 w-[50%]  border-collapse rounded-md  text-sm  py-2.5 px-0 text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer  text-justify text-md pl-4"
              value={forumId}
              onChange={(e) => setForumId(e.target.value)}
              // value={forumId}
              // defaultValue={forumId || (forums.length > 0 ? forums[0].id : "")}
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
            >
              {forums.map((forum) => (
                <option key={forum.id} value={forum.id}>
                  {forum.namaForum}
                </option>
              ))}
            </select>

            {/* Input Judul */}
            <div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  id="floating_title"
                  className="shadow-lg block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mt-6 text-justify text-md"
                  placeholder=" "
                  required
                  value={judulPost}
                  onChange={(e) => setJudulPost(e.target.value)}
                  onInput={handleCharChange}
                ></input>
                <label
                  htmlFor="floating_title"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Title
                </label>
              </div>
              <span>
                {sisaChar}/{maxLength}
              </span>
            </div>

            {/* Text Area Isi Post*/}
            <div className="relative z-0 w-full mb-6 group">
              <textarea
                type="textarea"
                id="floating_textarea"
                className="shadow-lg min-h-mheight block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mt-6 text-justify text-md"
                placeholder=" "
                value={isiPost}
                onChange={(e) => setIsiPost(e.target.value)}
              ></textarea>
              <label
                htmlFor="floating_textarea"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                What do you want to discuss ?
              </label>
            </div>

            {/* Upload Image */}
            <div className="flex flex-col justify-center items-start">
              {preview ? (
                <figure className="w-auto h-32 mb-3">
                  <img
                    src={preview}
                    alt="Preview Image"
                    className="w-auto h-32 mb-3"
                  ></img>
                </figure>
              ) : (
                ""
              )}

              <input
                accept=".jpg,.jpeg,.png,.gif"
                className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 shadow-md"
                id="file_input"
                type="file"
                // onInput={(e) => handleFileChange(e)}
                // value={foto}
                onChange={handleFile}
              />
              <p className="mt-1 text-sm text-gray-500" id="file_input_help">
                PNG, JPG (MAX. 10MB).
              </p>

              {/* Button Post */}
              <div className="flex justify-end items-end mt-5">
                <button className="text-white bg-button hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-regular rounded-lg lg:text-lg text-sm h-8 px-5 py-2.5 inline-flex w-28 dark:bg-button  dark:hover:bg-buttonHover focus:outline-none dark:focus:ring-buttonHover text-center items-center justify-center transition-colors duration-300 ">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
