import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select from 'react-select';
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

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

function FormToDoList() {
  const { id } = useParams();

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      author: '',
      category: null,
      description: '',
      deadline: ''
    }
  });
  const onSubmit = (data) => {
    const finalData = {
      ...data,
      category: data.category.value
    };
    console.log(finalData);
  };
  return (
    <div className="container">
      <h1>{`${id !== 'new' ? 'Edit' : 'Create'}`} Todo</h1>
      <div className="d-flex flex-column gap-4">
        <div>
          <FormInput
            errors={errors}
            name="title"
            formTitle="Title"
            register={register}
            placeholder="Enter title"
            className="form-control"
          ></FormInput>
        </div>
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
          <div>Category</div>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select {...field} placeholder="Category" options={options} />
            )}
          />
          {errors.category && (
            <small className="text-danger">{errors.category.message}</small>
          )}
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
            type="datetime-local"
          ></FormInput>
        </div>
        <div>
          <button className="btn btn-danger me-3" onClick={() => reset()}>
            Reset
          </button>
          <button className="btn btn-primary" onClick={handleSubmit(onSubmit)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormToDoList;
