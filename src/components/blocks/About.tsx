import { profile } from "@/data/profile";

export default function About() {
  return (
    <section
      id="about"
      className="border-t border-neutral-100 dark:border-neutral-900"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 grid gap-16 md:grid-cols-3">
        <div className="md:col-span-2">
          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-8">About</p>
          <p className="text-xl leading-relaxed text-neutral-600 dark:text-neutral-300">
            {profile.summary}
          </p>
        </div>

        <div className="flex flex-col gap-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-400 mb-5">Experience</p>
            <ul className="space-y-4">
              {profile.work.slice(0, 2).map((w) => (
                <li key={`${w.role}-${w.org}`}>
                  <p className="text-sm font-medium">{w.role}</p>
                  <p className="text-sm text-neutral-500">
                    {w.org} &middot;{" "}
                    {w.start.slice(0, 4)}–{w.end === "Current" ? "Now" : w.end.slice(0, 4)}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-400 mb-5">Skills</p>
            <ul className="space-y-1">
              {profile.competencies.map((c) => (
                <li key={c} className="text-sm text-neutral-500 dark:text-neutral-400">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
