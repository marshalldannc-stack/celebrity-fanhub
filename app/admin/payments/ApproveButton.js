"use client";
import { useRouter } from "next/navigation";

export default function ApproveButton({ id }) {
  const router = useRouter();

  const approve = async () => {
    await fetch(`/api/payment-requests/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "completed" }),
    });
    router.refresh();
  };

  return (
    <button onClick={approve} className="bg-green-600 text-white px-3 py-1 rounded-full text-xs hover:bg-green-500">
      Approve
    </button>
  );
}