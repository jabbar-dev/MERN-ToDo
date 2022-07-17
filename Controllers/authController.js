const express = require('express');
const bcrypt = require('bcrypt');
const UsersModel = require('../models/Users');

const handleLogin = async (req, res) => {

    const {username, password} = req.body;
    if(!username || !password) return res.status(400).json({"message":"Missing user or password"});

    const user = await UsersModel.findOne({username});
    if(!user) return res.status(404).send("User Not Found"); //Not Found

    //Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(401).send("Wrong Password"); //Unauthorized
    res.status(200).send(user);
}   // end handleLogin


module.exports = {handleLogin};