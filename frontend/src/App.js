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
import PrivateRoute from "./helpers/PrivateRoute";
import ContentsCategory from "./components/ContentsCategory";
import Banner from "react-js-banner";
import { useHistory } from "react-router-dom";
import Search from "./components/Search";

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
    <div
      className="centerPosition"
      style={{
        textAlign: "center",
        backgroundImage:
          "linear-gradient(-30deg, #ebbfe0, #c1d3ff, #d9ddff, #efd6ff)",
      }}
    >
      <div className="totalStyledDiv" style={totalStyled}>
        <div className="navigation" style={stickyNavigation}>
          <Navigation logout={logout} />
          <Banner
            showBanner={loggedOut}
            css={{
              backgroundColor: "#0080ff",
              fontSize: 20,
              fontWeight: "lighter",
              color: "white",
              margin: "1rem auto",
              borderRadius: "25px",
            }}
            title="로그아웃 되었습니다."
          />
        </div>
        <div style={{ minHeight: "950px" }}>
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
            <Route path="/search/:query">
              <Search />
            </Route>
            <Route
              render={() => (
                <div>
                  <h2>이 페이지는 존재하지 않습니다.</h2>
                </div>
              )}
            />
          </Switch>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;

const totalStyled = {
  fontFamily: "BMJUA",
  fontStyle: "normal",
  textDecoration: "none",
  width: "1300px",
  display: "inline-block",
};

const stickyNavigation = {
  position: "sticky",
  top: 0,
  zIndex: 10,
};
