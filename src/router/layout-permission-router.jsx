import React, { Component } from "react";
import AuthenticationService from "../services/authentication-service";
import FullLayoutComponent from "./full-layout-router";
import ContentLayoutComponent from "./content-layout-router";
import { Route } from "react-router-dom";
import InProcessComponent from "../components/in-process-component";

class LayoutPermission extends Component {
  render() {
    if (
      AuthenticationService.isUserLoggedIn() &&
      AuthenticationService.hasRole("customer")
    ) {
      return <FullLayoutComponent />;
    } else if (AuthenticationService.isUserLoggedIn()) {
      return <Route path="/" exact component={InProcessComponent} />;
    } else {
      return <ContentLayoutComponent />;
    }
  }
}

export default LayoutPermission;
