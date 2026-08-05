"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [pass, setPass] = useState("");
  const router = useRouter();

  const login = () => {
    if (pass === "admin123") {
      localStorage.setItem("adminAuth", "true");
      router.push("/admin");
    } else {
      alert("Wrong password");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 text-center">
      <h1 className="text-2xl font-bold mb-6">Admin Access</h1>
      <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 mb-4 text-white text-center" placeholder="Enter admin password" />
      <button onClick={login} className="w-full bg-purple-600 text-white px-6 py-3 rounded-full font-bold">Login</button>
    </div>
  );
}