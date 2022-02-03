import React, { useEffect, useState } from "react";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

function BookStatus({ status, bookId, onChangeStatus }) {
  const [value, setValue] = useState(status);

  const handleChangeStatus = (event, newValue) => {
    setValue(newValue);
    onChangeStatus(newValue);
    axios
      .put(`https://bookself-server.herokuapp.com/books/${bookId}`, {
        status: newValue,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  
  return (
    <div>
      <FormControl>
        <h3 className="book__info-item">Status:</h3>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={value}
          onChange={handleChangeStatus}
          name="radio-buttons-group"
          row
        >
          <FormControlLabel
            value="0"
            control={<Radio />}
            label="Currently reading"
          />
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="Want to read"
          />
          <FormControlLabel
            value="2"
            control={<Radio />}
            label="Finished reading"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default BookStatus;
