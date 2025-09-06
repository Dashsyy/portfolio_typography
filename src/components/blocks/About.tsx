"use client";
import KineticParagraph from "@/components/motion/KineticParagraph";
import { profile } from "@/data/profile";
import EditorialParagraph from "../motion/EditorialParagraph";
import ScrambleText from "../motion/ScrambleText";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="bg-neutral-50 dark:bg-neutral-900/50"
    >
      <div className="mx-auto max-w-7xl px-6 py-20">
        <h2 id="about-title" className="sr-only">About</h2>

        {/* <KineticParagraph>{profile.summary}</KineticParagraph> */}
        {/* <EditorialParagraph>{profile.summary}</EditorialParagraph> */}
        <ScrambleText
          text={profile.summary}
          trigger="visible"
          duration={1200}
          mode="sequential"
        />

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {/* Competencies */}
          <div>
            <h3 className="text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              Competencies
            </h3>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-700 dark:text-neutral-300">
              {profile.competencies.map((c) => (
                <li key={c} className="text-sm leading-6">• {c}</li>
              ))}
            </ul>
          </div>

          {/* Experience (top 2) */}
          <div>
            <h3 className="text-sm uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              Experience
            </h3>
            <ul className="mt-4 space-y-4 text-neutral-700 dark:text-neutral-300">
              {profile.work.slice(0, 2).map((w) => (
                <li key={`${w.role}-${w.org}`} className="text-sm leading-6">
                  <span className="font-medium">{w.role}</span> — {w.org}{" "}
                  (<time dateTime={w.start}>{w.start}</time> –{" "}
                  <time dateTime={w.end === "Current" ? "" : w.end}>
                    {w.end}
                  </time>)
                  {w.location ? <span className="text-neutral-500 dark:text-neutral-400"> · {w.location}</span> : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
