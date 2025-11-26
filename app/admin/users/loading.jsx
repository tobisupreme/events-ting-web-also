import UsersTableSkeleton from "@/components/users/UsersTableSkeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="space-y-3">
          <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 w-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        <UsersTableSkeleton />
      </div>
    </div>
  );
}
