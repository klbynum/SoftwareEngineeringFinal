import React, { useEffect, useState } from 'react';
import '../Home/Home.css';

function CourseSearch() {
  const [courses, setCourses] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/cybersecurityTrack')
      .then(res => res.json())
      .then(data => {
        const list = data?.CybersecurityTrack || [];
        setCourses(list);
        setFilteredCourses(list);
      })
      .catch(err => console.error('Failed to fetch courses:', err));
  }, []);

  const handleSearch = () => {
    console.log("Search Input:", searchInput);
    const value = searchInput.toLowerCase();
    const filtered = courses.filter(course =>
      course.course_number.toLowerCase().includes(value) ||
      course.course.toLowerCase().includes(value)
    );
    setFilteredCourses(filtered);
    console.log("Filtered Courses:", filtered);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="page">
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">Course Search</div>
        </div>
      </nav>

      <div className="content-wrapper">
        <div className="search-container">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search by course number or name..."
            className="search-input"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="search-button"
          >
            Search
          </button>
        </div>

        {filteredCourses.length === 0 ? (
          <p>No matching courses found.</p>
        ) : (
          <ul className="course-list">
            {filteredCourses.map((course, index) => (
              <li key={index} className="course-item">
                <strong>{course.course_number || 'TBD'}:</strong> {course.course} – {course.credits} credits ({course.semester || 'N/A'})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CourseSearch;
