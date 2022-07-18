const express = require('express');
const bcrypt = require('bcrypt');
const UsersModel = require('../models/Users');

//get user by id
const getUser = (req, res) => {
    const id = req.params.id;
    UsersModel.findById(id, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({user:user});
        }
    });
}


const getAllUsers = (req, res) => { // get all users
    UsersModel.find({}, (err, users) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({users:users});
        }
    });
}   // end getAllUsers

const deleteUser = (req, res) => { // delete user
    const {id} = req.params;
    UsersModel.findByIdAndDelete(id, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({user:user});
        }
    })}   // end deleteUser

    //update user
    const updateUser = async (req, res) => {
        const {id} = req.params;
        const {username, password} = req.body;

     //Encrypt Password
     const hashedPWD = await bcrypt.hash(req.body.password, 10); 

        UsersModel.findByIdAndUpdate(id, {username, hashedPWD}, {new: true}, (err, user) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send({user:user});
            }
        }
        )}   // end updateUser

const addUser = async (req, res) => { // add user 

    const {username, password} = req.body
    if(!username || !password) return res.status(400).json({"message":"Missing user or password"});

    const duplicate = await UsersModel.findOne({username});
    if(duplicate) return res.status(409).json({error:"Conflict"}); //Conflict

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
module.exports = {getAllUsers, addUser, deleteUser, updateUser,getUser};