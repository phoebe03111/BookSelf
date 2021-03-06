import React from "react";
import { Link } from "react-router-dom";
import "./Book2.scss";

function Book({ book }) {
  const { id, image, title } = book;

  return (
    <div className="book2__container">
      <Link to={`/books/${id}`}>
        <img className="book2__book" src={image} alt={title} />
      </Link>
    </div>
  );
}

export default Book;
