import { verifySession } from "@/app/actions/verifySession";
import UsersManager from "@/components/users/UsersManager";
import { isAdmin } from "@/lib/permissions";
import { ChevronLeft, Users } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminUsersPage() {
  // Auth and permission checks
  const user = await verifySession();
  if (!isAdmin(user)) {
    redirect("/events");
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("eventsTingAuthToken")?.value;

  return (
    <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Breadcrumb */}
        <Link href="/events">
          <div className="inline-flex items-center text-gray-600 hover:text-theme-primary dark:text-gray-400 dark:hover:text-theme-primary_focus transition-colors text-sm md:text-base">
            <ChevronLeft size={18} className="mr-1" />
            <span className="font-medium">Back to Events</span>
          </div>
        </Link>

        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-theme-primary dark:text-theme-primary_focus" />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              User Management
            </h1>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage system users and their roles
          </p>
        </div>

        {/* Users Manager Component */}
        <UsersManager token={token} />
      </div>
    </div>
  );
}
