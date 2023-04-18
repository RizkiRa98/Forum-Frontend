import React, { useState } from "react";
import Navbar from "./Navbar/NavbarUser";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";
import ModalPost from "./Sidebar/Component/ModalPost";

export default function Home() {
  return (
    <React.Fragment>
      {/* Jika Buttom Modal di trigger maka tampilkan showModal */}
      {/* {showModal && <ModalPost setShowModal={setShowModal} />}

      <Navbar />
      <Content setShowModal={setShowModal} />

      <Sidebar setShowModal={setShowModal} /> */}
    </React.Fragment>
  );
}
