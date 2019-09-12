import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes/Routes";

const routes = Routes();

class App extends Component {
  render() {
    return <BrowserRouter children={routes} basename={"/"} />;
  }
}

export default App;
