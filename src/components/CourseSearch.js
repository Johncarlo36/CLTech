import React, { useState } from 'react';
import CourseCard from './CourseCard';  // If you're using CourseCard for rendering individual courses, you can incorporate it here.

const CourseSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false); // Adding loading state to show progress during fetch.
  const [error, setError] = useState(null); // For handling any errors during search.

  const handleSearch = async () => {
    setLoading(true);
    setError(null); // Reset previous errors
    try {
      const response = await fetch('http://localhost:4000/courses/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ courseName: searchQuery })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch courses'); // Handle failed responses.
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      setError('Error searching for courses: ' + error.message);
      console.error('Error searching for courses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Course Search</h2>
      <div className="form-group">
        <label htmlFor="courseName">Course Name:</label>
        <input
          type="text"
          id="courseName"
          className="form-control"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <div className="alert alert-danger">{error}</div>} {/* Show error message */}

      <h3>Search Results:</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {searchResults.length === 0 ? (
            <li>No courses found.</li> // Handle empty search results
          ) : (
            searchResults.map((course) => (
              <CourseCard courseProp={course} key={course._id} />
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default CourseSearch;
