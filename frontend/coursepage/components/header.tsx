"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"

const courses = [
  { id: "web-development", name: "Web Development" },
  { id: "dsa", name: "Data Structures & Algorithms" },
  { id: "python", name: "Python Programming" },
]

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Close dropdown when clicking outside
  const handleClickOutside = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest(".dropdown")) {
      setIsDropdownOpen(false)
    }
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="logo">
            <Link href="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-rose-600 bg-clip-text text-transparent">
                AI Tutor
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Courses Dropdown */}
            <div className="dropdown relative" onClick={handleClickOutside}>
              <button
                className="flex items-center text-gray-700 hover:text-orange-500 transition-colors"
                onClick={toggleDropdown}
              >
                Courses <span className="ml-1 text-xs">▼</span>
              </button>
              <div
                className={cn(
                  "absolute top-full left-0 z-10 min-w-48 bg-white rounded-lg shadow-md py-2",
                  isDropdownOpen ? "block" : "hidden",
                )}
              >
                {courses.map((course) => (
                  <Link
                    key={course.id}
                    href={`#${course.id}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    data-course={course.id}
                  >
                    {course.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Other navigation items */}
            <Link href="#" className="text-gray-700 hover:text-orange-500 transition-colors">
              What we offer
            </Link>
            <Link href="#" className="text-gray-700 hover:text-orange-500 transition-colors">
              Blog
            </Link>
          </nav>

          {/* Enroll button */}
          <div>
            <button className="inline-flex h-10 items-center justify-center rounded-md border border-orange-500 bg-transparent px-4 py-2 text-sm font-medium text-orange-500 hover:bg-orange-50 transition-colors">
              Enroll now
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu}>
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={cn("py-4", isMobileMenuOpen ? "block" : "hidden")}>
          <div className="mb-4">
            <h3 className="font-medium mb-2">Courses</h3>
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`#${course.id}`}
                className="block py-1 text-gray-700 hover:text-orange-500"
                data-course={course.id}
              >
                {course.name}
              </Link>
            ))}
          </div>
          <Link href="#" className="block py-1 text-gray-700 hover:text-orange-500">
            What we offer
          </Link>
          <Link href="#" className="block py-1 text-gray-700 hover:text-orange-500">
            Blog
          </Link>
        </div>
      </div>
    </header>
  )
}
