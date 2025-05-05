import React, { useState } from 'react';
import { Menu, X, User, HelpCircle } from 'lucide-react';

function Home() {
  // Navbar state
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { title: 'Home', link: '#home' },
    { title: 'Academic Tracker', link: '#academic-tracker' },
    { title: 'Course Search', link: '#course-search' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NSU Style Navbar */}
      <nav className="bg-green-700 text-white">
        {/* Top Bar with Logo and User Controls */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo Area */}
            <a href="#home" className="flex items-center">
              <div className="font-bold text-lg leading-tight">NSU Course Planning Application</div>
            </a>

            {/* User Controls - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative group">
                <button className="p-2 rounded-full hover:bg-green-600 focus:outline-none">
                  <User className="h-5 w-5" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <a href="#login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login</a>
                  <a href="#logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                  <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</a>
                </div>
              </div>
              <a href="#help" className="p-2 rounded-full hover:bg-green-600 focus:outline-none">
                <HelpCircle className="h-5 w-5" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                className="text-white hover:text-gray-200 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Secondary Navigation Bar */}
      <div className="bg-white border-b border-gray-300 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center h-12">
            {navItems.map((item, index) => (
              <a 
                key={index}
                href={item.link}
                className="px-4 py-2 text-gray-700 hover:text-green-700 text-sm font-medium"
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b shadow">
          <div className="px-2 py-3 space-y-1">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="block px-3 py-2 text-green-700 hover:bg-green-50 rounded"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </a>
            ))}
            <div className="border-t border-gray-300 mt-2 pt-2">
              <a href="#login" className="block px-3 py-2 text-green-700 flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>Login</span>
              </a>
              <a href="#logout" className="block px-3 py-2 text-green-700 flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>Logout</span>
              </a>
              <a href="#profile" className="block px-3 py-2 text-green-700 flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>My Profile</span>
              </a>
              <a href="#help" className="block px-3 py-2 text-green-700 flex items-center">
                <HelpCircle className="h-4 w-4 mr-2" />
                <span>Help</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;