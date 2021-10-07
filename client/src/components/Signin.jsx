import axios from "axios";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

const Signin = () => {
  const [ Email, setEmail ] = useState("");
  const [ Password, setPassword ] = useState("");
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Email === "" || Password === "") {
      alert("아이디 또는 비밀번호를 입력해주세요")
      return;
    };

    if (!Email && !Password) return;

    const data = {
      email: Email,
      password: Password,
    };

    axios
      .post(`http://localhost:5000/login`, data)
      .then(response => {
        console.log(response);
        if (response.data.result === "success") {
          console.log("access_token", response.data);
          localStorage.setItem(
            "access_token", 
            JSON.stringify(response.data.access_token, response.data.refresh_token)
          );
          history.push("/main");
          alert("로그인에 성공하였습니다.");
        }
      }).catch(e => {
        console.log(e.response);
        alert("아이디 또는 비밀번호를 확인하세요");
      })
    };

  return (
    <div>
    <form form onSubmit={handleSubmit}>
        <div>
        <input
            placeholder="Email"
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div>
        <input
            placeholder="Password"
            type="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <button type="submit"> 로그인 </button> <br /><br />
        <label>아직 POTCHA의 회원이 아니신가요? </label>
        <Link to="/signup">
            <button> 회원가입 </button>
        </Link>
    </form>
    </div>
  );
};

export default Signin;