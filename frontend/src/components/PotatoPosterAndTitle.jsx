// 감자 바구니 영화/tv 프로그램의 각각 poster와 title을 받아옴

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PotatoPosterAndTitle = ({ prediction, category }) => {
  return (
    <Container>
      <Link to={`/detail/${category}/${prediction.id}/${prediction.title}`}>
        <Poster bg={prediction.poster_path} />
        <Title>{prediction.title}</Title>
      </Link>
    </Container>
  );
};

export default PotatoPosterAndTitle;

const Container = styled.div``;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  width: 150px;
  height: 200px;
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
  height: 50px;
  width: 150px;
  color: black;
`;
