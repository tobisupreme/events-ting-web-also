export default function RegistrationsTableSkeleton() {
  return (
    <div className="space-y-4 md:space-y-6 animate-pulse">
      {/* Action buttons skeleton */}
      <div className="flex flex-wrap gap-3">
        <div className="h-10 bg-gray-200 rounded w-32"></div>
        <div className="h-10 bg-gray-200 rounded w-36"></div>
        <div className="h-10 bg-gray-200 rounded w-28"></div>
      </div>

      {/* Table skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-4">
          {/* Table header */}
          <div className="flex gap-4 mb-4 pb-2 border-b border-gray-200">
            <div className="h-5 bg-gray-200 rounded w-5"></div>
            <div className="h-5 bg-gray-200 rounded w-40"></div>
            <div className="h-5 bg-gray-200 rounded w-48"></div>
            <div className="h-5 bg-gray-200 rounded w-24"></div>
            <div className="h-5 bg-gray-200 rounded w-32"></div>
          </div>

          {/* Table rows */}
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex gap-4 mb-3 items-center">
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-40"></div>
              <div className="h-4 bg-gray-200 rounded w-48"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
