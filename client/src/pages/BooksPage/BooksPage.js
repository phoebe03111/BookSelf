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
        setUserInfo(res.data[0]);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(userInfo);
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className="books">
      <h1 className="books__heading">Welcome, {userInfo.username}!</h1>
      <section className="section-d currently-reading">
        {userInfo.books.reading.map((book) => {
          return (
            <div key={book.id}>
              <h1>{book.title}</h1>
              <img src={book.image} />
            </div>
          );
        })}
      </section>
      <section className="section-d finished-reading">
        {userInfo.books.toRead.map((book) => {
          return (
            <div key={book.id}>
              <h1>{book.title}</h1>
              <img src={book.image} />
            </div>
          );
        })}
      </section>
      <section className="section-d to-read">
        {userInfo.books.finished.map((book) => {
          return (
            <div key={book.id}>
              <h1>{book.title}</h1>
              <img src={book.image} />
            </div>
          );
        })}
      </section> 
    </main>
  );
}

export default BooksPage;
