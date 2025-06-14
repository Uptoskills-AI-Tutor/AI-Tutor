import "./App.css";
import QuickActions from "./components/quickActions";
import { useState } from "react";

function App() {
  const [viewAll, setViewAll] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [visible, setVisible] = useState(false);

  const students = [
    { name: "Anuj", domain: "Backend Developement", score: 95 },
    { name: "Manu Bharti", domain: "Frontend Developement", score: 90 },
    { name: "Ganesh", domain: "Data Science", score: 87 },
    { name: "Hemlata", domain: "Data Analytics", score: 85 },
    { name: "Neelam", domain: "Cloud Computing", score: 80 },
    { name: "Aman", domain: "AI/ML", score: 77 },
    { name: "Charlie Devis", domain: "Cyber Security", score: 73 },
    { name: "Anupam", domain: "Linux", score: 70 },
    { name: "Rupa", domain: "IOT", score: 65 },
  ];

  const activeStudents = [
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
  ];

  const recentlyActive = [
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
  ];

  const visibleStudents = viewAll ? students : students.slice(0, 3);
  const showStudents = showAll ? activeStudents : activeStudents.slice(0, 2);
  const displayStudents = visible ? recentlyActive : recentlyActive.slice(0, 2);

  return (
    <div>
      <div className="admin_header">
        <div className="main_heading">
          <h1>EduAdmin Pro</h1>
          <p>Advanced Student Management Platform</p>
        </div>
        <div className="profile_name">
          <h2>Alex Thompson</h2>
          <p>System Administrator</p>
        </div>
      </div>

      <div className="dashboard_overview">
        <h1>Dashboard Overview</h1>
        <p>
          Real-time insights into student performance, course progress, and
          institutional analytics
        </p>
      </div>

      <div className="cards_container">
        <div className="card">
          <div className="left-content">
            <p>Total Student</p>
            <div className="increase_percent">
              <h1>248</h1>
              <p className="increase">↑ +12%</p>
            </div>
            <br />
            <progress max={100} value={85} className="student"></progress>
          </div>
          <div className="right-content"></div>
        </div>

        <div className="card">
          <div className="left-content">
            <p>ACTIVE COURSES</p>
            <div className="increase_percent">
              <h1>12</h1>
              <p className="increase">↑ +8%</p>
            </div>
            <br />

            <progress max={100} value={35} className="student"></progress>
          </div>
          <div className="right-content"></div>
        </div>

        <div className="card">
          <div className="left-content">
            <p>AVG. COMPLETION</p>
            <div className="increase_percent">
              <h1>73%</h1>
              <p className="increase">↑ +15%</p>
            </div>
            <br />

            <progress max={100} value={73} className="student"></progress>
          </div>
          <div className="right-content"></div>
        </div>

        <div className="card">
          <div className="left-content">
            <p>CERTIFICATES</p>
            <div className="increase_percent">
              <h1>50</h1>
              <p className="increase">↑ +23%</p>
            </div>
            <br />
            <progress max={100} value={50} className="student"></progress>
          </div>
          <div className="right-content"></div>
        </div>
      </div>

      <div className="top_progress">
        <div className="top_performer">
          <div className="top_performer_heading">
            <div className="performer_left_content">
              <h2>Top Performer</h2>
              <p>Student Leaderboard</p>
            </div>
            <div className="performer_right_content">
              <button className="view-btn" onClick={() => setViewAll(!viewAll)}>
                {viewAll ? "View Less" : "View All"}
              </button>
            </div>
          </div>
          {visibleStudents.map((students, index) => (
            <div className="top_performer_subheading orange">
              <div className="performer_left_subcontent">
                <h2>{students.name}</h2>
                <p>{students.domain}</p>
              </div>
              <div className="performer_right_content">
                <h1>{students.score}</h1>
                <p>SCORE</p>
              </div>
            </div>
          ))}
        </div>

        <div className="progress_tracker">
          <div className="progress_tracker_heading">
            <div className="performer_left_content">
              <h2>Progress Tracker</h2>
              <p>Student Learning Journey</p>
            </div>
            <div className="performer_right_content">
              <button className="view-btn" onClick={() => setShowAll(!showAll)}>
                {showAll ? "View Less" : "View All"}
              </button>
            </div>
          </div>
          {showStudents.map((activeStudents, index) => (
            <div className="progress_tracker_subheading">
              <div className="progress_tracker_content">
                <div className="performer_left_subcontent">
                  <h2>{activeStudents.name}</h2>
                  <p>{activeStudents.domain}</p>
                </div>
                <div className="performer_right_subcontent">
                  <p>{activeStudents.grade}</p>
                  <h1>{activeStudents.percent}</h1>
                </div>
              </div>
              <div className="progress_update">
                <div className="progress_left_update">
                  <span>{activeStudents.modules}</span>
                  <span>{activeStudents.weeks}</span>
                </div>
                <div className="progress_right_update">
                  <p>{activeStudents.status}</p>
                </div>
              </div>
            </div>
          ))}
          {/* <div className='progress_tracker_subheading'>
          <div className='progress_tracker_content'>
            <div className='performer_left_subcontent'>
            <h2>Anuj</h2>
            <p>Backend Developement</p>
          </div>
          <div className='performer_right_subcontent'>
            <p>Excellent</p>
            <h1>90%</h1>
          </div>
          </div>
          <div className='progress_update'>
            <div className='progress_left_update'>
              <span>18/20 modules</span>
              <span>9 weeks active</span>
            </div>
            <div className='progress_right_update'>
              <p>ALMOST DONE!</p>
            </div>

          </div>
        </div> */}

          {/* <div className='progress_tracker_subheading'>
          <div className='progress_tracker_content'>
            <div className='performer_left_subcontent'>
            <h2>Manu Bharti</h2>
            <p>Frontend Developement</p>
          </div>
          <div className='performer_right_subcontent'>
            <p>Excellent</p>
            <h1>89%</h1>
          </div>
          </div>

          <div className='progress_update'>
            <div className='progress_left_update'>
              <span>17/20 modules</span>
              <span>8 weeks active</span>
            </div>
            <div className='progress_right_update'>
              <p>ALMOST DONE!</p>
            </div>

          </div>
        </div> */}

          {/* <div className='progress_tracker_subheading'>
          <div className='progress_tracker_content'>
            <div className='performer_left_subcontent'>
            <h2>Ganesh</h2>
            <p>Data Science</p>
          </div>
          <div className='performer_right_subcontent'>
            <p>Very Good</p>
            <h1>85%</h1>
          </div>
          </div>
          <div className='progress_update'>
            <div className='progress_left_update'>
              <span>16/20 modules</span>
              <span>6 weeks active</span>
            </div>
            <div className='progress_right_update'>
              <p>ALMOST DONE!</p>
            </div>

          </div>
        </div> */}

          {/* <div className='progress_tracker_subheading'>
          <div className='progress_tracker_content'>
            <div className='performer_left_subcontent'>
            <h2>Hemlata</h2>
            <p>Data Analytics</p>
          </div>
          <div className='performer_right_subcontent'>
            <p>Very Good</p>
            <h1>84%</h1>
          </div>
          </div>
          <div className='progress_update'>
            <div className='progress_left_update'>
              <span>15/20 modules</span>
              <span>5 weeks active</span>
            </div>
            <div className='progress_right_update'>
              <p>ALMOST DONE!</p>
            </div>

          </div>
        </div> */}

          {/* <div className='progress_tracker_subheading'>
          <div className='progress_tracker_content'>
            <div className='performer_left_subcontent'>
            <h2>Neelam</h2>
            <p>Cloud Computing</p>
          </div>
          <div className='performer_right_subcontent'>
            <p>Good</p>
            <h1>80%</h1>
          </div>
          </div>
          <div className='progress_update'>
            <div className='progress_left_update'>
              <span>12/20 modules</span>
              <span>4 weeks active</span>
            </div>
            <div className='progress_right_update'>
              <p>DONE!</p>
            </div>

          </div>
        </div> */}

          {/* <div className='progress_tracker_subheading'>
          <div className='progress_tracker_content'>
            <div className='performer_left_subcontent'>
            <h2>Aman</h2>
            <p>AI/ML</p>
          </div>
          <div className='performer_right_subcontent'>
            <p>Good</p>
            <h1>78%</h1>
          </div>
          </div>
          <div className='progress_update'>
            <div className='progress_left_update'>
              <span>11/20 modules</span>
              <span>4 weeks active</span>
            </div>
            <div className='progress_right_update'>
              <p>DONE!</p>
            </div>

          </div>
        </div> */}

          {/* <div className='progress_tracker_subheading'>
          <div className='progress_tracker_content'>
            <div className='performer_left_subcontent'>
            <h2>Charlie Devis</h2>
            <p>Cyber Security</p>
          </div>
          <div className='performer_right_subcontent'>
            <p>Good</p>
            <h1>75%</h1>
          </div>
          </div>
          <div className='progress_update'>
            <div className='progress_left_update'>
              <span>10/20 modules</span>
              <span>3 weeks active</span>
            </div>
            <div className='progress_right_update'>
              <p>DONE!</p>
            </div>
          </div>
        </div> */}
        </div>
      </div>

      <div className="container">
        {/* <!-- Recent Activity --> */}
        <div className="recent-activity">
          <div className="header">
            <div>
              <h2>Recent Activity</h2>
              <p>Latest Student Actions</p>
            </div>
            <button className="view-btn" onClick={() => setVisible(!visible)}>
              {visible ? "View Less" : "View All"}
            </button>
          </div>

          {displayStudents.map((recentlyActive, index) => (
            <div className="activity-card green">
              <div className="icon">&#x1F3C6;</div>
              <div>
                <h3>{recentlyActive.name}</h3>
                <p>{recentlyActive.domain}</p>
                <span className="time">{recentlyActive.activity}</span>
              </div>
            </div>
          ))}
        </div>

        {/* <!-- Quick Actions --> */}
        {/* <div className="quick-actions"> */}
        {/* <div className="header orange">
        <h2>Quick Actions</h2>
        <p>Instant Admin Tools</p>
      </div> */}

        {/* <div className="quick-card blue">
        <div className="quick-icon blue">&#x1F465;</div>
        <div>
          <h3>Add New Student</h3>
          <p>Register & Enroll Students</p>
        </div>
      </div> */}

        {/* <div className="quick-card green">
        <div className="quick-icon green">➕</div>
        <div>
          <h3>Create Course</h3>
          <p>Design New Curriculum</p>
        </div>
      </div> */}

        {/* <div className="quick-card orange">
        <div className="quick-icon orange">&#x1F4CA;</div>
        <div>
          <h3>Generate Report</h3>
          <p>Analytics & Insights</p>
        </div>
      </div> */}

        {/* <div className="quick-card blue">
        <div className="quick-icon blue">&#x1F465;</div>
        <div>
          <h3>Remove a Student</h3>
          <p>Remove or Delete students</p>
        </div>
      </div> */}

        {/* <div className="quick-card blue">
        <div className="quick-icon blue">&#x1F465;</div>
        <div>
          <h3>Black List a Student</h3>
          <p>Restrict students</p>
        </div>
      </div> */}

        {/* <div className="quick-card blue">
        <div className="quick-icon blue">&#x1F465;</div>
        <div>
          <h3>Categorise Students</h3>
          <p>Add Students</p>
        </div>
      </div> */}
        <div className="quick-actions">
          <QuickActions />
        </div>

        {/* </div> */}
      </div>
    </div>
    // </div>
  );
}

export default App;
