import axios from "axios";
import React from "react";
import tokenHeader from "../authorization/tokenHeader";

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
const deleteConfirm = async () => {
  try {
    const response = await axios.delete(`/api/mypage/delete/user`, {
      headers: tokenHeader(),
    });
      if (response.data.result === "success") {
          alert("다음에 또 찾아주세요.")
          
      }
  } catch (error) {
    console.log(error.response);
  }
};
const cancelConfirm = () => console.log("취소했습니다.");
const confirmDelete = onConfirm(
  "정말로 회원 탈퇴 하시곘습니까?",
  deleteConfirm,
  cancelConfirm
);
export default function Modal() {
  return (
    <div className="App">
      <button onClick={confirmDelete}>회원 탈퇴</button>
    </div>
  );
}
