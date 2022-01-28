import React from 'react';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import qs from 'qs';
import CustomInput from '../../../components/FormInput';
import AxiosTraining from '../../../axiosCustom';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveUser } from '../../../stores/authentication';

const schema = yup.object().shape({
  intUserId: yup.number().required(),
  txtUsername: yup.string().required('Username belum diisi'),
  txtEmail: yup
    .string()
    .email('Email harus valid')
    .required('Email belum diisi'),
  txtFullname: yup.string().required('Full Name belum diisi'),
  txtPassword: yup.string().required('Password belum diisi'),
});
function Register() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      txtUsername: '',
      txtPassword: '',
      intUserId: 0,
      txtEmail: '',
      txtFullname: '',
    },
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = async ({
    txtUsername,
    txtPassword,
    intUserId,
    txtEmail,
    txtFullname,
  }) => {
    const finalData = {
      txtEmail,
      txtUsername,
      txtPassword,
      intUserId,
      txtFullname,
      bitActive: true,
      txtCreatedBy: '1',
      txtUpdatedBy: null,
      dtmCreatedDate: new Date().toISOString(),
    };

    try {
      const {
        data: { bitSuccess },
      } = await AxiosTraining.post('/user/savedata', {
        objRequestData: finalData,
      });
      if (bitSuccess) {
        const loginData = qs.stringify({
          username: txtUsername,
          password: txtPassword,
          grant_type: 'password',
        });
        const { data: dataResponseLogin } = await AxiosTraining.post(
          '/login',
          loginData
        );
        if (dataResponseLogin.access_token) {
          dispatch(
            saveUser({
              txtUsername,
            })
          );
          localStorage.setItem(
            'reactData',
            JSON.stringify({
              access_token: dataResponseLogin.access_token,
              expires_in: dataResponseLogin.expires_in,
              txtUsername,
            })
          );
          Swal.fire({
            icon: 'success',
            title: 'Berhasil Login',
            text: 'Mengalihkan halaman...',
            timer: 1000,
          });
          history.push('/home');
        }
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Register',
        text: 'Server error',
      });
    } finally {
    }
  };
  return (
    <div className='h-100 w-100 bg-primary p-5 d-flex flex-column justify-content-center'>
      <div className='card p-5 w-50 m-auto'>
        <div className='text-center mb-4'>
          <h1>KN-ToDoList</h1>
          <h2>Login</h2>
        </div>
        <form
          className='d-flex flex-column gap-3'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className=''>
              <CustomInput
                className='form-control'
                placeholder='Username'
                formTitle='Username'
                register={register}
                name='txtUsername'
                errors={formState.errors}
              />
            </div>
          </div>

          <div>
            <div className=''>
              <CustomInput
                className='form-control'
                placeholder='Full Name'
                formTitle='Full Name'
                register={register}
                name='txtFullname'
                errors={formState.errors}
              />
            </div>
          </div>
          <div>
            <div className=''>
              <CustomInput
                className='form-control'
                placeholder='Email'
                register={register}
                name='txtEmail'
                formTitle='Email'
                type='email'
                errors={formState.errors}
              />
            </div>
          </div>
          <div>
            <div className=''>
              <CustomInput
                className='form-control'
                placeholder='Password'
                register={register}
                name='txtPassword'
                formTitle='Password'
                type='password'
                errors={formState.errors}
              />
            </div>
          </div>
          <div>
            Already have an account?{' '}
            <Link to='/login'>
              <strong>Login</strong>
            </Link>
          </div>
          <div>
            <button
              className='btn btn-primary'
              // onClick={() => handleSubmit(onSubmit)()}
              type='submit'
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
