"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (!auth) router.push("/admin/login");
  }, []);

  return <div>{children}</div>;
}