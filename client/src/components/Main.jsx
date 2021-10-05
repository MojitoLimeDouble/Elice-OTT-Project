import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";

const Main = () => {
  const [contentsList, setContentsList] = useState("");
  useEffect(() => {
    axios
      .get("https://yts.mx/api/v2/list_movies.json?limit=10")
      .then((res) => setContentsList(res.data.data.movies));
  }, []);
  const settings = {
    dots: true, // 슬라이드 밑에 점 보이게
    infinite: true, // 무한으로 반복
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000, // 넘어가는 속도
    slidesToShow: 5, // 4장씩 보이게
    slidesToScroll: 1, // 1장씩 뒤로 넘어가게
    centerMode: true,
    // centerPadding: "0px", // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
  };

  return (
    <div>
      <div style={{ background: "red", height: "650px" }}>
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
      <div style={{ background: "yellow", height: "700px" }}>
        <h1>흥행 예측작품</h1>
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
    height: 300px;
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

  :hover {
    opacity: 0.5;
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
`;
