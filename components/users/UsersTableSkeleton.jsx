"use client";

export default function UsersTableSkeleton() {
  return (
    <div className="space-y-4">
      {/* Desktop skeleton */}
      <div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="px-6 py-3 text-left">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
              </th>
              <th className="px-6 py-3 text-left">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {[...Array(8)].map((_, i) => (
              <tr key={i}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28"></div>
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
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
