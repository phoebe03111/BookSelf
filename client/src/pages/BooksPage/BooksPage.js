import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import placeholder from "../../assets/images/logo.png";
import "./BooksPage.scss";


function BooksPage() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Grab token from sessionStorage
    const token = sessionStorage.getItem("token");
    
    axios
      .get("http://localhost:8080/books", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setBooks(res.data);
      });

    //   axios
    //     .get(`${API_URL}/volumes?q=bear attacks&key=${API_KEY}`)
    //     .then((res) => {
    //       setBooks(res.data.items);
    //     })
    //     .catch((err) => console.log(err));
  }, []);

  return (
    <main className="books">
      <section className="section currently-reading">
        {/* {books.slice(0, 5).map((book) => {
          return (
            <div key={book.id}>
              <Link to={`/books/${book.id}`}>
                <img
                  className="books__book"
                  src={
                    book?.volumeInfo?.imageLinks?.thumbnail
                      ? book.volumeInfo.imageLinks.thumbnail
                      : placeholder
                  }
                />
              </Link>
            </div>
          );
        })} */}
      </section>
      <section className="section finished-reading"></section>
      <section className="section to-read"></section>
    </main>
  );
}

export default BooksPage;
