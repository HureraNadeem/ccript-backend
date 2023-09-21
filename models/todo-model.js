const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter the title for the TODO task.'],
    },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
  },
  {
    validateBeforeSave: true,
  },
  {
    collection: 'todos',
  }
);

todoSchema.set('timestamps', true);

const TodosModel = mongoose.model('Todos', todoSchema);

module.exports = TodosModel;
