import logo from './logo.svg';
import './App.css';
import React from 'react'
import { NavLink, Link, Route, Switch, useHistory } from "react-router-dom";
import Character from "./Components/Characters";
import Comics from "./Components/Comics";
import Signup from "./Components/Signup"
import Login from "./Components/Login"

import { isAuthenticated } from "./Services/auth";

function App() {

  
  let history = useHistory();

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          history.push("/login")
        )
      }
    />
  );

  
  const Home = () => (
    <div>
      <h2>Home</h2>
    </div>
  );
  
  return (
    <div className="App">
      <header>
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li>
            <NavLink exact to="/">Home</NavLink>
          </li>
          <li>
            <Link to="/characters">Characters</Link>
          </li>
          <li>
            <Link to="/comics">Comics</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      </header>
      <main>
        <Route path="/" exact={ true }><Home /></Route>
        <PrivateRoute path="/characters"><Character /></PrivateRoute>
        <PrivateRoute path="/comics"> <Comics /></PrivateRoute>
        <Route path="/signup"> <Signup /></Route>
        <Route path="/login"> <Login /></Route>
        <Route path="*" component={() => <h1>Page not found</h1>}> </Route>
        
      </main>
      <footer> Made with Love </footer>
    </div>
  );
}

export default App;
