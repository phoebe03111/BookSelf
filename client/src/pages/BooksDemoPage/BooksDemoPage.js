import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import placeholder from "../../assets/images/logo.png";
import "./BooksDemoPage.scss";
import EmptyBook from "../../components/EmptyBook/EmptyBook";
import Book from "../../components/Book/Book";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

function BooksDemoPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/volumes?q=grit&key=${API_KEY}`)
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
            return <Book book={book} />;
          })}
          <EmptyBook />
        </div>
      </section>
      <section className="section finished-reading">
        <h2>To-Read List</h2>
        <div className="books__container">
          {books.slice(4, 8).map((book) => {
            return <Book book={book} />;
          })}
          <EmptyBook />
        </div>
      </section>
      <section className="section to-read">
        <h2>Finished Reading</h2>
        <div className="books__container">
          {books.slice(8, 10).map((book) => {
            return <Book book={book} />;
          })}
          <EmptyBook />
        </div>
      </section>
    </main>
  );
}

export default BooksDemoPage;
