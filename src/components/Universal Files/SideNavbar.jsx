import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import userIcon from '../../assets/images/userIcon.png';
import {
  LogOut, LayoutDashboard, BookOpenText, NotebookPen,
  Library, CalendarRange, NotebookText, MessagesSquare,BookOpenCheck
} from 'lucide-react';
import { signOut,getAuth } from 'firebase/auth';
import app from '../../firebaseConfig.js'
import { useUser } from './UserContext.jsx';

const SideNavbar = () => {

  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false)
  const { pathname } = useLocation();
  const {userRole} = useUser()
  
const navLinks = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '', roles: ['student', 'teacher', 'administrator','parent'] },

  { label: 'Students', icon: NotebookText, path: 'students', roles: ['parent'] },

  { label: 'Subjects', icon: BookOpenText, path: 'subjects', roles: ['student', 'teacher','administrator'] },
  { label: 'Assignemts', icon: NotebookPen, path: 'assignments', roles: ['student', 'teacher','parent'] },
  { label: 'Transcript', icon: NotebookText, path: 'transcript', roles: ['student'] },
  { label: 'Grades', icon: BookOpenCheck, path: 'grades', roles: ['teacher','parent'] },
  { label: 'Library', icon: Library, path: 'library', roles: ['student', 'teacher','parent'] },
  { label: 'Events', icon: CalendarRange, path: 'events', roles: ['student', 'teacher','parent'] },
  { label: 'Forum', icon: MessagesSquare, path: 'forum', roles: ['student', 'teacher','parent'] },


  { label: 'Teachers', icon: NotebookText, path: 'transcript', roles: ['administrator'] },
  { label: 'Students', icon: NotebookText, path: 'transcript', roles: ['administrator'] },
  { label: 'Classes', icon: NotebookText, path: 'transcript', roles: ['administrator'] },
  { label: 'Parents', icon: NotebookText, path: 'transcript', roles: ['administrator'] },
];

  const isActive = (linkPath) => {
    const fullPath = `/${linkPath}`;
    return pathname === fullPath || pathname === `${fullPath}/`;
  };

  const NavLinkItem = ({ label, icon: Icon, path }) => (
    <Link
      to={`${path}`}
      className={`block px-4 py-2 transition w-50 ${
  isActive(path)
    ? 'bg-white text-black clip-inverse-roundedl test'
    : 'hover:bg-blue-600 hover:text-white text-white'
}`}

    >
      <Icon className="inline text-[#CBD5E1] mx-2" />
      {label}
    </Link>



  );

  const auth = getAuth(app)

const handleLogout = () => {
  console.log('inside log out')
  setButtonLoading(true)
    signOut(auth)
      .then(() => {
        window.location.href = '/login';
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
              setButtonLoading(false)

  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#212B4B]">
      <div className="hidden md:flex flex-col w-64 bg-[#212B4B] text-white shadow-lg">
        <div className="flex items-center justify-start mx-4 h-20 border-b border-gray-700">
          <img src={userIcon} className="bg-white w-10 rounded-4xl p-1" />
          <h1 className="mx-4">Emri Mbiemri</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navLinks
              .filter(link => link.roles.includes(userRole))
              .map(link => (
                <NavLinkItem key={link.label} {...link} />
            ))}
        </nav>
        <button className="px-4 py-2 rounded-md bg-red-500 m-2 hover:bg-red-700 hover:cursor-pointer hover:text-white transition" onClick={handleLogout}
              disabled = {buttonLoading}>
              Log Out <LogOut className="inline" />
            </button>
      </div>

      <div className="md:hidden flex flex-col">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-4 text-blue-600 focus:outline-none"
        >
          ☰
        </button>
        {menuOpen && (
          <div className="flex flex-col bg-[#01061E] text-white w-64 h-full shadow-lg absolute top-16 left-0 z-50">
            <div className="flex items-center justify-start mx-4 h-20 border-b border-gray-700">
              <img src={userIcon} className="bg-white w-15 rounded-4xl p-1" />
              <h1 className="mx-4">Emri Mbiemri</h1>
            </div>
            {navLinks
              .filter(link => link.roles.includes(userRole))
              .map(link => (
                <NavLinkItem key={link.label} {...link} />
            ))}
            <button className="px-4 py-2 rounded-md bg-red-500 m-2 hover:bg-red-700 hover:cursor-pointer hover:text-white transition" onClick={handleLogout}
              disabled = {buttonLoading}>
              Log Out <LogOut className="inline" />
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 p-0 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default SideNavbar;
