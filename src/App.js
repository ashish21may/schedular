import React from "react";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import { LoginForm } from "./components/login";
import { Dashboard } from "./components/dashboard";
import { Schedular } from "./components/schedular";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/schedular" exact component={Schedular} />
          <Route path="/" exact component={LoginForm}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
