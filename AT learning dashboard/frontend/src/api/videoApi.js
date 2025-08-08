const VIDEO_API_URL = "http://localhost:5000/api/videos";
const WATCHED_API_URL = "http://localhost:5001/api/watchedvideos";

// Get all videos
export async function getAllVideos() {
  try {
    const res = await fetch(VIDEO_API_URL);
    if (!res.ok) throw new Error("Failed to fetch videos");
    const data = await res.json();
    return data.videos || [];
  } catch (err) {
    console.error("Error fetching videos:", err);
    return [];
  }
}

// Get watched videos for a user
export async function getWatchedVideos(userId) {
  try {
    const res = await fetch(`${WATCHED_API_URL}/user/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch watched videos");
    const data = await res.json();
    return data.watchedVideos || [];
  } catch (err) {
    console.error("Error fetching watched videos:", err);
    return [];
  }
}

// Mark a video as watched for a user
export async function markVideoAsWatched(userId, videoId) {
  try {
    const res = await fetch(WATCHED_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, videoId }),
    });

    if (!res.ok) throw new Error("Failed to mark video as watched");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error marking video as watched:", err);
    return null;
  }
}

