import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../src/components/Header/Header";
import BookDetailPage from "../src/pages/BookDetailPage/BookDetailPage";
import BooksPage from "../src/pages/BooksPage/BooksPage";
import HomePage from "../src/pages/HomePage/HomePage";
import { createTheme, ThemeProvider } from "@mui/material";
import { purple } from "@mui/material/colors";
import "./styles/App.scss";
import BooksDemoPage from "./pages/BooksDemoPage/BooksDemoPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#475847",
    },
    secondary: purple,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/books/:booksId" component={BookDetailPage} />
          <Route path="/books-demo" exact component={BooksDemoPage} />
          <Route path="/books" exact component={BooksPage} />
          <Route path="/" exact component={HomePage} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
