import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Book from "../Book/Book";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "./SearchResult.scss";

function SearchResult({ result }) {
  const [added, setAdded] = useState(false);
  const params = useParams();
  const token = sessionStorage.getItem("token");
  const { id } = result;
  const { title, authors, publishedDate, imageLinks, description } =
    result.volumeInfo;

  const history = useHistory();

  let statusVal = 0;
  if (params.category === "addCurrent") {
    statusVal = 0;
  } else if (params.category === "addToRead") {
    statusVal = 1;
  } else {
    statusVal = 2;
  }

  const handlePlus = () => {
    axios
      .post(
        "https://book-self.herokuapp.com/books/add",
        {
          title: title,
          author: authors[0],
          published: publishedDate,
          image: imageLinks.thumbnail,
          description: description,
          status: statusVal,
          rating: 0,
          quotes: "N/A",
          review: "N/A",
          googleId: id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setAdded(true);
        history.push(`/books`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <article className="result">
      <Book book={result} />

      <div className="result__info">
        <h4 className="result__title">Title: {title}</h4>
        <h4>
          Author:{" "}
          {result.volumeInfo.authors &&
            result.volumeInfo.authors.map((author, index) => {
              return <span key={index}>{author}, </span>;
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
