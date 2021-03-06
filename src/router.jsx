import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './components/Home.jsx'
import {Morse as Translator} from './components/Morse.jsx'
import {Guide} from './components/Guide.jsx'
import { Dictionary } from "./components/Dictionary.jsx";
import Settings from './components/Settings.jsx'
import DualInput from './components/DualInput.jsx'

const pages = ['Guide', 'Dictionary', 'Translator', 'Dual Input', 'Settings'];

function RouteManager() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/Translator" component={Translator} />
      <Route exact path="/Home" component={Home} />
      <Route path='/Guide' component={Guide} />
      <Route path='/Dictionary' component={Dictionary} />
      <Route path='/Settings' component={Settings} />
      <Route path='/DualInput' component={DualInput} />

    </Router>
  );
}

export {RouteManager, pages};