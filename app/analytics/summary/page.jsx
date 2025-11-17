import AnalyticsEmpty from "@/components/analytics/AnalyticsEmpty";
import RecentActivityList from "@/components/analytics/RecentActivityList";
import StatCard from "@/components/analytics/StatCard";
import api from "@/lib/api";
import { urls } from "@/lib/urls";
import {
  Activity,
  Award,
  BarChart3,
  Calendar,
  CheckCircle2,
  Ticket,
  Users,
} from "lucide-react";
import { cookies } from "next/headers";
import { cache } from "react";

// Revalidate every 60 seconds
export const revalidate = 60;

const getAnalyticsSummary = cache(async (searchParams) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("eventsTingAuthToken");

  try {
    const response = await api.get(urls.analytics.summary, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
      params: searchParams,
    });
    return response.data?.data || null;
  } catch (error) {
    console.error("Failed to fetch analytics summary:", error);
    return null;
  }
});

export default async function AnalyticsSummaryPage({ searchParams }) {
  const params = await searchParams;
  const summary = await getAnalyticsSummary(params);

  if (!summary) {
    return (
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
        <div className="max-w-7xl mx-auto">
          <AnalyticsEmpty message="Unable to load analytics summary" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-8 h-8 text-theme-primary dark:text-theme-primary_focus" />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Analytics Dashboard
            </h1>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            System-wide overview of events, registrations, and check-ins
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Check-ins"
            value={summary.totalCheckIns}
            icon={CheckCircle2}
            color="theme-primary"
          />
          <StatCard
            title="Total Events"
            value={summary.totalEvents}
            icon={Calendar}
            color="theme-primary"
          />
          <StatCard
            title="Total Registrations"
            value={summary.totalRegistrations}
            icon={Users}
            color="theme-primary"
          />
          <StatCard
            title="Total Tickets"
            value={summary.totalTickets}
            icon={Ticket}
            color="theme-primary"
          />
        </div>

        {/* Status Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6 shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Ticket Status Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-600 dark:text-green-400 mb-1">
                Confirmed
              </p>
              <p className="text-2xl md:text-3xl font-bold text-green-700 dark:text-green-300">
                {summary.checkInsByStatus?.confirmed?.toLocaleString() || 0}
              </p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
              <p className="text-sm text-orange-600 dark:text-orange-400 mb-1">
                Pending
              </p>
              <p className="text-2xl md:text-3xl font-bold text-orange-700 dark:text-orange-300">
                {summary.checkInsByStatus?.pending?.toLocaleString() || 0}
              </p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400 mb-1">
                Cancelled
              </p>
              <p className="text-2xl md:text-3xl font-bold text-red-700 dark:text-red-300">
                {summary.checkInsByStatus?.cancelled?.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Top Performer */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-theme-primary dark:text-theme-primary_focus" />
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                Top Performer
              </h2>
            </div>
            {summary.topCheckInUser ? (
              <div className="bg-gradient-to-br from-theme-primary/10 to-theme-primary_focus/10 dark:from-theme-primary/20 dark:to-theme-primary_focus/20 rounded-lg p-4 border border-theme-primary/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-theme-primary/20 dark:bg-theme-primary/30 flex items-center justify-center">
                    <span className="text-xl font-bold text-theme-primary dark:text-theme-primary_focus">
                      {summary.topCheckInUser.user?.name?.[0]?.toUpperCase() ||
                        "?"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {summary.topCheckInUser.user?.name || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {summary.topCheckInUser.user?.email}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl md:text-3xl font-bold text-theme-primary dark:text-theme-primary_focus">
                      {summary.topCheckInUser.checkInCount?.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      check-ins
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No check-in data available
              </p>
            )}
          </div>

          {/* Active Users */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6 shadow-sm">
            <StatCard
              title="Active Check-in Users"
              value={summary.activeCheckInUsers}
              icon={Users}
              color="theme-primary"
              subtitle="Staff members who have performed check-ins"
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-theme-primary dark:text-theme-primary_focus" />
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h2>
          </div>
          <RecentActivityList activities={summary.recentCheckIns || []} />
        </div>
      </div>
    </div>
  );
}
