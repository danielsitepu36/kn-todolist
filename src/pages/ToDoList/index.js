import React from 'react';
import { useState } from 'react/cjs/react.development';
import TodoList from '../../components/ToDoList';

function TodolistView() {
  const [todoList, setTodoList] = useState([]);
  return (
    <div className='container'>
      <TodoList title="Todo" data={todoList}></TodoList>
    </div>
  );
}

export default TodolistView;
