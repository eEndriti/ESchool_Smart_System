import { createBrowserRouter, createHashRouter, Navigate } from 'react-router-dom';
import Home from './components/visitor/Home';
import Layout from './components/visitor/Layout';
import Login from './components/visitor/Login';
import NotFound from './RouteFiles/NotFound'; 
import Student from './components/student/student/Student';
import RoleProtectedRoute from './RouteFiles/RoleProtectedRoute';
import SideNavbar from './components/Universal Files/SideNavbar';
import Subjects from './components/student/subjects/Subjects';
import Assignments from './components/student/assignment/Assignments';
import AssignmentsTeacher from './components/teacher/Assignments/Assignments';
import Transcript from './components/student/transcript/Transcript';
import Library from './components/SharedComponents/Library.jsx/Library';
import Events from './components/SharedComponents/Events/Events';
import Forum from './components/SharedComponents/Forum/Forum';
import Teacher from './components/teacher/dashboard/Teacher'
import Grades from './components/teacher/Grades/Grades';
import Administrator from './components/Administrator/Dashboard/Administrator';
import Parent from './components/parent/dashboard/Parent';
import Principal from './components/principal/dashboard/principal';
import Classes from './components/principal/classes/Classes';
import PrincipalSubjects from './components/principal/subjects/Subjects'
import Administrators from './components/principal/administrator/Administrators';
import Teachers from './components/principal/teacher/Teachers';
import Students from './components/principal/students/Students';
import Parents from './components/principal/Parents/Parents';
import ForumDetail from './components/SharedComponents/Forum/ForumDetails';

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
        {index:true,element: <Parent/>},
        {path:'library',element:<Library/>},
        {path:'events',element:<Events/>},
        {path:'forum',element:<Forum/>}
      ]
    },{
      path:'principal',
      element:  
        <RoleProtectedRoute allowedRoles={['principal']}>
          <SideNavbar />
        </RoleProtectedRoute>,
      children:[
        {index:true,element: <Principal/>},
        {
          path:'subjects',
          element:<PrincipalSubjects/>
        },{
          path:'classes',
          element:<Classes/>
        },{
          path:'administrators',
          element:<Administrators/>
        },{
          path:'teachers',
          element:<Teachers/>
        },{
          path:'students',
          element:<Students/>
        },{
          path:'parents',
          element:<Parents/>
        },{
          path:'classes',
          element:<Classes/>
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
        ,{
          path:'forum/:id',
          element:<ForumDetail/>
        }
      ]
    },
,{
      path: '*',
        element: <NotFound />,
      }
]);

export default router;
