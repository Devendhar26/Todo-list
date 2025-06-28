const express = require('express');
const router = express.Router();
const ToDo = require('../models/ToDo');

// 📥 GET all
router.get('/', async (req, res) => {
  const todos = await ToDo.find().sort({ createdAt: -1 });
  res.json(todos);
});

// ➕ POST new
router.post('/', async (req, res) => {
  const newTodo = new ToDo(req.body);
  const saved = await newTodo.save();
  res.json(saved);
});

// 🔁 PUT update
router.put('/:id', async (req, res) => {
  const updated = await ToDo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// ❌ DELETE
router.delete('/:id', async (req, res) => {
  await ToDo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted successfully.' });
});

module.exports = router;
