import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Prediction, { Similar } from "./PredictionPotato";

const PotatoBasket = ({
  potatoMovieList,
  potatoTvList,
  popularList,
  onPopular,
}) => {
  // 은열님의 외부 api 받아오는 코드 사용
  // 추후 potato movie list와 potato tv list로 각각 받아올 예정
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://yts.mx/api/v2/list_movies.json?limit=4"
        );
        onPopular(response.data.data.movies);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Container>
        <Basket>
          <BasketTitle>영화 감자 바구니</BasketTitle>
          <Potatoes>
            <SimilarDetail>
              {!popularList ? (
                <h1 style={{ fontSize: "30px", color: "black" }}>
                  Loading ...
                </h1>
              ) : (
                popularList?.map((prediction) => (
                  <Similar key={prediction.id} prediction={prediction} />
                ))
              )}
            </SimilarDetail>
          </Potatoes>
        </Basket>
        <PotatoAnalysis>영화 찐 감자 분석</PotatoAnalysis>
      </Container>
      <Container>
        <Basket>
          <BasketTitle>TV 감자 바구니</BasketTitle>
          <Potatoes>
            <SimilarDetail>
              {!popularList ? (
                <h1 style={{ fontSize: "30px", color: "black" }}>
                  Loading ...
                </h1>
              ) : (
                popularList?.map((prediction) => (
                  <Similar key={prediction.id} prediction={prediction} />
                ))
              )}
            </SimilarDetail>
            <SimilarDetail>
              {!popularList ? (
                <h1 style={{ fontSize: "30px", color: "black" }}>
                  Loading ...
                </h1>
              ) : (
                popularList?.map((prediction) => (
                  <Similar key={prediction.id} prediction={prediction} />
                ))
              )}
            </SimilarDetail>
          </Potatoes>
        </Basket>
        <PotatoAnalysis>TV 찐 감자 분석</PotatoAnalysis>
      </Container>
    </div>
  );
};

export default PotatoBasket;

// styled components

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 3rem;
`;

const Basket = styled.div`
  width: 800px;
  background-color: orange;
`;

const BasketTitle = styled.p`
  font-size: x-large;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Potatoes = styled.div`
  height: 500px;
  overflow-y: auto;
`;

const PotatoAnalysis = styled.div`
  width: 500px;
  background-color: gainsboro;
`;

const SimilarDetail = styled.div`
  display: flex;
`;
