import Link from "next/link";

export default async function EventDashboardPage({ params }) {
  const { eventId } = await params;

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Event Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          You have selected event: {eventId}
        </p>
        <Link href={`/events/${eventId}/check-in`}>
          <div className="inline-block bg-theme-primary text-white font-bold py-4 px-8 rounded-lg hover:bg-theme-primary_dark transition-colors">
            Check-in Attendees
          </div>
        </Link>
      </div>
    </div>
  );
}
