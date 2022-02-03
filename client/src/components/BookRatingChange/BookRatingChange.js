import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import axios from "axios";

function BookRatingChange({ bookId, rating, onChangeRating }) {
  const [value, setValue] = useState(rating);

  const handleChangeRating = (event, newValue) => {
    setValue(newValue);
    onChangeRating(newValue);
    axios
      .put(`https://bookself-server.herokuapp.com/books/${bookId}`, {
        rating: newValue,
      })
      // .then((res) => {
      //   console.log(res);
      // })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={handleChangeRating}
      />
    </div>
  );
}

export default BookRatingChange;
