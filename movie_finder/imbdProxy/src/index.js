const express = require('express');
const cors = require('cors');
const controller = require('./controllers/controller.js');
const app = express();
const createError = require('http-errors')    

const PORT = 3001;

app.use(express.json()); 
app.use(cors());

app.use('/', controller);      

app.use((req, res, next)=> {
  return next(new createError.BadRequest('Not found'))
})

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500);
  res.json({
    hasError: true,
    message: err.message
  })
})

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});