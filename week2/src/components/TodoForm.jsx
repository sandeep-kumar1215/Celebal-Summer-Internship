import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const TodoForm = ({ 
  onSubmit, 
  initialTask = '', 
  initialDueDate = '', 
  buttonText = 'Add Task',
  formTitle = 'Add a new task'
}) => {
  const [task, setTask] = useState(initialTask);
  const [dueDate, setDueDate] = useState(initialDueDate);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!task.trim()) {
      setError('Task cannot be empty.');
      return;
    }
    
    if (task.length > 100) {
      setError('Task cannot exceed 100 characters.');
      return;
    }
    
    setError('');
    onSubmit(task, dueDate);
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <h3>{formTitle}</h3>
      <div className="form-group">
        <label htmlFor="task-input">Task Description</label>
        <input
          id="task-input"
          type="text"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
            setError('');
          }}
          className="todo-input"
          placeholder="Enter task..."
          aria-label="Task description"
          maxLength="100"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="due-date">Due Date (optional)</label>
        <input
          id="due-date"
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="todo-input"
          aria-label="Due date and time"
        />
      </div>
      
      {error && <p className="error-message" role="alert">{error}</p>}
      
      <button type="submit" className="todo-btn">
        {buttonText}
      </button>
    </form>
  );
};

TodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialTask: PropTypes.string,
  initialDueDate: PropTypes.string,
  buttonText: PropTypes.string,
  formTitle: PropTypes.string
};