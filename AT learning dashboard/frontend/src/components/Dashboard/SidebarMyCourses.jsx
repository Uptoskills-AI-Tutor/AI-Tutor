import React from "react";

import courses from "../../data/mockData";

const SidebarMyCourses = () => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border h-full flex flex-col">
      <h2 className="text-base font-semibold mb-4">My Courses</h2>
      <div className="space-y-4 flex-1 overflow-y-auto">
        {courses.map((course, index) => (
          <div key={index} className="flex items-center gap-3">
            <img
              src={course.image}
              alt={course.title}
              className="w-12 h-12 rounded-md object-cover"
            />
            <div className="flex-1">
              <p className="font-medium text-sm">{course.title}</p>
              <p className="text-xs text-gray-500">{course.lesson}</p>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                <div
                  className="h-2 bg-primary-500 rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarMyCourses;
