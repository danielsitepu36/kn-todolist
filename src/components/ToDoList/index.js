import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AxiosTraining from '../../axiosCustom';
import Swal from 'sweetalert2';

function TodoList({ data, title, onDelete }) {
  const handleDelete = (data) => {
    Swal.fire({
      title: 'Confirm Task Deletion',
      text: 'Are you sure to delete this task? Once you delete it can not be restored.',
      icon: 'warning',
      heightAuto: false,
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await AxiosTraining.post(`/taskreactjs/delete/${data.intTaskId}`, {
            objRequestData: {
              intTaskId: data.intTaskId,
            },
          });
          Swal.fire({
            title: 'Deleted',
            text: 'Task has been deleted.',
            icon: 'success',
            heightAuto: false,
          });
          onDelete();
        } catch (err) {
          console.log(err);
          Swal.fire({
            title: 'Error',
            text: 'Failed to delete.',
            icon: 'error',
            heightAuto: false,
          });
        }
      }
    });
  };

  const history = useHistory();
  return (
    <div>
      <div className='text-end my-3'>
        <button
          className='btn btn-primary'
          type='button'
          onClick={() => history.push('/task/new')}
        >
          Tambah To Do List
        </button>
      </div>
      <h1>{title}</h1>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>No</th>
            <th scope='col'>Author</th>
            <th scope='col'>Judul Task</th>
            <th scope='col'>Deadline</th>
            <th scope='col'>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((task, idx) => (
            <tr key={task.intTaskId}>
              <td>{idx + 1}</td>
              <td>{task.txtDummyPIC}</td>
              <td>{task.txtTitle}</td>
              <td>{task.dtmDeadline}</td>
              <td>
                {/* {authData.txtUsername === task.txtDummyPIC && ( */}
                <div className='d-flex gap-2'>
                  <Link to={`/task/${task.intTaskId}`}>
                    <button className='btn btn-warning'>Ubah</button>
                  </Link>
                  <button
                    className='btn btn-danger'
                    onClick={() => handleDelete(task)}
                  >
                    Hapus
                  </button>
                </div>
                {/* )} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;
