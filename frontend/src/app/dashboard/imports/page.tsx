"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  X,
  CheckCircle,
  Clock,
  XCircle,
  FileSpreadsheet,
  Download,
  Eye,
  Upload
} from "lucide-react";
import Link from "next/link";

// Development fixtures - These will be replaced with real API data when backend is implemented
const importHistory = [
  {
    id: "IMP-001",
    fileName: "CBE_Statement_March_2026.csv",
    importDate: "2026-03-02T10:25:00",
    source: "CBE",
    status: "completed",
    rowsProcessed: 245,
    rowsValid: 240,
    rowsInvalid: 5,
    uploadedBy: "Dawit Mengistu"
  },
  {
    id: "IMP-002",
    fileName: "Telebirr_Statement_March_2026.csv",
    importDate: "2026-03-01T14:30:00",
    source: "Telebirr",
    status: "completed",
    rowsProcessed: 512,
    rowsValid: 512,
    rowsInvalid: 0,
    uploadedBy: "Dawit Mengistu"
  },
  {
    id: "IMP-003",
    fileName: "Awash_Statement_Feb_2026.csv",
    importDate: "2026-02-28T09:15:00",
    source: "Awash",
    status: "completed",
    rowsProcessed: 189,
    rowsValid: 185,
    rowsInvalid: 4,
    uploadedBy: "Dawit Mengistu"
  },
  {
    id: "IMP-004",
    fileName: "Invalid_Format.xlsx",
    importDate: "2026-02-25T16:45:00",
    source: "Unknown",
    status: "failed",
    rowsProcessed: 0,
    rowsValid: 0,
    rowsInvalid: 0,
    uploadedBy: "Dawit Mengistu"
  },
];

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", route: "/dashboard" },
  { icon: ArrowUpDown, label: "Transactions", route: "/dashboard/transactions" },
  { icon: FileText, label: "Reconciliation", route: "/dashboard/reconciliation" },
  { icon: Upload, label: "Imports", route: "/dashboard/imports", active: true },
  { icon: AlertTriangle, label: "Discrepancies", route: "/dashboard/discrepancies" },
  { icon: Users, label: "Customers", route: "/dashboard/customers" },
  { icon: FileBarChart, label: "Invoices", route: "/dashboard/invoices" },
  { icon: FileBarChart, label: "Reports", route: "/dashboard/reports" },
  { icon: Bell, label: "Notifications", route: "/dashboard/notifications" },
  { icon: Settings, label: "Settings", route: "/dashboard/settings" },
];

export default function ImportsPage() {
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importStep, setImportStep] = useState<"upload" | "mapping" | "preview" | "validation">("upload");
  const [isProcessing, setIsProcessing] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "processing":
        return <Clock className="w-4 h-4 text-orange-500" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "failed":
        return "Failed";
      case "processing":
        return "Processing";
      default:
        return status;
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleImport = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsImportDialogOpen(false);
      setSelectedFile(null);
      setImportStep("upload");
      alert("Statement imported (frontend prototype - backend endpoint required for persistence)");
    }, 2000);
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
              <span className="text-foreground font-medium">Imports</span>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Imports Content */}
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Statement Imports</h1>
              <p className="text-muted-foreground">Import bank statements for reconciliation</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsImportDialogOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Import Statement
            </motion.button>
          </div>

          {/* Import History Table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full" style={{ minWidth: "900px" }}>
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Import ID</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">File Name</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Source</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Import Date</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Rows Processed</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Valid/Invalid</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Uploaded By</th>
                  </tr>
                </thead>
                <tbody>
                  {importHistory.map((importItem) => (
                    <tr key={importItem.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{importItem.id}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{importItem.fileName}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{importItem.source}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{formatDate(importItem.importDate)}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{importItem.rowsProcessed}</td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        <span className="text-green-500">{importItem.rowsValid}</span>
                        <span className="text-muted-foreground"> / </span>
                        <span className="text-red-500">{importItem.rowsInvalid}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(importItem.status)}
                          <span className="text-sm text-foreground">{getStatusLabel(importItem.status)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">{importItem.uploadedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Import Dialog */}
      <AnimatePresence>
        {isImportDialogOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsImportDialogOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-card border border-border rounded-xl w-full max-w-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground">Import Statement</h3>
                  <button
                    onClick={() => setIsImportDialogOpen(false)}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {importStep === "upload" && (
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <FileSpreadsheet className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground mb-4">
                        Drag and drop your file here, or click to browse
                      </p>
                      <input
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors cursor-pointer"
                      >
                        <Upload className="w-4 h-4" />
                        Select File
                      </label>
                      <p className="text-xs text-muted-foreground mt-4">
                        Supported formats: CSV, Excel (.xlsx, .xls)
                      </p>
                    </div>

                    {selectedFile && (
                      <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileSpreadsheet className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{selectedFile.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(selectedFile.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedFile(null)}
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        onClick={() => setIsImportDialogOpen(false)}
                        className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setImportStep("mapping")}
                        disabled={!selectedFile}
                        className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {importStep === "mapping" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-4">Map Columns</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4">
                          <label className="w-32 text-sm text-muted-foreground">Date</label>
                          <select className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground">
                            <option>Column A (Date)</option>
                            <option>Column B</option>
                            <option>Column C</option>
                          </select>
                        </div>
                        <div className="flex items-center gap-4">
                          <label className="w-32 text-sm text-muted-foreground">Reference</label>
                          <select className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground">
                            <option>Column B (Reference)</option>
                            <option>Column A</option>
                            <option>Column C</option>
                          </select>
                        </div>
                        <div className="flex items-center gap-4">
                          <label className="w-32 text-sm text-muted-foreground">Amount</label>
                          <select className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground">
                            <option>Column C (Amount)</option>
                            <option>Column A</option>
                            <option>Column B</option>
                          </select>
                        </div>
                        <div className="flex items-center gap-4">
                          <label className="w-32 text-sm text-muted-foreground">Counterparty</label>
                          <select className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground">
                            <option>Column D (Counterparty)</option>
                            <option>Column A</option>
                            <option>Column B</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setImportStep("upload")}
                        className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setImportStep("preview")}
                        className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {importStep === "preview" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-4">Preview Data</h4>
                      <div className="overflow-x-auto border border-border rounded-lg">
                        <table className="w-full text-sm">
                          <thead className="bg-secondary">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Date</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Reference</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Amount</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Counterparty</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-t border-border">
                              <td className="px-4 py-2 text-foreground">2026-03-01</td>
                              <td className="px-4 py-2 text-foreground">TXN-001</td>
                              <td className="px-4 py-2 text-foreground">ETB 15,000.00</td>
                              <td className="px-4 py-2 text-foreground">Customer A</td>
                            </tr>
                            <tr className="border-t border-border">
                              <td className="px-4 py-2 text-foreground">2026-03-02</td>
                              <td className="px-4 py-2 text-foreground">TXN-002</td>
                              <td className="px-4 py-2 text-foreground">ETB 22,500.00</td>
                              <td className="px-4 py-2 text-foreground">Customer B</td>
                            </tr>
                            <tr className="border-t border-border">
                              <td className="px-4 py-2 text-foreground">2026-03-03</td>
                              <td className="px-4 py-2 text-foreground">TXN-003</td>
                              <td className="px-4 py-2 text-foreground">ETB 8,750.00</td>
                              <td className="px-4 py-2 text-foreground">Customer C</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Showing 3 of 245 rows
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setImportStep("mapping")}
                        className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setImportStep("validation")}
                        className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {importStep === "validation" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-4">Validation Results</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-sm text-foreground">240 rows valid</span>
                          </div>
                          <span className="text-sm text-green-500">98.0%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                          <div className="flex items-center gap-3">
                            <XCircle className="w-5 h-5 text-red-500" />
                            <span className="text-sm text-foreground">5 rows invalid</span>
                          </div>
                          <span className="text-sm text-red-500">2.0%</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-4">
                        Invalid rows: Missing date (2), Invalid amount format (3)
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setImportStep("preview")}
                        className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleImport}
                        disabled={isProcessing}
                        className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? "Processing..." : "Import"}
                      </button>
                    </div>
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
