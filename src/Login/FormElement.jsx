import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// Styled Component Untuk Form
export const BoxContainer = styled.div`
  width: 400px;
  min-height: 650px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
  margin-top: 20px;
`;

// Styled Component Untuk Container Bagian Atas
export const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;

// Styled Component Untuk Bagian Color yg di animasi
export const BackDrop = styled(motion.div)`
  width: 170%;
  height: 500px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(-10deg);
  top: -250px;
  left: -180px;
  background: rgb(112, 126, 255);
  background: linear-gradient(
    90deg,
    rgba(112, 126, 255, 1) 20%,
    rgba(76, 86, 176, 1) 100%
  );
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

export const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;

export const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

// Varian Backdrop untuk animasi saat tombol sign up atau login di tekan
export const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1000px",
    borderRadius: "20%",
    transform: "rotate(-10deg)",
  },
  collapsed: {
    width: "170%",
    height: "500px",
    borderRadius: "50%",
    transform: "rotate(-10deg)",
  },
};

// Control Kecepatan Transisi Animasi
export const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};
