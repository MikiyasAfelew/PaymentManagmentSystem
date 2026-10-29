"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { mockNotifications, Notification } from "@/lib/notifications";

interface NotificationContextType {
  notifications: Notification[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const STORAGE_KEY = "paymanager-notifications-read";

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [mounted, setMounted] = useState(false);

  // Load read statuses from localStorage on mount
  useEffect(() => {
    try {
      const savedReadStatuses = localStorage.getItem(STORAGE_KEY);
      if (savedReadStatuses) {
        const readStatuses: Record<string, boolean> = JSON.parse(savedReadStatuses);

        // Merge saved read statuses with mock notifications
        const mergedNotifications = mockNotifications.map((notif) => ({
          ...notif,
          read: readStatuses[notif.id] ?? notif.read,
        }));

        setNotifications(mergedNotifications);
      }
    } catch (error) {
      console.error("Failed to load notification read statuses:", error);
      // Fall back to mock notifications if localStorage fails
    }
    setMounted(true);
  }, []);

  // Save read statuses to localStorage whenever they change
  useEffect(() => {
    if (!mounted) return;

    const readStatuses: Record<string, boolean> = {};
    notifications.forEach((notif) => {
      readStatuses[notif.id] = notif.read;
    });

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(readStatuses));
    } catch (error) {
      console.error("Failed to save notification read statuses:", error);
    }
  }, [notifications, mounted]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{ notifications, markAsRead, markAllAsRead, unreadCount }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
