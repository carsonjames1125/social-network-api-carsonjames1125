const { User, Thought } = require('./models');

module.exports = { 
    //grabbing all users route

    getUser(req, res) {
        User.find({})
        .then((user) => req.json(user))
        .catch((err) => res.status(500).json(err));
    },

    // request for just one user

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .populate('thoughts')
        .populate('friends')
        .select('__v')
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'No user was able to be found with that ID.'})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    // route to create a user 

    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    // update a user

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, New: ture },
        )
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'No user found at this time' })
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    // route to delete a user and their thoughts as well.

    deleteUser(req,res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => 
        !user? res.status(404).json({ message:'No user could be found at this time.' })
        : Thought.deleteMany({ _id: { $in: user.thoughts } })
    
        )
        .then(() => res.json({ message: 'Successfully deleted user and user thoughts.' }))
        .catch((err) => res.status(500).json(err));
    },

    // route to add a friend

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, New: true }
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user found.' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    // delete route for removing a friend

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { New: true }
        )
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'No user found.'})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
};

//end of user route