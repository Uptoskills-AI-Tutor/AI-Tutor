// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import { UserProvider } from "./context/UserContext.jsx";

import Layout from "./components/Dashboard/Layout.jsx";
import Dashboard1 from "./components/Dashboard/Dashboard1.jsx";

import Courses from "./pages/Courses.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import Analytics from "./pages/Analytics.jsx";
import Discussion from "./pages/Discussion.jsx";
import Settings from "./pages/Settings.jsx";

import Login from "./components/Dashboard/Login.jsx";
import Signup from "./components/Dashboard/Signup.jsx";
import RequireAuth from "./auth/RequireAuth.jsx";

import LearningVideos from "./pages/VideoGallery.jsx"; // ✅ Video gallery
import CourseDoubt from "./pages/CourseDoubt"; // ✅ Doubt Room

import { initAuth } from "./api/auth";

// Run cleanup before the router renders
if (typeof initAuth === "function") {
  initAuth();
} else {
  const token = localStorage.getItem("token");
  if (!token || token === "undefined" || token === "null") {
    localStorage.removeItem("token");
  }
}

// 404 Page
function NotFound() {
  return (
    <div className="p-10 text-center space-y-2">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-gray-500">Page not found.</p>
    </div>
  );
}

// Public-only route protection
function PublicOnlyRoute() {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/app" replace /> : <Outlet />;
}

function App() {
  return (
    <UserProvider>
      <div className="min-h-screen">
        <Router>
          <Routes>
            {/* Default to /login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Public routes */}
            <Route element={<PublicOnlyRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            {/* Protected routes */}
            <Route element={<RequireAuth />}>
              <Route path="/app/*" element={<Layout />}>
                <Route index element={<Dashboard1 />} />

                {/* Course related */}
                <Route path="courses" element={<Courses />} />
                <Route path="courses/:id" element={<CourseDetails />} />

                {/* Doubt Room */}
                <Route path="doubts" element={<CourseDoubt />} /> {/* ✅ Added */}

                {/* Others */}
                <Route path="discussion" element={<Discussion />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<Settings />} />

                {/* Video Gallery */}
                <Route path="videos" element={<LearningVideos />} />

                {/* Catch-all under /app */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Route>

            {/* Global 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;





