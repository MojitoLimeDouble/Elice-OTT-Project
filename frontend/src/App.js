import React, { useState, useEffect } from "react";
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
import styled from "styled-components";

const App = () => {
  const [loggedOut, setLoggedOut] = useState(false);
  const windowSize = useWindowSize();

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
      <div style={{ minHeight: `${windowSize.height}px` }}>
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
          <div>
            <Switch>
              <Route exact path="/">
                <NonSignIn />
              </Route>
              <Route path="/signin">
                <Signin windowHeight={windowSize.height} />
              </Route>
              <Route path="/signup">
                <Signup windowHeight={windowSize.height} />
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
              <Route path="/potato-basket/:nickname">
                <PotatoesInBasket />
              </Route>
              <Route path="/mypage">
                <div style={{ minHeight: `${windowSize.height - 350}px` }}>
                  <MyPageContainer />
                </div>
              </Route>
              <Route path="/search/:query">
                <Search windowHeight={windowSize.height} />
              </Route>
              <Route
                render={() => (
                  <NonPage
                    style={{ minHeight: `${windowSize.height - 350}px` }}
                  >
                    <NonPageComment>존재하지 않는 페이지입니다.</NonPageComment>
                  </NonPage>
                )}
              />
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

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

const NonPage = styled.div`
  background-color: #ffffff8d;
  margin-top: 30px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NonPageComment = styled.h2`
  font-size: 50px;
`;
