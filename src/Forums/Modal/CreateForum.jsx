import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function CreateForum({
  setCreateForumModal,
  getForum,
  aCreateForum,
}) {
  // set animation InView
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // UseState Upload Post
  const [userId, setUserId] = useState("");
  const [namaForum, setNamaForum] = useState("");
  const [detail, setDetail] = useState("");
  const [icon, setIcon] = useState("");
  const [msg, setMsg] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  // Decode jwt token
  const refrehToken = async () => {
    try {
      await axios.get("http://localhost:5000/token").then((response) => {
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setUserId(decoded.userId);
      });
    } catch (error) {}
  };

  // Memanggil fungsi refresh token menggunakan Use Effect
  useEffect(() => {
    refrehToken();
  }, []);

  // Handle Untuk Save/Create Postingan
  const saveForum = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("namaForum", namaForum);
      formData.append("detail", detail);
      formData.append("icon", icon);

      await axios.post("http://localhost:5000/forum", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "multipart/form-data",
        },
      });

      aCreateForum();
      setCreateForumModal(false);
      getForum();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        setTimeout(() => {
          setMsg("");
        }, 3000);
      }
    }
  };

  // Handle perubahan file
  const handleFile = (e) => {
    const file = e.target.files[0];
    setIcon(file);
    setPreview(URL.createObjectURL(file));
  };

  // Use Effect untuk auto close alert Error
  useEffect(() => {
    const errMsgTimer = setTimeout(() => {
      setMsg("");
    }, 3000);
    return () => clearTimeout(errMsgTimer);
  }, [msg]);
  // Set limit pada input title
  const maxLength = 50; //Batas limit title
  const sisaChar = maxLength - namaForum.length; //jumlah karakter yang tersisa

  // Handle perubahan jumlah char
  const handleCharChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setNamaForum(e.target.value);
    }
  };

  return (
    <div className="fixed inset-0 bg-dark bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto">
      <div className="w-[700px] flex flex-col sm:mr-0 sm:ml-0 mr-3 ml-3 top-0 z-99  overflow-y-auto max-h-full">
        <div
          className="bg-slate-100 p-5 rounded shadow-2xl overflow-y-auto z-auto"
          ref={ref}
          style={{
            transform: isInView ? "none" : "translateY(-200px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.3s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
        >
          <div className="justify-end items-end">
            {/* Trigger Close Modal Button */}
            <button
              className="text-dark place-self-end justify-end items-end"
              onClick={() => setCreateForumModal(false)}
            >
              <AiOutlineClose className="h-5 w-5" />
            </button>
          </div>
          <div className="flex justify-center">
            <h1 className="justify-center items-center text-3xl font-medium text-dark">
              Create Forum
            </h1>
          </div>
          <hr className="border-1 border-gray-300" />
          {msg && (
            <div className=" bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <strong className=" text-center font-bold text-sm">{msg}</strong>{" "}
            </div>
          )}

          {/* FORM */}
          <form className="mt-5" onSubmit={saveForum}>
            {/* Input Nama Forum */}
            <div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  id="floating_title"
                  className="shadow-lg block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mt-6 text-justify text-md"
                  placeholder=" "
                  required
                  autoComplete="off"
                  value={namaForum}
                  onChange={(e) => setNamaForum(e.target.value)}
                  onInput={handleCharChange}
                ></input>
                <label
                  htmlFor="floating_title"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Nama Forum
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
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                required
              ></textarea>
              <label
                htmlFor="floating_textarea"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Detail mengenai forum
              </label>
            </div>

            {/* Upload Image */}
            <div className="flex flex-col justify-center items-start">
              {preview ? (
                <figure className="w-32 h-32 mb-3">
                  <img
                    src={preview}
                    alt="Preview Image"
                    className="w-32 h-32 mb-3"
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
                onChange={handleFile}
              />
              <p className="mt-1 text-sm text-gray-500" id="file_input_help">
                PNG, JPG (MAX. 10MB) (MIN. 50x50px).
              </p>

              {/* Button Post */}
              <div className="flex justify-end items-end mt-5">
                <button className="text-white bg-button hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-regular rounded-lg lg:text-lg text-sm h-8 px-5 py-2.5 inline-flex  dark:bg-button  dark:hover:bg-buttonHover focus:outline-none dark:focus:ring-buttonHover text-center items-center justify-center transition-colors duration-300 w-auto">
                  Create Forum
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
