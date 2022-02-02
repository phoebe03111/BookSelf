import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

function BookStatus({ status }) {
  let value;
  if (status === 0) {
    value = "current";
  } else if (status === 1) {
    value = "to-read";
  } else {
    value = "finished";
  }

  return (
    <div>
      <FormControl>
        <h3 className="book__info-item">Status:</h3>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={value}
          name="radio-buttons-group"
          row
        >
          <FormControlLabel
            value="current"
            control={<Radio />}
            label="Currently reading"
            disabled={status !== 0 && true}
          />
          <FormControlLabel
            value="to-read"
            control={<Radio />}
            label="Want to read"
            disabled={status !== 1 && true}
          />
          <FormControlLabel
            value="finished"
            control={<Radio />}
            label="Finished reading"
            disabled={status !== 2 && true}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default BookStatus;
