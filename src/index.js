import React from "react";
import ReactDOM from "react-dom";

import Header from './header';
import RealtimeApp from "./realtime";
import "./index.css";

const headerElement = document.getElementById("header");
ReactDOM.render(<Header />, headerElement);

// const rootElement = document.getElementById("root");
// ReactDOM.render(<RealtimeApp />, rootElement);