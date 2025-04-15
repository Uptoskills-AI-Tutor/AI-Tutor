"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  BookOpen,
  CalendarIcon,
  ChevronDown,
  Clock,
  GraduationCap,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Settings,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import Quiz from "@/components/ui/quiz";
import { PaginationNav } from "@/components/ui/pagination";

const recentActivities = [
  { id: 1, type: "quiz", name: "JavaScript Basics Quiz", score: "85%", date: "Today, 9:30 AM" },
  { id: 2, type: "lesson", name: "React Hooks Deep Dive", progress: "Completed", date: "Yesterday, 4:15 PM" },
  { id: 3, type: "assignment", name: "CSS Grid Assignment", status: "Pending", date: "Mar 15, 11:20 AM" },
  { id: 4, type: "forum", name: "UI/UX Design Discussion", replies: 5, date: "Mar 14, 2:45 PM" },
  { id: 5, type: "quiz", name: "TypeScript Essentials Quiz", score: "88%", date: "Mar 13, 10:00 AM" },
  { id: 6, type: "lesson", name: "Node.js Basics", progress: "In Progress", date: "Mar 12, 3:00 PM" },
];

export default function Dashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [currentPage, setCurrentPage] = useState(1);

  // Sample data
  const courses = [
    {
      id: 1,
      name: "Introduction to React",
      progress: 75,
      totalLessons: 12,
      completedLessons: 9,
    },
    {
      id: 2,
      name: "Advanced JavaScript",
      progress: 45,
      totalLessons: 10,
      completedLessons: 4,
    },
    {
      id: 3,
      name: "UI/UX Design Principles",
      progress: 20,
      totalLessons: 8,
      completedLessons: 1,
    },
  ];

  const upcomingCourses = [
    {
      id: 1,
      name: "Data Structures & Algorithms",
      date: "Tomorrow, 10:00 AM",
      duration: "1h 30m",
    },
    {
      id: 2,
      name: "Web Security Fundamentals",
      date: "Mar 20, 2:00 PM",
      duration: "1h",
    },
    {
      id: 3,
      name: "Responsive Design Workshop",
      date: "Mar 22, 11:00 AM",
      duration: "2h",
    },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const itemsPerPage = 3;
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const paginatedCourses = courses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-sky-600 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-center border-b border-sky-700">
          <h1 className="text-xl font-bold text-white">Learning Dashboard</h1>
        </div>
        <nav className="mt-5 px-2">
          <a
            href="#"
            className="group flex items-center rounded-md px-2 py-2 text-base font-medium text-white bg-sky-700"
          >
            <LayoutDashboard className="mr-4 h-5 w-5" />
            Dashboard
          </a>
          <a
            href="#"
            className="group mt-1 flex items-center rounded-md px-2 py-2 text-base font-medium text-sky-100 hover:bg-sky-700 hover:text-white"
          >
            <BookOpen className="mr-4 h-5 w-5" />
            My Courses
          </a>
          <a
            href="#"
            className="group mt-1 flex items-center rounded-md px-2 py-2 text-base font-medium text-sky-100 hover:bg-sky-700 hover:text-white"
          >
            <MessageSquare className="mr-4 h-5 w-5" />
            Discussion
          </a>
          <a
            href="#"
            className="group mt-1 flex items-center rounded-md px-2 py-2 text-base font-medium text-sky-100 hover:bg-sky-700 hover:text-white"
          >
            <BarChart3 className="mr-4 h-5 w-5" />
            Analytics
          </a>
          <a
            href="#"
            className="group mt-1 flex items-center rounded-md px-2 py-2 text-base font-medium text-sky-100 hover:bg-sky-700 hover:text-white"
          >
            <Settings className="mr-4 h-5 w-5" />
            Settings
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="mr-4 rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none md:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-1 bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100"
                    >
                      <GraduationCap className="h-4 w-4" />
                      <span>Computer Science</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuLabel>Switch Program</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Computer Science</DropdownMenuItem>
                    <DropdownMenuItem>Data Science</DropdownMenuItem>
                    <DropdownMenuItem>Web Development</DropdownMenuItem>
                    <DropdownMenuItem>UI/UX Design</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="@user"
                      />
                      <AvatarFallback>US</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome back, Student!
            </h1>
            <p className="text-gray-600">
              Here's an overview of your learning progress
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Course Progress */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Course Progress</CardTitle>
                  <CardDescription>Track your ongoing courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {paginatedCourses.map((course) => (
                      <div key={course.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{course.name}</h3>
                            <p className="text-sm text-gray-500">
                              {course.completedLessons} of {course.totalLessons}{" "}
                              lessons completed
                            </p>
                          </div>
                          <span className="text-sm font-medium text-sky-600">
                            {course.progress}%
                          </span>
                        </div>
                        <Progress
                          value={course.progress}
                          className="h-2 bg-sky-100"
                        />
                      </div>
                    ))}
                  </div>
                  {/* PaginationNav with proper alignment */}
                  <div className="flex justify-center mt-4">
                    <PaginationNav
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={(page: number) => setCurrentPage(page)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quiz Component */}
            <div>
              <Quiz />
            </div>

            {/* Calendar */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                  <CardDescription>Your schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Upcoming Courses */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Courses</CardTitle>
                  <CardDescription>Your scheduled classes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingCourses
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      )
                      .map((course) => (
                        <div
                          key={course.id}
                          className="flex items-start space-x-3 rounded-lg border p-3 shadow-sm"
                        >
                          <div className="rounded-full bg-sky-100 p-2 text-sky-600">
                            <Clock className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{course.name}</h3>
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <CalendarIcon className="mr-1 h-3 w-3" />
                              <span>{course.date}</span>
                              <span className="mx-1">•</span>
                              <span>{course.duration}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  {/* PaginationNav */}
                  <div className="flex justify-center mt-4">
                    <PaginationNav
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={(page: number) => setCurrentPage(page)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>
                    Your latest learning activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    ).map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-3 rounded-lg border p-3 shadow-sm"
                      >
                        <div className="rounded-full bg-sky-100 p-2 text-sky-600">
                          {activity.type === "quiz" && <span className="font-bold text-lg">Q</span>}
                          {activity.type === "lesson" && <span className="font-bold text-lg">L</span>}
                          {activity.type === "assignment" && <span className="font-bold text-lg">A</span>}
                          {activity.type === "forum" && <span className="font-bold text-lg">F</span>}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{activity.name}</h3>
                            {activity.score && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                                {activity.score}
                              </Badge>
                            )}
                            {activity.progress && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                                {activity.progress}
                              </Badge>
                            )}
                            {activity.status && (
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100">
                                {activity.status}
                              </Badge>
                            )}
                            {activity.replies !== undefined && (
                              <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-100">
                                {activity.replies} replies
                              </Badge>
                            )}
                          </div>
                          <div className="mt-1 text-sm text-gray-500">{activity.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* PaginationNav */}
                  <div className="flex justify-center mt-4">
                    <PaginationNav
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={(page: number) => setCurrentPage(page)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
