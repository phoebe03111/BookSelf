import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "./SignupPage.scss";

const baseUrl = "http://localhost:8080";
const loginUrl = `${baseUrl}/login`;
const signupUrl = `${baseUrl}/signup`;

function SignupPage() {
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(signupUrl, {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((res) => {
        console.log(res);
        setIsSignedUp(true);

        // Redirect to login page
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signup">
      <h1 className="signup__title">Sign up</h1>
      <form className="signup__form" onSubmit={handleSubmit}>
        <div className="signup__form-group">
          Username:{" "}
          <input type="text" name="username" className="signup__form-input" />
        </div>

        <div className="signup__form-group">
          Email:{" "}
          <input type="email" name="email" className="signup__form-input" />
        </div>

        <div className="signup__form-group">
          Password:{" "}
          <input
            type="password"
            name="password"
            className="signup__form-input"
          />
        </div>

        <button className="btn btn--signup" type="submit">
          Sign up
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <Link to="/login">
          <span className="btn">Log in</span>
        </Link>
      </p>
    </div>
  );
}

export default SignupPage;
