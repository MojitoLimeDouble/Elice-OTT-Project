// 테스트용, 나중에 삭제 예정

import React from "react";
import styled from "styled-components";

const PredictionPotato = ({ prediction }) => {
  return (
    <Container>
      <h1 style={{ height: "25px" }}>{prediction.genres[0]}</h1>
      <Poster bg={prediction.medium_cover_image} />
      <h1>{prediction.title}</h1>
    </Container>
  );
};

export default PredictionPotato;

export const Similar = ({ prediction }) => {
  return (
    <SimilarContainer>
      <h1 style={{ height: "25px" }}>{prediction.genres[0]}</h1>
      <Poster bg={prediction.medium_cover_image} />
      <h1>{prediction.title}</h1>
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