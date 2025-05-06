import React, { useState, useEffect } from 'react';
import './AcademicTracker.css';

function AcademicTracker() {
  const [student, setStudent] = useState(null);
  const [coursesTaken, setCoursesTaken] = useState([]);
  const [trackCourses, setTrackCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProgramCredits, setTotalProgramCredits] = useState(120); 

  
  useEffect(() => {
    // Cybersecurity track data
    const cyberSecurityData = {
      "CybersecurityTrack": [
        {
          "course_number": "SEM 101",
          "course": "Spartan Seminar",
          "credits": "1",
          "prerequisite": "",
          "semester": "Fall"
        },
        {
          "course_number": "CSC 101",
          "course": "Introduction to the Comp Sci Profession",
          "credits": "1",
          "prerequisite": "",
          "semester": "Fall"
        },
        {
          "course_number": "CSC 170",
          "course": "Computer Programming I",
          "credits": "3",
          "prerequisite": "MTH 105",
          "semester": "Fall"
        },
        {
          "course_number": "CSC 170L",
          "course": "Computer Programming I Lab",
          "credits": "1",
          "prerequisite": "MTH 105",
          "semester": "Fall"
        },
        {
          "course_number": "ENG 101",
          "course": "College English",
          "credits": "3",
          "prerequisite": "",
          "semester": "Fall"
        },
        {
          "course_number": "MTH 153",
          "course": "College Algebra and Trigonometry",
          "credits": "3",
          "prerequisite": "",
          "semester": "Fall"
        },
        {
          "course_number": "PED 100",
          "course": "Fundamental of Fitness for Life",
          "credits": "1",
          "prerequisite": "",
          "semester": "Fall"
        },
        {
          "course_number": "CSC 260",
          "course": "Computer Programming II",
          "credits": "3",
          "prerequisite": "CSC 170",
          "semester": "Spring"
        },
        {
          "course_number": "CSC 260L",
          "course": "Computer Programming II Lab",
          "credits": "1",
          "prerequisite": "CSC 170",
          "semester": "Spring"
        },
        {
          "course_number": "MTH 184",
          "course": "Calculus I",
          "credits": "4",
          "prerequisite": "",
          "semester": "Spring"
        },
        {
          "course_number": "ENG 102",
          "course": "College English II",
          "credits": "3",
          "prerequisite": "",
          "semester": "Spring"
        },
        {
          "course_number": "HED 100",
          "course": "Personal and Community Health",
          "credits": "2",
          "prerequisite": "",
          "semester": "Spring"
        },
        {
          "course_number": "SOC 101",
          "course": "Social Science Elective",
          "credits": "3",
          "prerequisite": "",
          "semester": "Spring"
        },
        {
          "course_number": "SEM 102",
          "course": "Spartan Seminar",
          "credits": "1",
          "prerequisite": "",
          "semester": "Fall"
        },
        {
          "course_number": "CSC 372",
          "course": "Data Structures",
          "credits": "3",
          "prerequisite": "CSC 260",
          "semester": "Fall"
        },
        {
          "course_number": "BIO 101",
          "course": "Laboratory Science Elective",
          "credits": "4",
          "prerequisite": "",
          "semester": "Fall"
        },
        {
          "course_number": "MTH 251",
          "course": "Calculus II",
          "credits": "4",
          "prerequisite": "MTH 184",
          "semester": "Fall"
        },
        {
          "course_number": "MTH 371",
          "course": "Discrete Mathematical Structures",
          "credits": "4",
          "prerequisite": "MTH 184",
          "semester": "Spring"
        },
        {
          "course_number": "CSC 268",
          "course": "Computer Organization",
          "credits": "3",
          "prerequisite": "CSC 170",
          "semester": "Spring"
        },
        {
          "course_number": "CSC 295",
          "course": "Java Programming",
          "credits": "3",
          "prerequisite": "CSC 260",
          "semester": "Spring"
        },
        {
          "course_number": "CSC 275",
          "course": "Fundamentals of Cybersecurity",
          "credits": "3",
          "prerequisite": "",
          "semester": "Spring"
        },
        {
          "course_number": "ENG 303",
          "course": "Technical Writing",
          "credits": "3",
          "prerequisite": "ENG 102",
          "semester": "Spring"
        },
        {
          "course_number": "ENG 285",
          "course": "Principles of Speech",
          "credits": "3",
          "prerequisite": "ENG 102",
          "semester": "Spring"
        },
        {
          "course_number": "CSC 292",
          "course": "Unix and C Programming",
          "credits": "3",
          "prerequisite": "CSC 260",
          "semester": "Fall"
        },
        {
          "course_number": "CSC 380",
          "course": "Software Engineering",
          "credits": "3",
          "prerequisite": "CSC 260",
          "semester": "Fall"
        },
        {
          "course_number": "CSC 430",
          "course": "Data Communication",
          "credits": "3",
          "prerequisite": "CSC 372",
          "semester": "Fall"
        },
        {
          "course_number": "MTH 351",
          "course": "Probability and Statistics I",
          "credits": "3",
          "prerequisite": "MTH 251",
          "semester": "Fall"
        },
        {
          "course_number": "CHEM 101",
          "course": "Laboratory Science Elective",
          "credits": "4",
          "prerequisite": "",
          "semester": "Fall"
        },
        {
          "course_number": "CSC 449",
          "course": "Cryptography and Network Security",
          "credits": "3",
          "prerequisite": "",
          "semester": "Spring"
        },
        {
          "course_number": "HUM 101",
          "course": "Humanities Elective",
          "credits": "3",
          "prerequisite": "",
          "semester": "Spring"
        },
        {
          "course_number": "CSC 420",
          "course": "Database Principles & Design",
          "credits": "3",
          "prerequisite": "CSC 260",
          "semester": "Spring"
        },
        {
          "course_number": "CSC 361",
          "course": "Survey of Programming Languages",
          "credits": "3",
          "prerequisite": "CSC 260",
          "semester": "Spring"
        },
        {
          "course_number": "CSC 445",
          "course": "Computer Network Defense",
          "credits": "3",
          "prerequisite": "CSC 260",
          "semester": "Fall"
        },
        {
          "course_number": "CSC 498",
          "course": "Senior Seminar I",
          "credits": "2",
          "prerequisite": "",
          "semester": "Fall"
        },
        {
          "course_number": "CSC 464",
          "course": "Operating Systems",
          "credits": "3",
          "prerequisite": "CSC 372",
          "semester": "Fall"
        },
        {
          "course_number": "CSC 350",
          "course": "Computer Science Elective 300 Level or above",
          "credits": "3",
          "prerequisite": "",
          "semester": "Fall"
        },
        {
          "course_number": "CSC 313",
          "course": "Network Administration",
          "credits": "3",
          "prerequisite": "",
          "semester": "Spring"
        },
        {
          "course_number": "SOC 205",
          "course": "Social Science Elective",
          "credits": "3",
          "prerequisite": "",
          "semester": "Spring"
        },
        {
          "course_number": "CSC 468",
          "course": "Computer Architecture",
          "credits": "3",
          "prerequisite": "CSC 268",
          "semester": "Spring"
        },
        {
          "course_number": "CSC 499",
          "course": "Senior Seminar II",
          "credits": "2",
          "prerequisite": "CSC 498",
          "semester": "Spring"
        },
        {
          "course_number": "CSC 494",
          "course": "Digital Forensics",
          "credits": "3",
          "prerequisite": "",
          "semester": "Spring"
        },
        {
          "course_number": "HUM 205",
          "course": "Humanities Cultural Elective",
          "credits": "3",
          "prerequisite": "",
          "semester": "Spring"
        }
      ]
    };

    // Student data
    const studentsData = {
      "StudentRecords": [
        {
          "firstName": "Patricia",
          "lastName": "Owens",
          "StudentID": "0657134",
          "GPA": "3.2",
          "Classification": "Junior",
          "Degree": "Bachelor of Science",
          "Major": "Computer Science - Software Engineering Track",
          "Department": "Computer Science",
          "username": "P.Owens65385",
          "password": "Sunny!River92$Wind"
        },
        {
          "firstName": "Isabelle",
          "lastName": "Johnson",
          "StudentID": "0413840",
          "GPA": "3.75",
          "Classification": "Sophmore",
          "Degree": "Bachelor of Science",
          "Major": "Computer Science - CyberSecurity Track",
          "Department": "Computer Science",
          "username": "I.Johnson50391",
          "password": "Tiger#Moon77!Lake"
        }
      ]
    };

    // Courses taken data
    const coursesTakenData = {
      "students": [
        {
          "student_id": "0657134",
          "courses_taken": [
            "CSC 101",
            "CSC 260",
            "CSC 260L",
            "CSC 295",
            "CSC 380",
            "CSC 170",
            "CSC 170L",
            "SEM 101",
            "SEM 102"
          ]
        },
        {
          "student_id": "0413840",
          "courses_taken": [
            "CSC 101",
            "CSC 260",
            "CSC 260L",
            "CSC 295",
            "CSC 380",
            "CSC 170",
            "CSC 170L",
            "SEM 101",
            "SEM 102"
          ]
        }
      ]
    };

    // Simulate logged in student (in a real app this would come from authentication)
    const loggedInStudentId = "0413840"; // Isabelle Johnson - Cybersecurity Track
    
    // Find the student in the records
    const currentStudent = studentsData.StudentRecords.find(s => s.StudentID === loggedInStudentId);
    
    // Find courses taken by the student
    const studentCoursesTaken = coursesTakenData.students.find(s => s.student_id === loggedInStudentId)?.courses_taken || [];
    
    // Set the cybersecurity track courses
    const majorTrackCourses = cyberSecurityData.CybersecurityTrack;

    // Set the state
    setStudent(currentStudent);
    setCoursesTaken(studentCoursesTaken);
    setTrackCourses(majorTrackCourses);
    setLoading(false);
  }, []);

  // Helper function to determine the status of a course
  const getCourseStatus = (courseNumber) => {
    // Check if the course has been taken (exact match or with/without space before "L")
    const takenExact = coursesTaken.includes(courseNumber);
    const takenWithoutSpaceL = courseNumber.endsWith(" L") && 
      coursesTaken.includes(courseNumber.replace(" L", "L"));
    const takenWithSpaceL = courseNumber.endsWith("L") && 
      coursesTaken.includes(courseNumber.replace("L", " L"));
    
    if (takenExact || takenWithoutSpaceL || takenWithSpaceL) {
      return "completed";
    }
    
    // Check if the course is in progress (mock data - in real app would check against enrolled courses)
    // For demo purposes, let's assume CSC 268, MTH 251, and ENG 102 are in progress
    const inProgressCourses = ["CSC 268", "MTH 251", "ENG 102"];
    if (inProgressCourses.includes(courseNumber)) {
      return "in-progress";
    }
    
    // Otherwise, the course is not taken
    return "not-taken";
  };

  // Function to get recommended next courses based on completed prerequisites
  const getRecommendedCourses = () => {
    // Filter for courses that aren't completed or in progress
    const notTakenCourses = trackCourses.filter(course => {
      const status = getCourseStatus(course.course_number);
      return status === "not-taken";
    });
    
    // Filter for courses where prerequisites are met
    return notTakenCourses.filter(course => {
      // If no prerequisite, it's available
      if (!course.prerequisite || course.prerequisite === "") {
        return true;
      }
      
      // Check if the prerequisite course has been completed
      const prerequisite = course.prerequisite;
      return coursesTaken.includes(prerequisite);
    }).slice(0, 4); // Limit to top 4 recommendations
  };

  // Function to get current courses (in progress)
  const getCurrentCourses = () => {
    return trackCourses.filter(course => {
      const status = getCourseStatus(course.course_number);
      return status === "in-progress";
    });
  };

  // Calculate progress statistics
  const calculateProgress = () => {
    if (!trackCourses.length) return { completed: 0, inProgress: 0, remaining: 0, totalCredits: totalProgramCredits, completedCredits: 0 };
    
    let completed = 0;
    let inProgress = 0;
    let totalCredits = 0;
    let completedCredits = 0;
    
    trackCourses.forEach(course => {
      const credits = parseInt(course.credits) || 0;
      totalCredits += credits;
      
      const status = getCourseStatus(course.course_number);
      if (status === "completed") {
        completed++;
        completedCredits += credits;
      } else if (status === "in-progress") {
        inProgress++;
      }
    });
    
    return {
      completed,
      inProgress,
      remaining: trackCourses.length - completed - inProgress,
      totalCredits: totalProgramCredits, // Use the fixed total program credits
      completedCredits
    };
  };

  // Group courses by year and semester for the degree overview
  const getCoursesGroupedBySemester = () => {
    const groupedCourses = {
      "Year 1 - Fall": [],
      "Year 1 - Spring": [],
      "Year 2 - Fall": [],
      "Year 2 - Spring": [],
      "Year 3 - Fall": [],
      "Year 3 - Spring": [],
      "Year 4 - Fall": [],
      "Year 4 - Spring": []
    };
    
    // Group courses by semester based on the order and semester data
    trackCourses.forEach((course) => {
      if (course.course_number && course.semester) {
        // Sort courses into the correct semester
        if (trackCourses.indexOf(course) < 7) {
          groupedCourses["Year 1 - Fall"].push(course);
        } else if (trackCourses.indexOf(course) >= 7 && trackCourses.indexOf(course) < 13) {
          groupedCourses["Year 1 - Spring"].push(course);
        } else if (trackCourses.indexOf(course) >= 13 && trackCourses.indexOf(course) < 17) {
          groupedCourses["Year 2 - Fall"].push(course);
        } else if (trackCourses.indexOf(course) >= 17 && trackCourses.indexOf(course) < 23) {
          groupedCourses["Year 2 - Spring"].push(course);
        } else if (trackCourses.indexOf(course) >= 23 && trackCourses.indexOf(course) < 29) {
          groupedCourses["Year 3 - Fall"].push(course);
        } else if (trackCourses.indexOf(course) >= 29 && trackCourses.indexOf(course) < 33) {
          groupedCourses["Year 3 - Spring"].push(course);
        } else if (trackCourses.indexOf(course) >= 33 && trackCourses.indexOf(course) < 37) {
          groupedCourses["Year 4 - Fall"].push(course);
        } else {
          groupedCourses["Year 4 - Spring"].push(course);
        }
      }
    });
    
    return groupedCourses;
  };

  // Calculate semester credits
  const calculateSemesterCredits = (courses) => {
    return courses.reduce((total, course) => total + parseInt(course.credits || 0), 0);
  };

  const progress = calculateProgress();
  const recommendedCourses = getRecommendedCourses();
  const currentCourses = getCurrentCourses();
  const coursesBySemester = getCoursesGroupedBySemester();
  
  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="container">
      {/* Student Information Header */}
      <div className="student-header">
        <div className="student-info-container">
          <div className="student-info">
            <h1 className="student-name">{student?.firstName} {student?.lastName}</h1>
            <p className="student-id">Student ID: {student?.StudentID}</p>
            <p className="student-major">{student?.Major}</p>
            <p className="student-details">{student?.Classification} • GPA: {student?.GPA}</p>
          </div>
          <div className="degree-progress">
            <h2 className="progress-title">Degree Progress</h2>
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(progress.completedCredits / progress.totalCredits) * 100}%` }}
                ></div>
              </div>
              <span className="progress-percentage">{Math.round((progress.completedCredits / progress.totalCredits) * 100)}%</span>
            </div>
            <div className="progress-stats">
              <div className="stat">
                <p className="stat-value">{progress.completed}</p>
                <p className="stat-label">Courses Completed</p>
              </div>
              <div className="stat">
                <p className="stat-value">{progress.inProgress}</p>
                <p className="stat-label">In Progress</p>
              </div>
              <div className="stat">
                <p className="stat-value">{progress.completedCredits}/{progress.totalCredits}</p>
                <p className="stat-label">Credits</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="courses-grid">
        {/* Current Courses */}
        <div className="course-section">
          <h2 className="section-title">Current Courses</h2>
          {currentCourses.length > 0 ? (
            <ul className="course-list">
              {currentCourses.map((course, index) => (
                <li key={index} className="course-item in-progress">
                  <p className="course-name">{course.course_number} - {course.course}</p>
                  <p className="course-details">Credits: {course.credits} • {course.prerequisite ? `Prerequisite: ${course.prerequisite}` : 'No prerequisites'}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-courses">No courses currently in progress.</p>
          )}
        </div>

        {/* Recommended Next Courses */}
        <div className="course-section">
          <h2 className="section-title">Recommended Next Courses</h2>
          {recommendedCourses.length > 0 ? (
            <ul className="course-list">
              {recommendedCourses.map((course, index) => (
                <li key={index} className="course-item recommended">
                  <p className="course-name">{course.course_number} - {course.course}</p>
                  <p className="course-details">Credits: {course.credits} • {course.prerequisite ? `Prerequisite: ${course.prerequisite} (Completed)` : 'No prerequisites'}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-courses">No recommended courses available.</p>
          )}
        </div>
      </div>

      {/* Full Degree Overview */}
      <div className="degree-overview">
        <h2 className="section-title">Full Degree Overview - Cybersecurity Track</h2>
        <p className="overview-description">This overview shows your entire degree plan with course statuses based on your classification as a {student?.Classification}. Total required credits: {totalProgramCredits}.</p>
        
        <div className="status-legend">
          <div className="status-item">
            <div className="status-indicator completed"></div>
            <span>Completed</span>
          </div>
          <div className="status-item">
            <div className="status-indicator in-progress"></div>
            <span>In Progress</span>
          </div>
          <div className="status-item">
            <div className="status-indicator not-taken"></div>
            <span>Not Taken</span>
          </div>
        </div>
        
        <div className="semesters-container">
          {Object.entries(coursesBySemester).map(([semester, courses]) => (
            <div key={semester} className="semester-section">
              <div className="semester-header">
                <h3 className="semester-title">{semester}</h3>
                <span className="semester-credits">{calculateSemesterCredits(courses)} credits</span>
              </div>
              <div className="semester-courses">
                {courses.map((course, index) => {
                  const status = getCourseStatus(course.course_number);
                  return (
                    <div key={index} className={`course-card ${status}`}>
                      <div className="course-card-content">
                        <div className={`status-dot ${status}`}></div>
                        <div className="course-info">
                          <p className="course-number">{course.course_number}</p>
                          <p className="course-title">{course.course}</p>
                          <p className="course-meta">
                            {course.credits} credits
                            {course.prerequisite ? ` • Prereq: ${course.prerequisite}` : ''}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Summary */}
      <div className="program-summary">
        <h2 className="section-title">Program Summary</h2>
        <div className="summary-grid">
          <div className="summary-column">
            <h3 className="summary-subtitle">Cybersecurity Specialization</h3>
            <ul className="specialization-list">
              <li>CSC 275: Fundamentals of Cybersecurity</li>
              <li>CSC 449: Cryptography and Network Security</li>
              <li>CSC 445: Computer Network Defense</li>
              <li>CSC 313: Network Administration</li>
              <li>CSC 494: Digital Forensics</li>
            </ul>
          </div>
          <div className="summary-column">
            <h3 className="summary-subtitle">Credit Distribution</h3>
            <div className="credits-grid">
              <p className="credit-label">Core CS Credits:</p>
              <p className="credit-value">78</p>
              <p className="credit-label">Math Credits:</p>
              <p className="credit-value">14</p>
              <p className="credit-label">General Education:</p>
              <p className="credit-value">28</p>
              <p className="credit-label">Total Program Credits:</p>
              <p className="credit-value">{totalProgramCredits}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcademicTracker;