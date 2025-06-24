"use client"

import ForgotPasswordForm from "./forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Side - Image Section (Exactly 50%) */}
      <div
        className="hidden md:block md:w-1/2 h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-va6DS37SISE76PkyuGD1EAGPmKddmO.webp')",
        }}
      />

      {/* Right Side - Forgot Password Section (Exactly 50%) */}
      <div className="w-full md:w-1/2 h-full p-4 md:p-[5%] bg-gradient-to-br from-[#f7fcff] to-[#e6f5ff] flex flex-col justify-center items-center">
        <div className="w-full max-w-[500px]">
          <h2 className="mb-4 text-3xl md:text-4xl text-center font-bold text-[#1a73e8] tracking-wide">
            Forgot Password
          </h2>
          <p className="mb-8 text-center text-gray-600 text-base md:text-lg">
            Reset your password to continue your AI learning journey. We&apos;ll help you get back on track.
          </p>

          <ForgotPasswordForm />

          <a
            href="/login"
            className="mt-8 block text-center text-[#2196f3] hover:text-[#0d8aee] hover:underline text-lg font-medium transition-colors"
          >
            Go to login page
          </a>
        </div>
      </div>
    </div>
  )
}
