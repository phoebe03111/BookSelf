import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import placeholder from "../../assets/images/logo.png";
import "./BooksDemoPage.scss";

const API_URL = "https://www.googleapis.com/books/v1";
const API_KEY = "AIzaSyDsY2TRXK7_SD19uzMFRVjAWIwUtyGsaSY";

function BooksDemoPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/volumes?q=bear attacks&key=${API_KEY}`)
      .then((res) => {
        setBooks(res.data.items);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="books">
      <section className="section currently-reading">
        <h2>Currently Reading</h2>
        <div className="books__container">
          {books.slice(0, 4).map((book) => {
            return (
              <div key={book.id}>
                <Link to={`/books/${book.id}`}>
                  <img
                    className="books__book"
                    src={
                      book?.volumeInfo?.imageLinks?.thumbnail
                        ? book.volumeInfo.imageLinks.thumbnail
                        : placeholder
                    }
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </section>
      <section className="section finished-reading">
        <h2>Finished Reading</h2>
        <div className="books__container">
          {books.slice(4, 8).map((book) => {
            return (
              <div key={book.id}>
                <Link to={`/books/${book.id}`}>
                  <img
                    className="books__book"
                    src={
                      book?.volumeInfo?.imageLinks?.thumbnail
                        ? book.volumeInfo.imageLinks.thumbnail
                        : placeholder
                    }
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </section>
      <section className="section to-read">
        <h2>To-Read List</h2>
        <div className="books__container">
          {books.slice(8, 10).map((book) => {
            return (
              <div key={book.id}>
                <Link to={`/books/${book.id}`}>
                  <img
                    className="books__book"
                    src={
                      book?.volumeInfo?.imageLinks?.thumbnail
                        ? book.volumeInfo.imageLinks.thumbnail
                        : placeholder
                    }
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default BooksDemoPage;
