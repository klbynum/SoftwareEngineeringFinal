import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './AcademicTracker.css';

function AcademicTracker() {
  const [studentData, setStudentData] = useState(null);
  const [coursesTaken, setCoursesTaken] = useState([]);
  const [trackCourses, setTrackCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [externalRecommendations, setExternalRecommendations] = useState([]);
  const [totalProgramCredits, setTotalProgramCredits] = useState(120);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;
  const API_TIMEOUT = 8000; // 8 seconds timeout

 


  // Improved data fetching with retry logic, timeout, and better error handling
  const fetchDataWithRetry = useCallback(async (url, options = {}, attemptNumber = 1) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (err) {
      clearTimeout(timeoutId);
      
      // Special handling for AbortController timeout
      if (err.name === 'AbortError') {
        throw new Error(`Request timed out after ${API_TIMEOUT}ms`);
      }
      
      // If we haven't exceeded max retries, try again
      if (attemptNumber < MAX_RETRIES) {
        console.log(`Retrying fetch attempt ${attemptNumber + 1} for ${url}`);
        // Exponential backoff for retries
        const delay = Math.min(1000 * Math.pow(2, attemptNumber), 10000);
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchDataWithRetry(url, options, attemptNumber + 1);
      }
      
      throw err;
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Step 1: Fetch student data - wrap in try/catch for better error isolation
      let studentDataResult;
      try {
        studentDataResult = await fetchDataWithRetry('http://localhost:5001/students');
        const currentStudent = studentDataResult.StudentRecords[0];
        setStudentData(currentStudent);
      } catch (studentErr) {
        console.error("Error fetching student data:", studentErr);
        throw new Error(`Failed to fetch student data: ${studentErr.message}`);
      }
      // Step 3: Fetch external recommendations
      try {
        const recData = await fetchDataWithRetry('http://localhost:5001/courseRec');
        const studentRecs = recData.recommendations.find(
          rec => rec.StudentID === studentDataResult.StudentRecords[0].StudentID
        );

        if (studentRecs?.recommended_courses) {
          setExternalRecommendations(studentRecs.recommended_courses);
        } else {
          setExternalRecommendations([]);
        }
      } catch (recErr) {
        console.error("Error fetching course recommendations:", recErr);
        setExternalRecommendations([]);
      }

      
      // Step 2: Fetch course data - separate try/catch
      try {
        const courseData = await fetchDataWithRetry('http://localhost:5001/courseTaken');
        
        // Step 3: Process data - moved inside success path
        const currentStudent = studentDataResult.StudentRecords[0];
        const studentId = currentStudent?.StudentID;
        const studentCourseData = courseData.students.find(s => s.student_id === studentId);
        
        if (studentCourseData) {
          setCoursesTaken(studentCourseData.courses_taken);
        }
        
        if (courseData.CybersecurityTrack) {
          setTrackCourses(courseData.CybersecurityTrack);
        }
      } catch (courseErr) {
        console.error("Error fetching course data:", courseErr);
        throw new Error(`Failed to fetch course data: ${courseErr.message}`);
      }
      
      setLoading(false);
    } catch (err) {
      console.error("Error in data fetching flow:", err);
      setError(err.message || "Failed to load data");
      setLoading(false);
      
      // Fallback to hardcoded data if API fails
      loadFallbackData();
    }
  }, [fetchDataWithRetry]);

  // Retry mechanism for API errors
  const handleRetry = useCallback(() => {
    if (retryCount < MAX_RETRIES) {
      setRetryCount(prevCount => prevCount + 1);
      setError(null);
      setLoading(true);
      fetchData();
    } else {
      setError("Maximum retry attempts reached. Using fallback data.");
      loadFallbackData();
    }
  }, [fetchData, retryCount]);

  useEffect(() => {
    fetchData();
    
    // Cleanup function to handle component unmount
    return () => {
      // Cancel any pending requests if component unmounts
      console.log("Component unmounting, cleaning up...");
    };
  }, [fetchData]);

  // Fallback function to load hardcoded data if API fails - Memoized for performance
  const loadFallbackData = useCallback(() => {
    console.log("Loading fallback data due to API failure");

    // Find the student in the records
    const currentStudent = studentsData.StudentRecords[0];
    
    // Find courses taken by the student
    const studentCoursesTaken = coursesTakenData.students[0].courses_taken;
    
    // Set the state
    setStudentData(currentStudent);
    setCoursesTaken(studentCoursesTaken);
    setTrackCourses(cyberSecurityData.CybersecurityTrack);
    setLoading(false);
  }, []);

  // Helper function to determine the status of a course - Memoized for performance
  const getCourseStatus = useCallback((courseNumber) => {
    // Check if the course has been taken (exact match or with/without space before "L")
    const takenExact = coursesTaken.includes(courseNumber);
    const takenWithoutSpaceL = courseNumber.endsWith(" L") && 
      coursesTaken.includes(courseNumber.replace(" L", "L"));
    const takenWithSpaceL = courseNumber.endsWith("L") && 
      coursesTaken.includes(courseNumber.replace("L", " L"));
    
    if (takenExact || takenWithoutSpaceL || takenWithSpaceL) {
      return "completed";
    }
    
    // Check if the course is in progress (mock data)
    // For demo purposes, let's assume CSC 268, MTH 251, and ENG 102 are in progress
    const inProgressCourses = ["CSC 268", "MTH 251", "ENG 102"];
    if (inProgressCourses.includes(courseNumber)) {
      return "in-progress";
    }
    
    // Otherwise, the course is not taken
    return "not-taken";
  }, [coursesTaken]);

  // Function to get recommended next courses based on completed prerequisites - Memoized
  const getRecommendedCourses = useCallback(() => {
    if (!trackCourses?.length || !coursesTaken?.length) {
      return [];
    }

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
  }, [trackCourses, coursesTaken, getCourseStatus]);

  // Function to get current courses (in progress) - Memoized
  const getCurrentCourses = useCallback(() => {
    if (!trackCourses?.length) {
      return [];
    }

    return trackCourses.filter(course => {
      const status = getCourseStatus(course.course_number);
      return status === "in-progress";
    });
  }, [trackCourses, getCourseStatus]);

  // Calculate progress statistics - Memoized
  const calculateProgress = useCallback(() => {
    if (!trackCourses?.length) {
      return { 
        completed: 0, 
        inProgress: 0, 
        remaining: 0, 
        totalCredits: totalProgramCredits, 
        completedCredits: 0 
      };
    }
    
    let completed = 0;
    let inProgress = 0;
    let totalCredits = 0;
    let completedCredits = studentData?.CompletedCredits || 0;
    
    trackCourses.forEach(course => {
      const credits = parseInt(course.credits) || 0;
      totalCredits += credits;
      
      const status = getCourseStatus(course.course_number);
      if (status === "completed") {
        completed++;
      } else if (status === "in-progress") {
        inProgress++;
      }
    });
    
    return {
      completed,
      inProgress,
      remaining: trackCourses.length - completed - inProgress,
      totalCredits: studentData?.TotalCredits || totalProgramCredits,
      completedCredits
    };
  }, [trackCourses, getCourseStatus, studentData, totalProgramCredits]);

  // Group courses by year and semester for the degree overview - Memoized
  const getCoursesGroupedBySemester = useCallback(() => {
    if (!trackCourses?.length) {
      return {};
    }

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
    trackCourses.forEach((course, index) => {
      if (course.course_number && course.semester) {
        // More reliable way to sort courses by semester based on index
        if (index < 7) {
          groupedCourses["Year 1 - Fall"].push(course);
        } else if (index >= 7 && index < 13) {
          groupedCourses["Year 1 - Spring"].push(course);
        } else if (index >= 13 && index < 17) {
          groupedCourses["Year 2 - Fall"].push(course);
        } else if (index >= 17 && index < 23) {
          groupedCourses["Year 2 - Spring"].push(course);
        } else if (index >= 23 && index < 29) {
          groupedCourses["Year 3 - Fall"].push(course);
        } else if (index >= 29 && index < 33) {
          groupedCourses["Year 3 - Spring"].push(course);
        } else if (index >= 33 && index < 37) {
          groupedCourses["Year 4 - Fall"].push(course);
        } else {
          groupedCourses["Year 4 - Spring"].push(course);
        }
      }
    });
    
    return groupedCourses;
  }, [trackCourses]);

  // Calculate semester credits - Memoized
  const calculateSemesterCredits = useCallback((courses) => {
    if (!courses?.length) {
      return 0;
    }
    return courses.reduce((total, course) => total + parseInt(course.credits || 0), 0);
  }, []);

  // New function to handle View Track Button click
  const handleViewTrackClick = useCallback(() => {
    // This function will be called when the View Track button is clicked
    // For now, let's just show an alert, but you can replace this with actual functionality
    alert('Viewing Cybersecurity Track Details');
    
  }, []);

  // Calculate all the data needed for rendering using memoized functions
  const progress = calculateProgress();
  const recommendedCourses = externalRecommendations;
  const currentCourses = getCurrentCourses();
  const coursesBySemester = getCoursesGroupedBySemester();
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading academic data{retryCount > 0 ? ` (Attempt ${retryCount + 1}/${MAX_RETRIES + 1})` : ''}...</p>
      </div>
    );
  }

  if (error && !studentData) {
    return (
      <div className="error-screen">
        <h2>Error Loading Data</h2>
        <p>{error}</p>
        <p>Please try refreshing the page or contact support if the problem persists.</p>
        <button onClick={handleRetry} disabled={retryCount >= MAX_RETRIES}>
          {retryCount < MAX_RETRIES ? 'Retry' : 'Maximum retries reached'}
        </button>
        <button onClick={() => window.location.reload()}>Refresh Page</button>
      </div>
    );
  }

  return (
    <div className="container">
      {error && (
        <div className="error-banner">
          <p>Warning: Using fallback data due to API error: {error}</p>
          <button className="retry-button" onClick={handleRetry} disabled={retryCount >= MAX_RETRIES}>
            Retry Connection
          </button>
        </div>
      )}
      
      {/* Student Information Header */}
      <div className="student-header">
        <div className="student-info-container">
          <div className="student-info">
            <h1 className="student-name">{studentData?.firstName} {studentData?.lastName}</h1>
            <p className="student-id">Student ID: {studentData?.StudentID}</p>
            <p className="student-major">{studentData?.Major}</p>
            <p className="student-details">{studentData?.Classification} • GPA: {studentData?.GPA}</p>
          </div>
          <div className="degree-progress">
            <h2 className="progress-title">Degree Progress</h2>
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(progress.completedCredits / progress.totalCredits) * 100}%` }}
                  aria-label={`${Math.round((progress.completedCredits / progress.totalCredits) * 100)}% complete`}
                  role="progressbar"
                  aria-valuenow={progress.completedCredits}
                  aria-valuemin="0"
                  aria-valuemax={progress.totalCredits}
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
                <li key={`current-${course.course_number}-${index}`} className="course-item in-progress">
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
                <li key={`recommended-${course.course_number}-${index}`} className="course-item recommended">
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
        <div className="degree-overview-header">
          <h2 className="section-title">Full Degree Overview - Cybersecurity Track</h2>
          <p className="overview-description">This overview shows your entire degree plan with course statuses based on your classification as a {studentData?.Classification}. Total required credits: {progress.totalCredits}.</p>
        </div>

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
                    <div key={`${semester}-${course.course_number}-${index}`} className={`course-card ${status}`}>
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

        {/* View Track Button - Added here */}
        <div className="view-track-button-container">
          <Link to='/Track' className="view-track-button" onClick={handleViewTrackClick}>
            View Track Details
          </Link>
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
              <p className="credit-value">{progress.totalCredits}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcademicTracker;