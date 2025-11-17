"use client";

import { handleLogout } from "@/app/actions/logout";
import { BarChart3, Calendar, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const CalendarIcon = ({ size = 20 }) => <Calendar size={size} />;
const AnalyticsIcon = ({ size = 20 }) => <BarChart3 size={size} />;
const LogoutIcon = ({ size = 20 }) => <LogOut size={size} />;
const MenuIcon = ({ size = 24 }) => <Menu size={size} />;
const CloseIcon = ({ size = 24 }) => <X size={size} />;

const NavItem = ({ href, icon, children, active }) => (
  <Link href={href}>
    <div
      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
        active
          ? "bg-purple-100 text-theme-primary font-bold"
          : "hover:bg-gray-100"
      }`}
    >
      <div className="mr-3">{icon}</div>
      <span>{children}</span>
    </div>
  </Link>
);

export const DesktopNavbar = ({ user }) => {
  const pathname = usePathname();

  return (
    <aside className="h-screen fixed w-[250px] bg-white border-r border-gray-200 flex flex-col p-4">
      <div className="flex-shrink-0 mb-10">
        <Link href="/events">
          <h1 className="text-3xl font-bold text-theme-primary hover:opacity-80 transition-opacity px-3">
            Events Ting
          </h1>
        </Link>
      </div>
      <nav className="flex-grow">
        <NavItem
          href="/events"
          icon={<CalendarIcon />}
          active={pathname === "/events"}
        >
          Events
        </NavItem>
        {user?.roles?.includes("ADMIN") && (
          <NavItem
            href="/analytics/summary"
            icon={<AnalyticsIcon />}
            active={pathname?.startsWith("/analytics")}
          >
            Analytics
          </NavItem>
        )}
      </nav>
      <div className="flex-shrink-0">
        <form action={handleLogout}>
          <button type="submit" className="w-full">
            <div className="flex items-center p-3 rounded-lg cursor-pointer transition-colors text-red-600 hover:bg-red-50">
              <div className="mr-3">
                <LogoutIcon />
              </div>
              <span>Logout</span>
            </div>
          </button>
        </form>
      </div>
    </aside>
  );
};

export const MobileNavbar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="md:hidden bg-white sticky top-0 z-10">
      <div className="flex justify-between items-center p-4">
        <Link href="/events">
          <h1 className="text-2xl font-bold text-theme-primary">Events Ting</h1>
        </Link>
        <button onClick={() => setIsOpen(true)}>
          <MenuIcon />
        </button>
      </div>
      {isOpen && (
        <nav className="fixed inset-0 bg-white z-50 flex flex-col p-4">
          <div className="flex justify-between items-center mb-8">
            <Link href="/events">
              <h1 className="text-2xl font-bold text-theme-primary">
                Events Ting
              </h1>
            </Link>
            <button onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </button>
          </div>
          <div className="flex-grow">
            <NavItem
              href="/events"
              icon={<CalendarIcon />}
              active={pathname === "/events"}
            >
              Events
            </NavItem>
            {user?.roles?.includes("ADMIN") && (
              <NavItem
                href="/analytics/summary"
                icon={<AnalyticsIcon />}
                active={pathname?.startsWith("/analytics")}
              >
                Analytics
              </NavItem>
            )}
          </div>
          <div className="flex-shrink-0">
            <form action={handleLogout}>
              <button type="submit" className="w-full">
                <div className="flex items-center p-3 rounded-lg cursor-pointer transition-colors text-red-600 hover:bg-red-50">
                  <div className="mr-3">
                    <LogoutIcon />
                  </div>
                  <span>Logout</span>
                </div>
              </button>
            </form>
          </div>
        </nav>
      )}
    </header>
  );
};
