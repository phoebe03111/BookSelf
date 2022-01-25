import React from "react";
import Book from "../Book/Book";

function SearchResult({ result }) {
  return <Book book={result} />;
}

export default SearchResult;
