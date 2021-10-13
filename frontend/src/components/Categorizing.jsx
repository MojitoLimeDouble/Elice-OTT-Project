import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/core";

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
          {categorizing}
        </MenuButton>
        {category === "movie" ? (
          <MenuList borderRadius="3px" margin="5px">
            {!MovieCategoriesList ? (
              <div>Loading ...</div>
            ) : (
              MovieCategoriesList.map((category) => (
                <MenuItem onClick={onClick} value={category} key={category}>
                  {category}
                </MenuItem>
              ))
            )}
          </MenuList>
        ) : (
          <MenuList borderRadius="3px" margin="5px">
            {!TVCategoriesList ? (
              <div>Loading ...</div>
            ) : (
              TVCategoriesList.map((category) => (
                <MenuItem onClick={onClick} value={category} key={category}>
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
