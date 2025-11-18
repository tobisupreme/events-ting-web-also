import Main from "@/components/Main";
import api from "@/lib/api";
import { urls } from "@/lib/urls";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

// Revalidate every 60 seconds
export const revalidate = 60;

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

export default async function CheckInPage({ params }) {
  const { eventId } = await params;

  // Check authentication
  const cookieStore = await cookies();
  const token = cookieStore.get("eventsTingAuthToken");

  // Redirect to login if not authenticated
  if (!token?.value) {
    redirect("/");
  }

  // Fetch event data to pass to Main component
  const event = await getEvent(eventId);

  return <Main eventId={eventId} event={event} />;
}
