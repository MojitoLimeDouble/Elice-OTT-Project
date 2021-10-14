import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import ContentsDetail from "./components/ContentsDetail";
import NonSignIn from "./components/NonSignIn";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import PotatoesInBasket from "./containers/PotatoBasketContainer";
import MainContainer from "./containers/MainContainer";
import MyPageContainer from "./containers/MyPageContainer";
import PrivateRoute from './helpers/PrivateRoute';
import ContentsCategory from "./components/ContentsCategory";
import Banner from "react-js-banner";
import { useHistory } from "react-router-dom";

const App = () => {
  const [loggedOut, setLoggedOut] = useState(false);

  const history = useHistory();

  const onFail = () => {
    setLoggedOut(true);
    setTimeout(() => setLoggedOut(false), 2000);
  };

  const logout = () => {
    onFail();
    setTimeout(() => {
      window.localStorage.clear();
      history.push("/");
    }, 2000);
  };

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
        <Navigation logout={logout} />
      </div>
      <Banner
        showBanner={loggedOut}
        css={{ backgroundColor: "#0080ff", fontSize: 22, color: "white", margin: "0" }}
        title="로그아웃 되었습니다."
      />
      <Switch>
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
        <Route path="/detail/:category/:id?">
          <ContentsDetail />
        </Route>
        <PrivateRoute path="/list/movie">
          <ContentsCategory />
        </PrivateRoute>
        <Route path="/list/tv">
          <ContentsCategory />
        </Route>
        <Route path="/potato-basket/:id?">
          <PotatoesInBasket />
        </Route>
        <Route path="/mypage">
          <MyPageContainer />
        </Route>
        <Route
          render={() => (
            <div>
              <h2>이 페이지는 존재하지 않습니다.</h2>
            </div>
          )}
        />
      </Switch>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
