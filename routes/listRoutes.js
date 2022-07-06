const express = require('express');
const router = express.Router();
const toDoSchema = require('../models/todoSchema');

router.post('/', async (req, res) => {
  //Post Body Requisition  
  const {id, text, completed} = req.body;

  if(!text){
    return res.status(400).json({message: 'Text is required'});
  }
  const task = {
    id,
    text,
    completed
  };

  //Create a new task
  try {
    const newTask = await toDoSchema.create(task);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.get('/', async (req,res) =>{
  //Get all tasks
  try {
    const tasks = await toDoSchema.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
})

router.put('/:id', async (req, res) => {
  //Put Body Requisition
  const {id} = req.params;
  const {text, completed} = req.body;

  if(!text){
    return res.status(400).json({message: 'Text is required'});
  }
  const task = {
    _id: id,
    text,
    completed
  };
  //Update a task
  try {
    const updatedTask = await toDoSchema.findByIdAndUpdate(id, task)
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});


router.delete('/:id', async (req,res) =>{
  //Delete a task
  const {id} = req.params;
  try {
    const deletedTask = await toDoSchema.findByIdAndDelete(id);
    res.status(200).json(deletedTask);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

module.exports = router