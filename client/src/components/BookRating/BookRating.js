import React, { useState } from "react";
import Rating from "@mui/material/Rating";

function BookRating({ rating }) {
  
  return (
    <div>
      <Rating name="rating" value={rating} readOnly/>
    </div>
  );
}

export default BookRating;
