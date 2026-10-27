import Link from "next/link";

interface HeaderProps {
  showAuthButtons?: boolean;
  showHelpLink?: boolean;
}

export default function Header({
  showAuthButtons = true,
  showHelpLink = false,
}: HeaderProps) {
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
          <nav className="flex items-center gap-6">
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
          <nav className="flex items-center gap-6">
            {showHelpLink && (
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground font-medium transition-colors"
              >
                Need help?
              </Link>
            )}
            <Link
              href="/signin"
              className="text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="#"
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
