const path = require('path');
const express = require('express');
const xss = require('xss');
const TodosService = require('./todos-service');

const todosRouter = express.Router();
const jsonParser = express.json();

const serializeTodo = todo => ({
    id: todo.id,
    full_name: xss(todo.full_name),
    day_of_week: todo.day_of_week,
    checked: todo.checked,
});

todosRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    TodosService.getAllTodos(knexInstance)
      .then(todos => {
        res.json(todos.map(serializeTodo))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { fullName, day_of_week } = req.body
    const newTodo = { fullName, day_of_week }

    for (const [key, value] of Object.entries(newTodo))
        if (value == null)
            return res.status(400).json({
            error: { message: `Missing '${key}' in request body` }
            });

    TodosService.insertTodo(
      req.app.get('db'),
      newTodo
    )
      .then(todo => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${todo.id}`))
          .json(serializeTodo(todo))
      })
      .catch(next)
  })

todosRouter
  .route('/:todo_id')
  .all((req, res, next) => {
    TodosService.getById(
      req.app.get('db'),
      req.params.todo_id
    )
      .then(todo => {
        if (!todo) {
          return res.status(404).json({
            error: { message: `todo doesn't exist` }
          })
        }
        res.todo = todo
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeTodo(res.todo))
  })
  .delete((req, res, next) => {
    TodosService.deleteTodo(
      req.app.get('db'),
      req.params.todo_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { fullName, day_of_week } = req.body
    const todoToUpdate = { fullName, day_of_week }

    const numberOfValues = Object.values(todoToUpdate).filter(Boolean).length
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Request body must contain 'fullName', or 'day_of_week'`
        }
      })
    }
    
    TodosService.updateTodo(
        req.app.get('db'),
        req.params.todo_id,
        todoToUpdate
      )
        .then(numRowsAffected => {
          res.status(204).end()
        })
        .catch(next)
  })
      
    
module.exports = todosRouter