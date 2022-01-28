import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function FormToDoList() {
  //   const [title, setTitle] = useState('');
  //   const [title, setTitle] = useState('');
  //   const [title, setTitle] = useState('');
  //   const [title, setTitle] = useState('');

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="container">
      <h1>{`${id !== 'new' ? 'Edit' : 'Create'}`} Todo</h1>
      <div className="d-flex flex-column gap-4">
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter title"
            id="title"
          />
        </div>
        <div>
          <label htmlFor="title">Author</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter author"
            id="title"
            // value={author}
            // onChange={({target : {value}} => {
            //     setS
            // })}
          ></input>
        </div>{' '}
        <div>
          <label htmlFor="title">Category</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter category"
            id="title"
          ></input>
        </div>{' '}
        <div>
          <label htmlFor="title">Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter description"
            id="title"
          ></input>
        </div>{' '}
        <div>
          <label htmlFor="title">Deadline</label>
          <input
            type="datetime-local"
            className="form-control"
            placeholder="Enter title"
            id="title"
          ></input>
        </div>
        <div>
          <button className="btn btn-primary" onClick={() => onSubmit()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormToDoList;
