import { DesktopNavbar, MobileNavbar } from "@/components/Navbar";
import { Inter } from "next/font/google";
import { verifySession } from "./actions/verifySession";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Events Ting",
  description: "Your go-to for event check-ins",
};

export default async function RootLayout({ children }) {
  const user = await verifySession();

  if (!user) {
    return (
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <MobileNavbar user={user} />
        <div className="md:grid md:grid-cols-[250px_1fr]">
          <div className="hidden md:block">
            <DesktopNavbar user={user} />
          </div>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
