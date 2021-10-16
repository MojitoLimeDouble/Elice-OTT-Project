import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { PredictionOrder } from "./Prediction";
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
import { imgUrl } from "../apis/api";

const Main = ({ popularList, predictableList, onPopular, onPredictable }) => {
  const [currTab, setCurrTab] = useState("MOVIE");
  const [height, setHeight] = useState(994);
  const predictRef = useRef(null);
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
    hitContents();
  };

  const subject = currTab.toLowerCase();

  const topRated = async () => {
    try {
      const response = await axios.get("/api/top_rated");
      onPopular(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    topRated();
  }, []);

  useEffect(() => {
    requestContents(subject);
  }, [currTab]);

  useEffect(() => {
    if (predictRef.current) {
      setHeight(predictRef.current.clientHeight);
    }
  });

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
  const order = ["1.", "2.", "3.", "4.", "5."];
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
                <CardImg
                  alt="인기 컨텐츠"
                  src={`${imgUrl}${content.poster_path}`}
                />
                <CardText>{content.title}</CardText>
              </CardBox>
            ))}
          </StyledSlider>
        )}
      </TopTen>
      <BackgroundSquare height={height} />
      <PredictionContainer className="prediction" ref={predictRef}>
        <Tab currTab={currTab} onClick={handleClickTab} />
        <PredictionTitle className="predictionTiTle">{`${currTab} 흥행 예측 분석 top 5`}</PredictionTitle>
        <PredictChart className="predictChart">
          {currTab === "MOVIE" ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.4fr 1.5fr 1fr",
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
              className="predictContainer"
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
        <Recommendation className="recommendation">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.8fr 4fr",
              padding: "0px 30px",
              marginBottom: "30px",
              fontSize: "25px",
            }}
            className="subtitles"
          >
            <h1>흥행 예측 top 5</h1>
            <h1>코로나 이전 유사 컨텐츠</h1>
          </div>
          {!predictableList ? (
            <img
              src="https://blog.kakaocdn.net/dn/cmseNl/btrhhTwEA0r/TNAoELO6JmK3rhVeNfGYy0/img.gif"
              alt=""
              style={{
                width: "20%",
                marginTop: "80px",
              }}
            />
          ) : (
            predictableList.map((List, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  // padding: "30px",
                  borderBottom: "solid 2px #a6a3f1",
                  marginBottom: "60px",
                }}
              >
                <h1
                  style={{
                    fontSize: "30px",
                    color: "#8e8be9",
                    transform: "translateY(150px) translateX(10px)",
                  }}
                >
                  {order[idx]}
                </h1>
                <PredictionOrder List={List} currTab={currTab.toLowerCase()} />
              </div>
            ))
          )}
        </Recommendation>
      </PredictionContainer>
    </div>
  );
};

export default Main;

const BackgroundSquare = ({ height }) => {
  const style = {
    marginTop: "30px",
    position: "absolute",
    zIndex: "1",
    width: "1300px",
    height: `${height + 20}px`,
    backgroundColor: "#ffffff8d",
    borderRadius: "25px",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
  };
  return <div style={style}></div>;
};

//TODO: styled-components 파일은 가급적 한 파일에서 관리
const TopTen = styled.div`
  margin-top: 30px;
  height: 540px;
  background-color: #ffffff8d;
  border-radius: 25px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const TopTenTitle = styled.h1`
  text-align: left;
  margin-left: 80px;
  position: relative;
  top: 50px;
  font-size: 35px;
`;

const StyledSlider = styled(Slider)`
  .slick-list {
    max-width: 1200px;
    top: 95px;
    margin: 0 auto;
    height: 350px;
  }

  .slick-slide div {
    display: flex;
    justify-content: center;
  }

  .slick-dots {
    bottom: -110px;
  }

  .slick-arrow {
    top: 200px;
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
  /* cursor: pointer; */
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
  font-family: "NotoSansKR";
  font-weight: bold;
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
  padding-bottom: 30px;
  margin: 50px 40px;
  margin-bottom: 0px;
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
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const PredictSeparate = styled.div`
  height: 230px;
  margin: 2rem 0;
`;

const PredictChartTitle = styled.div`
  font-size: 28px;
  margin-bottom: 1rem;
`;

const Recommendation = styled.div`
  justify-content: center;
  margin-top: 30px;
  background: #ffffff9b;
  border-radius: 15px;
  /* height: 2080px; */
  margin-bottom: 40px;
  padding: 0 30px;
  padding-top: 35px;
  padding-bottom: 1px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
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
