const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    createFriend,
    deleteFriend,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router
    .route('/:usersId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)
    .post(createFriend);

router
    .route('/:friendsId')
    .delete(deleteFriend);
    
module.exports = router;