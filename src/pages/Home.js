import React from 'react';
import Banner from '../components/Banner';
import Highlights from '../components/Highlights';
import FeaturedCourses from '../components/FeaturedCourses';

export default function Home() {
  const bannerData = {
    title: "CLTech Coding Bootcamp",
    content: "Opportunities for everyone, everywhere",
    destination: "/courses",
    buttonLabel: "Enroll now!"
  };

  return (
    <div
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100%',
        color: 'white',
      }}
    >
      <div className="bg-dark bg-opacity-75 min-vh-100">
        {/* Hero Banner */}
        <Banner data={bannerData} />

        {/* Welcome Section */}
        <section className="py-5 text-center">
          <div className="container">
            <h1 className="display-4 fw-bold mb-3">Welcome to CLTech Bootcamp</h1>
            <p className="lead mb-4">
              Learn modern web development with hands-on projects, industry mentors, and career support.
            </p>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="py-5">
          <div className="container bg-white text-dark rounded p-4 shadow-lg">
            <h2 className="text-center mb-4 fw-semibold">Featured Courses</h2>
            <FeaturedCourses />
          </div>
        </section>

        {/* Highlights */}
        <section className="py-5">
          <div className="container bg-light text-dark rounded p-4 shadow-sm">
            <h2 className="text-center mb-4 fw-semibold">Why Choose CLTech?</h2>
            <Highlights />
          </div>
        </section>
      </div>
    </div>
  );
}
