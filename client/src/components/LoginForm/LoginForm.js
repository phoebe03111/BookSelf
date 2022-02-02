import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./LoginForm.scss";

const baseUrl = "https://book-self.herokuapp.com/";
const loginUrl = `${baseUrl}/login`;
const signupUrl = `${baseUrl}/signup`;

function LoginForm() {
  const [isSignedUp, setIsSignedUp] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginUsernameError, setLoginUsernameError] = useState(false);
  const [loginPasswordError, setLoginPasswordError] = useState(false);

  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupUsernameError, setSignupUsernameError] = useState(false);
  const [signupEmailError, setSignupEmailError] = useState(false);
  const [signupPasswordError, setSignupPasswordError] = useState(false);

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
        sessionStorage.removeItem("token");
        sessionStorage.setItem("token", res.data.token);
        history.push("/books");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    setSignupUsernameError(false);
    setSignupEmailError(false);
    setSignupPasswordError(false);

    if (!signupUsername) {
      setSignupUsernameError(true);
    }

    if (!signupEmail) {
      setSignupEmailError(true);
    }

    if (!signupPassword) {
      setSignupPasswordError(true);
    }

    axios
      .post(signupUrl, {
        username: signupUsername,
        email: signupEmail,
        password: signupPassword,
      })
      .then((res) => {
        setIsLoggedIn(false);
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
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
              autoComplete="off"
              error={signupUsernameError}
            />
          </div>

          <div className="form-group">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              autoComplete="off"
              error={signupEmailError}
            />
          </div>

          <div className="form-group">
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              autoComplete="off"
              error={signupPasswordError}
            />
          </div>

          <Button
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<KeyboardArrowRightIcon />}
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
            onClick={() => {
              setIsLoggedIn(false);
              setIsSignedUp(true);
            }}
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
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              error={loginPasswordError}
              autoComplete="off"
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
            onClick={() => {
              setIsLoggedIn(true)
              setIsSignedUp(false)
            }}
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
