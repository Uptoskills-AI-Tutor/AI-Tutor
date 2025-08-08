<<<<<<< HEAD
"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { coursesData } from "@/lib/course-data"

export default function CourseHero() {
  const [currentCourse, setCurrentCourse] = useState(coursesData[0])

  return (
    <div className="grid gap-8 md:grid-cols-2 md:items-center mb-12">
      <div className="space-y-6">
        <div className="flex items-center">
          <div className="flex text-orange-500">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-gray-600">
            {currentCourse.rating.toFixed(1)} ({currentCourse.reviews} reviews)
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold">{currentCourse.title}</h1>

        <p className="text-gray-700">{currentCourse.description}</p>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span>Comprehensive Curriculum</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span>Expert Instructors</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span>Hands-On Projects</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span>Career-Ready Skills</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button className="bg-orange-500 hover:bg-orange-600">Enroll Now</Button>
          <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
            See Curriculum
          </Button>
        </div>
      </div>

      <div className="relative rounded-lg overflow-hidden">
        <Image
          src={currentCourse.image || "/placeholder.svg"}
          alt={`${currentCourse.title} course`}
          width={600}
          height={400}
          className="w-full h-auto object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 rounded-full w-16 h-16 flex items-center justify-center transition-all hover:bg-white hover:scale-110">
          <Play className="w-8 h-8 text-orange-500" />
        </div>
      </div>
    </div>
  )
}
=======
"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { coursesData } from "@/lib/course-data"
import EnrollmentForm from "@/components/enrollment-form"

export default function CourseHero() {
  const [currentCourse, setCurrentCourse] = useState(coursesData[0])
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false)

  const toggleEnrollmentForm = () => {
    setShowEnrollmentForm(!showEnrollmentForm)
  }

  if (showEnrollmentForm) {
    return <EnrollmentForm />
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 md:items-center mb-12">
      <div className="space-y-6">
        <div className="flex items-center">
          <div className="flex text-orange-500">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-gray-600">
            {currentCourse.rating.toFixed(1)} ({currentCourse.reviews} reviews)
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold">{currentCourse.title}</h1>

        <p className="text-gray-700">{currentCourse.description}</p>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span>Comprehensive Curriculum</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span>Expert Instructors</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span>Hands-On Projects</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span>Career-Ready Skills</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button 
            className="bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 focus:ring-offset-2"
            onClick={toggleEnrollmentForm}
            aria-label="Enroll in course"
          >
            Enroll Now
          </Button>
          <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
            See Curriculum
          </Button>
        </div>
      </div>

      <div className="relative rounded-lg overflow-hidden">
        <Image
          src={currentCourse.image || "/placeholder.svg"}
          alt={`${currentCourse.title} course`}
          width={600}
          height={400}
          className="w-full h-auto object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 rounded-full w-16 h-16 flex items-center justify-center transition-all hover:bg-white hover:scale-110">
          <Play className="w-8 h-8 text-orange-500" />
        </div>
      </div>
    </div>
  )
}
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
