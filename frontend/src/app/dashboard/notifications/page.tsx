"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  CheckCircle,
  Clock,
  AlertCircle,
  Info,
  Bell
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useNotifications } from "@/components/NotificationProvider";
import { Notification } from "@/lib/notifications";

const categoryOptions = [
  { label: "All", value: "all" },
  { label: "Discrepancy", value: "discrepancy" },
  { label: "Import", value: "import" },
  { label: "Invoice", value: "invoice" },
  { label: "Reconciliation", value: "reconciliation" },
  { label: "Customer", value: "customer" },
];

export default function NotificationsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const openDetail = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsDetailOpen(true);
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
  };

  // Filter notifications based on category
  const filteredNotifications = notifications.filter(notification => {
    if (selectedCategory === "all") return true;
    return notification.category === selectedCategory;
  });

  return (
    <DashboardLayout activeRoute="/dashboard/notifications">
      <div className="p-6">
          {/* Page Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Notifications</h1>
              <p className="text-muted-foreground">Stay updated on system activities</p>
            </div>
            <button
              onClick={markAllAsRead}
              className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Mark all as read
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {categoryOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedCategory(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === option.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {filteredNotifications.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">
                No notifications found
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => openDetail(notification)}
                    className={`p-6 hover:bg-secondary/50 transition-colors cursor-pointer ${
                      !notification.read ? "bg-secondary/30" : ""
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`text-sm font-semibold text-foreground ${
                            !notification.read ? "font-bold" : ""
                          }`}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {formatDateTime(notification.date)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground capitalize">
                            {notification.category}
                          </span>
                          {!notification.read && (
                            <span className="text-xs text-primary font-medium">Unread</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      {/* Notification Detail Dialog */}
      <AnimatePresence>
        {isDetailOpen && selectedNotification && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDetail}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-card border border-border rounded-xl w-full max-w-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(selectedNotification.type)}
                    <h3 className="text-lg font-semibold text-foreground">
                      {selectedNotification.title}
                    </h3>
                  </div>
                  <button
                    onClick={closeDetail}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-foreground">
                    {selectedNotification.message}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Category: {selectedNotification.category}</span>
                    <span>{formatDateTime(selectedNotification.date)}</span>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={closeDetail}
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      </DashboardLayout>
  );
}
