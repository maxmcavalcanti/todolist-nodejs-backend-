const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    id:Number,
    text:String,
    completed:Boolean
});

    
module.exports = mongoose.model('Todo', toDoSchema);