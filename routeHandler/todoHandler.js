const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');
const checkLogin = require('../middlewares/checkLogin');

const Todo = new mongoose.model('Todo', todoSchema);

router.get('/active', async(req, res) => {
    try {
        const todo = new Todo();
        const data = await todo.findActive();
        res.status(201).json({ data: data });
    } catch (err) {
        
        res.status(500).json({ error: 'There was a server side error' });
    }
});

router.get('/js', async(req, res) => {
    
    try {
        const data = await Todo.findByJS();
        res.status(201).json({ data: data });
    } catch (err) {
        res.status(500).json({ error: 'There was a server side error' });
    }
});

router.get('/language', async(req, res) => {
    
    try {
        const data = await Todo.find().byLanguage('react');
        res.status(201).json({ data: data });
    } catch (err) {
        res.status(500).json({ error: 'There was a server side error' });
    }
});

router.get('/', checkLogin, async(req, res) => {
    try{
        // const result = await Todo.find({status: 'active'});
        const result = await Todo.find({status: 'active'}) // if we want to show specific info
            .select({
                _id: 0,
                date: 0,
            });
        
        res.status(200).json({
             result: result,
             message: 'Todo was found successfully' 
        });
    } catch (err) {
        res.status(500).json({ error: 'There was a server side error' });
    }

});

// not async
// router.get('/', (req, res) => {
    
//         // const result = await Todo.find({status: 'active'});
//         Todo.find({status: 'active'}) // if we want to show specific info
//             .select({
//                 _id: 0,
//                 date: 0,
//             })
//             .exec((err, data) => {
//                 if(err){
//                     res.status(500).json({ error: 'There was a server side error' });
//                 }
//                 else{
//                     res.status(200).json({
//                         result: data,
//                         message: 'Todo was found successfully' 
//                    });
//                 }

//             })
        
    

// });

router.get('/:id', async(req, res) => {
    try{
        // const result = await Todo.find({_id: req.params.id});
        const result = await Todo.find({_id: req.params.id}) // if we want to show specific info
            .select({
                _id: 0,
                date: 0,
            });
        
        res.status(200).json({
             result: result,
             message: 'Todo was found successfully' 
        });
    } catch (err) {
        res.status(500).json({ error: 'There was a server side error' });
    }
    
});

// router.post('/', async(req, res) => {
//     const newTodo = new Todo(req.body);
//     await newTodo.save((err) => {
//         if(err){
//             res.status(500).json({
//                 error: 'there was a server side error',
//             });
//         }
//         else{
//             res.send(200).json({
//                 message: 'Todo was inserted successfully',
//             });
//         }
//     })
// });

router.post('/', async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        await newTodo.save();
        res.status(201).json({ message: 'Todo was inserted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'There was a server side error' });
    }
});
router.post('/all', async(req, res) => {
    try{
        await Todo.insertMany(req.body);
        res.status(200).json({message: 'Todos were inserted successfully'});
    } catch (err) {
        res.status(500).json({ error: 'There was a server side error'});
    }
    
});
router.put('/:id', async(req, res) => {
    try{
        //only update
        await Todo.updateOne(
            {_id: req.params.id},
            {
                $set: {
                    status: 'active',
                },
            }
        );

        //update and see the updated todo
        // const result = await Todo.findByIdAndUpdate(
        //     {_id: req.params.id},
        //     {
        //         $set: {
        //             status: 'active',
        //         },
        //     },
        //     {
        //         new: true,
        //     },
        // );
        // console.log(result);
        
        res.status(200).json({message: 'Todo was updated successfully'});
        
    } catch (err) {
        res.status(500).json({ error: 'There was a serverside error'})
    }
    
});
router.delete('/:id', async(req, res) => {
    try{
        await Todo.deleteOne({_id: req.params.id}) 
        res.status(200).json({ message: 'Todo was deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'There was a server side error' });
    }
});

module.exports = router;