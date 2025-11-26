import { LoginForm } from "@/components/LoginForm";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const session = cookieStore.get("eventsTingAuthToken");

  if (session) {
    redirect("/events");
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:block relative overflow-hidden">
        <Image
          src="https://picsum.photos/1200/800"
          alt="Events background"
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
      </div>
      <div className="flex flex-col justify-center items-center p-8 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
