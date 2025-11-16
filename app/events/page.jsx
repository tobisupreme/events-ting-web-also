import api from "@/lib/api";
import { urls } from "@/lib/urls";
import { cookies } from "next/headers";
import Link from "next/link";
import { getEventStatus } from "../../lib/eventUtils";

export const dynamic = "force-dynamic";

async function getEvents() {
  const cookieStore = await cookies();
  const token = cookieStore.get("eventsTingAuthToken");

  try {
    const response = await api.get(urls.getAllEvents, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });
    return response.data.data.rows;
  } catch (error) {
    console.error("Failed to fetch events:", error);
    throw new Error("Failed to fetch events");
  }
}

const EventCard = ({ event }) => {
  const startDate = new Date(event.startDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const imageUrl = event.metadata?.image;

  const { isUpcoming, isOngoing, status } = getEventStatus(
    event.startDate,
    event.endDate
  );

  return (
    <Link href={`/events/${event.id}`}>
      <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 h-full flex flex-col">
        {/* Image Section */}
        <div className="relative w-full aspect-video overflow-hidden bg-gray-200 dark:bg-gray-700">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={event.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
              <svg
                className="w-16 h-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
          {/* Event Type Badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-block bg-theme-primary/10 text-theme-primary dark:bg-theme-primary/20 dark:text-theme-primary_focus text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
              {event.type}
            </span>
          </div>
          {/* Event Status Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                isUpcoming
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                  : isOngoing
                  ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex-grow flex flex-col">
          <h3 className="text-lg font-bold text-theme-primary dark:text-theme-primary_focus mb-2 line-clamp-2 group-hover:text-theme-primary_dark transition-colors">
            {event.name}
          </h3>

          <div className="space-y-2 mb-4 flex-grow">
            <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
              <svg
                className="w-4 h-4 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {startDate}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center line-clamp-1">
              <svg
                className="w-4 h-4 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {event.venue}
            </p>
          </div>

          {/* Organizer Badge */}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
            <span className="inline-flex items-center bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium px-3 py-1 rounded-full">
              <svg
                className="w-3 h-3 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {event.organizer}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Discover Events
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Browse upcoming conferences, meetups, and workshops
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
