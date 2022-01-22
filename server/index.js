const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const jwt = require("jsonwebtoken");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

app.use(express.json());
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET;

const readFile = () => {
  const userData = fs.readFileSync("./data/users.json");
  return JSON.parse(userData);
};

const writeFile = (userData) => {
  fs.writeFileSync("./data/users.json", JSON.stringify(userData, null, 2));
};

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

const users = {};

// Signup logic
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  const usersData = readFile();

  const newUser = {
    username,
    email,
    password,
  };

  usersData.push(newUser);
  writeFile(usersData);

  res.json({ success: "true" });
});

// Login logic
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const usersData = readFile();
  usersData.filter((user) => {
    // If user is found and password is correct => create TOKEN and send it back to the client
    if (user.username === username && user.password === password) {
      const token = jwt.sign({ name: user.username }, JWT_SECRET, {
        expiresIn: "24h",
      });
      res.json({ token });
    }
  });
});

app.get("/books", authorize, (req, res) => {
  const username = req.decoded.name;
  const usersData = readFile();

  const targetUser = usersData.filter((user) => user.username === username);

  res.json(targetUser);
});

app.listen(PORT, () => console.log(`🚀 Server is launching on ${PORT}`));
