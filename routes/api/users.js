const express = require('express');
const usersController = require('../../Controllers/usersController');
const router = express.Router();
const verifyJWT = require ('../../middleware/verifyJWT');

router.route('/')
    .get(verifyJWT,usersController.getAllUsers)
    .post(usersController.addUser)




    module.exports = router;


