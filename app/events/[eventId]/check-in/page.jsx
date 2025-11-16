import Main from "@/components/Main";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function CheckInPage({ params }) {
  const { eventId } = await params;

  // Check authentication
  const cookieStore = await cookies();
  const token = cookieStore.get("eventsTingAuthToken");

  // Redirect to login if not authenticated
  if (!token?.value) {
    redirect("/");
  }

  return <Main eventId={eventId} />;
}
