import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../Features/AuthSlice";
// import component yang sudah di style
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  InputLogin,
  MutedLink,
  SubmitButton,
} from "./Common";
import { LoginContext } from "./LoginContext";

export function LoginForm(props) {
  const { PindahkeSignUp } = useContext(LoginContext);
  // State Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // ambil value dari redux store
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  // useEffect user yang digunakan ada
  // Jika tidak ada maka reset
  useEffect(() => {
    if (user || isSuccess) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  // Handle Submit
  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <BoxContainer>
      {isError && (
        <div className=" bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className=" text-center font-bold text-sm">{message}</strong>{" "}
        </div>
      )}
      <FormContainer>
        <form onSubmit={Auth}>
          {/* Login Error handling */}

          <InputLogin
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputLogin
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <BoldLink className="cursor-pointer text-button">
            Lupa Password ?
          </BoldLink>
          <SubmitButton
            type="submit"
            className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-x-105 hover:bg-indigo-500 duration-300"
          >
            {isLoading ? "Loading..." : "Login"}{" "}
          </SubmitButton>
        </form>
      </FormContainer>
      <MutedLink>
        Belum Memiliki Akun ?
        <BoldLink
          className="cursor-pointer text-button"
          onClick={PindahkeSignUp}
        >
          Sign Up
        </BoldLink>
      </MutedLink>
      <div className="flex space-x-4 justify-center mt-5">
        <div className="relative mt-5 mb-5 w-full">
          <div className="absolute inset-y-0 left-2 flex items-center pl- pointer-events-none"></div>
          <NavLink
            to="/"
            className="text-button bg-white hover:bg-blue-400 focus:ring-2 focus:ring-blue-300 font-regular rounded-full lg:text-md text-sm h-12 px-5 py-2.5 inline-flex mr-auto4 w-full dark:bg-white  dark:hover:bg-gray-200 focus:outline-none dark:focus:ring-buttonHover text-center items-center transition-colors duration-300 border-2 border-buttonHover font-semibold justify-center "
          >
            Back To Home
          </NavLink>
        </div>
      </div>
    </BoxContainer>
  );
}
