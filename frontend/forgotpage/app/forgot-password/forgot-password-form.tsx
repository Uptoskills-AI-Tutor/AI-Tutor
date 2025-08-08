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
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full py-3 bg-[#ff9800] hover:bg-[#fb8c00] text-white font-semibold text-lg rounded-md transition-all"
      >
        Send Reset Link
      </Button>
    </form>
  );
}
