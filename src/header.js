import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Realtime from './realtime';
import Upload from './upload';
import "./header.css";

export default function Header() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand mb-0 h1" href="#">Face Mask Detection</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbarNavAltMarkup" className="collapse navbar-collapse flex-grow-1 justify-content-end">
            <div className="navbar-nav">
              <Link to="/" className="nav-link" aria-current="page">Real-time</Link>
              <Link to="/upload" className="nav-link">Upload</Link>
            </div>
          </div>
        </div>     
      </nav>

      <Switch>
          <Route exact path="/">
            <Realtime />
          </Route>
          <Route path="/upload">
            <Upload />
          </Route>
        </Switch>
    </Router>
  );
}

 