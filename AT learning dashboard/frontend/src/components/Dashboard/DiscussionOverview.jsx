import React, { useState } from "react";
import AskQuestionForm from "./AskQuestionForm";
import SidebarMyCourses from "./SidebarMyCourses";
import DiscussionThreadList from "./DiscussionThreadList";

// Define your tabs here or you can extract this into its own component file
const DiscussionTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["Recent", "Unanswered", "My Doubts", "Popular"];
  // useEffect(() => {
  //   const fetchThreads = async () => {
  //     try {
  //       const res = await fetch("http://localhost:5001/api/discussions");
  //       const data = await res.json();
  //       setThreadCount(data.length);
  //       setRecentThread(
  //         data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]
  //       );
  //       const uniqueAuthors = [...new Set(data.map((t) => t.author))];
  //       setUserCount(uniqueAuthors.length);
  //     } catch (err) {
  //       console.error("Failed to fetch discussion data:", err);
  //     }
  //   };

  //   fetchThreads();
  // }, []);

  return (
    <div className="flex justify-between bg-gray-100 rounded-md p-2 mt-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 text-center py-2 rounded-md text-sm transition-all duration-200 ${
            activeTab === tab
              ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

const DiscussionOverview = () => {
  const [activeTab, setActiveTab] = useState("Recent");

  return (
    <div className="flex gap-6 px-6 py-4 bg-[#f9fafb] min-h-screen text-sm">
      {/* Left Column - Ask Question + Tabs + Threads */}
      <div className="flex-1 space-y-6">
        <AskQuestionForm />

        {/* Insert tabs here */}
        <DiscussionTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Pass activeTab so DiscussionThreadList can filter */}
        <DiscussionThreadList activeTab={activeTab} />
      </div>

      {/* Right Column - My Courses Sidebar */}
      <div className="w-[300px]">
        <SidebarMyCourses />
      </div>
    </div>
  );
};

export default DiscussionOverview;

