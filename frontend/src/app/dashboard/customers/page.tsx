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
  Plus,
  X,
  Eye,
  Mail,
  Phone,
  DollarSign,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

// Development fixtures - These will be replaced with real API data when backend is implemented
const customers = [
  {
    id: "CUST-001",
    name: "Quick Mart Addis",
    email: "accounts@quickmart.et",
    phone: "+251 911 123 456",
    totalInvoices: 5,
    outstandingBalance: 28500,
    totalRevenue: 142500,
    status: "active"
  },
  {
    id: "CUST-002",
    name: "Ethio Construction",
    email: "finance@ethioconstruction.et",
    phone: "+251 911 234 567",
    totalInvoices: 3,
    outstandingBalance: 275000,
    totalRevenue: 825000,
    status: "active"
  },
  {
    id: "CUST-003",
    name: "Green Valley Agro",
    email: "payments@greenvalley.et",
    phone: "+251 911 345 678",
    totalInvoices: 4,
    outstandingBalance: 185000,
    totalRevenue: 740000,
    status: "active"
  },
  {
    id: "CUST-004",
    name: "Metro Supermarket",
    email: "billing@metro.et",
    phone: "+251 911 456 789",
    totalInvoices: 2,
    outstandingBalance: 75000,
    totalRevenue: 250000,
    status: "active"
  },
  {
    id: "CUST-005",
    name: "Ethio Telecom",
    email: "procurement@ethiotelecom.et",
    phone: "+251 911 567 890",
    totalInvoices: 1,
    outstandingBalance: 95000,
    totalRevenue: 95000,
    status: "active"
  },
];

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", route: "/dashboard" },
  { icon: ArrowUpDown, label: "Transactions", route: "/dashboard/transactions" },
  { icon: FileText, label: "Reconciliation", route: "/dashboard/reconciliation" },
  { icon: Upload, label: "Imports", route: "/dashboard/imports" },
  { icon: AlertTriangle, label: "Discrepancies", route: "/dashboard/discrepancies" },
  { icon: Users, label: "Customers", route: "/dashboard/customers", active: true },
  { icon: FileBarChart, label: "Invoices", route: "/dashboard/invoices" },
  { icon: FileBarChart, label: "Reports", route: "/dashboard/reports" },
  { icon: Bell, label: "Notifications", route: "/dashboard/notifications" },
  { icon: Settings, label: "Settings", route: "/dashboard/settings" },
];

export default function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
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

  const openDrawer = (customer: typeof customers[0]) => {
    setSelectedCustomer(customer);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Filter customers based on search
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = searchQuery === "" ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when search changes
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
              <span className="text-foreground font-medium">Customers</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search customers..."
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

        {/* Customers Content */}
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Customers</h1>
              <p className="text-muted-foreground">Manage customer relationships and invoices</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCreateDialogOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Customer
            </motion.button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-xs text-muted-foreground">Total</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{customers.length}</p>
              <p className="text-sm text-muted-foreground">Customers</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                <span className="text-xs text-muted-foreground">Total Revenue</span>
              </div>
              <p className="text-2xl font-bold text-foreground">ETB 2.1M</p>
              <p className="text-sm text-muted-foreground">All Time</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-5 h-5 text-orange-500" />
                <span className="text-xs text-muted-foreground">Outstanding</span>
              </div>
              <p className="text-2xl font-bold text-foreground">ETB 658.5K</p>
              <p className="text-sm text-muted-foreground">Unpaid</p>
            </div>
          </div>

          {/* Customers Table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full" style={{ minWidth: "900px" }}>
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Customer</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Invoices</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Outstanding Balance</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Revenue</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCustomers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                        No customers found
                      </td>
                    </tr>
                  ) : (
                    paginatedCustomers.map((customer) => (
                      <tr
                        key={customer.id}
                        onClick={() => openDrawer(customer)}
                        className="border-b border-border hover:bg-secondary/50 transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-foreground">{customer.name}</p>
                            <p className="text-xs text-muted-foreground">{customer.id}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">{customer.email}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{customer.phone}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{customer.totalInvoices}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-foreground">{formatETB(customer.outstandingBalance)}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{formatETB(customer.totalRevenue)}</td>
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
                Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length} customers
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

      {/* Customer Details Drawer */}
      <AnimatePresence>
        {isDrawerOpen && selectedCustomer && (
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
                  <h2 className="text-lg font-semibold text-foreground">Customer Details</h2>
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
                      <Users className="w-4 h-4 text-primary" />
                      Customer Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ID</span>
                        <span className="text-foreground font-medium">{selectedCustomer.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name</span>
                        <span className="text-foreground">{selectedCustomer.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email</span>
                        <span className="text-foreground">{selectedCustomer.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone</span>
                        <span className="text-foreground">{selectedCustomer.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-primary" />
                      Financial Summary
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Invoices</span>
                        <span className="text-foreground">{selectedCustomer.totalInvoices}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Outstanding Balance</span>
                        <span className="text-foreground font-semibold">{formatETB(selectedCustomer.outstandingBalance)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Revenue</span>
                        <span className="text-foreground font-semibold">{formatETB(selectedCustomer.totalRevenue)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Create Customer Dialog */}
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
                <h3 className="text-lg font-semibold text-foreground mb-4">Add Customer</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Customer Name *</label>
                    <input
                      type="text"
                      placeholder="Customer name"
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Email *</label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-2">Phone</label>
                    <input
                      type="tel"
                      placeholder="+251 911 123 456"
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
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
                      setIsCreateDialogOpen(false);
                      alert("Customer added (frontend prototype - backend endpoint required for persistence)");
                    }}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
