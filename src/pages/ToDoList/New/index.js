import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { GLOBAL_URL } from '../../../global';
import FormInput from '../../../components/FormInput';

const schema = yup
  .object({
    title: yup.string().required('Title is required'),
    author: yup.string().required('Author is required'),
    category: yup.mixed().required('Category is required'),
    description: yup.string(),
    deadline: yup.string().required('Date is required')
  })
  .required();

function FormToDoList() {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => console.log(data);
  return (
    <div className="container">
      <h1>{`${id !== 'new' ? 'Edit' : 'Create'}`} Todo</h1>
      <div className="d-flex flex-column gap-4">
        <FormInput
          errors={errors}
          name="title"
          formTitle="Title"
          register={register}
          placeholder="Enter title"
          className="form-control"
        ></FormInput>
        <div>
          <FormInput
            errors={errors}
            name="author"
            formTitle="Author"
            register={register}
            placeholder="Enter author"
            className="form-control"
          ></FormInput>
        </div>{' '}
        <div>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter category"
            id="category"
          ></input>
        </div>{' '}
        <div>
          <FormInput
            errors={errors}
            name="description"
            formTitle="Description"
            register={register}
            placeholder="Enter description"
            className="form-control"
          ></FormInput>
        </div>{' '}
        <div>
          <FormInput
            errors={errors}
            name="deadline"
            formTitle="Deadline"
            register={register}
            placeholder="Enter deadline"
            className="form-control"
          ></FormInput>
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
