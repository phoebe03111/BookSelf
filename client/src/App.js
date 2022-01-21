import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../src/components/Header/Header";
import BookDetailPage from "../src/pages/BookDetailPage/BookDetailPage";
import AddBookPage from "../src/pages/AddBookPage/AddBookPage";
import BooksPage from "../src/pages/BooksPage/BooksPage";
import HomePage from "../src/pages/HomePage/HomePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import "./styles/App.scss";
import BooksDemoPage from "./pages/BooksDemoPage/BooksDemoPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/books/:booksId" component={BookDetailPage} />
        <Route path="/books/add" exact component={AddBookPage} />
        <Route path="/books-demo" exact component={BooksDemoPage} />
        <Route path="/books" exact component={BooksPage} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
