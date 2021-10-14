import React from "react";
import styled from "styled-components";

const Potcha_info = styled.div`
  width: 1300px;
  height: 180px;
  margin: 30px auto;
  margin-bottom: 10px;
  background: #ffffff8d;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = () => {
  return (
    <Potcha_info>
      <img
        className="potcha_img"
        src="https://cdn.discordapp.com/attachments/880725572475559957/898084782439817228/image_processing20200713-5473-4ltg8i.gif"
        alt=""
        style={{ width: "150px", marginRight: "20px" }}
      />
      <p className="potcha_text" style={{ textAlign: "left" }}>
        <span>
          카우치 포테이토가 되고픈 자들을 위한 서비스,{" "}
          <b style={{ fontWeight: "bold" }}>포챠 POTCHA</b>
        </span>
        <br />
        <span>고객센터 | 전화 : 070-4633-2015 | 이메일 : contact@elice.io</span>
        <br />
        <span>
          대표:
          <a href="https://github.com/redhi" target="_blank">
            김민지
          </a>
          ,
          <a href="https://github.com/MojitoLimeDouble" target="_blank">
            김효곤
          </a>
          ,
          <a href="https://github.com/Eunyeol-Lucas" target="_blank">
            남은열
          </a>
          ,
          <a href="https://github.com/Raihyul" target="_blank">
            이민영
          </a>
        </span>
        <br />
        <span>Copyright© POTCHA(주) All rights reserved.</span>
      </p>
    </Potcha_info>
  );
};

export default Footer;
