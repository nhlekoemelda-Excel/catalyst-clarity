import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  Copy,
  Loader2,
  Pencil,
  RefreshCw,
  RotateCcw,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { runAssistant } from "@/lib/assistant.functions";
import { Markdown } from "@/components/Markdown";
import type { FieldConfig, ToolConfig } from "@/lib/tools";

function initialValues(tool: ToolConfig) {
  const values: Record<string, string> = {};
  for (const field of tool.fields) {
    values[field.name] = field.type === "choice" ? (field.options?.[0] ?? "") : "";
  }
  return values;
}

export function ToolWorkspace({ tool }: { tool: ToolConfig }) {
  const [values, setValues] = useState<Record<string, string>>(() => initialValues(tool));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const call = useServerFn(runAssistant);

  const mutation = useMutation({
    mutationFn: (payload: Record<string, string>) =>
      call({ data: { tool: tool.id, values: payload } }),
    onSuccess: (result) => {
      setEditing(false);
      setDraft(result.text);
    },
  });

  const Icon = tool.icon;
  const result = editing ? draft : (draft || mutation.data?.text) ?? "";
  const hasResult = Boolean(mutation.data);

  const setValue = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const validate = () => {
    const next: Record<string, string> = {};
    for (const field of tool.fields) {
      if (!field.required) continue;
      const value = (values[field.name] ?? "").trim();
      if (!value) next[field.name] = `Please add your ${field.label.toLowerCase()}.`;
      else if (field.type === "textarea" && value.length < 10)
        next[field.name] = "Please add a little more detail so Catalyst has something to work with.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const generate = () => {
    if (!validate()) return;
    setDraft("");
    mutation.mutate(values);
  };

  const startOver = () => {
    mutation.reset();
    setValues(initialValues(tool));
    setErrors({});
    setDraft("");
    setEditing(false);
  };

  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const grouped = useMemo(() => tool.fields, [tool]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Dashboard
      </Link>

      <div className="mt-5 flex items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-accent">
          <Icon className="size-5" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">{tool.name}</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{tool.description}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <section className="surface-card p-5 sm:p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            {grouped.map((field) => (
              <Field
                key={field.name}
                field={field}
                value={values[field.name] ?? ""}
                error={errors[field.name]}
                onChange={(v) => setValue(field.name, v)}
              />
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={mutation.isPending}
              onClick={generate}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-card)] transition-opacity disabled:cursor-not-allowed disabled:opacity-45"
              style={{ backgroundImage: "var(--gradient-spark)" }}
            >
              {mutation.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Sparkles className="size-4" />
              )}
              {mutation.isPending ? "Preparing…" : tool.cta}
            </button>
            <button
              type="button"
              onClick={startOver}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw className="size-3.5" /> Start over
            </button>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            Avoid pasting confidential personal data. Output is generated by AI and needs a human
            check.
          </p>
        </section>

        <section className="surface-card min-h-[22rem] p-5 sm:p-6">
          {mutation.isError && (
            <div className="mb-4 flex flex-wrap items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
              <TriangleAlert className="mt-0.5 size-4 shrink-0" />
              <p className="min-w-0 flex-1">
                {(mutation.error as Error).message ||
                  "Something went wrong while generating your result. Please try again."}
              </p>
              <button
                type="button"
                onClick={generate}
                className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/40 px-2.5 py-1.5 text-xs font-semibold"
              >
                <RefreshCw className="size-3.5" /> Retry
              </button>
            </div>
          )}

          {!hasResult && !mutation.isError && (
            <div className="flex h-full flex-col justify-center py-10 text-center">
              <p className="font-display text-sm font-semibold text-foreground">
                {mutation.isPending
                  ? "Catalyst is preparing your result…"
                  : "Your result appears here"}
              </p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                {mutation.isPending ? "This usually takes a few seconds." : tool.emptyState}
              </p>
            </div>
          )}

          {hasResult && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-sm font-semibold">Result</h2>
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide text-secondary-foreground uppercase">
                    <Sparkles className="size-3" /> AI-generated
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <ResultAction
                    onClick={() => setEditing((e) => !e)}
                    icon={editing ? <Check className="size-3.5 text-accent" /> : <Pencil className="size-3.5" />}
                    label={editing ? "Done" : "Edit"}
                  />
                  <ResultAction
                    onClick={copy}
                    icon={copied ? <Check className="size-3.5 text-accent" /> : <Copy className="size-3.5" />}
                    label={copied ? "Copied" : "Copy"}
                  />
                  <ResultAction
                    onClick={generate}
                    icon={<RefreshCw className="size-3.5" />}
                    label="Regenerate"
                  />
                  <ResultAction
                    onClick={startOver}
                    icon={<RotateCcw className="size-3.5" />}
                    label="Start over"
                  />
                </div>
              </div>
              <div className="pt-4">
                {editing ? (
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    rows={20}
                    className="w-full resize-y rounded-xl border border-input bg-background px-3.5 py-3 font-mono text-xs leading-relaxed outline-none focus:ring-2 focus:ring-ring/50"
                  />
                ) : (
                  <Markdown content={result} />
                )}
              </div>
            </>
          )}

          {tool.notice && (
            <p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
              {tool.notice}
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

function ResultAction({
  onClick,
  icon,
  label,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      {icon}
      {label}
    </button>
  );
}

function Field({
  field,
  value,
  error,
  onChange,
}: {
  field: FieldConfig;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const id = `field-${field.name}`;
  const base =
    "mt-2 w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm leading-relaxed outline-none transition-shadow placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-ring/50";
  const border = error ? "border-destructive/60" : "border-input";

  return (
    <div className={field.full || field.type === "textarea" ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="font-display text-sm font-semibold text-foreground">
        {field.label}
        {field.required && <span className="ml-1 text-accent">*</span>}
      </label>

      {field.type === "choice" ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {field.options?.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                value === opt
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-accent/50 hover:text-foreground"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : field.type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          rows={field.rows ?? 6}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} ${border} resize-y`}
        />
      ) : (
        <input
          id={id}
          type={field.type === "date" ? "date" : "text"}
          value={value}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${base} ${border}`}
        />
      )}

      {field.help && !error && <p className="mt-1.5 text-xs text-muted-foreground">{field.help}</p>}
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
