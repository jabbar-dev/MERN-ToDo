const express = require('express');
const usersController = require('../../Controllers/usersController');
const router = express.Router();


router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.addUser)




    module.exports = router;


