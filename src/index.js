import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./views/App";
import reportWebVitals from "./reportWebVitals";
import { store } from './redux/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
reportWebVitals();
