import React, { useState } from "react";
import axios from "axios";

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
    <div>
      <h1>Login</h1>
      {isLogInError && <label style={{ color: "red" }}>{errorMessage}</label>}
      <form className="form" onSubmit={handleLogin}>
        <div className="form-group">
          Username: <input type="text" name="username" />
        </div>
        <div className="form-group">
          Password: <input type="password" name="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
