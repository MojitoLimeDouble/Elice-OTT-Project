import React, { useState, useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [ Email, setEmail ] = useState("");
  const [ EmailCheck, setEmailCheck ] = useState(true);
  const [ EmailValidate, setEmailValidate ] = useState(true);

  const [ Password, setPassword ] = useState("");
  const [ PasswordVali, setPasswordVali ] = useState(true);

  const [ PasswordCheck, setPasswordCheck ] = useState("");
  const [ PasswordError, setPasswordError ] = useState(false);

  const [ Nickname, setNickname ] = useState("");
  const [ NicknameCheck, setNicknameCheck ] = useState(true);

  const history = useHistory();


  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordError(e.target.value !== Password);
      setPasswordCheck(e.target.value);
    }, [PasswordCheck]);

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
    if (!EmailCheck) return;

    if (Password !== PasswordCheck) {
      return setPasswordError(true);
    }
    if (!NicknameCheck) return;

    const data = {
      email: Email,
      password: Password,
      nickname: Nickname,
    };
    console.log(data);

    axios
      .post(`http://localhost:5000/signup`, data)
      .then((response) => {
        console.log(response);
        if (response.data.result === "fail") {
          setEmailValidate(false)
        } else
          {alert("회원 가입에 성공하셨습니다.");
        history.push('/signin');}
      })
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input
            name="Email"
            value={Email}
            required
            onChange={onChangeEmail}
            placeholder="Email"
          />
          {!EmailCheck && (
            <div style={{ color: "red", fontSize: 12 }}>이메일 형식이 유효하지 않습니다.</div>
          )}
          {!EmailValidate && (
            <div style={{ color: "red", fontSize: 12 }}>중복된 이메일이 존재합니다.</div>
          )}
        </div>
        <div>
          <input
            name="Password"
            type="Password"
            value={Password}
            required
            onChange={onChangePassword}
            placeholder="Password"
          />
          {!PasswordVali && (
            <div style={{ color: "red", fontSize: 12 }}>
              대·소·특수문자, 숫자 최소 2개 이상 포함, 최소 10자리를 입력해주세요
            </div>
          )}
        </div>
        <div>
          <input
            name="Password-check"
            type="Password"
            value={PasswordCheck}
            required
            onChange={onChangePasswordCheck}
            placeholder="Confirm Password"
          />
          {PasswordError && (
            <div style={{ color: "red", fontSize: 12 }}>비밀번호가 일치하지 않습니다.</div>
          )}
        </div>
        <div>
          <input
            name="Nickname"
            value={Nickname}
            required
            onChange={onChangeNickname}
            placeholder="Nickname"
          />
          {!NicknameCheck && (
            <div style={{ color: "red", fontSize: 12 }}>
              한글, 대·소문자, 숫자만 입력해주세요
            </div>
          )}
        </div>
        <div>
            <button type="submit"> 확인 </button>      
            <Link to="/signin">
                <p>이미 가입하신 회원이시라면 로그인을 진행해보세요</p>
            </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;