"use client";
import ThemeToggle from "./ThemeToggle";

export default function PageHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-sm border-b border-neutral-100 dark:border-neutral-900">
      <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
        <span className="text-sm font-semibold tracking-tight">Sunhour Heng</span>
        <nav className="flex items-center gap-6">
          <a
            href="#work"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            Work
          </a>
          <a
            href="#about"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            Contact
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
