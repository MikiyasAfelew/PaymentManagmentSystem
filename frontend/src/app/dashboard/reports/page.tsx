"use client";

import { useState } from "react";
import {
  Download,
  TrendingUp,
  DollarSign,
  CheckCircle
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useTheme } from "@/components/ThemeProvider";
import { DateRangePicker } from "@/components/DatePicker";
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

export default function ReportsPage() {
  const { resolvedTheme } = useTheme();
  const [reportingPeriod, setReportingPeriod] = useState("This Month");
  const [dateRangeStart, setDateRangeStart] = useState("");
  const [dateRangeEnd, setDateRangeEnd] = useState("");

  // Chart colors based on theme
  const chartColors = {
    grid: resolvedTheme === "dark" ? "#334155" : "#E2E8F0",
    axis: resolvedTheme === "dark" ? "#94A3B8" : "#64748B",
    tooltipBg: resolvedTheme === "dark" ? "#1E293B" : "#FFFFFF",
    tooltipBorder: resolvedTheme === "dark" ? "#334155" : "#E2E8F0",
    line: "#2563EB",
  };

  const formatETB = (amount: number) => {
    return new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <DashboardLayout activeRoute="/dashboard/reports">
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
                  <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                  <XAxis dataKey="month" stroke={chartColors.axis} />
                  <YAxis stroke={chartColors.axis} tickFormatter={(value) => `ETB ${(value / 1000).toFixed(0)}K`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: chartColors.tooltipBg,
                      border: `1px solid ${chartColors.tooltipBorder}`,
                      borderRadius: "8px",
                    }}
                    // @ts-ignore - Recharts formatter types are complex
                    formatter={(value: number) => [formatETB(value), "Amount"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke={chartColors.line}
                    strokeWidth={2}
                    dot={{ fill: chartColors.line, strokeWidth: 2 }}
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
                      backgroundColor: chartColors.tooltipBg,
                      border: `1px solid ${chartColors.tooltipBorder}`,
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
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="month" stroke={chartColors.axis} />
                <YAxis stroke={chartColors.axis} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: chartColors.tooltipBg,
                    border: `1px solid ${chartColors.tooltipBorder}`,
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
      </DashboardLayout>
  );
}
