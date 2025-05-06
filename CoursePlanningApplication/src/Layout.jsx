import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu, X, User, HelpCircle } from 'lucide-react';
import './Pages/Home/Home.css';

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { title: 'Home', link: '/' },
    { title: 'Academic Tracker', link: '/AcademicTracker' },
    { title: 'Course Search', link: '/CourseSearch' },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <span className="logo">NSU Course Planning Application</span>

          <div className="user-controls hidden md:flex">
            <div className="relative group">
              <button className="user-button focus:outline-none">
                <User className="h-5 w-5" />
              </button>
              <div className="user-dropdown">
                <Link to="/Login" className="dropdown-link">Login</Link>
                <Link to="/Login" className="dropdown-link">Logout</Link>
                <Link to="/Profile" className="dropdown-link">My Profile</Link>
              </div>
            </div>
            <Link to="/Help" className="user-button focus:outline-none">
              <HelpCircle className="h-5 w-5" />
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button className="menu-button focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      <div className="secondary-nav">
        <div className="secondary-nav-inner">
          {navItems.map((item, index) => (
            <Link key={index} to={item.link} className="secondary-link">{item.title}</Link>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="mobile-menu md:hidden">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="mobile-item"
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </Link>
          ))}
          <div className="mobile-user-section">
            <Link to="/Login" className="mobile-user-link"><User /><span>Login</span></Link>
            <Link to="/Login" className="mobile-user-link"><User /><span>Logout</span></Link>
            <Link to="/Profile" className="mobile-user-link"><User /><span>My Profile</span></Link>
            <Link to="/Help" className="mobile-user-link"><HelpCircle /><span>Help</span></Link>
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
};

export default Layout;
