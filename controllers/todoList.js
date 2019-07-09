const TodoList = require('../mongodb/models/todoList')

exports.getTodoList = (req, res, next) => {
  TodoList.find()
}
