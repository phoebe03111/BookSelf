import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import "../BookDetailPage/BookDetailPage.scss";
import "./EditBookPage.scss";
import BookStatusChange from "../../components/BookStatusChange/BookStatusChange";
import BookRatingChange from "../../components/BookRatingChange/BookRatingChange";

function EditBookPage() {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState({ render: 0 });
  const [titleInput, setTitleInput] = useState("");
  const [authorInput, setAuthorInput] = useState("");
  const [publishedInput, setPublishedInput] = useState("");
  const [reviewInput, setReviewInput] = useState("");
  const [quotesInput, setQuotesInput] = useState("");
  const [ratingInput, setRatingInput] = useState(0);
  const [statusInput, setStatusInput] = useState("");

  let history = useHistory();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios
      .get(`https://bookself-server.herokuapp.com/books/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setBookData(res.data[0]);
        setTitleInput(res.data[0].title);
        setAuthorInput(res.data[0].author);
        setPublishedInput(res.data[0].published);
        setReviewInput(res.data[0].review);
        setQuotesInput(res.data[0].quotes);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSave = () => {
    axios
      .put(`https://bookself-server.herokuapp.com/books/${bookId}`, {
        title: titleInput,
        author: authorInput,
        published: publishedInput,
        quotes: quotesInput,
        review: reviewInput,
      })
      .then((res) => {
        history.push(`/books/${bookId}`);
      })
      .catch((err) => console.log(err));
  };

  const onChangeRating = (value) => {
    setRatingInput(value);
  };

  const onChangeStatus = (value) => {
    setStatusInput(value);
  };

  const { image, title, rating, status } = bookData;

  return (
    <main className="book-detail">
      {bookData.render === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="book-detail__container">
          <div className="book__top">
            <div>
              <img className="book__image" src={image} alt={title} />
              <div className="book__image-bg"></div>
            </div>

            <div className="book__info">
              <h3 className="book__info-item">
                Title:{" "}
                <input
                  type="text"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className="book__input"
                />
              </h3>
              <h3>
                Author:{" "}
                <input
                  type="text"
                  value={authorInput}
                  onChange={(e) => setAuthorInput(e.target.value)}
                  className="book__input"
                />
              </h3>
              <h3 className="book__info-item">
                Published:{" "}
                <input
                  type="text"
                  value={publishedInput}
                  onChange={(e) => setPublishedInput(e.target.value)}
                  className="book__input"
                />
              </h3>
              <BookStatusChange
                status={status}
                bookId={bookId}
                onChangeStatus={onChangeStatus}
              />
              <div>
                <h3 className="book__info-item">Rating:</h3>
                <BookRatingChange
                  rating={rating}
                  bookId={bookId}
                  onChangeRating={onChangeRating}
                />
              </div>
            </div>
          </div>

          <div className="book__bottom">
            <div>
              <h3 className="book__info-item">My Review</h3>
              <textarea
                value={reviewInput}
                onChange={(e) => setReviewInput(e.target.value)}
                className="book__textarea"
              />
            </div>

            <div>
              <h3 className="book__info-item">Favorite quotes</h3>
              <textarea
                value={quotesInput}
                onChange={(e) => setQuotesInput(e.target.value)}
                className="book__textarea"
              />
            </div>

            <div className="button-group">
              <Button
                variant="contained"
                color="primary"
                endIcon={<ModeEditIcon />}
                onClick={handleSave}
              >
                save
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default EditBookPage;
