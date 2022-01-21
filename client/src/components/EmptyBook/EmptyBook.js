import React from "react";
import plusIcon from "../../assets/images/icons/plus.svg";
import "./EmptyBook.scss";

function EmptyBook() {
  return (
    <div className="empty-book">
      <div className="plus-icon">
        <img src={plusIcon} alt="add a book" />
      </div>
    </div>
  );
}

export default EmptyBook;
