import { verifySession } from "@/app/actions/verifySession";
import RegistrationsManager from "@/components/email/RegistrationsManager";
import { isAdmin } from "@/lib/permissions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import EventHeader from "./EventHeader";

export default async function RegistrationsPage({ params }) {
  const user = await verifySession();

  // ADMIN-ONLY access
  if (!isAdmin(user)) {
    redirect("/events");
  }

  const { eventId } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("eventsTingAuthToken")?.value;

  return (
    <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <EventHeader eventId={eventId} />

        {/* Content */}
        <RegistrationsManager eventId={eventId} token={token} />
      </div>
    </div>
  );
}
