import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./BooksPage.scss";

function BooksPage() {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Grab token from sessionStorage
    const token = sessionStorage.getItem("token");

    axios
      .get("http://localhost:8080/books", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setIsLoading(false);
        setUserInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className="books">
      <h1>Welcome, {userInfo.name}!</h1>
      <section className="section currently-reading"></section>
      <section className="section finished-reading"></section>
      <section className="section to-read"></section>
    </main>
  );
}

export default BooksPage;
