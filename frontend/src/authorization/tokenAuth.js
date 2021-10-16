import axios from "axios";
import tokenHeader from "./tokenHeader";

export default async function validateToken(url) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/${url}`, { headers: tokenHeader() }
    );
    console.log("응답", response);

    const token = (response) => {
      let access_token = btoa(
        new Uint8Array(response.data.access_token)
        .reduce((data, byte) => {
          data + String.fromCharCode(byte);
        }, "")
      ); // 문자 변환
      return `data:${response.headers[
        "content-type"
      ].toLowerCase()};base64,${access_token}`; // 소문자로 변환 호출
    };
    console.log(token(response));
  } catch (e) {
    console.log("유효하지 않은 토큰", e.response);
    if (e.response.status === 401) {
      localStorage.removeItem("access_token")};
  }
}
