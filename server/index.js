const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const jwt = require("jsonwebtoken");
const cors = require("cors");
const fs = require("fs");
const knex = require("knex")(require("./knexfile").development);
require("dotenv").config();

app.use(express.json());
app.use(cors());

// Connecting to database
const userRoutes = require("./routes/userRoute");
const bookRoutes = require("./routes/bookRoute");
app.use("/user", userRoutes);
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

app.get("/books", authorize, (req, res) => {
  const username = req.decoded.name;

  knex("Book")
    .select(["book.*"])
    .join("user", "user.id", "book.userId")
    .where({ username: username })
    .then((data) => {
      const usersData = data;
      res.json(data);
    })
    .catch(() => res.status(400).json("Error getting data"));
});

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

app.listen(PORT, () => console.log(`🚀 Server is launching on ${PORT}`));

// const readFile = () => {
//   const userData = fs.readFileSync("./data/users.json");
//   return JSON.parse(userData);
// };

// const writeFile = (userData) => {
//   fs.writeFileSync("./data/users.json", JSON.stringify(userData, null, 2));
// };

// app.post("/signup", (req, res) => {
//   const { username, email, password } = req.body;

//   const usersData = readFile();

//   const newUser = {
//     username,
//     email,
//     password,
//   };

//   usersData.push(newUser);
//   writeFile(usersData);

//   res.json({ success: "true" });
// });

// app.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   const usersData = readFile();
//   usersData.filter((user) => {
//     // If user is found and password is correct => create TOKEN and send it back to the client
//     if (user.username === username && user.password === password) {
//       const token = jwt.sign({ name: user.username }, JWT_SECRET, {
//         expiresIn: "24h",
//       });
//       res.json({ token });
//     }
//   });
// });

// app.get("/books", authorize, (req, res) => {
//   const username = req.decoded.name;
//   const usersData = readFile();

//   const targetUser = usersData.filter((user) => user.username === username);

//   res.json(targetUser);
// });
