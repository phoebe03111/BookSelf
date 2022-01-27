import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import axios from "axios";

function BookRatingChange({ rating, onChangeRating }) {
  const [value, setValue] = useState(rating);

  const handleChangeRating = (event, newValue) => {
    setValue(newValue);
    onChangeRating(newValue);
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
