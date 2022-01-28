// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ToDoList from './pages/ToDoList';
import Category from './pages/Category';

function App() {
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
