import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Prediction, { Similar } from "./Prediction";

const Main = ({
  popularList,
  predictableList,
  similarList,
  onPopular,
  onPredictable,
  onSimilar,
}) => {
  // state를 redux로 관리하여 사용자 겸험을 상승
  // 서버와 미연결로 인하여 현재 임시 데이터 api를 불러와서 렌더링 중
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://yts.mx/api/v2/list_movies.json?limit=10"
        );
        onPopular(response.data.data.movies);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&limit=5"
        );
        onPredictable(response.data.data.movies);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://yts.mx/api/v2/list_movies.json?minimum_rating=5&limit=4"
        );
        onSimilar(response.data.data.movies);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

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
        {!popularList ? (
          <h1 style={{ fontSize: "30px", color: "black" }}>Loading ...</h1>
        ) : (
          <StyledSlider {...settings}>
            {popularList.map((content) => (
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
        <div style={{ height: "400px", background: "white" }}>Graph</div>
        <Display>
          <Order>
            <h1>1</h1>
            <h1>2</h1>
            <h1>3</h1>
            <h1>4</h1>
            <h1>5</h1>
          </Order>
          <Detail>
            <h1>흥행 예측 작품</h1>
            {!predictableList ? (
              <h1 style={{ fontSize: "30px", color: "black" }}>Loading ...</h1>
            ) : (
              predictableList.map((prediction) => (
                <Prediction key={prediction.id} prediction={prediction} />
              ))
            )}
          </Detail>

          <Details>
            <h1>흥행 예측 작품의 코로나 이전 유사 작품들 </h1>
            {/* 데이터 전달받고 나서 for 문을 통해 배열내 배열을 전달하는 방식을 사용하면 될 것으로 예상 */}
            <SimilarDetail>
              {!similarList ? (
                <h1 style={{ fontSize: "30px", color: "black" }}>
                  Loading ...
                </h1>
              ) : (
                similarList?.map((prediction) => (
                  <Similar key={prediction.id} prediction={prediction} />
                ))
              )}
            </SimilarDetail>
            <SimilarDetail>
              {!similarList ? (
                <h1 style={{ fontSize: "30px", color: "black" }}>
                  Loading ...
                </h1>
              ) : (
                similarList?.map((prediction) => (
                  <Similar key={prediction.id} prediction={prediction} />
                ))
              )}
            </SimilarDetail>
            <SimilarDetail>
              {!similarList ? (
                <h1 style={{ fontSize: "30px", color: "black" }}>
                  Loading ...
                </h1>
              ) : (
                similarList?.map((prediction) => (
                  <Similar key={prediction.id} prediction={prediction} />
                ))
              )}
            </SimilarDetail>
            <SimilarDetail>
              {!similarList ? (
                <h1 style={{ fontSize: "30px", color: "black" }}>
                  Loading ...
                </h1>
              ) : (
                similarList?.map((prediction) => (
                  <Similar key={prediction.id} prediction={prediction} />
                ))
              )}
            </SimilarDetail>
            <SimilarDetail>
              {!similarList ? (
                <h1 style={{ fontSize: "30px", color: "black" }}>
                  Loading ...
                </h1>
              ) : (
                similarList?.map((prediction) => (
                  <Similar key={prediction.id} prediction={prediction} />
                ))
              )}
            </SimilarDetail>
          </Details>
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
  flex-direction: row;
  justify-content: center;
`;
const Order = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 30px 0;
  width: 100px;
  font-size: 40px;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 30px 0;
  width: 300px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 30px 0;
`;

const SimilarDetail = styled.div`
  display: flex;
`;
