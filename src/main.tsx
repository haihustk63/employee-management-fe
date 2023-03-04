import React from "react";
import ReactDOM from "react-dom/client";
import 'antd/dist/reset.css';

import { RecoilRoot } from "recoil";
import App from "./App";
import AppBackTop from "./components/AppBackTop";
import "./index.css";
import "./styles/index.scss";
// import 'intro.js/introjs.css';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
      <AppBackTop />
    </RecoilRoot>
  </React.StrictMode>
);
