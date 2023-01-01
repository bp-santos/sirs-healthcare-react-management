// import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Schedule from "./components/pages/Schedule";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/schedule" component={Schedule} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
