"use client";

import { motion } from "motion/react";

export default function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-6xl mx-auto"
    >
      <div className="bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
        {/* Dashboard Header */}
        <div className="border-b border-border bg-gradient-to-r from-secondary/50 to-background px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold text-sm">P</span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">PayManager</h3>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-secondary border border-border rounded-lg text-xs text-muted-foreground">
              This Month
            </div>
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center hover:bg-secondary/80 transition-colors cursor-pointer">
              <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="p-6 grid grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-card to-secondary/30 border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <p className="text-xs text-muted-foreground mb-1">Total Received</p>
            <p className="text-2xl font-bold text-foreground">ETB 1,284,500</p>
            <p className="text-xs text-green-500 mt-1">Sample data</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-card to-secondary/30 border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <p className="text-xs text-muted-foreground mb-1">Outstanding</p>
            <p className="text-2xl font-bold text-foreground">ETB 348,200</p>
            <p className="text-xs text-orange-500 mt-1">12 invoices pending</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-card to-secondary/30 border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <p className="text-xs text-muted-foreground mb-1">Unmatched</p>
            <p className="text-2xl font-bold text-foreground">ETB 65,000</p>
            <p className="text-xs text-muted-foreground mt-1">3 transactions</p>
          </motion.div>
        </div>

        {/* Chart and Transactions */}
        <div className="p-6 pt-0 grid grid-cols-2 gap-6">
          {/* Chart */}
          <div className="bg-gradient-to-br from-secondary/30 to-background rounded-xl p-4 border border-border">
            <p className="text-xs font-medium text-muted-foreground mb-3">Payment Activity</p>
            <div className="flex items-end gap-2 h-24">
              {[40, 65, 45, 80, 55, 70, 60].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${height}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: "easeOut" }}
                  className="flex-1 bg-gradient-to-t from-primary/60 to-primary rounded-t"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground mb-2">Recent Transactions</p>
            {[
              { name: "Telebirr C2B", txn: "TXN-847298", amount: "+ETB 14,800", status: "green" },
              { name: "CBE RTGS", txn: "TXN-847299", amount: "+ETB 120,000", status: "green" },
              { name: "Awash Transfer", txn: "TXN-847300", amount: "Pending", status: "orange" }
            ].map((tx, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                className="bg-card border border-border rounded-lg p-3 flex items-center justify-between hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 ${tx.status === 'green' ? 'bg-green-500' : 'bg-orange-500'} rounded-full`} />
                  <div>
                    <p className="text-xs font-medium text-foreground">{tx.name}</p>
                    <p className="text-xs text-muted-foreground">{tx.txn}</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold ${tx.status === 'green' ? 'text-foreground' : 'text-orange-500'}`}>{tx.amount}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gradient-to-r from-secondary/30 to-background border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Demo data only • Not connected to live accounts</p>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">Sample: Matched</span>
            <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-medium">Sample: Auto-reconcile</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
