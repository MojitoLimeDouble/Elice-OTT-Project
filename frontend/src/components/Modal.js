import axios from "axios";
import React from "react";
import tokenHeader from "../authorization/tokenHeader";
import { useHistory } from "react-router";

export default function Modal({setQuit}) {
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
    <div className="App">
      <button onClick={confirmDelete}>회원 탈퇴</button>
    </div>
  );
}
