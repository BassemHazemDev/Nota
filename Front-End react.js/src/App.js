import './App.css';
import { createBrowserRouter, RouterProvider ,Navigate } from 'react-router-dom';
import Home from './Components/Home/Home';
import MainLayout from './Components/MainLayout/MainLayout';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from './NotFound/NotFound';
import PrivateRoute from './PrivateRoute/PrivateRoute'

let routers = createBrowserRouter([
  {
    path: '/', element: <MainLayout />, 
    children: [
      { path: '/home' , element: <PrivateRoute> <Home/> </PrivateRoute> },
      { index: true, element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/not-found', element: <NotFound /> },
      { path: '*', element: <Navigate to="/not-found" /> }
    ]
  }
]);

function App() {
  return (
    <>
    <RouterProvider router={routers} />
    </>
  );
}

export default App;
