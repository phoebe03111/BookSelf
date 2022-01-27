import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

function BookStatus() {
  const [value, setValue] = useState("current");

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
    </div>
  );
}

export default BookStatus;
