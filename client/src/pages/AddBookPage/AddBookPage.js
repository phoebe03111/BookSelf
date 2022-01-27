import React, { useState } from "react";
import axios from "axios";
import SearchResult from "../../components/SearchResult/SearchResult";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./AddBookPage.scss";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

function AddBookForm() {
  const [results, setResults] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchTerm = e.target.book.value;

    axios
      .get(`${API_URL}/volumes?q=${searchTerm}&key=${API_KEY}`)
      .then((res) => {
        setResults(res.data.items);
        e.target.book.value = "";
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="add-book">
      <div className="add-book__container">
        <form className="add-book__search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="search book title or author..."
            className="add-book__input"
            name="book"
          />
        </form>

        <div className="add-book__results">
          {results.length !== 0 &&
            results.map((result) => {
              return <SearchResult key={result.id} result={result} />;
            })}
        </div>
      </div>

      <div className="add-book__form">
        <h2 style={{ marginTop: "1rem" }}>
          Can not find your book? Add it here.
        </h2>
        {/* <form>
          <TextField id="filled-basic" label="Title" variant="filled" />
        </form> */}
      </div>
    </main>
  );
}

export default AddBookForm;
