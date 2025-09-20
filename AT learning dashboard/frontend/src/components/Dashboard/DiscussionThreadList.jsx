import React from "react";
import { FaHeart, FaRegCommentDots, FaBookmark } from "react-icons/fa";

const dummyThreads = [
  {
    id: 1,
    user: "Alex Chen",
    time: "2 hours ago",
    level: "Beginner",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    question: "How to handle state management in React?",
    details:
      "I'm struggling with managing state across multiple components. Should I use Context API or Redux? What are the best practices for a medium-sized application?",
    aiSuggestion:
      "For medium-sized apps, Context API is often sufficient. Consider Redux only if you need time-travel debugging or complex state logic. Here are some resources that might help...",
    replies: [
      {
        id: 1,
        user: "Sarah Kim",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
        time: "1 hour ago",
        level: "Expert",
        content:
          "I’d recommend starting with Context API for your use case. It’s simpler and built into React. Only move to Redux if you find Context becoming unwieldy.",
      },
    ],
    likes: 12,
    saved: true,
  },
  {
    id: 2,
    user: "John Doe",
    time: "3 hours ago",
    level: "Intermediate",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    question: "How to improve React performance?",
    details:
      "What are some effective techniques to optimize React app performance?",
    aiSuggestion: "",
    replies: [],
    likes: 8,
    saved: false,
  },
  // Add more dummy threads as needed
];

const DiscussionThreadList = ({ activeTab }) => {
  // Replace "John Doe" with your current logged-in user if applicable
  const currentUser = "John Doe";

  const filteredThreads = dummyThreads.filter((thread) => {
    switch (activeTab) {
      case "Recent":
        return true;
      case "Unanswered":
        return thread.replies.length === 0;
      case "My Doubts":
        return thread.user === currentUser;
      case "Popular":
        return thread.likes > 10;
      default:
        return true;
    }
  });

  return (
    <div className="mt-10 space-y-6">
      {filteredThreads.length === 0 ? (
        <p className="text-center text-gray-500">No threads found.</p>
      ) : (
        filteredThreads.map((thread) => (
          <div
            key={thread.id}
            className="bg-white border border-gray-200 rounded-md shadow-sm p-5"
          >
            {/* Top Section: Avatar + Name + Time */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={thread.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">
                      {thread.user}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      {thread.level}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{thread.time}</span>
                </div>
              </div>
            </div>

            {/* Question Content */}
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">
                {thread.question}
              </h3>
              <p className="text-sm text-gray-700 mt-1">{thread.details}</p>
            </div>

            {/* Reactions */}
            <div className="flex gap-6 text-sm text-gray-600 mt-4">
              <span className="flex items-center gap-1">
                <FaHeart className="text-red-400" />
                {thread.likes}
              </span>
              <span className="flex items-center gap-1">
                <FaRegCommentDots />
                {thread.replies.length} replies
              </span>
              <span className="flex items-center gap-1 cursor-pointer">
                <FaBookmark />
                Save
              </span>
            </div>

            {/* AI Suggestion Block */}
            {thread.aiSuggestion && (
              <div className="mt-4 bg-blue-50 border border-blue-200 text-sm text-blue-900 p-3 rounded-md">
                <strong>💡 AI Suggestion:</strong> {thread.aiSuggestion}
              </div>
            )}

            {/* Replies */}
            {thread.replies.length > 0 && (
              <div className="mt-6 border-t pt-4 space-y-4">
                {thread.replies.map((reply) => (
                  <div key={reply.id} className="flex gap-3">
                    <img
                      src={reply.avatar}
                      alt="reply-avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800 text-sm">
                          {reply.user}
                        </span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          {reply.level}
                        </span>
                        <span className="text-xs text-gray-500">
                          {reply.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">
                        {reply.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default DiscussionThreadList;
