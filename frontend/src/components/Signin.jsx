import axios from "axios";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

const Signin = () => {
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
          console.log("access_token", response.data);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.access_token}`;
          localStorage.setItem(
            "access_token",
            JSON.stringify(response.data.access_token)
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
      <form form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            type="Password"
            value={password}
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
  );
};

export default Signin;
