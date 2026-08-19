type Block =
  | { kind: "heading"; text: string }
  | { kind: "list"; items: string[]; ordered: boolean }
  | { kind: "para"; text: string };

function parse(md: string): Block[] {
  const blocks: Block[] = [];
  const lines = md.replace(/\r/g, "").split("\n");
  let list: { items: string[]; ordered: boolean } | null = null;
  let para: string[] = [];

  const flush = () => {
    if (list) {
      blocks.push({ kind: "list", ...list });
      list = null;
    }
    if (para.length) {
      blocks.push({ kind: "para", text: para.join(" ") });
      para = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    const heading = line.match(/^#{1,6}\s+(.*)$/);
    if (heading) {
      flush();
      blocks.push({ kind: "heading", text: heading[1] ?? "" });
      continue;
    }
    const bullet = line.match(/^[-*]\s+(.*)$/);
    const ordered = line.match(/^\d+[.)]\s+(.*)$/);
    if (bullet || ordered) {
      if (para.length) {
        blocks.push({ kind: "para", text: para.join(" ") });
        para = [];
      }
      const isOrdered = Boolean(ordered);
      if (!list || list.ordered !== isOrdered) {
        if (list) blocks.push({ kind: "list", ...list });
        list = { items: [], ordered: isOrdered };
      }
      list.items.push(((bullet ? bullet[1] : ordered?.[1]) ?? "").trim());
      continue;
    }
    if (list) {
      blocks.push({ kind: "list", ...list });
      list = null;
    }
    para.push(line);
  }
  flush();
  return blocks;
}

function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={i} className="rounded bg-muted px-1 py-0.5 text-[0.85em]">
              {part.slice(1, -1)}
            </code>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function Markdown({ content }: { content: string }) {
  const blocks = parse(content);
  return (
    <div className="space-y-4 text-[0.95rem] leading-relaxed text-muted-foreground">
      {blocks.map((block, i) => {
        if (block.kind === "heading") {
          return (
            <h3
              key={i}
              className="pt-2 font-display text-sm font-semibold tracking-[0.14em] text-accent uppercase"
            >
              {block.text}
            </h3>
          );
        }
        if (block.kind === "list") {
          const ListTag = block.ordered ? "ol" : "ul";
          return (
            <ListTag key={i} className="space-y-2 pl-1">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-3">
                  <span className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-accent/70" />
                  <span>
                    {block.ordered ? `${j + 1}. ` : ""}
                    <Inline text={item} />
                  </span>
                </li>
              ))}
            </ListTag>
          );
        }
        return (
          <p key={i} className="whitespace-pre-wrap">
            <Inline text={block.text} />
          </p>
        );
      })}
    </div>
  );
}
