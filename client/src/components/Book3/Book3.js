import React from "react";
import { Link } from "react-router-dom";

function Book({ book }) {

  return (
    <div className="book2__container">
      <Link to={`/books/${book.id}`}>
        <img className="book2__book" src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
      </Link>
    </div>
  );
}

export default Book;