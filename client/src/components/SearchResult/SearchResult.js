import React from "react";
import Book from "../Book/Book";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "./SearchResult.scss";

function SearchResult({ result }) {
  const { title, description } = result.volumeInfo;

  const handlePlus = () => {
    console.log("plus!");
  };

  return (
    <article className="result">
      <Book book={result} />

      <div className="result__info">
        <h4>Title: {title}</h4>
        <h4>
          Author:{" "}
          {result.volumeInfo.authors &&
            result.volumeInfo.authors.map((author) => {
              return <span key={author}>{author}, </span>;
            })}
        </h4>
        <h4>Description:</h4>
        <p className="result__description">
          {description && description.slice(0, 200) + "..."}
        </p>
        <div className="plus-icon">
          <AddCircleIcon color="success" onClick={handlePlus} />
        </div>
      </div>
    </article>
  );
}

export default SearchResult;
