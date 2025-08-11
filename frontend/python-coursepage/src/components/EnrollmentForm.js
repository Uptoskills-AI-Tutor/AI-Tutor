import React, { useState } from 'react';
import './EnrollmentForm.css';

function EnrollmentForm({ onClose }) {
  const [formData, setFormData] = useState({
    courseId: '',
    studentId: '',
    phoneNumber: '',
    educationLevel: '',
    programmingExperience: 'Complete Beginner',
    goals: [],
    company: '',
    referralCode: '',
    motivation: '',
    termsAccepted: false,
    receiveUpdates: false,
    moneyBackPolicy: false,
    enrollmentOption: 'Free Access',
  });

  const educationLevels = [
    'Select Education Level',
    'High School',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD',
  ];

  const programmingExperienceOptions = [
    'Complete Beginner',
    'Some Experience',
    'Intermediate',
    'Advanced',
  ];

  const goalsOptions = [
    'Master Python fundamentals',
    'Build data analysis projects',
    'Create automation scripts',
    'Develop web applications with Django/Flask',
    'Learn machine learning basics',
    'Prepare for Python certification',
    'Start Python freelancing career',
    'Build AI/ML projects',
  ];

  const enrollmentOptions = [
    {
      name: 'Free Access',
      price: '$0',
      features: [
        'Basic Python content',
        'Community access',
        '5 beginner projects',
        'Python syntax basics',
      ],
      buttonText: 'Start Free',
    },
    {
      name: 'Full Course',
      price: '$149',
      features: [
        'Complete Python curriculum',
        '50+ hands-on projects',
        'AI Tutor & mentor support',
        'Python certification',
        'Lifetime access',
        'Advanced topics included',
      ],
      buttonText: 'Enroll Now',
      recommended: true,
    },
    {
      name: 'Pro Subscription',
      price: '$39/month',
      features: [
        'Full course access',
        'Live coding sessions',
        'Career guidance',
        'Cancel anytime',
        'Interview prep',
      ],
      buttonText: 'Subscribe',
    },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'goals') {
      let newGoals = [...formData.goals];
      if (checked) {
        newGoals.push(value);
      } else {
        newGoals = newGoals.filter(goal => goal !== value);
      }
      setFormData({ ...formData, goals: newGoals });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the form data
    console.log('Enrollment Data:', formData);
    alert('Enrollment submitted! Thank you.');
    onClose();
  };

  return (
    <div className="enrollment-form-overlay">
      <div className="enrollment-form-container">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Enroll in Python Programming Course</h2>
        <p>Join thousands of students mastering Python programming from basics to advanced</p>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Personal Information</legend>
            <label>
              CourseID *
              <input type="text" name="courseId" value={formData.courseId} onChange={handleChange} required />
            </label>
            <label>
              StudentID *
              <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} required />
            </label>
            <label>
              Phone Number
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </label>
            <label>
              Highest Education Level
              <select name="educationLevel" value={formData.educationLevel} onChange={handleChange}>
                {educationLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </label>
          </fieldset>

          <fieldset>
            <legend>Your Programming Experience</legend>
            {programmingExperienceOptions.map(option => (
              <label key={option} className="radio-label">
                <input
                  type="radio"
                  name="programmingExperience"
                  value={option}
                  checked={formData.programmingExperience === option}
                  onChange={handleChange}
                />
                {option}
              </label>
            ))}
          </fieldset>

          <fieldset>
            <legend>What do you want to achieve? (Select all that apply)</legend>
            {goalsOptions.map(goal => (
              <label key={goal} className="checkbox-label">
                <input
                  type="checkbox"
                  name="goals"
                  value={goal}
                  checked={formData.goals.includes(goal)}
                  onChange={handleChange}
                />
                {goal}
              </label>
            ))}
          </fieldset>

          <fieldset>
            <legend>Additional Information</legend>
            <label>
              Company/Organization (Optional)
              <input type="text" name="company" value={formData.company} onChange={handleChange} />
            </label>
            <label>
              Referral Code (Optional)
              <input type="text" name="referralCode" value={formData.referralCode} onChange={handleChange} />
            </label>
            <label>
              Why are you taking this course?
              <textarea name="motivation" value={formData.motivation} onChange={handleChange} placeholder="Tell us about your motivation and goals..." />
            </label>
          </fieldset>

          <fieldset>
            <legend>Choose Your Enrollment Option</legend>
            <div className="enrollment-options">
              {enrollmentOptions.map(option => (
                <div
                  key={option.name}
                  className={`enrollment-option ${formData.enrollmentOption === option.name ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, enrollmentOption: option.name })}
                >
                  {option.recommended && <div className="recommended-badge">RECOMMENDED</div>}
                  <h4>{option.name}</h4>
                  <p className="price">{option.price}</p>
                  <ul>
                    {option.features.map(feature => (
                      <li key={feature}>✓ {feature}</li>
                    ))}
                  </ul>
                  <button type="button" className="option-btn">{option.buttonText}</button>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Terms and Conditions</legend>
            <label>
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                required
              />
              I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>
            </label>
            <label>
              <input
                type="checkbox"
                name="receiveUpdates"
                checked={formData.receiveUpdates}
                onChange={handleChange}
              />
              I want to receive course updates and learning tips via email
            </label>
            <label>
              <input
                type="checkbox"
                name="moneyBackPolicy"
                checked={formData.moneyBackPolicy}
                onChange={handleChange}
              />
              I understand the 30-day money-back guarantee policy
            </label>
          </fieldset>

          <button type="submit" className="submit-btn">Complete Enrollment 🚀</button>
        </form>
      </div>
    </div>
  );
}

export default EnrollmentForm;
