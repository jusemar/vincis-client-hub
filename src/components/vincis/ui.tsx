import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { getProfessional, type Tone, type TimelineEvent } from "@/lib/vincis-data";

const toneClasses: Record<Tone, string> = {
  neutral: "bg-neutral-soft text-foreground ring-border-strong",
  info: "bg-info-soft text-info ring-info/20",
  gold: "bg-gold-soft text-gold-foreground ring-gold/35",
  success: "bg-success-soft text-success ring-success/20",
  warning: "bg-warning-soft text-warning ring-warning/25",
  muted: "bg-muted text-muted-foreground ring-border",
};

const dotClasses: Record<Tone, string> = {
  neutral: "bg-muted-foreground",
  info: "bg-info",
  gold: "bg-gold",
  success: "bg-success",
  warning: "bg-warning",
  muted: "bg-border-strong",
};

export function StatusPill({
  label,
  tone = "neutral",
  className,
}: {
  label: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        toneClasses[tone],
        className,
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", dotClasses[tone])} />
      {label}
    </span>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? <p className="text-eyebrow text-gold-foreground/60">{eyebrow}</p> : null}
        <h1 className="font-display mt-2 text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function SectionTitle({
  title,
  hint,
  action,
}: {
  title: string;
  hint?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-baseline justify-between gap-4">
      <div className="flex items-baseline gap-3">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">{title}</h2>
        {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      </div>
      {action}
    </div>
  );
}

export function Avatar({
  initials,
  size = "md",
}: {
  initials: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "size-8 text-[11px]",
    md: "size-10 text-xs",
    lg: "size-14 text-sm",
  };
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-primary font-semibold tracking-wide text-primary-foreground",
        sizes[size],
      )}
    >
      {initials}
    </span>
  );
}

export function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-foreground">
      <svg viewBox="0 0 20 20" className="size-3.5 fill-gold" aria-hidden>
        <path d="M10 1.6l2.47 5.2 5.53.72-4.06 3.9 1.03 5.62L10 14.4l-4.97 2.64 1.03-5.62L2 7.52l5.53-.72L10 1.6z" />
      </svg>
      {rating.toFixed(1).replace(".", ",")}
    </span>
  );
}

export function ProfessionalLine({
  id,
  size = "md",
  compact = false,
}: {
  id: string;
  size?: "sm" | "md" | "lg";
  compact?: boolean;
}) {
  const p = getProfessional(id);
  if (!p) return null;
  return (
    <div className="flex items-center gap-3">
      <Avatar initials={p.initials} size={size} />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground">{p.name}</p>
        <p className="truncate text-xs text-muted-foreground">
          {compact ? p.specialty : `${p.role} · ${p.specialty}`}
        </p>
        {!compact ? (
          <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <Stars rating={p.rating} />
            <span>({p.reviews} avaliações)</span>
            <span aria-hidden>·</span>
            <span>{p.city}</span>
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="relative space-y-6 border-l border-border pl-6">
      {events.map((e, i) => (
        <li key={i} className="relative">
          <span
            aria-hidden
            className={cn(
              "absolute -left-[1.9rem] top-1.5 size-2.5 rounded-full ring-4 ring-surface",
              dotClasses[e.tone ?? "neutral"],
            )}
          />
          <p className="text-sm font-medium text-foreground">{e.title}</p>
          {e.detail ? <p className="mt-0.5 text-sm text-muted-foreground">{e.detail}</p> : null}
          <time className="mt-1 block text-xs tabular-nums text-muted-foreground/80">{e.at}</time>
        </li>
      ))}
    </ol>
  );
}

export function EmptyState({
  title,
  description,
  hint,
}: {
  title: string;
  description: string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-dashed border-border-strong bg-surface-muted/60 px-8 py-12 text-center">
      <h3 className="font-display text-lg text-foreground">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {hint ? <p className="mt-4 text-xs text-muted-foreground/80">{hint}</p> : null}
    </div>
  );
}

export function Meta({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <dt className="text-eyebrow text-muted-foreground/70">{label}</dt>
      <dd className="mt-1.5 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

export function ActionButton({
  children,
  variant = "ghost",
  className,
}: {
  children: ReactNode;
  variant?: "primary" | "ghost" | "gold";
  className?: string;
}) {
  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90",
    gold: "bg-gold text-gold-foreground hover:brightness-105",
    ghost:
      "border border-border-strong bg-surface text-foreground hover:bg-surface-muted",
  };
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold transition-colors",
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}

export function BackLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      <span aria-hidden>←</span>
      {children}
    </Link>
  );
}
