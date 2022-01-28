import React from 'react';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import CustomInput from '../../../components/FormInput';

const schema = yup.object().shape({
  txtUsername: yup.string().required('Username belum diisi'),
  txtPassword: yup.string().required('Password belum diisi')
});
function Login() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      txtUsername: '',
      txtPassword: ''
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
                register={register}
                formTitle="Username"
                name="txtUsername"
                errors={formState.errors}
              />
            </div>
          </div>
          {/* <div>
          <div>Password</div>
          <input
            type="password"
            placeholder="password"
            {...register('txtPassword')}
          />
        </div> */}
          <div>
            <div className="">
              <CustomInput
                className="form-control"
                placeholder="Password"
                register={register}
                formTitle="Password"
                name="txtPassword"
                errors={formState.errors}
              />
            </div>
          </div>
          <div>
            Don't have an account?{' '}
            <Link to="/register">
              <strong>Register</strong>
            </Link>
          </div>
          <div>
            <button
              className="btn btn-primary"
              // onClick={() => handleSubmit(onSubmit)()}
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
