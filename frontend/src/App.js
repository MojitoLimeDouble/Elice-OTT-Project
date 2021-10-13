import React from "react";
import { Route } from "react-router-dom";
import ContentsDetail from "./components/ContentsDetail";
// import Main from './components/Main';
import Movie from "./components/Movie";
// import MyPage from './components/MyPage';
import NonSignIn from "./components/NonSignIn";
// import PotatoBasket from './components/PotatoBasket';
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import TV from "./components/TV";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import PotatoesInBasket from "./containers/PotatoBasketContainer";
import MainContainer from "./containers/MainContainer";
import MyPageContainer from "./containers/MyPageContainer";
import PrivateRoute from "./helpers/PrivateRoute";

const App = () => {
  return (
    <div>
      <div
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          zIndex: 1,
        }}
      >
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
        <MainContainer />
      </Route>
      {/* <Route path="/main" component={Main} /> */}
      <Route path="/detail/:category/:id?">
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
        <PotatoesInBasket />
      </Route>
      <Route path="/mypage">
        <MyPageContainer />
      </Route>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
