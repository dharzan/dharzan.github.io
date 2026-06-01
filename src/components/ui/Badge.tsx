import type { ReactNode } from "react";

type BadgeTone = "neutral" | "success" | "warning" | "danger" | "info";

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
};

const tones: Record<BadgeTone, string> = {
  neutral: "border-phosphor-border text-phosphor-dim",
  success: "border-phosphor text-phosphor",
  warning: "border-phosphor-dim text-phosphor",
  danger: "border-phosphor-border text-phosphor-dim",
  info: "border-phosphor-border text-phosphor-dim",
};

export default function Badge({
  children,
  tone = "neutral",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 font-mono text-xs ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
