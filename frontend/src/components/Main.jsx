import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Prediction, { Similar } from "./Prediction";
import Tab from "./Tab";
import MyResponsivePie from "./GraphComponent";
import {
  movieGenres,
  movieCountry,
  movieKeyword,
  tvGenres,
  tvCountry,
  tvKeyword,
} from "./GraphData";

const Main = ({
  popularList,
  predictableList,
  similarList,
  onPopular,
  onPredictable,
  onSimilar,
}) => {
  const [currTab, setCurrTab] = useState("MOVIE");
  // state를 redux로 관리하여 사용자 겸험을 상승
  //FIXME: just for demonstration(서버와 미연결로 인하여 현재 임시 데이터 api를 불러와서 렌더링 중)
  const requestContents = (subject) => {
    const hitContents = async () => {
      try {
        const response = await axios.get(`/api/${subject}/hit`);
        onPredictable(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    const similarContents = async () => {
      try {
        const response = await axios.get(`/api/${subject}/similar`);
        onSimilar(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    hitContents();
    similarContents();
  };

  const topRated = async () => {
    try {
      const response = await axios.get(
        "https://yts.mx/api/v2/list_movies.json?limit=10"
      );
      onPopular(response.data.data.movies);
    } catch (error) {
      console.log(error.response);
    }
  };
  const subject = currTab.toLowerCase();
  useEffect(() => {
    topRated();
  }, []);
  useEffect(() => {
    requestContents(subject);
  }, [currTab]);

  const handleClickTab = (tab) => {
    setCurrTab(tab);
  };

  // FIXME: 필요없는 부분은 배포전 재확인 후 삭제 예정
  const settings = {
    dots: true, // 슬라이드 밑에 점 보이게
    infinite: true, // 무한으로 반복
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000, // 넘어가는 속도
    slidesToShow: 5, // 4장씩 보이게
    // slidesToScroll: 5, // 1장씩 뒤로 넘어가게
    centerMode: true,
    centerPadding: "0px", // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
  };
  const distribution = ["장르", "키워드", "국가"];
  return (
    <div className="main">
      <TopTen className="topTen">
        <TopTenTitle className="topTenTitle">인기 컨텐츠 Top 10</TopTenTitle>
        {!popularList ? (
          <img
            src="https://blog.kakaocdn.net/dn/cmseNl/btrhhTwEA0r/TNAoELO6JmK3rhVeNfGYy0/img.gif"
            alt=""
            style={{
              width: "20%",
              marginTop: "130px",
            }}
          />
        ) : (
          <StyledSlider {...settings}>
            {popularList.map((content) => (
              <CardBox key={content.id}>
                <Link to={`/detail/${content.category}/${content.id}`}>
                  <CardImg alt="인기 컨텐츠" src={content.medium_cover_image} />
                  <CardText>{content.title}</CardText>
                </Link>
              </CardBox>
            ))}
          </StyledSlider>
        )}
      </TopTen>
      <BackgroundSquare />
      <PredictionContainer className="prediction">
        <Tab currTab={currTab} onClick={handleClickTab} />
        <PredictionTitle className="predictionTiTle">{`${currTab} 흥행 예측 분석 top 5`}</PredictionTitle>
        <PredictChart className="predictChart">
          {currTab === "MOVIE" ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1.5fr 1fr",
              }}
            >
              {[movieGenres, movieKeyword, movieCountry].map((data, idx) => (
                <PredictSeparate key={idx}>
                  <PredictChartTitle className="predictChartTitle">
                    {distribution[idx]}
                  </PredictChartTitle>
                  <MyResponsivePie data={data} key={idx} />
                </PredictSeparate>
              ))}
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1.5fr 1fr",
              }}
            >
              {[tvGenres, tvKeyword, tvCountry].map((data, idx) => (
                <PredictSeparate key={idx}>
                  <PredictChartTitle className="predictChartTitle">
                    {distribution[idx]}
                  </PredictChartTitle>
                  <MyResponsivePie data={data} key={idx} />
                </PredictSeparate>
              ))}
            </div>
          )}
        </PredictChart>
        <Recommendation>
          {/* <Order>
            <h1>1</h1>
            <h1>2</h1>
            <h1>3</h1>
            <h1>4</h1>
            <h1>5</h1>
          </Order>
          <Detail>
            <h1>흥행 예측 작품</h1>
            {!predictableList ? (
              <img
                src="https://blog.kakaocdn.net/dn/cmseNl/btrhhTwEA0r/TNAoELO6JmK3rhVeNfGYy0/img.gif"
                alt=""
              />
            ) : (
              predictableList.map((prediction) => (
                <Link to={`/detail/${prediction.category}/${prediction.id}`}>
                  <Prediction key={prediction.id} prediction={prediction} />
                </Link>
              ))
            )}
          </Detail>

          <Details>
            <h1>흥행 예측 작품의 코로나 이전 유사 작품들 </h1> */}
          {/*FIXME: just for demonstration */}
          {/* {[1, 2, 3, 4, 5].map((num) => (
              <SimilarDetail>
                {!similarList ? (
                  <div></div>
                ) : (
                  similarList.map((prediction) => (
                    <Link
                      to={`/detail/${prediction.category}/${prediction.id}`}
                    >
                      <Similar key={prediction.id} prediction={prediction} />
                    </Link>
                  ))
                )}
              </SimilarDetail>
            ))}
          </Details> */}
          <Subtitles className="subtitles">
            <Subtitle className="predictSubtitle">흥행 예측 작품</Subtitle>
            <Subtitle className="recommendSubtitle">
              코로나 이전 유사 작품 추천
            </Subtitle>
          </Subtitles>
          <RecommendationList>
            {!predictableList ? (
              <img
                src="https://blog.kakaocdn.net/dn/cmseNl/btrhhTwEA0r/TNAoELO6JmK3rhVeNfGYy0/img.gif"
                alt=""
              />
            ) : (
              predictableList.map((prediction) => (
                <Link to={`/detail/${prediction.category}/${prediction.id}`}>
                  <Prediction key={prediction.id} prediction={prediction} />
                </Link>
              ))
            )}
          </RecommendationList>
        </Recommendation>
      </PredictionContainer>
    </div>
  );
};

export default Main;

const BackgroundSquare = () => {
  const style = {
    marginTop: "30px",
    position: "absolute",
    zIndex: "1",
    width: "1300px",
    height: "2600px",
    backgroundColor: "#ffffff8d",
    borderRadius: "25px",
  };
  return <div style={style}></div>;
};

//TODO: styled-components 파일은 가급적 한 파일에서 관리
const TopTen = styled.div`
  margin-top: 30px;
  height: 540px;
  background-color: #ffffff8d;
  border-radius: 25px;
`;

const TopTenTitle = styled.h1`
  margin-left: 40px;
  position: absolute;
  top: 155px;
  font-size: 35px;
`;

const StyledSlider = styled(Slider)`
  .slick-list {
    max-width: 1200px;
    top: 135px;
    margin: 0 auto;
    height: 350px;
  }

  .slick-slide div {
    display: flex;
    justify-content: center;
  }

  .slick-dots {
    bottom: -150px;
  }

  .slick-arrow {
    top: 250px;
    margin-left: 3rem;
    margin-right: 3rem;
    color: black;
  }

  .slick-prev::before {
    color: black;
  }

  .slick-next::before {
    color: black;
  }
`;

const CardBox = styled.div`
  cursor: pointer;
  width: 200px;
`;

const CardImg = styled.img`
  width: 180px;
  height: 250px;
  text-align: center;
  margin: 0 auto;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 10px;

  @media (max-width: 850px) {
    width: 100px;
    height: 150px;
  }
`;

const CardText = styled.p`
  margin: 0 auto;
  padding: 10px;
  font-family: "BMDOHYEON";
  font-size: 15px;
  align-items: center;
  text-align: center;
  height: 80px;
  width: 150px;
  color: black;

  @media (max-width: 850px) {
    font-size: 10px;
    width: 100px;
    height: 60px;
  }
`;

const PredictionContainer = styled.div`
  height: 100%;
  margin-top: 50px;
  margin-left: 40px;
  margin-right: 40px;
  z-index: 2;
  position: relative;
`;

const PredictionTitle = styled.h1`
  margin-top: 2.5rem;
  margin-bottom: 2rem;
  font-size: 35px;
`;

const PredictChart = styled.div`
  background: #ffffff9b;
  border-radius: 15px;
`;

const PredictSeparate = styled.div`
  height: 230px;
  margin: 2rem;
`;

const PredictChartTitle = styled.div`
  font-size: 28px;
  margin-bottom: 1rem;
`;

const Recommendation = styled.div`
  /* display: flex; */
  /* flex-direction: row; */
  justify-content: center;
  margin-top: 30px;
  background: #ffffff9b;
  border-radius: 15px;
  height:2080px;
  margin-bottom: 60px;
`;

const Subtitles = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const Subtitle = styled.h1`
  margin: 2rem auto;
  font-size: 28px;

  &.predictSubtitle {
    margin-left: 200px;
  }
`;

const RecommendationList = styled.div``;

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
