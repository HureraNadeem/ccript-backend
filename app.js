const express = require('express');
const todoRouter = require("./routes/todo-routes");
const globalErrorHandler = require('./controllers/error-controller');


// Middlewares

// Libraries imports
const morgan = require('morgan');
const cors = require('cors');


const app = express();
app.use(morgan('dev'));

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

app.use('/api/v1/todo', todoRouter);


app.all('*', (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on this server!`, 404));
});


app.use(globalErrorHandler);


module.exports = app;