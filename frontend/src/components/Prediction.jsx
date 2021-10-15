import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// 흥행 예측 결과 출력
const Prediction = ({ prediction }) => {
  return (
    <Container style={{marginRight:"30px"}}>
      <PredictPoster bg={prediction.poster_path} />
      <PredictTitle>{prediction.title}</PredictTitle>
    </Container>
  );
};

// 코로나 이전 컨텐츠 추천
const Recommend = ({ prediction }) => {
  return (
    <Container style={{transform:"translateY(3px)"}}>
      <RecommendPoster bg={prediction.poster_path} />
      <RecommendTitle>{prediction.title}</RecommendTitle>
    </Container>
  );
};

// 메인 페이지 흥행 예측 포스터 출력용
export const PredictionOrder = ({ List, currTab }) => {
  return (
    <PredictContainer className="predictAndRecommend">
      <Link to={`/detail/${currTab}/${List[0].id}/${List[0].title}`}>
        <Prediction prediction={List[0]} />
      </Link>
      {List.slice(1).map((list) => (
        <div style={{display: "grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", alignContent:"flex-end"}}>
          <Link to={`/detail/${currTab}/${list.id}/${list.title}`}>
            <Recommend prediction={list} key={list.id} />
          </Link>
        </div>
      ))}
    </PredictContainer>
  );
};

// 카테고리 페이지 포스터 출력용
export const ContentsCard = ({ contents }) => {
  return (
    <Container>
      <Poster bg={contents.poster_path} />
      <Title>{contents.title}</Title>
      {/* TODO: 찜 수는 따로 표기 또는 빼기 */}
      {/* <h1>{contents.like_count}</h1> */}
    </Container>
  );
};

const Container = styled.div``;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  width: 180px;
  height: 250px;
  margin: 0 auto;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 10px;
`;

const PredictPoster = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  width: 230px;
  height: 300px;
  margin: 0 auto;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 10px;
`;

const RecommendPoster = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  width: 150px;
  height: 230px;
  margin: 0 auto;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 10px;
`;

const Title = styled.h2`
  margin: 0 auto;
  margin-bottom: 10px;
  padding: 10px 0px;
  font-family: "NotoSansKR";
  font-weight: bold;
  font-size: 15px;
  align-items: center;
  text-align: center;
  height: 70px;
  width: 170px;
  color: black;
`;

const PredictTitle = styled.h2`
  margin: 0 auto;
  margin-bottom: 10px;
  padding: 10px 0px;
  font-family: "NotoSansKR";
  font-weight: bold;
  font-size: 18px;
  align-items: center;
  text-align: center;
  /* height: 70px; */
  width: 250px;
  color: black;
`;

const RecommendTitle = styled.h2`
  margin: 0 auto;
  margin-bottom: 10px;
  padding: 10px 0px;
  font-family: "NotoSansKR";
  font-weight: bold;
  font-size: 13px;
  align-items: center;
  text-align: center;
  height: 40px;
  width: 160px;
  color: black;
`;

const PredictContainer = styled.div`
  display: grid;
  grid-template-columns: 1.8fr 1fr 1fr 1fr 1fr;
  /* background-color:#e5caff97 ; */
  border-radius: 25px;
  padding: 0px 20px;
  /* margin-bottom: 20px; */
`;
