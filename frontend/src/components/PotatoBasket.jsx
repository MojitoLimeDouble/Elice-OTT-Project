import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import PosterAndTitle from "./PosterAndTitle";
import WordCloudComponent from "./WordCloudComponent";
import WordCloudDataExample from "./WordCloudDataExample";

const PotatoBasket = ({
  moviePotatoList,
  tvPotatoList,
  onMoviePotatoes,
  onTvPotatoes,
}) => {
  // 은열님의 외부 api 받아오는 코드 동일하게 적용
  // 추후 데이터 베이스에서 영화와 tv 프로그램에 대한 각각의 리스트를 받을 예정
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://yts.mx/api/v2/list_movies.json?limit=3"
        );
        onMoviePotatoes(response.data.data.movies);
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
          "https://yts.mx/api/v2/list_movies.json?limit=10"
        );
        onTvPotatoes(response.data.data.movies);
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
            <ListDetail>
              {!moviePotatoList ? (
                <h1 style={{ fontSize: "30px", color: "black" }}>
                  Loading ...
                </h1>
              ) : (
                moviePotatoList?.map((prediction) => (
                  <PosterAndTitle key={prediction.id} prediction={prediction} />
                ))
              )}
            </ListDetail>
          </Potatoes>
        </Basket>
        <PotatoAnalysis>
          <BasketTitle>영화 찐 감자 분석</BasketTitle>
          <WordCloudComponent
            style={{ display: "static" }}
            words={WordCloudDataExample}
          />
        </PotatoAnalysis>
      </Container>
      <Container>
        <Basket>
          <BasketTitle>TV 감자 바구니</BasketTitle>
          <Potatoes>
            <ListDetail>
              {!tvPotatoList ? (
                <h1 style={{ fontSize: "30px", color: "black" }}>
                  Loading ...
                </h1>
              ) : (
                tvPotatoList?.map((prediction) => (
                  <PosterAndTitle key={prediction.id} prediction={prediction} />
                ))
              )}
            </ListDetail>
          </Potatoes>
        </Basket>
        <PotatoAnalysis>
          <BasketTitle>TV 찐 감자 분석</BasketTitle>
          <WordCloudComponent
            style={{ display: "static" }}
            words={WordCloudDataExample}
          />
        </PotatoAnalysis>
      </Container>
    </div>
  );
};

export default PotatoBasket;

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
  height: 555px;
  width: 500px;
  background-color: gainsboro;
`;

const ListDetail = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;
