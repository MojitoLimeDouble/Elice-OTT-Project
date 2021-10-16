import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import PotatoPosterAndTitle from "./PotatoPosterAndTitle";
import WordCloudComponent from "./WordCloudComponent";
import { useParams } from "react-router-dom";
import tokenHeader from "../authorization/tokenHeader";
import { Scrollbars } from "react-custom-scrollbars";

const PotatoBasket = ({
  moviePotatoList,
  tvPotatoList,
  onMoviePotatoes,
  onTvPotatoes,
}) => {
  const params = useParams();
  const [movieWord, setMovieWord] = useState([]);
  const [tvWord, setTvWord] = useState([]);
  const potatoData = async () => {
    try {
      const response = await axios.get(
        `/api/potato_basket/${params.nickname}`,
        {
          headers: tokenHeader(),
        }
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
        {
          headers: tokenHeader(),
        }
      );
      let movieWordList = [];
      Object.values(response.data).map((content) =>
        content.slice(0, 5).map(
          (content2) =>
            (movieWordList = movieWordList.concat({
              text: content2[0],
              value: content2[1],
            }))
        )
      );
      setMovieWord(movieWord.concat(movieWordList));
    } catch (error) {
      console.log(error.response);
    }
  };
  // TV 찐 감자 분석
  const tvAnalysis = async () => {
    try {
      const response = await axios.get(
        `/api/potato_basket/${params.nickname}/tv`,
        {
          headers: tokenHeader(),
        }
      );
      let tvWordList = [];
      Object.values(response.data).map((content) =>
        content.slice(0, 5).map(
          (content2) =>
            (tvWordList = tvWordList.concat({
              text: content2[0],
              value: content2[1],
            }))
        )
      );
      setTvWord(tvWord.concat(tvWordList));
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    potatoData();
    movieAnalysis();
    tvAnalysis();
  }, [params]);

  return (
    <Baskets>
      <Container className="container">
        <Basket className="movieBasket">
          <BasketTitle>영화 감자 바구니</BasketTitle>
          <Scrollbars
            style={{
              position: "relative",
              height: "450px",
            }}
            className="Scrollbar"
            renderThumbVertical={({ style, ...props }) => (
              <div
                {...props}
                style={{
                  ...style,
                  zIndex: "5",
                  backgroundColor: "#c9b3f3dd",
                  borderRadius: "inherit",
                }}
              />
            )}
          >
            <PotatoList className="MoviePotatoList">
              <ListDetail>
                {!moviePotatoList ? (
                  <h1 style={{ fontSize: "30px", color: "black" }}>
                    Loading ...
                  </h1>
                ) : (
                  moviePotatoList?.map((movie) => (
                    <PotatoPosterAndTitle
                      key={movie.id}
                      prediction={movie}
                      category="movie"
                    />
                  ))
                )}
              </ListDetail>
            </PotatoList>
          </Scrollbars>
        </Basket>
        <PotatoAnalysis>
          <BasketTitle>찐 영화 감자 분석</BasketTitle>
          <WordCloudComponent
            style={{ display: "static" }}
            words={movieWord}
          />
        </PotatoAnalysis>
      </Container>
      <div style={{ height: "10px" }} />
      <Container className="container">
        <Basket className="tvBasket">
          <BasketTitle>TV 감자 바구니</BasketTitle>
          <Scrollbars
            style={{
              position: "relative",
              height: "450px",
            }}
            className="Scrollbar"
            renderThumbVertical={({ style, ...props }) => (
              <div
                {...props}
                style={{
                  ...style,
                  zIndex: "5",
                  backgroundColor: "#c9b3f3dd",
                  borderRadius: "inherit",
                }}
              />
            )}
          >
            <PotatoList className="tvPotatoList">
              <ListDetail>
                {!tvPotatoList ? (
                  <h1 style={{ fontSize: "30px", color: "black" }}>
                    Loading ...
                  </h1>
                ) : (
                  tvPotatoList?.map((tv) => (
                    <PotatoPosterAndTitle
                      key={tv.id}
                      prediction={tv}
                      category="tv"
                    />
                  ))
                )}
              </ListDetail>
            </PotatoList>
          </Scrollbars>
        </Basket>
        <PotatoAnalysis>
          <BasketTitle>찐 TV 감자 분석</BasketTitle>
          <WordCloudComponent
            style={{ display: "static" }}
            words={tvWord}
          />
        </PotatoAnalysis>
      </Container>
    </Baskets>
  );
};

export default PotatoBasket;

const Baskets = styled.div`
  background-color: #ffffff8d;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 25px;
  padding: 30px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 20px auto;
`;

const Basket = styled.div`
  width: 750px;
  background-color: #ffffff8d;
  border-radius: 25px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const BasketTitle = styled.p`
  font-size: 25px;
  font-weight: bold;
  text-align: left;
  margin: 30px;
  margin-bottom: 10px;
`;

const PotatoList = styled.div`
  height: 465px;
  padding: 10px;
  /* overflow-y: auto; */
`;

const PotatoAnalysis = styled.div`
  height: 550px;
  width: 400px;
  background-color: #ffffff8d;
  border-radius: 25px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const ListDetail = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;
