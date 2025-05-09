import CourseCard from '@/components/CourseCard';
import courses from '@/data/courses';
import React from 'react';

const Courses = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 pt-20 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-4 animate-fade-in-down">
              Discover Our Courses
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto animate-fade-in-up">
              Explore our curated selection of courses to boost your skills and
              career. Whether you're a beginner or an expert, we have something just
              for you.
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {courses?.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
