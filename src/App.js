import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // ✅ applies global styles

import AppNavbar from './components/AppNavbar';

import Home from './pages/Home';
import Courses from './pages/Courses';
import Register from './pages/Register';
import News from './pages/News';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import Profile from './pages/Profile';
import CourseView from './pages/CourseView';
import AddCourse from './pages/AddCourse';

import { UserProvider } from './context/UserContext';

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  function unsetUser() {
    localStorage.clear();
    setUser({ id: null, isAdmin: null });
  }

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      fetch('http://localhost:4000/users/details', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => {
          setUser({
            id: data._id,
            isAdmin: data.isAdmin
          });
        })
        .catch(err => console.error("Fetch error:", err));
    }
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <Router>
          <AppNavbar />
          <Container className="py-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/news" element={<News />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/addCourse" element={<AddCourse />} />
              <Route path="/courses/:courseId" element={<CourseView />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </Container>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
