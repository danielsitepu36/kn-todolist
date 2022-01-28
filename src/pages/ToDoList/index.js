import React, { useCallback, useState, useEffect } from 'react';
import TodoList from '../../components/ToDoList';
import AxiosTraining from '../../axiosCustom';

function TodolistView() {
  const [todoList, setTodoList] = useState([]);
  const [loadingFetch, setLoadingFetch] = useState(false);

  const fetchAllTask = useCallback(async (isMounted = true) => {
    setLoadingFetch(true);
    try {
      const res = await AxiosTraining.post('/taskreactjs/get');
      console.log(res.data.objData);
      if (isMounted) {
        setTodoList(res.data.objData);
      }
    } catch (err) {
    } finally {
      setLoadingFetch(true);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetchAllTask(isMounted);
    return () => {
      isMounted = false;
    };
  }, [fetchAllTask]);

  return (
    <div className='container'>
      <TodoList
        title='To Do List'
        data={todoList}
        onDelete={() => fetchAllTask()}
      ></TodoList>
    </div>
  );
}

export default TodolistView;
