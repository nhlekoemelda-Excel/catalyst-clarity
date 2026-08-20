# Catalyst AI

**Live Application:** [https://catalyst-action-ai.lovable.app](https://catalyst-action-ai.lovable.app)

---

## Project Overview

Catalyst AI is a responsive, AI-powered workplace productivity platform that helps professionals turn workplace overwhelm into clear, confident action. The application provides four focused assistants — Email, Meeting, Task Planning, and Research — each designed to take scattered input and produce structured, immediately useful output.

The platform is built as a modern web application using **Lovable** for AI-assisted development and **GitHub** for version control and collaboration.

---

## Problem Statement

Modern professionals are overwhelmed by fragmented communication, unstructured meeting notes, competing priorities, and incomplete research. Existing tools often require users to format input manually, switch contexts between apps, or spend time polishing raw thoughts into usable deliverables. There is a need for a single, intuitive workspace that converts workplace chaos into structured, reviewable action with minimal friction.

---

## Solution

Catalyst AI addresses this by providing a unified set of AI assistants that accept natural, rough input and return polished, structured results. Each assistant is tailored to a specific workplace task, with guided forms, responsible-AI guardrails, and one-click actions to edit, copy, regenerate, or start over. Users remain in control at every step: outputs are reviewable and editable, and the system is explicitly designed not to invent unsupported facts.

---

## Key Features

### 1. Email Assistant
Transforms rough notes into a professional, sendable email.
- **Inputs:** Recipient / audience, purpose, key points, tone, optional call to action.
- **Output:** Subject line, professional email body, and suggested call to action.

### 2. Meeting Assistant
Converts raw meeting notes or transcripts into a structured record.
- **Inputs:** Meeting title, date, attendees, detail level, and notes / transcript.
- **Output:** Executive summary, key decisions, action-items table (`| Action | Owner | Deadline |`), and open questions.

### 3. Task Planner
Turns a messy task list into a realistic daily plan.
- **Inputs:** Task list, capacity, available working hours, fixed commitments, and known deadlines / priorities.
- **Output:** Today's plan table (`| Task | Time block | Priority | Why |`), tasks that may not fit, and any missing information.

### 4. Research Assistant
Structures any topic into a decision-ready brief.
- **Inputs:** Research question / topic, purpose, audience, depth, and optional context.
- **Output:** Topic overview, key insights, opportunities, risks / considerations, recommended next steps, and things to verify.

### Common Features
- **Edit:** Manually refine any AI-generated result before using it.
- **Copy:** Copy the final output to the clipboard.
- **Regenerate:** Re-run the assistant with the same inputs to get a fresh version.
- **Start Over:** Clear the form and result to begin a new session.
- **Validation:** Required fields are validated before submission.

---

## Responsible AI / Human-in-the-Loop Approach

Catalyst AI is designed to assist human judgment, not replace it. The following principles are embedded in the application:

- **Reviewable outputs:** Every AI result is displayed in the workspace where the user can read, edit, and refine it before use.
- **No unsupported inventions:** The assistants are instructed to use only the information the user provides. Missing details are marked as "Not specified" rather than invented.
- **User responsibility:** Users remain responsible for final decisions, professional commitments, and any actions taken based on generated content.
- **Transparent limitations:** The Research Assistant explicitly does not browse the web or consult live sources; it structures user input and general knowledge, and flags claims that should be verified independently.

---

## Tools Used

- **[Lovable](https://lovable.dev):** AI-assisted full-stack development environment used to design, build, and deploy the application.
- **[GitHub](https://github.com):** Source control, collaboration, and repository hosting for the project.

### Core Technologies
- TanStack Start
- React 19
- TypeScript
- Tailwind CSS

---

## How the Application Works

1. A user selects one of the four assistants from the dashboard or navigation.
2. The assistant presents a focused input form based on the tool's specific requirements.
3. The user fills in the required fields and submits the form.
4. The input is sent to a server function that builds a structured prompt and calls an AI model via the Lovable AI Gateway.
5. The generated result is streamed back and rendered as formatted markdown, including tables where applicable.
6. The user can edit, copy, regenerate, or start over before using the output.

---

## Setup / Development Instructions

### Prerequisites
- Node.js (LTS recommended)
- npm or a compatible package manager

### Local Setup

```sh
# 1. Clone the repository
git clone <this-repository-url>
cd <repository-name>

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The application will be available at the local URL shown in your terminal (typically `http://localhost:8080`).

### Build for Production

```sh
npm run build
```

---

## Live Application URL

The published version of Catalyst AI is available at:

**[https://catalyst-action-ai.lovable.app](https://catalyst-action-ai.lovable.app)**

---

## Project Repository

The source code is maintained in the connected GitHub repository. Please refer to the repository linked in the Lovable project settings or your GitHub account for the latest commits, branches, and collaboration history.
