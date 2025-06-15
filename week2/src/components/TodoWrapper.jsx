import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format, parseISO, isBefore } from 'date-fns';
import { Todo } from './Todo';
import { TodoForm } from './TodoForm';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export const TodoWrapper = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [sortCriteria, setSortCriteria] = useState('date-created');
  const [filterCriteria, setFilterCriteria] = useState('all');
  const [editingId, setEditingId] = useState(null);

  const addTodo = useCallback((task, dueDate) => {
    const newTodo = { 
      id: uuidv4(), 
      task, 
      completed: false, 
      dueDate,
      createdAt: new Date().toISOString()
    };
    setTodos(prev => [...prev, newTodo]);
  }, [setTodos]);

  const toggleComplete = useCallback((id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, [setTodos]);

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, [setTodos]);

  const editTodo = useCallback((id) => {
    setEditingId(id);
  }, []);

  const updateTodo = useCallback((task, dueDate) => {
    setTodos(prev => prev.map(todo => 
      todo.id === editingId 
        ? { ...todo, task, dueDate } 
        : todo
    ));
    setEditingId(null);
  }, [editingId, setTodos]);

  const sortTodos = useCallback((todos, criteria) => {
    const now = new Date();
    return [...todos].sort((a, b) => {
      switch (criteria) {
        case 'name':
          return a.task.localeCompare(b.task);
        case 'date-created':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'date-due':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'completed':
          return (a.completed === b.completed) ? 0 : a.completed ? 1 : -1;
        case 'priority':
          return (a.priority || 'medium').localeCompare(b.priority || 'medium');
        default:
          return 0;
      }
    });
  }, []);

  const filterTodos = useCallback((todos, criteria) => {
    const now = new Date();
    switch (criteria) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'incomplete':
        return todos.filter(todo => !todo.completed);
      case 'overdue':
        return todos.filter(todo => 
          !todo.completed && 
          todo.dueDate && 
          isBefore(parseISO(todo.dueDate), now)
        );
      case 'upcoming':
        return todos.filter(todo => 
          !todo.completed && 
          todo.dueDate && 
          !isBefore(parseISO(todo.dueDate), now)
        );
      default:
        return todos;
    }
  }, []);

  const sortedFilteredTodos = useMemo(() => {
    const filtered = filterTodos(todos, filterCriteria);
    return sortTodos(filtered, sortCriteria);
  }, [todos, sortCriteria, filterCriteria, sortTodos, filterTodos]);

  const editingTodo = useMemo(() => 
    todos.find(todo => todo.id === editingId),
  [todos, editingId]);

  return (
    <div className="TodoWrapper">
      <header>
        <h1>Get Things Done!</h1>
        <p className="subtitle">Your productive todo app</p>
      </header>

      {editingId ? (
        <TodoForm
          onSubmit={updateTodo}
          initialTask={editingTodo?.task || ''}
          initialDueDate={editingTodo?.dueDate || ''}
          buttonText="Update Task"
          formTitle="Edit Task"
        />
      ) : (
        <TodoForm onSubmit={addTodo} />
      )}

      <div className="controls">
        <div className="control-group">
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
          >
            <option value="date-created">Creation Date</option>
            <option value="date-due">Due Date</option>
            <option value="name">Name</option>
            <option value="completed">Completion Status</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="filter">Filter by:</label>
          <select
            id="filter"
            value={filterCriteria}
            onChange={(e) => setFilterCriteria(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
            <option value="overdue">Overdue</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>
      </div>

      <div className="TodoList">
        {sortedFilteredTodos.length > 0 ? (
          sortedFilteredTodos.map((todo) => (
            <Todo
              key={todo.id}
              task={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          ))
        ) : (
          <p className="no-tasks">
            {filterCriteria === 'all' 
              ? 'No tasks yet. Add one above!' 
              : `No ${filterCriteria} tasks found`}
          </p>
        )}
      </div>

      <div className="stats">
        <p>Total: {todos.length} | Completed: {todos.filter(t => t.completed).length}</p>
      </div>
    </div>
  );
};