import styled from "styled-components";
import ContentsItem from "./ContentsItem";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

// const YoutubeList = ({ youtube }) => {
//   return (
//     <div>
//       <img src={`${youtube.thumbnail}`} alt="youtubeThumbnail" />
//     </div>
//   )
// }

const ContentsDetail = () => {
  const [ youtubeData, setYoutubeData ] = useState([]);
  const [ tmdbData, setTmdbData ] = useState([]);
  const [ tmdbDataId, setTmdbDataId ] = useState(0);

  const params = useParams();
  console.log("params:", params)
  
  useEffect(() => {
    for (let qOption of ["리뷰", "해석", "추천"]) {
      var optionParams = {
        q: params.title + qOption, 
    // let optionParams = {
    //   q: "오징어 게임 리뷰", // 검색 조건
        part: "snippet", // 정보 출력 조건
        key: "AIzaSyCHpkJs6EOWHMdfbfhGpxRt0YQ7G3lfN-M", // API KEY
        type: "video", // youtube의 video 중에서 검색
        maxResults: 1, // 상위 1개 출력
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
    }    
  }, [youtubeData]);
    // console.log(youtubeData[1]);

  useEffect(() => {
    const copyTmdb = [];
    axios
    .get(`${process.env.REACT_APP_BASE_URL}/detail/${params.category}/${params.id}`, ) // 컨텐츠 카테고리정보랑 해당 컨텐츠 id값(백엔드 API Get : category, id)
    .then(response => {
      console.log(response);
      if (response.data.result === "success") {
        response.data.items.map(item => {
          copyTmdb.concat({
            id: tmdbDataId,
            title: item.title,
            poster: item.poster_path,
            like: item.like_count,
            overview: item.overview,
          });
        });
      };
      setTmdbDataId( tmdbDataId + 1 ); // id 값 증가
      setTmdbData(...tmdbData, copyTmdb);
    });
  }, [])

  return (
    <ContainerBlock>
      <div className="container">
        {/* <h1>{youtubeData.title}</h1>
        {youtubeData.map(youtube => (
          <YoutubeList youtube={youtube} key={params.id}/>
        ))} */}
        <ContentsBlock>
          <ContentsItem youtube={youtubeData[0]} />
          <ContentsItem youtube={youtubeData[1]} />
          <ContentsItem youtube={youtubeData[2]} />
        </ContentsBlock>
      </div>
    </ContainerBlock>
  )
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
`