import React from "react";
import { Link } from "react-router-dom";
import "./NonSignIn.scss";

const NonSignIn = () => {
  return (
    <div>
      <h1>
        <span>POTCHA</span>
      </h1>
      <div class="outer-scratch">
        <div class="inner-scratch">
          <div class="background grain"></div>
        </div>
      </div>
      <Link to="/signin">
        <button> 로그인 </button>
      </Link>
      <Link to="/signup">
        <button> 회원가입 </button>
      </Link>
    </div>
  );
};

export default NonSignIn;
