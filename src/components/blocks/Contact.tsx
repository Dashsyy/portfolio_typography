"use client";
import { profile } from "@/data/profile";
import { normalizeForTelHref } from "@/lib/utils/phone";

export default function Contact() {
  const telHref = `tel:${normalizeForTelHref(profile.phone)}`;

  return (
    <footer
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto max-w-7xl px-6 py-20"
    >
      <h2 id="contact-title" className="sr-only">
        Contact
      </h2>

      <div className="rounded-2xl bg-neutral-100 dark:bg-neutral-900 p-8 md:p-12 ring-1 ring-neutral-200 dark:ring-neutral-800">
        <h3 className="text-3xl md:text-4xl font-bold">
          Have a project in mind?
        </h3>
        <p className="mt-3 text-neutral-600 dark:text-neutral-300">
          I’m {profile.name}, a {profile.title}. Let’s build something readable,
          beautiful, and fast.
        </p>

        <address className="mt-6 grid gap-4 sm:grid-cols-3 not-italic">
          <a
            href={`mailto:${profile.email}`}
            aria-label={`Email ${profile.name}`}
            className="rounded-2xl border border-neutral-300 dark:border-neutral-700 px-6 py-3 text-base font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-800"
          >
            {profile.email}
          </a>
          <a
            href={telHref}
            aria-label={`Call ${profile.name}`}
            className="rounded-2xl border border-neutral-300 dark:border-neutral-700 px-6 py-3 text-base font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-800"
          >
            {profile.phone}
          </a>
          <div className="rounded-2xl border border-neutral-300 dark:border-neutral-700 px-6 py-3 text-base font-semibold text-center">
            {profile.location}
          </div>
        </address>
      </div>

      <p className="mt-8 text-xs text-neutral-500 dark:text-neutral-400">
        © {new Date().getFullYear()} — {profile.name}
      </p>
    </footer>
  );
}
