import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ToolWorkspace } from "@/components/ToolWorkspace";
import { getTool } from "@/lib/tools";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "Task Planner — Catalyst AI" },
      {
        name: "description",
        content:
          "Turn a messy task list into a prioritised order, realistic time blocks and a clear defer-or-delegate list.",
      },
      { property: "og:title", content: "Task Planner — Catalyst AI" },
      {
        property: "og:description",
        content: "Prioritise your workload and build a plan that fits the time you actually have.",
      },
    ],
  }),
  component: () => (
    <AppShell>
      <ToolWorkspace tool={getTool("tasks")} />
    </AppShell>
  ),
});
