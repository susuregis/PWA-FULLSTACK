import React from 'react';

const Task = ({ task, onToggle, onDelete }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.description}
      </span>
      <div>
        <button onClick={() => onToggle(task._id)} style={{ marginRight: '10px' }}>
          {task.completed ? 'Desmarcar' : 'Completar'}
        </button>
        <button onClick={() => onDelete(task._id)}>Excluir</button>
      </div>
    </div>
  );
};

export default Task;
