"use client";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }) {
  const router = useRouter();

  const deleteRequest = async () => {
    if (!confirm("Delete this payment request?")) return;
    await fetch(`/api/payment-requests/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <button onClick={deleteRequest} className="text-red-400 text-xs hover:text-red-300">Delete</button>
  );
}