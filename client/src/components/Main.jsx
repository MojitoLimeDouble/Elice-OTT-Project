import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { withTheme } from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Prediction from "./Prediction";

const Main = () => {
  const [contentsList, setContentsList] = useState("");
  const [predictionList, setPredictionList] = useState("");
  useEffect(() => {
    axios
      .get("https://yts.mx/api/v2/list_movies.json?limit=10")
      .then((res) => setContentsList(res.data.data.movies));
  }, []);

  useEffect(() => {
    axios
      .get("https://yts.mx/api/v2/list_movies.json?minimum_rating=9&limit=5")
      .then((res) => setPredictionList(res.data.data.movies));
  });

  const settings = {
    dots: true, // 슬라이드 밑에 점 보이게
    infinite: true, // 무한으로 반복
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000, // 넘어가는 속도
    slidesToShow: 5, // 4장씩 보이게
    // slidesToScroll: 5, // 1장씩 뒤로 넘어가게
    centerMode: true,
    // centerPadding: "0px", // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: "linear-gradient(-45deg, #d754ab, #fd723a)",
          height: "650px",
        }}
      >
        <Header>인기 컨텐츠 Top 10</Header>
        {!contentsList ? (
          <h1 style={{ fontSize: "30px", color: "black" }}>Loading ...</h1>
        ) : (
          <StyledSlider {...settings}>
            {contentsList.map((content) => (
              <CardBox key={content.id}>
                <CardImg alt="인기 컨텐츠" src={content.medium_cover_image} />
                <CardText>{content.title}</CardText>
              </CardBox>
            ))}
          </StyledSlider>
        )}
      </div>
      <div
        style={{
          backgroundImage: "linear-gradient(45deg,#fd723a, #d754ab )",
          height: "100%",
        }}
      >
              <h1>영화 흥행 예측작품</h1>
              <div style={{height: "400px", background: "white"}}>Graph</div>
        <Display>
          <Detail>
            {!predictionList ? (
              <h1 style={{ fontSize: "30px", color: "black" }}>Loading ...</h1>
            ) : (
              predictionList?.map((prediction) => (
                <Prediction key={prediction.id} prediction={prediction} />
              ))
            )}
          </Detail>
          <Detail>
            {!predictionList ? (
              <h1 style={{ fontSize: "30px", color: "black" }}>Loading ...</h1>
            ) : (
              predictionList?.map((prediction) => (
                <Prediction key={prediction.id} prediction={prediction} />
              ))
            )}
          </Detail>
        </Display>
      </div>
    </div>
  );
};

export default Main;

const Header = styled.h1`
  margin-left: 25px;
  position: absolute;
  top: 200px;
  font-size: 20px;
`;

const StyledSlider = styled(Slider)`
  .slick-list {
    max-width: 1600px;
    top: 200px;
    margin: 0 auto;
    height: 350px;
  }
  // 일단 아무런 효과 없는 것을 추정됨
  /* .slick-slide {
    height: auto; // ← that must not be ignored
  }
  .slick-track {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: stretch;
  } */

  .slick-slide div {
    display: flex;
    justify-content: center;
  }

  .slick-dots {
    bottom: -220px;
  }
`;

const CardBox = styled.div`
  cursor: pointer;
  width: 200px;
`;

const CardImg = styled.img`
  width: 150px;
  height: 220px;
  text-align: center;
  margin: 0 auto;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;

  @media (max-width: 850px) {
    width: 100px;
    height: 150px;
  }
`;

const CardText = styled.p`
  margin: 0 auto;
  padding: 10px;
  font-size: 12px;
  font-weight: bolder;
  align-items: center;
  height: 70px;
  width: 150px;
  background: white;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  @media (max-width: 850px) {
    font-size: 10px;
    width: 100px;
    height: 60px;
  }
`;

const Display = styled.div`
  display: flex;
  flex-direction: column;
`;
const Detail = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 30px 0;
`;
