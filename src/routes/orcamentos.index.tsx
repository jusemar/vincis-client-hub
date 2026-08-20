import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/vincis/AppShell";
import { PageHeader, StatusPill, EmptyState } from "@/components/vincis/ui";
import {
  currency,
  quoteRequests,
  requestStatusLabel,
  requestStatusTone,
} from "@/lib/vincis-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/orcamentos/")({
  head: () => ({
    meta: [
      { title: "Solicitações de orçamento — Vincis" },
      {
        name: "description",
        content:
          "Acompanhe suas solicitações de orçamento, propostas recebidas e negociações em andamento.",
      },
      { property: "og:title", content: "Solicitações de orçamento — Vincis" },
      {
        property: "og:description",
        content: "Propostas, negociações e histórico das suas solicitações.",
      },
    ],
  }),
  component: RequestsList,
});

const filters = [
  { id: "todas", label: "Todas" },
  { id: "abertas", label: "Abertas" },
  { id: "negociacao", label: "Em negociação" },
  { id: "encerradas", label: "Encerradas" },
] as const;

function RequestsList() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("todas");
  const [query, setQuery] = useState("");

  const items = useMemo(
    () =>
      quoteRequests.filter((r) => {
        const byFilter =
          filter === "todas" ||
          (filter === "abertas" && r.status === "aberta") ||
          (filter === "negociacao" && r.status === "em_negociacao") ||
          (filter === "encerradas" &&
            ["encerrada", "expirada", "cancelada"].includes(r.status));
        const byQuery =
          query.trim() === "" ||
          `${r.title} ${r.category} ${r.code}`.toLowerCase().includes(query.toLowerCase());
        return byFilter && byQuery;
      }),
    [filter, query],
  );

  return (
    <AppShell>
      <PageHeader
        eyebrow="Orçamentos"
        title="Solicitações de orçamento"
        description="Tudo o que você publicou na Vincis. Novas solicitações são criadas na área pública da plataforma; aqui você acompanha respostas e negocia."
      />

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" aria-label="Filtrar por situação" className="flex flex-wrap gap-1">
          {filters.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                filter === f.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <label className="relative sm:w-72">
          <span className="sr-only">Buscar solicitação</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por serviço ou protocolo"
            className="h-10 w-full rounded-lg border border-border bg-surface px-3.5 text-sm text-foreground placeholder:text-muted-foreground/70"
          />
        </label>
      </div>

      <div className="mt-6 space-y-3">
        {items.length === 0 ? (
          <EmptyState
            title="Nenhuma solicitação encontrada"
            description="Ajuste os filtros ou revise o termo buscado. Suas solicitações publicadas aparecem aqui com propostas e negociações."
          />
        ) : (
          items.map((r) => {
            const pending = r.proposals.some((p) =>
              p.counters.some((c) => c.status === "pendente"),
            );
            return (
              <Link
                key={r.id}
                to="/orcamentos/$id"
                params={{ id: r.id }}
                className="block rounded-xl border border-border bg-surface p-5 transition-colors hover:border-border-strong sm:p-6"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-semibold tabular-nums text-muted-foreground">
                    {r.code}
                  </span>
                  <StatusPill
                    label={requestStatusLabel[r.status]}
                    tone={requestStatusTone[r.status]}
                  />
                  {pending ? <StatusPill label="Contraproposta pendente" tone="gold" /> : null}
                </div>

                <h3 className="mt-2.5 text-lg font-semibold tracking-tight text-foreground">
                  {r.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {r.description}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{r.category}</span>
                  <span>{r.specialties.join(" · ")}</span>
                  <span>Abrangência {r.coverage}</span>
                  {r.budget ? <span>Investimento previsto {currency(r.budget)}</span> : null}
                  <span>Publicada em {r.createdAt}</span>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">
                      {r.proposals.length} proposta{r.proposals.length === 1 ? "" : "s"}
                    </span>
                    <span className="text-muted-foreground">
                      {" · "}
                      {r.notInterested} não interessado{r.notInterested === 1 ? "" : "s"}
                    </span>
                  </p>
                  {r.expiresAt && r.status !== "expirada" ? (
                    <p className="text-xs text-muted-foreground">
                      Oportunidade aberta até {r.expiresAt}
                    </p>
                  ) : null}
                </div>
              </Link>
            );
          })
        )}
      </div>
    </AppShell>
  );
}
