import React, { useState } from "react";
import axios from "axios";

const VerifyPage = () => {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!email || !code) {
      return setMessage("Please enter email and code");
    }
    try {
      setLoading(true);
      setMessage("");
      const res = await axios.post('http://localhost:3000/verifyuser', {
        email,
        code,
      });
      setMessage(res.data.message);
      setCode("");
      setEmail("");

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Verification failed! Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Verify Your Account
        </h2>
        <p className="text-gray-500 text-center mt-2">
          We have sent a 6-digit code to your email. Enter it below to verify
          your account.
        </p>

        <div className="mt-6">
          <label className="block text-gray-700 text-sm mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 text-sm mb-1">
            Verification Code
          </label>
          <input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        {message && (
          <p
            className={`mt-3 text-center text-sm ${
              message.includes("success") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <button
          onClick={handleVerify}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify Account"}
        </button>
      </div>
    </div>
  );
};

export default VerifyPage;
