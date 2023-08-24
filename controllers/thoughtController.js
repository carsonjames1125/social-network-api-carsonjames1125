const { User, Thought } = require('../models');

module.exports = {
    // route to retrieve all thoughts
    getThought(req, res) {
        Thought.find({})
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },

    // route to get a single thought

    getSingleThought(req, res) {
        Thought.findOne({ _id:req.params.thoughtId })
        .select('-__v')
        .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'Nothing found with this id.' })
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // route to create a thought and then be able to send the thought to the users thought's array 

    createThought(req, res) {
        Thought.create(req.body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then((thought) => 
        !thought
        ? res.status(404).json({ message: `No User Found!` })
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    // update a thought for the user

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, New: true }
        )
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'No thought found.' })
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    }, 

    // deleting a thought within the application

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) => 
        !thought
        ? res.status(404).json({ message: 'No thought found.' })
        : User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
            )   
        )
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'Thought was deleted, but no user was found.' })
        : res.json({ message: 'Thought terminated successfully.' })
        )
        .catch((err) => res.status(500).json(err));
    },

    // reaction 

    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, New: true }
        
        )
        .then((thought) => 
        !thought 
        ? res.status(404).json({ message: 'No friend with that ID.' })
        : res.json(thought) 
        )
        .catch((err) => res.status(500).json(err));
        },

        // delete a reaction

        deleteReaction(req, res) {
            Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, New: true }
            )
            .then((thought) => 
            !thought
            ? res.status(404).json({ message: 'No thought found. ' })
            : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
        },
};

// end of thoughts controller 