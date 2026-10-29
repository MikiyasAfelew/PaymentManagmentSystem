"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Filter,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
  X,
  Flag,
  Link2,
  Check,
  Hash,
  CreditCard,
  History,
  AlertCircle,
  Calendar,
  User,
  FileText as FileTextIcon
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { DateRangePicker } from "@/components/DatePicker";

// Development fixtures - These will be replaced with real API data when backend is implemented
const reconciliationSummary = {
  needsMatching: 23,
  suggestedMatches: 15,
  discrepancies: 4,
  reconciled: 1386
};

const statementBatches = [
  { id: "BATCH-001", label: "CBE - March 2026", count: 842 },
  { id: "BATCH-002", label: "Telebirr - March 2026", count: 325 },
  { id: "BATCH-003", label: "Awash - March 2026", count: 156 },
  { id: "BATCH-004", label: "CBE Birr - March 2026", count: 105 },
];

// Invoice fixtures for manual match dialog
const invoices = [
  {
    id: "INV-2026-00140",
    customer: "Quick Mart Addis",
    issued: "2026-02-25",
    originalAmount: 28500,
    amountPaid: 0,
    outstandingBalance: 28500
  },
  {
    id: "INV-2026-00142",
    customer: "Ethio Construction",
    issued: "2026-02-28",
    originalAmount: 275000,
    amountPaid: 0,
    outstandingBalance: 275000
  },
  {
    id: "INV-2026-00145",
    customer: "Green Valley Agro",
    issued: "2026-02-20",
    originalAmount: 185000,
    amountPaid: 0,
    outstandingBalance: 185000
  },
  {
    id: "INV-2026-00130",
    customer: "Local Customer",
    issued: "2026-02-15",
    originalAmount: 45000,
    amountPaid: 45000,
    outstandingBalance: 0
  },
  {
    id: "INV-2026-00148",
    customer: "Quick Mart Addis",
    issued: "2026-02-25",
    originalAmount: 28500,
    amountPaid: 0,
    outstandingBalance: 28500
  },
  {
    id: "INV-2026-00150",
    customer: "Metro Supermarket",
    issued: "2026-03-01",
    originalAmount: 125000,
    amountPaid: 50000,
    outstandingBalance: 75000
  },
  {
    id: "INV-2026-00152",
    customer: "Ethio Telecom",
    issued: "2026-03-02",
    originalAmount: 95000,
    amountPaid: 0,
    outstandingBalance: 95000
  },
];

const transactions = [
  {
    id: "TXN-847350",
    date: "2026-03-02T14:30:00",
    counterparty: "Green Valley Agro",
    source: "CBE",
    amount: 185000,
    status: "needs_matching",
    batchId: "BATCH-001",
    narration: "FT2606288945 / Ref: Bulk Fertilizer Order",
    suggestedInvoices: [
      {
        id: "INV-2026-00145",
        customer: "Green Valley Agro",
        originalAmount: 185000,
        amountPaid: 0,
        outstandingBalance: 185000,
        difference: 0
      }
    ],
    auditLog: [
      { event: "CSV Statement Imported", details: "Batch #CBE-2026-03", timestamp: "2026-03-02T14:35:00" }
    ]
  },
  {
    id: "TXN-847351",
    date: "2026-03-02T13:15:00",
    counterparty: "Telebirr C2B",
    source: "Telebirr",
    amount: 28500,
    status: "suggested_match",
    batchId: "BATCH-002",
    narration: "Merchant Settlement - Order #ORD-4525",
    suggestedInvoices: [
      {
        id: "INV-2026-00148",
        customer: "Quick Mart Addis",
        originalAmount: 28500,
        amountPaid: 0,
        outstandingBalance: 28500,
        difference: 0
      }
    ],
    auditLog: [
      { event: "API Payment Received", details: "Telebirr Webhook", timestamp: "2026-03-02T13:15:00" },
      { event: "System Suggestion", details: "Potential match with INV-2026-00148", timestamp: "2026-03-02T13:15:00" }
    ]
  },
  {
    id: "TXN-847352",
    date: "2026-03-02T11:45:00",
    counterparty: "Dashen Bank",
    source: "Dashen",
    amount: 95000,
    status: "needs_matching",
    batchId: "BATCH-003",
    narration: "Transfer from Dashen - Unknown purpose",
    suggestedInvoices: [],
    auditLog: [
      { event: "CSV Statement Imported", details: "Batch #DASHEN-2026-03", timestamp: "2026-03-02T11:50:00" }
    ]
  },
  {
    id: "TXN-847353",
    date: "2026-03-02T10:20:00",
    counterparty: "CBE RTGS",
    source: "CBE",
    amount: 250000,
    status: "discrepancy",
    batchId: "BATCH-001",
    narration: "RTGS Payment - Amount mismatch with suggested invoice",
    suggestedInvoices: [
      {
        id: "INV-2026-00142",
        customer: "Ethio Construction",
        originalAmount: 275000,
        amountPaid: 0,
        outstandingBalance: 275000,
        difference: -25000
      }
    ],
    auditLog: [
      { event: "CSV Statement Imported", details: "Batch #CBE-2026-03", timestamp: "2026-03-02T10:25:00" },
      { event: "System Suggestion", details: "Potential match with INV-2026-00142 (amount difference: ETB 25,000)", timestamp: "2026-03-02T10:25:00" }
    ]
  },
  {
    id: "TXN-847354",
    date: "2026-03-01T16:30:00",
    counterparty: "Cash Payment",
    source: "Cash",
    amount: 45000,
    status: "reconciled",
    batchId: null,
    narration: "Cash Receipt - Invoice #INV-2026-00130",
    suggestedInvoices: [
      {
        id: "INV-2026-00130",
        customer: "Local Customer",
        originalAmount: 45000,
        amountPaid: 45000,
        outstandingBalance: 0,
        difference: 0
      }
    ],
    auditLog: [
      { event: "Manual Entry", details: "Cash payment recorded", timestamp: "2026-03-01T16:30:00" },
      { event: "Payment Allocated", details: "INV-2026-00130", timestamp: "2026-03-01T16:30:00" }
    ]
  },
  {
    id: "TXN-847355",
    date: "2026-03-01T14:15:00",
    counterparty: "CBE Birr",
    source: "CBE Birr",
    amount: 68000,
    status: "needs_matching",
    batchId: "BATCH-004",
    narration: "Mobile Banking Transfer",
    suggestedInvoices: [],
    auditLog: [
      { event: "CSV Statement Imported", details: "Batch #CBE-2026-03", timestamp: "2026-03-01T14:20:00" }
    ]
  },
];

const filterOptions = [
  { label: "All", count: 1428, value: "all" },
  { label: "Needs Matching", count: 23, value: "needs_matching" },
  { label: "Suggested Matches", count: 15, value: "suggested_match" },
  { label: "Discrepancies", count: 4, value: "discrepancy" },
  { label: "Reconciled", count: 1386, value: "reconciled" },
];

export default function ReconciliationPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<typeof transactions[0] | null>(null);
  const [filter, setFilter] = useState("all");
  const [selectedBatch, setSelectedBatch] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isManualMatchDialogOpen, setIsManualMatchDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isFlagDialogOpen, setIsFlagDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [manualMatchInvoice, setManualMatchInvoice] = useState<any>(null);
  const [invoiceSearchQuery, setInvoiceSearchQuery] = useState("");
  const [flagReason, setFlagReason] = useState("");
  const [flagNote, setFlagNote] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRangeStart, setDateRangeStart] = useState("");
  const [dateRangeEnd, setDateRangeEnd] = useState("");
  const itemsPerPage = 5;

  // Combined filtering logic using useMemo to avoid prerender issues
  const filteredTransactions = useMemo(() => {
    let filtered = transactions;

    // Status filter
    if (filter !== "all") {
      filtered = filtered.filter(t => t.status === filter);
    }

    // Batch filter
    if (selectedBatch !== "all") {
      filtered = filtered.filter(t => t.batchId === selectedBatch);
    }

    // Search filter (case-insensitive)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(t =>
        t.id.toLowerCase().includes(query) ||
        t.counterparty.toLowerCase().includes(query) ||
        t.source.toLowerCase().includes(query) ||
        t.amount.toString().includes(query) ||
        (t.narration && t.narration.toLowerCase().includes(query)) ||
        (t.suggestedInvoices && t.suggestedInvoices.some(inv => inv.id.toLowerCase().includes(query)))
      );
    }

    return filtered;
  }, [filter, selectedBatch, searchQuery]);

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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }) + " EAT";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "reconciled":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "suggested_match":
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case "discrepancy":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "needs_matching":
        return <Clock className="w-4 h-4 text-orange-500" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "reconciled":
        return "Reconciled";
      case "suggested_match":
        return "Suggested Match";
      case "discrepancy":
        return "Discrepancy";
      case "needs_matching":
        return "Needs Matching";
      default:
        return status;
    }
  };

  const handleConfirmMatch = () => {
    if (!selectedTransaction || !selectedInvoice) return;
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsConfirmDialogOpen(false);
      setActionSuccess("Match confirmed (frontend prototype - backend endpoint required for persistence)");
      setTimeout(() => setActionSuccess(null), 3000);
    }, 1000);
  };

  const handleRejectSuggestion = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsRejectDialogOpen(false);
      setActionSuccess("Suggestion rejected (frontend prototype - backend endpoint required for persistence)");
      setTimeout(() => setActionSuccess(null), 3000);
    }, 1000);
  };

  const handleFlagDiscrepancy = () => {
    if (!flagReason) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsFlagDialogOpen(false);
      setFlagReason("");
      setFlagNote("");
      setActionSuccess("Discrepancy flagged (frontend prototype - backend endpoint required for persistence)");
      setTimeout(() => setActionSuccess(null), 3000);
    }, 1000);
  };

  // Handle Escape key to close dialogs
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isConfirmDialogOpen) setIsConfirmDialogOpen(false);
        if (isManualMatchDialogOpen) setIsManualMatchDialogOpen(false);
        if (isRejectDialogOpen) setIsRejectDialogOpen(false);
        if (isFlagDialogOpen) setIsFlagDialogOpen(false);
      }
    };

    if (isConfirmDialogOpen || isManualMatchDialogOpen || isRejectDialogOpen || isFlagDialogOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isConfirmDialogOpen, isManualMatchDialogOpen, isRejectDialogOpen, isFlagDialogOpen]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleBatchChange = (newBatch: string) => {
    setSelectedBatch(newBatch);
    setCurrentPage(1);
  };

  const handleSearchChange = (newQuery: string) => {
    setSearchQuery(newQuery);
    setCurrentPage(1);
  };

  return (
    <DashboardLayout activeRoute="/dashboard/reconciliation">
      <div className="p-6">
          {/* Page Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Reconciliation</h1>
              <p className="text-muted-foreground">Match payments to invoices and resolve discrepancies</p>
            </div>
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
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="text-xs text-muted-foreground">This Month</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{reconciliationSummary.needsMatching}</p>
              <p className="text-sm text-muted-foreground">Needs Matching</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <span className="text-xs text-muted-foreground">This Month</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{reconciliationSummary.suggestedMatches}</p>
              <p className="text-sm text-muted-foreground">Suggested Matches</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-xs text-muted-foreground">This Month</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{reconciliationSummary.discrepancies}</p>
              <p className="text-sm text-muted-foreground">Discrepancies</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-xs text-muted-foreground">This Month</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{reconciliationSummary.reconciled}</p>
              <p className="text-sm text-muted-foreground">Reconciled</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Status:</span>
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange(option.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filter === option.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {option.label} {option.count}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Batch:</span>
              <select
                value={selectedBatch}
                onChange={(e) => handleBatchChange(e.target.value)}
                className="px-3 py-1.5 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Batches</option>
                {statementBatches.map((batch) => (
                  <option key={batch.id} value={batch.id}>
                    {batch.label} ({batch.count})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <DateRangePicker
                startDate={dateRangeStart}
                endDate={dateRangeEnd}
                onStartDateChange={setDateRangeStart}
                onEndDateChange={setDateRangeEnd}
                label="Date Range"
                className="w-64"
              />
            </div>
          </div>

          {/* Success Message */}
          <AnimatePresence>
            {actionSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <p className="text-sm text-foreground">{actionSuccess}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Layout: Transaction Queue + Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Transaction Queue */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">Transaction Queue</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full" style={{ minWidth: "600px" }}>
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Reference</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Channel</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Counterparty</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                          No transactions found
                        </td>
                      </tr>
                    ) : (
                      paginatedTransactions.map((transaction) => (
                        <tr
                          key={transaction.id}
                          onClick={() => setSelectedTransaction(transaction)}
                          className={`border-b border-border hover:bg-secondary/50 transition-colors cursor-pointer ${
                            selectedTransaction?.id === transaction.id ? "bg-secondary/80" : ""
                          }`}
                        >
                          <td className="px-4 py-3 text-sm font-medium text-foreground">{transaction.id}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{formatDate(transaction.date)}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{transaction.source}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{transaction.counterparty}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-foreground">{formatETB(transaction.amount)}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(transaction.status)}
                              <span className="text-sm text-foreground">{getStatusLabel(transaction.status)}</span>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
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
              )}
            </div>

            {/* Transaction Inspector */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              {selectedTransaction ? (
                <>
                  <div className="px-6 py-4 border-b border-border">
                    <h2 className="text-lg font-semibold text-foreground">Transaction Inspector</h2>
                  </div>
                  <div className="p-6 space-y-6 max-h-[calc(100vh-400px)] overflow-y-auto">
                    {/* Transaction Details */}
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Hash className="w-4 h-4 text-primary" />
                        Transaction Details
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Reference</span>
                          <span className="text-foreground font-medium">{selectedTransaction.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Payment Channel</span>
                          <span className="text-foreground">{selectedTransaction.source}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date</span>
                          <span className="text-foreground">{formatDateTime(selectedTransaction.date)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Counterparty</span>
                          <span className="text-foreground">{selectedTransaction.counterparty}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount</span>
                          <span className="text-foreground font-semibold">{formatETB(selectedTransaction.amount)}</span>
                        </div>
                        <div className="pt-2">
                          <span className="text-muted-foreground block mb-1">Statement Narration</span>
                          <p className="text-foreground bg-secondary p-3 rounded-lg">{selectedTransaction.narration}</p>
                        </div>
                      </div>
                    </div>

                    {/* Suggested Invoice Matches */}
                    {selectedTransaction.suggestedInvoices && selectedTransaction.suggestedInvoices.length > 0 ? (
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Link2 className="w-4 h-4 text-primary" />
                          Suggested Invoice Matches
                        </h3>
                        <div className="space-y-3">
                          {selectedTransaction.suggestedInvoices.map((invoice, index) => (
                            <div key={index} className="bg-secondary rounded-xl p-4 space-y-2">
                              <div className="flex justify-between items-start">
                                <span className="text-sm font-medium text-foreground">{invoice.id}</span>
                                <span className="text-xs text-blue-500 bg-blue-500/10 px-2 py-1 rounded">Pending Confirmation</span>
                              </div>
                              <div className="text-sm text-muted-foreground">{invoice.customer}</div>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-muted-foreground block">Original Amount</span>
                                  <span className="text-foreground">{formatETB(invoice.originalAmount)}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground block">Previously Paid</span>
                                  <span className="text-foreground">{formatETB(invoice.amountPaid)}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground block">Outstanding Balance</span>
                                  <span className="text-foreground">{formatETB(invoice.outstandingBalance)}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground block">Transaction Amount</span>
                                  <span className="text-foreground">{formatETB(selectedTransaction.amount)}</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center pt-2 border-t border-border">
                                <span className="text-sm text-muted-foreground">Difference</span>
                                <span className={`text-sm font-semibold ${invoice.difference === 0 ? "text-green-500" : "text-red-500"}`}>
                                  {invoice.difference === 0 ? "ETB 0.00" : formatETB(invoice.difference)}
                                </span>
                              </div>
                              {invoice.difference !== 0 && (
                                <p className="text-xs text-muted-foreground italic">
                                  Amount mismatch detected. Manual review required.
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">No suggested invoices available</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="pt-4 border-t border-border">
                      <h3 className="text-sm font-semibold text-foreground mb-3">Actions</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedTransaction.suggestedInvoices && selectedTransaction.suggestedInvoices.length > 0 && (
                          <button
                            onClick={() => {
                              setSelectedInvoice(selectedTransaction.suggestedInvoices[0]);
                              setIsConfirmDialogOpen(true);
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
                          >
                            <Check className="w-4 h-4" />
                            Confirm Match
                          </button>
                        )}
                        <button
                          onClick={() => setIsManualMatchDialogOpen(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors"
                        >
                          <Link2 className="w-4 h-4" />
                          Match Manually
                        </button>
                        {selectedTransaction.status === "suggested_match" && (
                          <button
                            onClick={() => setIsRejectDialogOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject Suggestion
                          </button>
                        )}
                        <button
                          onClick={() => setIsFlagDialogOpen(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors"
                        >
                          <Flag className="w-4 h-4" />
                          Flag Discrepancy
                        </button>
                      </div>
                    </div>

                    {/* Activity Timeline */}
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <History className="w-4 h-4 text-primary" />
                        Activity Timeline
                      </h3>
                      <div className="space-y-3">
                        {selectedTransaction.auditLog && selectedTransaction.auditLog.length > 0 ? (
                          selectedTransaction.auditLog.map((log, index) => (
                            <div key={index} className="flex gap-3">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-foreground">{log.event}</p>
                                <p className="text-sm text-muted-foreground">{log.details}</p>
                                <p className="text-xs text-muted-foreground mt-1">{formatDateTime(log.timestamp)}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No activity history available</p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-12 text-center">
                  <Hash className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Select a transaction to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>

      {/* Confirm Match Dialog */}
      <AnimatePresence>
        {isConfirmDialogOpen && selectedTransaction && selectedInvoice && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConfirmDialogOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-card border border-border rounded-xl w-full max-w-md p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Confirm Match</h3>
                <div className="space-y-4 mb-6">
                  <div className="bg-secondary rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Transaction</p>
                    <p className="text-foreground font-medium">{selectedTransaction.id}</p>
                    <p className="text-foreground">{formatETB(selectedTransaction.amount)}</p>
                  </div>
                  <div className="flex justify-center">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div className="bg-secondary rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Invoice</p>
                    <p className="text-foreground font-medium">{selectedInvoice.id}</p>
                    <p className="text-foreground">{formatETB(selectedInvoice.outstandingBalance)} outstanding</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsConfirmDialogOpen(false)}
                    className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmMatch}
                    disabled={isProcessing}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? "Confirming..." : "Confirm"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Manual Match Dialog */}
      <AnimatePresence>
        {isManualMatchDialogOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsManualMatchDialogOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-card border border-border rounded-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-semibold text-foreground mb-4">Match Manually</h3>
                <div className="mb-4">
                  <label className="text-sm text-muted-foreground block mb-2">Search Invoices</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search by invoice number or customer..."
                      value={invoiceSearchQuery}
                      onChange={(e) => setInvoiceSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-10 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {invoiceSearchQuery && (
                      <button
                        onClick={() => setInvoiceSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Clear search"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="mb-6 max-h-64 overflow-y-auto">
                  {invoices.filter(invoice =>
                    invoice.id.toLowerCase().includes(invoiceSearchQuery.toLowerCase()) ||
                    invoice.customer.toLowerCase().includes(invoiceSearchQuery.toLowerCase())
                  ).length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No invoices found matching search criteria
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {invoices.filter(invoice =>
                        invoice.id.toLowerCase().includes(invoiceSearchQuery.toLowerCase()) ||
                        invoice.customer.toLowerCase().includes(invoiceSearchQuery.toLowerCase())
                      ).map((invoice) => (
                        <div
                          key={invoice.id}
                          onClick={() => setManualMatchInvoice(invoice)}
                          className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                            manualMatchInvoice?.id === invoice.id
                              ? "bg-primary/20 border-primary"
                              : "bg-secondary border-border hover:bg-secondary/80"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-medium text-foreground">{invoice.id}</span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              invoice.outstandingBalance === 0
                                ? "bg-green-500/10 text-green-500"
                                : "bg-blue-500/10 text-blue-500"
                            }`}>
                              {invoice.outstandingBalance === 0 ? "Fully Paid" : "Outstanding"}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">{invoice.customer}</div>
                          <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                            <div>
                              <span className="text-muted-foreground block">Original Amount</span>
                              <span className="text-foreground">{formatETB(invoice.originalAmount)}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground block">Outstanding Balance</span>
                              <span className="text-foreground">{formatETB(invoice.outstandingBalance)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {manualMatchInvoice && (
                  <div className="mb-6 p-4 bg-secondary rounded-lg">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Selected Invoice</h4>
                    <div className="text-sm">
                      <p><span className="text-muted-foreground">Invoice:</span> {manualMatchInvoice.id}</p>
                      <p><span className="text-muted-foreground">Customer:</span> {manualMatchInvoice.customer}</p>
                      <p><span className="text-muted-foreground">Original Amount:</span> {formatETB(manualMatchInvoice.originalAmount)}</p>
                      <p><span className="text-muted-foreground">Outstanding Balance:</span> {formatETB(manualMatchInvoice.outstandingBalance)}</p>
                    </div>
                  </div>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setIsManualMatchDialogOpen(false);
                      setManualMatchInvoice(null);
                      setInvoiceSearchQuery("");
                    }}
                    className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (manualMatchInvoice) {
                        setIsManualMatchDialogOpen(false);
                        setSelectedInvoice(manualMatchInvoice);
                        setIsConfirmDialogOpen(true);
                        setManualMatchInvoice(null);
                        setInvoiceSearchQuery("");
                      }
                    }}
                    disabled={!manualMatchInvoice}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Reject Suggestion Dialog */}
      <AnimatePresence>
        {isRejectDialogOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRejectDialogOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-card border border-border rounded-xl w-full max-w-md p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Reject Suggestion</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Are you sure you want to reject this suggested match? The transaction will remain unmatched.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsRejectDialogOpen(false)}
                    className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRejectSuggestion}
                    disabled={isProcessing}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? "Rejecting..." : "Reject"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Flag Discrepancy Dialog */}
      <AnimatePresence>
        {isFlagDialogOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFlagDialogOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-card border border-border rounded-xl w-full max-w-md p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Flag Discrepancy</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Reason *</label>
                    <select
                      value={flagReason}
                      onChange={(e) => setFlagReason(e.target.value)}
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a reason...</option>
                      <option value="amount_mismatch">Amount mismatch</option>
                      <option value="customer_mismatch">Customer mismatch</option>
                      <option value="possible_duplicate">Possible duplicate</option>
                      <option value="invoice_fully_paid">Invoice already fully paid</option>
                      <option value="no_suitable_invoice">No suitable invoice</option>
                      <option value="partial_payment">Partial payment</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Note (optional)</label>
                    <textarea
                      value={flagNote}
                      onChange={(e) => setFlagNote(e.target.value)}
                      placeholder="Add additional details..."
                      rows={3}
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsFlagDialogOpen(false)}
                    className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleFlagDiscrepancy}
                    disabled={isProcessing || !flagReason}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? "Flagging..." : "Flag"}
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
