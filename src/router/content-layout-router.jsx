import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginComponent from "../components/login-component/login-component";
import ErrorComponent from "../components/error-component";

function ContentLayoutComponent(props) {
  return (
    <>
      <Switch>
        <Route path="/" exact component={LoginComponent} />
        <Route component={ErrorComponent} />
      </Switch>
    </>
  );
}

export default ContentLayoutComponent;
