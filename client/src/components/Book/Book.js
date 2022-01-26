import React from "react";
import placeholder from "../../assets/images/book-placeholder.jpeg";
import "./Book.scss";

function Book({ book }) {
  return (
    <div className="book__container">
      <a href={book.volumeInfo.infoLink} target="_blank">
        <img
          className="book__book"
          src={
            book?.volumeInfo?.imageLinks?.thumbnail
              ? book.volumeInfo.imageLinks.thumbnail
              : placeholder
          }
        />
      </a>
    </div>
  );
}

export default Book;
