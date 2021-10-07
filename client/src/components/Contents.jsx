import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const Contents = () => {
  const [ YouTubeList, setYouTubeList ] = useState();
  var request = require("request");
  var optionParams = {
    q: "오징어 게임", // 검색 조건
    part: "snippet", // 정보 출력 조건
    key: "AIzaSyCDp5_pK7F9waWSkTnaZvCCX_EY-Euq-lI", // API KEY
    type: "video", // youtube의 video 중에서 검색
    maxResults: 3, // 상위 3개 출력
    regionCode: "KR",
  };

  //한글을 검색어로 전달하기 위해선 url encoding 필요!
  optionParams.q = encodeURI(optionParams.q);

  var url = "https://www.googleapis.com/youtube/v3/search?";
  for (var option in optionParams) {
    url += option + "=" + optionParams[option] + "&";
  }

  //url의마지막에 붙어있는 & 정리
  url = url.substr(0, url.length - 1);

  request(url, function (err, res, body) {
    // console.log(body)

    //json형식을 서버로 부터 받음
    var data = JSON.parse(body).items;
    for (var content in data) {
      console.log(data[content].snippet.title);
      console.log(
        "https://www.youtube.com/watch?v=" + data[content].id.videoId
      );
      console.log(data[content].snippet.thumbnails.high.url);
      console.log();
    }
  });

  return (
  <div>
    {contentsList.map((content) => (
<CardBox key={content.id}>
<CardImg alt="인기 컨텐츠" src={content.medium_cover_image} />
<CardText>{content.title}</CardText>
  </div>
  )
};

export default Contents;

// const Contents = () => {
//     const [ detailPoster, setDetailPoster ] = useState(); // detail main poster picture
//     const [ detailThumbnail, setDetailThumbnail ] = useState(); // YouTube Thumbnail

//     const params = {
//         key: "AIzaSyCDp5_pK7F9waWSkTnaZvCCX_EY-Euq-lI", // api key
//         part: "snippet", // 관련 영상
//         maxResults: 3, // 불러올 영상 최대 개수(여기서 많이 불러오면 크레딧이?)
//         q: {example}, // 이게 중요, 여기에 props로 타이틀을 받아야할거 같은데 .. ?
//         type: "video", // video로 설정해줘야 영상 검색 가능
//         videoDuration: "short", // 영상 길이 @분 이상 탐색
//     }

//     axios.defaults.baseURL = "https://www.googleapis.com/youtube/v3";

//     const YouTubeAPI = useCallback(() => {
//       axios
//         .get("/search", { params })
//         .then((response) => {
//             console.log(response);
//             if(!response) {
//                 setError("검색된 영상이 없습니다");
//                 return;
//             }
//             const itemRandom = Math.floor(Math.random() * 20);
//             console.log(response.data.items[itemRandom]);
//             // setState(response.data.items[itemRandom]);
//             dispatch(addPlaylistRequest(response.data.items[itemRandom]));
//         })
//         .catch((error) => {
//             console.log(error);
//         });
//     }, [params, dispatch]);

//     const changeKeyword = (keyword) => {
//         setParams({ ...params, q: `${example} 영상목록`});
//         YouTubeAPI();
//     }

//     return (
//         <div style={{ backgroundColor: "black" }}>
//         </div>
//     );
// };

// export default Contents;

// URL: https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=YOUR_API_KEY
//      &part=snippet,contentDetails,statistics,status

// 설명: 이 예에서는 video 리소스를 검색하며 API 응답에 포함되어야 하는 몇 가지 리소스 부분을 식별합니다.

// API 응답:

// { 
//  "kind": "youtube#videoListResponse",
//  "etag": "\"UCBpFjp2h75_b92t44sqraUcyu0/sDAlsG9NGKfr6v5AlPZKSEZdtqA\"",
//  "videos": [
//   {
//    "id": "7lCDEYXw3mM",
//    "kind": "youtube#video",
//    "etag": "\"UCBpFjp2h75_b92t44sqraUcyu0/iYynQR8AtacsFUwWmrVaw4Smb_Q\"",
//    "snippet": { 
//     "publishedAt": "2012-06-20T22:45:24.000Z",
//     "channelId": "UC_x5XG1OV2P6uZZ5FSM9Ttw",
//     "title": "Google I/O 101: Q&A On Using Google APIs",
//     "description": "Antonio Fuentes speaks to us and takes questions on working with Google APIs and OAuth 2.0.",
//     "thumbnails": {
//      "default": {
//       "url": "https://i.ytimg.com/vi/7lCDEYXw3mM/default.jpg"
//      },
//      "medium": {
//       "url": "https://i.ytimg.com/vi/7lCDEYXw3mM/mqdefault.jpg"
//      },
//      "high": {
//       "url": "https://i.ytimg.com/vi/7lCDEYXw3mM/hqdefault.jpg"
//      }
//     },
//     "categoryId": "28"
//    },
//    "contentDetails": {
//     "duration": "PT15M51S",
//     "aspectRatio": "RATIO_16_9"
//    },
//    "statistics": {
//     "viewCount": "3057",
//     "likeCount": "25",
//     "dislikeCount": "0",
//     "favoriteCount": "17",
//     "commentCount": "12"
//    },
//    "status": {
//     "uploadStatus": "STATUS_PROCESSED",
//     "privacyStatus": "PRIVACY_PUBLIC"
//    }
//   }
//  ]
// }