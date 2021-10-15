import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tokenHeader from "../authorization/tokenHeader";

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
  }

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
    <div style={{ height: "500px", background: "pink" }}>
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
      {youtubeList == [] ? (
        <h1>Loading...</h1>
      ) : (
        youtubeList.map((youtube) => (
          <YoutubeContents key={youtube.url} youtube={youtube} />
        ))
      )}
    </div>
  );
};

export default ContentsDetail;

export const Detail = ({ contents, onClick, like }) => {
  return (
    <div>
      <img src={`${contents.poster_path}`} alt="poster" />
      <h1>제목: {contents.title}</h1>
      <p>찐 감자: {contents.like_count}</p>
      <button onClick={onClick} style={{ cursor: "pointer" }}>
        {!like ? "🥔" : "🍟"}
      </button>
      <p>줄거리: {contents.overview}</p>
      <p>개봉일: {contents.release_date}</p>
      <p>상영 시간: {contents.runtime} 분</p>
      <p>
        장르:
        {contents.genres?.map((genres, idx) => (
          <span key={idx}>{genres} </span>
        ))}
      </p>
      <p>감독: {contents.director}</p>
      <p>
        주연:
        {contents.cast?.slice(0, 4).map((cast, idx) => (
          <span key={idx}>#{cast} </span>
        ))}
      </p>
      <p>
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
      <p>
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
  );
};

export const YoutubeContents = ({ youtube }) => {
  return (
    <div>
      <iframe
        width="200"
        height="150"
        src={`https://www.youtube.com/embed/${youtube.id}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
};
