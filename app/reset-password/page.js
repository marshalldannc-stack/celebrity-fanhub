"use client";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const reset = async () => {
    await fetch("/api/reset-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    setSent(true);
  };

  return (
    <div className="max-w-md mx-auto mt-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      {sent ? (
        <p className="text-green-400">If that email exists, a reset link has been sent.</p>
      ) : (
        <>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 mb-4 text-white" placeholder="Your email" />
          <button onClick={reset} className="w-full bg-purple-600 text-white px-6 py-3 rounded-full font-bold">Send Reset Link</button>
        </>
      )}
    </div>
  );
}