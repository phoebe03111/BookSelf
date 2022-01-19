import React from "react";
import Button from "../../components/Button/Button";
import "./HomePage.scss";

function HomePage() {
  return (
    <div className="hero">
      <h1 className="hero__text">
        "If you want to know someone, <br /> look at their bookshelves."
      </h1>
      
      <Button>Explore</Button>
    </div>
  );
}

export default HomePage;
