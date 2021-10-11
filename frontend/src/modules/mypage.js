const USERPROFILE = "mypage/USERPROFILE";
const REQUESTFRIENDS = "mypage/REQUESTFRIENDS";

//FIXME: just for demonstration(임시 default image url)
const defaultImage =
  "https://kdt-gitlab.elice.io/002-part3-ottservice/team5/sample-project/-/raw/develop/backend/static/image/default.png";
export const userProfile = (user) => ({
  type: USERPROFILE,
  user,
});

export const requestFriends = (friendList) => ({
  type: REQUESTFRIENDS,
  friendList,
});

const initialState = {
  user: {
    nickname: "nickname",
    image: {
      file: defaultImage,
      files: "",
    },
  },
  friendList: "",
};

function inform(state = initialState, action) {
  switch (action.type) {
    case USERPROFILE:
      return {
        ...state,
        user: action.user,
      };
    case REQUESTFRIENDS:
      return {
        ...state,
        friendList: action.friendList,
      };
    default:
      return state;
  }
}

export default inform;
