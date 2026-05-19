/* eslint-disable */
/* SQG Portal — Icon set (inline SVGs, single style: 1.5px stroke, rounded, 18×18 default) */
(function() {

const Icon = ({ name, size = 18, ...rest }) => {
  const p = {
    width: size, height: size,
    viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 1.5,
    strokeLinecap: 'round', strokeLinejoin: 'round',
    ...rest
  };
  const paths = {
    dash:  <path d="M3 13l9-9 9 9M5 11v9h14v-9"/>,
    docs:  <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></>,
    invoice: <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h4"/></>,
    pay:   <><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 11h18M7 16h3"/></>,
    cal:   <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></>,
    chat:  <path d="M21 12a8 8 0 1 1-3.6-6.7L21 4l-1.2 3.7A8 8 0 0 1 21 12z"/>,
    team:  <><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14c2.8 0 5 2.2 5 5"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M12 1l2 4 4-1-1 4 4 2-4 2 1 4-4-1-2 4-2-4-4 1 1-4-4-2 4-2-1-4 4 1z"/></>,
    bell:  <><path d="M18 16H6c2 0 2-3 2-7a4 4 0 0 1 8 0c0 4 0 7 2 7z"/><path d="M10 20a2 2 0 0 0 4 0"/></>,
    search:<><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></>,
    chev:  <path d="m9 6 6 6-6 6"/>,
    chevd: <path d="m6 9 6 6 6-6"/>,
    arrow: <path d="M5 12h14M13 6l6 6-6 6"/>,
    plus:  <path d="M12 5v14M5 12h14"/>,
    dot3:  <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
    dl:    <><path d="M12 4v12M6 12l6 6 6-6"/><path d="M4 20h16"/></>,
    up:    <><path d="M12 20V8M6 14l6-6 6 6"/><path d="M4 4h16"/></>,
    check: <path d="m5 13 4 4L19 7"/>,
    close: <path d="M6 6l12 12M18 6 6 18"/>,
    eye:   <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></>,
    eyeoff:<><path d="M3 3l18 18"/><path d="M10.6 6.1A10.7 10.7 0 0 1 12 6c6 0 10 6 10 6a18 18 0 0 1-3.2 3.9M6.6 6.6A18 18 0 0 0 2 12s4 6 10 6a10 10 0 0 0 4.1-1"/></>,
    burger:<><path d="M4 7h16M4 12h16M4 17h16"/></>,
    file:  <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></>,
    folder:<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>,
    filter:<path d="M4 4h16l-6 8v6l-4 2v-8z"/>,
    send:  <><path d="m22 2-11 11"/><path d="m22 2-7 20-4-9-9-4z"/></>,
    paper: <><path d="m21 16-5 5H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/><path d="m21 16-5 0 0 5"/></>,
    user:  <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    log:   <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></>,
    save:  <><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></>,
    upload:<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5-5 5 5M12 5v12"/></>,
    bolt:  <path d="M13 2 3 14h7l-1 8 11-14h-7z"/>,
    info:  <><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v5h1"/></>,
  };
  return <svg {...p}>{paths[name]}</svg>;
};

const Spark = ({ data, w = 80, h = 28 }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h * 0.85 - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return (
    <svg className="spark-svg" width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} />
    </svg>
  );
};

const StatusPill = ({ status, children }) => (
  <span className={`p-status ${status}`}>{children}</span>
);

const STATUS_LABELS = {
  ok: 'Em ordem', warn: 'Atenção', pend: 'Pendente', err: 'Erro', info: 'Info',
};
const INV_STATUS_LABELS = {
  ok: 'Paga', warn: 'Em atraso', pend: 'Por receber', err: 'Erro',
};
const OBLIG_STATUS_LABELS = {
  ok: 'Submetido', warn: 'Em revisão', pend: 'Pendente', err: 'Erro',
};
const PAYMENT_STATUS_LABELS = {
  ok: 'Pago', warn: 'Em atraso', pend: 'A vencer', err: 'Erro',
};

window.PortalIcons = { Icon, Spark, StatusPill,
  STATUS_LABELS, INV_STATUS_LABELS, OBLIG_STATUS_LABELS, PAYMENT_STATUS_LABELS };
})();
