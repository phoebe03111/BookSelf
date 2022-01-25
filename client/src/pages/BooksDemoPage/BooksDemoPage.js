import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./BooksDemoPage.scss";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Book from "../../components/Book/Book";
import { Button } from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

function BooksDemoPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/volumes?q=bear attacks&key=${API_KEY}`)
      .then((res) => {
        setBooks(res.data.items);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="books">
      <section className="section currently-reading">
        <div className="section__topic">
          <h2 className="section__title">
            <BookmarksIcon /> Currently Reading
          </h2>
          <Button
            type="button"
            color="primary"
            variant="contained"
            endIcon={<AddToPhotosIcon />} // onClick={() => setIsSignedUp(false)}
          >
            Add
          </Button>
        </div>
        <div className="books__group">
          {books.slice(0, 6).map((book) => {
            return <Book key={book.id} book={book} />;
          })}
        </div>
      </section>

      <section className="section currently-reading">
        <div className="section__topic">
          <h2 className="section__title">
            <BookmarkAddIcon style={{ fontSize: "2rem" }} /> Want to read
          </h2>
          <Button
            type="button"
            color="primary"
            variant="contained"
            endIcon={<AddToPhotosIcon />}
            // onClick={() => setIsSignedUp(false)}
          >
            Add
          </Button>
        </div>
        <div className="books__group">
          {books.slice(4, 8).map((book) => {
            return <Book key={book.id} book={book} />;
          })}
        </div>
      </section>

      <section className="section currently-reading">
        <div className="section__topic">
          <h2 className="section__title">
            <CheckCircleIcon style={{ fontSize: "1.9rem" }} /> Finished Reading
          </h2>
          <Button
            type="button"
            color="primary"
            variant="contained"
            endIcon={<AddToPhotosIcon />} // onClick={() => setIsSignedUp(false)}
          >
            Add
          </Button>
        </div>
        <div className="books__group">
          {books.slice(8, 10).map((book) => {
            return <Book key={book.id} book={book} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default BooksDemoPage;
