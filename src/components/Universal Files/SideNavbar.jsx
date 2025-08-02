import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import userIcon from '../../assets/images/userIcon.png';
import { signOut,getAuth } from 'firebase/auth';
import app from '../../firebaseConfig.js'
import { useUser } from './UserContext.jsx';
import { faCubesStacked,faArrowRightFromBracket,faGrip,faBook,faUserTie,faChalkboardTeacher,faGraduationCap,faUsers,faClipboardCheck,faFileLines,faBookOpen,faCalendarDays,faComments,} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SideNavbar = () => {

  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false)
  const { pathname } = useLocation();
  const {userRole} = useUser()

const navLinks = [
  { label: 'Dashboard', icon: faGrip, path: '', roles: ['student', 'teacher', 'administrator','parent','principal'] },

  { label: 'Classes', icon: faCubesStacked, path: 'classes', roles: ['administrator','principal'] },
  { label: 'Subjects', icon: faBook, path: 'subjects', roles: ['student', 'teacher','administrator','principal'] },
  { label: 'Administrators', icon: faUserTie, path: 'administrators', roles: ['principal'] },
  { label: 'Teachers', icon: faChalkboardTeacher, path: 'teachers', roles: ['administrator','principal'] },
  { label: 'Students', icon: faGraduationCap, path: 'students', roles: ['administrator','principal'] },
  { label: 'Parents', icon: faUsers, path: 'parents', roles: ['administrator','principal'] },
  { label: 'Assignemts', icon: faClipboardCheck, path: 'assignments', roles: ['student', 'teacher'] },
  { label: 'Transcript', icon: faFileLines, path: 'transcript', roles: ['student'] },
  { label: 'Library', icon: faBookOpen, path: 'library', roles: ['student', 'teacher','parent','administrator','principal'] },
  { label: 'Events', icon: faCalendarDays, path: 'events', roles: ['student', 'teacher','parent','administrator','principal'] },
  { label: 'Forum', icon: faComments, path: 'forum', roles: ['student', 'teacher','parent','administrator','principal'] },


  
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
      <FontAwesomeIcon icon={Icon} className='text-lg px-3 text-blue-200'/>
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
              Log Out <FontAwesomeIcon icon={faArrowRightFromBracket} />
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
              Log Out <FontAwesomeIcon icon={faArrowRightFromBracket} />
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
