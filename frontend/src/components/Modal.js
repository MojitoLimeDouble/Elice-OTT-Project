import axios from "axios";
import React from "react";
import tokenHeader from "../authorization/tokenHeader";
import { useHistory } from "react-router";
import styled from "styled-components";

export default function Modal({ setQuit }) {
  const history = useHistory();
  const onConfirm = (message = null, onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== "function") {
      return;
    }
    if (onCancel && typeof onCancel !== "function") {
      return;
    }

    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      } else {
        onCancel();
      }
    };

    return confirmAction;
  };

  const onQuit = () => {
    setTimeout(() => {
      window.localStorage.clear();
      history.push("/");
    }, 5000);
  };
  const deleteConfirm = async () => {
    try {
      const response = await axios.delete(`/api/mypage/delete/user`, {
        headers: tokenHeader(),
      });
      if (response.data.result === "success") {
        setQuit(true);
        onQuit();
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const cancelConfirm = () => console.log("취소했습니다.");
  const confirmDelete = onConfirm(
    "정말로 P🥔TCHA를 떠나시겠습니까?",
    deleteConfirm,
    cancelConfirm
  );

  return (
    <ButtonContainer className="App">
      <CustomButton onClick={confirmDelete}>회원 탈퇴</CustomButton>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  background-color: #ff0000ce;
  border-radius: 15px;
  box-shadow: 0 6px 12px -2px rgba(50, 50, 93, 0.25),
    0 3px 7px -3px rgba(0, 0, 0, 0.3);
`;

const CustomButton = styled.button`
  background: None;
  outline: None;
  border: None;
  font-size: 20px;
  font-family: NotoSansKR;
  font-weight: 500;
  margin: 5px;
  color: #fff;
`;
