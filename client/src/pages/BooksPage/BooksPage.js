import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Book from "../../components/Book/Book";
import Book2 from "../../components/Book2/Book2";
import { Button } from "@mui/material";
import "./BooksPage.scss";

function BooksPage() {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);

  const history = useHistory();

  // useEffect(() => {
  //   // Grab token from sessionStorage
  //   const token = sessionStorage.getItem("token");

  //   axios
  //     .get("http://localhost:8080/books", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => {
  //       setUserInfo(res.data[0]);
  //       setIsLoading(false);
  //       console.log(userInfo)
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/book")
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

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className="books">
      {/* <h1 className="books__heading">Welcome, {userInfo.username}!</h1> */}
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
          {/* {userInfo.books.reading.map((book) => {
            return <Book key={book.id} book={book} />;
          })} */}
          {books.filter(book => book.status === 0).map((book) => {
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
          {/* {userInfo.books.toRead.map((book) => {
            return <Book key={book.id} book={book} />;
          })} */}
          {books.filter(book => book.status === 1).map((book) => {
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
          {/* {userInfo.books.finished.map((book) => {
            return <Book key={book.id} book={book} />;
          })} */}
          {books.filter(book => book.status === 2).map((book) => {
            return <Book2 key={book.id} book={book} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default BooksPage;
