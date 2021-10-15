import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Prediction = ({ prediction }) => {
  return (
    <Container>
      <Poster bg={prediction.poster_path} />
      <h1>{prediction.title}</h1>
    </Container>
  );
};

export default Prediction;

export const PredictionOrder = ({ List, currTab }) => {
  return (
    <OrderContainer>
      <Link to={`/detail/${currTab}/${List[0].id}`}>
        <Prediction prediction={List[0]} />
      </Link>
      {List.slice(1).map((list) => (
        <Link to={`/detail/${currTab}/${list.id}`}>
          <Prediction prediction={list} key={list.id} />
        </Link>
      ))}
    </OrderContainer>
  );
};

export const ContentsCard = ({ contents }) => {
  return (
    <SimilarContainer>
        <Poster bg={contents.poster_path} />
        <Title>{contents.title}</Title>
        {/* TODO: 찜 수는 따로 표기 또는 빼기 */}
        {/* <h1>{contents.like_count}</h1> */}
    </SimilarContainer>
  );
};

const Container = styled.div`
  height: 300px;
  width: 200px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 7px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  width: 180px;
  height: 250px;
  margin: 0 auto;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 10px;
`;

const Title = styled.h2`
  margin: 0 auto;
  margin-bottom: 10px;
  padding: 10px;
  font-family: "BMDOHYEON";
  font-size: 15px;
  align-items: center;
  text-align: center;
  height: 70px;
  width: 150px;
  color: black;
`;

const SimilarContainer = styled.div`
`;

const OrderContainer = styled.div`
  display: flex;
`;
