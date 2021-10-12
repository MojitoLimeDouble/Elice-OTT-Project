import styled from "styled-components";
import ContentsItem from "./ContentsItem";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ContentsDetail = (props) => {
  const [youtubeData, setYoutubeData] = useState([]);
  // const [ tmdbData, setTmdbData ] = useState()
  const params = useParams();
  console.log("params:", params)
  useEffect(() => {
    let optionParams = {
      q: "오징어 게임 리뷰", // 검색 조건
      part: "snippet", // 정보 출력 조건
      // key: "AIzaSyCDp5_pK7F9waWSkTnaZvCCX_EY-Euq-lI", // API KEY
      type: "video", // youtube의 video 중에서 검색
      maxResults: 3, // 상위 3개 출력
      regionCode: "KR",
    };
    optionParams.q = encodeURI(optionParams.q);

    let url = "https://www.googleapis.com/youtube/v3/search?";
    for (var option in optionParams) {
      url += option + "=" + optionParams[option] + "&";
    }

    url = url.substr(0, url.length - 1);

    const youtubeArray = [];
    axios.get(url).then((response) => {
      response.data.items.forEach((item) => {
        youtubeArray.push({
          title: item.snippet.title,
          url: "https://www.youtube.com/watch?v=" + item.id.videoId,
          thumbnail: item.snippet.thumbnails.high.url,
        });
      });
      setYoutubeData(...youtubeData, youtubeArray);
    });
  }, []);
  console.log(youtubeData);

  // ▼ main에서 영화를 누르는지, tv를 누르는지에 따라 요청해야할 api가 달라야하지 않을까
  // useEffect((props) => {
  //   if ( props.movie ) {
  //     axios
  //       // ▼ detail 뒤에 category(movie, tv) 어떻게 전달할것인지 논의(임시 movie 고정)
  //       .get(`${process.env.REACT_APP_BASE_URL}/detail/movie/`, `타이틀 정보`)
  //       .then(response => setTmdbData(response.data.content))
  //     }
  //   if ( props.tv ) {
  //     axios
  //       .get(`${process.env.REACT_APP_BASE_URL}/detail/tv/`, `타이틀 정보`)
  //       .then(response => setTmdbData(response.data.content))
  //   }
  // }, []);

  return (
    <ContainerBlock>
      <div className="container">
        <ContentsBlock>
          {youtubeData[1] == null ? <h1>fail</h1> : youtubeData[1].title}
          {/* <ContentsItem tmdb={tmdb ? {tmdbMovieData} : {tmdbTvData}} /> */}
          <ContentsItem youtube={youtubeData} />
          <ContentsItem youtube={youtubeData} />
          <ContentsItem youtube={youtubeData} />
        </ContentsBlock>
      </div>
    </ContainerBlock>
  );
};

export default ContentsDetail;

const ContentsBlock = styled.div`
  box-sizing: border-box;
  padding-right: 1.5rem;
  width: 360px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100% auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

// ▼ 전체 배경틀
const ContainerBlock = styled.div`
  .container {
    width: 100%;
    height: 100%;
    position: relative;
    background: ""; // 백에서 받아오는 포스터 이미지
    background-size: cover;
    /* z-index: 1; */
  }
  .container::before {
    content: "";
    opacity: 0.6;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: #000;
  }
  // ▼ 따로 박스를 만들어서 우측 유튜브 영상 위쪽으로 빼야할듯
  .container h1 {
    color: #fff;
    text-align: center;
    line-height: 300px;
    position: relative;
  }
`;
