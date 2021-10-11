import React from "react";
import { connect } from "react-redux";
import Main from "../components/Main";
import { popular, predictable, similar } from "../modules/popularity";

const MainContainer = ({
  popularList,
  predictableList,
  similarList,
  popular,
  predictable,
  similar,
}) => {
  return (
    <Main
      popularList={popularList}
      predictableList={predictableList}
      similarList={similarList}
      onPopular={popular}
      onPredictable={predictable}
      onSimilar={similar}
    />
  );
};

export default connect(
  ({ catchOn }) => ({
    popularList: catchOn.popularList,
    predictableList: catchOn.predictableList,
    similarList: catchOn.similarList,
  }),
  { popular, predictable, similar }
)(MainContainer);
