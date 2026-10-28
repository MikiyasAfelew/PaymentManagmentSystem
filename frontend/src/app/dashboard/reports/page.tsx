"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  ArrowUpDown,
  FileText,
  AlertTriangle,
  Users,
  FileBarChart,
  Bell,
  Settings,
  Building2,
  ChevronDown,
  Download,
  TrendingUp,
  DollarSign,
  CheckCircle,
  Upload
} from "lucide-react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar
} from "recharts";

// Development fixtures - These will be replaced with real API data when backend is implemented
const paymentSummaryData = [
  { month: "Oct 2025", amount: 185000 },
  { month: "Nov 2025", amount: 242000 },
  { month: "Dec 2025", amount: 312000 },
  { month: "Jan 2026", amount: 285000 },
  { month: "Feb 2026", amount: 325000 },
  { month: "Mar 2026", amount: 278000 },
];

const reconciliationSummaryData = [
  { month: "Oct 2025", reconciled: 180, pending: 15 },
  { month: "Nov 2025", reconciled: 235, pending: 18 },
  { month: "Dec 2025", reconciled: 305, pending: 22 },
  { month: "Jan 2026", reconciled: 275, pending: 20 },
  { month: "Feb 2026", reconciled: 315, pending: 25 },
  { month: "Mar 2026", reconciled: 268, pending: 23 },
];

const statusBreakdownData = [
  { name: "Matched", value: 1214, color: "#22c55e" },
  { name: "Needs Review", value: 76, color: "#f59e0b" },
  { name: "Unmatched", value: 138, color: "#ef4444" },
];

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", route: "/dashboard" },
  { icon: ArrowUpDown, label: "Transactions", route: "/dashboard/transactions" },
  { icon: FileText, label: "Reconciliation", route: "/dashboard/reconciliation" },
  { icon: Upload, label: "Imports", route: "/dashboard/imports" },
  { icon: AlertTriangle, label: "Discrepancies", route: "/dashboard/discrepancies" },
  { icon: Users, label: "Customers", route: "/dashboard/customers" },
  { icon: FileBarChart, label: "Invoices", route: "/dashboard/invoices" },
  { icon: FileBarChart, label: "Reports", route: "/dashboard/reports", active: true },
  { icon: Bell, label: "Notifications", route: "/dashboard/notifications" },
  { icon: Settings, label: "Settings", route: "/dashboard/settings" },
];

export default function ReportsPage() {
  const [reportingPeriod, setReportingPeriod] = useState("This Month");

  const formatETB = (amount: number) => {
    return new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
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
              <span className="text-foreground font-medium">Reports</span>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={reportingPeriod}
                onChange={(e) => setReportingPeriod(e.target.value)}
                className="px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
                <option>This Year</option>
              </select>
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Reports Content */}
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">Reports</h1>
            <p className="text-muted-foreground">Financial and reconciliation analytics</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                <span className="text-xs text-muted-foreground">This Month</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{formatETB(278000)}</p>
              <p className="text-sm text-muted-foreground">Total Received</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-xs text-muted-foreground">This Month</span>
              </div>
              <p className="text-2xl font-bold text-foreground">94.5%</p>
              <p className="text-sm text-muted-foreground">Reconciliation Rate</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <span className="text-xs text-muted-foreground">This Month</span>
              </div>
              <p className="text-2xl font-bold text-foreground">268</p>
              <p className="text-sm text-muted-foreground">Reconciled</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-5 h-5 text-orange-500" />
                <span className="text-xs text-muted-foreground">Outstanding</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{formatETB(348200)}</p>
              <p className="text-sm text-muted-foreground">Receivables</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Payment Summary Chart */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Payment Summary</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={paymentSummaryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" tickFormatter={(value) => `ETB ${(value / 1000).toFixed(0)}K`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1E293B",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                    }}
                    // @ts-ignore - Recharts formatter types are complex
                    formatter={(value: number) => [formatETB(value), "Amount"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#2563EB"
                    strokeWidth={2}
                    dot={{ fill: "#2563EB", strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Transaction Status Breakdown */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Transaction Status Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusBreakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1E293B",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                    }}
                    // @ts-ignore - Recharts formatter types are complex
                    formatter={(value: number) => [value, "Transactions"]}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Reconciliation Summary Chart */}
          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Reconciliation Summary</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reconciliationSummaryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E293B",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="reconciled" fill="#22c55e" name="Reconciled" />
                <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Export Section */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Export Reports</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => alert("Export functionality requires backend implementation")}
                className="flex items-center gap-3 px-4 py-3 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export as CSV
              </button>
              <button
                onClick={() => alert("Export functionality requires backend implementation")}
                className="flex items-center gap-3 px-4 py-3 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export as PDF
              </button>
              <button
                onClick={() => alert("Export functionality requires backend implementation")}
                className="flex items-center gap-3 px-4 py-3 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export as Excel
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              * Export functionality requires backend implementation. Currently using mock data for demonstration.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
