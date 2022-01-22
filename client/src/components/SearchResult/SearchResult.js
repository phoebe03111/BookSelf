import React from "react";
import Book from "../Book/Book";

function SearchResult({ result }) {
  return (
    <div>
      <Book book={result} />
    </div>
  );
}

export default SearchResult;
