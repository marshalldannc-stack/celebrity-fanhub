"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signup = async () => {
    setLoading(true);
    setError("");
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    if (res.ok) {
      await signIn("credentials", { email, password, redirect: false });
      router.push("/welcome");
    } else {
      setError("Email already exists or invalid.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-6">Create Account</h1>
      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
      <input value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 mb-4 text-white" placeholder="Full Name" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 mb-4 text-white" placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 mb-4 text-white" placeholder="Password" />
      <button onClick={signup} disabled={loading} className={`w-full px-6 py-3 rounded-full font-bold text-white transition ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-500 active:scale-95"}`}>
        {loading ? "⏳ Creating account..." : "Sign Up"}
      </button>
      <p className="text-gray-400 mt-4 text-center">Already have an account? <a href="/login" className="text-purple-400">Login</a></p>
    </div>
  );
}