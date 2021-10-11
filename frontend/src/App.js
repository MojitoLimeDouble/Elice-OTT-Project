import React from 'react';
import { Route, Link } from 'react-router-dom';
import ContentsDetail from './components/ContentsDetail';
import Main from './components/Main';
import Movie from './components/Movie';
import MyPage from './components/MyPage';
import NonSignIn from './components/NonSignIn';
import PotatoBasket from './components/PotatoBasket';
import Signin from './components/Signin';
import Signup from './components/Signup';
import TV from './components/TV';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import MainPopularity from './containers/MainContainer';
import PotatoesInBasket from './containers/PotatoBasketContainer';


const App = () => {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <Route exact path="/" component={NonSignIn} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/main" component={MainPopularity} />
      {/* <Route path="/main" component={Main} /> */}
      <Route path="/contents-detail/:id?" component={ContentsDetail} />
      <Route path="/movie" component={Movie} />
      <Route path="/tv" component={TV} />
      {/* <Route path="/potato-basket/:id?" component={PotatoBasket} /> */}
      <Route path="/potato-basket/:id?" component={PotatoesInBasket} />
      <Route path="/mypage" component={MyPage} />
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default App;