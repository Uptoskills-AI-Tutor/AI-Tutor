import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function VerificationModal({ show, message, status, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl p-8 w-96 text-center shadow-xl">
        <h2 className="text-xl font-bold mb-4">Payment Verification</h2>
        <p
          className={`mb-6 ${
            status === "success" ? "text-green-600" : "text-blue-600"
          }`}
        >
          {message}
        </p>
        {status === "success" && (
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-green-500 to-green-700 text-white py-2 px-6 rounded-lg shadow-md hover:from-green-600 hover:to-green-800"
          >
            ✅ Continue
          </button>
        )}
      </div>
    </div>
  );
}

export default function CourseEnrollment() {
  const [form, setForm] = useState({
    courseId: "",
    name: "",
    email: "",
    level: "",
    price: 0,
    startDate: "",
    referralCode: "",
    paymentMethod: "",
  });
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [step, setStep] = useState(1);
  const [verification, setVerification] = useState({
    show: false,
    status: "",
    message: "",
  });
  const [isVerified, setIsVerified] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ get course object from navigate state
  const course = location.state?.course;

  const paymentMethods = ["UPI", "Credit/Debit Card", "Net Banking", "Wallet"];

  // prefill from state
  useEffect(() => {
    if (course) {
      setForm((prev) => ({
        ...prev,
        courseId: course.id,
        price: course.price,
        level: course.level || "",
      }));
      setMessage(
        `💰 You are paying ₹${course.price} for ${course.level} level`
      );
    }
  }, [course]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0 || step === 3) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, step]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const selectPaymentMethod = (method) => {
    setForm({ ...form, paymentMethod: method });
    setIsVerified(false);
  };

  const handleVerification = (type, value) => {
    if (!value) return;
    setVerification({
      show: true,
      status: "processing",
      message: `🔄 Redirecting to your ${type}...`,
    });

    setTimeout(() => {
      setVerification({
        show: true,
        status: "success",
        message: `✅ Verified with ${value}`,
      });
      setIsVerified(true);
    }, 2000);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (
      !form.courseId ||
      !form.name ||
      !form.email ||
      !form.level ||
      !form.startDate
    ) {
      alert("Please fill all required fields before continuing.");
      return;
    }
    setStep(2);
  };

  const handleEnroll = (e) => {
    e.preventDefault();
    if (!form.paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    if (!isVerified) {
      alert("Please verify your payment method before enrolling.");
      return;
    }
    setStep(3);

    let progress = JSON.parse(localStorage.getItem("progress")) || {};
    progress[course.id] = { status: "enrolled", percent: 0 };
    localStorage.setItem("progress", JSON.stringify(progress));

    window.dispatchEvent(new Event("storage"));
  };

  const handleStartLearning = () => {
    let progress = JSON.parse(localStorage.getItem("progress")) || {};
    progress[course.id] = { status: "learning", percent: 10 };
    localStorage.setItem("progress", JSON.stringify(progress));

    window.dispatchEvent(new Event("storage"));

    navigate(`/app/study/${course.id}`);
  };

  const handleRestart = () => {
    setForm({
      courseId: "",
      name: "",
      email: "",
      level: "",
      price: 0,
      startDate: "",
      referralCode: "",
      paymentMethod: "",
    });
    setMessage("");
    setStep(1);
    setTimeLeft(15 * 60);
    setIsVerified(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-8 text-gray-800 border border-gray-200">
        <h1 className="text-4xl font-extrabold mb-4 text-center text-blue-700">
          🎓 Course Enrollment
        </h1>

        {/* Timer */}
        {step !== 3 && (
          <div className="text-center text-red-600 font-semibold mb-6 bg-red-50 py-2 px-4 rounded-lg animate-pulse">
            ⏳ Hurry! Offer expires in{" "}
            <span className="font-bold">{formatTime(timeLeft)}</span>
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-5">
            {course && (
              <p className="font-semibold text-blue-700">
                Selected Course: {course.title} ({course.level})
              </p>
            )}

            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Preferred Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Referral Code (Optional)
              </label>
              <input
                type="text"
                name="referralCode"
                placeholder="Enter Referral Code"
                value={form.referralCode}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            {message && (
              <p className="mt-2 text-green-700 font-medium">{message}</p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white p-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition transform hover:scale-105 font-semibold text-lg mt-4"
            >
              ➡ Continue to Payment
            </button>
          </form>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <form onSubmit={handleEnroll} className="space-y-5">
            <p className="font-semibold text-blue-700">
              Course: {course?.title} | Level: {form.level} | Price: ₹{form.price}
            </p>
            <p className="text-sm text-gray-500">
              Start Date: {form.startDate} | Referral:{" "}
              {form.referralCode || "N/A"}
            </p>

            <p className="font-semibold mb-3 text-blue-700">
              Select Payment Method:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {paymentMethods.map((method) => (
                <button
                  type="button"
                  key={method}
                  onClick={() => selectPaymentMethod(method)}
                  className={`border rounded-xl p-4 transition transform hover:scale-105 ${
                    form.paymentMethod === method
                      ? "bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg"
                      : "bg-white text-gray-800 hover:bg-green-50"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>

            {/* Payment inputs */}
            {form.paymentMethod === "Credit/Debit Card" && (
              <div className="space-y-2 mt-3">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full border p-3 rounded-lg"
                  required
                  onBlur={() =>
                    handleVerification("Card", "Credit/Debit Card")
                  }
                />
                <input
                  type="text"
                  placeholder="Expiry Date (MM/YY)"
                  className="w-full border p-3 rounded-lg"
                  required
                />
                <input
                  type="password"
                  placeholder="CVV"
                  className="w-full border p-3 rounded-lg"
                  required
                />
              </div>
            )}
            {form.paymentMethod === "UPI" && (
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Enter UPI ID"
                  className="w-full border p-3 rounded-lg"
                  required
                  onBlur={(e) => handleVerification("UPI", e.target.value)}
                />
              </div>
            )}
            {form.paymentMethod === "Net Banking" && (
              <div className="mt-3">
                <select
                  className="w-full border p-3 rounded-lg"
                  required
                  onChange={(e) =>
                    handleVerification("Bank", e.target.value)
                  }
                >
                  <option value="">Select Bank</option>
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                </select>
              </div>
            )}
            {form.paymentMethod === "Wallet" && (
              <div className="mt-3">
                <select
                  className="w-full border p-3 rounded-lg"
                  required
                  onChange={(e) =>
                    handleVerification("Wallet", e.target.value)
                  }
                >
                  <option value="">Select Wallet</option>
                  <option>Paytm</option>
                  <option>PhonePe</option>
                  <option>Amazon Pay</option>
                  <option>Google Pay</option>
                </select>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/2 bg-gray-300 text-gray-800 p-3 rounded-lg hover:bg-gray-400 transition"
              >
                ⬅ Back
              </button>
              <button
                type="submit"
                disabled={!isVerified}
                className={`w-1/2 p-3 rounded-lg shadow-lg font-semibold text-lg transition transform hover:scale-105 ${
                  isVerified
                    ? "bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-600 hover:to-green-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                🚀 Enroll Now
              </button>
            </div>
          </form>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-green-600">
              🎉 Enrollment Successful!
            </h2>
            <p className="text-gray-700 text-lg">
              You are enrolled in <strong>{course?.title}</strong> ({form.level}){" "}
              course.
            </p>
            <button
              onClick={handleStartLearning}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white p-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition transform hover:scale-105 font-semibold text-lg"
            >
              ▶ Start Learning
            </button>
            <button
              onClick={handleRestart}
              className="w-full bg-gray-300 text-gray-800 p-3 rounded-lg hover:bg-gray-400 transition font-semibold text-lg"
            >
              🔄 Enroll Another Course
            </button>
          </div>
        )}
      </div>

      <VerificationModal
        show={verification.show}
        message={verification.message}
        status={verification.status}
        onClose={() =>
          setVerification({ show: false, status: "", message: "" })
        }
      />
    </div>
  );
}






