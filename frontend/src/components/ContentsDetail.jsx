import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { imgUrl } from "../apis/api";

const ContentsDetail = () => {
  const [contentsInfo, setContentsInfo] = useState("");
  const [youtubeList, setYoutubeList] = useState("");
  const [like, setLike] = useState(false);

  const params = useParams();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/${params.category}/${params.id}`
      );
      setContentsInfo(response.data);
      setLike(response.data.is_like);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, [like]);

  useEffect(() => {
    const optionParams = {
      q: `${contentsInfo.title} 정보`, // 검색 조건 (여기에 백엔드에서 전달해주는 영화 title 정보 + [리뷰, 해석 등]이 붙어서 검색)
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
  }, []);
  console.log(youtubeList);

  const onClick = async () => {
    setLike(!like);
    console.log(!like);
    const body = {
      id: params.id,
      category: params.category,
      likes: !like,
    };
    await axios.patch(`/api/like`, body);
  };

  return (
    <div style={{ height: "500px", background: "pink" }}>
      {!contentsInfo ? (
        <div>Loading ... </div>
      ) : (
        contentsInfo.map((contents) => (
          <Detail
            key={contents.id}
            contents={contents}
            onClick={onClick}
            like={like}
          />
        ))
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
      <img src={`${imgUrl}${contents.poster_path}`} alt="poster" />
      <h1>{contents.title}</h1>
      <p>{contents.like_count}</p>
      <button onClick={onClick}>{!like ? "🥔" : "🍟"}</button>
      <p>{contents.overview}</p>
      <p>{contents.release_date}</p>
      <p>{contents.runtime}</p>
      <p>{contents.genres}</p>
      <p>{contents.director}</p>
      <p>{contents.crew}</p>
      <p>
        {!contents.positive_comment ? (
          <span></span>
        ) : (
          contents.positive_comment.map((comment, idx) => (
            <span key={idx}>{comment}</span>
          ))
        )}
      </p>
      <p>
        {!contents.positive_comment ? (
          <span></span>
        ) : (
          contents.negative_comment.map((comment, idx) => (
            <span key={idx}>{comment}</span>
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
