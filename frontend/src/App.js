import React from "react";
import { Route, Link } from "react-router-dom";
import ContentsDetail from "./components/ContentsDetail";
import Main from "./components/Main";
import Movie from "./components/Movie";
import MyPage from "./components/MyPage";
import NonSignIn from "./components/NonSignIn";
import PotatoBasket from "./components/PotatoBasket";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import TV from "./components/TV";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import MainPopularity from "./containers/MainContainer";
import PotatoBasketPopularity from "./containers/PotatoBasketContainer";

const App = () => {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <Route exact path="/">
        <NonSignIn />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/main">
        <MainPopularity />
      </Route>
      {/* <Route path="/main" component={Main} /> */}
      <Route path="/contents-detail/:id?">
        <ContentsDetail />
      </Route>
      <Route path="/movie">
        <Movie />
      </Route>
      <Route path="/tv">
        <TV />
      </Route>
      {/* <Route path="/potato-basket/:id?" component={PotatoBasket} /> */}
      <Route path="/potato-basket/:id?">
        <PotatoBasketPopularity />
      </Route>
      <Route path="/mypage">
        <MyPage />
      </Route>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
