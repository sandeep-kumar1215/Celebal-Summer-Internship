import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { format, parseISO, isBefore } from 'date-fns';

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  const isOverdue = task.dueDate && !task.completed && isBefore(parseISO(task.dueDate), new Date());
  
  return (
    <div className={`Todo ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-content" onClick={() => toggleComplete(task.id)}>
        <p className="task-text">{task.task}</p>
        {task.dueDate && (
          <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
            <FontAwesomeIcon icon={faCalendar} />
            {format(parseISO(task.dueDate), 'MMM dd, yyyy @ h:mm a')}
            {isOverdue && <span className="overdue-badge">Overdue</span>}
          </span>
        )}
      </div>
      
      <div className="task-actions">
        <button 
          className="icon-btn edit-btn"
          onClick={() => editTodo(task.id)}
          aria-label={`Edit task: ${task.task}`}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        
        <button 
          className="icon-btn delete-btn"
          onClick={() => deleteTodo(task.id)}
          aria-label={`Delete task: ${task.task}`}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

Todo.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    dueDate: PropTypes.string,
    isEditing: PropTypes.bool
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  toggleComplete: PropTypes.func.isRequired
};