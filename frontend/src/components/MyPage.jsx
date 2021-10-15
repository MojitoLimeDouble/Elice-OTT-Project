import axios from "axios";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { BsPencilFill, BsSaveFill } from "react-icons/bs";
import { FaSearchPlus } from "react-icons/fa";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import tokenHeader from "../authorization/tokenHeader";
import { ContentsCard } from "./Prediction";

// TODO: 컴포넌트 세분화 작업 필요
// 나의 프로필(프로필 이미지, 닉네임 정보가 담기는) 컴포넌트
export const Profile = ({
  user,
  onSubmit,
  onToggle,
  setOnToggle,
  onChange,
}) => {
  return (
    <div>
      <p>
        {/* 사진과 input을 일치시킴 */}
        <label className="input-file-button" htmlFor="input-file">
          <Img src={user.image.file} alt="#" disabled={onToggle} />
        </label>
        <input
          id="input-file"
          type="file"
          accept="image/*"
          onChange={onChange}
          disabled={onToggle}
          style={{ display: "none" }}
        />
      </p>
      {onToggle ? (
        <button
          title="수정"
          style={{ cursor: "pointer" }}
          onClick={() => setOnToggle(!onToggle)}
        >
          <BsPencilFill />
        </button>
      ) : (
        <button
          title="저장"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setOnToggle(!onToggle);
            onSubmit();
          }}
        >
          <BsSaveFill />
        </button>
      )}
      <h3>{user.nickname}</h3>
    </div>
  );
};

// 친구 추가 후 친구목록에 나타는 친구의 프로필
export const FriendProfile = ({ friend }) => {
  return (
    <ProfileContainer>
      <div>
        <Img
          src={`${process.env.REACT_APP_BASE_URL}/${friend.photolink}`}
          alt=""
        />
        <h1>{friend.nickname}</h1>
      </div>
    </ProfileContainer>
  );
};

const MyPage = ({
  user,
  friendList,
  recommendList,
  onUserProfile,
  onRequestFriends,
  onRecommend,
}) => {
  const [onToggle, setOnToggle] = useState(true);
  const [friendNickname, setFriendNickname] = useState("");
  const [existence, setExistence] = useState(false);
  const [friend, setFriend] = useState("");

  // 마이페이지 접속 시 프로필을 받아옴
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/mypage`, {
        header: tokenHeader(),
      });
      onUserProfile({
        ...user,
        nickname: response.data.nickname,
        image: {
          file: `${process.env.REACT_APP_BASE_URL}/${response.data.photolink}`,
        },
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  // 마이페이지 접속 시 나의 친구 목록을 불러옴
  const fetchFriend = async () => {
    try {
      const response = await axios.get(`/api/mypage/list/friend`, {
        header: tokenHeader(),
      });
      onRequestFriends(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const recommend = async () => {
    try {
      const response = await axios.get(`/api/mypage/recommend`, {
        header: tokenHeader(),
      });
      console.log("response.data", response.data);
      onRecommend(response.data);
      console.log("recommendList", recommendList);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchData();
    fetchFriend();
    recommend();
  }, []);

  // 변경할 이미지를 선택할 경우 임시 이미지 URL을 생성하여, 일시적으로 프로필 사진을 변경함
  const onChange = (event) => {
    onUserProfile({
      ...user,
      image: {
        file: URL.createObjectURL(event.target.files[0]),
        files: event.target.files,
      },
    });
  };

  // 저장버튼을 누를 경우 변경된 이미지를 서버에 전달
  const onSubmit = async () => {
    if (user.image.files) {
      const imageFile = Array.from(user.image.files);
      const formData = new FormData();
      formData.append("file", imageFile[0]);
      try {
        const response = await axios.patch(
          `/api/mypage/modify/photo`,
          formData,
          { headers: tokenHeader() }
        );
        console.log(response.data);
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  // 닉네임을 입력창에 입력 후 서버에 전달 -> 친구의 프로필을 띄움
  const onNicknameSubmit = async (e) => {
    e.preventDefault();
    setExistence(true);
    const body = {
      nickname: friendNickname,
    };
    if (friendNickname) {
      try {
        const response = await axios.post(`/api/mypage/find/friend`, body, {
          headers: tokenHeader(),
        });
        console.log("response", response);
        if (response.data.result !== "fail") {
          setExistence(false);
          setFriend(response.data);
          console.log(friend);
        } else {
          setExistence(true);
          setFriend("");
          setTimeout(() => {
            setExistence(false);
          }, 2000);
        }
      } catch (error) {
        console.log(error.response);
        setExistence(true);
        setFriend("");
        setTimeout(() => {
          setExistence(false);
        }, 2000);
      }
    }
  };

  // 친구를 찾고 OK 버튼을 누를 경우 검색한 친구를 친구 목록에 추가하기 위해 서버에 요청 후 변경된 리스트를 받아옴
  const handleOk = async () => {
    const body = {
      nickname: friend.nickname,
    };
    try {
      const response = await axios.post(`/api/mypage/add/friend`, body, {
        headers: tokenHeader(),
      });
      console.log(response.data);
      if (response.data.result === "fail") {
        alert("본인 또는 이미 추가된 친구입니다.");
      }
      const fetchData = await axios.get(`/api/mypage/list/friend`);
      onRequestFriends(fetchData.data);
      setFriendNickname("");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Container>
      <ProfileContainer>
        <Profile
          user={user}
          onSubmit={onSubmit}
          onToggle={onToggle}
          setOnToggle={setOnToggle}
          onChange={onChange}
        />
      </ProfileContainer>
      <div style={{ height: "350px", background: "blue", maxWidth: "800px" }}>
        <h1>추천 영화</h1>
        {!recommendList ? (
          <span>분석할 감자 바구니가 없습니다.</span>
        ) : (
          recommendList.map((recommend, idx) => (
            <Link to={`/detail/${recommend.category}/${recommend.id}`}>
              <ContentsCard contents={recommend} key={idx} />
            </Link>
          ))
        )}
      </div>
      <div
        style={{ width: "250px", background: "pink", margin: "0 auto" }}
      ></div>
      <div style={{ background: "red", maxWidth: "800px" }}>
        <div>
          <form onSubmit={onNicknameSubmit}>
            <span>친구 추가</span>
            <input
              type="text"
              value={friendNickname}
              onChange={(e) => setFriendNickname(e.target.value)}
              placeholder="친구의 닉네임을 입력해주세요."
            />
            <button type="submit" shape="circle">
              <SearchOutlined />
            </button>
          </form>
          {existence && <h1>친구의 닉네임을 확인해주세요.</h1>}
          {!friend ? (
            <span></span>
          ) : (
            <ProfileContainer>
              <div>
                <Img
                  src={`${process.env.REACT_APP_BASE_URL}/${friend.photolink}`}
                  alt=""
                />
                <h1>{friend.nickname}</h1>
                <button onClick={handleOk}>추가하기</button>
              </div>
            </ProfileContainer>
          )}
        </div>
        <div>친구 목록</div>
        <div style={{ background: "green", height: "250px" }}>
          {!friendList ? (
            <div></div>
          ) : (
            friendList.map((friend) => (
              <Link to={`/potato-basket/${friend.nickname}`}>
                <FriendProfile key={friend.nickname} friend={friend} />
              </Link>
            ))
          )}
        </div>
      </div>
    </Container>
  );
};

export default MyPage;

//TODO: styled-components 파일은 가급적 한 파일에서 관리
const Container = styled.div`
  margin: 30px auto;
  max-width: 1400px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  justify-self: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  background-color: white;
  margin: 0 auto;
  width: 250px;
  height: 350px;
  border-radius: 15px;
  box-shadow: 0 6px 12px -2px rgba(50, 50, 93, 0.25),
    0 3px 7px -3px rgba(0, 0, 0, 0.3);
`;

const Img = styled.img`
  width: 125px;
  height: 125px;
  border-radius: 50%;
  border: none;
  background-color: #f2f2f2;
  box-shadow: 0 6px 12px -2px rgba(50, 50, 93, 0.25),
    0 3px 7px -3px rgba(0, 0, 0, 0.3);
  ${(props) => {
    if (!props.disabled) {
      return css`
        cursor: pointer;
      `;
    }
  }}
`;
