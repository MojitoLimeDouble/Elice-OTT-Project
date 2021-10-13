import React from 'react';
import { Route } from 'react-router-dom';
import ContentsDetail from './components/ContentsDetail';
import NonSignIn from './components/NonSignIn';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import PotatoesInBasket from './containers/PotatoBasketContainer';
import MainContainer from './containers/MainContainer';
import MyPageContainer from "./containers/MyPageContainer";
// import PrivateRoute from './helpers/PrivateRoute';
import ContentsCategory from './components/ContentsCategory';

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
      <Route path="/detail/:category/:id?">
        <ContentsDetail />
      </Route>
      <Route path="/list/movie">
        <ContentsCategory />
      </Route>
      <Route path="/list/tv">
        <ContentsCategory />
      </Route>
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
