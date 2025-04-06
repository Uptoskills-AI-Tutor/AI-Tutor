import { useState } from 'react'
import './App.css'
import Course from './component/course'
import Setting from './component/settings'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="app-container">
          <div className="content-wrapper">
            <Course />
            <Setting />
          </div>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
