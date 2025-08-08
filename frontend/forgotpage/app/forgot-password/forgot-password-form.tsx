<<<<<<< HEAD
"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error sending reset link", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Forgot Password</h2>

      <div className="relative mb-4">
        <Input
          type="email"
          id="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff9800]"
        />
        <Label
          htmlFor="email"
          className="absolute px-1 text-sm text-gray-600 bg-white left-3 -top-3"
        >
          Email
=======
"use client"

import type React from "react"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"

export default function ForgotPasswordForm() {
  const [contactMethod, setContactMethod] = useState("email")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted")
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Contact Method Selection */}
      <div className="mb-10 bg-white/70 p-4 rounded-lg shadow-sm">
        <RadioGroup value={contactMethod} onValueChange={setContactMethod} className="flex justify-between">
          <div className="flex items-center">
            <RadioGroupItem id="phone" value="phone" className="text-[#ff9800]" />
            <Label htmlFor="phone" className="ml-2 text-gray-700 font-medium">
              Phone
            </Label>
          </div>
          <div className="flex items-center">
            <RadioGroupItem id="email" value="email" className="text-[#ff9800]" />
            <Label htmlFor="email" className="ml-2 text-gray-700 font-medium">
              Email
            </Label>
          </div>
          <div className="flex items-center">
            <RadioGroupItem id="username" value="username" className="text-[#ff9800]" />
            <Label htmlFor="username" className="ml-2 text-gray-700 font-medium">
              Username
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="relative mb-9">
        <Input
          type="text"
          id="contact-info"
          className="w-full py-4 px-3 border-0 border-b-2 border-[#2196f3] bg-transparent text-lg focus:border-[#ff9800] focus:outline-none transition-all"
          placeholder=" "
          required
        />
        <Label
          htmlFor="contact-info"
          className="absolute left-0 top-4 text-gray-500 transition-all duration-300 -translate-y-0 pointer-events-none peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-[#ff9800] peer-focus:font-semibold peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500"
        >
          {contactMethod === "phone" ? "Phone" : contactMethod === "email" ? "Email" : "Username"}
        </Label>
      </div>

      <div className="relative mb-9">
        <Input
          type="password"
          id="new-password"
          className="w-full py-4 px-3 border-0 border-b-2 border-[#2196f3] bg-transparent text-lg focus:border-[#ff9800] focus:outline-none transition-all"
          placeholder=" "
          required
        />
        <Label
          htmlFor="new-password"
          className="absolute left-0 top-4 text-gray-500 transition-all duration-300 -translate-y-0 pointer-events-none peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-[#ff9800] peer-focus:font-semibold peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500"
        >
          New Password
        </Label>
      </div>

      <div className="relative mb-9">
        <Input
          type="password"
          id="confirm-password"
          className="w-full py-4 px-3 border-0 border-b-2 border-[#2196f3] bg-transparent text-lg focus:border-[#ff9800] focus:outline-none transition-all"
          placeholder=" "
          required
        />
        <Label
          htmlFor="confirm-password"
          className="absolute left-0 top-4 text-gray-500 transition-all duration-300 -translate-y-0 pointer-events-none peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-[#ff9800] peer-focus:font-semibold peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500"
        >
          Confirm Password
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
        </Label>
      </div>

      <Button
        type="submit"
<<<<<<< HEAD
        className="w-full py-3 bg-[#ff9800] hover:bg-[#fb8c00] text-white font-semibold text-lg rounded-md transition-all"
      >
        Send Reset Link
      </Button>
    </form>
  );
=======
        className="w-full py-4 text-xl font-semibold bg-[#ff9800] hover:bg-[#fb8c00] text-white rounded-lg shadow-md hover:shadow-lg transition-all mt-4"
      >
        Save
      </Button>
    </form>
  )
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
}
