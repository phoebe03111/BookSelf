import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import axios from "axios";
import "./AddBookForm.scss";

function AddBookForm() {
  const [file, setFile] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [authorValue, setAuthorValue] = useState("");
  const [publishedValue, setPublishedValue] = useState("");
  const [reviewValue, setReviewValue] = useState("");
  const [quotesValue, setQuotesValue] = useState("");

  const params = useParams();
  const history = useHistory();

  let statusVal = 0;
  if (params.category === "addCurrent") {
    statusVal = 0;
  } else if (params.category === "addToRead") {
    statusVal = 1;
  } else {
    statusVal = 2;
  }

  const handleChange = (e) => {
    if (e.target.files.length) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");

    axios
      .post(
        "https://bookself-server.herokuapp.com/books/add",
        {
          title: titleValue,
          author: authorValue,
          published: publishedValue,
          image: file,
          status: statusVal,
          rating: 0,
          quotes: quotesValue,
          review: reviewValue,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        history.push(`/books`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="add-book__upload">
        <label htmlFor="upload-button">
          {file ? (
            <img src={file} alt="book" width="300" />
          ) : (
            <p className="upload-button">
              <DriveFolderUploadIcon />
              <span>Upload book image</span>
            </p>
          )}
        </label>
        <input
          type="file"
          style={{ display: "none" }}
          onChange={handleChange}
          id="upload-button"
        />
      </div>

      <TextField
        id="filled-basic"
        label="Title"
        variant="filled"
        size="small"
        fullWidth
        value={titleValue}
        onChange={(e) => setTitleValue(e.target.value)}
      />
      <TextField
        id="filled-basic"
        label="Author"
        variant="filled"
        size="small"
        fullWidth
        value={authorValue}
        onChange={(e) => setAuthorValue(e.target.value)}
      />
      <TextField
        id="filled-basic"
        label="Published date"
        variant="filled"
        size="small"
        fullWidth
        value={publishedValue}
        onChange={(e) => setPublishedValue(e.target.value)}
      />
      <TextField
        id="filled-basic"
        label="My review"
        variant="filled"
        size="small"
        fullWidth
        multiline
        rows={4}
        value={reviewValue}
        onChange={(e) => setReviewValue(e.target.value)}
      />
      <TextField
        id="filled-basic"
        label="Favorite quotes"
        variant="filled"
        size="small"
        fullWidth
        multiline
        rows={4}
        value={quotesValue}
        onChange={(e) => setQuotesValue(e.target.value)}
      />
      <Button type="submit" color="primary" variant="contained">
        Submit
      </Button>
    </form>
  );
}

export default AddBookForm;
