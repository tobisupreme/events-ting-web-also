import { urls } from "@/lib/urls";
import { Calendar, ChevronLeft, Clock, MapPin } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

async function getEvent(eventId) {
  const cookieStore = await cookies();
  const token = cookieStore.get("eventsTingAuthToken");

  const res = await fetch(urls.getAllEvents, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  const json = await res.json();
  const event = json.data.rows.find((event) => event.id === eventId);
  return event;
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

  const eventDate = new Date(event.startDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/events">
          <div className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
            <ChevronLeft size={20} className="mr-1" />
            Back
          </div>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {event.name}
          </h1>
          <div className="space-y-3 text-gray-600">
            <div className="flex items-center">
              <Calendar size={20} className="mr-3" />
              <span>{eventDate}</span>
            </div>
            <div className="flex items-center">
              <Clock size={20} className="mr-3" />
              <span>{formatEventTime(event.startDate, event.endDate)}</span>
            </div>
            <div className="flex items-center">
              <MapPin size={20} className="mr-3" />
              <span>{event.venue}</span>
            </div>
          </div>
        </div>

        <hr className="my-8" />

        <div>
          <h2 className="text-2xl font-bold mb-4">Actions</h2>
          <Link href={`/events/${eventId}/check-in`}>
            <div className="inline-block bg-theme-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-theme-primary_dark transition-colors">
              Check-in Attendees
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
