import axios from "axios";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { BsPencilFill, BsSaveFill } from "react-icons/bs";

const ImageInput = styled.input`
  ${(props) => {
    if (props.disabled) {
      return css`
        cursor: pointer;
      `;
    }
  }}
`;

// 임시 이미지 url
const defaultImage =
  "https://kdt-gitlab.elice.io/002-part3-ottservice/team5/sample-project/-/raw/develop/backend/static/image/default.png";
const Profile = ({ image, onSubmit, onToggle, setOnToggle, onChange }) => {
  return (
    <div>
      <p>
        <label className="input-file-button" htmlFor="input-file">
          <Img src={image.file} alt="#" />
        </label>
        <ImageInput
          id="input-file"
          type="file"
          accept="image/*"
          onChange={onChange}
          style={{ display: "none" }}
          disabled={onToggle}
        />
      </p>
      {onToggle ? (
        <button onClick={() => setOnToggle(!onToggle)}>
          <BsPencilFill />
        </button>
      ) : (
        <button
          onClick={() => {
            setOnToggle(!onToggle);
            onSubmit();
          }}
        >
          <BsSaveFill />{" "}
        </button>
      )}
      <h3>nickname</h3>
    </div>
  );
};

const MyPage = () => {
  const [onToggle, setOnToggle] = useState(false);
  const [image, setImage] = useState({ file: defaultImage });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/mypage`
        );
        setImage({
          file: `${process.env.REACT_APP_BASE_URL}/${response.data.photolink}`,
        });
      } catch (err) {
        console.log(err.response);
      }
    };
    fetchData();
  }, [image]);

  // 변경할 이미지를 선택할 경우 임시 이미지 URL을 생성하여, 일시적으로 프포필 사진을 변경함
  const onChange = (event) => {
    setImage({
      file: URL.createObjectURL(event.target.files[0]),
      files: event.target.files,
    });
  };

  const onSubmit = async () => {
    if (image.files) {
      const imageFile = Array.from(image.files);
      const formData = new FormData();
      formData.append("file", imageFile[0]);
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_BASE_URL}/api/mypage/user`,
          formData
          // { headers: authHeader() }
        );
        console.log(response);
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <Container>
        <Profile
          image={image}
          onSubmit={onSubmit}
          onToggle={onToggle}
          setOnToggle={setOnToggle}
          onChange={onChange}
        />
      </Container>
    </div>
  );
};

export default MyPage;

const Container = styled.div`
  position: sticky;
  margin: 0;
  top: 150px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  background-color: white;
  margin: 0 auto 0;
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
`;
