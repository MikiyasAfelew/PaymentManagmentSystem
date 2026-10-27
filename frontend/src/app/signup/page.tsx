"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "motion/react";

export default function SignUp() {
  return (
    <div className="min-h-screen bg-background font-sans flex flex-col relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl" />
      </div>

      <Header showAuthButtons={false} />

      <div className="flex-1 flex">
        {/* Left Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary/50 to-background p-12 flex-col">
          <div className="max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            >
              Streamline Your Business Reconciliation
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="space-y-6 mb-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 text-primary">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Automated CSV & Excel Ingestion
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Upload bank statements from CBE, Telebirr, Awash, and more.
                    Automatically parse and categorize transactions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Heuristic Invoice Matching
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Smart algorithms match payments to invoices. Reduce manual reconciliation by hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Multi-tenant Security
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Bank-grade security with 256-bit encryption. Your data is
                    isolated and compliant with NBE standards.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Organization Setup Preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-foreground mb-4">
                Organization Setup Preview
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">
                    Company Name
                  </label>
                  <div className="text-foreground font-semibold">
                    Selam Retail & Wholesale PLC
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">
                    Base Currency
                  </label>
                  <div className="text-foreground font-semibold">
                    ETB (Ethiopian Birr)
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">
                    Assigned Role
                  </label>
                  <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Administrator
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Compliance Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-auto pt-6 border-t border-border"
            >
              <p className="text-sm text-muted-foreground">
                Ethiopian NBE-compliant standards • 256-bit SSL encryption
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Section - Sign Up Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <div className="mb-6">
              <span className="text-sm text-muted-foreground font-medium">
                Step 1 of 2
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-1">
                Create your account
              </h2>
            </div>

            <form className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Dawit Mengistu"
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-card text-foreground placeholder:text-muted-foreground transition-all"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <label className="block text-sm font-medium text-foreground mb-2">
                  Work Email Address
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
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-foreground mb-2">
                  Business / Organization Name
                </label>
                <input
                  type="text"
                  defaultValue="Selam Retail & Wholesale PLC"
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-card text-foreground placeholder:text-muted-foreground transition-all"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-foreground mb-2">
                  Primary Bank / Channels Used
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="px-4 py-3 border-2 border-primary bg-gradient-to-r from-primary/10 to-primary/5 text-primary rounded-xl font-medium transition-all hover:from-primary/20 hover:to-primary/10"
                  >
                    CBE (Commercial Bank)
                  </button>
                  <button
                    type="button"
                    className="px-4 py-3 border-2 border-primary bg-gradient-to-r from-primary/10 to-primary/5 text-primary rounded-xl font-medium transition-all hover:from-primary/20 hover:to-primary/10"
                  >
                    Telebirr Merchant
                  </button>
                  <button
                    type="button"
                    className="px-4 py-3 border border-border text-foreground rounded-xl font-medium hover:border-primary/50 hover:bg-secondary transition-all"
                  >
                    Awash Bank
                  </button>
                  <button
                    type="button"
                    className="px-4 py-3 border border-border text-foreground rounded-xl font-medium hover:border-primary/50 hover:bg-secondary transition-all"
                  >
                    Dashen Bank
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-card text-foreground placeholder:text-muted-foreground transition-all"
                />
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-sm text-green-500">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    At least 8 characters
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-500">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    1 number or symbol
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex items-start gap-2"
              >
                <input
                  type="checkbox"
                  className="mt-1 rounded border-border w-4 h-4 accent-primary"
                />
                <label className="text-sm text-muted-foreground">
                  I agree to PayManager{" "}
                  <Link
                    href="#"
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Terms of Service
                  </Link>
                  ,{" "}
                  <Link
                    href="#"
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  .
                </label>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-3.5 rounded-xl hover:from-primary/95 hover:to-primary/85 transition-all shadow-lg hover:shadow-xl font-medium"
              >
                Create Account & Continue
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-center text-muted-foreground"
              >
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Sign In
                </Link>
              </motion.p>
            </form>

            {/* Security Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                256-Bit SSL Encryption
              </div>
              <div className="flex items-center gap-2">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Data Stored Securely
              </div>
            </motion.div>

            {/* UI Form State Simulator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="mt-8 pt-6 border-t border-border"
            >
              <p className="text-sm text-muted-foreground mb-3 font-medium">
                UI Form State Simulator
              </p>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1.5 text-sm bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium">
                  Default
                </button>
                <button className="px-3 py-1.5 text-sm bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium">
                  Email Taken
                </button>
                <button className="px-3 py-1.5 text-sm bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium">
                  Weak Pass
                </button>
                <button className="px-3 py-1.5 text-sm bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium">
                  Loading
                </button>
                <button className="px-3 py-1.5 text-sm bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium">
                  Success
                </button>
                <button className="px-3 py-1.5 text-sm bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium">
                  Error
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
