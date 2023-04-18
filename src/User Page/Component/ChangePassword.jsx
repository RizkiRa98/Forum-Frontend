import React, { useEffect, useState } from "react";
import NavbarProfile from "../../Navbar/NavbarProfile";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ProfileSidebar from "../ProfileSidebar";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [foto, setFoto] = useState("");
  const [email, setEmail] = useState("");
  const [uuid, setUuid] = useState("");
  const [gender, setGender] = useState("");
  const [userName, setUserName] = useState("");
  const [roleId, setRoleId] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msgPassword, setMsgPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState("");
  const { id } = useParams();

  // Decode jwt token untuk get data user yang sedang login
  const refrehToken = async () => {
    try {
      await axios.get("http://localhost:5000/token").then((response) => {
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setUuid(decoded.uuid);
        setLoading(false);
        setLogin(true);
        // console.log(decoded.uuid);
      });
    } catch (error) {
      setLoading(false);
    }
  };

  // Memanggil refresh token menggunakan Use Effect
  useEffect(() => {
    refrehToken();
  }, []);

  // Get Post by forum & post ID
  useEffect(() => {
    const getUserById = async () => {
      try {
        await axios
          .get(`http://localhost:5000/users/${id}`)
          .then((response) => {
            setUserName(response.data.userName);
            setRoleId(response.data.roleId);
            setName(response.data.name);
            setEmail(response.data.email);
            setFoto(response.data.foto);
            setGender(response.data.gender);
            // console.log(response.data);
          });
      } catch (error) {
        navigate("/PageNotFound");
      }
    };
    getUserById();
  }, [id]);

  const updateProfile = async (e) => {
    e.preventDefault();
    if (password === confPassword) {
      try {
        const formData = new FormData();
        formData.append("password", password);
        formData.append("confPassword", confPassword);
        await axios.patch(`http://localhost:5000/users/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "multipart/form-data",
          },
        });
        setSuccessMsg("Password Berhasil Diubah");
        setPassword("");
        setConfPassword("");
      } catch (error) {
        if (error.response) {
          setErrMsg(error.response.data.msg);
          setTimeout(() => {
            setErrMsg("");
          }, 7000);
        }
      }
    } else {
      setMsgPassword("Password & Confirm Password Berbeda");
    }
  };

  // Use effect untuk alert success update
  useEffect(() => {
    const successMsgTimer = setTimeout(() => {
      setSuccessMsg("");
    }, 7000);
    return () => clearTimeout(successMsgTimer);
  }, [successMsg]);

  // Use effect untuk alert error update
  useEffect(() => {
    const errorMsgTimer = setTimeout(() => {
      setErrMsg("");
    }, 7000);
    return () => clearTimeout(errorMsgTimer);
  }, [errMsg]);

  // Use effect untuk alert password & conf berbeda
  useEffect(() => {
    const passwordMsgTimer = setTimeout(() => {
      setMsgPassword("");
    }, 7000);
    return () => clearTimeout(passwordMsgTimer);
  }, [msgPassword]);

  // Handle perubahan file
  const handleFile = (e) => {
    const file = e.target.files[0];
    setFoto(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <>
      <NavbarProfile />
      <div className="flex h-full w-full mt-24 ">
        <ProfileSidebar uuid={uuid} />
        <form
          onSubmit={updateProfile}
          className="rounded-md flex p-12 mt-6 bg-white h-full sm:w-[60%] w-[96%] ml-[2%]"
        >
          <div className="flex flex-col ml-[10%] w-[80%] ">
            <label className="text-2xl text-dark text-center mb-10">
              Ubah Password
            </label>
            {/* Message Alert */}
            {successMsg && (
              <div className="flex justify-evenly ">
                <div className=" bg-green-100  border border-green-400 text-green-700 px-4 py-3 rounded absolute z-10 items-center justify-items-end">
                  <strong className=" text-center font-bold text-sm">
                    {successMsg}
                  </strong>{" "}
                </div>
              </div>
            )}
            {errMsg && (
              <div className="flex justify-evenly ">
                <div className=" bg-red-100  border border-red-400 text-red-700 px-4 py-3 rounded absolute z-10 items-center justify-items-end">
                  <strong className=" text-center font-bold text-sm">
                    {errMsg}
                  </strong>{" "}
                </div>
              </div>
            )}

            {msgPassword && (
              <div className="flex justify-evenly ">
                <div className=" bg-red-100  border border-red-400 text-red-700 px-4 py-3 rounded absolute z-10 items-center justify-items-end">
                  <strong className=" text-center font-bold text-sm">
                    {msgPassword}
                  </strong>{" "}
                </div>
              </div>
            )}
            <div className="relative z-0 w-full mb-3 mt-3 group">
              <input
                type="password"
                id="floating_password"
                className="shadow-md block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mt-6 text-justify text-md rounded-md"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale- top-6 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
              >
                Password Baru
              </label>
            </div>

            <div className="relative z-0 w-full mb-3 mt-3 group">
              <input
                type="password"
                id="floating_confpassword"
                className="shadow-md block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mt-6 text-justify text-md rounded-md"
                placeholder=" "
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
              />
              <label
                htmlFor="floating_confpassword"
                className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale- top-6 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
              >
                Confirm Password Baru
              </label>
            </div>

            <button className="mt-5 h-10 w-48 text-white font-medium rounded-md bg-button hover:bg-buttonHover">
              Ubah Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
