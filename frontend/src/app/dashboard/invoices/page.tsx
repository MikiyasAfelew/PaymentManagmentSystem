"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Filter,
  Plus,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  X,
  Calendar,
  DollarSign,
  AlertCircle,
  FileText
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { DatePicker } from "@/components/DatePicker";

// Development fixtures - These will be replaced with real API data when backend is implemented
const invoices = [
  {
    id: "INV-2026-00140",
    customer: "Quick Mart Addis",
    issueDate: "2026-02-25",
    dueDate: "2026-03-25",
    totalAmount: 28500,
    outstandingBalance: 28500,
    status: "pending"
  },
  {
    id: "INV-2026-00142",
    customer: "Ethio Construction",
    issueDate: "2026-02-28",
    dueDate: "2026-03-28",
    totalAmount: 275000,
    outstandingBalance: 275000,
    status: "pending"
  },
  {
    id: "INV-2026-00145",
    customer: "Green Valley Agro",
    issueDate: "2026-02-20",
    dueDate: "2026-03-20",
    totalAmount: 185000,
    outstandingBalance: 185000,
    status: "pending"
  },
  {
    id: "INV-2026-00130",
    customer: "Local Customer",
    issueDate: "2026-02-15",
    dueDate: "2026-03-15",
    totalAmount: 45000,
    outstandingBalance: 0,
    status: "paid"
  },
  {
    id: "INV-2026-00148",
    customer: "Quick Mart Addis",
    issueDate: "2026-02-25",
    dueDate: "2026-03-25",
    totalAmount: 28500,
    outstandingBalance: 28500,
    status: "overdue"
  },
  {
    id: "INV-2026-00150",
    customer: "Metro Supermarket",
    issueDate: "2026-03-01",
    dueDate: "2026-04-01",
    totalAmount: 125000,
    outstandingBalance: 75000,
    status: "partial"
  },
  {
    id: "INV-2026-00152",
    customer: "Ethio Telecom",
    issueDate: "2026-03-02",
    dueDate: "2026-04-02",
    totalAmount: 95000,
    outstandingBalance: 95000,
    status: "pending"
  },
  {
    id: "INV-2026-00155",
    customer: "Bole Pharma",
    issueDate: "2026-03-05",
    dueDate: "2026-04-05",
    totalAmount: 89000,
    outstandingBalance: 89000,
    status: "pending"
  },
  {
    id: "INV-2026-00158",
    customer: "Kality Technologies",
    issueDate: "2026-03-08",
    dueDate: "2026-04-08",
    totalAmount: 165000,
    outstandingBalance: 165000,
    status: "overdue"
  },
  {
    id: "INV-2026-00160",
    customer: "Global Trading PLC",
    issueDate: "2026-03-10",
    dueDate: "2026-04-10",
    totalAmount: 210000,
    outstandingBalance: 210000,
    status: "pending"
  },
];

const filterOptions = [
  { label: "All", count: 10, value: "all" },
  { label: "Pending", count: 6, value: "pending" },
  { label: "Paid", count: 1, value: "paid" },
  { label: "Partial", count: 1, value: "partial" },
  { label: "Overdue", count: 2, value: "overdue" },
];

export default function InvoicesPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<typeof invoices[0] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");
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
      case "paid":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-orange-500" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "partial":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "paid":
        return "Paid";
      case "pending":
        return "Pending";
      case "overdue":
        return "Overdue";
      case "partial":
        return "Partial";
      default:
        return status;
    }
  };

  const openDrawer = (invoice: typeof invoices[0]) => {
    setSelectedInvoice(invoice);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Handle Escape key to close drawers
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isDrawerOpen) {
          setIsDrawerOpen(false);
        }
        if (isCreateDialogOpen) {
          setIsCreateDialogOpen(false);
        }
      }
    };

    if (isDrawerOpen || isCreateDialogOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDrawerOpen, isCreateDialogOpen]);

  // Filter invoices based on search and status
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = searchQuery === "" ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.totalAmount.toString().includes(searchQuery);

    const matchesStatus = filter === "all" || invoice.status === filter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const paginatedInvoices = filteredInvoices.slice(
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
    <DashboardLayout activeRoute="/dashboard/invoices">
      <div className="p-6">
          {/* Page Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Invoices</h1>
              <p className="text-muted-foreground">Manage customer invoices and track payments</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCreateDialogOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Invoice
            </motion.button>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search invoices..."
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

          {/* Invoices Table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full" style={{ minWidth: "900px" }}>
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Reference</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Customer</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Issue Date</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Due Date</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Amount</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Outstanding Balance</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedInvoices.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-muted-foreground">
                        No invoices found
                      </td>
                    </tr>
                  ) : (
                    paginatedInvoices.map((invoice) => (
                      <tr
                        key={invoice.id}
                        onClick={() => openDrawer(invoice)}
                        className="border-b border-border hover:bg-secondary/50 transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-foreground">{invoice.id}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{invoice.customer}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{formatDate(invoice.issueDate)}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{formatDate(invoice.dueDate)}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-foreground">{formatETB(invoice.totalAmount)}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-foreground">{formatETB(invoice.outstandingBalance)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(invoice.status)}
                            <span className="text-sm text-foreground">{getStatusLabel(invoice.status)}</span>
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
                Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredInvoices.length)} of {filteredInvoices.length} invoices
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

      {/* Invoice Details Drawer */}
      <AnimatePresence>
        {isDrawerOpen && selectedInvoice && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-black/30 z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed inset-y-0 right-0 z-50 w-full lg:w-[480px] bg-card border-l border-border shadow-xl"
            >
              <div className="flex flex-col h-full">
                <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Invoice Details</h2>
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
                      <FileText className="w-4 h-4 text-primary" />
                      Invoice Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Reference</span>
                        <span className="text-foreground font-medium">{selectedInvoice.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Customer</span>
                        <span className="text-foreground">{selectedInvoice.customer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Issue Date</span>
                        <span className="text-foreground">{formatDate(selectedInvoice.issueDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Due Date</span>
                        <span className="text-foreground">{formatDate(selectedInvoice.dueDate)}</span>
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
                        <span className="text-muted-foreground">Total Amount</span>
                        <span className="text-foreground font-semibold">{formatETB(selectedInvoice.totalAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Outstanding Balance</span>
                        <span className="text-foreground font-semibold">{formatETB(selectedInvoice.outstandingBalance)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(selectedInvoice.status)}
                          <span className="text-foreground">{getStatusLabel(selectedInvoice.status)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Create Invoice Dialog */}
      <AnimatePresence>
        {isCreateDialogOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateDialogOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-card border border-border rounded-xl w-full max-w-md p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Create Invoice</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Customer *</label>
                    <input
                      type="text"
                      placeholder="Customer name"
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Total Amount (ETB) *</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <DatePicker
                    value={issueDate}
                    onChange={setIssueDate}
                    label="Issue Date *"
                    required
                    max={dueDate}
                  />
                  <DatePicker
                    value={dueDate}
                    onChange={setDueDate}
                    label="Due Date *"
                    required
                    min={issueDate}
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsCreateDialogOpen(false)}
                    className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (issueDate && dueDate && new Date(dueDate) < new Date(issueDate)) {
                        alert("Due date cannot be earlier than issue date");
                        return;
                      }
                      setIsCreateDialogOpen(false);
                      alert("Invoice created (frontend prototype - backend endpoint required for persistence)");
                    }}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
                  >
                    Create
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
