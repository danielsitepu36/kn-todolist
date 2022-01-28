// import logo from './logo.svg';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import About from './pages/About';
import ToDoList from './pages/ToDoList';
import Category from './pages/Category';
import FormToDoList from './pages/ToDoList/New';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Navbar from './components/Navbar';
import { useDispatch } from 'react-redux';
import { saveToken, saveUser } from './stores/authentication';
import Swal from 'sweetalert2';

function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (localStorage.getItem('reactData')) {
  //     dispatch(
  //       login(JSON.parse(localStorage.getItem('reactData')).txtUsername)
  //     );
  //   }
  // }, []);

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/home' />
        </Route>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <AppRoutes />
        {/* {menus.map((menu) => (
          <Route
            key={menu.id}
            exact
            path={menu.path}
            component={menu.component}
          />
        ))} */}
        <Route path='*' component={NoMatch} />
      </Switch>
    </Router>
  );
}

function AppRoutes() {
  const menus = [
    {
      id: 0,
      path: '/home',
      component: Home,
    },
    {
      id: 1,
      path: '/about',
      component: About,
    },
    {
      id: 2,
      path: '/task',
      component: ToDoList,
    },
    {
      id: 3,
      path: '/category',
      component: Category,
    },
    {
      id: 4,
      path: '/task/:id',
      component: FormToDoList,
    },
    // {
    //   id: 5,
    //   path: '/login',
    //   component: Login,
    // },
    // {
    //   id: 6,
    //   path: '/register',
    //   component: Register,
    // },
  ];
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const foundLocal = localStorage.getItem('reactData');
    if (foundLocal) {
      try {
        const localData = JSON.parse(foundLocal);

        // getAllParameter(localData);

        if (
          false
          // && moment().isAfter(moment(localData.expires_in))
        ) {
          localStorage.removeItem('reactData');
          // dispatch(logout);
          Swal.fire({
            icon: 'error',
            title: 'Sesi anda telah habis',
            text: 'Mengarahkan ke halaman login',
          });
          history.push('/login');
        } else {
          dispatch(
            saveToken({
              access_token: localData.access_token,
              expires_in: localData.expires_in,
            })
          );
          dispatch(
            saveUser({
              txtUsername: localData.txtUsername,
            })
          );
        }
      } catch {
        localStorage.removeItem('reactData');
        // dispatch(logout);
        Swal.fire({
          icon: 'error',
          title: 'Sesi anda telah habis',
          text: 'Mengarahkan ke halaman login',
        });
        history.push('/login');
      }
    } else {
      // dispatch(logout);
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Sesi anda telah habis',
      //   text: 'Mengarahkan ke halaman login',
      // });
      history.push('/login');
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Switch>
        {menus.map((item) => (
          <AuthRoutes
            key={item.id}
            exact
            path={item.path}
            component={item.component}
            // roles={item.roles}
            // // 2, 3, 4
            // userRole={1}
          />
          // <AuthRoute RoleID={RoleID.RoleID} path={item.txtLink} />
        ))}
      </Switch>
    </div>
  );
}

function AuthRoutes({ roles, userRole, component: Component, ...rest }) {
  // const dispatch = useDispatch();
  const history = useHistory();

  const foundLocal = localStorage.getItem('reactData');

  const grantPermission = () => {
    return true;
    // if (roles.includes(userRole))
    // return true;
    // else return false
  };

  if (foundLocal) {
    return (
      <>
        {grantPermission() ? (
          <Route {...rest} render={(props) => <Component {...props} />} />
        ) : (
          <Route render={NoMatch} />
        )}
      </>
    );
  }
  return <Redirect to='/login' />;
}

export default App;
