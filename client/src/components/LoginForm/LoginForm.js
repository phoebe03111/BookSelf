import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./LoginForm.scss";

const baseUrl = "http://localhost:8080";
const loginUrl = `${baseUrl}/login`;
const signupUrl = `${baseUrl}/signup`;

function LoginForm() {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogInError, setIsLogInError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  let history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(loginUrl, {
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        history.push("/books");
        // setIsLoggedIn(true);
      })
      .catch((err) => {
        setIsLogInError(true);
        setErrorMessage(err);
      });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post(signupUrl, {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((res) => {
        setIsSignedUp(true);
      })
      .catch((err) => console.log(err));
  };

  const renderSignup = () => {
    return (
      <div className="auth">
        <h1 className="auth__title">Sign up</h1>
        <form className="form" onSubmit={handleSignup}>
          <div className="form-group">
            Username:{" "}
            <input type="text" name="username" className="form__input" />
          </div>

          <div className="form-group">
            Email: <input type="email" name="email" className="form__input" />
          </div>

          <div className="form-group">
            Password:{" "}
            <input type="password" name="password" className="form__input" />
          </div>

          <button className="btn" type="submit">
            Sign up
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <span className="btn" onClick={() => renderLogin()}>
            Log in
          </span>
        </p>
      </div>
    );
  };

  const renderLogin = () => {
    return (
      <div className="auth">
        <h1 className="auth__title">Login</h1>
        {isLogInError && <label style={{ color: "red" }}>{errorMessage}</label>}
        <form className="form" onSubmit={handleLogin}>
          <div className="form-group">
            Username:{" "}
            <input type="text" name="username" className="form__input" />
          </div>
          <div className="form-group">
            Password:{" "}
            <input type="password" name="password" className="form__input" />
          </div>
          <button className="btn" type="submit">
            Login
          </button>
        </form>
        <p>
          Don't have an account yet?{" "}
          <span className="btn" onClick={() => renderSignup()}>
            Sign up
          </span>
        </p>
      </div>
    );
  };

  if (!isSignedUp) return renderSignup();
  if (!isLoggedIn) return renderLogin();
}

export default LoginForm;
