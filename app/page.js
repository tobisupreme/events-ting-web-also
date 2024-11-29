import Main from "@/components/Main";
import { cookies } from "next/headers";
import { handleTokenSubmit, verifyToken } from "./actions";

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("ypitScannerAccessToken");
  const isTokenVerified = await verifyToken(accessToken?.value);

  console.log(accessToken);

  if (!accessToken || !isTokenVerified) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold mb-4">Enter Access Token</h2>
          <form action={handleTokenSubmit}>
            <input
              type="password"
              className="border p-2 mb-4 w-full text-center"
              id="token"
              name="token"
            />
            <button
              className="btn !text-white !bg-blue-600 !hover:bg-blue-700"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  return (
    <Main />
  )
}
