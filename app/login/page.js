"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async () => {
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.ok) {
      router.push("/");
    } else {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
      <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 mb-4 text-white" placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 mb-4 text-white" placeholder="Password" />
      <button onClick={login} disabled={loading} className={`w-full px-6 py-3 rounded-full font-bold text-white transition ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-500 active:scale-95"}`}>
        {loading ? "⏳ Logging in..." : "Login"}
      </button>
      <p className="text-gray-400 mt-4 text-center">
        Don't have an account? <a href="/signup" className="text-purple-400">Sign Up</a>
      </p>
      <p className="text-gray-400 mt-2 text-center">
        <a href="/reset-password" className="text-purple-400 text-sm">Forgot password?</a>
      </p>
    </div>
  );
}