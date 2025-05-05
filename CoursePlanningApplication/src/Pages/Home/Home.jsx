import React, { useState } from 'react';
import { Menu, X, User, HelpCircle, Award, Book, BookOpen, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [isOpen, setIsOpen] = useState(false);
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
    { title: 'Home', link: '/' },
    { title: 'Academic Tracker', link: '/AcademicTracker' },
    { title: 'Course Search', link: '/CourseSearch' },
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
    </div>
  );
}

export default Home;
