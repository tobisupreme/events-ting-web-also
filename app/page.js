import { LoginForm } from "@/components/LoginForm";
import Main from "@/components/Main";
import { cookies } from "next/headers";
import { verifySession } from "./actions";

export default async function Home() {
  const cookieStore = await cookies();
  const session = cookieStore.get("eventsTingAuthToken");
  const isSessionVerified = await verifySession(session?.value);

  if (!session || !isSessionVerified) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold mb-4">Login</h2>
          <LoginForm />
        </div>
      </div>
    );
  }

  return <Main />;
}
