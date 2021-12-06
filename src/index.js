import React from 'react';
import ReactDOM from "react-dom";
import "./reset.css";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementsByClassName("root")[0]
);

reportWebVitals();
  
