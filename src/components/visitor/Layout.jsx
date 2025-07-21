import { NavLink, Outlet,useLocation } from "react-router-dom";
import { useState,useEffect, act } from "react";
import logo from '../../assets/images/logo.png'
const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
     const location = useLocation();
  const [active,setActive]= useState()
  const navLinks = [
    { name: "Home", path: "/#home" },
    { name: "Features", path: "/#features" },
    { name: "About", path: "/#about" },
    { name: "Contact", path: "/#contact" },
  ];

  const activeClass = "text-blue-600 font-semibold";
  const inactiveClass = "text-gray-700 hover:text-blue-600";
 useEffect(() => {
    if (location.hash) {
        const element = document.querySelector(location.hash);
        setActive(element?.id)
        console.log(element?.id)
    }else {
        location.pathname == 'home' ? setActive('home') : ''
    }
  }, [location]);
  return (
    
    <>
        <nav className = {` z-10   px-4 fixed ${active == 'login' ? 'bg-gradient-to-br from-blue-950 via-slate-900 to-black' : 'bg-white'}`} style={{width:'100%' }}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <img src={logo} alt="eSchool" className="w-25 h-20" />
                </div>

                <div className="hidden md:flex space-x-7 text-md ">
                {navLinks.map((link) => (
                    <NavLink
                    key={link.path}
                    to={link.path}
                    className={ active == link.name.toLowerCase() ? 'text-blue-600 font-semibold' : 'text-black'}
                    >
                    {link.name}
                    </NavLink>
                ))}
                </div>

                <div className="hidden md:flex">
                <NavLink
                    to="/login"
                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                >
                    Login
                </NavLink>
                </div>

                <div className="md:hidden">
                <button onClick={() => setMobileOpen(!mobileOpen)}>
                    <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                    />
                    </svg>
                </button>
                </div>
            </div>

            {mobileOpen && (
                <div className="md:hidden px-4 pt-3 pb-5 space-y-2 bg-white">
                {navLinks.map((link) => (
                    <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                        isActive ? activeClass : inactiveClass
                    }
                    onClick={() => setMobileOpen(false)}
                    >
                    {link.name}
                    </NavLink>
                ))}
                <NavLink
                    to="/login"
                    className="block text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => setMobileOpen(false)}
                >
                    Login
                </NavLink>
                </div>
            )}
        </nav>

        <Outlet/>
    </>
  );
};

export default Layout;
