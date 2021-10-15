import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import PosterAndTitle from "./PosterAndTitle";
import WordCloudComponent from "./WordCloudComponent";
import WordCloudDataExample from "./WordCloudDataExample";
import { useParams } from "react-router-dom";
import tokenHeader from "../authorization/tokenHeader";

const PotatoBasket = ({
  moviePotatoList,
  tvPotatoList,
  onMoviePotatoes,
  onTvPotatoes,
}) => {
  const params = useParams();
  const potatoData = async () => {
    try {
      const response = await axios.get(
        `/api/potato_basket/${params.nickname}`,
        { header: tokenHeader() }
      );
      onMoviePotatoes(response.data[0].movie);
      onTvPotatoes(response.data[1].tv);
    } catch (error) {
      console.log(error.response);
    }
  };
  // 영화 찐 감자 분석
  const movieAnalysis = async () => {
    try {
      const response = await axios.get(
        `/api/potato_basket/${params.nickname}/movie`,
        { header: tokenHeader() }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  // TV 찐 감자 분석
  const tvAnalysis = async () => {
    try {
      const response = await axios.get(
        `/api/potato_basket/${params.nickname}/tv`,
        { header: tokenHeader() }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    potatoData();
    movieAnalysis();
    tvAnalysis();
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
                moviePotatoList?.map((movie) => (
                  <PosterAndTitle
                    key={movie.id}
                    prediction={movie}
                    category="movie"
                  />
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
                tvPotatoList?.map((tv) => (
                  <PosterAndTitle key={tv.id} prediction={tv} category="tv" />
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
