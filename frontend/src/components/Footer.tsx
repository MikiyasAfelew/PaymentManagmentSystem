import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <span className="text-muted-foreground">
          © 2026 PayManager. All rights reserved.
        </span>
        <div className="flex gap-6 text-muted-foreground">
          <Link
            href="#"
            className="hover:text-foreground transition-colors font-medium"
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="hover:text-foreground transition-colors font-medium"
          >
            Terms
          </Link>
          <Link
            href="#"
            className="hover:text-foreground transition-colors font-medium"
          >
            Security
          </Link>
        </div>
      </div>
    </footer>
  );
}
