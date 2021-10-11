import React from "react";
import { connect } from "react-redux";
import MyPage from "../components/MyPage";
import { userProfile, requestFriends } from "../modules/mypage";

const MyPageContainer = ({ user, friendList, userProfile, requestFriends }) => {
  return (
    <MyPage
      user={user}
      friendList={friendList}
      onUserProfile={userProfile}
      onRequestFriends={requestFriends}
    />
  );
};

export default connect(
  ({ inform }) => ({
    user: inform.user,
    friendList: inform.friendList,
  }),
  { userProfile, requestFriends }
)(MyPageContainer);
