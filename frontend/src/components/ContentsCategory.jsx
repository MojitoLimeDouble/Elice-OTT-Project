import React, { useEffect, useState } from "react";
import Filtering from "./Filtering";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import Categorizing from "./Categorizing";
import axios from "axios";
import { ContentsCard } from "./Prediction";
import { Link } from "react-router-dom";
const ContentsCategory = () => {
  const [contentsList, setContentsList] = useState("");
  const [filtering, setFiltering] = useState("선택하기");
  const [categorizing, setCategorizing] = useState("선택하기");

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
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/${category}/list`
      );
      setContentsList(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const fetchFilter = async (subject, data) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/${category}/list/${subject}`,
        data
      );
      setContentsList(response.data);
      console.log(
        `${process.env.REACT_APP_BASE_URL}/api/${category}/list/${subject}`
      );
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onClick = (e) => {
    const data = e.target.value;
    setFiltering("선택하기");
    setCategorizing("선택하기");
    const array = MovieCategoriesList;
    if (array.includes(e.target.value)) {
      setFiltering("선택하기");
      setCategorizing(e.target.value);
      fetchFilter("category", data)
    } else {
      setFiltering(e.target.value);
      setCategorizing("선택하기");
      fetchFilter("sorted", data);
    }
  };

  return (
    <div style={{ height: "100vh", background: "pink" }}>
      <div>{category.toUpperCase()}</div>
      <ThemeProvider>
        <CSSReset />
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
      </ThemeProvider>
      <div>
        {!contentsList ? (
          <div>Loading ...</div>
        ) : (
          contentsList.map((contents) => (
            <Link to={`/${category}/${contents.id}`}>
              <ContentsCard contents={contents} key={contents.id} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ContentsCategory;
