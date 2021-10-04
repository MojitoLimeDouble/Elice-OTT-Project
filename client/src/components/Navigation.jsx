import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userid }) => {
  return (
    <div>
      <Link to={`/movie`}>Movie</Link>
      <Link to={`/tv`}>TV</Link>
      <Link to={`/potato-basket/${userid}`}>PotatoBasket</Link>
      <Link to="/mypage">MyPage</Link>
    </div>
  );
};

export default Navigation;
