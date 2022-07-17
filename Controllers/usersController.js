const express = require('express');
const bcrypt = require('bcrypt');
const UsersModel = require('../models/Users');



const getAllUsers = (req, res) => { // get all users
    UsersModel.find({}, (err, users) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(users);
        }
    });
}   // end getAllUsers


const addUser = async (req, res) => { // add user 

    const {username, password} = req.body
    if(!username || !password) return res.status(400).json({"message":"Missing user or password"});

    const duplicate = await UsersModel.findOne({username});
    if(duplicate) return res.status(409).send("Conflict"); //Conflict

     //Encrypt Password
     const hashedPWD = await bcrypt.hash(req.body.password, 10); 

    const newUser = new UsersModel({
        username: req.body.username,
        password: hashedPWD
    });
    newUser.save((err, user) => {
        if (err) {  
            res.status(500).send(err);
        } else {
            res.status(200).send(user);
        }
    });
}   // end addUser
module.exports = {getAllUsers, addUser};