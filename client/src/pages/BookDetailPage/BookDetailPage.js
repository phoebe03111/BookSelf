import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, ButtonGroup } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Rating from "@mui/material/Rating";
import "./BookDetailPage.scss";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

function BookDetailPage() {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState({ render: 0 });
  const [value, setValue] = useState(3);

  useEffect(() => {
    axios
      .get(`${API_URL}/volumes/${bookId}?key=${API_KEY}`)
      .then((res) => {
        setBookData(res.data.volumeInfo);
      })
      .catch((err) => console.log(err));
  }, []);

  const { title, authors, publishedDate } = bookData;

  return (
    <main className="book-detail">
      {bookData.render === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="book-detail__container">
          <div className="book__top">
            <div>
              <img
                className="book__image"
                src={bookData.imageLinks.thumbnail}
              />
              <div className="book__image-bg"></div>
            </div>

            <div className="book__info">
              <h3 className="book__info-item">Title: {title}</h3>
              <h3>Author: {authors[0]}</h3>
              <h3 className="book__info-item">Published: {publishedDate}</h3>
              <FormControl>
                <h3 className="book__info-item">Status:</h3>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="current"
                  name="radio-buttons-group"
                  row
                >
                  <FormControlLabel
                    value="current"
                    control={<Radio />}
                    label="Currently reading"
                  />
                  <FormControlLabel
                    value="to-read"
                    control={<Radio />}
                    label="Want to read"
                  />
                  <FormControlLabel
                    value="finished"
                    control={<Radio />}
                    label="Finished reading"
                  />
                </RadioGroup>
              </FormControl>
              <div>
                <h3 className="book__info-item">Rating:</h3>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="book__bottom">
            <div>
              <h3 className="book__info-item">My Review</h3>
              <p className="book__review">
                Okay WOW. This was amazing. I must say that I was kind of
                skeptical? going into this because the idea is SO good that I
                didn't know if the writing would be able to live up to it (which
                can sometimes happen)... but alas, no! Haig's prose is
                fast-paced and easy to read, but also believable and deeply
                philosophical. There is just so much to learn from this book. I
                mean, you COULD read a self-help book on stoicism, or you could
                just read this :)
              </p>
            </div>

            <div>
              <h3>Favorite quotes</h3>
              <ul>
                <li>
                  <FormatQuoteIcon
                    style={{ fontSize: "1.7rem", marginRight: "0.2rem" }}
                  />
                  <span className="book__quote">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repudiandae, perferendis.
                  </span>
                </li>

                <li>
                  <FormatQuoteIcon
                    style={{ fontSize: "1.7rem", marginRight: "0.2rem" }}
                  />
                  <span className="book__quote">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eaque sunt facilis laudantium. Pariatur, laudantium
                    mollitia.
                  </span>
                </li>
              </ul>
            </div>

            <ButtonGroup
              variant="contained"
              style={{ alignSelf: "flex-end", marginTop: "2rem" }}
            >
              <Button color="primary" endIcon={<ModeEditIcon />}>
                edit
              </Button>
              <Button color="secondary" endIcon={<DeleteOutlineIcon />}>
                remove
              </Button>
            </ButtonGroup>
          </div>
        </div>
      )}
    </main>
  );
}

export default BookDetailPage;
