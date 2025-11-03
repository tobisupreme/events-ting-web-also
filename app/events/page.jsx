import api from "@/lib/api";
import { urls } from "@/lib/urls";
import { cookies } from "next/headers";
import Link from "next/link";

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

  return (
    <Link href={`/events/${event.id}`}>
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 border border-gray-200 flex items-start">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={event.name}
            className="w-[140px] md:w-40 aspect-square object-cover rounded-md flex-shrink-0"
          />
        ) : (
          <div className="w-[140px] md:w-40 aspect-square bg-gray-200 flex items-center justify-center rounded-md flex-shrink-0 text-gray-500">
            No Image
          </div>
        )}

        <div className="ml-4 flex-grow">
          <h4 className="text-xl font-bold text-theme-primary mb-2">
            {event.name}
          </h4>

          <p className="text-gray-600 mb-1">{startDate}</p>

          <p className="text-gray-500 mb-4">
            {event.venue} ({event.type})
          </p>

          <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
            {event.organizer}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="bg-white min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
