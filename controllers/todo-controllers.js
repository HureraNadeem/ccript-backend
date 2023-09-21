const Todos = require('../models/todo-model');
const catchAsync = require('../utils/catchAsync');

const getAllTodos = async (req, res) => {
  const AllTodos = await Todos.find();

  res.status(200).json({
    status: 'success',
    results: AllTodos.length,
    data: AllTodos,
  });
};

const getTodo = async (req, res) => {
  const idFromParam = req.params.id
  const foundTodo = await Todos.findById(idFromParam);

  if (!foundTodo){
    return next(new Error('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: foundTodo
  });
};  

const updateTodo = catchAsync(async (req, res) => {

  const idFromParam = req.params.id

  const { title, status} = req.body
  const updatedData = { title, status }

  const updatedTodo = await Todos.findByIdAndUpdate(idFromParam, updatedData, { new: true, runValidators: true });

  if (!updatedTodo){
    return next(new Error('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: updatedTodo
  });
 
});


const deleteTodo = async (req, res) => {

  const idFromParam = req.params.id

  const updatedTodo = await Todos.findByIdAndDelete(idFromParam);

  if (!updatedTodo){
    return next(new Error('No tour found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
 
};  


const createTodo = catchAsync(async (req, res) => {
  const { title, status } = req.body;

  const newTodo = await Todos.create({
    title,
    status,
  });

  res.status(201).json({
    status: 'success',
    data: {
      ...newTodo
    }["_doc"],
  });
});

module.exports = { getAllTodos, createTodo, getTodo, updateTodo, deleteTodo };
