import type { HTMLAttributes, ReactNode } from "react";

type TerminalWindowProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  children: ReactNode;
};

export default function TerminalWindow({
  title,
  children,
  className = "",
  ...props
}: TerminalWindowProps) {
  return (
    <div
      className={`overflow-hidden rounded border border-phosphor-border bg-phosphor-panel ${className}`}
      {...props}
    >
      <div className="flex items-center gap-2 border-b border-phosphor-border px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-phosphor-border" />
        <span className="h-2 w-2 rounded-full bg-phosphor-border" />
        <span className="h-2 w-2 rounded-full bg-phosphor-border" />
        {title ? (
          <span className="ml-2 font-mono text-xs text-phosphor-dim">{title}</span>
        ) : null}
      </div>
      <div>{children}</div>
    </div>
  );
}
