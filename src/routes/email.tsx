import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ToolWorkspace } from "@/components/ToolWorkspace";
import { getTool } from "@/lib/tools";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Email Assistant — Catalyst AI" },
      {
        name: "description",
        content:
          "Turn rough notes into a professional, ready-to-send email with a subject line and a shorter alternative.",
      },
      { property: "og:title", content: "Email Assistant — Catalyst AI" },
      {
        property: "og:description",
        content: "Draft clear, professional emails from a few bullet points.",
      },
    ],
  }),
  component: () => (
    <AppShell>
      <ToolWorkspace tool={getTool("email")} />
    </AppShell>
  ),
});
