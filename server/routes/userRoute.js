const router = require("express").Router();
const knex = require("knex")(require("../knexfile").development);

// GET all users
router.route("/").get((req, res) => {
  knex("User")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => res.status(400).json("Error getting data"));
});

// GET single user by id
router.route("/:id").get((req, res) => {
  knex("User")
    .where({ id: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => res.status(400).json("Error getting data"));
});

// POST a new user
// router.route("/add").post((req, res) => {
//   knex("User")
//     .insert(req.body)
//     .then((newUserId) => {
//       res.status(201).json(newUserId);
//     })
//     .catch(() => res.status(400).json("Error creating user"));
// });

module.exports = router;