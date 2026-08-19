import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Sparkles, Gauge, Layers } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { TOOLS } from "@/lib/tools";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Catalyst AI — Turn workplace overwhelm into clear action" },
      {
        name: "description",
        content:
          "Catalyst AI gives professionals four focused assistants: email drafting, meeting summaries, task planning and research briefs.",
      },
      { property: "og:title", content: "Catalyst AI — Workplace productivity assistants" },
      {
        property: "og:description",
        content:
          "Draft emails, summarise meetings, prioritise tasks and structure research in one clean workspace.",
      },
    ],
  }),
  component: Dashboard,
});

const STATS = [
  { icon: Layers, label: "Four focused tools", value: "One workspace" },
  { icon: Gauge, label: "From notes to output", value: "Under a minute" },
  { icon: ShieldCheck, label: "Human-in-the-loop", value: "Always reviewable" },
];

function Dashboard() {
  return (
    <AppShell>
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-2 sm:px-6 sm:pt-16">
        <div className="ink-panel relative overflow-hidden rounded-3xl px-6 py-10 shadow-[var(--shadow-lift)] sm:px-10 sm:py-14">
          <div
            className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full opacity-25 blur-3xl"
            style={{ backgroundImage: "var(--gradient-spark)" }}
          />
          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs font-medium tracking-wide">
              <Sparkles className="size-3.5" /> AI-powered workplace assistants
            </span>
            <h1 className="mt-5 text-3xl leading-tight font-semibold sm:text-5xl">
              Turn workplace overwhelm into clear, confident action.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed opacity-80 sm:text-base">
              Catalyst AI takes the messy input of a working day — half-written emails, scattered
              meeting notes, a runaway task list, an unframed research question — and gives you back
              something you can actually act on.
            </p>
            <Link
              to="/email"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white/95 px-5 py-3 text-sm font-semibold text-[oklch(0.24_0.04_252)] transition-transform hover:-translate-y-0.5"
            >
              Start with an email draft <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="relative mt-10 grid gap-4 border-t border-white/12 pt-8 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <stat.icon className="size-4 shrink-0 opacity-70" />
                <div>
                  <p className="text-sm font-semibold">{stat.value}</p>
                  <p className="text-xs opacity-65">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-xl font-semibold sm:text-2xl">Your toolkit</h2>
          <p className="text-sm text-muted-foreground">Pick the task you're stuck on.</p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {TOOLS.map((tool) => (
            <Link
              key={tool.id}
              to={tool.path}
              className="surface-card group flex flex-col p-5 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] sm:p-6"
            >
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <tool.icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-base font-semibold">{tool.name}</h3>
                  <p className="text-xs text-accent">{tool.tagline}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {tool.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {tool.outputs.map((out) => (
                  <span
                    key={out}
                    className="rounded-full bg-secondary px-2.5 py-1 text-[0.7rem] font-medium text-secondary-foreground"
                  >
                    {out}
                  </span>
                ))}
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                Open tool
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="surface-card grid gap-6 p-6 sm:grid-cols-3 sm:p-8">
          <div className="sm:col-span-1">
            <h2 className="text-lg font-semibold">Responsible by design</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Catalyst AI assists your judgement — it never replaces it.
            </p>
          </div>
          <ul className="grid gap-4 text-sm text-muted-foreground sm:col-span-2 sm:grid-cols-2">
            {[
              "Nothing is sent, scheduled or committed on your behalf.",
              "Missing details are flagged for confirmation, not invented.",
              "Every output is editable and copyable before you use it.",
              "Keep confidential personal data out of your inputs.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </AppShell>
  );
}
