import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ToolWorkspace } from "@/components/ToolWorkspace";
import { getTool } from "@/lib/tools";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Assistant — Catalyst AI" },
      {
        name: "description",
        content:
          "Convert raw meeting notes into a summary, decisions, owned action items and open questions.",
      },
      { property: "og:title", content: "Meeting Assistant — Catalyst AI" },
      {
        property: "og:description",
        content: "From messy meeting notes to decisions and action items in seconds.",
      },
    ],
  }),
  component: () => (
    <AppShell>
      <ToolWorkspace tool={getTool("meeting")} />
    </AppShell>
  ),
});
