import { useState } from "react";
import { Star } from "lucide-react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import Coursera from "../assets/Coursera.png";

const courses = [
  {
    id: 1,
    title: "English Lecture",
    description: "Language lessons with the most popular teachers",
    category: ["Languages"],
    startDate: "20 July",
    rating: 4.5,
    image: Coursera,
  },
  {
    id: 2,
    title: "Design Strategy",
    description:
      "Lesson on planning a design concept and proper planning of work.",
    category: ["UI/UX Design", "Web Design"],
    startDate: "22 July",
    rating: 4.0,
    image: Coursera,
  },
  {
    id: 3,
    title: "Business Lecture",
    description:
      "Lectures on how to build your business safely without fear of new projects.",
    category: ["Marketing", "Finance"],
    startDate: "26 July",
    rating: 4.2,
    image: Coursera,
  },
];



export default function CourseList() {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [selectedDate, setSelectedDate] = useState("06");

  return (
    <div className="flex gap-x-6">
      <div className="max-w-3xl mx-auto p-6 w-1/2">
     <div className="relative w-full">
      <Search className="absolute left-3 top-1/5 transform -translate-y-1/2 text-gray-500" size={20} />
      <input
        type="text"
        placeholder="Search here ..."
        className="w-full pl-10 p-2 border-b-2 mb-4 rounded-lg shadow-sm border-gray-300 focus:outline-none focus:border-blue text-black placeholder-gray-500"
      />
      </div>

      <div className="pt-12">
  <h1 className="text-black font-bold text-[30px]">MY COURSES</h1>
</div>


      {/* Tabs */}
      <div className="flex gap-4 mb-4 text-lg font-semibold">
        {["All", "Active", "Upcoming", "Completed"].map((tab) => (
          <button
            key={tab}
            className={`pb-2 ${
              activeTab === tab
                ? "border-b-2 border-blue text-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Course List */}
      <div className="space-y-6 py-6 ">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex bg-white shadow-lg rounded-xl overflow-hidden border-1 border-black rounded-lg p-2"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-24 h-24 object-cover mt-[10px]"
            />
            <div className="p-4 flex-1">
              <h2 className="text-gray-900 text-lg font-bold">{course.title}</h2>
              <p className="text-gray-600 text-sm">{course.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {course.category.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-gray-400 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-gray-500 text-sm">
                Start: <span className="font-semibold">{course.startDate}</span>
              </p>
            </div>
            <div className="flex items-center pr-4 mt-[-90px]">
              <Star className="text-blue-500 " size={16} />
              <span className="ml-1 text-blue-500 text-sm font-bold">{course.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    


    <div className="w-1/4 bg-white shadow-lg rounded-lg p-4 py-34 mr-10 w-1/3">
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">March 2025</h2>
          <div className="flex gap-2">
            <button className="p-2 bg-white-200  rounded-full">
              <ChevronLeft size={18}  className="text-black"/>
            </button>
            <button className="p-2 bg-white rounded-full shadow-md">
               <ChevronRight size={18} className="text-black" />
            </button>
          </div>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 text-center text-gray-500 text-sm font-semibold mb-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 text-center text-gray-900">
          {["4", "5", "6", "7", "8", "9", "10"].map((day) => (
            <button
              key={day}
              className={`p-2 rounded-lg ${
                selectedDate === day ? "bg-blue-500 text-white font-bold" : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedDate(day)}
            >
              {day}
            </button>
          ))}
        </div>

     
      </div>
    </div>
  );
}
