import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './components/Home.jsx'
import {Morse as Translator} from './components/Morse.jsx'
import Drawer from './components/Drawer.jsx'
import {Guide} from './components/Guide.jsx'
import { Dictionary } from "./components/Dictionary.jsx";

const pages = ['Guide', 'Dictionary', 'Translator',];

function RouteManager() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/Translator" component={Translator} />
      <Route exact path="/Home" component={Home} />
      <Route path='/Guide' component={Guide} />
      <Route path='/Dictionary' component={Dictionary} />

    </Router>
  );
}

export {RouteManager, pages};