import { useState, useEffect, useContext } from 'react';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import UserContext from '../context/UserContext'; 
import AdminView from '../components/AdminView';
import UserView from '../components/UserView';
import CourseCard from '../components/CourseCard';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useContext(UserContext); 


  const fetchData = () => {

    const url = user.isAdmin 
    ? 'http://localhost:4000/courses/all' 
    : 'http://localhost:4000/courses/';

  const options = user.isAdmin
    ? {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    : {};

  fetch(url, options)
    .then(res => res.json())
    .then(data => {
      console.log("Fetched courses:", data); // Debug output
      if (Array.isArray(data)) {
        setCourses(data);
      } else {
        console.warn("Expected array, got:", data);
        setCourses([]); // fallback
      }
    })
    .catch(err => {
      console.error("Fetch error:", err);
      setCourses([]); // fallback
    });
  }

  useEffect(() => {
    fetchData();
}, [user.isAdmin]);

return (
  <>

    {/* this will become a reusable component to display the different courses in mock database */}
    {/* In the CourseCard component, we will be sending the coursesData[0] information stored in the propname "courseProp" */}
    {/* 
      courseProp = {id: 'wdc001', name: 'PHP - Laravel', description: 'Nostrud v
      dolor excepteur ullamco consectetur ...uat nostrud id nostrud sint sint dese
      dolore.', price: 45000, onOffer: true}
    */}

    {/*<CourseCard courseProp={coursesData[0]} />*/}

    {
      (user.isAdmin === true) ?
      <AdminView coursesData={courses} fetchData={fetchData}/>
      :
      <UserView coursesData={courses}/>
    }
  </>
);
};

export default Courses;