// src/components/Dashboard/Header.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  ChevronDown,
  Bell,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { availableSubjects as rawSubjects } from "../../data/mockData";

const Header = ({ onMenuClick, onSignOut }) => {
  // fallback subjects
  const subjects =
    Array.isArray(rawSubjects) && rawSubjects.length
      ? rawSubjects
      : ["Computer Science", "Mathematics", "Physics", "Biology"];

  const [subjectOpen, setSubjectOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [user, setUser] = useState({ name: "User", email: "" });

  const subjBtnRef = useRef(null);
  const subjDropRef = useRef(null);
  const userBtnRef = useRef(null);
  const userDropRef = useRef(null);

  // load user from LS
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    } catch {}
  }, []);

  // click outside
  useEffect(() => {
    const onClick = (e) => {
      if (
        subjectOpen &&
        subjDropRef.current &&
        !subjDropRef.current.contains(e.target) &&
        subjBtnRef.current &&
        !subjBtnRef.current.contains(e.target)
      ) {
        setSubjectOpen(false);
      }
      if (
        userOpen &&
        userDropRef.current &&
        !userDropRef.current.contains(e.target) &&
        userBtnRef.current &&
        !userBtnRef.current.contains(e.target)
      ) {
        setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [subjectOpen, userOpen]);

  const handleSelectSubject = (s) => {
    setSelectedSubject(s);
    setSubjectOpen(false);
  };

  const handleSignOut = () => {
    if (onSignOut) return onSignOut();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-[1000] bg-white border-b">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: menu + subject */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100"
            onClick={onMenuClick}
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>

          <div className="relative">
          <button
            ref={subjBtnRef}
            onClick={() => setSubjectOpen((v) => !v)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-1 hover:bg-blue-700 transition"
          >
            {selectedSubject}
            <ChevronDown size={16} />
          </button>

          {subjectOpen && (
            <div
              ref={subjDropRef}
              className="absolute left-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-[2000] py-2 max-h-80 overflow-auto"
            >
              {subjects.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSelectSubject(s)}
                  className={`w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 ${
                    selectedSubject === s
                      ? "bg-blue-100 font-medium text-blue-800"
                      : ""
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
        </div>

        {/* Right: bell + user */}
        <div className="flex items-center gap-4 relative">
          <button className="p-2 rounded hover:bg-gray-100" aria-label="Notifications">
            <Bell size={18} className="text-gray-600" />
          </button>

          <div className="relative">
            <button
              ref={userBtnRef}
              onClick={() => setUserOpen((v) => !v)}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                {user?.name?.[0]?.toUpperCase() || <UserIcon size={16} />}
              </div>
              <span className="hidden sm:block text-gray-700">
                {user?.name || "User"}
              </span>
              <ChevronDown size={14} className="hidden sm:block text-gray-500" />
            </button>

            {userOpen && (
              <div
                ref={userDropRef}
                className="absolute right-0 mt-2 w-60 bg-white border rounded-md shadow-lg z-[2000] overflow-hidden"
              >
                <div className="px-4 py-3 border-b">
                  <p className="font-semibold text-gray-800">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email || ""}</p>
                </div>

                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
 





