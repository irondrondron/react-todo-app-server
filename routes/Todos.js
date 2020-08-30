const express = require('express');
const todos = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');

const Todo = require('../models/Todo');

todos.use(cors());

process.env.SECRET_KEY = 'secret';

todos.post('/createtodo', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  let decoded = jwt.verify(token, process.env.SECRET_KEY);
  console.log(decoded, process.env.SECRET_KEY);
  console.log(req.body);
  const todoData = {
    user_id: decoded.id,
    text: req.body.text,
    complete: req.body.complete,
  };
  Todo.findOne({
    where: { text: req.body.text },
  })
    .then((todo) => {
      if (!todo) {
        Todo.create(todoData).then((Todo) => {
          res.json();
        });
      }
    })
    .catch((err) => {
      res.send('error: ' + err);
    });
});

todos.post('/readalltodo', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  // jwt.verify(token)
  let decoded = jwt.verify(token, process.env.SECRET_KEY);
  console.log(decoded, process.env.SECRET_KEY);
  // console.log(decoded);
  Todo.findAll({
    where: { user_id: decoded.id },
  })
    .then((todos) => {
      if (todos) {
        res.json(todos);
      }
    })
    .catch((err) => {
      res.send('error: ' + err);
      // res.status(400).json({
      //   error: err,
      // });
    });
});

todos.post('/updatetodo', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  console.log(decoded, process.env.SECRET_KEY);
console.log(req.body.id);
  Todo.update(
    {
      complete: req.body.complete,
    },
    {
      where: {
        user_id: decoded.id,
        id: req.body.id,
      },
    }
  )

    .then(() => {
      res.json();
    })
    .catch((err) => {
      res.send('error: ' + err);
    });
});

todos.post('/deletetodo', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  console.log(decoded, process.env.SECRET_KEY);

  Todo.destroy({ where: { user_id: decoded.id, id: req.body.id } })
    .then(() => {
      res.json();
    })
    .catch((err) => {
      res.send('error: ' + err);
    });
});

module.exports = todos;
