import React, { useState } from 'react';
import { Award, Book, BookOpen, Building } from 'lucide-react';
import './Home.css';

function Home() {
  const [studentName] = useState("John Doe");
  const [studentInfo] = useState({
    creditsCompleted: 57,
    totalCredits: 120,
    gpa: 3.78,
    degree: "Bachelor of Science",
    major: "Computer Science",
    department: "Computer Science"
  });

  return (
    <div className="page">
      <div className="welcome-section">
        <h1 className="welcome-heading">Welcome, {studentName}!</h1>
        <p className="welcome-text">Manage your courses and academic progress</p>

        {/* Progress tracker and student info */}
        <div className="progress-container">
          <div className="progress-tracker">
            <div className="progress-info">
              <span className="progress-label">Credits Completed</span>
              <span className="progress-value">
                {studentInfo.creditsCompleted} of {studentInfo.totalCredits}
              </span>
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
