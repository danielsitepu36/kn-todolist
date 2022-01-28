import React from 'react';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import CustomInput from '../../../components/FormInput';

const schema = yup.object().shape({
  intUserId: yup.number().required(),
  txtUsername: yup.string().required('Username belum diisi'),
  txtEmail: yup
    .string()
    .email('Email harus valid')
    .required('Email belum diisi'),
  txtFullname: yup.string().required('Full Name belum diisi'),
  txtPassword: yup.string().required('Password belum diisi')
});
function Register() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      txtUsername: '',
      txtPassword: '',
      intUserId: 0,
      txtEmail: '',
      txtFullname: ''
    }
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="h-100 w-100 bg-primary p-5 d-flex flex-column justify-content-center">
      <div className="card p-5 w-50 m-auto">
        <div className="text-center mb-4">
          <h1>KN-ToDoList</h1>
          <h2>Login</h2>
        </div>
        <form
          className="d-flex flex-column gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="">
              <CustomInput
                className="form-control"
                placeholder="Username"
                formTitle="Username"
                register={register}
                name="txtUsername"
                errors={formState.errors}
              />
            </div>
          </div>

          <div>
            <div className="">
              <CustomInput
                className="form-control"
                placeholder="Full Name"
                formTitle="Full Name"
                register={register}
                name="txtFullname"
                errors={formState.errors}
              />
            </div>
          </div>
          <div>
            <div className="">
              <CustomInput
                className="form-control"
                placeholder="Email"
                register={register}
                name="txtEmail"
                formTitle="Email"
                type="email"
                errors={formState.errors}
              />
            </div>
          </div>
          <div>
            <div className="">
              <CustomInput
                className="form-control"
                placeholder="Password"
                register={register}
                name="txtPassword"
                formTitle="Password"
                type="password"
                errors={formState.errors}
              />
            </div>
          </div>
          <div>
            Already have an account?{' '}
            <Link to="/login">
              <strong>Login</strong>
            </Link>
          </div>
          <div>
            <button
              className="btn btn-primary"
              // onClick={() => handleSubmit(onSubmit)()}
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
