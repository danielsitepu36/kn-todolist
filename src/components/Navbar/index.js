import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// import KNToDoListLogo from '../assets/images/KNToDoListLogo.png';

function Navbar() {
  const location = useLocation();
  const { pathname } = location;
  const page = pathname.split('/')[1];
  const navMenus = [
    { title: 'Home', path: '/home', onClick: () => {} },
    { title: 'Daftar Tugas', path: '/task', onClick: () => {} },
    { title: 'Kategori Tugas', path: '/category', onClick: () => {} },
    { title: 'About', path: '/about', onClick: () => {} },
    {
      title: 'Keluar',
      path: '/login',
      onClick: () => localStorage.removeItem('reactData'),
    },
  ];
  return (
    <div className='navbar-tdl'>
      <div className='container'>
        <div className='navbar-tdl__wrapper'>
          {/* <img className="logo" src={KNToDoListLogo} alt="Logo" /> */}
          {/* <h1>KN-ToDoList</h1> */}
          <div className='menu'>
            {navMenus.map((menu, idx) => (
              <Link
                key={idx}
                className={`menu-link ${menu.path === '/' + page && 'active'}`}
                to={menu.path}
                onClick={menu.onClick}
              >
                {menu.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
