import React, { Component } from "react";
import AuthenticationService from "../services/authentication-service";
import FullLayoutComponent from "./full-layout-router";
import ContentLayoutComponent from "./content-layout-router";

class LayoutPermission extends Component {
  render() {
    if (AuthenticationService.isUserLoggedIn()) {
      return <FullLayoutComponent />;
    } else {
      return <ContentLayoutComponent />;
    }
  }
}

export default LayoutPermission;
