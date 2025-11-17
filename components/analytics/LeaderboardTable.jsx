import { Award, Medal, Trophy } from "lucide-react";

export default function LeaderboardTable({ leaderboard = [] }) {
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return null;
    }
  };

  const getRankBadgeColor = (rank) => {
    switch (rank) {
      case 1:
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200";
      case 2:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200";
      case 3:
        return "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200";
      default:
        return "bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  if (!leaderboard || leaderboard.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
        <Award className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
        <p className="text-gray-600 dark:text-gray-400">
          No leaderboard data available
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Desktop Table View */}
      <div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Check-ins
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {leaderboard.map((entry) => (
              <tr
                key={entry.user.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${getRankBadgeColor(
                        entry.rank
                      )}`}
                    >
                      {entry.rank}
                    </span>
                    {getRankIcon(entry.rank)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {entry.user.name || "N/A"}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {entry.user.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {entry.checkInCount.toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {leaderboard.map((entry) => (
          <div
            key={entry.user.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${getRankBadgeColor(
                    entry.rank
                  )}`}
                >
                  {entry.rank}
                </span>
                {getRankIcon(entry.rank)}
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {entry.checkInCount.toLocaleString()}
              </span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {entry.user.name || "N/A"}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {entry.user.email}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
