import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import TodoList from '../../components/ToDoList';

function Home() {
  const [count, setCount] = useState(0);

  // const [backgroundColor, setBackgroundColor] = useState('#000000');

  const [todoList, setTodoList] = useState([]);

  // const { search } = useLocation();

  useEffect(() => {
    console.log('render');
  }, []);

  // trigger first mount only

  // useEffect(() => {
  //   console.log('rerender trigger');
  // });

  // useEffect(() => {
  //   console.log('count changed');
  // }, [count, backgroundColor]);

  // const changeBackground = useCallback(() => {
  //   console.log(backgroundColor);
  //   for (let i = 0; i < 10000000000000; i++) {}
  //   setBackgroundColor('yellow');
  // }, [backgroundColor]);

  // const countChanged = useCallback(() => {
  //   console.log(count);
  // }, [count]);

  // useEffect(() => {
  //   console.log('trigger pagination', search);
  // }, [search]);

  // trigger if dependency changes

  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
  };
  return (
    <div>
      {/* <h1>Home</h1> */}
      {/* <button type="button" onClick={handleClick}>
        Increment count
      </button> */}
      {/* <div
        style={{
          width: '2em',
          height: '2em',
          background: backgroundColor,
          margin: '2em'
        }}
      ></div>
      <button type="button" onClick={changeBackground}>
        Change Background
      </button> */}
      {/* <h1>This is current count: {count}</h1> */}
      Home
    </div>
  );
}

export default Home;
