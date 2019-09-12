import React from "react";

import Home from "../containers/Home/Home";

import { Route, Switch } from "react-router-dom";

export const Routes = () => (
  <Switch>
    <Route exact path={"/"} component={Home} />
    {/*<Route exact path={"/about"} component={About} />*/}
  </Switch>
);
