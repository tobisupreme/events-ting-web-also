import { DesktopNavbar, MobileNavbar } from "@/components/Navbar";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
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
        <body className={inter.className}>
          <NuqsAdapter>{children}</NuqsAdapter>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <NuqsAdapter>
          <MobileNavbar user={user} />
          <div className="md:grid md:grid-cols-[250px_1fr]">
            <div className="hidden md:block">
              <DesktopNavbar user={user} />
            </div>
            <main>
              <Suspense
                fallback={
                  <div className="flex items-center justify-center min-h-[50vh]">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 border-4 border-theme-primary border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-gray-600 font-medium">Loading...</p>
                    </div>
                  </div>
                }
              >
                {children}
              </Suspense>
            </main>
          </div>
        </NuqsAdapter>
      </body>
    </html>
  );
}
