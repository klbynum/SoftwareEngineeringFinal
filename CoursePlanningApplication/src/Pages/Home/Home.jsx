import React, { useState } from 'react';
import { Menu, X, User, HelpCircle } from 'lucide-react';
import './Home.css';

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { title: 'Home', link: '#home' },
    { title: 'Academic Tracker', link: '#academic-tracker' },
    { title: 'Course Search', link: '#course-search' },
  ];

  return (
    <div className="page">
      <nav className="navbar">
        <div className="nav-container">
          <a href="#home" className="logo">NSU Course Planning Application</a>

          <div className="user-controls hidden md:flex">
            <div className="relative group">
              <button className="user-button focus:outline-none">
                <User className="h-5 w-5" />
              </button>
              <div className="user-dropdown">
                <a href="#login" className="dropdown-link">Login</a>
                <a href="#logout" className="dropdown-link">Logout</a>
                <a href="#profile" className="dropdown-link">My Profile</a>
              </div>
            </div>
            <a href="#help" className="user-button focus:outline-none">
              <HelpCircle className="h-5 w-5" />
            </a>
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
            <a key={index} href={item.link} className="secondary-link">{item.title}</a>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="mobile-menu md:hidden">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="mobile-item"
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </a>
          ))}
          <div className="mobile-user-section">
            <a href="#login" className="mobile-user-link"><User /><span>Login</span></a>
            <a href="#logout" className="mobile-user-link"><User /><span>Logout</span></a>
            <a href="#profile" className="mobile-user-link"><User /><span>My Profile</span></a>
            <a href="#help" className="mobile-user-link"><HelpCircle /><span>Help</span></a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
