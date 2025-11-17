import { verifySession } from "@/app/actions/verifySession";
import AnalyticsEmpty from "@/components/analytics/AnalyticsEmpty";
import ProgressBar from "@/components/analytics/ProgressBar";
import StatCard from "@/components/analytics/StatCard";
import api from "@/lib/api";
import { urls } from "@/lib/urls";
import {
  Award,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Target,
  Ticket,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cache } from "react";

// Revalidate every 60 seconds
export const revalidate = 60;

const getEventStats = cache(async (eventId) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("eventsTingAuthToken");

  try {
    const response = await api.get(urls.analytics.eventStats(eventId), {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });
    return response.data?.data || null;
  } catch (error) {
    console.error("Failed to fetch event stats:", error);
    return null;
  }
});

export default async function EventAnalyticsPage({ params }) {
  const user = await verifySession();
  if (!user?.roles?.includes("ADMIN")) {
    redirect("/events");
  }

  const { eventId } = await params;
  const stats = await getEventStats(eventId);

  if (!stats) {
    return (
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
        <div className="max-w-6xl mx-auto">
          <Link href={`/events/${eventId}`}>
            <div className="inline-flex items-center text-gray-600 hover:text-theme-primary dark:text-gray-400 dark:hover:text-theme-primary_focus transition-colors text-sm md:text-base mb-6">
              <ChevronLeft size={18} className="mr-1" />
              <span className="font-medium">Back to Event</span>
            </div>
          </Link>
          <AnalyticsEmpty message="Unable to load analytics data" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
      <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div>
          <Link href={`/events/${eventId}`}>
            <div className="inline-flex items-center text-gray-600 hover:text-theme-primary dark:text-gray-400 dark:hover:text-theme-primary_focus transition-colors text-sm md:text-base mb-4">
              <ChevronLeft size={18} className="mr-1" />
              <span className="font-medium">Back to Event</span>
            </div>
          </Link>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            {stats.event?.name}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Analytics and statistics overview
          </p>
        </div>

        {/* Event Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Type</p>
              <p className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
                {stats.event?.type}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Venue</p>
              <p className="text-sm md:text-base font-medium text-gray-900 dark:text-white truncate">
                {stats.event?.venue || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Start Date
              </p>
              <p className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
                {new Date(stats.event?.startDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Check-in Users
              </p>
              <p className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
                {stats.uniqueCheckInUsers || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Registrations"
            value={stats.totalRegistrations}
            icon={Users}
            color="theme-primary"
          />
          <StatCard
            title="Total Tickets"
            value={stats.totalTickets}
            icon={Ticket}
            color="theme-primary"
          />
          <StatCard
            title="Checked In"
            value={stats.checkedInTickets}
            icon={CheckCircle2}
            color="theme-primary"
          />
          <StatCard
            title="Pending"
            value={stats.pendingTickets}
            icon={Clock}
            color="theme-primary"
          />
        </div>

        {/* Check-in Rate Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-theme-primary dark:text-theme-primary_focus" />
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                Check-in Rate
              </h2>
            </div>
            <span className="text-2xl md:text-3xl font-bold text-theme-primary dark:text-theme-primary_focus">
              {stats.checkInRate?.toFixed(1)}%
            </span>
          </div>
          <ProgressBar percentage={stats.checkInRate} showLabel={false} />
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Confirmed
              </p>
              <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                {stats.checkedInTickets}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Pending
              </p>
              <p className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                {stats.pendingTickets}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Cancelled
              </p>
              <p className="text-lg font-semibold text-red-600 dark:text-red-400">
                {stats.cancelledTickets}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatCard
            title="Cancelled Tickets"
            value={stats.cancelledTickets}
            icon={XCircle}
            color="theme-primary"
          />
          <StatCard
            title="Unique Check-in Users"
            value={stats.uniqueCheckInUsers}
            icon={Target}
            color="theme-primary"
            subtitle="Staff members who performed check-ins"
          />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">
            Quick Actions
          </h2>
          <Link href={`/analytics/leaderboard?eventId=${eventId}`}>
            <div className="bg-gradient-to-br from-theme-primary to-theme-primary_dark text-white rounded-lg p-4 md:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-base md:text-lg">
                      View Event Leaderboard
                    </h3>
                    <p className="text-xs md:text-sm text-white/80">
                      See top check-in performers for this event
                    </p>
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 rotate-180" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
