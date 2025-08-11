import React from 'react';
import './CourseInfo.css';
import courseImage from '../assets/pyimage.png'; // Updated image path

function CourseInfo({ onEnrollClick }) {
  return (
    <section className="course-info">
      <div className="course-text">
        <div className="rating">
          <span className="stars">★★★★★</span>
          <span className="rating-text">5.0 (986 reviews)</span>
        </div>
        <h1>Python Programming</h1>
        <p>
          Learn Python programming from basics to advanced concepts with hands-on projects. Our AI Tutor personalized guidance and feedback to help you master python programming skills at your own pace.
        </p>
        <ul className="features-list">
          <li> Comprehensive Curriculum</li>
          <li> Hands-On Projects</li>
          <li> Expert Instructors</li>
          <li> Career-Ready Skills</li>
        </ul>
        <div className="buttons">
          <button className="enroll-now" onClick={onEnrollClick}>Enroll Now</button>
          <button className="see-curriculum">See Curriculum</button>
        </div>
      </div>
      <div className="course-image-container">
        <img
          src={courseImage}
          alt="Python Course"
          width={600}
          height={400}
          className="course-image"
        />
        <div className="play-button">&#9658;</div>
      </div>
    </section>
  );
}

export default CourseInfo;
