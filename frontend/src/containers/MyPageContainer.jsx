import React from "react";
import { connect } from "react-redux";
import MyPage from "./MyPage";
import {
  userProfile,
  requestFriends,
  recommend,
} from "../modules/mypage";

const MyPageContainer = ({
  user,
  friendList,
  recommendList,
  userProfile,
  requestFriends,
  recommend,
}) => {
  return (
    <MyPage
      user={user}
      friendList={friendList}
      recommendList={recommendList}
      onUserProfile={userProfile}
      onRequestFriends={requestFriends}
      onRecommend={recommend}
    />
  );
};

export default connect(
  ({ inform }) => ({
    user: inform.user,
    friendList: inform.friendList,
    recommendList: inform.recommendList,
  }),
  { userProfile, requestFriends, recommend }
)(MyPageContainer);
