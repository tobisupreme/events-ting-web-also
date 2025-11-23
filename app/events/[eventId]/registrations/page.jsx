import { verifySession } from "@/app/actions/verifySession";
import { isAdmin } from "@/lib/permissions";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import api from "@/lib/api";
import { urls } from "@/lib/urls";
import { ChevronLeft, Users } from "lucide-react";
import Link from "next/link";
import { cache } from "react";
import RegistrationsManager from "@/components/email/RegistrationsManager";

// Revalidate every 30 seconds for fresh data
export const revalidate = 30;

const getRegistrations = cache(async (eventId) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("eventsTingAuthToken");

  try {
    // Fetch all pages if needed (for now, we'll fetch with a high limit)
    // TODO: Implement proper pagination UI if registrations exceed limit
    const response = await api.get(urls.registrations.byEvent(eventId), {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
      params: {
        limit: 1000, // High limit to get all registrations
        page: 1,
      },
    });

    // Extract rows from paginated response
    return response.data?.data?.rows || [];
  } catch (error) {
    console.error("Failed to fetch registrations:", error);
    return [];
  }
});

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

export default async function RegistrationsPage({ params }) {
  const user = await verifySession();

  // ADMIN-ONLY access
  if (!isAdmin(user)) {
    redirect("/events");
  }

  const { eventId } = await params;

  // Fetch event and registrations in parallel
  const [event, registrations] = await Promise.all([
    getEvent(eventId),
    getRegistrations(eventId),
  ]);

  if (!event) {
    return (
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
        <div className="max-w-7xl mx-auto">
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
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
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

          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage registrations and send tickets to attendees.{" "}
            <span className="font-semibold">
              {registrations.length} total registration
              {registrations.length !== 1 ? "s" : ""}
            </span>
          </p>
        </div>

        {/* Client Component for interactive functionality */}
        <RegistrationsManager
          eventId={eventId}
          initialRegistrations={registrations}
        />
      </div>
    </div>
  );
}
