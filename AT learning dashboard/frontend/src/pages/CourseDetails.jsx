/// src/pages/CourseDetails.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data/Courses';

const CourseDetails = () => {
  const { id } = useParams();
  const course = courses.find((c) => String(c.id) === String(id));

  const [notes, setNotes] = useState('');
  const storageKey = `course:${id}:notes`;

  // Load notes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setNotes(saved);
  }, [storageKey]);

  // Save notes automatically
  useEffect(() => {
    localStorage.setItem(storageKey, notes);
  }, [notes, storageKey]);

  if (!course) {
    return (
      <div className="p-6">
        <p>Course not found.</p>
        <Link to="/app/courses" className="text-blue-600 underline">
          Back
        </Link>
      </div>
    );
  }

  const progress =
    typeof course.progress === 'number'
      ? course.progress
      : Math.round(((course.lessonsCompleted || 0) / (course.totalLessons || 1)) * 100);

  // Normalize external links
  const externalLinks = useMemo(() => {
    if (Array.isArray(course.resources) && course.resources.length > 0) {
      return course.resources;
    }
    if (course.notesLink) {
      return [{ label: 'Open Notes Website', url: course.notesLink }];
    }
    return [];
  }, [course]);

  const handleDownload = () => {
    const blob = new Blob([notes], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${course.title}_notes.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleClear = () => {
    const ok = window.confirm('Clear all your notes for this course?');
    if (ok) setNotes('');
  };

  return (
    <div className="p-6">
      <Link to="/app/courses" className="text-blue-600 underline text-sm">
        &larr; Back to Courses
      </Link>

      <h1 className="text-2xl font-bold mt-4 mb-2">{course.title}</h1>

      <p className="mb-2 text-gray-600">
        {course.lessonsCompleted} / {course.totalLessons} lessons ({progress}%)
      </p>

      <div className="w-full h-2 bg-gray-200 rounded mb-6">
        <div className="h-2 bg-blue-600 rounded" style={{ width: `${progress}%` }} />
      </div>

      {/* 🔵 Highly visible notes link block placed ABOVE the textarea */}
      {externalLinks.length > 0 && (
        <div className="mb-6 p-4 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <h2 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-300">
            Reference Notes / Resources
          </h2>
          <div className="flex flex-wrap gap-2">
            {externalLinks.map((l, idx) => (
              <a
                key={idx}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                {l.label || l.url} ↗
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Personal Notes Section */}
      <h2 className="text-lg font-semibold mb-2">Your Notes</h2>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your notes here..."
        className="w-full h-40 border p-2 rounded mb-4 bg-white text-black"
      />

      <button
        onClick={handleDownload}
        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 mr-2"
      >
        Download Notes
      </button>

      <button
        onClick={handleClear}
        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
      >
        Clear Notes
      </button>
    </div>
  );
};

export default CourseDetails;


