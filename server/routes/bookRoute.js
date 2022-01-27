const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = require("express").Router();
const knex = require("knex")(require("../knexfile").development);

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

// GET single book by id
router.route("/:id").get((req, res) => {
  knex("Book")
    .where({ id: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => res.status(400).json("Error getting data"));
});

// POST a new book
// router.route("/add").post((req, res) => {
//   knex("Book")
//     .insert(req.body)
//     .then((newUserId) => {
//       res.status(201).json(newUserId);
//     })
//     .catch(() => res.status(400).json("Error creating user"));
// });

// DELETE one book by id
router.route("/:id").delete((req, res) => {
  knex("Book")
    .where({ id: req.params.id })
    .del()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => res.status(400).json("Error deleting data"));
});

module.exports = router;
