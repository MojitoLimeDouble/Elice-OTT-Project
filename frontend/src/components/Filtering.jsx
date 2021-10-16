import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/core";
import styled from "styled-components";
import React from "react";

const Filtering = ({ onClick, filtering }) => {
  const array = [
    "인기도 높은 순",
    "인기도 낮은 순",
    "최신 작품 순",
    "오래된 작품 순",
    "제목 순",
  ];
  return (
    <div>
      <Subtitle>정렬조건</Subtitle>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon="chevron-down"
          style={menuButtonStyle}
        >
          {filtering}
        </MenuButton>
        <MenuList style={menuListStyle}>
          {array.map((element) => (
            <MenuItem
              onClick={onClick}
              value={element}
              key={element}
              style={menuItemStyle}
            >
              {element}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

export default Filtering;

const Subtitle = styled.h2`
  font-size: 25px;
  margin-top: 30px;
  left: 0px;
`;

const menuButtonStyle = {
  background: "white",
  width: "165px",
  height: "25px",
  borderRadius: "5px",
  margin: "10px",
  fontFamily: "NotoSansKR",
  fontWeight: "bold",
  fontSize: "15px",
};

const menuListStyle = {
  borderRadius: "3px",
  margin: "5px",
};

const menuItemStyle = {
  margin: "5px",
  backgroundColor: "transparent",
  border: "none",
  fontFamily: "NotoSansKR",
  fontWeight: "bold",
  fontSize: "15px",
  display: "table",
  margin: "auto",
};
