import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import LayoutPermission from "./router/layout-permission-router";
import HeaderComponent from "./shared/header-component.jsx";

function App() {
  return (
    <div className="TodoApp">
      <Router>
        <HeaderComponent />
        <LayoutPermission />
      </Router>
    </div>
  );
}

export default App;
