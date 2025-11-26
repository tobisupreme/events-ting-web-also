"use client";

import { handleLogout } from "@/app/actions/logout";
import { lato } from "@/app/fonts";
import { canAccessAnalytics } from "@/lib/permissions";
import { BarChart3, Calendar, Loader2, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";

const CalendarIcon = ({ size = 20 }) => <Calendar size={size} />;
const AnalyticsIcon = ({ size = 20 }) => <BarChart3 size={size} />;
const LogoutIcon = ({ size = 20 }) => <LogOut size={size} />;
const MenuIcon = ({ size = 24 }) => <Menu size={size} />;
const CloseIcon = ({ size = 24 }) => <X size={size} />;

const titleText = "events ting";

// LogoutButton component with loading state (must be used inside form)
const LogoutButton = ({ isMobile = false }) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="w-full" disabled={pending}>
      <div
        className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 text-red-600 dark:text-red-400 ${
          pending
            ? "bg-red-50 dark:bg-red-500/20 opacity-70 cursor-not-allowed"
            : isMobile
            ? "hover:bg-red-50 dark:hover:bg-red-500/20 active:bg-red-100 dark:active:bg-red-500/30 active:scale-[0.98]"
            : "hover:bg-red-50 dark:hover:bg-red-500/20"
        }`}
      >
        <div className="mr-3">
          {pending ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <LogoutIcon />
          )}
        </div>
        <span className="font-medium">
          {pending ? "Logging out..." : "Logout"}
        </span>
      </div>
    </button>
  );
};

const NavItem = ({
  href,
  icon,
  children,
  active,
  onClick,
  isMobile = false,
}) => (
  <Link href={href} onClick={onClick}>
    <div
      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
        active
          ? "bg-purple-100 dark:bg-purple-500/20 text-theme-primary dark:text-theme-primary_focus font-bold"
          : isMobile
          ? "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 active:scale-[0.98]"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
      } ${isMobile ? "min-h-[44px]" : ""}`}
    >
      <div className="mr-3">{icon}</div>
      <span>{children}</span>
    </div>
  </Link>
);

export const DesktopNavbar = ({ user }) => {
  const pathname = usePathname();

  return (
    <aside className="h-screen fixed w-[250px] bg-background border-r border-gray-200 dark:border-gray-800 flex flex-col p-4">
      <div className="flex-shrink-0 mb-10">
        <Link href="/events">
          <h1
            className={`text-3xl font-bold text-theme-primary hover:opacity-80 transition-opacity px-3 ${lato.className}`}
          >
            {titleText}
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
        {canAccessAnalytics(user) && (
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
          <LogoutButton />
        </form>
      </div>
    </aside>
  );
};

export const MobileNavbar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const pathname = usePathname();

  const handleNavClick = () => {
    // Start closing animation
    setIsClosing(true);
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 200); // Match the transition duration
  };

  const handleMenuOpen = () => {
    setIsOpen(true);
    setIsClosing(false);
  };

  return (
    <header className="md:hidden bg-background border-gray-200 dark:border-gray-800 sticky top-0 z-10">
      <div className="flex justify-between items-center p-4">
        <Link href="/events">
          <h1
            className={`text-2xl font-bold text-theme-primary hover:opacity-80 transition-opacity ${lato.className}`}
          >
            {titleText}
          </h1>
        </Link>
        <button
          onClick={handleMenuOpen}
          className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 rounded-lg transition-all duration-200 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>
      </div>
      {isOpen && (
        <nav
          className={`fixed inset-0 bg-background z-50 flex flex-col p-4 transition-opacity duration-200 ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex justify-between items-center mb-8">
            <Link
              href="/events"
              onClick={handleNavClick}
              className="hover:opacity-80 transition-opacity"
            >
              <h1
                className={`text-2xl font-normal text-theme-primary ${lato.className}`}
              >
                events.ting
              </h1>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 rounded-lg transition-all duration-200 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="flex-grow">
            <NavItem
              href="/events"
              icon={<CalendarIcon />}
              active={pathname === "/events"}
              onClick={handleNavClick}
              isMobile={true}
            >
              Events
            </NavItem>
            {canAccessAnalytics(user) && (
              <NavItem
                href="/analytics/summary"
                icon={<AnalyticsIcon />}
                active={pathname?.startsWith("/analytics")}
                onClick={handleNavClick}
                isMobile={true}
              >
                Analytics
              </NavItem>
            )}
          </div>
          <div className="flex-shrink-0">
            <form action={handleLogout}>
              <LogoutButton isMobile={true} />
            </form>
          </div>
        </nav>
      )}
    </header>
  );
};
