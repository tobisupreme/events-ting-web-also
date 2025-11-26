export default function RegistrationsTableSkeleton() {
  return (
    <div className="space-y-4 md:space-y-6 animate-pulse">
      {/* Search and Filter Bar Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search input skeleton */}
          <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>

          {/* Filter buttons skeleton */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="h-10 w-full sm:w-36 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
            <div className="h-10 w-full sm:w-32 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
            <div className="h-10 w-full sm:w-24 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
            <div className="h-10 w-full sm:w-24 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Mobile Card Skeletons */}
      <div className="md:hidden space-y-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-48"></div>
                  </div>
                  <div className="w-5 h-5 bg-gray-200 dark:bg-gray-600 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table Skeleton */}
      <div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table header */}
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-6 py-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>
                </th>
                <th className="px-6 py-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-20"></div>
                </th>
                <th className="px-6 py-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-28"></div>
                </th>
                <th className="px-6 py-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>
                </th>
                <th className="px-6 py-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>
                </th>
                <th className="px-6 py-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16"></div>
                </th>
              </tr>
            </thead>

            {/* Table rows */}
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {[...Array(8)].map((_, i) => (
                <tr
                  key={i}
                  className={
                    i % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-50/50 dark:bg-gray-800/50"
                  }
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-32"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-20"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-48"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded-full w-28"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-24"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-32"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-5 h-5 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
