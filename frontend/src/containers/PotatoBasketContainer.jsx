import React from "react";
import { connect } from "react-redux";
import PotatoBasket from "../components/PotatoBasket";
import { moviePotatoes, tvPotatoes } from "../modules/potatoes";

const PotatoesInBasket = ({
  moviePotatoList,
  tvPotatoList,
  moviePotatoes,
  tvPotatoes,
}) => {
  return (
    <div>
      <PotatoBasket
        moviePotatoList={moviePotatoList}
        tvPotatoList={tvPotatoList}
        onMoviePotatoes={moviePotatoes}
        onTvPotatoes={tvPotatoes}
      />
    </div>
  );
};

export default connect(
  ({ catchPotato }) => ({
    moviePotatoList: catchPotato.moviePotatoList,
    tvPotatoList: catchPotato.tvPotatoList,
  }),
  { moviePotatoes, tvPotatoes }
)(PotatoesInBasket);
