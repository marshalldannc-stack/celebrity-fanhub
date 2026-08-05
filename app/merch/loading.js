export default function MerchLoading() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Merch Store</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border border-gray-700 rounded-xl p-4 animate-pulse">
            <div className="w-full h-40 bg-gray-800 rounded-lg mb-3"></div>
            <div className="h-3 bg-gray-800 rounded w-1/3 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-800 rounded w-2/3 mx-auto mb-2"></div>
            <div className="h-5 bg-gray-800 rounded w-1/4 mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  );
}