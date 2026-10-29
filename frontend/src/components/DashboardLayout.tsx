"use client";

import { useState, useEffect, useRef } from "react";
import Sidebar, { MobileMenuButton } from "@/components/Sidebar";
import { Bell, Sun, Moon, Check, X, AlertCircle, Info, CheckCircle } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useNotifications } from "@/components/NotificationProvider";
import Link from "next/link";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeRoute: string;
}

export default function DashboardLayout({ children, activeRoute }: DashboardLayoutProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();
  const notificationRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsNotificationOpen(false);
      }
    };

    if (isNotificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isNotificationOpen]);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "info":
        return <Info className="w-4 h-4 text-blue-500" />;
      default:
        return <Info className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans flex">
      <Sidebar
        activeRoute={activeRoute}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Top Navigation */}
        <header className="bg-card border-b border-border sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <MobileMenuButton
                isOpen={isMobileOpen}
                onToggle={() => setIsMobileOpen(!isMobileOpen)}
              />
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Dashboard</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-foreground font-medium capitalize">
                  {activeRoute.replace("/dashboard/", "")}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                title={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={toggleNotifications}
                  className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors rounded-lg"
                  aria-label="Notifications"
                  aria-expanded={isNotificationOpen}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                  )}
                </button>

                {/* Notification Dropdown */}
                {isNotificationOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-card border border-border rounded-xl shadow-lg z-50">
                    {/* Dropdown Header */}
                    <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                          <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No notifications</p>
                        </div>
                      ) : (
                        <div className="divide-y divide-border">
                          {notifications.slice(0, 5).map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-4 hover:bg-secondary/50 transition-colors cursor-pointer ${
                                !notification.read ? "bg-secondary/30" : ""
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className="mt-0.5 flex-shrink-0">
                                  {getTypeIcon(notification.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2 mb-1">
                                    <p className={`text-sm font-medium text-foreground ${
                                      !notification.read ? "font-semibold" : ""
                                    }`}>
                                      {notification.title}
                                    </p>
                                    {!notification.read && (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          markAsRead(notification.id);
                                        }}
                                        className="flex-shrink-0 p-1 text-muted-foreground hover:text-foreground transition-colors"
                                        aria-label="Mark as read"
                                      >
                                        <Check className="w-3 h-3" />
                                      </button>
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground mb-1 line-clamp-2">
                                    {notification.message}
                                  </p>
                                  <span className="text-xs text-muted-foreground">
                                    {formatDateTime(notification.date)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Dropdown Footer */}
                    <div className="px-4 py-3 border-t border-border">
                      <Link
                        href="/dashboard/notifications"
                        onClick={() => setIsNotificationOpen(false)}
                        className="block text-center text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                      >
                        View all notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="relative">
          {/* Demo Mode Banner */}
          <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-6 py-2">
            <p className="text-xs text-yellow-600 dark:text-yellow-400 text-center">
              <strong>Demo Mode:</strong> Frontend prototype with mock data. No real authentication or data persistence.
            </p>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
