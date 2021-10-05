import React from 'react';
import { Route, Link } from 'react-router-dom';
import Contents from './components/Contents';
import Main from './components/Main';
import Movie from './components/Movie';
import MyPage from './components/MyPage';
import NonSignIn from './components/NonSignIn';
import PotatoBasket from './components/PotatoBasket';
import Signin from './components/Signin';
import Signup from './components/Signup';
import TV from './components/TV';

const App = () => {
  return (
    <div>
      <div>
        <Link to="/">NonSignIn</Link>
        <Link to="/signin">SignIn</Link>
        <Link to="/signup">SignUp</Link>
        <Link to="/main">Main</Link>
      </div>
      <Route exact path="/" component={NonSignIn} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/main" component={Main} />
      <Route path="/contents-detail/:id?" component={Contents} />
      <Route path="/movie" component={Movie} />
      <Route path="/tv" component={TV} />
      <Route path="/potato-basket/:id?" component={PotatoBasket} />
      <Route path="/mypage" component={MyPage} />
    </div>
  );
};

export default App;