import React, { useState } from "react";
import Rating from "@mui/material/Rating";

function BookRating() {
  const [value, setValue] = useState(3);

  return (
    <div>
      <Rating
        name="simple-controlled"
        value={value}
        readOnly
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </div>
  );
}

export default BookRating;
