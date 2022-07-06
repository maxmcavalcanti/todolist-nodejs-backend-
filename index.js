require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;
const cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: true }));

//Config Json Response
app.use(express.json());

//Config CORS

//Config CORS
app.use(
  cors()
);

//API Routes
const listRoutes = require('./routes/listRoutes');


app.use('/', listRoutes);
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
//Inital Route
app.get('/home', (req,res) => {
  res.json({message: 'Welcome to the Todo API'});
} )



//Conectando na API
mongoose
  .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@todolist.25yu8.mongodb.net/todolist`)
  .then(() => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    })
  })
  .catch(err => {
    console.log(err);
  })




