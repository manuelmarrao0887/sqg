/* eslint-disable */
/* SQG Portal — Shell (sidebar + topbar + router) */
(function() {

const { Icon: AppI } = window.PortalIcons;
const { ORG: AppORG } = window.PortalData;

const NAV_ITEMS = [
  { id:'overview', icon:'dash',  label:'Resumo' },
  { id:'docs',     icon:'docs',  label:'Documentos', badge:'4' },
  { id:'invoices', icon:'invoice', label:'Faturação' },
  { id:'payments', icon:'pay',   label:'Pagamentos' },
  { id:'calendar', icon:'cal',   label:'Calendário fiscal' },
  { id:'messages', icon:'chat',  label:'Mensagens', badge:'1' },
  { id:'team',     icon:'team',  label:'Equipa SQG' },
  { id:'settings', icon:'settings', label:'Definições' },
];

const PAGE_TITLES = {
  overview: 'Resumo',
  docs:     'Documentos',
  invoices: 'Faturação',
  payments: 'Pagamentos',
  calendar: 'Calendário fiscal',
  messages: 'Mensagens',
  team:     'Equipa SQG',
  settings: 'Definições',
};

const PortalShell = () => {
  const [view, setView] = React.useState(() => {
    const hash = window.location.hash.replace('#', '');
    return NAV_ITEMS.find(n => n.id === hash) ? hash : 'overview';
  });
  const [sideOpen, setSideOpen] = React.useState(false);
  const [bannerOpen, setBannerOpen] = React.useState(true);

  React.useEffect(() => {
    document.body.classList.toggle('side-open', sideOpen);
  }, [sideOpen]);
  React.useEffect(() => {
    document.body.classList.toggle('has-banner', bannerOpen);
  }, [bannerOpen]);

  const go = (id) => {
    setView(id);
    setSideOpen(false);
    window.location.hash = id;
    document.querySelector('.portal-main')?.scrollTo({top:0, behavior:'instant'});
    window.scrollTo({top:0, behavior:'instant'});
  };

  const logout = () => {
    window.location.href = 'login.html';
  };

  const Current = {
    overview: window.OverviewView,
    docs:     window.DocumentsView,
    invoices: window.InvoicesView,
    payments: window.PaymentsView,
    calendar: window.CalendarView,
    messages: window.MessagesView,
    team:     window.TeamView,
    settings: window.SettingsView,
  }[view];

  return (
    <>
      {bannerOpen && (
        <div className="demo-banner">
          <span>
            <b>Modo demonstração</b> · este é um portal fictício para mostrar o produto.
            Os dados não são reais.
          </span>
          <a href="../index.html">← Voltar ao site</a>
          <button onClick={()=>setBannerOpen(false)}>fechar</button>
        </div>
      )}

      <div className="portal-shell">
        <aside className="portal-side">
          <div className="brand" onClick={() => go('overview')} style={{cursor:'pointer'}}>
            <span className="logo-mark" style={{width:32, height:32, borderRadius:8, background:'var(--accent)', color:'var(--accent-2)', display:'grid', placeItems:'center'}}>
              <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none">
                <path d="M27 12 C 24 9, 16 9, 13 12 C 10 15, 12 18, 16 19 L 24 21 C 28 22, 30 25, 27 28 C 24 31, 16 31, 13 28" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
                <circle cx="27" cy="30" r="1.6" fill="currentColor"/>
              </svg>
            </span>
            <div>
              <div className="word">SQG</div>
              <div className="tag">Portal de cliente</div>
            </div>
          </div>

          <div className="org">
            <div className="o-mark">{AppORG.short}</div>
            <div style={{flex:1, minWidth:0}}>
              <div className="o-name">{AppORG.name}</div>
              <div className="o-sub">NIPC {AppORG.nif}</div>
            </div>
            <span className="o-chevron"><AppI name="chevd" size={14}/></span>
          </div>

          <div className="nav-section">Geral</div>
          {NAV_ITEMS.slice(0, 5).map(it => (
            <button key={it.id} className={`nav-item ${view === it.id ? 'active':''}`}
              onClick={() => go(it.id)}>
              <span className="ic"><AppI name={it.icon} size={17}/></span>
              {it.label}
              {it.badge && <span className="badge">{it.badge}</span>}
            </button>
          ))}

          <div className="nav-section">Conta</div>
          {NAV_ITEMS.slice(5).map(it => (
            <button key={it.id} className={`nav-item ${view === it.id ? 'active':''}`}
              onClick={() => go(it.id)}>
              <span className="ic"><AppI name={it.icon} size={17}/></span>
              {it.label}
              {it.badge && <span className="badge">{it.badge}</span>}
            </button>
          ))}

          <div className="help">
            <div className="help-title">Precisa de ajuda?</div>
            <p className="help-sub">A Sofia está disponível em 12h ou menos para qualquer questão.</p>
            <button className="help-btn" onClick={() => go('messages')}>
              <AppI name="chat" size={13}/> Falar com a Sofia
            </button>
          </div>
        </aside>

        <main className="portal-main">
          <div className="portal-topbar">
            <button className="hamburger" onClick={() => setSideOpen(s => !s)}>
              <AppI name="burger" size={18}/>
            </button>
            <div>
              <div className="breadcrumb">{AppORG.name} · {PAGE_TITLES[view]}</div>
            </div>
            <div className="search">
              <AppI name="search" size={14}/>
              <input placeholder="Pesquisar documentos, faturas, mensagens…"/>
              <span className="kbd">⌘K</span>
            </div>
            <button className="icon-btn" title="Notificações">
              <AppI name="bell" size={16}/>
              <span className="notif-dot"/>
            </button>
            <button className="user-chip">
              <span className="av">{AppORG.user.initials}</span>
              <span className="un">{AppORG.user.name}</span>
              <AppI name="chevd" size={12}/>
            </button>
          </div>

          <div className="portal-content">
            {Current ? <Current go={go} logout={logout}/> : <div>View not found</div>}
          </div>
        </main>
      </div>
    </>
  );
};

window.PortalShell = PortalShell;
})();
