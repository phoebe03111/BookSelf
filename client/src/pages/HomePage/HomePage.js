import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./HomePage.scss";

function HomePage() {
  return (
    <main className="home">
      <div className="hero">
        <h1 className="hero__text">
          “If you want to know someone, <br /> look at their bookshelves.”
        </h1>
      </div>

      <LoginForm />
    </main>
  );
}

export default HomePage;
