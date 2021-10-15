import React, { useState, useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import NonSigninNavigation from "../components/NonSigninNavigation";
import styled from "styled-components";
import * as Style from '../components/styleComponent'
import { InputField } from "./Signin";

const Signup = ({ windowHeight }) => {
  const [email, setEmail] = useState("");
  const [emailCheck, setEmailCheck] = useState(true);

  const [password, setPassword] = useState("");
  const [passwordVali, setPasswordVali] = useState(true);

  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [nickname, setNickname] = useState("");
  const [nicknameCheck, setNicknameCheck] = useState(true);
  const [nicknameValidate, setNicknameValidate] = useState(true);

  const history = useHistory();

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [passwordCheck]
  );

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    const checkEmail = (value) => {
      const regExp =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      return regExp.test(value);
    };
    !checkEmail(e.target.value) ? setEmailCheck(false) : setEmailCheck(true);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    const checkPassword = (value) => {
      const regExp = /^.*(?=.{10,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
      return regExp.test(value);
    };
    !checkPassword(e.target.value)
      ? setPasswordVali(false)
      : setPasswordVali(true);
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
    const checkNickname = (value) => {
      const regExp = /^[a-zA-Zㄱ-힣0-9]*$/;
      return regExp.test(value);
    };
    !checkNickname(e.target.value)
      ? setNicknameCheck(false)
      : setNicknameCheck(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!emailCheck) return;

    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!nicknameCheck) return;

    const data = {
      email: email,
      password: password,
      nickname: nickname,
    };
    console.log(data);

    axios.post("/api/signup", data).then((response) => {
      console.log(response);
      if (response.data.result === "fail") {
        setNicknameValidate(false);
      } else {
        alert("회원 가입에 성공하셨습니다.");
        history.push("/signin");
      }
    });
  };

  return (
    <div style={{ height: "62vh" }}>
      <Style.NonSigninNavigationContainer>
        <NonSigninNavigation />
      </Style.NonSigninNavigationContainer>
      <div
        style={{
          minHeight: `${windowHeight - 320}px`,
        }}
      >
        <form onSubmit={onSubmit}>
          <div>
            <Style.InputField
              name="Email"
              value={email}
              required
              onChange={onChangeEmail}
              placeholder="Email"
            />
            {!emailCheck && (
              <div style={{ color: "red", fontSize: 12 }}>
                이메일 형식이 유효하지 않습니다.
              </div>
            )}
          </div>
          <div>
            <Style.InputField
              name="Password"
              type="Password"
              value={password}
              required
              onChange={onChangePassword}
              placeholder="Password"
            />
            {!passwordVali && (
              <div style={{ color: "red", fontSize: 12 }}>
                대·소·특수문자, 숫자 최소 2개 이상 포함, 최소 10자리를
                입력해주세요
              </div>
            )}
          </div>
          <div>
            <Style.InputField
              name="Password-check"
              type="Password"
              value={passwordCheck}
              required
              onChange={onChangePasswordCheck}
              placeholder="Confirm Password"
            />
            {passwordError && (
              <div
                style={{ color: "red", fontSize: 12, padding: 0, margin: 0 }}
              >
                비밀번호가 일치하지 않습니다.
              </div>
            )}
          </div>
          <div>
            <Style.InputField
              name="Nickname"
              value={nickname}
              required
              onChange={onChangeNickname}
              placeholder="Nickname"
            />
            {!nicknameCheck && (
              <div style={{ color: "red", fontSize: 12 }}>
                한글, 대·소문자, 숫자만 입력해주세요
              </div>
            )}
            {!nicknameValidate && (
              <div style={{ color: "red", fontSize: 12 }}>
                중복된 이메일이 존재합니다.
              </div>
            )}
          </div>
          <div>
            <Style.Button type="submit"> 확인 </Style.Button>
            <Link to="/signin">
              <p>이미 가입하신 회원이시라면 로그인을 진행해보세요</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;


