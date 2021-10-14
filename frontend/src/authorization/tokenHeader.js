export default function tokenHeader() {
  const accessToken = JSON.parse(localStorage.getItem("access_token"));
  if (accessToken) {
    return { Authorization: "Bearer " + accessToken };
  } else return {};
}
