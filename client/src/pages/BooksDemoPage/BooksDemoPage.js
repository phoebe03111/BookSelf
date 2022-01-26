import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Book3 from "../../components/Book3/Book3";
import { Button } from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

function BooksDemoPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/volumes?q=chanel&key=${API_KEY}`)
      .then((res) => {
        console.log(res.data.items)
        setBooks(res.data.items);
      })
      .catch((err) => console.log(err));
  }, []);

  const history = useHistory();

  const handleClick = (e) => {
    const category = e.target.name;
    history.push(`/books/add/${category}`);
  };

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
            endIcon={<AddToPhotosIcon />}
            name="addCurrent"
            onClick={handleClick}
          >
            Add
          </Button>
        </div>
        <div className="books__group">
          {books.slice(0, 5).map((book) => {
            return <Book3 key={book.id} book={book} />;
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
            name="addToRead"
            onClick={handleClick}
          >
            Add
          </Button>
        </div>
        <div className="books__group">
          {books.slice(3, 10).map((book) => {
            return <Book3 key={book.id} book={book} />;
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
            endIcon={<AddToPhotosIcon />}
            name="addFinished"
            onClick={handleClick}
          >
            Add
          </Button>
        </div>
        <div className="books__group">
          {books.slice(8, 10).map((book) => {
            return <Book3 key={book.id} book={book} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default BooksDemoPage;
