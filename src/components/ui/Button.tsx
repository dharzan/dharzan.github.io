import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary:
    "border-phosphor bg-phosphor text-phosphor-950 hover:bg-phosphor-bright hover:border-phosphor-bright",
  secondary:
    "border-phosphor-border text-phosphor hover:border-phosphor hover:text-phosphor-bright",
  ghost: "border-transparent text-phosphor-dim hover:text-phosphor",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const classes = `inline-flex min-h-10 items-center justify-center rounded border px-4 font-mono text-xs tracking-wide transition ${variants[variant]} ${className}`;

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} className={classes} target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  );
}
