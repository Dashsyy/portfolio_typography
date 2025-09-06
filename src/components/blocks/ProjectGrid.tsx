"use client";
import { projects } from "@/data/projects";
import HoverSkew from "@/components/motion/HoverSkew";
export default function ProjectGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl uppercase tracking-widest text-neutral-400">Selected Work</h3>
        <span className="text-neutral-500">2019—2025</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, idx) => (
         <article
  key={idx}
  className="typo-card group rounded-2xl bg-neutral-100 p-6 ring-1 ring-neutral-200 hover:ring-neutral-400 transition-shadow dark:bg-neutral-900 dark:ring-neutral-800 dark:hover:ring-neutral-700"
>
  <div className="aspect-[4/3] mb-4 flex items-center justify-center rounded-xl bg-neutral-200 text-7xl md:text-8xl font-black select-none overflow-hidden dark:bg-neutral-800">
    <HoverSkew>{p.cover}</HoverSkew>
  </div>
  <div className="flex items-center justify-between">
    <div>
      <h4 className="text-lg font-semibold">{p.title}</h4>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">{p.tag}</p>
    </div>
    <span className="text-sm text-neutral-500">{p.year}</span>
  </div>
</article>

        ))}
      </div>
    </section>
  );
}
