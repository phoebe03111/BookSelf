import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../src/components/Header/Header";
import BookDetailPage from "../src/pages/BookDetailPage/BookDetailPage";
import AddBookPage from "../src/pages/AddBookPage/AddBookPage";
import BooksPage from "../src/pages/BooksPage/BooksPage";
import HomePage from "../src/pages/HomePage/HomePage";
import "./styles/App.scss";
import SignupPage from "./pages/SignupPage/SignupPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/signup" component={SignupPage} />
        {/* <Route path="/login" component={} /> */}
        <Route path="/books/:booksId" component={BookDetailPage} />
        <Route path="/books/add" exact component={AddBookPage} />
        <Route path="/books" exact component={BooksPage} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
