import { cookies } from "next/headers";
import api from "@/lib/api";
import { urls } from "@/lib/urls";
import { ChevronLeft, Users } from "lucide-react";
import Link from "next/link";
import { cache } from "react";

const getEvent = cache(async (eventId) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("eventsTingAuthToken");

  try {
    const response = await api.get(urls.getAllEvents, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });
    return response.data.data.rows.find((event) => event.id === eventId);
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return null;
  }
});

export default async function EventHeader({ eventId }) {
  const event = await getEvent(eventId);

  if (!event) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Event Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          The requested event could not be found.
        </p>
        <Link
          href="/events"
          className="inline-flex items-center text-theme-primary hover:text-theme-primary_dark"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link href={`/events/${eventId}`}>
        <div className="inline-flex items-center text-gray-600 hover:text-theme-primary dark:text-gray-400 dark:hover:text-theme-primary_focus transition-colors text-sm md:text-base mb-4">
          <ChevronLeft size={18} className="mr-1" />
          <span className="font-medium">Back to Event</span>
        </div>
      </Link>

      <div className="flex items-center gap-3 mb-2">
        <Users className="w-8 h-8 text-theme-primary dark:text-theme-primary_focus" />
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
          {event.name} - Registrations
        </h1>
      </div>
    </div>
  );
}
