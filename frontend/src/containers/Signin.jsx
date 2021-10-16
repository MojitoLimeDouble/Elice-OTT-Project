import axios from "axios";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import NonSigninNavigation from "../components/NonSigninNavigation";
import styled from "styled-components";
import * as Style from "../components/styleComponent";

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
    <div style={{ height: "62vh" }}>
      <Style.NonSigninNavigationContainer>
        <NonSigninNavigation />
      </Style.NonSigninNavigationContainer>
      <div>
        <form form onSubmit={handleSubmit}>
          <div>
            <Style.InputField
              id="email"
              placeholder="Email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Style.InputField
              id="password"
              placeholder="Password"
              type="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Style.Button type="submit"> 로그인 </Style.Button> <br />
          <br />
          <label>아직 POTCHA의 회원이 아니신가요? </label>
          <Link to="/signup">
            <Style.Button large> 회원가입 </Style.Button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signin;

