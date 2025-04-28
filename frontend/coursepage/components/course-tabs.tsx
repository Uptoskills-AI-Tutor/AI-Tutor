"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { coursesData } from "@/lib/course-data"
import { Button } from "@/components/ui/button"

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "course-info", label: "Course Info" },
  { id: "download-material", label: "Download Material" },
  { id: "summary", label: "Summary" },
  { id: "quiz", label: "Quiz" },
  { id: "report", label: "Report" },
]

export default function CourseTabs() {
  const [currentCourse, setCurrentCourse] = useState(coursesData[0])
  const [currentTab, setCurrentTab] = useState("overview")
  const [visibleAnswers, setVisibleAnswers] = useState<Record<string, boolean>>({})

  const toggleAnswer = (answerId: string) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [answerId]: !prev[answerId],
    }))
  }

  return (
    <div className="mt-12">
      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "px-6 py-3 rounded-full transition-colors",
              currentTab === tab.id ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-100",
            )}
            onClick={() => setCurrentTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        {currentTab === "overview" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
            <p className="whitespace-pre-line">{currentCourse.overview}</p>
          </div>
        )}

        {currentTab === "course-info" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Course Information</h2>
            <p className="whitespace-pre-line">{currentCourse.courseInfo}</p>
          </div>
        )}

        {currentTab === "download-material" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Course Materials</h2>
            <p className="whitespace-pre-line">{currentCourse.materials}</p>
            <div className="mt-6">
              <Button className="bg-orange-500 hover:bg-orange-600">Download All Materials</Button>
            </div>
          </div>
        )}

        {currentTab === "summary" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Course Summary</h2>
            <p className="whitespace-pre-line">{currentCourse.summary}</p>
          </div>
        )}

        {currentTab === "quiz" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Practice Quiz</h2>
            <div className="flex flex-col gap-6">
              {currentCourse.quiz.map((item, index) => (
                <div key={index} className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">
                    Question {index + 1}: {item.question}
                  </h3>
                  <button className="text-blue-600 mt-4" onClick={() => toggleAnswer(`answer-${index}`)}>
                    {visibleAnswers[`answer-${index}`] ? "Hide Answer" : "Show Answer"}
                  </button>
                  <p className={cn("mt-2 text-green-600", visibleAnswers[`answer-${index}`] ? "block" : "hidden")}>
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentTab === "report" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Report an Issue</h2>
            <form className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="issue-type" className="mb-1">
                  Issue Type
                </label>
                <select id="issue-type" className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>Content Error</option>
                  <option>Technical Problem</option>
                  <option>Suggestion</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="description" className="mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full p-2 border border-gray-300 rounded-lg min-h-24 resize-y"
                  placeholder="Please describe the issue in detail..."
                ></textarea>
              </div>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                Submit Report
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
