import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navigation = ({ userid }) => {
  return (
    <Container>
      <Link to="/main">POTCHA</Link>
      <Menu>
        <Link to="/list/movie">Movie</Link>
        <Link to="/list/tv">TV</Link>
        <Link to={`/potato-basket/${userid}`}>PotatoBasket</Link>
      </Menu>
      <Link to="/mypage">MyPage</Link>
      <button>Logout</button>
    </Container>

  );
};

export default Navigation;

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
