import React, { useEffect, useState } from "react";
import Filtering from "./Filtering";
import { ThemeProvider } from "@chakra-ui/core";
import Categorizing from "./Categorizing";
import axios from "axios";
import { ContentsCard } from "./Prediction";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars";

const ContentsCategory = () => {
  const [contentsList, setContentsList] = useState("");
  const [filtering, setFiltering] = useState("선택하기");
  const [categorizing, setCategorizing] = useState("선택하기");
  // url에서 category(movie, tv) 분류
  const category = window.location.href.split("/")[4];
  console.log(category);

  const MovieCategoriesList = [
    "음악",
    "역사",
    "코미디",
    "모험",
    "판타지",
    "가족",
    "공포",
    "서부",
    "전쟁",
    "TV 영화",
    "애니메이션",
    "로맨스",
    "액션",
    "드라마",
    "범죄",
    "스릴러",
    "SF",
    "미스터리",
  ];
  const TVCategoriesList = [
    "War & Politics",
    "Reality",
    "Action & Adventure",
    "애니메이션",
    "범죄",
    "Talk",
    "Kids",
    "서부",
    "코미디",
    "드라마",
    "Soap",
    "News",
    "Sci-Fi & Fantasy",
    "가족",
    "미스터리",
  ];
  // 최초 렌더링 시 인기도 높은 순서 데이터 요청
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/${category}/list`);
      setContentsList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  // 정렬 및 장렬 분류에 따른 데이터 요청
  const fetchFilter = async (subject, data) => {
    const body = { sort_criteria: data };
    try {
      const response = await axios.post(
        `/api/${category}/list/${subject}`,
        body
      );
      setContentsList(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  // 영화 카테고리와 tv 카테고리에 따른 분류 함수
  const chooseCategoryData = (array, data) => {
    if (array.includes(data)) {
      setFiltering("선택하기");
      setCategorizing(data);
      fetchFilter("filter", data);
    } else {
      setFiltering(data);
      setCategorizing("선택하기");
      fetchFilter("sorted", data);
    }
  };
  const onClick = (e) => {
    const data = e.target.value;
    setFiltering("선택하기");
    setCategorizing("선택하기");
    if (category === "movie") {
      const array = MovieCategoriesList;
      chooseCategoryData(array, data);
    } else {
      const array = TVCategoriesList;
      chooseCategoryData(array, data);
    }
  };

  return (
    <CategoryContainer className="CategoryContainer">
      <FilterBackgroundSquare />
      <Filter>
        <ThemeProvider>
          <div style={{ paddingRight: "25px" }}>
            <Filtering
              onClick={onClick}
              filtering={filtering}
              category={category}
            />
            <Categorizing
              onClick={onClick}
              categorizing={categorizing}
              MovieCategoriesList={MovieCategoriesList}
              TVCategoriesList={TVCategoriesList}
              category={category}
            />
          </div>
        </ThemeProvider>
      </Filter>
      <ListBackgroundSquare />
      <div
        style={{
          padding: "20px",
        }}
      >
        <Scrollbars
          style={{
            position: "relative",
            height: "1140px",
          }}
          className="Scrollbar"
          renderThumbVertical={({ style, ...props }) => (
            <div
              {...props}
              style={{
                ...style,
                zIndex: "5",
                backgroundColor: "#c9b3f3dd",
                borderRadius: "inherit",
              }}
            />
          )}
        >
          <FilteredList>
            {!contentsList ? (
              <div>Loading ...</div>
            ) : (
              contentsList.map((contents) => (
                <Link to={`/detail/${category}/${contents.id}/${contents.title}`}>
                  <ContentsCard contents={contents} key={contents.id} />
                </Link>
              ))
            )}
          </FilteredList>
        </Scrollbars>
      </div>
    </CategoryContainer>
  );
};

export default ContentsCategory;

const FilterBackgroundSquare = () => {
  const style = {
    position: "absolute",
    zIndex: "1",
    width: "200px",
    height: "205px",
    backgroundColor: "#ffffff8d",
    borderRadius: "25px",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
  };
  return <div style={style}></div>;
};

const ListBackgroundSquare = () => {
  const style = {
    position: "absolute",
    zIndex: "1",
    width: "990px",
    height: "1200px",
    backgroundColor: "#ffffff8d",
    borderRadius: "25px",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
    transform: "translateX(230px)",
  };
  return <div style={style}></div>;
};

const CategoryContainer = styled.div`
  height: 100vh;
  background: #ffffff8d;
  border-radius: 25px;
  padding: 30px 40px;
  display: grid;
  grid-template-columns: 230px 990px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const Filter = styled.div`
  position: relative;
  z-index: 2;
`;

const FilteredList = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  padding: 10px 10px;
  padding-right: 15px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  /* overflow-y: auto; */
`;
