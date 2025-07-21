import { createBrowserRouter, createHashRouter, Navigate } from 'react-router-dom';
import Home from './components/visitor/Home';
import Layout from './components/visitor/Layout';
import Login from './components/visitor/Login';
// import NotFound from './components/NotFound'; // Uncomment if needed

const LayoutWrapper = () => {
  return <Layout />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutWrapper />,
    children: [
      {
        index: true,           
        element: <Home />,
      },
      {
        path: 'home',          
        element: <Home />,
      },
      {
        path: 'login',          
        element: <Login />,
      },
      // Uncomment this block if you add NotFound component
      // {
      //   path: '*',
      //   element: <NotFound />,
      // },
    ],
  },
]);

export default router;
