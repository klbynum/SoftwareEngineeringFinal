import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Book, 
  BookOpen, 
  Calendar, 
  Bell,
  FileText
} from 'lucide-react';
import './Home.css';

function Home() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student data from backend
  useEffect(() => {
    // Assuming your server is running on localhost:5001
    fetch('http://localhost:5001/students')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        return response.json();
      })
      .then((data) => {
        setStudentData(data.StudentRecords[0]); // Use the first student for now
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  if (error) {
    return <div className="error-screen">Error: {error}</div>;
  }

  // Calculate progress percentage
  const completedCredits = studentData?.CompletedCredits || 0;
  const totalCredits = studentData?.TotalCredits || 120; // Default to 120 if not provided
  const progressPercentage = Math.round((completedCredits / totalCredits) * 100);

  return (
    <div className="page">
      {/* Main Content */}
      <main>
        {/* Welcome Section */}
        <section className="welcome-section">
          <h1 className="welcome-heading">Welcome, {studentData?.firstName} {studentData?.lastName}!</h1>
          <p className="welcome-text">Explore your academic resources and plan your courses.</p>

          {/* Progress Tracker */}
          <div className="progress-container">
            <div className="progress-tracker">
              <div className="progress-info">
                <span className="progress-label">Degree Progress</span>
                <span className="progress-value">{completedCredits} / {totalCredits} Credits</span>
              </div>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <span className="progress-percentage">{progressPercentage}% Complete</span>
            </div>

            {/* Student Info Cards */}
            <div className="student-info-grid">
              <div className="info-card">
                <Award className="info-icon" />
                <div className="info-details">
                  <span className="info-label">GPA</span>
                  <span className="info-value">{studentData?.GPA || "N/A"}</span>
                </div>
              </div>
              
              <div className="info-card">
                <Book className="info-icon" />
                <div className="info-details">
                  <span className="info-label">Degree</span>
                  <span className="info-value">{studentData?.Degree || "N/A"}</span>
                </div>
              </div>
              
              <div className="info-card">
                <BookOpen className="info-icon" />
                <div className="info-details">
                  <span className="info-label">Major</span>
                  <span className="info-value">{studentData?.Major || "N/A"}</span>
                </div>
              </div>
              
              <div className="info-card">
                <Calendar className="info-icon" />
                <div className="info-details">
                  <span className="info-label">Classification</span>
                  <span className="info-value">{studentData?.Classification || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deadlines & Events Section */}
        <section className="welcome-section">
          <div className="deadlines-container">
            <h2 className="welcome-heading" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              Important Dates & Deadlines
            </h2>
            
            <div className="deadlines-grid">
              <div className="deadline-card">
                <div className="deadline-header">
                  <Calendar className="deadline-icon" />
                  <h3 className="deadline-title">Academic Calendar</h3>
                </div>
                
                <div className="deadline-section">
                  <h4 className="deadline-semester">Fall 2024</h4>
                  <div className="deadline-item">
                    <span className="deadline-label">Classes Begin:</span>
                    <span className="deadline-date">August 26, 2024</span>
                  </div>
                  <div className="deadline-item">
                    <span className="deadline-label">Last Day to Add:</span>
                    <span className="deadline-date">September 2, 2024</span>
                  </div>
                  <div className="deadline-item">
                    <span className="deadline-label">Last Day to Drop:</span>
                    <span className="deadline-date">October 18, 2024</span>
                  </div>
                </div>
                
                <div className="deadline-section">
                  <h4 className="deadline-semester">Spring 2025</h4>
                  <div className="deadline-item">
                    <span className="deadline-label">Classes Begin:</span>
                    <span className="deadline-date">January 21, 2025</span>
                  </div>
                  <div className="deadline-item">
                    <span className="deadline-label">Registration Opens:</span>
                    <span className="deadline-date">November 11, 2024</span>
                  </div>
                </div>
              </div>
              
              <div className="deadline-card">
                <div className="deadline-header">
                  <FileText className="deadline-icon" />
                  <h3 className="deadline-title">Exams & Assignments</h3>
                </div>
                
                <div className="deadline-section">
                  <h4 className="deadline-semester">Current Semester</h4>
                  <div className="deadline-item">
                    <span className="deadline-label">Midterm Exams:</span>
                    <span className="deadline-date">October 10-14, 2024</span>
                  </div>
                  <div className="deadline-item">
                    <span className="deadline-label">Final Paper Due:</span>
                    <span className="deadline-date">November 25, 2024</span>
                  </div>
                  <div className="deadline-item">
                    <span className="deadline-label">Final Exams:</span>
                    <span className="deadline-date">December 5-10, 2024</span>
                  </div>
                </div>
              </div>
              
              <div className="deadline-card">
                <div className="deadline-header">
                  <Bell className="deadline-icon" />
                  <h3 className="deadline-title">Administrative</h3>
                </div>
                
                <div className="deadline-section">
                  <h4 className="deadline-semester">Financial</h4>
                  <div className="deadline-item">
                    <span className="deadline-label">Tuition Payment Due:</span>
                    <span className="deadline-date">August 15, 2024</span>
                  </div>
                  <div className="deadline-item">
                    <span className="deadline-label">FAFSA Deadline:</span>
                    <span className="deadline-date">June 30, 2025</span>
                  </div>
                </div>
                
                <div className="deadline-section">
                  <h4 className="deadline-semester">Graduation</h4>
                  <div className="deadline-item">
                    <span className="deadline-label">Apply for Graduation:</span>
                    <span className="deadline-date">February 15, 2025</span>
                  </div>
                  <div className="deadline-item">
                    <span className="deadline-label">Commencement:</span>
                    <span className="deadline-date">May 15, 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
