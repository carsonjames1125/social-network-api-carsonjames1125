const router = require('express').Router();

const {

    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend

} = require('../../controllers/userController');

// get all and post them
router.route('/').get(getUser).post(createUser);

//get one single user, use put and delete with the users Id
router.route('/userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// use post and delete by the friend id 
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;