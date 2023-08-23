const router = require('express').Router();

const {

    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,

} = require('../../controllers/thoughtController');

//getting all thoughts nd using the POST method to display them
router.route('/').get(getThought).post(createThought);

// get a thought and telling to use the put or delete method by the id
router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

//Post route for new reactions
router.route('/:thoughtId/reactions')
.post(createReaction);

//delete reaction by id route 
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;

