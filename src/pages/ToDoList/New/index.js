import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select from 'react-select';
import FormInput from '../../../components/FormInput';
import AxiosTraining from '../../../axiosCustom';

const schema = yup.object().shape({
  intTaskId: yup.number().required(),
  title: yup.string().required('Title is required'),
  category: yup.mixed().required('Category is required'),
  pic: yup.string().required('PIC is required'),
  description: yup.string('Description is required'),
  deadline: yup.string().required('Deadline is required'),
});

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

function FormToDoList() {
  const { id } = useParams();
  const history = useHistory();
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadFetch, setLoadFetch] = useState(true);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const {
    register,
    handleSubmit,
    formState,
    control,
    errors,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      category: null,
      pic: '',
      description: '',
      deadline: '',
      intTaskId: 0,
    },
  });

  const fetchTaskData = useCallback(
    async (isMounted = true, category) => {
      if (id !== 'new') {
        setLoadFetch(true);
        try {
          const {
            data: { objData },
          } = await AxiosTraining.post(`/taskreactjs/get/${id}`);
          console.log(objData);
          if (isMounted) {
            const taskData = objData[0];
            setValue('intTaskId', taskData.intTaskId);
            setValue('intCategoryId', taskData.intCategoryId);
            setValue('title', taskData.txtTitle);
            setValue('description', taskData.txtDescription);
            setValue('deadline', taskData.dtmDeadline);
            setValue('pic', taskData.txtDummyPIC);
            setValue(
              'category',
              category.find((p) => p.intCategoryId === taskData.intCategoryId)
            );
          }
        } catch (err) {
        } finally {
          setLoadFetch(false);
        }
      } else {
        setValue(
          'pic',
          JSON.parse(localStorage.getItem('reactData')).txtUsername
        );
        setLoadFetch(false);
      }
    },
    [id, setValue]
  );

  const fetchAllCategory = useCallback(async (isMounted = true) => {
    try {
      const {
        data: { objData },
      } = await AxiosTraining.post('/categoryreactjs/getall');
      console.log(objData);
      if (isMounted) {
        return objData;
      }
    } catch (err) {
      throw new Error(
        err.response?.data?.message || 'Failed to fetch category'
      );
    } finally {
    }
  }, []);

  const fetchAll = useCallback(
    async (isMounted) => {
      const category = await fetchAllCategory(isMounted);
      setCategoryOptions(category);
      fetchTaskData(isMounted, category);
    },
    [fetchAllCategory, fetchTaskData]
  );

  useEffect(() => {
    let isMounted = true;
    fetchAll(isMounted);
    return () => {
      isMounted = false;
    };
  }, [fetchAll]);

  const onSubmit = async (data) => {
    setLoadingSave(true);
    const finalData = {
      intTaskId: data.intTaskId,
      txtTitle: data.title,
      txtDescription: data.description,
      txtDummyPIC: data.pic,
      dtmDeadline: data.deadline,
      intCategoryId: data.category.intCategoryId,
      intUserId: 24,
    };
    try {
      await AxiosTraining.post('/taskreactjs/savedata', {
        objRequestData: finalData,
      });
      history.push('/task');
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingSave(false);
    }
  };
  return (
    <div className='container'>
      <h1>{`${id !== 'new' ? 'Edit' : 'Create'}`} Todo</h1>
      <div className='d-flex flex-column gap-4'>
        <div>
          <FormInput
            errors={formState.errors.title}
            name='title'
            formTitle='Title'
            register={register}
            placeholder='Enter title'
            className='form-control'
          ></FormInput>
        </div>
        <div>
          <FormInput
            // errors={errors}
            name='pic'
            disabled
            formTitle='Author'
            register={register}
            placeholder='Enter author'
            className='form-control'
          ></FormInput>
        </div>{' '}
        <div>
          <div>Category</div>
          <Controller
            name='category'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder='Category'
                options={categoryOptions}
                // optionLabel="txtTitle"
                // optionValue='intCategoryId'
                isLoading={loadFetch}
                getOptionLabel={(options) => options.txtTitle}
                getOptionValue={(options) => options.intCategoryId}
              />
            )}
          />
          {/* {errors.category && (
            <small className='text-danger'>{errors.category.message}</small>
          )} */}
        </div>{' '}
        <div>
          <FormInput
            // errors={errors}
            name='description'
            formTitle='Description'
            register={register}
            placeholder='Enter description'
            className='form-control'
          ></FormInput>
        </div>{' '}
        <div>
          <FormInput
            // errors={errors}
            name='deadline'
            formTitle='Deadline'
            register={register}
            placeholder='Enter deadline'
            className='form-control'
            type='datetime-local'
          ></FormInput>
        </div>
        <div>
          <button className='btn btn-danger me-3' onClick={() => reset()}>
            Reset
          </button>
          <button className='btn btn-primary' onClick={handleSubmit(onSubmit)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormToDoList;
