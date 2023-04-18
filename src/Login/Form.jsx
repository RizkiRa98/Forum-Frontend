import React, { useState } from "react";
// Import component yang sudah di style
import {
  BoxContainer,
  TopContainer,
  BackDrop,
  HeaderContainer,
  HeaderText,
  SmallText,
  InnerContainer,
  backdropVariants,
  expandingTransition,
} from "./FormElement";

import { LoginForm } from "../Login/Login";
import { LoginContext } from "./LoginContext";
import { SignUpForm } from "./Signup";
import Cover from "../assets/hardware.jpg";

export function FormBox(props) {
  //menjalankan animasi menggunakan useState
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("login");

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  //Pindah ke form sign up saat state active
  const PindahkeSignUp = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  //Pindah ke form sign up saat state active
  const PindahkeLogin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("login");
    }, 400);
  };

  // Context Value
  const ContextValue = { PindahkeSignUp, PindahkeLogin };
  return (
    <div className="w-full h-screen flex items-start scroll-smooth">
      {/* Left Side */}
      <div className="relative sm:w-1/2 w-0 h-full flex sm:flex-col flex-row xl:visible invisible">
        <div className="absolute top-[22%] left-[10%] flex flex-col bg-slate-600 bg-opacity-50 p-10">
          <h1 className="sm:text-7xl text-2xl sm:text-white text-gray-700 font-bold ">
            Unlocking
          </h1>
          <h1 className="sm:text-3xl text-xl sm:text-white text-gray-700  font-bold mt-3">
            The Power of Technology
          </h1>
          <p className="text-base sm:text-white  text-gray-700  font-semibold mt-2">
            <span className="text-base sm:text-white text-gray-700 font-semibold">
              Join the Hardware & Software Forum Community Today!
            </span>
          </p>
        </div>
        <img
          src={Cover}
          alt="Cover"
          className="w-full h-full sm:visible invisible object-cover"
        ></img>
      </div>
      {/* Right Side */}
      <div className="w-1/2 h-full flex flex-col lg:ml-48 sm:ml-30 ml-16">
        <LoginContext.Provider value={ContextValue}>
          <BoxContainer>
            <TopContainer>
              <BackDrop
                initial={false}
                animate={isExpanded ? "expanded" : "collapsed"}
                variants={backdropVariants}
                transition={expandingTransition}
              />

              {/* Jika yang aktif state Login maka tampilkan seperti dibawah */}
              {active === "login" && (
                <HeaderContainer>
                  <HeaderText>Welcome</HeaderText>
                  <HeaderText>Back</HeaderText>
                  <SmallText>Please Sign In To Continue</SmallText>
                </HeaderContainer>
              )}

              {/* Jika yang aktif state Signup maka tampilkan seperti dibawah */}
              {active === "signup" && (
                <HeaderContainer>
                  <HeaderText>Create</HeaderText>
                  <HeaderText>Account</HeaderText>
                  <SmallText>Please Sign Up To Continue</SmallText>
                </HeaderContainer>
              )}
            </TopContainer>

            <InnerContainer>
              {active === "login" && <LoginForm />}
              {active === "signup" && <SignUpForm />}
            </InnerContainer>
          </BoxContainer>
        </LoginContext.Provider>
      </div>
    </div>
  );
}
