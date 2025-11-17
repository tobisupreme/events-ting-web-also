import api from "@/lib/api";
import { urls } from "@/lib/urls";
import { BarChart3, Calendar, ChevronLeft, MapPin } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { cache } from "react";
import { getEventStatus } from "../../../lib/eventUtils";

// Revalidate every 60 seconds
export const revalidate = 60;

// Pre-generate pages for all events at build time
export async function generateStaticParams() {
  try {
    // We can't use cookies in generateStaticParams, so this is limited
    // But Next.js will still cache the pages once visited
    return [];
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [];
  }
}

const getEvent = cache(async (eventId) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("eventsTingAuthToken");

  try {
    const response = await api.get(urls.getAllEvents, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });
    const event = response.data.data.rows.find((event) => event.id === eventId);
    return event;
  } catch (error) {
    console.error("Failed to fetch events:", error);
    throw new Error("Failed to fetch events");
  }
});

async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get("eventsTingAuthToken");
  return !!token?.value;
}

function formatEventTime(start, end) {
  const startTime = new Date(start).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const endTime = new Date(end).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });
  return `${startTime} - ${endTime}`;
}

export default async function EventDashboardPage({ params }) {
  const { eventId } = await params;
  const event = await getEvent(eventId);
  const userIsAuthenticated = await isAuthenticated();

  const eventDate = new Date(event.startDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const { isUpcoming, isOngoing, status } = getEventStatus(
    event.startDate,
    event.endDate
  );

  return (
    <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-8">
        <Link href="/events">
          <div className="inline-flex items-center text-gray-600 hover:text-theme-primary dark:text-gray-400 dark:hover:text-theme-primary_focus transition-colors text-sm md:text-base">
            <ChevronLeft size={18} className="mr-1" />
            <span className="font-medium">Back to Events</span>
          </div>
        </Link>

        {/* Header Section */}
        <div className="space-y-3 md:space-y-4">
          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-block px-2.5 md:px-3 py-1 rounded-full text-xs font-semibold ${
                isUpcoming
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                  : isOngoing
                  ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
              }`}
            >
              {status}
            </span>
            <span className="inline-block bg-theme-primary/10 text-theme-primary dark:bg-theme-primary/20 dark:text-theme-primary_focus px-2.5 md:px-3 py-1 rounded-full text-xs font-semibold">
              {event.type}
            </span>
          </div>

          {/* Event Title */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            {event.name}
          </h1>

          {/* Organizer Info */}
          {event.organizer && (
            <div className="flex items-center gap-2 md:gap-3">
              <div className="bg-theme-primary/10 text-theme-primary dark:bg-theme-primary/20 dark:text-theme-primary_focus flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full font-semibold text-sm md:text-base">
                {event.organizer?.[0]?.toUpperCase() ?? "?"}
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  Organized by
                </p>
                <p className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
                  {event.organizer}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Event Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6 shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">
            Event Details
          </h2>

          <div className="space-y-3 md:space-y-4">
            {/* Date */}
            <div className="flex items-start gap-2 md:gap-3">
              <Calendar
                size={18}
                className="mt-0.5 text-gray-400 dark:text-gray-500 flex-shrink-0 md:w-5 md:h-5"
              />
              <div>
                <p className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
                  {eventDate}
                </p>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  {formatEventTime(event.startDate, event.endDate)}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2 md:gap-3">
              <MapPin
                size={18}
                className="mt-0.5 text-gray-400 dark:text-gray-500 flex-shrink-0 md:w-5 md:h-5"
              />
              <div>
                <p className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
                  {event.venue}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Card - Only visible to authenticated users */}
        {userIsAuthenticated && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6 shadow-sm">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">
              Event Management
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <Link href={`/events/${eventId}/check-in`}>
                <div className="group bg-gradient-to-br from-theme-primary to-theme-primary_dark text-white rounded-lg p-4 md:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-2 md:gap-3">
                    <svg
                      className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-base md:text-lg">
                        Check-in Attendees
                      </h3>
                      <p className="text-xs md:text-sm text-white/80">
                        Scan tickets and verify registrations
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Analytics Card */}
              <Link href={`/events/${eventId}/analytics`}>
                <div className="group bg-gradient-to-br from-theme-primary to-theme-primary_dark text-white rounded-lg p-4 md:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-2 md:gap-3">
                    <BarChart3 className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-base md:text-lg">
                        View Analytics
                      </h3>
                      <p className="text-xs md:text-sm text-white/80">
                        Statistics and check-in insights
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
