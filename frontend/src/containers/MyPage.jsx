import axios from "axios";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { BsPencilFill, BsSaveFill } from "react-icons/bs";
import { FaSearchPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import tokenHeader from "../authorization/tokenHeader";
import { MyPageContentsCard } from "../components/Prediction";
import Modal from "../components/Modal";
import Banner from "react-js-banner";
import { Scrollbars } from "react-custom-scrollbars";

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
    <ProfileBox>
      <Nickname>{user.nickname}</Nickname>
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
      </div>
      <ChangePicture>
        <p>프로필 이미지</p>
        <p style={{ lineHeight: "20px" }}>변경하기</p>
      </ChangePicture>
    </ProfileBox>
  );
};

// 친구 추가 후 친구목록에 나타는 친구의 프로필
export const FriendProfile = ({ friend }) => {
  return (
    <FriendProfileContainer>
      <div>
        <FriendImg
          src={`${process.env.REACT_APP_BASE_URL}/${friend.photolink}`}
          alt=""
        />
      </div>
      <h1>{friend.nickname}</h1>
    </FriendProfileContainer>
  );
};

const MyPage = ({ user, friendList, onUserProfile, onRequestFriends }) => {
  const [onToggle, setOnToggle] = useState(true);
  const [friendNickname, setFriendNickname] = useState("");
  const [existence, setExistence] = useState(false);
  const [friend, setFriend] = useState("");
  const [quit, setQuit] = useState(false);
  const [recommendList, setRecommendList] = useState("");

  // 마이페이지 접속 시 프로필을 받아옴
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/mypage`, {
        headers: tokenHeader(),
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
        headers: tokenHeader(),
      });
      onRequestFriends(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const recommend = async () => {
    try {
      const response = await axios.get(`/api/mypage/recommend`, {
        headers: tokenHeader(),
      });
      setRecommendList(response.data);
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
          {
            headers: tokenHeader(),
          }
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
      const fetchData = await axios.get(`/api/mypage/list/friend`, {
        headers: tokenHeader(),
      });
      onRequestFriends(fetchData.data);
      setFriendNickname("");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <MyPageTotal>
      <Banner
        showBanner={quit}
        css={{
          backgroundColor: "#0080ff",
          fontSize: 20,
          fontWeight: "lighter",
          color: "white",
          margin: "1rem auto",
          borderRadius: "25px",
        }}
        title="회원 탈퇴를 성공하셨습니다. 안녕히 가세요."
      />
      <TopContainer>
        <ProfileContainer>
          <Nickname></Nickname>
          <Profile
            user={user}
            onSubmit={onSubmit}
            onToggle={onToggle}
            setOnToggle={setOnToggle}
            onChange={onChange}
          />
        </ProfileContainer>
        <Friends className="friends-list">
          <Title className="friends">친구 목록</Title>
          <Scrollbars
            style={{
              position: "relative",
              height: "250px",
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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
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
          </Scrollbars>
        </Friends>
        <Friends className="find-friends">
          <form onSubmit={onNicknameSubmit}>
            <Title className="friends">친구 추가</Title>
            <input
              type="text"
              value={friendNickname}
              onChange={(e) => setFriendNickname(e.target.value)}
              placeholder="닉네임으로 검색하기"
            />
            <button type="submit" shape="circle">
              <FaSearchPlus />
            </button>
          </form>

          <FindFriend>
            {existence && <h1>친구의 닉네임을 확인해주세요.</h1>}
            {!friend ? (
              <span></span>
            ) : (
              <FoundProfile>
                <div>
                  <FoundImg
                    src={`${process.env.REACT_APP_BASE_URL}/${friend.photolink}`}
                    alt=""
                  />
                  <h1 style={{ margin: "13px" }}>{friend.nickname}</h1>
                  <StyledButton onClick={handleOk}>추가하기</StyledButton>
                </div>
              </FoundProfile>
            )}
          </FindFriend>
        </Friends>
      </TopContainer>
      <BottomContainer>
        <Title className="recommend">추천 컨텐츠</Title>
        <Scrollbars
          style={{
            position: "relative",
            width: "1170px",
            height: "325px",
          }}
          className="Scrollbar"
          renderThumbHorizontal={({ style, ...props }) => (
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
          <Recommend className="rec">
            {!recommendList ? (
              <span>분석할 감자 바구니가 없습니다.</span>
            ) : (
              recommendList.map((recommend, idx) => (
                <div style={{ margin: "10px" }}>
                  <Link
                    to={`/detail/${recommend.category}/${recommend.id}/${recommend.title}`}
                  >
                    <MyPageContentsCard contents={recommend} key={idx} />
                  </Link>
                </div>
              ))
            )}
          </Recommend>
        </Scrollbars>
      </BottomContainer>
      <div
        style={{
          width: "250px",
          margin: "30px auto",
          fontFamily: "NotoSansKR",
          fontSize: "700",
        }}
      >
        <Modal />
      </div>
    </MyPageTotal>
  );
};

export default MyPage;

//TODO: styled-components 파일은 가급적 한 파일에서 관리
const MyPageTotal = styled.div`
  background-color: #ffffff8d;
  border-radius: 25px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  padding: 40px 50px;
`;

const TopContainer = styled.div`
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: 250px 1.5fr 1fr;
  gap: 20px;
  justify-self: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  background-color: #ffffff8d;
  margin: 0 auto;
  width: 250px;
  height: 350px;
  border-radius: 15px;
  box-shadow: 0 6px 12px -2px rgba(50, 50, 93, 0.25),
    0 3px 7px -3px rgba(0, 0, 0, 0.3);
`;

const ProfileBox = styled.div`
  display: grid;
  grid-template-rows: 65px 215px 70px;
  align-items: center;
`;

const Nickname = styled.h2`
  font-size: 25px;
`;

const ChangePicture = styled.h2`
  font-size: 13px;
`;

const Img = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: none;
  background-color: #f2f2f2;
  box-shadow: 0 6px 12px -2px rgba(50, 50, 93, 0.25),
    0 3px 7px -3px rgba(0, 0, 0, 0.3);
  object-fit: cover;
  ${(props) => {
    if (!props.disabled) {
      return css`
        cursor: pointer;
      `;
    }
  }}
`;

const Friends = styled.div`
  background-color: #ffffff8d;
  border-radius: 15px;
  box-shadow: 0 6px 12px -2px rgba(50, 50, 93, 0.25),
    0 3px 7px -3px rgba(0, 0, 0, 0.3);
  padding: 15px;
  margin: auto 10px;
  height: 350px;
`;

const Title = styled.h1`
  font-size: 25px;
  &.friends {
    margin-top: 10px;
    margin-bottom: 20px;
  }
  &.recommend {
    margin: 10px;
  }
`;

const FriendProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
  background-color: #ffffff8d;
  margin: 10px;
  width: 210px;
  height: 70px;
  border-radius: 15px;
  box-shadow: 0 6px 12px -2px rgba(50, 50, 93, 0.25),
    0 3px 7px -3px rgba(0, 0, 0, 0.3);
`;

const FriendImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: #ffffff8d;
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

const FindFriend = styled.div`
  padding: 15px;
`;

const FoundProfile = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  /* align-items: center; */
  background-color: #ffffff8d;
  margin: 0 auto;
  width: 160px;
  height: 220px;
  border-radius: 15px;
  box-shadow: 0 6px 12px -2px rgba(50, 50, 93, 0.25),
    0 3px 7px -3px rgba(0, 0, 0, 0.3);
`;

const FoundImg = styled.img`
  width: 110px;
  height: 110px;
  margin-top: 25px;
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

const StyledButton = styled.button`
  background: None;
  outline: None;
  border: None;
  font-family: "NotoSansKR";
  font-weight: 700;
  background-color: #e42c2c8d;
  border-radius: 5px;
  box-shadow: 0 6px 12px -2px rgba(50, 50, 93, 0.25),
    0 3px 7px -3px rgba(0, 0, 0, 0.3);
`;

const BottomContainer = styled.div`
  background-color: #ffffff8d;
  border-radius: 25px;
  box-shadow: 0 6px 12px -2px rgba(50, 50, 93, 0.25),
    0 3px 7px -3px rgba(0, 0, 0, 0.3);
  padding: 15px;
  height: 400px;
`;

const Recommend = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
`;
