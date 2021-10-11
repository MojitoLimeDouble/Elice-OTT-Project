import axios from "axios";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { BsPencilFill, BsSaveFill } from "react-icons/bs";
import { Button, Modal, Tooltip } from "antd";
import "antd/dist/antd.css";
import { FaSearchPlus } from "react-icons/fa";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

// TODO: 컴포넌트 세분화 작업 필요
//FIXME: just for demonstration(임시 default image url)
const defaultImage =
  "https://kdt-gitlab.elice.io/002-part3-ottservice/team5/sample-project/-/raw/develop/backend/static/image/default.png";
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
      {!onToggle ? (
        <button title="수정" onClick={() => setOnToggle(!onToggle)}>
          <BsPencilFill />
        </button>
      ) : (
        <button
          title="저장"
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

export const FriendProfile = ({ friend }) => {
  return (
    <div>
      <img
        src={`${process.env.REACT_APP_BASE_URL}${friend.photolink}`}
        alt=""
      />
      <h1>{friend.nickname}</h1>
    </div>
  );
};

const MyPage = () => {
  const [onToggle, setOnToggle] = useState(false);
  const [user, setUser] = useState({
    image: { file: defaultImage },
    nickname: "nickname",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [friendNickname, setFriendNickname] = useState("");
  const [existence, setExistence] = useState(false);
  const [friend, setFriend] = useState("");
  const [friendList, setFriendList] = useState("");

  //TODO: API header에 auth정보 추가
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/mypage`
        );
        setUser({
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
    fetchData();
    const fetchFriend = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/mypage/list/friend`
        );
        setFriendList(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchFriend();
  }, [user]);

  // 변경할 이미지를 선택할 경우 임시 이미지 URL을 생성하여, 일시적으로 프포필 사진을 변경함
  const onChange = (event) => {
    setUser({
      ...user,
      image: {
        file: URL.createObjectURL(event.target.files[0]),
        files: event.target.files,
      },
    });
  };

  const onSubmit = async () => {
    if (user.image.files) {
      const imageFile = Array.from(user.image.files);
      const formData = new FormData();
      formData.append("file", imageFile[0]);
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_BASE_URL}/api/mypage/modify/photo`,
          formData
          // { headers: authHeader() }
        );
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const body = {
      nickname: friend.nickname,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/mypage/modify/photo`,
        body
      );
      console.log(response.data);
      if (response.data.result === "fail") {
        alert("다시 시도해주세요.");
      }
      const fetchData = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/mypage/list/friend`
      );
      setFriendList(fetchData.data);
    } catch (error) {
      console.log(error.response);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setExistence(false);
    setFriend("");
    setFriendNickname("");
  };

  const onNicknameSubmit = async (e) => {
    e.preventDefault();
    setExistence(true);
    const body = {
      nickname: friendNickname,
    };
    if (friendNickname) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/mypage/find/friend`,
          body
        );
        if (response.data.result === "fail") {
          setExistence(true);
          setTimeout(() => {
            setExistence(false);
          }, 2000);
        } else {
          setExistence(false);
          setFriend(response.data);
        }
      } catch (error) {
        console.log(error.response);
      }
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
      </div>
      <div
        style={{ width: "250px", background: "pink", margin: "0 auto" }}
      ></div>
      <div style={{ background: "red", maxWidth: "800px" }}>
        <div>
          친구 추가
          <button type="primary" onClick={showModal}>
            <FaSearchPlus />
          </button>
          <Modal
            title="친구 추가"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <form onSubmit={onNicknameSubmit}>
              <input
                type="text"
                value={friendNickname}
                onChange={(e) => setFriendNickname(e.target.value)}
                placeholder="친구의 닉네임을 입력해주세요."
              />
              <Tooltip title="search">
                <Button
                  htmlType="submit"
                  shape="circle"
                  icon={<SearchOutlined />}
                ></Button>
              </Tooltip>
            </form>
            {existence && <h1>친구의 닉네임을 확인해주세요.</h1>}
            {friend && (
              <div>
                <img
                  src={`${process.env.REACT_APP_BASE_URL}${friend.photolink}`}
                  alt=""
                />
                <h1>{friend.nickname}</h1>
              </div>
            )}
          </Modal>
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
