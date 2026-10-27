"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "motion/react";

export default function SignIn() {
  return (
    <div className="min-h-screen bg-background font-sans flex flex-col relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl" />
      </div>

      <Header showAuthButtons={false} showHelpLink={true} />

      <div className="flex-1 flex">
        {/* Left Section - Dashboard Preview */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary/50 to-background p-12 flex-col">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-8 shadow-md">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Bank-Grade Ingestion Engine
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            >
              Welcome Back
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-lg text-muted-foreground mb-10 leading-relaxed"
            >
              Manage payments, reconcile transactions, and track outstanding balances with precision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="space-y-6"
            >
              {/* Ethiopian Banking Integration Card */}
              <div className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Ethiopian Banking Integration
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Standardized for CBE, Telebirr & Awash Bank Statements
                    </p>
                  </div>
                </div>
              </div>

              {/* Selam Online Store Card */}
              <div className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Selam Online Store / Abebe Trading PLC
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-sm text-green-500 font-medium">
                        Active Ledger
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gradient-to-br from-green-500/10 to-background rounded-xl p-4 border border-green-500/20">
                    <p className="text-sm text-muted-foreground mb-1">
                      Total Collections
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      ETB 1,284,500.00
                    </p>
                    <p className="text-sm text-green-500 mt-1 font-medium">
                      Sample data
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500/10 to-background rounded-xl p-4 border border-orange-500/20">
                    <p className="text-sm text-muted-foreground mb-1">
                      Pending Invoices
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      ETB 348,200.00
                    </p>
                    <p className="text-sm text-orange-500 mt-1 font-medium">
                      12 open • Awaiting match
                    </p>
                  </div>
                </div>

                {/* Automated Match Record */}
                <div className="bg-gradient-to-br from-primary/10 to-background rounded-xl p-4 border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      Automated Match Record
                    </span>
                    <span className="text-sm font-semibold text-primary">
                      Sample: High confidence
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      TXN-847298
                    </span>{" "}
                    • ETB 65,000.00
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      INV-2026-00138
                    </span>{" "}
                    (Blue Nile)
                  </div>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-card rounded-xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    <p className="font-medium text-foreground">
                      Telebirr Merchant C2B
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Merchant Settlement
                    </p>
                  </div>
                  <span className="text-green-500 font-semibold">
                    +ETB 14,800.00
                  </span>
                </div>
                <div className="flex items-center justify-between bg-card rounded-xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    <p className="font-medium text-foreground">
                      CBE Direct RTGS Settlement
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Large Value Transfer
                    </p>
                  </div>
                  <span className="text-green-500 font-semibold">
                    +ETB 120,000.00
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Compliance Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-auto pt-6 border-t border-border"
            >
              <p className="text-sm text-muted-foreground">
                Strict read-only statement ingestion • No banking credentials stored • Ethiopian NBE-compliant standards
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Section - Sign In Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Sign in to PayManager
            </h2>
            <p className="text-muted-foreground mb-8">
              Enter your credentials to access your account
            </p>

            <form className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <label className="block text-sm font-medium text-foreground mb-2">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  defaultValue="dawit.mengistu@selamstore.et"
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-card text-foreground placeholder:text-muted-foreground transition-all"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <label className="block text-sm font-medium text-foreground mb-2">
                  PASSWORD
                </label>
                <input
                  type="password"
                  defaultValue="•••••••••"
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-card text-foreground placeholder:text-muted-foreground transition-all"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center justify-between"
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-border w-4 h-4 accent-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    Keep me signed in on this device (30 days)
                  </span>
                </label>
                <Link
                  href="#"
                  className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-3.5 rounded-xl hover:from-primary/95 hover:to-primary/85 transition-all shadow-lg hover:shadow-xl font-medium"
              >
                Sign In
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-center text-muted-foreground"
              >
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Create an account
                </Link>
              </motion.p>
            </form>

            {/* State Simulator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 pt-6 border-t border-border"
            >
              <p className="text-sm text-muted-foreground mb-3 font-medium">
                STATE SIMULATOR
              </p>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1.5 text-sm bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium">
                  Default
                </button>
                <button className="px-3 py-1.5 text-sm bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium">
                  Email Error
                </button>
                <button className="px-3 py-1.5 text-sm bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium">
                  Pass Error
                </button>
                <button className="px-3 py-1.5 text-sm bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium">
                  Bad Creds
                </button>
                <button className="px-3 py-1.5 text-sm bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium">
                  Loading
                </button>
                <button className="px-3 py-1.5 text-sm bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium">
                  Verified
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
