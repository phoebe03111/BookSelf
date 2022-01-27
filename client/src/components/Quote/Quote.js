import React from 'react';
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

function Quote() {
  return <li>
  <FormatQuoteIcon
    style={{ fontSize: "1.7rem", marginRight: "0.2rem" }}
  />
  <span className="book__quote">
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Repudiandae, perferendis.
  </span>
</li>
}

export default Quote;
