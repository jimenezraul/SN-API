const { User, Thought } = require("./../models");

const thoughtController = {
  // GET /api/thoughts
  getAllThoughts: (req, res) => {
    Thought.find({})
      .then((thoughts) => {
        res.json(thoughts);
      })
      .catch((err) => {
        res.status(400).json(err.message);
      });
  },

  // GET /api/thoughts/:id
  getThoughtById: (req, res) => {
    Thought.findOne({_id: req.params.id})
      .then((thought) => {
        if (!thought) {
          res.status(404).send({ message: "Thought not found" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => {
        res.status(400).json(err.message);
      });
  },

  // POST /api/thoughts
  createThought: ({ body }, res) => {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findByIdAndUpdate(
          { _id: body.userId },
          {
            $push: {
              thoughts: _id,
            },
          },
          { new: true }
        );
      })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  // PUT /api/thoughts/:id
  updateThought: (req, res) => {
    Thought.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((thought) => {
        if (!thought) {
          res.status(404).send({ message: "Thought not found" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },  

  // DELETE /api/thoughts/:id
  deleteThought: (req, res) => {
    Thought.findByIdAndRemove(req.params.id)
      .then((thought) => {
        if (!thought) {
          res.status(404).send({ message: "Thought not found" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
};

module.exports = thoughtController;
