import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

const SideNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#212B4B]">
      <div className="hidden md:flex flex-col w-64 bg-[#01061E] text-white shadow-lg">
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-blue-600">MyApp</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <a href="#" className="block px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition">🏠 Dashboard</a>
          <a href="#" className="block px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition">📁 Projects</a>
          <a href="#" className="block px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition">👥 Team</a>
          <a href="#" className="block px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition">⚙️ Settings</a>
        </nav>
      </div>

      <div className="md:hidden flex flex-col">
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-4 text-blue-600 focus:outline-none">
          ☰
        </button>
        {menuOpen && (
          <div className="flex flex-col bg-[#01061E] text-white w-64 h-full shadow-lg absolute top-16 left-0 z-50">
            <a href="#" className="px-4 py-2 hover:bg-blue-600">🏠 Dashboard</a>
            <a href="#" className="px-4 py-2 hover:bg-blue-600">📁 Projects</a>
            <a href="#" className="px-4 py-2 hover:bg-blue-600">👥 Team</a>
            <a href="#" className="px-4 py-2 hover:bg-blue-600">⚙️ Settings</a>
          </div>
        )}
      </div>

      <div className="flex-1 p-8 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default SideNavbar;
