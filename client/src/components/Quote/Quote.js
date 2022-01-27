import React from "react";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

function Quote({ quotes }) {
  return (
    <div>
      <FormatQuoteIcon />
      {quotes}
    </div>
  );
}

export default Quote;
