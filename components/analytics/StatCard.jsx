export default function StatCard({
  title,
  value,
  icon: Icon,
  subtitle,
  color = "theme-primary",
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {value?.toLocaleString() ?? "0"}
          </p>
          {subtitle && (
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2">
              {subtitle}
            </p>
          )}
        </div>
        {Icon && (
          <div
            className={`p-2 md:p-3 rounded-lg bg-${color}/10 dark:bg-${color}/20`}
          >
            <Icon
              className={`w-5 h-5 md:w-6 md:h-6 text-${color} dark:text-${color}_focus`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
