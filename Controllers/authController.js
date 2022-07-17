const express = require('express');
const bcrypt = require('bcrypt');
const UsersModel = require('../models/Users');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const handleLogin = async (req, res) => {

    const {username, password} = req.body;
    if(!username || !password) return res.status(400).json({"message":"Missing user or password"});

    const user = await UsersModel.findOne({username});
    if(!user) return res.status(404).send("User Not Found"); //Not Found

    //Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(401).send("Wrong Password"); //Unauthorized

    // JWT Token
    // Access Token
    const accessToken = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({accessToken,user});
    

}   // end handleLogin


module.exports = {handleLogin};