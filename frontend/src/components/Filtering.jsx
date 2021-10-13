import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/core";

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
      <div>정렬</div>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon="chevron-down"
          background="white"
          width="120px"
          height="20px"
          borderRadius="3px"
          margin="10px"
        >
          {filtering}
        </MenuButton>
        <MenuList borderRadius="3px" margin="5px">
          {array.map((element) => (
            <MenuItem onClick={onClick} value={element} key={element}>
              {element}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

export default Filtering;
