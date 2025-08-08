"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordForm() {
  const [contactMethod, setContactMethod] = useState("email");
  const [contactInfo, setContactInfo] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: contactInfo }),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error sending reset link", error);
      alert("Failed to send reset link. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-4 mb-10 rounded-lg shadow-sm bg-white/70">
        <RadioGroup value={contactMethod} onValueChange={setContactMethod} className="flex justify-between">
          <div className="flex items-center">
            <RadioGroupItem id="phone" value="phone" />
            <Label htmlFor="phone" className="ml-2 font-medium text-gray-700">
              Phone
            </Label>
          </div>
          <div className="flex items-center">
            <RadioGroupItem id="email" value="email" />
            <Label htmlFor="email" className="ml-2 font-medium text-gray-700">
              Email
            </Label>
          </div>
          <div className="flex items-center">
            <RadioGroupItem id="username" value="username" />
            <Label htmlFor="username" className="ml-2 font-medium text-gray-700">
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
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          required
        />
        <Label
          htmlFor="contact-info"
          className="absolute left-0 top-4 text-gray-500 transition-all duration-300 -translate-y-0 pointer-events-none peer-focus:-translate-y-6 peer-focus:text-sm peer-focus:text-[#ff9800] peer-focus:font-semibold peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500"
        >
          {contactMethod === "phone" ? "Phone" : contactMethod === "email" ? "Email" : "Username"}
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full py-4 text-xl font-semibold bg-[#ff9800] hover:bg-[#fb8c00] text-white rounded-lg shadow-md hover:shadow-lg transition-all mt-4"
      >
        Send Reset Link
      </Button>
    </form>
  );
}
