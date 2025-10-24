import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// If you have service worker / reportWebVitals, you can import and run them here
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// You may optionally run performance measuring here:
// reportWebVitals();
