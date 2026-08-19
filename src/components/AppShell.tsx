import { Link } from "@tanstack/react-router";
import { Sparkles, ShieldCheck } from "lucide-react";
import { TOOLS } from "@/lib/tools";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <span
              className="flex size-9 items-center justify-center rounded-xl text-accent-foreground"
              style={{ backgroundImage: "var(--gradient-spark)" }}
            >
              <Sparkles className="size-4.5" />
            </span>
            <span className="font-display text-base font-semibold tracking-tight">
              Catalyst<span className="text-accent"> AI</span>
            </span>
          </Link>

          <nav className="ml-auto -mr-1 flex items-center gap-1 overflow-x-auto">
            {TOOLS.map((tool) => (
              <Link
                key={tool.id}
                to={tool.path}
                className="rounded-lg px-2.5 py-1.5 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground" }}
              >
                {tool.name.replace(" Assistant", "").replace("Task Planner", "Tasks")}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="flex items-center gap-2">
            <ShieldCheck className="size-3.5 text-accent" />
            AI drafts are a starting point — always review before you send or commit.
          </p>
          <p>© {new Date().getFullYear()} Catalyst AI</p>
        </div>
      </footer>
    </div>
  );
}
