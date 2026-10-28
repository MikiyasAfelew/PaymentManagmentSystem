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
  Search,
  Filter,
  X,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  DollarSign,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

// Development fixtures - These will be replaced with real API data when backend is implemented
const discrepancies = [
  {
    id: "DISC-001",
    transactionId: "TXN-847353",
    invoiceId: "INV-2026-00142",
    customer: "Ethio Construction",
    transactionAmount: 250000,
    invoiceAmount: 275000,
    difference: -25000,
    reason: "Amount mismatch",
    status: "open",
    discoveredDate: "2026-03-02"
  },
  {
    id: "DISC-002",
    transactionId: "TXN-847350",
    invoiceId: "INV-2026-00145",
    customer: "Green Valley Agro",
    transactionAmount: 185000,
    invoiceAmount: 185000,
    difference: 0,
    reason: "Customer mismatch",
    status: "open",
    discoveredDate: "2026-03-01"
  },
  {
    id: "DISC-003",
    transactionId: "TXN-847351",
    invoiceId: "INV-2026-00140",
    customer: "Quick Mart Addis",
    transactionAmount: 28500,
    invoiceAmount: 28500,
    difference: 0,
    reason: "Possible duplicate",
    status: "open",
    discoveredDate: "2026-02-28"
  },
  {
    id: "DISC-004",
    transactionId: "TXN-847352",
    invoiceId: "INV-2026-00150",
    customer: "Metro Supermarket",
    transactionAmount: 95000,
    invoiceAmount: 125000,
    difference: -30000,
    reason: "Partial payment",
    status: "resolved",
    discoveredDate: "2026-02-25"
  },
];

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", route: "/dashboard" },
  { icon: ArrowUpDown, label: "Transactions", route: "/dashboard/transactions" },
  { icon: FileText, label: "Reconciliation", route: "/dashboard/reconciliation" },
  { icon: Upload, label: "Imports", route: "/dashboard/imports" },
  { icon: AlertTriangle, label: "Discrepancies", route: "/dashboard/discrepancies", active: true },
  { icon: Users, label: "Customers", route: "/dashboard/customers" },
  { icon: FileBarChart, label: "Invoices", route: "/dashboard/invoices" },
  { icon: FileBarChart, label: "Reports", route: "/dashboard/reports" },
  { icon: Bell, label: "Notifications", route: "/dashboard/notifications" },
  { icon: Settings, label: "Settings", route: "/dashboard/settings" },
];

const filterOptions = [
  { label: "All", count: 4, value: "all" },
  { label: "Open", count: 3, value: "open" },
  { label: "Resolved", count: 1, value: "resolved" },
];

export default function DiscrepanciesPage() {
  const [selectedDiscrepancy, setSelectedDiscrepancy] = useState<typeof discrepancies[0] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const formatETB = (amount: number) => {
    return new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "open":
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "resolved":
        return "Resolved";
      case "open":
        return "Open";
      default:
        return status;
    }
  };

  const openDrawer = (discrepancy: typeof discrepancies[0]) => {
    setSelectedDiscrepancy(discrepancy);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const markResolved = () => {
    if (selectedDiscrepancy) {
      setIsDrawerOpen(false);
      alert("Discrepancy marked as resolved (frontend prototype - backend endpoint required for persistence)");
    }
  };

  // Filter discrepancies based on search and status
  const filteredDiscrepancies = discrepancies.filter(discrepancy => {
    const matchesSearch = searchQuery === "" ||
      discrepancy.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discrepancy.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discrepancy.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discrepancy.invoiceId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filter === "all" || discrepancy.status === filter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredDiscrepancies.length / itemsPerPage);
  const paginatedDiscrepancies = filteredDiscrepancies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
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
              <span className="text-foreground font-medium">Discrepancies</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search discrepancies..."
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
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Discrepancies Content */}
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">Discrepancies</h1>
            <p className="text-muted-foreground">Review and resolve payment discrepancies</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <span className="text-xs text-muted-foreground">Open</span>
              </div>
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-sm text-muted-foreground">Discrepancies</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-xs text-muted-foreground">Resolved</span>
              </div>
              <p className="text-2xl font-bold text-foreground">1</p>
              <p className="text-sm text-muted-foreground">This Month</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="text-xs text-muted-foreground">Total Difference</span>
              </div>
              <p className="text-2xl font-bold text-foreground">ETB 55,000</p>
              <p className="text-sm text-muted-foreground">Outstanding</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleFilterChange(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === option.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {option.label} {option.count}
              </button>
            ))}
          </div>

          {/* Discrepancies Table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full" style={{ minWidth: "900px" }}>
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">ID</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Customer</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Transaction</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Invoice</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Difference</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Reason</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedDiscrepancies.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-muted-foreground">
                        No discrepancies found
                      </td>
                    </tr>
                  ) : (
                    paginatedDiscrepancies.map((discrepancy) => (
                      <tr
                        key={discrepancy.id}
                        onClick={() => openDrawer(discrepancy)}
                        className="border-b border-border hover:bg-secondary/50 transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-foreground">{discrepancy.id}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{discrepancy.customer}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{discrepancy.transactionId}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{discrepancy.invoiceId}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-foreground">{formatETB(discrepancy.difference)}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{discrepancy.reason}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(discrepancy.status)}
                            <span className="text-sm text-foreground">{getStatusLabel(discrepancy.status)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-border flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredDiscrepancies.length)} of {filteredDiscrepancies.length} discrepancies
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
          </div>
        </div>
      </main>

      {/* Discrepancy Details Drawer */}
      <AnimatePresence>
        {isDrawerOpen && selectedDiscrepancy && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full lg:w-[480px] bg-card border-l border-border shadow-xl"
            >
              <div className="flex flex-col h-full">
                <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Discrepancy Details</h2>
                  <button
                    onClick={closeDrawer}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-primary" />
                      Discrepancy Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ID</span>
                        <span className="text-foreground font-medium">{selectedDiscrepancy.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Customer</span>
                        <span className="text-foreground">{selectedDiscrepancy.customer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Reason</span>
                        <span className="text-foreground">{selectedDiscrepancy.reason}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Discovered</span>
                        <span className="text-foreground">{formatDate(selectedDiscrepancy.discoveredDate)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-primary" />
                      Amount Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Transaction Amount</span>
                        <span className="text-foreground">{formatETB(selectedDiscrepancy.transactionAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Invoice Amount</span>
                        <span className="text-foreground">{formatETB(selectedDiscrepancy.invoiceAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Difference</span>
                        <span className="text-foreground font-semibold">{formatETB(selectedDiscrepancy.difference)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      References
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Transaction ID</span>
                        <span className="text-foreground">{selectedDiscrepancy.transactionId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Invoice ID</span>
                        <span className="text-foreground">{selectedDiscrepancy.invoiceId}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Status
                    </h3>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(selectedDiscrepancy.status)}
                      <span className="text-foreground">{getStatusLabel(selectedDiscrepancy.status)}</span>
                    </div>
                  </div>
                </div>

                {selectedDiscrepancy.status === "open" && (
                  <div className="p-6 border-t border-border">
                    <button
                      onClick={markResolved}
                      className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      Mark as Resolved
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
