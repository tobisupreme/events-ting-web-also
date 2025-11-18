export default function LeaderboardLoading() {
  return (
    <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-5 bg-gray-200 rounded w-1/3"></div>
        </div>

        {/* Leaderboard table skeleton */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Table header */}
          <div className="bg-gray-100 p-4 border-b border-gray-200">
            <div className="flex justify-between">
              <div className="h-5 bg-gray-200 rounded w-1/4"></div>
              <div className="h-5 bg-gray-200 rounded w-1/4"></div>
              <div className="h-5 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>

          {/* Table rows */}
          <div className="divide-y divide-gray-200">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                  </div>
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                  <div className="h-5 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
