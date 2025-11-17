import { Activity, CheckCircle2 } from "lucide-react";

export default function RecentActivityList({ activities = [] }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
        <Activity className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
        <p className="text-gray-600 dark:text-gray-400">No recent activity</p>
      </div>
    );
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {activities.map((activity, index) => (
          <div
            key={activity.ticketId || index}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.user?.name || "Unknown User"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {activity.user?.email}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {formatTime(activity.checkInTime)}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                  <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                    {activity.ticketId || "N/A"}
                  </span>
                  <span className="text-gray-400 dark:text-gray-500">•</span>
                  <span className="truncate">{activity.event?.name}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
