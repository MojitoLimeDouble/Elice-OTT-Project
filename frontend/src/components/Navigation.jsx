import React, { useState, useEffect } from "react";
import {
  Link as ReactRouterDomLink,
  useLocation,
  useHistory,
} from "react-router-dom";
import styled from "styled-components";
import { GoSearch } from "react-icons/go";
import { BiMoviePlay } from "react-icons/bi";
import { CgScreen } from "react-icons/cg";
import { GiBasket } from "react-icons/gi";
import "../styles/FontStyle.css";

const Link = ({ isActive, children, ...props }) => {
  return <ReactRouterDomLink {...props}>{children}</ReactRouterDomLink>;
};

const Navigation = ({ userid, logout }) => {
  const [search, setSearch] = useState("");
  const { pathname } = useLocation();

  const history = useHistory();
  useEffect(() => {
    if (search) {
      console.log(search);
      const body = {
        search,
      };
      history.push(`/search/${search}`);
      setSearch("");
    }
  }, [search]);

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
              <BiMoviePlay
                style={{ transform: "translateY(20%)", marginRight: "5px" }}
              />
              Movie
            </StyledLink>
            <StyledLink
              to="/list/tv"
              isActive={pathname === "/list/tv"}
              className="tv"
            >
              <CgScreen
                style={{ transform: "translateY(20%)", marginRight: "5px" }}
              />
              TV
            </StyledLink>
            <StyledLink
              to={`/potato-basket/${JSON.parse(
                localStorage.getItem("nickname")
              )}`}
              isActive={
                pathname ===
                `/potato-basket/${JSON.parse(localStorage.getItem("nickname"))}`
              }
              className="potatoBasket"
            >
              <GiBasket
                style={{ transform: "translateY(20%)", marginRight: "5px" }}
              />
              PotatoBasket
            </StyledLink>
          </Menu>
          <StyledSearch className="search">
            <SearchTextField setSearch={setSearch} search={search} />
          </StyledSearch>
          <StyledLink
            to="/mypage"
            isActive={pathname === "/mypage"}
            className="mypage"
          >
            MyPage
          </StyledLink>
          <CustomButton onClick={logout}>Logout</CustomButton>
        </Container>
      </div>
    </ContainerBox>
  );
};

export default Navigation;

const BackgroundSquare = () => {
  const style = {
    position: "absolute",
    zIndex: "100",
    width: "1300px",
    height: "60px",
    backgroundColor: "#f7f0ff",
    borderRadius: "25px",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
  };
  return <div style={style}></div>;
};

const ContainerBox = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 30px;
  text-align: center;
`;

const Container = styled.div`
  width: 1300px;
  display: flex;
  position: relative;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  font-family: "NotoSansKR";
  font-weight: "bold";
  font-style: normal;
  text-decoration: none;
  z-index: 200;
`;

const Menu = styled.div`
  /* display: flex;
  justify-content: space-around;
  width: 25%; */
`;

const StyledLink = styled(Link)`
  border-bottom: ${(props) => (props.isActive ? "2px solid black" : "")};
  font-size: ${(props) => (props.isActive ? "22px" : "20px")};

  &.potcha {
    position: absolute;
    left: 60px;
  }

  &.movie {
    position: absolute;
    transform: translateY(-60%);
    left: 250px;
  }

  &.tv {
    position: absolute;
    transform: translateY(-60%);
    left: 370px;
  }

  &.potatoBasket {
    position: absolute;
    transform: translateY(-60%);
    left: 470px;
  }

  &.mypage {
    position: absolute;
    right: 180px;
  }
`;

const StyledSearch = styled.div`
  width: 200px;
  position: absolute;
  right: 300px;
`;

const CustomButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 20px;
  position: absolute;
  right: 50px;
`;

export function SearchTextField({ setSearch }) {
  const debouncedOnChange = debounce(setSearch, 500);
  return (
    <InputContainer>
      <SearchButton>
        <Icon />
        <label style={{ cursor: "pointer", fontSize: "15px" }} for="search">
          제목
        </label>
      </SearchButton>
      <InputField
        type="text"
        id="search"
        placeholder=" 🔍 제목으로 검색하기"
        autocomplete="off"
        onChange={(e) => {
          debouncedOnChange(e.target.value);
        }}
      />
    </InputContainer>
  );
}

function debounce(func, timeout) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const Icon = styled(GoSearch)`
  position: relative;
  top: 3px;
`;

const InputContainer = styled.div`
  width: 100%;
  position: relative;
`;

const InputField = styled.input`
  float: right;
  width: 50px;
  height: 30px;
  background-color: transparent;
  transition: width 0.2s ease-in-out;
  cursor: pointer;
  border: none;
  padding: 0 10px;
  color: transparent;
  ::placeholder {
    color: transparent;
  }
  :active,
  :focus {
    width: 155px;
    background: black;
    color: white;
    z-index: 9999;
    border: none;
    outline: none;
    border-radius: 5px;
    transition: width 0.2s ease-in-out;
    ::placeholder {
      color: white;
    }
  }
`;

const SearchButton = styled.div`
  display: inline;
  position: relative;
  top: 5px;
  left: 80px;
  cursor: pointer;
  z-index: -99999;
`;
