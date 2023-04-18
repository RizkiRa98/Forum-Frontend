import React, { useContext, useEffect, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  Select,
  SubmitButton,
} from "./Common";
import { LoginContext } from "./LoginContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function SignUpForm(props) {
  const { PindahkeLogin } = useContext(LoginContext);
  const genderList = ["Pria", "Wanita"];
  // state untuk sign up
  const [username, setUserName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(genderList[0]);
  const [password, setPassword] = useState("");
  const [confPassword, setConfpassword] = useState("");
  const [roleId, setRoleId] = useState("user");
  const [foto, setFoto] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  // Handle Sign Up Submit
  const SignUp = async (e) => {
    e.preventDefault();
    // Validasi jika field tidak boleh kosong
    if (!username || !name || !email || !gender || !password || !confPassword) {
      setErrMsg("Data Tidak Boleh Kosong");
      return;
    }

    try {
      await axios.post("http://localhost:5000/users", {
        userName: username,
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        roleId: roleId,
        gender: gender,
        foto: foto,
      });
      setSuccessMsg("Registrasi Berhasil Silahkan Login");
      setUserName("");
      setName("");
      setEmail("");
      setPassword("");
      setConfpassword("");
      setTimeout(() => {
        setSuccessMsg("");
      }, 7000);
    } catch (error) {
      if (error.response) {
        setErrMsg(error.response.data.msg);
        setTimeout(() => {
          setErrMsg("");
        }, 7000);
      }
    }
  };

  // Use Effect untuk auto close alert Error
  useEffect(() => {
    const errMsgTimer = setTimeout(() => {
      setErrMsg("");
    }, 7000);
    return () => clearTimeout(errMsgTimer);
  }, [errMsg]);

  // Use Effect untuk auto close alert Success
  useEffect(() => {
    const successMsgTimer = setTimeout(() => {
      setSuccessMsg("");
    }, 7000);
    return () => clearTimeout(successMsgTimer);
  }, [successMsg]);
  return (
    <BoxContainer>
      <FormContainer>
        <form onSubmit={SignUp}>
          {/* Signup Error handling & Success Alert */}
          {/* Jika Error */}

          {errMsg && (
            <div className=" bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <strong className=" text-center font-bold text-sm">
                {errMsg}
              </strong>{" "}
            </div>
          )}
          {/* Jika Berhasil Sign Up
           */}
          {successMsg && (
            <div className=" bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              <strong className=" text-center font-bold text-sm">
                {successMsg}
              </strong>{" "}
            </div>
          )}
          <Input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            autoComplete="off"
          />
          <Input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
          <Select value={gender} onChange={(e) => setGender(e.target.value)}>
            {genderList.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </Select>
          <Input
            type="text"
            name="roleId"
            value={roleId === "user"}
            onChange={(e) => setRoleId(e.target.value)}
            readonly
            hidden
          />
          <Input
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <Input
            value={confPassword}
            onChange={(e) => setConfpassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
          />

          <Input
            hidden
            readonly
            id="file_input"
            type="file"
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
          />
          <SubmitButton
            type="submit"
            className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500 duration-300"
          >
            Sign Up{" "}
          </SubmitButton>
        </form>
      </FormContainer>
      <MutedLink href="#">
        Memiliki Akun ?
        <BoldLink href="#" onClick={PindahkeLogin}>
          Login
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
