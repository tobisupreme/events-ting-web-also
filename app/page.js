import { LoginForm } from "@/components/LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const session = cookieStore.get("eventsTingAuthToken");

  if (session) {
    redirect("/events");
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div
        className="hidden md:block bg-cover bg-center"
        style={{ backgroundImage: "url('https://picsum.photos/1200/800')" }}
      >
        {/* Background Image Column */}
      </div>
      <div className="flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
