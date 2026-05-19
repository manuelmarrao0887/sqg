/* eslint-disable */
/* SQG Portal — Mock data + helpers */

const fmt = (n, opts = {}) =>
  Number(n || 0).toLocaleString('pt-PT', {
    style: 'currency', currency: 'EUR',
    minimumFractionDigits: opts.dec ?? 0,
    maximumFractionDigits: opts.dec ?? 0,
    ...opts
  });

const fmtNum = (n) =>
  Number(n || 0).toLocaleString('pt-PT');

const fmtDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
};

const fmtDateShort = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' });
};

const ORG = {
  name: 'Padaria do Bairro, Lda.',
  short: 'PB',
  nif: '509 482 720',
  cae: '10711 — Padaria',
  since: 'Cliente SQG desde maio 2014',
  user: {
    name: 'Manuela Sousa',
    role: 'Gerente',
    initials: 'MS',
    email: 'manuela@padariadobairro.pt',
    phone: '+351 962 040 118',
  }
};

const TEAM_SQG = [
  { name: 'Sofia Quintão',   role: 'Sócia · Gestora de conta',  initials: 'SQ', email: 'sofia.quintao@sqg.pt', phone: '+351 210 000 001' },
  { name: 'Helena Marques',  role: 'Senior · Salários / RH',    initials: 'HM', email: 'helena.marques@sqg.pt', phone: '+351 210 000 002' },
  { name: 'Tiago Cordeiro',  role: 'Senior · Fiscalidade',      initials: 'TC', email: 'tiago.cordeiro@sqg.pt', phone: '+351 210 000 003' },
];

const KPIS = [
  { label: 'Vendas · Nov 2025', value: 28450, prev: 25300, fmt: 'eur',
    spark: [21,19,22,23,22,25,24,26,27,28,26,28] },
  { label: 'Margem bruta',     value: 42.3, unit: '%', prev: 40.5, fmt: 'pct',
    spark: [38,39,40,41,40,42,41,42,42,43,42,42] },
  { label: 'Tesouraria',       value: 18650, prev: 14200, fmt: 'eur',
    spark: [12,13,11,14,14,15,16,15,17,18,18,19] },
  { label: 'A pagar (IVA, SS, IRS)', value: 7210, prev: 6840, fmt: 'eur',
    spark: [6,7,6,7,8,7,6,7,7,6,7,7], inverse: true },
];

const OBLIGATIONS = [
  { title: 'IVA — Outubro 2025', due: '2025-12-15', amount: 3820, status: 'warn',  type: 'iva',  detail: 'Em revisão pela equipa SQG' },
  { title: 'Retenções IRS — Trabalhadores', due: '2025-12-20', amount: 1240, status: 'pend',  type: 'irs',  detail: 'A submeter pela SQG' },
  { title: 'Segurança Social — Nov', due: '2025-12-20', amount: 2150, status: 'ok', type: 'ss',   detail: 'Submetido a 18 nov' },
  { title: 'Modelo 30 — pagamentos a não residentes', due: '2025-12-31', amount: null, status: 'pend',  type: 'm30',  detail: 'Aguarda confirmação de operações' },
  { title: 'IES — Exercício 2024', due: '2025-07-15', amount: null, status: 'ok',   type: 'ies',  detail: 'Submetido a 11 jul · Comprovativo disponível' },
];

const RECENT_DOCS = [
  { name: 'Balancete · Outubro 2025.pdf',   size: '218 kB', date: '2025-11-12', tag: 'Balancete',  ext: 'PDF', state: 'new' },
  { name: 'Fatura FT 2025/2841 — Moinho Central.pdf', size: '54 kB', date: '2025-11-11', tag: 'Compra',    ext: 'PDF' },
  { name: 'Conta corrente — Banco BPI.csv', size: '12 kB', date: '2025-11-10', tag: 'Banco',     ext: 'CSV' },
  { name: 'Mapa de férias 2026.xlsx',       size: '38 kB', date: '2025-11-08', tag: 'RH',        ext: 'XLSX' },
  { name: 'Declaração mensal SS — Outubro.pdf', size: '92 kB', date: '2025-11-06', tag: 'SS',  ext: 'PDF' },
  { name: 'Comprovativo IVA — 3T 2025.pdf', size: '74 kB', date: '2025-10-14', tag: 'Fiscal',   ext: 'PDF' },
];

const ALL_DOCS = [
  ...RECENT_DOCS,
  { name: 'Balancete · Setembro 2025.pdf', size: '204 kB', date: '2025-10-13', tag: 'Balancete', ext: 'PDF' },
  { name: 'Fatura FT 2025/2820 — Forno Lda.pdf', size: '48 kB', date: '2025-10-11', tag: 'Compra', ext: 'PDF' },
  { name: 'Folha salarial — Outubro 2025.pdf', size: '162 kB', date: '2025-10-31', tag: 'RH', ext: 'PDF' },
  { name: 'Recibo de vencimento — Manuela Sousa.pdf', size: '38 kB', date: '2025-10-31', tag: 'RH', ext: 'PDF' },
  { name: 'IES exercício 2024 — comprovativo.pdf', size: '124 kB', date: '2025-07-11', tag: 'Fiscal', ext: 'PDF' },
  { name: 'Modelo 22 exercício 2024.pdf', size: '198 kB', date: '2025-05-22', tag: 'Fiscal', ext: 'PDF' },
  { name: 'SAF-T outubro 2025.xml', size: '1.1 MB', date: '2025-11-05', tag: 'Fiscal', ext: 'XML' },
];

const INVOICES = [
  { num: 'FT 2025/A/418', client: 'Restaurante Tasca da Sé',  date: '2025-11-14', due: '2025-12-14', amount: 1240, status: 'ok',   paid: 1240 },
  { num: 'FT 2025/A/417', client: 'Pastelaria Doce Sonho',    date: '2025-11-13', due: '2025-12-13', amount: 480,  status: 'pend', paid: 0 },
  { num: 'FT 2025/A/416', client: 'Café Universal',           date: '2025-11-12', due: '2025-11-26', amount: 2150, status: 'ok',   paid: 2150 },
  { num: 'FT 2025/A/415', client: 'Hotel Real Lisboa',        date: '2025-11-10', due: '2025-12-10', amount: 3680, status: 'ok',   paid: 3680 },
  { num: 'FT 2025/A/414', client: 'Restaurante Casa Brasileira', date: '2025-11-08', due: '2025-12-08', amount: 980,  status: 'warn', paid: 0, overdue: true },
  { num: 'FT 2025/A/413', client: 'Mercearia Bairro Alto',    date: '2025-11-06', due: '2025-12-06', amount: 1820, status: 'ok',   paid: 1820 },
  { num: 'FT 2025/A/412', client: 'Café da Praça',            date: '2025-11-04', due: '2025-12-04', amount: 620,  status: 'pend', paid: 0 },
  { num: 'FT 2025/A/411', client: 'Hotel Alfama View',        date: '2025-11-03', due: '2025-12-03', amount: 4100, status: 'ok',   paid: 4100 },
  { num: 'FT 2025/A/410', client: 'Pastelaria Doce Sonho',    date: '2025-10-30', due: '2025-11-29', amount: 740,  status: 'warn', paid: 0, overdue: true },
];

const PAYMENTS = [
  { date: '2025-11-18', what: 'Segurança Social — outubro',   ref: 'SS 2025/10',   amount: 2150, status: 'ok' },
  { date: '2025-11-15', what: 'Salários — colaboradores',     ref: 'PROC 11/2025', amount: 8420, status: 'ok' },
  { date: '2025-11-12', what: 'Fornecedor — Moinho Central',  ref: 'FT 2025/2841', amount: 1480, status: 'ok' },
  { date: '2025-12-15', what: 'IVA — outubro',                ref: 'IVA 2025/10',  amount: 3820, status: 'pend' },
  { date: '2025-12-20', what: 'Retenções IRS — trabalhadores', ref: 'RET 11/2025', amount: 1240, status: 'pend' },
];

const CAL_EVENTS_DEC = {
  10: [{ type: 'irs', label: 'IRS Modelo 10' }],
  15: [{ type: 'iva', label: 'IVA · OUT' }],
  20: [{ type: 'irs', label: 'Ret. IRS · NOV' }, { type: 'ss', label: 'SS · NOV' }],
  25: [{ type: 'iva', label: 'DMR' }],
  31: [{ type: 'ies', label: 'Mod. 30' }],
};

const CHAT_THREADS = [
  { id: 'sofia', name: 'Sofia Quintão',   role: 'Gestora de conta',  initials: 'SQ', preview: 'Vou submeter o IVA na quinta — sem alterações.', time: '14:22', unread: true },
  { id: 'helena', name: 'Helena Marques', role: 'Salários · RH',     initials: 'HM', preview: 'O recibo da Manuela já está no portal.', time: 'ontem', unread: false },
  { id: 'tiago',  name: 'Tiago Cordeiro', role: 'Fiscalidade',       initials: 'TC', preview: 'Preparado o dossier para a inspeção — falamos hoje?', time: '12 nov', unread: false },
  { id: 'sup',    name: 'Suporte SQG',    role: 'Apoio técnico',     initials: 'SS', preview: 'Recebemos o seu pedido sobre integração com PHC.', time: '08 nov', unread: false },
];

const CHAT_MSGS = {
  sofia: [
    { day: '14 nov 2025', msgs: [
      { who: 'them', text: 'Bom dia, Manuela. Os documentos de outubro entraram todos — obrigada.', time: '09:14' },
      { who: 'them', text: 'Tenho uma dúvida sobre uma fatura da Moinho Central: o valor de €1480 inclui IVA?', time: '09:15' },
      { who: 'me',   text: 'Bom dia! Sim, inclui — está na pasta dos PDFs. Vou-lhe enviar uma cópia para confirmar.', time: '09:42' },
    ]},
    { day: 'hoje', msgs: [
      { who: 'them', text: 'Perfeito, já vi. Vou submeter o IVA na quinta — sem alterações de relevo.', time: '14:22' },
    ]},
  ],
  helena: [
    { day: '13 nov 2025', msgs: [
      { who: 'them', text: 'Olá Manuela, o recibo da Manuela já está no portal. Pode descarregar quando quiser.', time: '17:30' },
      { who: 'me',   text: 'Obrigada Helena!', time: '17:45' },
    ]},
  ],
  tiago: [
    { day: '12 nov 2025', msgs: [
      { who: 'them', text: 'Preparei o dossier para a inspeção. Falamos hoje à tarde?', time: '11:02' },
    ]},
  ],
  sup: [
    { day: '08 nov 2025', msgs: [
      { who: 'them', text: 'Recebemos o seu pedido sobre integração com PHC. Voltamos a si com timing.', time: '10:00' },
    ]},
  ],
};

const NOTIFICATIONS = [
  { type: 'info', title: 'Sofia respondeu a "Fatura Moinho"', time: '14:22' },
  { type: 'warn', title: 'IVA — Outubro precisa de revisão sua', time: 'ontem' },
  { type: 'ok',   title: 'Recibo de Manuela disponível', time: 'ontem' },
];

window.PortalData = {
  fmt, fmtNum, fmtDate, fmtDateShort,
  ORG, TEAM_SQG, KPIS, OBLIGATIONS,
  RECENT_DOCS, ALL_DOCS, INVOICES, PAYMENTS,
  CAL_EVENTS_DEC, CHAT_THREADS, CHAT_MSGS, NOTIFICATIONS,
};
