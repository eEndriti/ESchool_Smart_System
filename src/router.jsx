import { createBrowserRouter, createHashRouter, Navigate } from 'react-router-dom';
import Home from './components/visitor/Home';
import Layout from './components/visitor/Layout';
import Login from './components/visitor/Login';
import NotFound from './RouteFiles/NotFound'; 
import Student from './components/student/student/Student';
import RoleProtectedRoute from './RouteFiles/RoleProtectedRoute';
import UnAuthorized from './RouteFiles/UnAuthorized';
import SideNavbar from './components/Universal Files/SideNavbar';
import Subjects from './components/student/subjects/Subjects';
import Assignments from './components/student/assignment/Assignments';
import AssignmentsTeacher from './components/teacher/Assignments/Assignments';
import Transcript from './components/student/transcript/Transcript';
import Library from './components/student/Library.jsx/Library';
import Events from './components/student/Events/Events';
import Forum from './components/student/Forum/Forum';
import Teacher from './components/teacher/dashboard/Teacher'
import Grades from './components/teacher/Grades/Grades';
import Administrator from './components/Administrator/Dashboard/Administrator';
import Parent from './components/parent/Parent';
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
      element:  
        <RoleProtectedRoute allowedRoles={['teacher']}>
          <SideNavbar />
        </RoleProtectedRoute>,
      children:[
        {index:true,element: <Teacher/>},{
          path:'subjects',
          element:<Subjects/>
        },{
          path:'assignments',
          element:<AssignmentsTeacher/>
        },{
          path:'grades',
          element:<Grades/>
        }
        ,{
          path:'library',
          element:<Library/>
        },{
          path:'events',
          element:<Events/>
        },{
          path:'forum',
          element:<Forum/>
        }
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
        ,{
          path:'transcript',
          element:<Transcript/>
        }
        ,{
          path:'library',
          element:<Library/>
        },{
          path:'events',
          element:<Events/>
        },{
          path:'forum',
          element:<Forum/>
        }

      ]
    },
   {
      path:'administrator',
      element:  
        <RoleProtectedRoute allowedRoles={['administrator']}>
          <SideNavbar />
        </RoleProtectedRoute>,
      children:[
        {index:true,element: <Administrator/>}
      ]
    },
   {
      path:'parent',
      element:  
        <RoleProtectedRoute allowedRoles={['parent']}>
          <SideNavbar />
        </RoleProtectedRoute>,
      children:[
        {index:true,element: <Parent/>}
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
