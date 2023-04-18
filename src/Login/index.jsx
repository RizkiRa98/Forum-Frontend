import React from "react";
import "../index.css";
import styled from "styled-components";
import { FormBox } from "./Form";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Container yang menampung login dan signup
export default function Login() {
  return (
    <AppContainer>
      <FormBox />
    </AppContainer>
  );
}
