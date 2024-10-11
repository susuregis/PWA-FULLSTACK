const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./task');

const app = express();
app.use(cors());
app.use(express.json());


// Conectar ao MongoDB
mongoose.connect('mongodb+srv://susuregisestudo:RhweSkhJfiR4Phbk@cluster0.eevoq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  

.then(() => console.log('Conectado ao MongoDB Atlas'))
.catch(err => console.log('Erro ao conectar ao MongoDB Atlas:', err));

// Rotas
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  const { description } = req.body;
  const newTask = new Task({ description });
  await newTask.save();
  res.json(newTask);
});

app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const updatedTask = await Task.findByIdAndUpdate(id, { completed }, { new: true });
  res.json(updatedTask);
});

app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.json({ message: 'Tarefa removida' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
