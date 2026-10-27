"use client";

import { motion } from "motion/react";
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
  Search,
  Filter,
  Plus,
  ChevronDown,
  CreditCard,
  Banknote,
  Building2,
  DollarSign,
  TrendingUp,
  Eye,
  CheckCircle,
  Clock,
  XCircle
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
  Legend
} from "recharts";
import type { ReactNode } from "react";

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
  { type: "overdue", count: 8, label: "Overdue Invoices", route: "/dashboard/invoices" },
  { type: "imports", count: 2, label: "Imports Needing Attention", route: "/dashboard/imports" },
];

const recentTransactions = [
  { id: "TXN-847298", date: "2026-10-26", counterparty: "Telebirr C2B", source: "Telebirr", amount: 14800, status: "matched" },
  { id: "TXN-847299", date: "2026-10-26", counterparty: "CBE RTGS", source: "CBE", amount: 120000, status: "matched" },
  { id: "TXN-847300", date: "2026-10-25", counterparty: "Awash Transfer", source: "Awash", amount: 65000, status: "needs_review" },
  { id: "TXN-847301", date: "2026-10-25", counterparty: "Telebirr C2B", source: "Telebirr", amount: 32500, status: "matched" },
  { id: "TXN-847302", date: "2026-10-24", counterparty: "CBE Birr", source: "CBE Birr", amount: 45000, status: "unmatched" },
  { id: "TXN-847303", date: "2026-10-24", counterparty: "Cash Payment", source: "Cash", amount: 25000, status: "matched" },
];

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", route: "/dashboard", active: true },
  { icon: ArrowUpDown, label: "Transactions", route: "/dashboard/transactions" },
  { icon: FileText, label: "Reconciliation", route: "/dashboard/reconciliation" },
  { icon: Upload, label: "Imports", route: "/dashboard/imports" },
  { icon: AlertTriangle, label: "Discrepancies", route: "/dashboard/discrepancies" },
  { icon: Users, label: "Customers", route: "/dashboard/customers" },
  { icon: FileBarChart, label: "Invoices", route: "/dashboard/invoices" },
  { icon: FileBarChart, label: "Reports", route: "/dashboard/reports" },
  { icon: Bell, label: "Notifications", route: "/dashboard/notifications" },
  { icon: Settings, label: "Settings", route: "/dashboard/settings" },
];

export default function Dashboard() {
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

  return (
    <div className="min-h-screen bg-background font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col fixed h-full z-40">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-semibold text-foreground">PayManager</span>
          </Link>
        </div>

        {/* Business Workspace Selector */}
        <div className="p-4 border-b border-border">
          <button className="w-full flex items-center justify-between px-3 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Selam Retail PLC</span>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Navigation */}
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

        {/* User Profile */}
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
      <main className="flex-1 ml-64">
        {/* Top Navigation */}
        <header className="bg-card border-b border-border sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Dashboard</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">Overview</span>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Period Selector */}
              <select className="px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
                <option>This Year</option>
              </select>

              {/* Action Buttons */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Record Payment
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <Upload className="w-4 h-4" />
                Import Statement
              </motion.button>

              {/* Notifications */}
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

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
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#94A3B8"
                    tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  />
                  <YAxis 
                    stroke="#94A3B8"
                    tickFormatter={(value) => `ETB ${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1E293B",
                      border: "1px solid #334155",
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
                    stroke="#2563EB" 
                    strokeWidth={2}
                    dot={{ fill: "#2563EB", strokeWidth: 2 }}
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
                      backgroundColor: "#1E293B",
                      border: "1px solid #334155",
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                      className="pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary w-64"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors">
                    <Filter className="w-4 h-4" />
                    Filter
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
                  {recentTransactions.map((transaction, index) => (
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
                        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-border flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Showing 1-6 of 156 transactions</p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 bg-secondary border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="px-3 py-1.5 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
