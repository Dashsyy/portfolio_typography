import { profile } from "@/data/profile";
import { normalizeForTelHref } from "@/lib/utils/phone";

export default function Contact() {
  const telHref = `tel:${normalizeForTelHref(profile.phone)}`;

  return (
    <footer
      id="contact"
      className="border-t border-neutral-100 dark:border-neutral-900"
    >
      <div className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-xs uppercase tracking-widest text-neutral-400 mb-8">Contact</p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Let&apos;s build something together.
        </h2>
        <p className="text-base text-neutral-500 dark:text-neutral-400 mb-12">
          Open to backend engineering, systems architecture, and telecom or fintech projects.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <a
            href={`mailto:${profile.email}`}
            aria-label={`Email ${profile.name}`}
            className="text-sm font-medium text-neutral-600 dark:text-neutral-300 underline underline-offset-4 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            {profile.email}
          </a>
          <a
            href={telHref}
            aria-label={`Call ${profile.name}`}
            className="text-sm font-medium text-neutral-600 dark:text-neutral-300 underline underline-offset-4 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            {profile.phone}
          </a>
        </div>

        <p className="mt-20 text-xs text-neutral-400">
          &copy; {new Date().getFullYear()} {profile.name} &middot; {profile.location}
        </p>
      </div>
    </footer>
  );
}
