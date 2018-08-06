import React from "react";
import { Route } from "react-router-dom";

import Home from "./views/home/Home.container";
import Auth from "./views/auth/Auth.container";

const Routes = ({ ...props }) => [
  <Route key={1} path="/" exact component={Home} />,
  <Route key={3} path="/user" component={Auth} />

  // <ProtectedComponent
  //   key={11}
  //   {...props}
  //   path="/home"
  //   Component={Home}
  // />,
];

export default Routes;
