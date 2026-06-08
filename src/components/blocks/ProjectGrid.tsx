import { projects, Project } from "@/data/projects";

type Group = { company: string; items: (Project & { idx: number })[] };

function groupByCompany(list: typeof projects): Group[] {
  const map = new Map<string, Project[]>();
  for (const p of list) {
    if (!map.has(p.tag)) map.set(p.tag, []);
    map.get(p.tag)!.push(p);
  }
  let counter = 0;
  return Array.from(map.entries()).map(([company, items]) => ({
    company,
    items: items.map((p) => ({ ...p, idx: ++counter })),
  }));
}

export default function ProjectGrid() {
  const groups = groupByCompany(projects);

  return (
    <section
      id="work"
      className="mx-auto max-w-7xl px-6 py-16 border-t border-neutral-100 dark:border-neutral-900"
    >
      <p className="text-xs uppercase tracking-widest text-neutral-400 mb-12">
        Selected Work
      </p>

      <div className="space-y-14">
        {groups.map(({ company, items }) => (
          <div key={company}>
            {/* Company label + rule */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs uppercase tracking-widest text-neutral-400 shrink-0">
                {company}
              </span>
              <span className="flex-1 h-px bg-neutral-100 dark:bg-neutral-800" />
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* vertical connector line */}
              <div className="absolute left-0 top-2 bottom-2 w-px bg-neutral-200 dark:bg-neutral-800" />

              <ul className="space-y-9">
                {items.map((p) => (
                  <li key={p.title} className="relative pl-7">
                    {/* dot */}
                    <span className="absolute left-[-3px] top-[6px] w-[7px] h-[7px] rounded-full bg-white dark:bg-neutral-950 ring-1 ring-neutral-300 dark:ring-neutral-700" />

                    <div className="flex items-baseline justify-between gap-6">
                      <div className="flex items-baseline gap-4 min-w-0">
                        <span className="text-xs tabular-nums text-neutral-300 dark:text-neutral-700 shrink-0">
                          {String(p.idx).padStart(2, "0")}
                        </span>
                        <span className="text-base font-medium truncate">{p.title}</span>
                        {p.role && (
                          <span className="text-xs text-neutral-400 dark:text-neutral-600 border border-neutral-200 dark:border-neutral-800 rounded px-1.5 py-0.5 leading-none shrink-0">
                            {p.role}
                          </span>
                        )}
                      </div>
                      <span className="text-sm tabular-nums text-neutral-400 shrink-0">
                        {p.period}
                      </span>
                    </div>

                    {p.description && (
                      <p className="mt-1.5 ml-8 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        {p.description}
                      </p>
                    )}

                    <div className="mt-2 ml-8 flex flex-wrap gap-x-2 gap-y-0.5">
                      {p.tech.map((t, i) => (
                        <span key={t} className="text-xs text-neutral-400 dark:text-neutral-600">
                          {t}
                          {i < p.tech.length - 1 && (
                            <span className="ml-2 text-neutral-200 dark:text-neutral-800">/</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
