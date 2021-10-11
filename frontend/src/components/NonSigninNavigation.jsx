// react-fullpage에서 header에 적용할 navigation bar

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NonSigninNavigation = () => {
  return (
    <Container>
      <Link to="/">POTCHA</Link>
      <Menu></Menu>
      <Link to="/signin">
        <SiginButton>SIGN IN</SiginButton>
      </Link>
    </Container>
  );
};

export default NonSigninNavigation;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40px;
  border-bottom: 2px solid black;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-around;
  width: 25%;
`;

const SiginButton = styled.button``;
