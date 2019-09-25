import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './components/Home.jsx'
import Morse from './components/Morse.jsx'

function RouteManager() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Morse} />
      </div>
    </Router>
  );
}

export default RouteManager;