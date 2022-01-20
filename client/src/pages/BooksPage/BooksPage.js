import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import placeholder from "../../assets/images/logo.png";

import "./BooksPage.scss";

const API_URL = "https://www.googleapis.com/books/v1";
const API_KEY = "AIzaSyDsY2TRXK7_SD19uzMFRVjAWIwUtyGsaSY";

function BooksPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/volumes?q=bear attacks&key=${API_KEY}`)
      .then((res) => {
        setBooks(res.data.items);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(books);

  return (
    <main className="books">
      <section className="section currently-reading">
        {books.slice(0, 5).map((book) => {
          return (
            <div key={book.id}>
              <Link to={`/books/${book.id}`}>
                <img
                  className="books__book"
                  src={book?.volumeInfo?.imageLinks?.thumbnail ? book.volumeInfo.imageLinks.thumbnail : placeholder}
                />
              </Link>
            </div>
          );
        })}
      </section>
      <section className="section finished-reading">
        {books.slice(5, 10).map((book) => {
          return (
            <div key={book.id}>
              <Link to={`/books/${book.id}`}>
                <img
                  className="books__book"
                  src={book?.volumeInfo?.imageLinks?.thumbnail ? book.volumeInfo.imageLinks.thumbnail : placeholder}
                />
              </Link>
            </div>
          );
        })}
      </section>
      <section className="section to-read"></section>
    </main>
  );
}

export default BooksPage;
