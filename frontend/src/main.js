import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './task';

const Main = () => { 
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return; // Evita adicionar tarefa vazia
    try {
      const response = await axios.post('http://localhost:3000/api/tasks', { description: newTask });
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  const toggleTask = async (id) => {
    const task = tasks.find(t => t._id === id);
    try {
      const response = await axios.put(`http://localhost:3000/api/tasks/${id}`, { completed: !task.completed });
      setTasks(tasks.map(t => (t._id === id ? response.data : t)));
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista de Tarefas</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Adicionar nova tarefa"
      />
      <button onClick={addTask}>Adicionar</button>
      <div style={{ marginTop: '20px' }}>
        {tasks.map(task => (
          <Task key={task._id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
        ))}
      </div>
    </div>
  );
};

export default Main; 
