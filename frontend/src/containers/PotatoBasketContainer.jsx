import React from "react";
import { connect } from "react-redux";
import PotatoBasket from "../components/PotatoBasket";
import { popular } from "../modules/popularity";

const PotatoBasketPopularity = ({ popularList, popular }) => {
  return (
    <div>
      <PotatoBasket popularList={popularList} onPopular={popular} />
    </div>
  );
};

export default connect(
  ({ catchOn }) => ({
    popularList: catchOn.popularList,
  }),
  { popular }
)(PotatoBasketPopularity);
