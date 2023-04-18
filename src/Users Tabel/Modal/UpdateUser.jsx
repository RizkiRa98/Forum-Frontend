import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function UpdateUser({
  setUpdateUserModal,
  idUpdateUser,
  getUser,
  aUpdateUser,
}) {
  // set animation InView
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // UseState Upload Post
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const roles = ["user", "admin"];
  const [createdAt, setCreatedAt] = useState("");
  const [msg, setMsg] = useState("");
  const [token, setToken] = useState("");
  // Decode jwt token
  const refrehToken = async () => {
    try {
      await axios.get("http://localhost:5000/token").then((response) => {
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setUserId(decoded.userId);

        // console.log(decoded.roleId);
      });
    } catch (error) {}
  };
  // Memanggil fungsi refresh token menggunakan Use Effect
  useEffect(() => {
    refrehToken();
  }, []);

  // Get data forum by Id
  useEffect(() => {
    const getUserById = async () => {
      await axios
        .get(`http://localhost:5000/users/${idUpdateUser}`)
        .then((response) => {
          setName(response.data.name);
          setUserName(response.data.userName);
          setEmail(response.data.email);
          setRole(response.data.roleId);
          setCreatedAt(response.data.createdAt);
          // console.log(response.data);
        });
    };
    getUserById();
  }, [idUpdateUser]);
  console.log(idUpdateUser);

  // // Handle Untuk Save/Create Postingan
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("roleId", role);
      await axios.patch(
        `http://localhost:5000/users/${idUpdateUser}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "multipart/form-data",
          },
        }
      );
      aUpdateUser();
      setUpdateUserModal(false);
      getUser();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        setTimeout(() => {
          setMsg("");
        }, 7000);
      }
    }
  };

  // Use Effect untuk auto close alert Error
  useEffect(() => {
    const errMsgTimer = setTimeout(() => {
      setMsg("");
    }, 7000);
    return () => clearTimeout(errMsgTimer);
  }, [msg]);

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
              onClick={() => setUpdateUserModal(false)}
            >
              <AiOutlineClose className="h-5 w-5" />
            </button>
          </div>
          <div className="flex justify-center">
            <h1 className="justify-center items-center text-3xl font-medium text-dark">
              Update Role {name}
            </h1>
          </div>
          <hr className="border-1 border-gray-300" />
          {msg && (
            <div className=" bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <strong className=" text-center font-bold text-sm">{msg}</strong>{" "}
            </div>
          )}

          {/* FORM */}
          <form className="mt-5" onSubmit={updateUser}>
            {/* Input Nama Forum */}
            <div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="email"
                  id="floating_title"
                  className="shadow-lg block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mt-6 text-justify text-md"
                  placeholder=" "
                  required
                  disabled
                  value={email}
                ></input>
                <label
                  htmlFor="floating_title"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Disabled Email
                </label>
              </div>

              <span>Select Role For {name}</span>
              <select
                className="flex justify-start h-10 w-[50%]  border-collapse rounded-md  text-sm  py-2.5 px-0 text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer  text-justify text-md pl-4"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                // value={forumId}
                // defaultValue={forumId || (forums.length > 0 ? forums[0].id : "")}
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* Button Post */}
            <div className="flex justify-end items-end mt-5">
              <button className="text-white bg-button hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-regular rounded-lg lg:text-lg text-sm h-8 px-5 py-2.5 inline-flex  dark:bg-button  dark:hover:bg-buttonHover focus:outline-none dark:focus:ring-buttonHover text-center items-center justify-center transition-colors duration-300 w-auto">
                Update Forum
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
