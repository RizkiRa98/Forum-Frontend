import React from "react";
import { NavLink } from "react-router-dom";
import NotFoundImage from "./404.png";
import Caveman from "./caveman.gif";

export default function NotFoundPage() {
  return (
    <div className="h-screen w-screen bg-[#fff] flex items-center">
      <div className="container flex flex-col-reverse items-center justify-center px-5 text-gray-700">
        <div className="max-w-md flex-col text-center">
          <p className="text-2xl md:text-3xl font-light leading-normal">
            Opps page yang anda cari tidak ada.{" "}
          </p>
          <p className="mb-8 mt-2">
            Tapi jangan khawatir, kamu bisa mencari banyak hal di homepage kami
          </p>

          <NavLink
            to={"/"}
            className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700"
          >
            Back to Homepage
          </NavLink>
        </div>
        <div className="max-w-lg">
          <img
            src={Caveman}
            alt="404 Image"
            className=" z-1 w-[400px] justify-center items-center"
          ></img>
        </div>
        <div className="flex text-5xl font-dark font-bold">404</div>
      </div>
    </div>
  );
}
