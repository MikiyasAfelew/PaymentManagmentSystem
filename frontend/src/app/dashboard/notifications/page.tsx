"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  ArrowUpDown,
  FileText,
  Upload,
  AlertTriangle,
  Users,
  FileBarChart,
  Bell,
  Settings,
  Building2,
  ChevronDown,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
  Info
} from "lucide-react";
import Link from "next/link";

// Development fixtures - These will be replaced with real API data when backend is implemented
const notifications = [
  {
    id: "NOTIF-001",
    type: "alert",
    title: "Payment discrepancy detected",
    message: "Transaction TXN-847353 has a discrepancy of ETB 25,000 with invoice INV-2026-00142",
    date: "2026-03-02T10:30:00",
    read: false,
    category: "discrepancy"
  },
  {
    id: "NOTIF-002",
    type: "info",
    title: "Statement import completed",
    message: "CBE statement for March 2026 has been successfully imported with 240 valid rows",
    date: "2026-03-02T10:25:00",
    read: false,
    category: "import"
  },
  {
    id: "NOTIF-003",
    type: "warning",
    title: "Invoice overdue",
    message: "Invoice INV-2026-00148 for Quick Mart Addis is overdue by 7 days",
    date: "2026-03-01T09:00:00",
    read: true,
    category: "invoice"
  },
  {
    id: "NOTIF-004",
    type: "success",
    title: "Reconciliation completed",
    message: "Batch BATCH-001 has been fully reconciled with 245 transactions",
    date: "2026-02-28T16:45:00",
    read: true,
    category: "reconciliation"
  },
  {
    id: "NOTIF-005",
    type: "info",
    title: "New customer added",
    message: "Customer Bole Pharma has been added to the system",
    date: "2026-02-25T14:20:00",
    read: true,
    category: "customer"
  },
];

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", route: "/dashboard" },
  { icon: ArrowUpDown, label: "Transactions", route: "/dashboard/transactions" },
  { icon: FileText, label: "Reconciliation", route: "/dashboard/reconciliation" },
  { icon: Upload, label: "Imports", route: "/dashboard/imports" },
  { icon: AlertTriangle, label: "Discrepancies", route: "/dashboard/discrepancies" },
  { icon: Users, label: "Customers", route: "/dashboard/customers" },
  { icon: FileBarChart, label: "Invoices", route: "/dashboard/invoices" },
  { icon: FileBarChart, label: "Reports", route: "/dashboard/reports" },
  { icon: Bell, label: "Notifications", route: "/dashboard/notifications", active: true },
  { icon: Settings, label: "Settings", route: "/dashboard/settings" },
];

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
  const [selectedNotification, setSelectedNotification] = useState<typeof notifications[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

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

  const markAsRead = (id: string) => {
    alert("Notification marked as read (frontend prototype - backend endpoint required for persistence)");
  };

  const markAllAsRead = () => {
    alert("All notifications marked as read (frontend prototype - backend endpoint required for persistence)");
  };

  const openDetail = (notification: typeof notifications[0]) => {
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

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col fixed h-full z-40 hidden lg:flex">
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-semibold text-foreground">PayManager</span>
          </Link>
        </div>

        <div className="p-4 border-b border-border">
          <button className="w-full flex items-center justify-between px-3 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Selam Retail PLC</span>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <Link
              key={item.route}
              href={item.route}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                item.active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-primary font-semibold text-sm">DM</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Dawit Mengistu</p>
              <p className="text-xs text-muted-foreground truncate">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Top Navigation */}
        <header className="bg-card border-b border-border sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Dashboard</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">Notifications</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={markAllAsRead}
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Mark all as read
              </button>
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
              </button>
            </div>
          </div>
        </header>

        {/* Notifications Content */}
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">Notifications</h1>
            <p className="text-muted-foreground">Stay updated on system activities</p>
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
      </main>

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
    </div>
  );
}
