import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LoginIcon from "@mui/icons-material/Login";
import Book2 from "../../components/Book2/Book2";
import { Button } from "@mui/material";
import "./BooksPage.scss";

function BooksPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);

  const history = useHistory();

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://bookself-server.herokuapp.com/books", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setIsLoading(false);
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (e) => {
    const category = e.target.name;
    history.push(`/books/add/${category}`);
  };

  if (!token)
    return (
      <main className="books">
        <p className="books__warning">Please log in first</p>
        <Link to="/">
          <LoginIcon fontSize="large" />
        </Link>
      </main>
    );

  return isLoading ? (
    <p>Loading...</p>
  ) : (
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
          {books
            .filter((book) => book.status === 0)
            .map((book) => {
              return <Book2 key={book.id} book={book} />;
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
          {books
            .filter((book) => book.status === 1)
            .map((book) => {
              return <Book2 key={book.id} book={book} />;
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
          {books
            .filter((book) => book.status === 2)
            .map((book) => {
              return <Book2 key={book.id} book={book} />;
            })}
        </div>
      </section>
    </main>
  );
}

export default BooksPage;
