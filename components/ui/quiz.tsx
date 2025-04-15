import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PaginationNav } from "@/components/ui/pagination";

const quizzes = [
  { id: 1, name: "JavaScript Basics Quiz", score: "85%", date: "Today, 9:30 AM" },
  { id: 2, name: "React Fundamentals Quiz", score: "92%", date: "Yesterday, 4:15 PM" },
  { id: 3, name: "CSS Grid & Flexbox Quiz", score: "78%", date: "Mar 15, 11:20 AM" },
  { id: 4, name: "TypeScript Essentials Quiz", score: "88%", date: "Mar 14, 2:45 PM" },
  { id: 5, name: "Node.js Basics Quiz", score: "90%", date: "Mar 13, 10:00 AM" },
  { id: 6, name: "Python Basics Quiz", score: "95%", date: "Mar 12, 3:00 PM" },
];

export default function Quiz() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(quizzes.length / itemsPerPage);

  const paginatedQuizzes = quizzes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz</CardTitle>
        <CardDescription>Your latest quizzes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {paginatedQuizzes.map((quiz) => (
            <div key={quiz.id} className="flex items-start space-x-3 rounded-lg border p-3 shadow-sm">
              <div className="rounded-full bg-sky-100 p-2 text-sky-600">
                <span className="font-bold text-lg">Q</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{quiz.name}</h3>
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                    {quiz.score}
                  </Badge>
                </div>
                <div className="mt-1 text-sm text-gray-500">{quiz.date}</div>
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
  );
}