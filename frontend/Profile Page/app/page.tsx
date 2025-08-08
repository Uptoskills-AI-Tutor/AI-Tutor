"use client"

import type React from "react"

import { useState, useRef } from "react"
import { BookOpen, ChevronDown, FileText, Flame, Home, LogOut, Menu, Settings, Trophy, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import ReactCrop, { type Crop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userName, setUserName] = useState("Nora Tsunoda")
  const [userTitle, setUserTitle] = useState("Security Lead")
  const [isEditingName, setIsEditingName] = useState(false)
  const [tempUserName, setTempUserName] = useState(userName)
  const [bio, setBio] = useState("Passionate learner | AI enthusiast | Always curious")
  const [isEditingBio, setIsEditingBio] = useState(false)
  const [tempBio, setTempBio] = useState(bio)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showImageCropper, setShowImageCropper] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleNameEdit = () => {
    setIsEditingName(true)
    setTempUserName(userName)
  }

  const saveName = () => {
    setUserName(tempUserName)
    setIsEditingName(false)
  }

  const handleBioEdit = () => {
    setIsEditingBio(true)
    setTempBio(bio)
  }

  const saveBio = () => {
    setBio(tempBio)
    setIsEditingBio(false)
  }

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setSelectedImage(event.target.result)
          setShowImageCropper(true)
        }
      }

      reader.readAsDataURL(file)
    }
  }

  const handleCropComplete = () => {
    // In a real app, you would process the cropped image here
    setShowImageCropper(false)
  }

  const learningStats = [
    { name: "Quiz Accuracy", value: 85 },
    { name: "Course Completion", value: 70 },
    { name: "Daily Challenges", value: 90 },
    { name: "Practice Problems", value: 65 },
    { name: "Engagement", value: 80 },
  ]

  const enrolledCourses = [
    { name: "Machine Learning Basics", color: "#FF6B6B" },
    { name: "Python for AI", color: "#4ECDC4" },
    { name: "Data Structures", color: "#FFD166" },
    { name: "Neural Networks", color: "#6B5B95" },
    { name: "Natural Language Processing", color: "#88D8B0" },
  ]

  const completedCourses = ["JavaScript Fundamentals", "Web Development", "Algorithms 101", "Statistics for AI"]

  const badges = [
    { name: "Wizard", description: "Scored 100% in 5 quizzes" },
    { name: "Warrior", description: "Completed 30-day streak" },
    { name: "Scholar", description: "Finished 10 courses" },
    { name: "Explorer", description: "Tried all course categories" },
  ]

  const connectedAccounts = [
    { name: "Google", connected: true },
    { name: "Microsoft", connected: true },
    { name: "iOS", connected: false },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Fixed Profile Section - Always visible */}
      <div className="fixed top-0 left-0 bottom-0 w-1/4 bg-white shadow-lg z-30 flex flex-col">
        {/* Profile Header */}
        <div className="p-6 flex flex-col items-center relative">
          {/* Profile Image */}
          <div className="relative mb-6 profile-image-container">
            <div className="w-40 h-40 rounded-full overflow-hidden bg-white p-2 shadow-xl">
              <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-yellow-400 via-yellow-400 to-blue-500 p-1">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Avatar className="w-full h-full">
                    <AvatarImage
                      src={
                        selectedImage ||
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FiMUSPmZ4C0RRN7amCxU6sTUCEb0eD.png"
                      }
                      alt={userName}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gradient-to-b from-yellow-400 to-blue-500 text-white text-2xl">
                      {userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
            <button
              onClick={handleImageUpload}
              className="absolute bottom-0 right-0 bg-red-500 text-white rounded-full p-3 shadow-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-110"
              aria-label="Upload profile picture"
            >
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              <span className="text-xl font-bold">+</span>
            </button>
          </div>

          {/* User Name */}
          {isEditingName ? (
            <div className="flex flex-col w-full">
              <input
                type="text"
                value={tempUserName}
                onChange={(e) => setTempUserName(e.target.value)}
                className="border rounded px-2 py-1 mb-2 text-center"
                autoFocus
              />
              <Button onClick={saveName} className="bg-orange-500 hover:bg-orange-600 text-white">
                Save
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-1 text-black">{userName}</h2>
              <p className="text-gray-600 mb-3 text-sm">{userTitle}</p>
              <button onClick={handleNameEdit} className="text-sm text-blue-600 hover:underline">
                Edit name
              </button>
            </div>
          )}
        </div>

        {/* Navigation - Hidden when sidebar is closed */}
        <div
          className={`flex-1 overflow-y-auto transition-all duration-500 ease-in-out ${sidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"}`}
        >
          <nav className="p-4 space-y-2">
            <a
              href="#"
              className="flex items-center px-4 py-3 text-black rounded-lg hover:bg-orange-100 transition-all duration-300 group"
            >
              <Home className="h-5 w-5 mr-3 text-orange-500 group-hover:text-blue-500 transition-colors" />
              <span className="font-medium group-hover:translate-x-1 transition-transform">Dashboard</span>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-black rounded-lg hover:bg-orange-100 transition-all duration-300 group"
            >
              <BookOpen className="h-5 w-5 mr-3 text-orange-500 group-hover:text-blue-500 transition-colors" />
              <span className="font-medium group-hover:translate-x-1 transition-transform">Courses</span>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-black rounded-lg hover:bg-orange-100 transition-all duration-300 group"
            >
              <FileText className="h-5 w-5 mr-3 text-orange-500 group-hover:text-blue-500 transition-colors" />
              <span className="font-medium group-hover:translate-x-1 transition-transform">My Quiz</span>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-black rounded-lg hover:bg-orange-100 transition-all duration-300 group"
            >
              <Settings className="h-5 w-5 mr-3 text-orange-500 group-hover:text-blue-500 transition-colors" />
              <span className="font-medium group-hover:translate-x-1 transition-transform">Settings</span>
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[25%]">
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-20 h-16 flex items-center px-6">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-orange-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6 text-orange-500" />
          </button>

          <div className="ml-4 flex items-center">
            <div className="bg-gradient-to-r from-orange-500 to-blue-500 p-1 rounded-lg">
              <div className="bg-white rounded-md px-2 py-1">
                <span className="font-bold text-xl text-black">AI Tutor</span>
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center">
            <div className="relative">
              <div
                className="flex items-center cursor-pointer bg-orange-50 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span className="mr-2 font-medium text-black">{userName}</span>
                <ChevronDown
                  className={`h-4 w-4 text-orange-500 transition-transform duration-300 ${showDropdown ? "rotate-180" : ""}`}
                />
              </div>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-20 border border-orange-100 overflow-hidden">
                  <button
                    className="w-full text-left px-4 py-3 text-black hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center"
                    onClick={() => setShowDropdown(false)}
                  >
                    <LogOut className="h-4 w-4 mr-2 text-orange-500" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-black relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-1/3 after:h-1 after:bg-gradient-to-r after:from-orange-500 after:to-blue-500 after:-mb-2">
                Profile Page
              </h1>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-t-4 border-orange-500 hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-black">Bio</h2>
                {!isEditingBio ? (
                  <button
                    onClick={handleBioEdit}
                    className="text-sm text-blue-600 hover:underline hover:text-blue-800 transition-colors px-3 py-1 rounded-full hover:bg-blue-50"
                  >
                    Edit
                  </button>
                ) : null}
              </div>

              {isEditingBio ? (
                <div className="flex flex-col w-full">
                  <textarea
                    value={tempBio}
                    onChange={(e) => setTempBio(e.target.value)}
                    className="border rounded-lg px-4 py-3 mb-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    rows={3}
                    autoFocus
                  />
                  <Button
                    onClick={saveBio}
                    className="bg-orange-500 hover:bg-orange-600 text-white self-end transform hover:scale-105 transition-all duration-300"
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <p className="text-black bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">{bio}</p>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-t-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold mb-4 text-black">Email & Contact Info</h2>
              <div className="flex items-center mb-2 bg-blue-50 p-4 rounded-lg">
                <span className="font-medium w-24 text-black">Email:</span>
                <span className="text-black">{userName.toLowerCase().replace(" ", ".")}@example.com</span>
                <span className="ml-2 text-xs text-gray-500">(Non-editable for security)</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-t-4 border-orange-500 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold mb-6 text-black">Learning Stats</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {learningStats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="relative w-36 h-36">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <defs>
                          <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="#3b82f6" />
                          </linearGradient>
                        </defs>
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#e6e6e6" strokeWidth="8" />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke={`url(#gradient-${index})`}
                          strokeWidth="8"
                          strokeDasharray={`${(2 * Math.PI * 45 * stat.value) / 100} ${2 * Math.PI * 45 * (1 - stat.value / 100)}`}
                          strokeDashoffset={2 * Math.PI * 45 * 0.25}
                          transform="rotate(-90 50 50)"
                          className="transition-all duration-1000 ease-out"
                          style={{
                            strokeDasharray: `${(2 * Math.PI * 45 * stat.value) / 100} ${2 * Math.PI * 45}`,
                          }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-3xl font-bold text-black">{stat.value}%</span>
                      </div>
                    </div>
                    <span className="mt-3 text-center font-medium text-black bg-gradient-to-r from-orange-200 to-blue-200 px-4 py-1 rounded-full">
                      {stat.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-t-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold mb-6 text-black">Courses Enrolled</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {enrolledCourses.map((course, index) => (
                  <div
                    key={index}
                    className="border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                  >
                    <div className="h-32 p-4 flex items-center justify-center bg-gradient-to-br from-orange-400 to-blue-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                      <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                        <BookOpen className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_70%)]"></div>
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="font-medium text-center text-black truncate">{course.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-t-4 border-orange-500 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold mb-6 text-black">Streaks & Total Time Spent</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center bg-gradient-to-r from-orange-50 to-blue-50 p-6 rounded-xl shadow-md transform hover:scale-105 transition-all duration-300">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-5 rounded-full mr-6 shadow-lg">
                    <Flame className="h-12 w-12 text-white" />
                  </div>
                  <div>
                    <span className="block text-gray-700">Current Streak</span>
                    <span className="text-4xl font-bold text-black">14 days</span>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="bg-gradient-to-r from-orange-500 to-blue-500 text-white rounded-xl p-1 shadow-lg transform hover:scale-105 transition-all duration-300">
                    <div className="bg-white rounded-lg p-1">
                      <div className="bg-gradient-to-r from-orange-500 to-blue-500 rounded-lg p-4 flex items-center space-x-3">
                        <div className="flex flex-col items-center border-r pr-4">
                          <span className="text-xs font-bold">MONTHS</span>
                          <span className="text-3xl font-bold">02</span>
                        </div>
                        <div className="flex flex-col items-center border-r pr-4">
                          <span className="text-xs font-bold">DAYS</span>
                          <span className="text-3xl font-bold">15</span>
                        </div>
                        <div className="flex flex-col items-center border-r pr-4">
                          <span className="text-xs font-bold">HOURS</span>
                          <span className="text-3xl font-bold">23</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-xs font-bold">MINS</span>
                          <span className="text-3xl font-bold">47</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-t-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold mb-6 text-black">Completed Courses & Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-6 text-black bg-blue-50 inline-block px-4 py-1 rounded-full">
                    Completed Courses
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    {completedCourses.map((course, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center transform hover:scale-105 transition-all duration-300"
                      >
                        <div className="w-24 h-24 rounded-full border-4 border-yellow-500 flex items-center justify-center bg-gradient-to-br from-orange-100 to-blue-100 mb-3 shadow-lg relative overflow-hidden">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.8),transparent_70%)]"></div>
                          <Trophy className="h-10 w-10 text-yellow-600" />
                        </div>
                        <span className="text-center text-black font-medium">{course}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-6 text-black bg-orange-50 inline-block px-4 py-1 rounded-full">
                    Achievements
                  </h3>
                  <div className="space-y-4">
                    {badges.slice(0, 3).map((badge, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-gradient-to-r from-orange-50 to-blue-50 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center mr-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                          <Trophy className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-black">{badge.name} Badge</h4>
                          <p className="text-sm text-gray-700">{badge.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-t-4 border-orange-500 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold mb-6 text-black">Badges & Medals Earned</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center transform hover:scale-110 transition-all duration-300"
                  >
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-blue-500 flex items-center justify-center mb-3 shadow-lg relative p-1">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <div className="w-[90%] h-[90%] rounded-full bg-gradient-to-br from-orange-400 to-blue-500 flex items-center justify-center text-white font-bold">
                          {badge.name}
                        </div>
                      </div>
                    </div>
                    <span className="text-center text-black font-medium">{badge.name} Badge</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold mb-6 text-black">Connected Accounts</h2>
              <div className="space-y-4">
                {connectedAccounts.map((account, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-xl hover:shadow-md transition-all duration-300 bg-gradient-to-r from-white to-blue-50"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-blue-500 p-0.5 flex items-center justify-center mr-4 shadow-md">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                          <span className="font-bold text-xl text-black">{account.name.charAt(0)}</span>
                        </div>
                      </div>
                      <span className="text-black font-medium">{account.name}</span>
                    </div>
                    <Badge
                      variant={account.connected ? "success" : "outline"}
                      className={account.connected ? "bg-gradient-to-r from-green-400 to-green-500" : ""}
                    >
                      {account.connected ? "Connected" : "Not Connected"}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Image Cropper Modal */}
      {showImageCropper && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 border-t-4 border-orange-500">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-black">Crop Profile Picture</h3>
              <button
                onClick={() => setShowImageCropper(false)}
                className="text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6 bg-gray-50 p-4 rounded-xl">
              <ReactCrop crop={crop} onChange={(c) => setCrop(c)} circularCrop aspect={1}>
                <img src={selectedImage || "/placeholder.svg"} alt="Crop preview" className="max-h-[60vh] mx-auto" />
              </ReactCrop>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowImageCropper(false)}
                className="border-orange-500 text-orange-500 hover:bg-orange-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCropComplete}
                className="bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white transform hover:scale-105 transition-all duration-300"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

