import React, { useState } from 'react';
import { Menu, X, User, HelpCircle, Award, Book, BookOpen, Building, Calendar, Clock } from 'lucide-react';
import './Home.css';

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  // Student info - in real app this would come from authentication/API
  const [studentName, setStudentName] = useState("John Doe");
  const [studentInfo, setStudentInfo] = useState({
    creditsCompleted: 57,
    totalCredits: 120,
    gpa: 3.78,
    degree: "Bachelor of Science",
    major: "Computer Science",
    department: "Computer Science"
  });
  
  const navItems = [
    { title: 'Home', link: '#home' },
    { title: 'Academic Tracker', link: '#academic-tracker' },
    { title: 'Course Search', link: '#course-search' },
  ];
  
  return (
    <div className="page">
      <nav className="navbar">
        <div className="nav-container">
          <span className="logo">NSU Course Planning Application</span>
          
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
      
      {/* Welcome section */}
      <div className="welcome-section">
        <h1 className="welcome-heading">Welcome, {studentName}!</h1>
        <p className="welcome-text">Manage your courses and academic progress</p>
        
        {/* Progress tracker and student info */}
        <div className="progress-container">
          <div className="progress-tracker">
            <div className="progress-info">
              <span className="progress-label">Credits Completed</span>
              <span className="progress-value">{studentInfo.creditsCompleted} of {studentInfo.totalCredits}</span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${(studentInfo.creditsCompleted / studentInfo.totalCredits) * 100}%` }}
              ></div>
            </div>
            <span className="progress-percentage">
              {Math.round((studentInfo.creditsCompleted / studentInfo.totalCredits) * 100)}% Complete
            </span>
          </div>
          
          <div className="student-info-grid">
            <div className="info-card">
              <Award className="info-icon" />
              <div className="info-details">
                <span className="info-label">GPA</span>
                <span className="info-value">{studentInfo.gpa.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="info-card">
              <BookOpen className="info-icon" />
              <div className="info-details">
                <span className="info-label">Degree</span>
                <span className="info-value">{studentInfo.degree}</span>
              </div>
            </div>
            
            <div className="info-card">
              <Book className="info-icon" />
              <div className="info-details">
                <span className="info-label">Major</span>
                <span className="info-value">{studentInfo.major}</span>
              </div>
            </div>
            
            <div className="info-card">
              <Building className="info-icon" />
              <div className="info-details">
                <span className="info-label">Department</span>
                <span className="info-value">{studentInfo.department}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Upcoming Deadlines & Events section */}
      <div className="welcome-section">
        <h2 className="welcome-heading">Upcoming Deadlines & Events</h2>
        <div className="deadlines-container">
          <div className="deadlines-grid">
            <div className="deadline-card">
              <div className="deadline-header">
                <Calendar className="deadline-icon" />
                <h3 className="deadline-title">Registration Dates</h3>
              </div>
              <div className="deadline-section">
                <h4 className="deadline-semester">Fall 2025</h4>
                <div className="deadline-item">
                  <span className="deadline-label">Registration begins:</span>
                  <span className="deadline-date">Monday, March 24 – Friday, June 20</span>
                </div>
                <div className="deadline-item">
                  <span className="deadline-label">Late Registration:</span>
                  <span className="deadline-date">Saturday, August 16 - Friday, August 22</span>
                </div>
              </div>
              <div className="deadline-section">
                <h4 className="deadline-semester">Spring 2026</h4>
                <div className="deadline-item">
                  <span className="deadline-label">Registration begins:</span>
                  <span className="deadline-date">Monday, October 27</span>
                </div>
                <div className="deadline-item">
                  <span className="deadline-label">Late Registration:</span>
                  <span className="deadline-date">Saturday, January 10 - Friday, January 16</span>
                </div>
              </div>
            </div>
            
            <div className="deadline-card">
              <div className="deadline-header">
                <Clock className="deadline-icon" />
                <h3 className="deadline-title">Add/Drop Deadlines</h3>
              </div>
              <div className="deadline-section">
                <h4 className="deadline-semester">Fall 2025</h4>
                <div className="deadline-item">
                  <span className="deadline-date">Friday, August 22</span>
                </div>
              </div>
              <div className="deadline-section">
                <h4 className="deadline-semester">Spring 2026</h4>
                <div className="deadline-item">
                  <span className="deadline-date">Friday, January 16</span>
                </div>
              </div>
            </div>
            
            <div className="deadline-card">
              <div className="deadline-header">
                <User className="deadline-icon" />
                <h3 className="deadline-title">Academic Advising</h3>
              </div>
              <div className="deadline-section">
                <h4 className="deadline-semester">Fall 2025</h4>
                <div className="deadline-item">
                  <span className="deadline-date">Thursday, August 14 – Saturday, August 16</span>
                </div>
              </div>
              <div className="deadline-section">
                <h4 className="deadline-semester">Spring 2026</h4>
                <div className="deadline-item">
                  <span className="deadline-date">Thursday, January 8 – Saturday, January 10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;