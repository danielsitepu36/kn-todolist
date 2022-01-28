// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ToDoList from './pages/ToDoList';
import Category from './pages/Category';
import FormToDoList from './pages/ToDoList/New';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

function App() {
  const menus = [
    {
      id: 0,
      path: '/home',
      component: Home
    },
    {
      id: 1,
      path: '/about',
      component: About
    },
    {
      id: 2,
      path: '/task',
      component: ToDoList
    },
    {
      id: 3,
      path: '/category',
      component: Category
    },
    {
      id: 4,
      path: '/task/:id',
      component: FormToDoList
    },
    {
      id: 5,
      path: '/login',
      component: Login
    },
    {
      id: 6,
      path: '/register',
      component: Register
    }
  ];

  return (
    <Router>
      <Switch>
        {menus.map((menu) => (
          <Route
            key={menu.id}
            exact
            path={menu.path}
            component={menu.component}
          />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
