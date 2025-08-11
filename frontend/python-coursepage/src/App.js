import React, { useState } from 'react';
import Header from './components/Header';
import CourseInfo from './components/CourseInfo';
import Tabs from './components/Tabs';
import EnrollmentForm from './components/EnrollmentForm';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);

  const openEnrollmentForm = () => {
    setShowEnrollmentForm(true);
  };

  const closeEnrollmentForm = () => {
    setShowEnrollmentForm(false);
  };

  return (
    <div className="app-container">
      <Header onEnrollClick={openEnrollmentForm} />
      <CourseInfo onEnrollClick={openEnrollmentForm} />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {showEnrollmentForm && <EnrollmentForm onClose={closeEnrollmentForm} />}
    </div>
  );
}

export default App;
