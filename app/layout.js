import { DesktopNavbar, MobileNavbar } from "@/components/Navbar";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Events Ting",
  description: "Your go-to for event check-ins",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("eventsTingAuthToken");

  if (!session) {
    return (
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <MobileNavbar />
        <div className="md:grid md:grid-cols-[250px_1fr]">
          <div className="hidden md:block">
            <DesktopNavbar />
          </div>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
