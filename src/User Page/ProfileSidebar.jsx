import React from "react";
import { AiOutlineHome, AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { MdPassword } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function ProfileSidebar({ uuid }) {
  return (
    <>
      <div className="sm:flex flex-col justify-start items-center h-96 bg-white p-10 -mt-2 ml-[10%] w-72 rounded-md collapse hidden sm:visible ">
        <div className="font-medium text-lg">Edit Profile</div>
        <hr className="border-1 w-full border-gray-300 mt-2" />
        <NavLink
          to="/"
          className={(navData) =>
            navData.isActive
              ? "inline-flex items-center justify-start pt-2 pb-2 w-full lg:text-base text-sm font-medium text-white rounded-lg bg-blue-400 mt-5"
              : "inline-flex items-center justify-start pt-2 pb-2 w-full lg:text-base text-sm font-medium text-gray-700 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-buttonHover dark:hover:bg-buttonHover dark:hover:text-white transition-colors duration-300 mt-5"
          }
        >
          <AiOutlineHome className="w-7 h-7 mr-3" />
          Home
        </NavLink>
        <hr className="border-1 w-full border-gray-300 mt-2" />
        <NavLink
          to={`/users/${uuid}`}
          className={(navData) =>
            navData.isActive
              ? "inline-flex items-center justify-start pt-2 pb-2 w-full lg:text-base text-sm font-medium text-white rounded-lg bg-blue-400 mt-5"
              : "inline-flex items-center justify-start pt-2 pb-2 w-full lg:text-base text-sm font-medium text-gray-700 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-buttonHover dark:hover:bg-buttonHover dark:hover:text-white transition-colors duration-300 mt-5"
          }
        >
          <AiOutlineUser className="w-7 h-7 mr-3" />
          Data User
        </NavLink>
        <NavLink
          to={`/users/changeEmail/${uuid}`}
          className={(navData) =>
            navData.isActive
              ? "inline-flex items-center justify-start pt-2 pb-2 w-full lg:text-base text-sm font-medium text-white rounded-lg bg-blue-400 mt-5"
              : "inline-flex items-center justify-start pt-2 pb-2 w-full lg:text-base text-sm font-medium text-gray-700 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-buttonHover dark:hover:bg-buttonHover dark:hover:text-white transition-colors duration-300 mt-5"
          }
        >
          <AiOutlineMail className="w-7 h-7 mr-3" />
          Change Email
        </NavLink>
        <NavLink
          to={`/users/changePassword/${uuid}`}
          className={(navData) =>
            navData.isActive
              ? "inline-flex items-center justify-start pt-2 pb-2 w-full lg:text-base text-sm font-medium text-white rounded-lg bg-blue-400 mt-5"
              : "inline-flex items-center justify-start pt-2 pb-2 w-full lg:text-base text-sm font-medium text-gray-700 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-buttonHover dark:hover:bg-buttonHover dark:hover:text-white transition-colors duration-300 mt-5"
          }
        >
          <MdPassword className="w-7 h-7 mr-3" />
          Change Password
        </NavLink>
      </div>
    </>
  );
}
