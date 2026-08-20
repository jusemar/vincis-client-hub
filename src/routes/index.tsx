import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/vincis/AppShell";
import {
  PageHeader,
  SectionTitle,
  StatusPill,
  ProfessionalLine,
  Timeline,
  ActionButton,
} from "@/components/vincis/ui";
import {
  client,
  currency,
  quoteRequests,
  serviceCases,
  serviceStatusLabel,
  serviceStatusTone,
  requestStatusLabel,
  requestStatusTone,
} from "@/lib/vincis-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Visão geral — Área do Cliente Vincis" },
      {
        name: "description",
        content:
          "Central pessoal do cliente Vincis: propostas, negociações e atendimentos em um só lugar.",
      },
      { property: "og:title", content: "Visão geral — Área do Cliente Vincis" },
      {
        property: "og:description",
        content: "Acompanhe propostas, negociações e atendimentos com clareza.",
      },
    ],
  }),
  component: Overview,
});

function Overview() {
  const pendingCounter = quoteRequests
    .flatMap((r) => r.proposals.map((p) => ({ r, p })))
    .find(({ p }) => p.counters.some((c) => c.status === "pendente"));

  const waitingCase = serviceCases.find((c) => c.needsClient);
  const newProposals = quoteRequests.flatMap((r) =>
    r.proposals.filter((p) => p.status === "recebida"),
  );
  const activeCases = serviceCases.filter((c) => c.status !== "concluido");
  const openRequests = quoteRequests.filter(
    (r) => r.status === "aberta" || r.status === "em_negociacao",
  );

  const attention = [
    pendingCounter && {
      key: "counter",
      tone: "gold" as const,
      label: "Aguardando resposta do profissional",
      title: `Contraproposta de ${currency(
        pendingCounter.p.counters.filter((c) => c.status === "pendente")[0]?.amount,
      )} enviada`,
      detail: `${pendingCounter.r.title} · válida até ${pendingCounter.p.validUntil}`,
      to: "/orcamentos/$id",
      params: { id: pendingCounter.r.id },
      cta: "Ver negociação",
    },
    waitingCase && {
      key: "case",
      tone: "warning" as const,
      label: "Aguardando você",
      title: waitingCase.nextStep,
      detail: `${waitingCase.protocol} · ${waitingCase.service}`,
      to: "/atendimentos/$id",
      params: { id: waitingCase.id },
      cta: "Abrir atendimento",
    },
    newProposals.length > 0 && {
      key: "proposals",
      tone: "info" as const,
      label: "Novas propostas",
      title: `${newProposals.length} propostas aguardando sua análise`,
      detail: "Compare valores, prazos e reputação antes de decidir",
      to: "/orcamentos",
      params: undefined,
      cta: "Ver solicitações",
    },
  ].filter(Boolean) as {
    key: string;
    tone: "gold" | "warning" | "info";
    label: string;
    title: string;
    detail: string;
    to: string;
    params?: Record<string, string>;
    cta: string;
  }[];

  const summary = [
    { label: "Solicitações ativas", value: openRequests.length, to: "/orcamentos" },
    { label: "Propostas recebidas", value: quoteRequests.flatMap((r) => r.proposals).length, to: "/orcamentos" },
    { label: "Atendimentos ativos", value: activeCases.length, to: "/atendimentos" },
    { label: "Concluídos", value: serviceCases.filter((c) => c.status === "concluido").length, to: "/atendimentos" },
  ];

  return (
    <AppShell>
      <PageHeader
        eyebrow="Área do cliente"
        title={`Bom te ver, ${client.name.split(" ")[0]}.`}
        description={
          attention.length
            ? "Estes são os pontos que pedem atenção hoje. O restante segue em andamento com os profissionais."
            : "Nada exige sua decisão neste momento. Tudo segue em andamento com os profissionais responsáveis."
        }
      />

      <section className="mt-10" aria-labelledby="atencao">
        <h2 id="atencao" className="sr-only">
          Precisa da sua atenção
        </h2>
        <SectionTitle title="Precisa da sua atenção" hint={`${attention.length} itens`} />
        <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
          {attention.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              params={item.params as never}
              className="flex flex-col gap-3 px-5 py-5 transition-colors hover:bg-surface-muted sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <div className="min-w-0">
                <StatusPill label={item.label} tone={item.tone} />
                <p className="mt-2.5 text-base font-semibold tracking-tight text-foreground">
                  {item.title}
                </p>
                <p className="mt-1 truncate text-sm text-muted-foreground">{item.detail}</p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-foreground">
                {item.cta} <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-4">
          {summary.map((s) => (
            <Link
              key={s.label}
              to={s.to}
              className="bg-surface px-5 py-5 transition-colors hover:bg-surface-muted"
            >
              <dt className="text-xs font-medium text-muted-foreground">{s.label}</dt>
              <dd className="font-display mt-2 text-3xl tabular-nums text-foreground">{s.value}</dd>
            </Link>
          ))}
        </dl>
      </section>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <section>
          <SectionTitle
            title="Atendimentos em curso"
            action={
              <Link to="/atendimentos" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Ver todos
              </Link>
            }
          />
          <ul className="space-y-3">
            {activeCases.map((c) => (
              <li key={c.id}>
                <Link
                  to="/atendimentos/$id"
                  params={{ id: c.id }}
                  className="block rounded-xl border border-border bg-surface p-5 transition-colors hover:border-border-strong"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-semibold tabular-nums text-muted-foreground">
                      {c.protocol}
                    </span>
                    <StatusPill
                      label={serviceStatusLabel[c.status]}
                      tone={serviceStatusTone[c.status]}
                    />
                  </div>
                  <p className="mt-2 text-base font-semibold tracking-tight text-foreground">
                    {c.service}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Próximo passo: {c.nextStep}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <ProfessionalLine id={c.professionalId} size="sm" compact />
                    <div className="hidden w-40 sm:block">
                      <div className="h-1 rounded-full bg-muted">
                        <div
                          className="h-1 rounded-full bg-gold"
                          style={{ width: `${c.progress}%` }}
                        />
                      </div>
                      <p className="mt-1.5 text-right text-xs tabular-nums text-muted-foreground">
                        {c.progress}%
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionTitle title="Atividade recente" />
          <div className="rounded-xl border border-border bg-surface p-6">
            <Timeline
              events={[
                { at: "19/08/2026 · 18:02", title: "Atendimento criado", detail: "#2026-0017 · Auditoria de compliance", tone: "info" },
                { at: "18/08/2026 · 17:31", title: "Documentos solicitados", detail: "#2026-0014 · Juliana Menezes", tone: "warning" },
                { at: "18/08/2026 · 16:12", title: "Contraproposta enviada", detail: "R$ 12.200 · Ana Paula Ribeiro", tone: "gold" },
                { at: "15/08/2026 · 10:05", title: "Proposta recebida", detail: "Carla Ferrer", tone: "info" },
                { at: "12/08/2026 · 09:24", title: "Solicitação publicada", detail: "#SOL-2026-0142", tone: "neutral" },
              ]}
            />
          </div>

          <div className="mt-8 rounded-xl border border-border bg-surface p-6">
            <SectionTitle title="Solicitações abertas" />
            <ul className="space-y-4">
              {openRequests.map((r) => (
                <li key={r.id}>
                  <Link to="/orcamentos/$id" params={{ id: r.id }} className="group block">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-medium text-foreground group-hover:underline">
                        {r.title}
                      </p>
                      <StatusPill
                        label={requestStatusLabel[r.status]}
                        tone={requestStatusTone[r.status]}
                      />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {r.proposals.length} proposta{r.proposals.length === 1 ? "" : "s"} ·{" "}
                      {r.notInterested} não interessado{r.notInterested === 1 ? "" : "s"}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link to="/orcamentos">
                <ActionButton>Ver todas as solicitações</ActionButton>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
