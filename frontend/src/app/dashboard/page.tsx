"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";
import { useTheme } from "@/components/ThemeProvider";
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
  Legend
} from "recharts";
import {
  Upload,
  Search,
  Filter,
  Plus,
  CreditCard,
  Banknote,
  DollarSign,
  TrendingUp,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  X,
  AlertTriangle,
  ChevronDown
} from "lucide-react";

// Development fixtures - These will be replaced with real API data when backend is implemented
const financialSummary = {
  totalReceived: 1284500,
  outstandingReceivables: 348200,
  unmatchedTransactions: 65000,
  reconciliationRate: 94.5
};

const paymentActivityData = [
  { date: "2026-10-20", amount: 185000 },
  { date: "2026-10-21", amount: 242000 },
  { date: "2026-10-22", amount: 168000 },
  { date: "2026-10-23", amount: 312000 },
  { date: "2026-10-24", amount: 195000 },
  { date: "2026-10-25", amount: 278000 },
  { date: "2026-10-26", amount: 205000 },
];

const paymentSourceData = [
  { name: "Telebirr", value: 485000, color: "#2563EB" },
  { name: "CBE", value: 398000, color: "#3B82F6" },
  { name: "CBE Birr", value: 224000, color: "#60A5FA" },
  { name: "Cash", value: 127500, color: "#93C5FD" },
  { name: "Other", value: 50000, color: "#CBD5E1" },
];

const attentionItems = [
  { type: "unmatched", count: 12, label: "Unmatched Transactions", route: "/dashboard/transactions" },
  { type: "duplicate", count: 3, label: "Possible Duplicates", route: "/dashboard/transactions" },
  { type: "overdue", count: 2, label: "Overdue Invoices", route: "/dashboard/invoices" },
];

const recentTransactions = [
  { id: "TXN-847298", date: "2026-10-26", counterparty: "Telebirr C2B", source: "Telebirr", amount: 14800, status: "matched" },
  { id: "TXN-847299", date: "2026-10-26", counterparty: "CBE RTGS", source: "CBE", amount: 120000, status: "matched" },
  { id: "TXN-847300", date: "2026-10-25", counterparty: "Awash Transfer", source: "Awash", amount: 65000, status: "needs_review" },
  { id: "TXN-847301", date: "2026-10-25", counterparty: "Telebirr C2B", source: "Telebirr", amount: 32500, status: "matched" },
  { id: "TXN-847302", date: "2026-10-24", counterparty: "CBE Birr", source: "CBE Birr", amount: 45000, status: "unmatched" },
  { id: "TXN-847303", date: "2026-10-24", counterparty: "Cash Payment", source: "Cash", amount: 25000, status: "matched" },
  { id: "TXN-847304", date: "2026-10-23", counterparty: "Dashen Bank", source: "Dashen", amount: 85000, status: "matched" },
  { id: "TXN-847305", date: "2026-10-23", counterparty: "CBE Transfer", source: "CBE", amount: 95000, status: "needs_review" },
  { id: "TXN-847306", date: "2026-10-22", counterparty: "Telebirr C2B", source: "Telebirr", amount: 42000, status: "matched" },
  { id: "TXN-847307", date: "2026-10-22", counterparty: "Awash Transfer", source: "Awash", amount: 38000, status: "unmatched" },
  { id: "TXN-847308", date: "2026-10-21", counterparty: "CBE Birr", source: "CBE Birr", amount: 52000, status: "matched" },
  { id: "TXN-847309", date: "2026-10-21", counterparty: "Cash Payment", source: "Cash", amount: 18000, status: "matched" },
  { id: "TXN-847310", date: "2026-10-20", counterparty: "Telebirr C2B", source: "Telebirr", amount: 29000, status: "needs_review" },
  { id: "TXN-847311", date: "2026-10-20", counterparty: "CBE RTGS", source: "CBE", amount: 150000, status: "matched" },
  { id: "TXN-847312", date: "2026-10-19", counterparty: "Dashen Bank", source: "Dashen", amount: 78000, status: "unmatched" },
];

// Get unique sources for filter dropdown
const uniqueSources = Array.from(new Set(recentTransactions.map(t => t.source)));

export default function Dashboard() {
  const { resolvedTheme } = useTheme();
  const [reportingPeriod, setReportingPeriod] = useState("This Month");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const itemsPerPage = 5;

  // Chart colors based on theme
  const chartColors = {
    grid: resolvedTheme === "dark" ? "#334155" : "#E2E8F0",
    axis: resolvedTheme === "dark" ? "#94A3B8" : "#64748B",
    tooltipBg: resolvedTheme === "dark" ? "#1E293B" : "#FFFFFF",
    tooltipBorder: resolvedTheme === "dark" ? "#334155" : "#E2E8F0",
    line: "#2563EB",
  };

  // Reset page when search or filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSourceFilterChange = (value: string) => {
    setSourceFilter(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setStatusFilter("all");
    setSourceFilter("all");
    setCurrentPage(1);
  };

  const hasActiveFilters = statusFilter !== "all" || sourceFilter !== "all";

  const formatETB = (amount: number) => {
    return new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "matched":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "unmatched":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "needs_review":
        return <Clock className="w-4 h-4 text-orange-500" />;
      default:
        return <Eye className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "matched":
        return "Matched";
      case "unmatched":
        return "Unmatched";
      case "needs_review":
        return "Needs Review";
      case "partially_allocated":
        return "Partially Allocated";
      default:
        return status;
    }
  };

  // Filter recent transactions based on search and filters
  const filteredTransactions = recentTransactions.filter(t => {
    // Search filter
    const matchesSearch = searchQuery === "" ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.counterparty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.amount.toString().includes(searchQuery);

    // Status filter
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;

    // Source filter
    const matchesSource = sourceFilter === "all" || t.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <DashboardLayout activeRoute="/dashboard">
      {/* Page Header Actions */}
      <div className="px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          {/* Period Selector */}
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

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsRecordPaymentOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Record Payment
            </motion.button>

            <Link
              href="/dashboard/imports"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Import Statement
            </Link>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6 space-y-6">
          {/* Financial Summary Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {/* Total Received */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs text-green-500 font-medium">+12.5%</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Total Received</p>
              <p className="text-2xl font-bold text-foreground">{formatETB(financialSummary.totalReceived)}</p>
              <p className="text-xs text-muted-foreground mt-2">This month</p>
            </motion.div>

            {/* Outstanding Receivables */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-orange-500" />
                </div>
                <span className="text-xs text-orange-500 font-medium">12 invoices</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Outstanding Receivables</p>
              <p className="text-2xl font-bold text-foreground">{formatETB(financialSummary.outstandingReceivables)}</p>
              <p className="text-xs text-muted-foreground mt-2">This month</p>
            </motion.div>

            {/* Unmatched Transactions */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <span className="text-xs text-red-500 font-medium">3 transactions</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Unmatched Transactions</p>
              <p className="text-2xl font-bold text-foreground">{formatETB(financialSummary.unmatchedTransactions)}</p>
              <p className="text-xs text-muted-foreground mt-2">This month</p>
            </motion.div>

            {/* Reconciliation Rate */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
                <span className="text-xs text-green-500 font-medium">+2.3%</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Reconciliation Rate</p>
              <p className="text-2xl font-bold text-foreground">{financialSummary.reconciliationRate}%</p>
              <p className="text-xs text-muted-foreground mt-2">This month</p>
            </motion.div>
          </motion.div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Payment Activity Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Payment Activity</h3>
                <select className="px-3 py-1.5 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={paymentActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                  <XAxis
                    dataKey="date"
                    stroke={chartColors.axis}
                    tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  />
                  <YAxis
                    stroke={chartColors.axis}
                    tickFormatter={(value) => `ETB ${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: chartColors.tooltipBg,
                      border: `1px solid ${chartColors.tooltipBorder}`,
                      borderRadius: "8px",
                    }}
                    // @ts-ignore - Recharts formatter types are complex
                    formatter={(value: number) => [formatETB(value), "Amount"]}
                    // @ts-ignore - Recharts labelFormatter types are complex
                    labelFormatter={(value: string) => new Date(value).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
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
            </motion.div>

            {/* Payment Source Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-foreground mb-6">Payment Source Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={paymentSourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {paymentSourceData.map((entry, index) => (
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
                    formatter={(value: number) => [formatETB(value), "Amount"]}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value) => <span className="text-muted-foreground text-sm">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Needs Your Attention */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">Needs Your Attention</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {attentionItems.map((item) => (
                <Link
                  key={item.type}
                  href={item.route}
                  className="group p-4 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{item.count}</p>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card border border-border rounded-xl"
          >
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="pl-10 pr-10 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary w-64"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => handleSearchChange("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Clear search"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${
                      hasActiveFilters
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-secondary border-border text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                    Filter
                    {hasActiveFilters && <span className="w-2 h-2 bg-primary-foreground rounded-full" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Reference</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Counterparty</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Source</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                        No transactions found
                      </td>
                    </tr>
                  ) : (
                    paginatedTransactions.map((transaction, index) => (
                      <tr key={transaction.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                        <td className="px-6 py-4 text-sm text-foreground">
                          {new Date(transaction.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-foreground">{transaction.id}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{transaction.counterparty}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{transaction.source}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-foreground">{formatETB(transaction.amount)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(transaction.status)}
                            <span className="text-sm text-foreground">{getStatusLabel(transaction.status)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            href="/dashboard/transactions"
                            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Filter Popover */}
            <AnimatePresence>
              {isFilterOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsFilterOpen(false)}
                    className="fixed inset-0 bg-black/50 z-50"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed inset-0 z-50 flex items-start justify-center pt-32 p-4"
                  >
                    <div className="bg-card border border-border rounded-xl w-full max-w-md p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-semibold text-foreground">Filter Transactions</h4>
                        <button
                          onClick={() => setIsFilterOpen(false)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-4 mb-6">
                        <div>
                          <label className="text-sm text-muted-foreground block mb-2">Status</label>
                          <select
                            value={statusFilter}
                            onChange={(e) => handleStatusFilterChange(e.target.value)}
                            className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="all">All Statuses</option>
                            <option value="matched">Matched</option>
                            <option value="needs_review">Needs Review</option>
                            <option value="unmatched">Unmatched</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground block mb-2">Payment Source</label>
                          <select
                            value={sourceFilter}
                            onChange={(e) => handleSourceFilterChange(e.target.value)}
                            className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="all">All Sources</option>
                            {uniqueSources.map((source) => (
                              <option key={source} value={source}>{source}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={clearFilters}
                          className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors"
                        >
                          Clear Filters
                        </button>
                        <button
                          onClick={() => setIsFilterOpen(false)}
                          className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-border flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 bg-secondary border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-sm text-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </motion.div>
        </div>

      {/* Record Payment Dialog */}
      <AnimatePresence>
        {isRecordPaymentOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRecordPaymentOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-card border border-border rounded-xl w-full max-w-md p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Record Payment</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Amount (ETB)</label>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Payment Method</label>
                    <select className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">Select method...</option>
                      <option value="cash">Cash</option>
                      <option value="bank">Bank Transfer</option>
                      <option value="mobile">Mobile Money</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Reference (optional)</label>
                    <input
                      type="text"
                      placeholder="Payment reference"
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsRecordPaymentOpen(false)}
                    className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setIsRecordPaymentOpen(false);
                      alert("Payment recorded (frontend prototype - backend endpoint required for persistence)");
                    }}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
                  >
                    Record
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
