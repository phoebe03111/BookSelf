import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../src/components/Header/Header";
import BookDetailPage from "../src/pages/BookDetailPage/BookDetailPage";
import BooksPage from "../src/pages/BooksPage/BooksPage";
import HomePage from "../src/pages/HomePage/HomePage";
import { createTheme, ThemeProvider } from "@mui/material";
import "./styles/App.scss";
import AddBookPage from "./pages/AddBookPage/AddBookPage";
import EditBookPage from "./pages/EditBookPage/EditBookPage";
import TrackerPage from "./pages/TrackerPage/TrackerPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#33413c",
    },
    secondary: {
      main: "#a50000",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/books/tracker" component={TrackerPage} />
          <Route path="/books/add/:category" component={AddBookPage} />
          <Route path="/books/:bookId/edit" component={EditBookPage} />
          <Route path="/books/:bookId" component={BookDetailPage} />
          <Route path="/books" exact component={BooksPage} />
          <Route path="/" exact component={HomePage} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
