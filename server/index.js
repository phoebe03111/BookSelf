const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const jwt = require("jsonwebtoken");
const cors = require("cors");
const knex = require("knex")(require("./knexfile").development);
require("dotenv").config();

app.use(express.json());
app.use(cors());

// Connecting to database
const bookRoutes = require("./routes/bookRoute");
app.use("/books", bookRoutes);

const JWT_SECRET = process.env.JWT_SECRET;

// Authorization middleware
function authorize(req, res, next) {
  // If token is not provided or invalid, return 401 status and should not proceed
  if (!req.headers.authorization)
    return res.status(401).json({ message: "Not authorized" });

  // BEARER: xxxxx(only this token part we need)
  const authToken = req.headers.authorization.split(" ")[1];

  // Decode the contents of the token
  jwt.verify(authToken, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Check if the token expired
    if (Date.now() > new Date(decoded.exp * 1000)) {
      return res.status(401).json({ message: "Token expired" });
    }

    // Decoded contents should be placed on req.decoded, for the next function to use
    req.decoded = decoded;
    next();
  });
}

// Signup logic
app.post("/signup", (req, res) => {
  
  knex("User")
    .insert(req.body)
    .then((newUserId) => {
      res.status(201).json(newUserId);
    })
    .catch(() => res.status(400).json("Error creating user"));
});

// Login logic
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  knex("User")
    .where({ username: username })
    .then((data) => {
      const usersData = data[0];

      if (usersData.password === password) {
        const token = jwt.sign({ name: username }, JWT_SECRET, {
          expiresIn: "24h",
        });
        res.json({ token });
      }
    })
    .catch(() => res.status(400).json("Error getting data"));
});

//////////////// Book Routes ////////////////

// GET all the books
app.get("/books", authorize, (req, res) => {
  const username = req.decoded.name;

  knex("Book")
    .select(["book.*"])
    .join("user", "user.id", "book.userId")
    .where({ username: username })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch(() => res.status(400).json("Error getting data"));
});

// POST a new book
app.post("/books/add", authorize, (req, res) => {
  let body = req.body;

  knex("User")
    .where({ username: req.decoded.name })
    .then((data) => {
      body.userId = data[0].id;

      knex("Book")
        .insert(body)
        .then((newUserId) => {
          res.status(201).json(newUserId);
        })
        .catch((err) => res.status(400).json(err));
    });
});

//////////////// User Routes ////////////////

// Put (update) a user data
app.put("/users", authorize, (req, res) => {
  const username = req.decoded.name;

  knex("User")
    .where({ username: username })
    .update(req.body)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch(() => res.status(400).json("Error creating user"));
});

// GET single user by username
app.get("/goal", authorize, (req, res) => {
  const username = req.decoded.name;

  knex("User")
    .select(['goal'])
    .where({ username: username })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => res.status(400).json("Error creating user"));
});

app.listen(PORT, () => console.log(`🚀 Server is launching on ${PORT}`));
