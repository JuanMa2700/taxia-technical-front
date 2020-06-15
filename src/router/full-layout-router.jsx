import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeComponent from "../components/home-component/home-component";
import ErrorComponent from "../components/error-component";
import PurchaseComponent from "../components/purchase-component/purchase-component";

function FullLayoutComponent(props) {
  return (
    <>
      <Switch>
        <Route path="/" exact component={HomeComponent} />
        <Route path="/purchase/:id" exact component={PurchaseComponent} />
        <Route component={ErrorComponent} />
      </Switch>
    </>
  );
}

export default FullLayoutComponent;
