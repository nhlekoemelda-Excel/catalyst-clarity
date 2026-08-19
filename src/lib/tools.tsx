import { Mail, Users, ListChecks, Compass, type LucideIcon } from "lucide-react";
import type { ToolId } from "./assistant-prompts";

export type ToolConfig = {
  id: ToolId;
  path: "/email" | "/meetings" | "/tasks" | "/research";
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  label: string;
  placeholder: string;
  cta: string;
  optionLabel: string;
  options: string[];
  outputs: string[];
};

export const TOOLS: ToolConfig[] = [
  {
    id: "email",
    path: "/email",
    name: "Email Assistant",
    tagline: "Rough notes to a sendable email",
    description:
      "Turn a few bullet points into a clear, professional email with a subject line and a shorter alternative.",
    icon: Mail,
    label: "What do you need to say?",
    placeholder:
      "e.g. Tell the client the migration slipped to Friday, apologise, explain the QA issue we found, offer a call Tuesday.",
    cta: "Draft email",
    optionLabel: "Tone",
    options: ["Professional", "Warm", "Direct", "Apologetic", "Persuasive"],
    outputs: ["Subject line", "Full draft", "Short version"],
  },
  {
    id: "meeting",
    path: "/meetings",
    name: "Meeting Assistant",
    tagline: "Notes to decisions and owners",
    description:
      "Paste raw meeting notes or a transcript and get a summary, decisions, action items and open questions.",
    icon: Users,
    label: "Paste your meeting notes or transcript",
    placeholder:
      "e.g. Attendees: Thabo, Lerato, Sam. Discussed Q3 roadmap. Sam raised the billing bug...",
    cta: "Summarise meeting",
    optionLabel: "Detail",
    options: ["Balanced", "Concise", "Detailed"],
    outputs: ["Summary", "Decisions", "Action items", "Open questions"],
  },
  {
    id: "tasks",
    path: "/tasks",
    name: "Task Planner",
    tagline: "A messy list to a realistic day",
    description:
      "Dump everything on your plate and get a prioritised order, time blocks, and what to defer or delegate.",
    icon: ListChecks,
    label: "List everything on your plate",
    placeholder:
      "e.g. Finish board deck, review two PRs, call supplier, prep 1:1 notes, expense claims, fix the onboarding email...",
    cta: "Build my plan",
    optionLabel: "Capacity",
    options: ["Full day", "Half day", "2 focus hours", "Week ahead"],
    outputs: ["Priority order", "Time blocks", "Defer or delegate", "Risks"],
  },
  {
    id: "research",
    path: "/research",
    name: "Research Assistant",
    tagline: "A topic to a decision-ready brief",
    description:
      "Structure any topic into insights, opportunities, risks and next steps — with a list of things to verify.",
    icon: Compass,
    label: "What are you researching?",
    placeholder:
      "e.g. Should we offer a self-service tier for small logistics firms in South Africa? Consider pricing and support load.",
    cta: "Structure research",
    optionLabel: "Depth",
    options: ["Balanced overview", "Quick scan", "Deep dive"],
    outputs: ["Insights", "Opportunities", "Risks", "Next steps"],
  },
];

export function getTool(id: ToolId): ToolConfig {
  return TOOLS.find((t) => t.id === id)!;
}
