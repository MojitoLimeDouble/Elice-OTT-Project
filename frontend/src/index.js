import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./modules";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";

const store = createStore(rootReducer, composeWithDevTools());

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`;

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
