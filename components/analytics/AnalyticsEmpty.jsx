import { BarChart3 } from "lucide-react";

export default function AnalyticsEmpty({
  message = "No analytics data available",
  icon: Icon = BarChart3,
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
      <Icon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
      <p className="text-gray-600 dark:text-gray-400 text-lg">{message}</p>
      <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
        Data will appear here once check-ins are recorded
      </p>
    </div>
  );
}
