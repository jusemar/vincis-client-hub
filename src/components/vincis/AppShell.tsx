import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { client } from "@/lib/vincis-data";
import { Avatar } from "./ui";

const nav = [
  { to: "/", label: "Visão geral", exact: true },
  { to: "/orcamentos", label: "Solicitações de orçamento" },
  { to: "/atendimentos", label: "Atendimentos" },
  { to: "/conta", label: "Minha conta" },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="flex size-9 items-center justify-center rounded-xl bg-gold text-base font-bold text-gold-foreground"
      >
        V
      </span>
      <span className="font-display text-lg tracking-tight text-sidebar-foreground">Vincis</span>
    </Link>
  );
}

function NavLinks({ pathname, orientation }: { pathname: string; orientation: "side" | "top" }) {
  return (
    <nav
      aria-label="Navegação da área do cliente"
      className={cn(
        orientation === "side" ? "flex flex-col gap-1" : "flex gap-1 overflow-x-auto",
      )}
    >
      {nav.map((item) => {
        const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
        return (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "rounded-lg px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
            )}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col justify-between bg-sidebar px-5 py-7 lg:flex">
        <div>
          <Logo />
          <div className="mt-10">
            <p className="text-eyebrow mb-3 px-3 text-sidebar-foreground/40">Área do cliente</p>
            <NavLinks pathname={pathname} orientation="side" />
          </div>
        </div>
        <div className="rounded-xl bg-sidebar-accent/70 p-4">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="flex size-9 items-center justify-center rounded-full bg-sidebar-primary text-xs font-semibold text-sidebar-primary-foreground"
            >
              {client.initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-sidebar-foreground">{client.name}</p>
              <p className="truncate text-xs text-sidebar-foreground/60">{client.company}</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between bg-sidebar px-4 py-3">
            <Logo />
            <Avatar initials={client.initials} size="sm" />
          </div>
          <div className="bg-sidebar px-2 pb-2">
            <NavLinks pathname={pathname} orientation="top" />
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
          {children}
        </main>
      </div>
    </div>
  );
}
