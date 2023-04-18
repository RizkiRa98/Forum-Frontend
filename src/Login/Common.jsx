// Component untuk menyimpan perubahan pada tampilan
import styled from "styled-components";

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;
export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const MutedLink = styled.a`
  font-size: 13px;
  color: rgba(200, 200, 200, 0.8);
  font-weight: 500;
  text-decoration: none;
  margin-top: 7px;
`;

export const BoldLink = styled.a`
  font-size: 12px;
  color: rgb(112, 126, 255);
  font-weight: 500;
  text-decoration: none;
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 0px 10px;
  border-bottom: 1.4px solid transparent;

  box-shadow: 0 0 5px rgba(15, 15, 15, 0.28);
  font-size: 14px;
  transition: all 200ms ease-in-out;

  &:: placeholder {
    color: rgba(200, 200, 200, 1);
  }

  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }

  &: focus {
    outline: none;
    border-bottom: 2px solid rgb(112, 126, 255);
  } ;
`;

export const InputLogin = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 0px 10px;
  border-bottom: 1.4px solid transparent;
  margin-top: 10px;

  box-shadow: 0 0 5px rgba(15, 15, 15, 0.28);
  font-size: 14px;
  transition: all 200ms ease-in-out;

  &:: placeholder {
    color: rgba(200, 200, 200, 1);
  }

  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }

  &: focus {
    outline: none;
    border-bottom: 2px solid rgb(112, 126, 255);
  } ;
`;

export const Select = styled.select`
  width: 100%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 0px 10px;
  border-bottom: 1.4px solid transparent;
  margin-top: 0;
  box-shadow: 0 0 5px rgba(15, 15, 15, 0.28);
  font-size: 14px;
  transition: all 200ms ease-in-out;

  &:: placeholder {
    color: rgba(200, 200, 200, 1);
  }

  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }

  &: focus {
    outline: none;
    border-bottom: 2px solid rgb(112, 126, 255);
  } ;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 11px 40%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  margin-top: 20px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: rgb(112, 126, 255);
  background: linear-gradient(
    90deg,
    rgba(112, 126, 255, 1) 20%,
    rgba(76, 86, 176, 1) 100%
  );
`;
