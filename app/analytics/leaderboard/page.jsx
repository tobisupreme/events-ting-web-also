import { verifySession } from "@/app/actions/verifySession";
import LeaderboardManager from "@/components/analytics/LeaderboardManager";
import api from "@/lib/api";
import { canCheckInAttendees } from "@/lib/permissions";
import { urls } from "@/lib/urls";
import { Award, ChevronLeft } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cache } from "react";

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
  if (!canCheckInAttendees(user)) {
    redirect("/events");
  }

  const params = await searchParams;
  const cookieStore = await cookies();
  const token = cookieStore.get("eventsTingAuthToken")?.value;

  const eventName = params.eventId ? await getEventName(params.eventId) : null;

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

        {/* Client component with SWR */}
        <LeaderboardManager
          token={token}
          initialEventId={params.eventId || ""}
        />
      </div>
    </div>
  );
}
