import React, { useState } from "react";
import axios from "axios";
import closeIcon from "../../assets/images/icons/menu-close.svg";
import "./AddBookModal.scss";
import SearchResult from "../SearchResult/SearchResult";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

function AddBookModal({ onClick }) {
  const [results, setResults] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchTerm = e.target.book.value;

    axios
      .get(`${API_URL}/volumes?q=${searchTerm}&key=${API_KEY}`)
      .then((res) => {
        setResults(res.data.items.slice(0, 5));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="modal">
      <img
        className="modal__close-btn"
        src={closeIcon}
        alt="close"
        onClick={onClick}
      />
      
      <div className="modal__content">
        <form className="modal__form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="search book title..."
            className="modal__input"
            name="book"
          />
        </form>
        <div className="modal__results">
          {results.length !== 0 &&
            results.map((result) => {
              return <SearchResult key={result.id} result={result} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default AddBookModal;
