import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/core";
import styled from "styled-components";
import React from "react";

const Categorizing = ({
  onClick,
  categorizing,
  MovieCategoriesList,
  TVCategoriesList,
  category,
}) => {
  return (
    <div>
      <Subtitle>카테고리</Subtitle>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon="chevron-down"
          style={menuButtonStyle}
          className="menuButton"
        >
          {categorizing}
        </MenuButton>
        {category === "movie" ? (
          <MenuList style={menuListStyle}>
            {!MovieCategoriesList ? (
              <div>Loading ...</div>
            ) : (
              MovieCategoriesList.map((category) => (
                <MenuItem
                  onClick={onClick}
                  value={category}
                  key={category}
                  style={menuItemStyle}
                >
                  {category}
                </MenuItem>
              ))
            )}
          </MenuList>
        ) : (
          <MenuList style={menuListStyle}>
            {!TVCategoriesList ? (
              <div>Loading ...</div>
            ) : (
              TVCategoriesList.map((category) => (
                <MenuItem
                  onClick={onClick}
                  value={category}
                  key={category}
                  style={menuItemStyle}
                >
                  {category}
                </MenuItem>
              ))
            )}
          </MenuList>
        )}
      </Menu>
    </div>
  );
};

export default Categorizing;

const Subtitle = styled.h2`
  font-size: 25px;
  margin-top: 15px;
  left: 0px;
`;

const menuButtonStyle = {
  background: "white",
  width: "165px",
  height: "25px",
  borderRadius: "5px",
  margin: "10px",
  fontFamily: "BMJUA",
  fontSize: "15px",
  padding: "0px",
};

const menuListStyle = {
  borderRadius: "3px",
  margin: "5px",
};

const menuItemStyle = {
  margin: "5px",
  backgroundColor: "transparent",
  border: "none",
  fontFamily: "BMJUA",
  fontSize: "15px",
  display: "table",
  margin: "auto",
};
