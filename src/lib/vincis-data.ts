// Dados fictícios para a demonstração visual da Área do Cliente Vincis.

export type RequestStatus =
  | "aberta"
  | "em_negociacao"
  | "expirada"
  | "cancelada"
  | "encerrada";

export type ProposalStatus =
  | "recebida"
  | "em_negociacao"
  | "aceita"
  | "recusada"
  | "expirada";

export type ServiceStatus =
  | "novo"
  | "em_andamento"
  | "aguardando_cliente"
  | "concluido";

export type Tone = "neutral" | "info" | "gold" | "success" | "warning" | "muted";

export const requestStatusLabel: Record<RequestStatus, string> = {
  aberta: "Aberta",
  em_negociacao: "Em negociação",
  expirada: "Expirada",
  cancelada: "Cancelada",
  encerrada: "Encerrada",
};

export const requestStatusTone: Record<RequestStatus, Tone> = {
  aberta: "info",
  em_negociacao: "gold",
  expirada: "muted",
  cancelada: "muted",
  encerrada: "success",
};

export const proposalStatusLabel: Record<ProposalStatus, string> = {
  recebida: "Recebida",
  em_negociacao: "Em negociação",
  aceita: "Aceita",
  recusada: "Recusada",
  expirada: "Expirada",
};

export const proposalStatusTone: Record<ProposalStatus, Tone> = {
  recebida: "info",
  em_negociacao: "gold",
  aceita: "success",
  recusada: "muted",
  expirada: "muted",
};

export const serviceStatusLabel: Record<ServiceStatus, string> = {
  novo: "Novo",
  em_andamento: "Em andamento",
  aguardando_cliente: "Aguardando você",
  concluido: "Concluído",
};

export const serviceStatusTone: Record<ServiceStatus, Tone> = {
  novo: "info",
  em_andamento: "gold",
  aguardando_cliente: "warning",
  concluido: "success",
};

export type Professional = {
  id: string;
  name: string;
  initials: string;
  role: string;
  specialty: string;
  city: string;
  rating: number;
  reviews: number;
  since: string;
};

export const professionals: Record<string, Professional> = {
  "ana-ribeiro": {
    id: "ana-ribeiro",
    name: "Ana Paula Ribeiro",
    initials: "AR",
    role: "Contadora · CRC 1SP 284.119",
    specialty: "Planejamento tributário",
    city: "São Paulo · SP",
    rating: 4.9,
    reviews: 128,
    since: "2021",
  },
  "marcos-tavares": {
    id: "marcos-tavares",
    name: "Marcos Tavares",
    initials: "MT",
    role: "Advogado · OAB/RJ 214.556",
    specialty: "Direito societário",
    city: "Rio de Janeiro · RJ",
    rating: 4.7,
    reviews: 86,
    since: "2020",
  },
  "juliana-menezes": {
    id: "juliana-menezes",
    name: "Juliana Menezes",
    initials: "JM",
    role: "Contadora · CRC 1MG 118.402",
    specialty: "Contabilidade societária",
    city: "Belo Horizonte · MG",
    rating: 4.8,
    reviews: 64,
    since: "2022",
  },
  "rafael-siqueira": {
    id: "rafael-siqueira",
    name: "Rafael Siqueira",
    initials: "RS",
    role: "Advogado · OAB/SP 398.221",
    specialty: "Direito trabalhista",
    city: "Campinas · SP",
    rating: 4.6,
    reviews: 41,
    since: "2023",
  },
  "carla-ferrer": {
    id: "carla-ferrer",
    name: "Carla Ferrer",
    initials: "CF",
    role: "Contadora · CRC 1RS 092.774",
    specialty: "Auditoria e compliance",
    city: "Porto Alegre · RS",
    rating: 5.0,
    reviews: 33,
    since: "2024",
  },
};

export type TimelineEvent = {
  at: string;
  title: string;
  detail?: string;
  actor?: string;
  tone?: Tone;
};

export type Counter = {
  id: string;
  origin: "cliente" | "profissional";
  amount?: number;
  message: string;
  at: string;
  status: "pendente" | "aceita" | "recusada";
};

export type Proposal = {
  id: string;
  professionalId: string;
  status: ProposalStatus;
  amount?: number;
  deadline?: string;
  validUntil?: string;
  sentAt: string;
  pitch: string;
  counters: Counter[];
};

export type QuoteRequest = {
  id: string;
  code: string;
  title: string;
  category: string;
  specialties: string[];
  coverage: string;
  description: string;
  budget?: number;
  attachments: { name: string; size: string }[];
  createdAt: string;
  expiresAt?: string;
  status: RequestStatus;
  notInterested: number;
  proposals: Proposal[];
  timeline: TimelineEvent[];
};

export const quoteRequests: QuoteRequest[] = [
  {
    id: "sol-2026-0142",
    code: "#SOL-2026-0142",
    title: "Revisão de planejamento tributário anual",
    category: "Contabilidade",
    specialties: ["Planejamento tributário", "Lucro presumido"],
    coverage: "SP · Nacional",
    description:
      "Empresa de tecnologia com faturamento anual próximo de R$ 4,2 milhões. Buscamos revisão do regime tributário atual, simulação de cenários e recomendação formal para o próximo exercício.",
    budget: 12000,
    attachments: [
      { name: "balancete-2025.pdf", size: "412 KB" },
      { name: "faturamento-12m.xlsx", size: "88 KB" },
    ],
    createdAt: "12/08/2026 · 09:24",
    expiresAt: "26/08/2026 · 23:59",
    status: "em_negociacao",
    notInterested: 1,
    proposals: [
      {
        id: "prop-1",
        professionalId: "ana-ribeiro",
        status: "em_negociacao",
        amount: 13500,
        deadline: "21 dias úteis",
        validUntil: "22/08/2026 às 18:00",
        sentAt: "13/08/2026 · 11:02",
        pitch:
          "Trabalho há 12 anos com empresas de tecnologia em transição de regime. Entrego simulação comparativa entre Simples, Lucro Presumido e Real, com parecer assinado e reunião de apresentação.",
        counters: [
          {
            id: "c1",
            origin: "cliente",
            amount: 11000,
            message: "Consigo aprovar internamente até R$ 11.000 mantendo o mesmo escopo.",
            at: "14/08/2026 · 08:40",
            status: "recusada",
          },
          {
            id: "c2",
            origin: "cliente",
            amount: 12200,
            message:
              "Proposta revisada: R$ 12.200 com pagamento em duas parcelas e reunião de apresentação inclusa.",
            at: "18/08/2026 · 16:12",
            status: "pendente",
          },
        ],
      },
      {
        id: "prop-2",
        professionalId: "juliana-menezes",
        status: "recebida",
        amount: 9800,
        deadline: "30 dias corridos",
        validUntil: "24/08/2026 às 12:00",
        sentAt: "14/08/2026 · 15:47",
        pitch:
          "Atendo empresas de médio porte com foco em conformidade. Proposta inclui diagnóstico completo e plano de transição documentado.",
        counters: [],
      },
      {
        id: "prop-3",
        professionalId: "carla-ferrer",
        status: "recebida",
        pitch:
          "Prefiro alinhar escopo em uma conversa inicial antes de fechar valores. Tenho disponibilidade imediata para começar.",
        sentAt: "15/08/2026 · 10:05",
        validUntil: "25/08/2026 às 18:00",
        counters: [],
      },
    ],
    timeline: [
      { at: "12/08/2026 · 09:24", title: "Solicitação publicada", tone: "neutral" },
      { at: "13/08/2026 · 11:02", title: "Proposta recebida", detail: "Ana Paula Ribeiro", tone: "info" },
      { at: "14/08/2026 · 08:40", title: "Contraproposta enviada", detail: "R$ 11.000", tone: "gold" },
      { at: "15/08/2026 · 09:15", title: "Contraproposta recusada", detail: "Ana Paula Ribeiro", tone: "muted" },
      { at: "18/08/2026 · 16:12", title: "Nova contraproposta enviada", detail: "R$ 12.200 · aguardando resposta", tone: "gold" },
    ],
  },
  {
    id: "sol-2026-0151",
    code: "#SOL-2026-0151",
    title: "Adequação de contratos de prestação de serviços",
    category: "Jurídico",
    specialties: ["Direito societário", "Contratos"],
    coverage: "Nacional",
    description:
      "Precisamos revisar e padronizar cinco modelos de contrato usados com clientes corporativos, incluindo cláusulas de confidencialidade e rescisão.",
    attachments: [{ name: "modelos-contratos.zip", size: "1,2 MB" }],
    createdAt: "17/08/2026 · 14:10",
    expiresAt: "31/08/2026 · 23:59",
    status: "aberta",
    notInterested: 0,
    proposals: [],
    timeline: [{ at: "17/08/2026 · 14:10", title: "Solicitação publicada", tone: "neutral" }],
  },
  {
    id: "sol-2026-0128",
    code: "#SOL-2026-0128",
    title: "Consultoria trabalhista para nova filial",
    category: "Jurídico",
    specialties: ["Direito trabalhista"],
    coverage: "MG",
    description:
      "Abertura de filial com 14 colaboradores. Necessário parecer sobre enquadramento sindical e jornada.",
    budget: 6500,
    attachments: [],
    createdAt: "22/07/2026 · 10:32",
    expiresAt: "05/08/2026 · 23:59",
    status: "expirada",
    notInterested: 3,
    proposals: [
      {
        id: "prop-4",
        professionalId: "rafael-siqueira",
        status: "expirada",
        amount: 7400,
        deadline: "15 dias úteis",
        validUntil: "04/08/2026 às 18:00",
        sentAt: "24/07/2026 · 09:18",
        pitch: "Parecer completo com matriz de riscos e reunião de alinhamento com o RH.",
        counters: [],
      },
    ],
    timeline: [
      { at: "22/07/2026 · 10:32", title: "Solicitação publicada", tone: "neutral" },
      { at: "24/07/2026 · 09:18", title: "Proposta recebida", detail: "Rafael Siqueira", tone: "info" },
      { at: "05/08/2026 · 23:59", title: "Prazo da oportunidade encerrado", detail: "Solicitação expirada sem acordo", tone: "muted" },
    ],
  },
  {
    id: "sol-2026-0097",
    code: "#SOL-2026-0097",
    title: "Abertura de holding patrimonial",
    category: "Jurídico",
    specialties: ["Direito societário", "Planejamento sucessório"],
    coverage: "RJ",
    description: "Estruturação de holding familiar com três imóveis e duas empresas operacionais.",
    budget: 18000,
    attachments: [],
    createdAt: "02/06/2026 · 16:45",
    status: "encerrada",
    notInterested: 2,
    proposals: [
      {
        id: "prop-5",
        professionalId: "marcos-tavares",
        status: "aceita",
        amount: 17500,
        deadline: "45 dias corridos",
        validUntil: "12/06/2026 às 18:00",
        sentAt: "04/06/2026 · 08:55",
        pitch: "Estruturação completa, registro em junta comercial e acompanhamento até a integralização.",
        counters: [
          {
            id: "c3",
            origin: "cliente",
            amount: 17500,
            message: "Aceito o escopo com pagamento em três parcelas.",
            at: "08/06/2026 · 11:20",
            status: "aceita",
          },
        ],
      },
    ],
    timeline: [
      { at: "02/06/2026 · 16:45", title: "Solicitação publicada", tone: "neutral" },
      { at: "04/06/2026 · 08:55", title: "Proposta recebida", detail: "Marcos Tavares", tone: "info" },
      { at: "08/06/2026 · 11:20", title: "Contraproposta aceita", detail: "R$ 17.500", tone: "success" },
      { at: "09/06/2026 · 09:00", title: "Atendimento iniciado", detail: "#2026-0009", tone: "success" },
    ],
  },
];

export type ServiceCase = {
  id: string;
  protocol: string;
  service: string;
  category: string;
  professionalId: string;
  status: ServiceStatus;
  startedAt: string;
  progress: number;
  nextStep: string;
  dueLabel?: string;
  lastUpdate: string;
  needsClient: boolean;
  steps: { label: string; state: "done" | "current" | "todo" }[];
  documents: { name: string; size: string; at: string }[];
  messages: { author: string; at: string; text: string }[];
  timeline: TimelineEvent[];
};

export const serviceCases: ServiceCase[] = [
  {
    id: "2026-0014",
    protocol: "#2026-0014",
    service: "Regularização de obrigações acessórias",
    category: "Contabilidade",
    professionalId: "juliana-menezes",
    status: "aguardando_cliente",
    startedAt: "05/08/2026",
    progress: 60,
    nextStep: "Enviar comprovantes de retenção dos últimos 6 meses",
    dueLabel: "Pendente desde 18/08",
    lastUpdate: "18/08/2026 · 17:31",
    needsClient: true,
    steps: [
      { label: "Diagnóstico inicial", state: "done" },
      { label: "Levantamento de pendências", state: "done" },
      { label: "Documentação do cliente", state: "current" },
      { label: "Retificações", state: "todo" },
      { label: "Encerramento", state: "todo" },
    ],
    documents: [
      { name: "checklist-documentos.pdf", size: "220 KB", at: "18/08/2026" },
      { name: "relatorio-pendencias.pdf", size: "512 KB", at: "12/08/2026" },
    ],
    messages: [
      {
        author: "Juliana Menezes",
        at: "18/08/2026 · 17:31",
        text: "Enviei o checklist com os comprovantes que ainda faltam. Assim que receber, sigo com as retificações.",
      },
    ],
    timeline: [
      { at: "05/08/2026 · 09:10", title: "Atendimento iniciado", tone: "info" },
      { at: "12/08/2026 · 14:02", title: "Documento enviado", detail: "relatorio-pendencias.pdf", tone: "neutral" },
      { at: "18/08/2026 · 17:31", title: "Aguardando você", detail: "Comprovantes de retenção", tone: "warning" },
    ],
  },
  {
    id: "2026-0011",
    protocol: "#2026-0011",
    service: "Revisão de contratos corporativos",
    category: "Jurídico",
    professionalId: "marcos-tavares",
    status: "em_andamento",
    startedAt: "28/07/2026",
    progress: 45,
    nextStep: "Profissional está redigindo as cláusulas revisadas",
    dueLabel: "Entrega prevista 29/08",
    lastUpdate: "19/08/2026 · 10:14",
    needsClient: false,
    steps: [
      { label: "Leitura dos contratos", state: "done" },
      { label: "Matriz de riscos", state: "done" },
      { label: "Redação das cláusulas", state: "current" },
      { label: "Validação final", state: "todo" },
    ],
    documents: [{ name: "matriz-de-riscos.pdf", size: "340 KB", at: "11/08/2026" }],
    messages: [
      {
        author: "Marcos Tavares",
        at: "19/08/2026 · 10:14",
        text: "Concluí a matriz de riscos. Começo hoje a redação das cláusulas de confidencialidade.",
      },
    ],
    timeline: [
      { at: "28/07/2026 · 08:30", title: "Atendimento iniciado", tone: "info" },
      { at: "11/08/2026 · 16:20", title: "Documento enviado", detail: "matriz-de-riscos.pdf", tone: "neutral" },
      { at: "19/08/2026 · 10:14", title: "Atualização do profissional", tone: "neutral" },
    ],
  },
  {
    id: "2026-0017",
    protocol: "#2026-0017",
    service: "Auditoria de compliance fiscal",
    category: "Contabilidade",
    professionalId: "carla-ferrer",
    status: "novo",
    startedAt: "19/08/2026",
    progress: 5,
    nextStep: "Reunião de abertura agendada para 21/08 às 10:00",
    dueLabel: "Reunião em 21/08",
    lastUpdate: "19/08/2026 · 18:02",
    needsClient: false,
    steps: [
      { label: "Reunião de abertura", state: "current" },
      { label: "Coleta de dados", state: "todo" },
      { label: "Análise", state: "todo" },
      { label: "Relatório final", state: "todo" },
    ],
    documents: [],
    messages: [
      {
        author: "Carla Ferrer",
        at: "19/08/2026 · 18:02",
        text: "Atendimento aberto. Confirmo nossa reunião inicial para quinta-feira às 10h.",
      },
    ],
    timeline: [{ at: "19/08/2026 · 18:02", title: "Atendimento criado", tone: "info" }],
  },
  {
    id: "2026-0009",
    protocol: "#2026-0009",
    service: "Abertura de holding patrimonial",
    category: "Jurídico",
    professionalId: "marcos-tavares",
    status: "concluido",
    startedAt: "09/06/2026",
    progress: 100,
    nextStep: "Nada pendente — atendimento encerrado",
    lastUpdate: "31/07/2026 · 15:40",
    needsClient: false,
    steps: [
      { label: "Estruturação", state: "done" },
      { label: "Documentação", state: "done" },
      { label: "Registro na junta", state: "done" },
      { label: "Encerramento", state: "done" },
    ],
    documents: [
      { name: "contrato-social-holding.pdf", size: "780 KB", at: "24/07/2026" },
      { name: "certidao-junta.pdf", size: "190 KB", at: "31/07/2026" },
    ],
    messages: [
      {
        author: "Marcos Tavares",
        at: "31/07/2026 · 15:40",
        text: "Registro concluído e certidão anexada. Foi um prazer trabalhar com vocês.",
      },
    ],
    timeline: [
      { at: "09/06/2026 · 09:00", title: "Atendimento iniciado", tone: "info" },
      { at: "24/07/2026 · 11:12", title: "Documento enviado", detail: "contrato-social-holding.pdf", tone: "neutral" },
      { at: "31/07/2026 · 15:40", title: "Atendimento concluído", tone: "success" },
    ],
  },
];

export const client = {
  name: "Helena Duarte",
  initials: "HD",
  company: "Duarte Tecnologia LTDA",
  email: "helena@duartetec.com.br",
  phone: "+55 11 98812-4410",
  document: "28.114.902/0001-45",
  city: "São Paulo · SP",
  memberSince: "Março de 2024",
};

export function currency(value?: number) {
  if (value === undefined) return undefined;
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  });
}

export function getProfessional(id: string) {
  return professionals[id];
}
