const USERPROFILE = "mypage/USERPROFILE";
const REQUESTFRIENDS = "mypage/REQUESTFRIENDS";
const RECOMMEND = "mypage/RECOMMEND";

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

export const recommend = (recommendList) => ({
  type: RECOMMEND,
  recommendList,
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
  recommendList: "",
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
    case RECOMMEND:
      return {
        ...state,
        recommendList: action.recommendList
      }
    default:
      return state;
  }
}

export default inform;
