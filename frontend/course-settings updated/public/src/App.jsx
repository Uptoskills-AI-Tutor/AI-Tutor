import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Course from './component/course'
import CourseDetails from './component/CourseDetails'
import Setting from './component/settings'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="app-container">
            <div className="content-wrapper">
              <Routes>
                <Route path="/" element={<Course />} />
                <Route path="/course/:id" element={<CourseDetails />} />
                <Route path="/settings" element={<Setting />} />
              </Routes>
            </div>
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
