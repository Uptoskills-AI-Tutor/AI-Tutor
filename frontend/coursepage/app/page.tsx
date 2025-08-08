import CourseHero from "@/components/course-hero"
import CourseTabs from "@/components/course-tabs"
import Header from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <CourseHero />
          <CourseTabs />
        </div>
      </main>
    </div>
  )
}
