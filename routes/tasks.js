const express = require('express');
const app = express();
const router = express.Router();
const functionTasks = require('../models/tasks.js');

router.get('/tasks', async (req, res) => {
  res.json('teste');
});

router.delete('/delete/:id', async (req, res) => {
  const del = await functionTasks.deletTask(req.params.id);
  res.json({ message: del });
});

router.post('/insert', async (req, res) => {
  const funcInsert = await functionTasks.insertTask(
    req.body.tarefa,
    req.body.comentario,
  );
  res.redirect('/tasks');
});

router.get('/show', async (req, res) => {
  const tasks = await functionTasks.showTasks();
  res.json(tasks);
});

router.put('/update/:id', async (req, res) => {
  const up = await functionTasks.updateTask(
    req.params.id,
    req.body.tarefa,
    req.body.comentario,
  );
  res.json({ message: up });
});

router.get('/deleted', async (req, res) => {
  const erased = await functionTasks.showDeleted();
  res.json(erased);
});

router.post('/ready/:id', async (req, res) => {
  const final = await functionTasks.ready(req.params.id, req.body.status);
  res.json({ message: final });
});

module.exports = router;
