import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { GoSearch } from "react-icons/go";

const Navigation = ({ userid, logout }) => {
  const [search, setSearch] = useState("");

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
    <Container>
      <Link to="/main">POTCHA</Link>
      <Menu>
        <Link to="/list/movie">Movie</Link>
        <Link to="/list/tv">TV</Link>
        <Link to={`/potato-basket/${userid}`}>PotatoBasket</Link>
      </Menu>
      <div style={{ width: "200px" }}>
        <SearchTextField setSearch={setSearch} search={search} />
      </div>
      <Link to="/mypage">MyPage</Link>
      <button onClick={logout}>Logout</button>
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

export function SearchTextField({ setSearch }) {
  const debouncedOnChange = debounce(setSearch, 300);
  return (
    <InputContainer>
      <Prac>
        <Icon />
        <label style={{cursor:"pointer"}} for="search">제목</label>
      </Prac>
      <InputField
        type="text"
        id="search"
        placeholder="제목으로 검색하기"
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
  width: 70px;
  height: 30px;
  color: white;
  transition: width 0.2s ease-in-out;
  cursor: pointer;
  border: none;
  ::placeholder {
    color: white;
  }
  :active,
  :focus {
    width: 150px;
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

const Prac = styled.div`
  display: inline;
  position: relative;
  top: 5px;
  left: 152px;
  cursor: pointer;
`;
