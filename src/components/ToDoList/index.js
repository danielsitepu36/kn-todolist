import React from 'react';

function TodoList({ title }) {
  return (
    <div>
      <h1>{title}</h1>
      <table className="table">
        <thead>
          <tr>
            <td>ID</td>
            <td>Author</td>
            <td>Deadline</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;
