import { Mail, Users, ListChecks, Compass, type LucideIcon } from "lucide-react";
import type { ToolId } from "./assistant-prompts";

export type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "textarea" | "date" | "choice";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  help?: string;
  rows?: number;
  full?: boolean;
};

export type ToolConfig = {
  id: ToolId;
  path: "/email" | "/meetings" | "/tasks" | "/research";
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  cta: string;
  fields: FieldConfig[];
  outputs: string[];
  emptyState: string;
  notice?: string;
};

export const TOOLS: ToolConfig[] = [
  {
    id: "email",
    path: "/email",
    name: "Email Assistant",
    tagline: "Rough notes to a sendable email",
    description:
      "Turn a few bullet points into a clear, professional email with a subject line and a suggested call to action.",
    icon: Mail,
    cta: "Draft email",
    fields: [
      {
        name: "recipient",
        label: "Recipient / audience",
        type: "text",
        required: true,
        placeholder: "e.g. Our client's operations manager",
      },
      {
        name: "purpose",
        label: "Purpose of the email",
        type: "text",
        required: true,
        placeholder: "e.g. Explain a delivery delay and propose a new date",
      },
      {
        name: "keyPoints",
        label: "Key points",
        type: "textarea",
        required: true,
        rows: 8,
        full: true,
        placeholder:
          "e.g. Migration slipped to Friday\nQA found a billing issue\nWe can offer a call on Tuesday",
        help: "One point per line. Only what you write here will be used.",
      },
      {
        name: "tone",
        label: "Tone",
        type: "choice",
        required: true,
        options: ["Formal", "Friendly", "Persuasive", "Concise"],
      },
      {
        name: "callToAction",
        label: "Call to action (optional)",
        type: "text",
        placeholder: "e.g. Confirm the new date by Thursday",
      },
    ],
    outputs: ["Subject line", "Professional email", "Suggested call to action"],
    emptyState:
      "You'll get a subject line, a professional email built only from your key points, and a suggested call to action where your input supports one.",
  },
  {
    id: "meeting",
    path: "/meetings",
    name: "Meeting Assistant",
    tagline: "Notes to decisions and owners",
    description:
      "Paste raw meeting notes or a transcript and get an executive summary, decisions, an action-item table and open questions.",
    icon: Users,
    cta: "Summarise meeting",
    fields: [
      {
        name: "title",
        label: "Meeting title",
        type: "text",
        required: true,
        placeholder: "e.g. Q3 roadmap review",
      },
      { name: "date", label: "Date", type: "date", required: true },
      {
        name: "attendees",
        label: "Attendees (optional)",
        type: "text",
        placeholder: "e.g. Thabo, Lerato, Sam",
      },
      {
        name: "detail",
        label: "Detail",
        type: "choice",
        required: true,
        options: ["Concise", "Balanced", "Detailed"],
      },
      {
        name: "notes",
        label: "Meeting notes / transcript",
        type: "textarea",
        required: true,
        rows: 12,
        full: true,
        placeholder:
          "e.g. Sam raised the billing bug. Agreed to pause the rollout until it's fixed...",
      },
    ],
    outputs: ["Executive summary", "Key decisions", "Action items table", "Open questions"],
    emptyState:
      "You'll get an executive summary, the decisions actually recorded in your notes, an action table with owners and deadlines, and any open questions. Anything your notes don't state is marked \u201cNot specified\u201d.",
  },
  {
    id: "tasks",
    path: "/tasks",
    name: "Task Planner",
    tagline: "A messy list to a realistic day",
    description:
      "Dump everything on your plate and get a prioritised plan with time blocks, plus an honest list of what may not fit.",
    icon: ListChecks,
    cta: "Build my plan",
    fields: [
      {
        name: "taskList",
        label: "Task list",
        type: "textarea",
        required: true,
        rows: 10,
        full: true,
        placeholder:
          "e.g. Finish board deck\nReview two PRs\nCall supplier\nPrep 1:1 notes\nExpense claims",
        help: "One task per line.",
      },
      {
        name: "capacity",
        label: "Capacity",
        type: "choice",
        required: true,
        options: ["Full day", "Half day", "2 focus hours", "Week ahead"],
      },
      {
        name: "workingHours",
        label: "Available working hours (optional)",
        type: "text",
        placeholder: "e.g. 08:30–16:00, lunch 12:00–12:45",
      },
      {
        name: "fixedCommitments",
        label: "Fixed commitments (optional)",
        type: "textarea",
        rows: 4,
        placeholder: "e.g. Standup 09:00–09:15\nClient call 14:00–15:00",
      },
      {
        name: "deadlines",
        label: "Deadlines or priorities you already know (optional)",
        type: "textarea",
        rows: 4,
        placeholder: "e.g. Board deck due today 15:00\nExpense claims can wait",
      },
    ],
    outputs: ["Today's plan", "Time blocks", "Priority recommendations", "May not fit"],
    emptyState:
      "You'll get a suggested plan with time blocks, a recommended priority and reason for each task, and a clear list of anything that may not fit your stated capacity.",
  },
  {
    id: "research",
    path: "/research",
    name: "Research Assistant",
    tagline: "A topic to a decision-ready brief",
    description:
      "Structure any topic into insights, opportunities, risks and next steps — with a list of things to verify yourself.",
    icon: Compass,
    cta: "Structure research",
    fields: [
      {
        name: "topic",
        label: "Research question / topic",
        type: "textarea",
        required: true,
        rows: 4,
        full: true,
        placeholder:
          "e.g. Should we offer a self-service tier for small logistics firms in South Africa?",
      },
      {
        name: "purpose",
        label: "Purpose",
        type: "text",
        required: true,
        placeholder: "e.g. Decide whether to fund a pilot next quarter",
      },
      {
        name: "audience",
        label: "Audience",
        type: "text",
        required: true,
        placeholder: "e.g. Executive committee",
      },
      {
        name: "depth",
        label: "Depth",
        type: "choice",
        required: true,
        options: ["Quick Overview", "Detailed", "Strategic"],
      },
      {
        name: "context",
        label: "Context (optional)",
        type: "textarea",
        rows: 5,
        full: true,
        placeholder: "e.g. We already serve enterprise clients; support capacity is limited.",
      },
    ],
    outputs: ["Key insights", "Opportunities", "Risks", "Next steps", "Things to verify"],
    emptyState:
      "You'll get a structured brief: topic overview, key insights, opportunities, risks, recommended next steps and things to verify.",
    notice:
      "Catalyst does not browse the web or consult live sources. This brief is structured reasoning based on your input and general knowledge — verify important information using reliable sources before making professional or high-impact decisions.",
  },
];

export function getTool(id: ToolId): ToolConfig {
  return TOOLS.find((t) => t.id === id)!;
}
