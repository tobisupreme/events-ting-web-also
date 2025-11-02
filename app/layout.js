import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EventsTing Check-In",
  description: "",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("eventsTingAuthToken");

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-white text-black`}>
        {session && <Navbar />}
        <main>{children}</main>
      </body>
    </html>
  );
}
