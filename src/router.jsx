import { createBrowserRouter, createHashRouter, Navigate } from 'react-router-dom';
import Home from './components/visitor/Home';
import Layout from './components/visitor/Layout';
import Login from './components/visitor/Login';
import NotFound from './RouteFiles/NotFound'; 
import Teacher from './components/teacher/teacher';
import Student from './components/student/student/Student';
import RoleProtectedRoute from './RouteFiles/RoleProtectedRoute';
import UnAuthorized from './RouteFiles/UnAuthorized';
import SideNavbar from './components/Universal Files/SideNavbar';
import Subjects from './components/student/subjects/Subjects';
import Assignments from './components/student/assignment/Assignments';
const LayoutWrapper = () => {
  return <Layout />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutWrapper />,
    children: [
      { index: true,   element: <Home />},
      { path: 'home',  element: <Home />,},
      { path: 'login', element: <Login />,},
     
    ],
  },
   {
      path:'teacher',
      element: <RoleProtectedRoute allowedRoles = {['teacher']} />,
      children:[
        {index:true,element: <Teacher/>}
      ]
    },
     {
      path: 'student',
      element: (
        <RoleProtectedRoute allowedRoles={['student']}>
          <SideNavbar />
        </RoleProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Student />
        },{
          path:'subjects',
          element:<Subjects/>
        },{
          path:'assignments',
          element:<Assignments/>
        }
      ]
    }
,{
      path: '*',
        element: <NotFound />,
      },
      {
      path: 'unauthorized',
        element: <UnAuthorized />,
      },
]);

export default router;
