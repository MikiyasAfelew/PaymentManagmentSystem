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
  User,
  Shield,
  Monitor,
  Bell as BellIcon,
  LogOut
} from "lucide-react";
import Link from "next/link";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", route: "/dashboard" },
  { icon: ArrowUpDown, label: "Transactions", route: "/dashboard/transactions" },
  { icon: FileText, label: "Reconciliation", route: "/dashboard/reconciliation" },
  { icon: Upload, label: "Imports", route: "/dashboard/imports" },
  { icon: AlertTriangle, label: "Discrepancies", route: "/dashboard/discrepancies" },
  { icon: Users, label: "Customers", route: "/dashboard/customers" },
  { icon: FileBarChart, label: "Invoices", route: "/dashboard/invoices" },
  { icon: FileBarChart, label: "Reports", route: "/dashboard/reports" },
  { icon: Bell, label: "Notifications", route: "/dashboard/notifications" },
  { icon: Settings, label: "Settings", route: "/dashboard/settings", active: true },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("business");

  const handleSave = () => {
    alert("Settings saved (frontend prototype - backend endpoint required for persistence)");
  };

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
              <span className="text-foreground font-medium">Settings</span>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Settings Content */}
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl p-4 space-y-1">
                <button
                  onClick={() => setActiveSection("business")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === "business"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  Business Profile
                </button>
                <button
                  onClick={() => setActiveSection("user")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === "user"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <User className="w-4 h-4" />
                  User Profile
                </button>
                <button
                  onClick={() => setActiveSection("display")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === "display"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  Display Preferences
                </button>
                <button
                  onClick={() => setActiveSection("notifications")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === "notifications"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <BellIcon className="w-4 h-4" />
                  Notification Preferences
                </button>
                <button
                  onClick={() => setActiveSection("security")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === "security"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  Security
                </button>
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-xl p-6">
                {activeSection === "business" && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-foreground">Business Profile</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">Business Name</label>
                        <input
                          type="text"
                          defaultValue="Selam Retail PLC"
                          className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">Business ID</label>
                        <input
                          type="text"
                          defaultValue="SEL-001"
                          className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue="info@selamretail.et"
                          className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">Phone</label>
                        <input
                          type="tel"
                          defaultValue="+251 11 555 1234"
                          className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">Address</label>
                        <textarea
                          defaultValue="Bole Subcity, Addis Ababa, Ethiopia"
                          rows={3}
                          className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "user" && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-foreground">User Profile</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">Full Name</label>
                        <input
                          type="text"
                          defaultValue="Dawit Mengistu"
                          className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue="dawit@selamretail.et"
                          className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">Role</label>
                        <input
                          type="text"
                          defaultValue="Administrator"
                          disabled
                          className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "display" && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-foreground">Display Preferences</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">Dark Mode</p>
                          <p className="text-xs text-muted-foreground">Use dark theme across the application</p>
                        </div>
                        <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-primary-foreground rounded-full" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">Compact View</p>
                          <p className="text-xs text-muted-foreground">Show more data in tables</p>
                        </div>
                        <div className="w-12 h-6 bg-secondary border border-border rounded-full relative cursor-pointer">
                          <div className="absolute left-1 top-1 w-4 h-4 bg-muted-foreground rounded-full" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">Language</label>
                        <select className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                          <option>English</option>
                          <option>Amharic</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">Timezone</label>
                        <select className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                          <option>East Africa Time (EAT)</option>
                          <option>UTC</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "notifications" && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-foreground">Notification Preferences</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">Email Notifications</p>
                          <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-primary-foreground rounded-full" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">Discrepancy Alerts</p>
                          <p className="text-xs text-muted-foreground">Get notified about payment discrepancies</p>
                        </div>
                        <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-primary-foreground rounded-full" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">Import Status</p>
                          <p className="text-xs text-muted-foreground">Get notified when imports complete</p>
                        </div>
                        <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-primary-foreground rounded-full" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">Overdue Invoices</p>
                          <p className="text-xs text-muted-foreground">Get notified about overdue invoices</p>
                        </div>
                        <div className="w-12 h-6 bg-secondary border border-border rounded-full relative cursor-pointer">
                          <div className="absolute left-1 top-1 w-4 h-4 bg-muted-foreground rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "security" && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-foreground">Security</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">Current Password</label>
                        <input
                          type="password"
                          placeholder="Enter current password"
                          className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">New Password</label>
                        <input
                          type="password"
                          placeholder="Enter new password"
                          className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          placeholder="Confirm new password"
                          className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div className="pt-4 border-t border-border">
                        <button
                          onClick={() => alert("Two-factor authentication requires backend implementation")}
                          className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors"
                        >
                          <Shield className="w-4 h-4" />
                          Enable Two-Factor Authentication
                        </button>
                        <p className="text-xs text-muted-foreground mt-2">
                          * Requires backend implementation
                        </p>
                      </div>
                      <div className="pt-4 border-t border-border">
                        <button
                          onClick={() => alert("Account deletion requires backend implementation")}
                          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-500 hover:bg-red-500/20 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Delete Account
                        </button>
                        <p className="text-xs text-muted-foreground mt-2">
                          * Requires backend implementation
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="pt-6 border-t border-border flex justify-end">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
