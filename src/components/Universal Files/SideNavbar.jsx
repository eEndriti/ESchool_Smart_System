import React, { useState } from 'react';
import { Outlet, NavLink, useLocation, Link } from 'react-router-dom'; // ← NavLink added
import userIcon from '../../assets/images/userIcon.png';
import { signOut, getAuth } from 'firebase/auth';
import app from '../../firebaseConfig.js'
import { useUser } from './UserContext.jsx';
import {
  faCubesStacked, faArrowRightFromBracket, faGrip, faBook, faUserTie,
  faChalkboardTeacher, faGraduationCap, faUsers, faClipboardCheck,
  faFileLines, faBookOpen, faCalendarDays, faComments,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SideNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { userRole } = useUser();

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

  const NavLinkItem = ({ label, icon, path }) => (
    <NavLink
      to={`${path}`}
      end={path === ''} 
      className={({ isActive }) => [
        'group relative flex items-center gap-3 rounded-xl px-3 py-2 transition',
        isActive
          ? 'bg-sky-50 text-gray-900 ring-1 ring-sky-200 shadow-sm'
          : 'text-gray-600 hover:bg-slate-100 hover:text-slate-900'
      ].join(' ')}
      aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
    >
      {({ isActive }) => (
        <>
          <span
            className={[
              'absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r',
              isActive ? 'bg-sky-500' : 'bg-transparent group-hover:bg-slate-300'
            ].join(' ')}
          />
          <FontAwesomeIcon
            icon={icon}
            className={['text-[15px]', isActive ? 'text-sky-600' : 'text-slate-400 group-hover:text-slate-700'].join(' ')}
          />
          <span className="truncate">{label}</span>
          {isActive && <span className="ml-auto h-2 w-2 rounded-full bg-sky-500" />}
        </>
      )}
    </NavLink>
  );

  const auth = getAuth(app);
  const handleLogout = () => {
    setButtonLoading(true);
    signOut(auth)
      .then(() => (window.location.href = '/login'))
      .catch((e) => console.error('Error signing out:', e))
      .finally(() => setButtonLoading(false));
  };

  return (
    <div className="flex h-screen bg-slate-50 text-[#212B4B]">
      <div className="hidden md:flex flex-col w-72 bg-gradient-to-b from-indigo-50 to-indigo-100 border-r border-slate-200 text-slate-900 shadow-sm">
        <div className="flex items-center justify-start gap-3 px-4 h-20 border-b border-slate-200">
          <img src={userIcon} className="h-10 w-10 rounded-full ring-2 ring-slate-100" alt="User" />
          <div className="min-w-0">
            <h1 className="font-semibold leading-5 truncate">Emri Mbiemri</h1>
            <p className="text-xs text-slate-500 truncate capitalize">{userRole}</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navLinks
            .filter(link => link.roles.includes(userRole))
            .map(link => (
              <NavLinkItem key={link.label} {...link} />
            ))}
        </nav>

        <button
          className="m-3 cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-red-600 ring-1 ring-red-200/70 hover:bg-red-50 active:bg-red-100 transition disabled:opacity-60"
          onClick={handleLogout}
          disabled={buttonLoading}
        >
          Log Out <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </button>
      </div>

      <div className="md:hidden flex flex-col">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-4 text-slate-700 focus:outline-none"
        >
          ☰
        </button>
        {menuOpen && (
          <div className="flex flex-col bg-white text-slate-900 w-72 h-full shadow-2xl absolute top-14 left-0 z-50 border-r border-slate-200">
            <div className="flex items-center justify-start gap-3 px-4 h-16 border-b border-slate-200">
              <img src={userIcon} className="h-10 w-10 rounded-full ring-2 ring-slate-100" />
              <h1 className="font-semibold">Emri Mbiemri</h1>
            </div>
            <nav className="p-3 space-y-1">
              {navLinks
                .filter(link => link.roles.includes(userRole))
                .map(link => (
                  <NavLinkItem key={link.label} {...link} />
                ))}
            </nav>
            <button
              className="m-3 cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-red-600 ring-1 ring-red-200/70 hover:bg-red-50 active:bg-red-100 transition disabled:opacity-60"
              onClick={handleLogout}
              disabled={buttonLoading}
            >
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
