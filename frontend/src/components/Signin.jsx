import axios from "axios";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import NonSigninNavigation from "./NonSigninNavigation";
import styled from "styled-components";

const Signin = ({ windowHeight }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("아이디 또는 비밀번호를 입력해주세요");
      return;
    }

    if (!email && !password) return;

    const data = {
      email: email,
      password: password,
    };

    axios
      .post("/api/login", data)
      .then((response) => {
        console.log(response);
        if (response.data.result === "success") {
          localStorage.setItem(
            "access_token",
            JSON.stringify(response.data.access_token)
          );
          localStorage.setItem(
            "nickname",
            JSON.stringify(response.data.nickname)
          );
          localStorage.setItem(
            "photolink",
            JSON.stringify(response.data.photolink)
          );

          history.push("/main");
          alert("로그인에 성공하였습니다.");
        }
      })
      .catch((error) => {
        console.log(error.response);
        alert("아이디 또는 비밀번호를 확인하세요");
      });
  };

  return (
    <div>
      <NonSigninNavigationContainer
        style={{
          position: "absolute",
          top: "0",
          zIndex: "15",
        }}
      >
        <NonSigninNavigation />
      </NonSigninNavigationContainer>
      <div
        style={{
          minHeight: `${windowHeight - 320}px`,
        }}
      >
        <form form onSubmit={handleSubmit}>
          <div>
            <input
              placeholder="Email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Password"
              type="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit"> 로그인 </button> <br />
          <br />
          <label>아직 POTCHA의 회원이 아니신가요? </label>
          <Link to="/signup">
            <button> 회원가입 </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signin;

const NonSigninNavigationContainer = styled.div`
  /* position: sticky;
  top: 0;
  z-index: 30;
   */
`;

const FullPage = styled.div`
  font-family: arial, helvetica;
`;
