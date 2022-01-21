import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./LoginPage.scss";

const baseUrl = "http://localhost:8080";
const loginUrl = `${baseUrl}/login`;

function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogInError, setIsLogInError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(loginUrl, {
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then((res) => {
        console.log(res);
        setIsLoggedIn(true);
        sessionStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        setIsLogInError(true);
        setErrorMessage(err);
      });
  };

  return (
    <div className="login">
      <h1 className="login__title">Login</h1>
      <form className="login__form" onSubmit={handleLogin}>
        <div className="login__form-group">
          Username:{" "}
          <input type="text" name="username" className="login__form-input" />
        </div>
        <div className="login__form-group">
          Password:{" "}
          <input
            type="password"
            name="password"
            className="login__form-input"
          />
        </div>
        <button className="btn btn--login" type="submit">
          Login
        </button>
      </form>
      <p>
        Don't have an account yet?{" "}
        <Link to="/signup">
          <span className="btn">Sign up</span>
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
