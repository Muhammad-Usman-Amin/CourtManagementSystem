import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import "./fonts/Alvi Nastaleeq Regular.ttf";
import "./fonts/fonts.css";

import App from "./App";
// import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));
// export default store;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
