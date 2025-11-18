export default function CheckInLoading() {
  return (
    <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-5 bg-gray-200 rounded w-1/2"></div>
        </div>

        {/* Scanner/Input area skeleton */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 animate-pulse">
          <div className="aspect-square bg-gray-200 rounded-lg mb-4 max-w-md mx-auto"></div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Instructions skeleton */}
        <div className="bg-gray-50 rounded-lg p-4 animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
}
