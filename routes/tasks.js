const express = require('express');
const app = express();
const router = express.Router();
const functionTasks = require('../models/tasks.js');

router.get('/', (req, res) => {
  res.send('teste');
});

router.delete('/delete/:id', (req, res) => {
  const del = functionTasks.deletTask(req.params.id);
  res.send(`${del}`);
})

router.post('/insert', (req, res) => {
  const funcInsert = functionTasks.insertTask(req.body.tarefa, req.body.data, req.body.comentario);
  res.json(`${funcInsert}`);
})

router.get('/show', (req, res) => {
  res.json(`${functionTasks.showTasks()}`);
})

module.exports = router;