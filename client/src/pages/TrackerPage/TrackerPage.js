import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Book2 from "../../components/Book2/Book2";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import bookImg from "../../assets/images/logo-book.png";
import "./TrackerPage.scss";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

function TrackerPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [goal, setGoal] = useState(10);
  const history = useHistory();

  const handleClick = (e) => {
    const category = e.target.name;
    history.push(`/books/add/${category}`);
  };

  let finishedAmount = books.filter((book) => book.status === 2).length;
  let percentage = Math.floor((finishedAmount / goal) * 100);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios
      .get("http://localhost:8080/books", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setIsLoading(false);
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className="tracker">
      <div className="tracker__goal">
        <div className="tracker__text">
          <img src={bookImg} alt="book" className="tracker__img" />
          <h1 className="tracker__font">
            2022 Reading Goal: I will read{" "}
            <TextField
              type="number"
              InputProps={{ inputProps: { min: finishedAmount, max: 100 } }}
              id="goal"
              label="number"
              variant="outlined"
              size="small"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />{" "}
            books
          </h1>
          <img src={bookImg} alt="book" className="tracker__img" />
        </div>

        <div className="tracker__progress-bar">
          <ProgressBar percentage={percentage} />
        </div>
      </div>

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

export default TrackerPage;
