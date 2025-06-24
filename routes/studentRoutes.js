const express = require('express');
const router = express.Router();

// Dummy data (replace with MongoDB queries later if needed)
router.get('/students', (req, res) => {
  res.json([
    { name: "Anuj", domain: "Backend Developement", score: 95 },
    { name: "Manu Bharti", domain: "Frontend Developement", score: 90 },
    { name: "Ganesh", domain: "Data Science", score: 87 },
    { name: "Hemlata", domain: "Data Analytics", score: 85 },
    { name: "Neelam", domain: "Cloud Computing", score: 80 },
    { name: "Aman", domain: "AI/ML", score: 77 },
    { name: "Charlie Devis", domain: "Cyber Security", score: 73 },
    { name: "Anupam", domain: "Linux", score: 70 },
    { name: "Rupa", domain: "IOT", score: 65 },
  ]);
});

router.get('/active-students', (req, res) => {
  res.json([
    {
      name: "Anuj",
      domain: "Backend Developement",
      modules: "18/20 modules",
      weeks: "9 weeks active",
      percent: "90%",
      status: "ALMOST DONE!",
      grade: "Excellent",
    },
    {
      name: "Manu Bharti",
      domain: "Frontend Developement",
      modules: "17/20 modules",
      weeks: "8 weeks active",
      percent: "89%",
      status: "ALMOST DONE!",
      grade: "Excellent",
    },
    {
      name: "Ganesh",
      domain: "Data Science",
      modules: "16/20 modules",
      weeks: "6 weeks active",
      percent: "85%",
      status: "ALMOST DONE!",
      grade: "Very Good",
    },
    {
      name: "Hemlata",
      domain: "Data Analytics",
      modules: "15/20 modules",
      weeks: "5 weeks active",
      percent: "84%",
      status: "ALMOST DONE!",
      grade: "Very Good",
    },
    {
      name: "Neelam",
      domain: "Cloud Computing",
      modules: "12/20 modules",
      weeks: "4 weeks active",
      percent: "80%",
      status: "DONE!",
      grade: "Good",
    },
    {
      name: "Aman",
      domain: "AI/ML",
      modules: "11/20 modules",
      weeks: "4 weeks active",
      percent: "78%",
      status: "DONE!",
      grade: "Good",
    },
    {
      name: "Charlie Devis",
      domain: "Cyber Security",
      modules: "10/20 modules",
      weeks: "3 weeks active",
      percent: "75%",
      status: "DONE!",
      grade: "Good",
    },
  ]);
});

router.get('/recent-activity', (req, res) => {
  res.json([
    {
      name: "Anuj",
      domain: "Backend Developement Module",
      activity: "About 3 hours ago",
    },
    {
      name: "Manu Bharti",
      domain: "Frontend Developement Module",
      activity: "About 2 hours ago",
    },
    {
      name: "Ganesh",
      domain: "Data Analytics Certificate",
      activity: "About 1 hours ago",
    },
    {
      name: "Hemlata",
      domain: "Cloud Computing",
      activity: "About 50 minutes ago",
    },
    {
      name: "Neelam",
      domain: "AI/ML Certificate",
      activity: "About 45 minutes ago",
    },
    {
      name: "Aman",
      domain: "Cyber Security Certificate",
      activity: "About 44 minutes ago",
    },
    {
      name: "Charlie Devis",
      domain: "Linux Certificate",
      activity: "About 41 minutes ago",
    },
    {
      name: "Anupam",
      domain: "Data Analytics Certificate",
      activity: "About 40 minutes ago",
    },
    {
      name: "Smith",
      domain: "Fullstack Webdevlopment Certificate",
      activity: "About 35 minutes ago",
    },
    {
      name: "Bob",
      domain: "SaaS Certificate",
      activity: "About 30 minutes ago",
    },
    {
      name: "Bobith",
      domain: "Cloud Computing Certificate",
      activity: "About 10 minutes ago",
    },
    {
      name: "Boby",
      domain: "Complete Data Analysis Module",
      activity: "About 3 minutes ago",
    },
  ]);
});

module.exports = router;
