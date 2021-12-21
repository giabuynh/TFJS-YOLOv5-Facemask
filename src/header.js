import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./header.css";
import Realtime from './realtime';
import Upload from './upload';


export default function Header() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand mb-0 h1">Face Mask Detection</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbarNavAltMarkup" className="collapse navbar-collapse flex-grow-1 justify-content-end">
            <div className="navbar-nav">
              <a href="/" className="nav-link" aria-current="page">Real-time</a>
              <a href="/upload" className="nav-link">Upload</a>
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

