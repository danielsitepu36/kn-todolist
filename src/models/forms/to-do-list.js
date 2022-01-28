import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    title: yup.string().required('Title is required'),
    author: yup.string().required('Author is required'),
    category: yup.mixed().required('Category is required'),
    description: yup.string(),
    deadline: yup.string().required('Date is required')
  })
  .required();