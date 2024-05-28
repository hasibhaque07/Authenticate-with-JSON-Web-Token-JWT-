const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoHandler = require('./routeHandler/todoHandler');
const userHandler = require('./routeHandler/userHandler');

const app = express();
dotenv.config();
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/todos')
    .then( () => console.log('connection successful'))
    .catch(err => console.log(err));

app.use('/todo', todoHandler);
app.use('/user', userHandler);



const errorHandler = (err, req, res, next) => {
    if(res.headersSent){
        return next(err);
    }
    else{
        res.status(500).json({error: err});
    }
};

app.use(errorHandler);

app.listen(3000, () => {
    console.log('listening on port 3000');
})