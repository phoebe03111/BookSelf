import React from "react";
import { Link } from "react-router-dom";
import placeholder from "../../assets/images/logo.png";
import "./Book.scss";

function Book({ book }) {
  return (
    <div className="book__container">
      <Link to={`/books/${book.id}`}>
        <img
          className="book__book"
          src={
            book?.volumeInfo?.imageLinks?.thumbnail
              ? book.volumeInfo.imageLinks.thumbnail
              : placeholder
          }
        />
      </Link>
    </div>
  );
}

export default Book;
