import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Book from "../Book/Book";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "./SearchResult.scss";

function SearchResult({ result }) {
  const [added, setAdded] = useState(false);
  const params = useParams();

  const { id } = result;
  const { title, authors, publishedDate, imageLinks, description } =
  result.volumeInfo;

  let status;
  if (params.category === 'addCurrent') {
    status = 0
  } else if (params.category === 'addToRead') {
    status = 1
  } else {
    status = 2
  } 

  const handlePlus = () => {
    axios
      .post("http://localhost:8080/book/add", {
        title: title,
        author: authors[0],
        published: publishedDate,
        image: imageLinks.thumbnail,
        description: description,
        status: status,
        rating: 0,
        review: "",
        userId: 2,
        googleId: id,
      })
      .then(() => setAdded(true))
      .catch((err) => console.log(err));
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
          {added ? (
            <CheckCircleOutlineIcon fontSize="large" color="info" />
          ) : (
            <AddCircleIcon
              color="success"
              fontSize="large"
              onClick={handlePlus}
            />
          )}
        </div>
      </div>
    </article>
  );
}

export default SearchResult;
