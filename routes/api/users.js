const express = require('express');
const usersController = require('../../Controllers/usersController');
const router = express.Router();
const verifyJWT = require ('../../middleware/verifyJWT');

router.route('/')
    .get(verifyJWT,usersController.getAllUsers)
    .post(usersController.addUser)

router.route('/:id')
    .delete(verifyJWT,usersController.deleteUser)
router.route('/:id')
    .put(usersController.updateUser)
    
router.route('/:id')
    .get(usersController.getUser)




    module.exports = router;


