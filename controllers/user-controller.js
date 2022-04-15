const { User, Thought } = require("../models");

const userController = {
  // GET /api/users
  getAllUsers: (req, res) => {
    User.find({})
      .populate({ path: "thoughts" })
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  // GET /api/users/:id
  getUserById: (req, res) => {
    User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          res.status(404).send({ message: "User not found" });
          return;
        }
        res.json(user);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  // POST /api/users
  createUser: (req, res) => {
    User.create(req.body)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  // PUT /api/users/:id
  updateUser: (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((user) => {
        if (!user) {
          res.status(404).send({ message: "User not found" });
          return;
        }
        res.json(user);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  // DELETE /api/users/:id
  deleteUser: (req, res) => {
    User.findOne({ _id: req.params.id })
      .then((user) => {
        if (!user) {
          res.status(404).send({ message: "User not found" });
          return;
        }
        // delete user's thoughts
        Thought.deleteMany({ userId: user._id }).then(() => {
          user.remove();
          res.json(user);
        });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
};

module.exports = userController;
