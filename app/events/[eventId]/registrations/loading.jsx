import EventHeaderSkeleton from "@/components/email/EventHeaderSkeleton";
import RegistrationsTableSkeleton from "@/components/email/RegistrationsTableSkeleton";

export default function RegistrationsLoading() {
  return (
    <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6 animate-pulse">
        <EventHeaderSkeleton />
        <RegistrationsTableSkeleton />
      </div>
    </div>
  );
}
