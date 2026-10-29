"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Search,
  Filter,
  Plus,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  X,
  Flag,
  Link2,
  Check,
  Hash,
  Building,
  CreditCard,
  FileText as FileTextIcon,
  History,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";

// Extended transaction data for development fixtures
const transactions = [
  {
    id: "TXN-847298",
    date: "2026-03-02T11:20:00",
    counterparty: "Blue Nile Wholesale",
    source: "CBE",
    amount: 125500,
    status: "needs_review",
    isAllocated: false,
    tin: "0092182019",
    branch: "Bole Branch",
    bankAccount: "CBE 1000-2918-4921",
    narration: "FT2606288921 / Ref: INV-2026-00138 / Payer: Blue Nile Wholesale / Bole Branch Bulk Grain",
    suggestedInvoice: {
      id: "INV-2026-00138",
      issued: "2026-02-20",
      amount: 125500,
      balance: 0,
      isFullyPaid: true,
      confidence: null, // No real matching engine implemented
      rationale: null
    },
    auditLog: [
      { event: "CSV Statement Imported", details: "Batch #CBE-2026-02", timestamp: "2026-03-02T11:22:00" },
      { event: "System Suggestion", details: "Potential match with INV-2026-00138 based on amount (backend verification required)", timestamp: "2026-03-02T11:22:00" }
    ]
  },
  {
    id: "TXN-847299",
    date: "2026-03-02T10:15:00",
    counterparty: "Telebirr C2B",
    source: "Telebirr",
    amount: 14800,
    status: "matched",
    isAllocated: true,
    narration: "Merchant Settlement - Order #ORD-4521",
    matchedInvoice: {
      id: "INV-2026-00140",
      issued: "2026-02-25",
      amount: 14800,
      balance: 0,
      isFullyPaid: true
    },
    auditLog: [
      { event: "API Payment Received", details: "Telebirr Webhook", timestamp: "2026-03-02T10:15:00" },
      { event: "Payment Allocated", details: "INV-2026-00140", timestamp: "2026-03-02T10:15:00" }
    ]
  },
  {
    id: "TXN-847300",
    date: "2026-03-01T14:30:00",
    counterparty: "Awash Transfer",
    source: "Awash",
    amount: 65000,
    status: "unmatched",
    isAllocated: false,
    narration: "Transfer from Awash Bank - Reference: PAY-2026-03-01",
    suggestedInvoice: {
      id: "INV-2026-00136",
      issued: "2026-02-28",
      amount: 125000,
      balance: 60000,
      isFullyPaid: false,
      confidence: null,
      rationale: null
    },
    auditLog: [
      { event: "CSV Statement Imported", details: "Batch #AWASH-2026-03", timestamp: "2026-03-01T14:35:00" }
    ]
  },
  {
    id: "TXN-847301",
    date: "2026-03-01T09:45:00",
    counterparty: "CBE RTGS",
    source: "CBE",
    amount: 120000,
    status: "matched",
    isAllocated: true,
    narration: "RTGS Payment - Bulk Grain Purchase",
    matchedInvoice: {
      id: "INV-2026-00135",
      issued: "2026-02-28",
      amount: 120000,
      balance: 0,
      isFullyPaid: true
    },
    auditLog: [
      { event: "CSV Statement Imported", details: "Batch #CBE-2026-03", timestamp: "2026-03-01T09:50:00" },
      { event: "Payment Allocated", details: "INV-2026-00135", timestamp: "2026-03-01T09:50:00" }
    ]
  },
  {
    id: "TXN-847302",
    date: "2026-02-28T16:20:00",
    counterparty: "CBE Birr",
    source: "CBE Birr",
    amount: 45000,
    status: "partially_allocated",
    isAllocated: true,
    narration: "Mobile Banking Transfer - Partial Payment",
    matchedInvoice: {
      id: "INV-2026-00130",
      issued: "2026-02-20",
      amount: 95000,
      balance: 50000,
      isFullyPaid: false
    },
    auditLog: [
      { event: "CSV Statement Imported", details: "Batch #CBE-2026-02", timestamp: "2026-02-28T16:25:00" },
      { event: "Partial Allocation", details: "INV-2026-00130 (ETB 45,000 of ETB 95,000)", timestamp: "2026-02-28T16:25:00" }
    ]
  },
  {
    id: "TXN-847303",
    date: "2026-02-28T11:10:00",
    counterparty: "Cash Payment",
    source: "Cash",
    amount: 25000,
    status: "matched",
    isAllocated: true,
    narration: "Cash Receipt - Invoice #INV-2026-00125",
    matchedInvoice: {
      id: "INV-2026-00125",
      issued: "2026-02-15",
      amount: 25000,
      balance: 0,
      isFullyPaid: true
    },
    auditLog: [
      { event: "Manual Entry", details: "Cash payment recorded by Dawit Mengistu", timestamp: "2026-02-28T11:10:00" },
      { event: "Manual Allocation", details: "INV-2026-00125", timestamp: "2026-02-28T11:10:00" }
    ]
  },
  {
    id: "TXN-847304",
    date: "2026-02-27T15:00:00",
    counterparty: "Dashen Bank",
    source: "Dashen",
    amount: 78000,
    status: "unmatched",
    isAllocated: false,
    narration: "Transfer from Dashen - Unknown purpose",
    auditLog: [
      { event: "CSV Statement Imported", details: "Batch #DASHEN-2026-02", timestamp: "2026-02-27T15:05:00" }
    ]
  },
  {
    id: "TXN-847305",
    date: "2026-02-26T10:30:00",
    counterparty: "Telebirr C2B",
    source: "Telebirr",
    amount: 32500,
    status: "matched",
    isAllocated: true,
    narration: "Merchant Settlement - Order #ORD-4518",
    matchedInvoice: {
      id: "INV-2026-00122",
      issued: "2026-02-22",
      amount: 32500,
      balance: 0,
      isFullyPaid: true
    },
    auditLog: [
      { event: "API Payment Received", details: "Telebirr Webhook", timestamp: "2026-02-26T10:30:00" },
      { event: "Payment Allocated", details: "INV-2026-00122", timestamp: "2026-02-26T10:30:00" }
    ]
  },
];

const filterOptions = [
  { label: "All", count: 1428, value: "all" },
  { label: "Needs Review", count: 76, value: "needs_review" },
  { label: "Unmatched", count: 138, value: "unmatched" },
  { label: "Matched", count: 1214, value: "matched" },
  { label: "Partially Allocated", count: 24, value: "partially_allocated" },
];

export default function TransactionsPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<typeof transactions[0] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

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
      case "matched":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "unmatched":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "needs_review":
        return <Clock className="w-4 h-4 text-orange-500" />;
      case "partially_allocated":
        return <Clock className="w-4 h-4 text-yellow-500" />;
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

  const openDrawer = (transaction: typeof transactions[0]) => {
    setSelectedTransaction(transaction);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedTransaction(null), 300);
  };

  // Handle Escape key to close drawer
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isDrawerOpen) {
        closeDrawer();
      }
    };

    if (isDrawerOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDrawerOpen]);

  const handleConfirmMatch = () => {
    if (!selectedTransaction || !selectedTransaction.suggestedInvoice) return;

    // Invoice eligibility validation
    const invoice = selectedTransaction.suggestedInvoice;
    const transaction = selectedTransaction;

    // Zero-balance case: Invoice has no remaining balance
    if (invoice.balance === 0 && invoice.isFullyPaid) {
      setValidationError(
        `Invoice ${invoice.id} has no remaining balance (ETB ${formatETB(invoice.amount)} original amount, ETB 0.00 remaining). This invoice is already fully paid. Cannot allocate this transaction (ETB ${formatETB(transaction.amount)}) to a fully paid invoice. Select another eligible invoice or investigate the transaction.`
      );
      return;
    }

    // Check if transaction is already allocated
    if (transaction.isAllocated) {
      setValidationError(
        `Transaction ${transaction.id} is already allocated to another invoice. Duplicate allocations are not permitted. Cannot allocate the same payment to multiple invoices.`
      );
      return;
    }

    // Check if transaction amount exceeds remaining balance
    if (transaction.amount > invoice.balance) {
      setValidationError(
        `Transaction amount (ETB ${formatETB(transaction.amount)}) exceeds the invoice's remaining balance (ETB ${formatETB(invoice.balance)}). This would result in an overpayment of ETB ${formatETB(transaction.amount - invoice.balance)}.`
      );
      return;
    }

    // If validation passes, proceed with backend call
    setValidationError(null);
    setIsProcessing(true);

    // Simulate API call - in production this would be a real POST request
    setTimeout(() => {
      setIsProcessing(false);
      alert("Match confirmation requires backend implementation.\n\nServer-side validation requirements:\n- Verify transaction exists and belongs to user's business\n- Verify invoice exists and belongs to user's business\n- Check transaction is not already allocated in database\n- Calculate invoice's remaining balance from persisted allocation records\n- Perform validation and allocation in a database transaction\n- Prevent concurrent allocations with proper locking\n- Return detailed error if validation fails\n\nFrontend validation passed - ready for API integration.");
    }, 1000);
  };

  const handleManualMatch = () => {
    alert("Manual match requires backend implementation. This would open an invoice selection modal.");
  };

  const handleFlag = () => {
    alert("Flagging requires backend implementation. This would mark the transaction for review.");
  };

  const filteredTransactions = (() => {
    let filtered = transactions;

    // Status filter
    if (filter !== "all") {
      filtered = filtered.filter(t => t.status === filter);
    }

    // Search filter (case-insensitive)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(t =>
        t.id.toLowerCase().includes(query) ||
        t.counterparty.toLowerCase().includes(query) ||
        t.source.toLowerCase().includes(query) ||
        t.amount.toString().includes(query) ||
        (t.narration && t.narration.toLowerCase().includes(query)) ||
        (t.suggestedInvoice && t.suggestedInvoice.id.toLowerCase().includes(query)) ||
        (t.matchedInvoice && t.matchedInvoice.id.toLowerCase().includes(query))
      );
    }

    return filtered;
  })();

  return (
    <DashboardLayout activeRoute="/dashboard/transactions">
      {/* Page Header with Search */}
      <div className="px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Transactions</h1>
            <p className="text-sm text-muted-foreground">Manage and reconcile your payment transactions</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary w-64"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Transactions Content */}
      <div className="p-6">
          {/* Filters */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
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

          {/* Transactions Table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full" style={{ minWidth: "900px" }}>
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
                  {isLoading ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                        Loading transactions...
                      </td>
                    </tr>
                  ) : filteredTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                        No transactions found
                      </td>
                    </tr>
                  ) : (
                    filteredTransactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        onClick={() => openDrawer(transaction)}
                        className={`border-b border-border hover:bg-secondary/50 transition-colors cursor-pointer ${
                          selectedTransaction?.id === transaction.id ? "bg-secondary/80" : ""
                        }`}
                      >
                        <td className="px-6 py-4 text-sm text-foreground">
                          {formatDate(transaction.date)}
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
                            View Details
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
                Showing 1-{filteredTransactions.length} of {filter === "all" ? 1428 : filterOptions.find(f => f.value === filter)?.count} transactions
              </p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 bg-secondary border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="px-3 py-1.5 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

      {/* Transaction Details Drawer */}
      <AnimatePresence>
        {isDrawerOpen && selectedTransaction && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-black/30 z-40"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed right-0 top-0 h-full w-full lg:w-[480px] bg-card border-l border-border z-50 shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex-shrink-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">{selectedTransaction.id}</h2>
                  <p className="text-sm text-muted-foreground">{getStatusLabel(selectedTransaction.status)}</p>
                </div>
                <button
                  onClick={closeDrawer}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Drawer Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Transaction Details Section */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Hash className="w-4 h-4 text-primary" />
                    Transaction Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-muted-foreground">Ledger Amount</span>
                      <span className="text-sm font-semibold text-foreground">+ {formatETB(selectedTransaction.amount)}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-muted-foreground">Timestamp</span>
                      <span className="text-sm text-foreground">{formatDateTime(selectedTransaction.date)}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-muted-foreground">Counterparty</span>
                      <span className="text-sm text-foreground">{selectedTransaction.counterparty}</span>
                    </div>
                    {selectedTransaction.tin && (
                      <div className="flex justify-between items-start">
                        <span className="text-sm text-muted-foreground">TIN / Branch</span>
                        <span className="text-sm text-foreground">{selectedTransaction.tin} ({selectedTransaction.branch})</span>
                      </div>
                    )}
                    {selectedTransaction.bankAccount && (
                      <div className="flex justify-between items-start">
                        <span className="text-sm text-muted-foreground">Bank Account</span>
                        <span className="text-sm text-foreground">{selectedTransaction.bankAccount}</span>
                      </div>
                    )}
                    <div className="pt-2">
                      <span className="text-sm text-muted-foreground block mb-1">Bank Narration String</span>
                      <p className="text-sm text-foreground bg-secondary p-3 rounded-lg">{selectedTransaction.narration}</p>
                    </div>
                  </div>
                </div>

                {/* Invoice Matching Section */}
                {(selectedTransaction.suggestedInvoice || selectedTransaction.matchedInvoice) && (
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Link2 className="w-4 h-4 text-primary" />
                      Invoice Matching
                    </h3>
                    <div className="bg-secondary rounded-xl p-4 space-y-3">
                      {(selectedTransaction.suggestedInvoice || selectedTransaction.matchedInvoice) && (
                        <>
                          <div className="flex justify-between items-start">
                            <span className="text-sm text-muted-foreground">
                              {selectedTransaction.suggestedInvoice ? "Suggested Match" : "Matched Invoice"}
                            </span>
                            {selectedTransaction.suggestedInvoice?.confidence !== null && selectedTransaction.suggestedInvoice?.confidence !== undefined && (
                              <span className="text-sm font-semibold text-primary">
                                {selectedTransaction.suggestedInvoice.confidence}% Confidence
                              </span>
                            )}
                            {selectedTransaction.suggestedInvoice && (selectedTransaction.suggestedInvoice.confidence === null || selectedTransaction.suggestedInvoice.confidence === undefined) && (
                              <span className="text-xs text-muted-foreground italic">
                                (backend verification required)
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-foreground font-medium">
                            {(selectedTransaction.suggestedInvoice || selectedTransaction.matchedInvoice)?.id}
                          </div>
                          <div className="flex justify-between items-start">
                            <span className="text-sm text-muted-foreground">Issued</span>
                            <span className="text-sm text-foreground">
                              {formatDate((selectedTransaction.suggestedInvoice || selectedTransaction.matchedInvoice)?.issued || "")}
                            </span>
                          </div>
                          <div className="flex justify-between items-start">
                            <span className="text-sm text-muted-foreground">Original Amount</span>
                            <span className="text-sm text-foreground">
                              {formatETB((selectedTransaction.suggestedInvoice || selectedTransaction.matchedInvoice)?.amount || 0)}
                            </span>
                          </div>
                          <div className="flex justify-between items-start">
                            <span className="text-sm text-muted-foreground">Remaining Balance</span>
                            <span className="text-sm text-foreground">
                              {formatETB((selectedTransaction.suggestedInvoice || selectedTransaction.matchedInvoice)?.balance || 0)}
                              {((selectedTransaction.suggestedInvoice || selectedTransaction.matchedInvoice)?.balance || 0) === 0 && (
                                <span className="text-green-500 ml-2">(Fully Paid)</span>
                              )}
                              {((selectedTransaction.suggestedInvoice || selectedTransaction.matchedInvoice)?.balance || 0) > 0 && (
                                <span className="text-orange-500 ml-2">(Outstanding)</span>
                              )}
                            </span>
                          </div>
                          {selectedTransaction.suggestedInvoice?.rationale && (
                            <div className="pt-2 border-t border-border">
                              <span className="text-sm text-muted-foreground block mb-1">Match Rationale</span>
                              <p className="text-sm text-foreground">{selectedTransaction.suggestedInvoice.rationale}</p>
                            </div>
                          )}
                          {selectedTransaction.suggestedInvoice && !selectedTransaction.suggestedInvoice.rationale && (
                            <div className="pt-2 border-t border-border">
                              <span className="text-sm text-muted-foreground block mb-1">Match Reason</span>
                              <p className="text-sm text-foreground italic">
                                Matching engine not yet implemented. This is a system suggestion based on amount similarity. Backend verification required.
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Audit History Section */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <History className="w-4 h-4 text-primary" />
                    Audit History
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
                      <p className="text-sm text-muted-foreground">No audit history available</p>
                    )}
                  </div>
                </div>

                {/* Available Actions */}
                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-semibold text-foreground mb-4">Available Actions</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={handleFlag}
                      className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors"
                    >
                      <Flag className="w-4 h-4" />
                      Flag
                    </button>
                    {selectedTransaction.status === "unmatched" && (
                      <button
                        onClick={handleManualMatch}
                        className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors"
                      >
                        <Link2 className="w-4 h-4" />
                        Manual Match
                      </button>
                    )}
                    {selectedTransaction.suggestedInvoice && (
                      <button
                        onClick={handleConfirmMatch}
                        disabled={isProcessing}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Check className="w-4 h-4" />
                        {isProcessing ? "Processing..." : "Confirm Match"}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Validation Error Display */}
              {validationError && (
                <div className="flex-shrink-0 border-t border-border bg-red-500/10 p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-red-500 mb-1">Match Validation Failed</p>
                      <p className="text-sm text-foreground whitespace-pre-wrap">{validationError}</p>
                    </div>
                    <button
                      onClick={() => setValidationError(null)}
                      className="p-1 hover:bg-red-500/20 rounded transition-colors"
                      aria-label="Dismiss error"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      </DashboardLayout>
  );
}
