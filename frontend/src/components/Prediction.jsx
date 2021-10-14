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
      <h1>{contents.title}</h1>
      <h1>{contents.release_data}</h1>
      <h1>{contents.genres}</h1>
      <h1>{contents.like_count}</h1>
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
  height: 80%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
`;

const SimilarContainer = styled.div`
  height: 300px;
  width: 200px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 7px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OrderContainer = styled.div`
  display: flex;
`;
