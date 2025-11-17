export default function ProgressBar({ percentage, label, showLabel = true }) {
  // Ensure percentage is between 0 and 100
  const validPercentage = Math.min(Math.max(percentage || 0, 0), 100);

  return (
    <div className="w-full">
      {showLabel && label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {label}
          </span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {validPercentage.toFixed(1)}%
          </span>
        </div>
      )}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 md:h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-theme-primary to-theme-primary_focus rounded-full transition-all duration-500 ease-out"
          style={{ width: `${validPercentage}%` }}
        />
      </div>
    </div>
  );
}
