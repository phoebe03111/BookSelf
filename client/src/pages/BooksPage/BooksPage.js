import React from "react";
import "./BooksPage.scss";

function BooksPage() {
  return (
    <main className="books">
      <section className="section currently-reading"></section>
      <section className="section finished-reading"></section>
      <section className="section to-read"></section>
    </main>
  );
}

export default BooksPage;
