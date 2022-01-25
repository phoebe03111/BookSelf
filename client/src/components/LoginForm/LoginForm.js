import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./LoginForm.scss";

const baseUrl = "http://localhost:8080";
const loginUrl = `${baseUrl}/login`;
const signupUrl = `${baseUrl}/signup`;

function LoginForm() {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginUsernameError, setLoginUsernameError] = useState(false);
  const [loginPasswordError, setLoginPasswordError] = useState(false);
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  let history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();

    setLoginUsernameError(false);
    setLoginPasswordError(false);

    if (!loginUsername) {
      setLoginUsernameError(true);
    }

    if (!loginPassword) {
      setLoginPasswordError(true);
    }

    axios
      .post(loginUrl, {
        username: loginUsername,
        password: loginPassword,
      })
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        history.push("/books");
        // setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    axios
      .post(signupUrl, {
        username: signupUsername,
        email: signupEmail,
        password: signupPassword,
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
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              fullWidth
              required
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
              required
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth
              required
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<KeyboardArrowRightIcon />}
            onClick={() => setIsSignedUp(false)}
          >
            Signup
          </Button>
        </form>

        <p className="redirect">
          Already have an account?{" "}
          <Button
            color="primary"
            variant="contained"
            endIcon={<KeyboardArrowRightIcon />}
            onClick={renderLogin}
          >
            Login
          </Button>
        </p>
      </div>
    );
  };

  const renderLogin = () => {
    return (
      <div className="auth">
        <h1 className="auth__title">Login</h1>
        <form className="form" onSubmit={handleLogin}>
          <div className="form-group">
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              fullWidth
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              error={loginUsernameError}
            />
          </div>
          <div className="form-group">
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              error={loginPasswordError}
            />
          </div>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<KeyboardArrowRightIcon />}
          >
            Login
          </Button>
        </form>
        <p className="redirect">
          Don't have an account yet?{" "}
          <Button
            color="primary"
            variant="contained"
            endIcon={<KeyboardArrowRightIcon />}
            onClick={() => setIsLoggedIn(false)}
          >
            Signup
          </Button>
        </p>
      </div>
    );
  };

  if (!isLoggedIn) return renderLogin();
  if (!isSignedUp) return renderSignup();
}

export default LoginForm;
