import React from "react";
import ReactDOM from "react-dom";
import AppRoot from "./AppRoot";

const wrapper = document.getElementById("app-root");
wrapper ? ReactDOM.render(<AppRoot />, wrapper) : false;