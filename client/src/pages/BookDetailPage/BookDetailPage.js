import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import BookRating from "../../components/BookRating/BookRating";
import { Button, ButtonGroup } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./BookDetailPage.scss";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal/ConfirmDeleteModal";
import Quote from "../../components/Quote/Quote";
import BookStatus from "../../components/BookStatus/BookStatus";

function BookDetailPage() {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState({ render: 0 });
  const [openModal, setOpenModal] = useState(false);

  let history = useHistory();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios
      .get(`http://localhost:8080/books/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setBookData(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (open) => {
    setOpenModal(open)
  };

  const { image, title, author, published, quotes, rating, review, status } =
    bookData;

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
              <h3 className="book__info-item">Title: {title}</h3>
              <h3>Author: {author}</h3>
              <h3 className="book__info-item">Published: {published}</h3>
              <BookStatus status={status} />
              <div>
                <h3 className="book__info-item">Rating:</h3>
                <BookRating rating={rating} />
              </div>
            </div>
          </div>

          <div className="book__bottom">
            <div>
              <h3 className="book__info-item">My Review</h3>
              <p className="book__review">{review}</p>
            </div>

            <div>
              <h3>Favorite quotes</h3>
              <ul>
                <Quote quotes={quotes} />
              </ul>
            </div>

            <div className="button-group">
              <ButtonGroup variant="contained">
                <Button
                  color="primary"
                  endIcon={<ModeEditIcon />}
                  onClick={() => history.push(`/books/${bookId}/edit`)}
                >
                  edit
                </Button>
                <Button
                  color="secondary"
                  endIcon={<DeleteOutlineIcon />}
                  onClick={() => setOpenModal(true)}
                >
                  remove
                </Button>
              </ButtonGroup>
            </div>

            {openModal && (
              <ConfirmDeleteModal bookId={bookId} onDelete={handleDelete} />
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default BookDetailPage;
