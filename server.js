const express = require('express');
const app = express();
const usersRoute = require('./routes/api/users');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const auth = require('./routes/api/auth');
require('dotenv').config();

//Connect to MongoDB ATLAS
mongoose.connect(process.env.MONGO_URL,
    {useNewUrlParser:true}
    
    ).then(()=>{
        console.log("Connected to MongoDB Atlas")
    }).catch(()=>{
    
        console.log("Something Wrong With Database Connection")
    
    })

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.get('/', (req, res) => {
    res.send("Hello World to New App");
})

app.use('/api/users', usersRoute);
app.use('/login', auth);

app.listen(4000, () => console.log('listening on port 4000'));

module.exports = app;