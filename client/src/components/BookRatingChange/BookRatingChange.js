import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import axios from "axios";

function BookRatingChange({ rating }) {
  const [value, setValue] = useState(rating);

  return (
    <div>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          
          // Store the updated value in database
          axios.post('http://localhost:8080/books')
        }}
      />
    </div>
  );
}

export default BookRatingChange;
