import React , { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import { LoginForm } from './components/login';
import './App.css';
import { Dashboard } from './components/dashboard';
import { Schedular } from './components/schedular';

const App = () => {

  return (
    <div className="App">
      <Router >
        <Switch>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/schedular" component={Schedular}/>
          <Route path="/" component={LoginForm}></Route>
        </Switch>
      </Router>
      {/* { loginForm ? <LoginForm onFormSubmit={handleUsersDetail} error={error} /> : 
        <div>
        {correctUser ? <div>Correct User Identified </div> : null }
        </div>
      } */}

    </div>
  );
}

export default App;
