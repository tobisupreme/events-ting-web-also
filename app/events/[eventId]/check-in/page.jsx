import Main from "@/components/Main";

export default async function CheckInPage({ params }) {
  const { eventId } = await params;

  return <Main eventId={eventId} />;
}
