// Shared notification data structure for the PayManager prototype
// These are mock notifications for demonstration purposes

export interface Notification {
  id: string;
  type: "alert" | "warning" | "success" | "info";
  title: string;
  message: string;
  date: string;
  read: boolean;
  category: "discrepancy" | "import" | "invoice" | "reconciliation" | "customer";
}

export const mockNotifications: Notification[] = [
  {
    id: "NOTIF-001",
    type: "alert",
    title: "Payment discrepancy detected",
    message: "Transaction TXN-847353 has a discrepancy of ETB 25,000 with invoice INV-2026-00142",
    date: "2026-03-02T10:30:00",
    read: false,
    category: "discrepancy"
  },
  {
    id: "NOTIF-002",
    type: "info",
    title: "Statement import completed",
    message: "CBE statement for March 2026 has been successfully imported with 240 valid rows",
    date: "2026-03-02T10:25:00",
    read: false,
    category: "import"
  },
  {
    id: "NOTIF-003",
    type: "warning",
    title: "Invoice overdue",
    message: "Invoice INV-2026-00148 for Quick Mart Addis is overdue by 7 days",
    date: "2026-03-01T09:00:00",
    read: true,
    category: "invoice"
  },
  {
    id: "NOTIF-004",
    type: "success",
    title: "Reconciliation completed",
    message: "Batch BATCH-001 has been fully reconciled with 245 transactions",
    date: "2026-02-28T16:45:00",
    read: true,
    category: "reconciliation"
  },
  {
    id: "NOTIF-005",
    type: "info",
    title: "New customer added",
    message: "Customer Bole Pharma has been added to the system",
    date: "2026-02-25T14:20:00",
    read: true,
    category: "customer"
  },
];
