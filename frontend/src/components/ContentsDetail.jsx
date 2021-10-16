import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tokenHeader from "../authorization/tokenHeader";
import styled from "styled-components";

const ContentsDetail = () => {
  const [contentsInfo, setContentsInfo] = useState("");
  const [youtubeList, setYoutubeList] = useState([]);
  const [like, setLike] = useState(false);

  const params = useParams();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/detail/${params.category}/${params.id}`,
        {
          headers: tokenHeader(),
        }
      );
      setContentsInfo(response.data.content);
      setLike(response.data.is_like);
    } catch (error) {
      console.log(error.response);
    }
  };
  const requestAPI = () => {
    const optionParams = {
      q: `${params.title} 리뷰`, // 검색 조건 (여기에 백엔드에서 전달해주는 영화 title 정보 + [리뷰, 해석 등]이 붙어서 검색)
      part: "snippet", // 정보 출력 조건
      // key: process.env.REACT_APP_YOUTUBE_API_KEY, // API KEY (각자 API KEY로)
      // key:"AIzaSyAu_idjnlqJevCb_K3jcBj8_1pGaFW6FIc",
      type: "video", // youtube의 video 중에서 검색
      maxResults: 3, // 상위 1개 출력
      regionCode: "KR",
    };
    optionParams.q = encodeURI(optionParams.q);

    let url = "https://www.googleapis.com/youtube/v3/search?";
    for (let option in optionParams) {
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
          id: item.id.videoId,
        });
      });
      setYoutubeList(...youtubeList, youtubeArray);
      console.log(response.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, [like]);

  useEffect(() => {
    requestAPI();
  }, []);

  const onClick = async () => {
    setLike(!like);
    const body = {
      id: params.id,
      category: params.category,
      likes: !like,
    };
    await axios.patch(`/api/like`, body, {
      headers: tokenHeader(),
    });
  };

  return (
    <DetailInfoTotal>
      {!contentsInfo ? (
        <div>Loading ... </div>
      ) : (
        <Detail
          key={contentsInfo.id}
          contents={contentsInfo}
          onClick={onClick}
          like={like}
        />
      )}
      <Subtitle style={{ textAlign: "left", margin: "30px auto" }}>
        연관 Youtube 영상
      </Subtitle>
      <RecommendYoutube>
        {youtubeList == [] ? (
          <h1>Loading...</h1>
        ) : (
          youtubeList.map((youtube) => (
            <YoutubeContents key={youtube.url} youtube={youtube} />
          ))
        )}
      </RecommendYoutube>
    </DetailInfoTotal>
  );
};

export default ContentsDetail;

export const Detail = ({ contents, onClick, like }) => {
  return (
    <div>
      <Title>{contents.title}</Title>
      <Details>
        <Poster
          src={`${contents.poster_path}`}
          alt={`${contents.title} poster`}
        />
        <Info>
          <InfoGrid
            style={{ alignItems: "flex-start", transform: "translateY(15px)" }}
          >
            <Subtitle>줄거리</Subtitle>
            <p>{contents.overview}</p>
          </InfoGrid>
          <InfoGrid>
            <Subtitle>개봉일</Subtitle>
            <p>{contents.release_date}</p>
          </InfoGrid>
          <InfoGrid>
            <Subtitle>영상 시간</Subtitle>
            <p>{contents.runtime}분</p>
          </InfoGrid>
          <InfoGrid>
            <Subtitle>장르</Subtitle>
            <p>
              {contents.genres?.map((genres, idx) => (
                <span key={idx} style={{ marginRight: "15px" }}>
                  {genres}{" "}
                </span>
              ))}
            </p>
          </InfoGrid>
          <InfoGrid>
            <Subtitle>감독</Subtitle>
            <p>{contents.director}</p>
          </InfoGrid>
          <InfoGrid>
            <Subtitle>주연</Subtitle>
            <p>
              {contents.cast?.slice(0, 4).map((cast, idx) => (
                <span key={idx} style={{ marginRight: "15px" }}>
                  {cast}{" "}
                </span>
              ))}
            </p>
          </InfoGrid>
          <InfoGrid>
            <Subtitle>연관어</Subtitle>
            <div style={{ display: "inline-flex", alignItems: "flex-end" }}>
              <p style={{ wordSpacing: "10px" }}>
                {contents.positive_comment[0] === "NaN" ? (
                  <span></span>
                ) : (
                  contents.positive_comment?.map((comment, idx) => (
                    <span key={idx} style={{ color: "blue" }}>
                      #{comment}{" "}
                    </span>
                  ))
                )}
              </p>
              <p style={{ marginLeft: "10px", wordSpacing: "10px" }}>
                {contents.negative_comment[0] === "NaN" ? (
                  <span></span>
                ) : (
                  contents.negative_comment?.map((comment, idx) => (
                    <span key={idx} style={{ color: "red" }}>
                      #{comment}{" "}
                    </span>
                  ))
                )}
              </p>
            </div>
          </InfoGrid>
          <InfoGrid className="like" style={{ transform: "translateY(-15px)" }}>
            <Subtitle>찐 감자 </Subtitle>
            <div style={{ display: "inline-flex", alignItems: "flex-end" }}>
              <p>{contents.like_count}개</p>
              <button
                onClick={onClick}
                style={{
                  cursor: "pointer",
                  background: "None",
                  outline: "None",
                  border: "None",
                  transform: "translateY(5px)",
                }}
              >
                {!like ? (
                  <img
                    src={
                      "https://cdn.discordapp.com/attachments/885309843286683658/898710849080950804/potatoessdfg_1.png"
                    }
                    width="30px"
                    height="40px"
                  />
                ) : (
                  <img
                    src={
                      "https://cdn.discordapp.com/attachments/891862598247665775/898686211684700191/steamed_potatoes2.png"
                    }
                    width="30px"
                    height="40px"
                  />
                )}
              </button>
            </div>
          </InfoGrid>
        </Info>
      </Details>
    </div>
  );
};

export const YoutubeContents = ({ youtube }) => {
  return (
    <div>
      <iframe
        width="360px"
        height="210px"
        src={`https://www.youtube.com/embed/${youtube.id}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
};

const Details = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
`;

const Info = styled.div`
  display: grid;
  grid-template-rows: repeat(8, auto);
  text-align: left;
  padding: 10px 0px;
  padding-left: 30px;
`;

const Poster = styled.img`
  width: 300px;
  height: 450px;
  border-radius: 25px;
`;

const DetailInfoTotal = styled.div`
  background-color: #ffffff8d;
  border-radius: 25px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  padding: 40px 50px;
  line-height: 23px;
`;

const Title = styled.h1`
  font-size: 35px;
  text-align: left;
  margin-bottom: 25px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 120px auto;
  align-items: flex-end;
`;

const Subtitle = styled.h2`
  font-size: 25px;
  text-align: right;
  padding-right: 15px;
`;

const RecommendYoutube = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
`;
