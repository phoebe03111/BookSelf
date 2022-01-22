import React, { useState } from "react";
import plusIcon from "../../assets/images/icons/plus.svg";
import AddBookModal from "../AddBookModal/AddBookModal";
import "./EmptyBook.scss";

function EmptyBook() {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(!showModal)
  }
  
  return (
    <div className="empty-book">
      <div className="plus-icon">
        <img
          src={plusIcon}
          alt="add a book"
          onClick={handleClick}
        />
        {showModal && <AddBookModal onClick={handleClick}/>}
      </div>
    </div>
  );
}

export default EmptyBook;
