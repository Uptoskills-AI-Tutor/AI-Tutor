const BASE_URL = 'http://localhost:5000/api/coursevideos';

// Get all course videos
export const getAllCourseVideos = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch course videos');
  return res.json();
};

// Create a new course video
export const createCourseVideo = async (videoData) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(videoData),
  });
  if (!res.ok) throw new Error('Failed to create course video');
  return res.json();
};

// Delete a course video
export const deleteCourseVideo = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete course video');
  return res.json();
};
