import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-700 rounded-xl p-6">
          <h2 className="text-lg font-bold">Events</h2>
          <p className="text-gray-400 text-sm mt-2">Manage tour dates and tickets</p>
          <Link href="/admin/events" className="text-purple-400 text-sm mt-2 block">Manage Events →</Link>
        </div>
        <div className="border border-green-500 rounded-xl p-6 bg-green-500/10">
          <h2 className="text-lg font-bold">Bulk Import</h2>
          <p className="text-gray-400 text-sm mt-2">Add multiple events at once</p>
          <Link href="/admin/events/bulk" className="text-green-400 text-sm mt-2 block">Import Events →</Link>
        </div>
        <div className="border border-gray-700 rounded-xl p-6">
          <h2 className="text-lg font-bold">Merch</h2>
          <p className="text-gray-400 text-sm mt-2">Add and manage merch items</p>
          <Link href="/admin/merch" className="text-purple-400 text-sm mt-2 block">Manage Merch →</Link>
        </div>
        <div className="border border-gray-700 rounded-xl p-6">
          <h2 className="text-lg font-bold">Fan Cards</h2>
          <p className="text-gray-400 text-sm mt-2">Edit tiers, prices, and perks</p>
          <Link href="/admin/fan-cards" className="text-purple-400 text-sm mt-2 block">Manage Fan Cards →</Link>
        </div>
        <div className="border border-gray-700 rounded-xl p-6">
          <h2 className="text-lg font-bold">Gallery</h2>
          <p className="text-gray-400 text-sm mt-2">Upload and manage photos</p>
          <Link href="/admin/gallery" className="text-purple-400 text-sm mt-2 block">Manage Gallery →</Link>
        </div>
        <div className="border border-gray-700 rounded-xl p-6">
          <h2 className="text-lg font-bold">Users</h2>
          <p className="text-gray-400 text-sm mt-2">View registered users</p>
          <Link href="/admin/users" className="text-purple-400 text-sm mt-2 block">View Users →</Link>
        </div>
        <div className="border border-gray-700 rounded-xl p-6">
          <h2 className="text-lg font-bold">Subscribers</h2>
          <p className="text-gray-400 text-sm mt-2">View newsletter subscribers</p>
          <Link href="/admin/subscribers" className="text-purple-400 text-sm mt-2 block">View Subscribers →</Link>
        </div>
        <div className="border border-gray-700 rounded-xl p-6">
          <h2 className="text-lg font-bold">Payment Requests</h2>
          <p className="text-gray-400 text-sm mt-2">View customer payment requests</p>
          <Link href="/admin/payments" className="text-purple-400 text-sm mt-2 block">View Requests →</Link>
        </div>
        <div className="border border-purple-500 rounded-xl p-6 bg-purple-500/10">
          <h2 className="text-lg font-bold">Site Settings</h2>
          <p className="text-gray-400 text-sm mt-2">Customize everything</p>
          <Link href="/admin/settings" className="text-purple-400 text-sm mt-2 block">Customize Site →</Link>
        </div>
      </div>
    </div>
  );
}