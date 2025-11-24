export default function EventHeaderSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 bg-gray-200 rounded"></div>
        <div className="h-8 bg-gray-200 rounded w-96"></div>
      </div>
      <div className="h-5 bg-gray-200 rounded w-64 mt-2"></div>
    </div>
  );
}
