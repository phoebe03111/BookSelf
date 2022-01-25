import React from "react";
import { Link } from "react-router-dom";
import placeholder from "../../assets/images/logo.png";
import "./Book.scss";

function Book({ book }) {
  return (
    <div className="book-book">
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
      <h3>{book.volumeInfo.title}</h3>
      {book.volumeInfo.authors.map((author) => (
        <p key={author}>{author}</p>
      ))}
    </div>
  );
}

export default Book;
