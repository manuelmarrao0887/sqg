/* eslint-disable */
/* SQG Portal — Views: Overview + Documents */
(function() {

const { Icon, Spark, StatusPill,
  STATUS_LABELS, INV_STATUS_LABELS, OBLIG_STATUS_LABELS, PAYMENT_STATUS_LABELS } = window.PortalIcons;
const { fmt, fmtNum, fmtDate, fmtDateShort,
  ORG, TEAM_SQG, KPIS, OBLIGATIONS,
  RECENT_DOCS, ALL_DOCS, INVOICES, PAYMENTS,
  CAL_EVENTS_DEC, CHAT_THREADS, CHAT_MSGS, NOTIFICATIONS } = window.PortalData;

/* ============ OVERVIEW ============ */
const OverviewView = ({ go }) => {
  return (
    <>
      <div className="portal-h">
        <div>
          <p className="h-sub">Bom dia, Manuela. Esta é a vista geral de <strong>novembro de 2025</strong>.</p>
          <h2>O essencial, num só sítio.</h2>
        </div>
        <div className="h-actions">
          <button className="p-btn"><Icon name="dl" size={14}/> Exportar relatório</button>
          <button className="p-btn primary" onClick={() => go('messages')}>
            <Icon name="chat" size={14}/> Falar com a Sofia
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="stat-grid">
        {KPIS.map((k, i) => {
          const delta = k.fmt === 'pct' ? (k.value - k.prev).toFixed(1) :
                        Math.round(((k.value - k.prev) / k.prev) * 1000) / 10;
          const dir = (k.value > k.prev) === !k.inverse ? 'up' : 'down';
          const val = k.fmt === 'pct' ? `${k.value.toFixed(1)}${k.unit}` : fmt(k.value);
          return (
            <div className="p-stat" key={i}>
              <div className="l">{k.label}</div>
              <div className="v">{val}</div>
              <div className={`d ${dir}`}>
                <Icon name={dir === 'up' ? 'up' : 'dl'} size={12}/>
                {delta > 0 ? '+' : ''}{delta}{k.fmt === 'pct' ? 'p.p.' : '%'} vs out
              </div>
              <div className="spark"><Spark data={k.spark} w={90} h={32}/></div>
            </div>
          );
        })}
      </div>

      <div className="two-col">
        {/* Obligations */}
        <div className="p-card">
          <div className="p-card-h">
            <span className="p-card-t">Próximas obrigações fiscais</span>
            <a className="p-card-link" onClick={() => go('payments')}>
              Ver todas <Icon name="chev" size={12}/>
            </a>
          </div>
          <div className="p-list">
            {OBLIGATIONS.slice(0, 4).map((o, i) => (
              <div className="p-list-row" key={i} style={{gridTemplateColumns:'auto 1fr auto auto'}}>
                <div className="p-icon">
                  <Icon name={o.type === 'iva' ? 'invoice' : o.type === 'ss' ? 'team' : o.type === 'ies' ? 'docs' : 'file'} size={16}/>
                </div>
                <div>
                  <div className="p-name">{o.title}</div>
                  <div className="p-meta">limite · {fmtDate(o.due)}{o.detail ? ' · ' + o.detail : ''}</div>
                </div>
                <div className="p-val">{o.amount ? fmt(o.amount) : '—'}</div>
                <StatusPill status={o.status}>{OBLIG_STATUS_LABELS[o.status]}</StatusPill>
              </div>
            ))}
          </div>
        </div>

        {/* Account team */}
        <div className="p-card">
          <div className="p-card-h">
            <span className="p-card-t">A sua equipa SQG</span>
            <a className="p-card-link" onClick={() => go('team')}>
              Detalhe <Icon name="chev" size={12}/>
            </a>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:10}}>
            {TEAM_SQG.map((t, i) => (
              <div key={i} style={{display:'flex', gap:12, alignItems:'center', padding:'6px 0'}}>
                <div style={{
                  width:38, height:38, borderRadius:10,
                  background:'var(--accent)', color:'var(--accent-2)',
                  display:'grid', placeItems:'center',
                  fontFamily:'var(--display)', fontWeight:600, fontSize:14, letterSpacing:'-.04em'
                }}>{t.initials}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13.5, fontWeight:500}}>{t.name}</div>
                  <div style={{fontSize:12, color:'var(--fg-muted)', fontFamily:'var(--mono)', letterSpacing:'.04em'}}>{t.role}</div>
                </div>
                <button className="p-btn" onClick={()=>go('messages')}>
                  <Icon name="chat" size={13}/> Mensagem
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="two-col" style={{gridTemplateColumns:'1.4fr 1fr'}}>
        {/* Recent activity */}
        <div className="p-card">
          <div className="p-card-h">
            <span className="p-card-t">Atividade recente</span>
            <div style={{display:'flex', gap:10, alignItems:'center'}}>
              <div className="p-seg">
                <button className="active">Tudo</button>
                <button>Documentos</button>
                <button>Mensagens</button>
              </div>
            </div>
          </div>
          <div className="p-list">
            {[
              { icon:'chat', name:'Sofia respondeu sobre fatura Moinho Central', meta:'há 12 min', val:'', status:null },
              { icon:'file', name:'Balancete · Outubro 2025.pdf disponibilizado', meta:'há 4h · Helena Marques', val:'218 kB', status:'new' },
              { icon:'invoice', name:'Submetida declaração SS · Novembro', meta:'ontem · 17h12', val:fmt(2150), status:'ok' },
              { icon:'pay', name:'Pagamento SS recebido pela AT', meta:'ontem · 18h30', val:fmt(2150), status:'ok' },
              { icon:'file', name:'Folha salarial — Outubro 2025.pdf', meta:'2 nov · Helena Marques', val:'162 kB', status:null },
              { icon:'invoice', name:'Fatura emitida — Hotel Real Lisboa', meta:'3 nov · Manuela Sousa', val:fmt(3680), status:'ok' },
            ].map((row, i) => (
              <div className="p-list-row" key={i} style={{gridTemplateColumns:'auto 1fr auto auto'}}>
                <div className="p-icon"><Icon name={row.icon} size={16}/></div>
                <div>
                  <div className="p-name">{row.name}</div>
                  <div className="p-meta">{row.meta}</div>
                </div>
                <div className="p-val">{row.val}</div>
                {row.status === 'ok' ? <StatusPill status="ok">Confirmado</StatusPill> :
                 row.status === 'new' ? <StatusPill status="info">Novo</StatusPill> :
                 <span/>}
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="p-card">
          <div className="p-card-h">
            <span className="p-card-t">Ações rápidas</span>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
            {[
              { ic:'upload', t:'Enviar documento', s:'Faturas, extratos, contratos…' },
              { ic:'invoice', t:'Pedir fatura', s:'A nós ou a fornecedor' },
              { ic:'cal', t:'Marcar reunião', s:'Com a Sofia · 30 min' },
              { ic:'user', t:'Convidar utilizador', s:'Equipa interna ou ROC' },
            ].map((a, i) => (
              <button key={i} style={{
                display:'flex', flexDirection:'column', alignItems:'start', gap:8,
                padding:'18px 16px', borderRadius:12,
                border:'1px solid var(--border)', background:'var(--bg)',
                cursor:'pointer', textAlign:'left', transition:'all .15s'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor='var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}>
                <Icon name={a.ic} size={18}/>
                <div style={{fontSize:13.5, fontWeight:500, marginTop:'auto'}}>{a.t}</div>
                <div style={{fontSize:11.5, color:'var(--fg-muted)', fontFamily:'var(--mono)', letterSpacing:'.04em'}}>{a.s}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

/* ============ DOCUMENTS ============ */
const DocumentsView = () => {
  const [filter, setFilter] = React.useState('all');
  const [view, setView] = React.useState('grid');
  const [search, setSearch] = React.useState('');

  const tags = ['Tudo', 'Balancete', 'Fiscal', 'Banco', 'RH', 'Compra', 'SS'];
  const tagMap = { Tudo: 'all', Balancete: 'Balancete', Fiscal: 'Fiscal', Banco: 'Banco', RH: 'RH', Compra: 'Compra', SS: 'SS' };

  const filtered = ALL_DOCS.filter(d => {
    if (filter !== 'all' && d.tag !== filter) return false;
    if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <div className="portal-h">
        <div>
          <p className="h-sub"><strong>{ALL_DOCS.length}</strong> documentos · 4 novos esta semana</p>
          <h2>Documentos</h2>
        </div>
        <div className="h-actions">
          <button className="p-btn"><Icon name="folder" size={14}/> Nova pasta</button>
          <button className="p-btn primary"><Icon name="upload" size={14}/> Enviar documentos</button>
        </div>
      </div>

      <div style={{display:'flex', gap:12, alignItems:'center', flexWrap:'wrap'}}>
        <div style={{
          display:'flex', alignItems:'center', gap:8,
          padding:'8px 14px', borderRadius:999,
          border:'1px solid var(--border)', background:'var(--surface)',
          flex:'0 1 360px'
        }}>
          <Icon name="search" size={14}/>
          <input
            value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Procurar documentos…"
            style={{border:0, outline:0, background:'transparent', flex:1, font:'inherit', fontSize:13, color:'var(--fg)'}}
          />
        </div>
        <div className="p-seg" style={{flexWrap:'wrap'}}>
          {tags.map(t => (
            <button key={t} className={filter === tagMap[t] ? 'active' : ''}
              onClick={()=>setFilter(tagMap[t])}>{t}</button>
          ))}
        </div>
        <div style={{marginLeft:'auto', display:'flex', gap:6}}>
          <button className={`p-btn ${view==='grid'?'primary':''}`} onClick={()=>setView('grid')}>Grelha</button>
          <button className={`p-btn ${view==='list'?'primary':''}`} onClick={()=>setView('list')}>Lista</button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="doc-grid">
          {filtered.map((d, i) => (
            <div className="doc-card" key={i}>
              <div className="doc-thumb">
                <span className="doc-ext">{d.ext}</span>
                {d.state === 'new' && (
                  <span className="doc-badge p-status info">Novo</span>
                )}
              </div>
              <div className="doc-info">
                <div className="n">{d.name}</div>
                <div className="m">{d.tag} · {d.size} · {fmtDateShort(d.date)}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-table-card">
          <table className="p-table">
            <thead>
              <tr><th>Nome</th><th>Tipo</th><th>Tamanho</th><th>Data</th><th></th></tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => (
                <tr key={i}>
                  <td style={{display:'flex', alignItems:'center', gap:12}}>
                    <span style={{
                      width:32, height:32, borderRadius:6,
                      background:'var(--cream-2)',
                      display:'grid', placeItems:'center',
                      fontFamily:'var(--mono)', fontSize:10, fontWeight:600,
                      color:'var(--fg-muted)'
                    }}>{d.ext}</span>
                    <span style={{fontWeight:500}}>{d.name}</span>
                  </td>
                  <td><span className="p-chip">{d.tag}</span></td>
                  <td>{d.size}</td>
                  <td>{fmtDate(d.date)}</td>
                  <td style={{textAlign:'right'}}>
                    <button className="p-btn"><Icon name="dl" size={13}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

window.OverviewView = OverviewView;
window.DocumentsView = DocumentsView;
})();
