"use client";

import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun } from "lucide-react";

interface HeaderProps {
  showAuthButtons?: boolean;
  showHelpLink?: boolean;
  showThemeSwitcher?: boolean;
}

export default function Header({
  showAuthButtons = true,
  showHelpLink = false,
  showThemeSwitcher = false,
}: HeaderProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    // Toggle between dark and light directly for landing page
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <span className="text-primary-foreground font-bold text-lg">P</span>
          </div>
          <span className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            PayManager
          </span>
        </Link>
        {showAuthButtons ? (
          <nav className="flex items-center gap-4">
            {showThemeSwitcher && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="Toggle theme"
                title="Switch between dark and light theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            )}
            <Link
              href="/signin"
              className="text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow-md font-medium"
            >
              Get Started
            </Link>
          </nav>
        ) : (
          <nav className="flex items-center gap-4">
            {showHelpLink && (
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground font-medium transition-colors"
              >
                Need help?
              </Link>
            )}
            {showThemeSwitcher && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="Toggle theme"
                title="Switch between dark and light theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            )}
            <Link
              href="/signin"
              className="text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              Help
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
