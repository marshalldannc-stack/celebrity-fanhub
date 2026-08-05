"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async () => {
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res.ok) router.push("/");
    else alert("Invalid credentials");
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 mb-4 text-white" placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 mb-4 text-white" placeholder="Password" />
      <button onClick={login} className="w-full bg-purple-600 text-white px-6 py-3 rounded-full font-bold">Login</button>
      <p className="text-gray-400 mt-4 text-center">Don't have an account? <a href="/signup" className="text-purple-400">Sign Up</a></p>
    </div>
  );
}