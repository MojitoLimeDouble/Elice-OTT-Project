// react-fullpage에서 header에 적용할 navigation bar

import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import "../styles/FontStyle.css";

const NonSigninNavigation = () => {
  const { pathname } = useLocation();
  return (
    <div style={{ display: "inline-block" }} className="ContainerPosition">
      <ContainerBox>
        <BackgroundSquare />
        <Container>
          <GridContainer>
            <StyledLink to="/" isActive={pathname === "/"} className="potcha">
              POTCHA
            </StyledLink>
            <StyledLink
              to="/signin"
              isActive={pathname === "/signin"}
              className="login"
            >
              Login
            </StyledLink>
          </GridContainer>
        </Container>
      </ContainerBox>
    </div>
  );
};

export default NonSigninNavigation;

const BackgroundSquare = () => {
  const style = {
    position: "absolute",
    zIndex: "25",
    width: "1300px",
    height: "60px",
    backgroundColor: "#f7f0ff",
    borderRadius: "25px",
  };
  return <div style={style}></div>;
};

const ContainerBox = styled.div`
  margin-top: 1.5rem;
  text-align: center;
`;

const Container = styled.div`
  width: 1300px;
  display: flex;
  position: relative;
  align-items: center;
  height: 40px;
  font-family: "BMJUA";
  font-style: normal;
  text-decoration: none;
  z-index: 30;
`;

const GridContainer = styled.div`
  display: grid;
`;

const StyledLink = styled(Link)`
  border-bottom: ${(props) => (props.isActive ? "2px solid black" : "")};
  font-size: ${(props) => (props.isActive ? "22px" : "20px")};

  &.potcha{
    position: absolute;
    left: 60px;
  }

  &.login{
    position: absolute;
    right: 50px;
  }
`;
