type Block =
  | { kind: "heading"; text: string }
  | { kind: "list"; items: string[]; ordered: boolean }
  | { kind: "table"; head: string[]; rows: string[][] }
  | { kind: "para"; text: string };

const isTableRow = (line: string) => line.startsWith("|") && line.includes("|", 1);
const isDivider = (line: string) => /^\|[\s:|-]+\|$/.test(line);
const cells = (line: string) =>
  line
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());

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

  for (let i = 0; i < lines.length; i++) {
    const line = (lines[i] ?? "").trim();
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
    if (isTableRow(line) && isDivider((lines[i + 1] ?? "").trim())) {
      flush();
      const head = cells(line);
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && isTableRow((lines[i] ?? "").trim())) {
        rows.push(cells((lines[i] ?? "").trim()));
        i++;
      }
      i--;
      blocks.push({ kind: "table", head, rows });
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
        if (block.kind === "table") {
          return (
            <div key={i} className="-mx-1 overflow-x-auto">
              <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {block.head.map((cell, j) => (
                      <th
                        key={j}
                        className="px-2.5 py-2 text-xs font-semibold tracking-[0.08em] text-foreground uppercase"
                      >
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, j) => (
                    <tr key={j} className="border-b border-border/60 align-top last:border-0">
                      {row.map((cell, k) => (
                        <td key={k} className="px-2.5 py-2">
                          <Inline text={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
