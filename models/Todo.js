const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodoSchema = new Schema({
  name: {
    type: String,
    required: 'Name cannot be blank!'
  },
  done: {
    type: Boolean,
    default: false
  },
  created: {
    type: String,
    default: ''
  },
  edited: {
    type: String,
    default: ''
  },
  owner: {
    type: Object,
    required: true
  },
  teamMembers: [
    {
      email: {
        type: String
      },
      name: {
        type: String
      }
    }
  ],
});

module.exports = Todo = mongoose.model('todos', TodoSchema);
