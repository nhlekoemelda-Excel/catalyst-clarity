import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ToolWorkspace } from "@/components/ToolWorkspace";
import { getTool } from "@/lib/tools";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research Assistant — Catalyst AI" },
      {
        name: "description",
        content:
          "Structure any research topic into insights, opportunities, risks, next steps and things to verify.",
      },
      { property: "og:title", content: "Research Assistant — Catalyst AI" },
      {
        property: "og:description",
        content: "Turn an open question into a decision-ready research brief.",
      },
    ],
  }),
  component: () => (
    <AppShell>
      <ToolWorkspace tool={getTool("research")} />
    </AppShell>
  ),
});
