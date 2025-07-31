"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function EnrollmentForm() {
  const [selectedPlan, setSelectedPlan] = useState('free')
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    education: "",
    experience: "beginner",
    goals: [] as string[],
    company: "",
    referral: "",
    motivation: "",
    terms: false,
    marketing: false,
    refund: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement
      if (checkbox.checked) {
        setFormData(prev => ({
          ...prev,
          goals: [...prev.goals, value]
        }))
      } else {
        setFormData(prev => ({
          ...prev,
          goals: prev.goals.filter(goal => goal !== value)
        }))
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      experience: e.target.value
    }))
  }

  const selectPlan = (plan: string) => {
    setSelectedPlan(plan)
  }

  const submitEnrollment = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.terms) {
      alert('Please accept the terms and conditions to continue.')
      return
    }
    
    const enrollmentData = {
      selectedPlan: selectedPlan,
      personalInfo: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        education: formData.education
      },
      experience: formData.experience,
      goals: formData.goals,
      additionalInfo: {
        company: formData.company,
        referral: formData.referral,
        motivation: formData.motivation
      },
      preferences: {
        marketing: formData.marketing,
        refundUnderstood: formData.refund
      }
    }
    
    console.log('Enrollment Data:', enrollmentData)
    
    // Here you would send the data to your backend
    // For demo purposes, we'll just show a success message
    alert(`Thank you for enrolling! You've selected the ${selectedPlan} plan. Check your email for next steps.`)
    
    // In a real app, you would redirect to a payment page or dashboard
    // window.location.href = selectedPlan === 'free' ? '/dashboard' : `/payment?plan=${selectedPlan}`
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Enrollment Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-t-2xl text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Enroll in Web Development Course</h1>
        <p className="text-lg">Join thousands of students learning modern web development</p>
      </div>

      <div className="space-y-8">
        {/* Course Summary */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
            <div className="w-48 h-32 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white text-lg font-semibold">
              Web Dev
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Web Development</h2>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">5.0 (976 reviews)</span>
              </div>
              <p className="text-gray-700">
                Learn modern web development with HTML, CSS, JavaScript, React, and Next.js. Our AI Tutor provides personalized guidance and feedback to help you master web development skills at your own pace.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Comprehensive Curriculum</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Expert Instructors</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Hands-On Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Career-Ready Skills</span>
            </div>
          </div>
        </div>

        {/* Enrollment Form */}
        <form onSubmit={submitEnrollment} className="bg-white rounded-xl p-6 shadow-lg">
          {/* Personal Information */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block mb-2 font-medium text-gray-700">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 font-medium text-gray-700">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2 font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="education" className="block mb-2 font-medium text-gray-700">Highest Education Level</label>
                <select
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select Education Level</option>
                  <option value="high-school">High School</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="phd">PhD</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Experience Level */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">Your Programming Experience</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "beginner", label: "Complete Beginner" },
                { value: "some", label: "Some Experience" },
                { value: "intermediate", label: "Intermediate" },
                { value: "advanced", label: "Advanced" }
              ].map((option) => (
                <div key={option.value} className="flex items-center p-3 border-2 border-gray-200 rounded-lg">
                  <input
                    type="radio"
                    id={`experience-${option.value}`}
                    name="experience"
                    value={option.value}
                    checked={formData.experience === option.value}
                    onChange={handleExperienceChange}
                    className="mr-3"
                  />
                  <label htmlFor={`experience-${option.value}`} className="font-medium text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Goals */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
              What do you want to achieve? (Select all that apply)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { id: "goal1", value: "build-websites", label: "Build websites from scratch" },
                { id: "goal2", value: "learn-react", label: "Learn React framework" },
                { id: "goal3", value: "career-change", label: "Career change to web development" },
                { id: "goal4", value: "improve-skills", label: "Improve existing skills" },
                { id: "goal5", value: "freelancing", label: "Start freelancing" },
                { id: "goal6", value: "personal-projects", label: "Build personal projects" }
              ].map((goal) => (
                <div key={goal.id} className="flex items-center p-3 border border-gray-200 rounded-lg">
                  <input
                    type="checkbox"
                    id={goal.id}
                    name="goals"
                    value={goal.value}
                    checked={formData.goals.includes(goal.value)}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <label htmlFor={goal.id} className="text-gray-700">
                    {goal.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label htmlFor="company" className="block mb-2 font-medium text-gray-700">Company/Organization (Optional)</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="referral" className="block mb-2 font-medium text-gray-700">Referral Code (Optional)</label>
                <input
                  type="text"
                  id="referral"
                  name="referral"
                  value={formData.referral}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label htmlFor="motivation" className="block mb-2 font-medium text-gray-700">Why are you taking this course?</label>
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                rows={4}
                placeholder="Tell us about your motivation and goals..."
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              ></textarea>
            </div>
          </div>
        </form>

        {/* Pricing Options */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Choose Your Enrollment Option</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free Access */}
            <div className={`border-2 rounded-xl p-6 transition-all ${selectedPlan === 'free' ? 'border-blue-500 transform -translate-y-1' : 'border-gray-200'}`}>
              <h4 className="text-lg font-bold mb-2">Free Access</h4>
              <div className="text-3xl font-bold my-4">$0</div>
              <ul className="text-left mb-6 space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Basic course content</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Community access</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Limited projects</span>
                </li>
              </ul>
              <Button
                type="button"
                onClick={() => selectPlan('free')}
                className={`w-full py-3 font-semibold ${
                  selectedPlan === 'free'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                Start Free
              </Button>
            </div>

            {/* Full Course (Recommended) */}
            <div className={`border-2 rounded-xl p-6 transition-all relative ${selectedPlan === 'full' ? 'border-red-500 transform -translate-y-1' : 'border-gray-200'}`}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                RECOMMENDED
              </div>
              <h4 className="text-lg font-bold mb-2">Full Course</h4>
              <div className="text-3xl font-bold my-4">$99</div>
              <ul className="text-left mb-6 space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Complete curriculum</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>All projects & exercises</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>AI Tutor access</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Certificate of completion</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Lifetime access</span>
                </li>
              </ul>
              <Button
                type="button"
                onClick={() => selectPlan('full')}
                className={`w-full py-3 font-semibold ${
                  selectedPlan === 'full'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-red-100 hover:bg-red-200 text-red-800'
                }`}
              >
                Enroll Now
              </Button>
            </div>

            {/* Monthly Subscription */}
            <div className={`border-2 rounded-xl p-6 transition-all ${selectedPlan === 'monthly' ? 'border-blue-500 transform -translate-y-1' : 'border-gray-200'}`}>
              <h4 className="text-lg font-bold mb-2">Monthly Subscription</h4>
              <div className="text-3xl font-bold my-4">
                $29<span className="text-sm">/month</span>
              </div>
              <ul className="text-left mb-6 space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Full course access</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Cancel anytime</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>All features included</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Perfect for trying out</span>
                </li>
              </ul>
              <Button
                type="button"
                onClick={() => selectPlan('monthly')}
                className={`w-full py-3 font-semibold ${
                  selectedPlan === 'monthly'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Terms and Conditions</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleCheckboxChange}
                required
                className="mr-3 w-5 h-5"
              />
              <label htmlFor="terms" className="text-gray-700">
                I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="marketing"
                name="marketing"
                checked={formData.marketing}
                onChange={handleCheckboxChange}
                className="mr-3 w-5 h-5"
              />
              <label htmlFor="marketing" className="text-gray-700">
                I want to receive course updates and learning tips via email
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="refund"
                name="refund"
                checked={formData.refund}
                onChange={handleCheckboxChange}
                className="mr-3 w-5 h-5"
              />
              <label htmlFor="refund" className="text-gray-700">
                I understand the 30-day money-back guarantee policy
              </label>
            </div>
          </div>
        </div>

        {/* Final Enrollment Button */}
        <div className="text-center py-8">
          <Button
            type="submit"
            onClick={submitEnrollment}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Complete Enrollment 🚀
          </Button>
          <p className="mt-4 text-gray-600">
            Join 10,000+ students who have already started their web development journey
          </p>
        </div>
      </div>
    </div>
  )
}
