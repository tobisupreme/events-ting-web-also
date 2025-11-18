import { verifySession } from "@/app/actions/verifySession";
import AnalyticsEmpty from "@/components/analytics/AnalyticsEmpty";
import LeaderboardTable from "@/components/analytics/LeaderboardTable";
import api from "@/lib/api";
import { urls } from "@/lib/urls";
import { Award, ChevronLeft } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cache } from "react";

// Revalidate every 30 seconds (more dynamic)
export const revalidate = 30;

const getLeaderboard = cache(async (searchParams) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("eventsTingAuthToken");

  try {
    const response = await api.get(urls.analytics.leaderboard, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
      params: searchParams,
    });
    return response.data?.data || null;
  } catch (error) {
    console.error("Failed to fetch leaderboard:", error);
    return null;
  }
});

const getEventName = cache(async (eventId) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("eventsTingAuthToken");

  try {
    const response = await api.get(urls.getAllEvents, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });
    const event = response.data.data.rows.find((event) => event.id === eventId);
    return event?.name || null;
  } catch (error) {
    console.error("Failed to fetch event name:", error);
    return null;
  }
});

export default async function LeaderboardPage({ searchParams }) {
  const user = await verifySession();
  if (!user?.roles?.includes("ADMIN")) {
    redirect("/events");
  }

  const params = await searchParams;

  const [leaderboardData, eventName] = await Promise.all([
    getLeaderboard(params),
    params.eventId ? getEventName(params.eventId) : Promise.resolve(null),
  ]);

  const backUrl = params.eventId
    ? `/events/${params.eventId}/analytics`
    : "/analytics/summary";
  const backLabel = params.eventId
    ? "Back to Event Analytics"
    : "Back to Analytics";

  return (
    <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
      <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
        {/* Breadcrumb */}
        <Link href={backUrl}>
          <div className="inline-flex items-center text-gray-600 hover:text-theme-primary dark:text-gray-400 dark:hover:text-theme-primary_focus transition-colors text-sm md:text-base">
            <ChevronLeft size={18} className="mr-1" />
            <span className="font-medium">{backLabel}</span>
          </div>
        </Link>

        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-8 h-8 text-theme-primary dark:text-theme-primary_focus" />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Check-in Leaderboard
            </h1>
          </div>
          {eventName && (
            <div className="inline-block bg-theme-primary/10 text-theme-primary dark:bg-theme-primary/20 dark:text-theme-primary_focus px-3 py-1 rounded-full text-sm font-semibold mb-2">
              Event: {eventName}
            </div>
          )}
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {eventName
              ? "Top performers for this event ranked by check-ins"
              : "Top performers ranked by number of ticket check-ins"}
          </p>
        </div>

        {/* Stats Summary */}
        {leaderboardData?.pagination && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Total Users:{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {leaderboardData.pagination.total}
                </span>
              </span>
              {leaderboardData.pagination.page && (
                <span className="text-gray-600 dark:text-gray-400">
                  Page {leaderboardData.pagination.page} of{" "}
                  {Math.ceil(
                    leaderboardData.pagination.total /
                      leaderboardData.pagination.limit
                  )}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        {leaderboardData?.leaderboard &&
        leaderboardData.leaderboard.length > 0 ? (
          <LeaderboardTable leaderboard={leaderboardData.leaderboard} />
        ) : (
          <AnalyticsEmpty
            icon={Award}
            message="No leaderboard data available"
          />
        )}
      </div>
    </div>
  );
}
