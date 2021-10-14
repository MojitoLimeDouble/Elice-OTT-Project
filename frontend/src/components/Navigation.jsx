import React from "react";
import { Link as ReactRouterDomLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import "../styles/FontStyle.css";

const Link = ({ isActive, children, ...props }) => {
  return <ReactRouterDomLink {...props}>{children}</ReactRouterDomLink>;
};

const Navigation = ({ userid, logout }) => {
  const { pathname } = useLocation();
  return (
    <ContainerBox>
      <div style={{ display: "inline-block" }} className="ContainerPosition">
        <BackgroundSquare />
        <Container>
          <StyledLink
            to="/main"
            isActive={pathname === "/main"}
            className="potcha"
          >
            POTCHA
          </StyledLink>
          <Menu>
            <StyledLink
              to="/list/movie"
              isActive={pathname === "/list/movie"}
              className="movie"
            >
              Movie
            </StyledLink>
            <StyledLink
              to="/list/tv"
              isActive={pathname === "/list/tv"}
              className="tv"
            >
              TV
            </StyledLink>
            <StyledLink
              to={`/potato-basket/${userid}`}
              isActive={pathname === `/potato-basket/${userid}`}
            >
              PotatoBasket
            </StyledLink>
          </Menu>
          <StyledLink to="/mypage" isActive={pathname === "/mypage"}>
            MyPage
          </StyledLink>
          <CustomButton>Logout</CustomButton>
        </Container>
      </div>
    </ContainerBox>
  );
};

export default Navigation;

const BackgroundSquare = () => {
  const style = {
    position: "absolute",
    zIndex: "1",
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
  justify-content: space-around;
  align-items: center;
  height: 60px;
  font-family: "BMJUA";
  font-style: normal;
  text-decoration: none;
  z-index: 2;
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-around;
  width: 25%;
`;

const StyledLink = styled(Link)`
  border-bottom: ${(props) => (props.isActive ? "2px solid black" : "")};
  font-size: ${(props) => (props.isActive ? "22px" : "20px")};
`;

const CustomButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;
