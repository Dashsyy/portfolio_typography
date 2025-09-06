"use client";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-lg border px-3 py-1 text-sm
                 bg-white text-black hover:bg-neutral-200
                 dark:bg-neutral-900 dark:text-white dark:border-neutral-700
                 dark:hover:bg-neutral-800 transition"
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
