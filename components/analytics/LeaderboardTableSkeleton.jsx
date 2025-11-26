"use client";

export default function LeaderboardTableSkeleton() {
  return (
    <div className="space-y-3">
      {/* Desktop skeleton */}
      <div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="px-6 py-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
              </th>
              <th className="px-6 py-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
              </th>
              <th className="px-6 py-3 text-right">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 ml-auto"></div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {[...Array(10)].map((_, i) => (
              <tr key={i}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    {i < 3 && (
                      <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-12 ml-auto"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile skeleton */}
      <div className="md:hidden space-y-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 animate-pulse"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                {i < 3 && (
                  <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                )}
              </div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
