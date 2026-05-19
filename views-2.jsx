/* eslint-disable */
/* SQG Portal — Views: Invoices, Payments, Calendar */
(function() {

const { Icon: I2, StatusPill: SP2,
  INV_STATUS_LABELS: INV_L, PAYMENT_STATUS_LABELS: PAY_L, OBLIG_STATUS_LABELS: OBL_L } = window.PortalIcons;
const { fmt: f, fmtDate: fd, fmtDateShort: fds,
  INVOICES: INVS, PAYMENTS: PAYS, OBLIGATIONS: OBLS, CAL_EVENTS_DEC: CAL_DEC } = window.PortalData;

/* ============ INVOICES ============ */
const InvoicesView = () => {
  const [tab, setTab] = React.useState('all');
  const counts = {
    all: INVS.length,
    paid: INVS.filter(x=>x.status==='ok').length,
    pending: INVS.filter(x=>x.status==='pend').length,
    overdue: INVS.filter(x=>x.overdue).length,
  };
  const filt = INVS.filter(x => {
    if (tab === 'paid') return x.status === 'ok';
    if (tab === 'pending') return x.status === 'pend';
    if (tab === 'overdue') return x.overdue;
    return true;
  });

  const total = INVS.reduce((s, x) => s + x.amount, 0);
  const paid = INVS.filter(x => x.status==='ok').reduce((s, x) => s + x.amount, 0);
  const pending = total - paid;

  return (
    <>
      <div className="portal-h">
        <div>
          <p className="h-sub">Faturas emitidas e estado dos recebimentos · novembro 2025</p>
          <h2>Faturação</h2>
        </div>
        <div className="h-actions">
          <button className="p-btn"><I2 name="dl" size={14}/> Exportar</button>
          <button className="p-btn primary"><I2 name="plus" size={14}/> Nova fatura</button>
        </div>
      </div>

      <div className="stat-grid" style={{gridTemplateColumns:'repeat(3, 1fr)'}}>
        <div className="p-stat">
          <div className="l">Total faturado · mês</div>
          <div className="v">{f(total)}</div>
          <div className="d up"><I2 name="up" size={12}/> +18.4% vs out</div>
        </div>
        <div className="p-stat">
          <div className="l">Já recebido</div>
          <div className="v" style={{color:'var(--accent)'}}>{f(paid)}</div>
          <div className="d neutral">{((paid/total)*100).toFixed(0)}% do total</div>
        </div>
        <div className="p-stat">
          <div className="l">Por receber</div>
          <div className="v">{f(pending)}</div>
          <div className="d down">{counts.overdue} em atraso</div>
        </div>
      </div>

      <div style={{display:'flex', gap:12, alignItems:'center'}}>
        <div className="p-seg">
          <button className={tab==='all'?'active':''}     onClick={()=>setTab('all')}>Todas · {counts.all}</button>
          <button className={tab==='paid'?'active':''}    onClick={()=>setTab('paid')}>Pagas · {counts.paid}</button>
          <button className={tab==='pending'?'active':''} onClick={()=>setTab('pending')}>Por receber · {counts.pending}</button>
          <button className={tab==='overdue'?'active':''} onClick={()=>setTab('overdue')}>Em atraso · {counts.overdue}</button>
        </div>
        <button className="p-btn" style={{marginLeft:'auto'}}><I2 name="filter" size={14}/> Filtros</button>
      </div>

      <div className="p-table-card">
        <table className="p-table">
          <thead>
            <tr>
              <th>Documento</th>
              <th>Cliente</th>
              <th>Emissão</th>
              <th>Vencimento</th>
              <th className="num">Valor</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filt.map((inv, i) => (
              <tr key={i}>
                <td style={{fontFamily:'var(--mono)', fontSize:12.5}}>{inv.num}</td>
                <td style={{fontWeight:500}}>{inv.client}</td>
                <td>{fd(inv.date)}</td>
                <td>{fd(inv.due)}</td>
                <td className="num" style={{fontWeight:500}}>{f(inv.amount)}</td>
                <td>
                  <SP2 status={inv.overdue ? 'warn' : inv.status}>
                    {inv.overdue ? 'Em atraso' : INV_L[inv.status]}
                  </SP2>
                </td>
                <td style={{textAlign:'right'}}>
                  <button className="p-btn"><I2 name="eye" size={13}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

/* ============ PAYMENTS / OBLIGATIONS ============ */
const PaymentsView = () => {
  const upcoming = OBLS.filter(o => o.status !== 'ok');
  const done = PAYS.filter(p => p.status === 'ok');
  const totalDue = upcoming.reduce((s, x) => s + (x.amount || 0), 0);

  return (
    <>
      <div className="portal-h">
        <div>
          <p className="h-sub">Pagamentos efetuados e obrigações por liquidar</p>
          <h2>Pagamentos</h2>
        </div>
        <div className="h-actions">
          <button className="p-btn primary"><I2 name="pay" size={14}/> Configurar débito direto</button>
        </div>
      </div>

      <div className="stat-grid" style={{gridTemplateColumns:'repeat(3, 1fr)'}}>
        <div className="p-stat">
          <div className="l">A liquidar · próximos 30 dias</div>
          <div className="v">{f(totalDue)}</div>
          <div className="d neutral">{upcoming.length} obrigações</div>
        </div>
        <div className="p-stat">
          <div className="l">Liquidado · este mês</div>
          <div className="v" style={{color:'var(--accent)'}}>{f(PAYS.filter(p=>p.status==='ok').reduce((s,x)=>s+x.amount,0))}</div>
          <div className="d up"><I2 name="check" size={12}/> Todos dentro do prazo</div>
        </div>
        <div className="p-stat">
          <div className="l">Saldo previsto · fim mês</div>
          <div className="v">{f(11440)}</div>
          <div className="d neutral">conta BPI · 1234 5678</div>
        </div>
      </div>

      {/* Obligations */}
      <div className="p-card">
        <div className="p-card-h">
          <span className="p-card-t">Obrigações fiscais — próximas</span>
          <button className="p-btn"><I2 name="cal" size={13}/> Ver calendário</button>
        </div>
        <div className="p-list">
          {OBLS.map((o, i) => (
            <div className="p-list-row" key={i}
              style={{gridTemplateColumns:'auto 1fr auto auto auto'}}>
              <div className="p-icon">
                <I2 name={o.type === 'iva' ? 'invoice' : o.type === 'ss' ? 'team' : o.type === 'ies' ? 'docs' : 'file'} size={16}/>
              </div>
              <div>
                <div className="p-name">{o.title}</div>
                <div className="p-meta">limite · {fd(o.due)} · {o.detail}</div>
              </div>
              <div className="p-val">{o.amount ? f(o.amount) : '—'}</div>
              <SP2 status={o.status}>{OBL_L[o.status]}</SP2>
              <button className="p-btn">Detalhe</button>
            </div>
          ))}
        </div>
      </div>

      {/* Past payments */}
      <div className="p-table-card">
        <table className="p-table">
          <thead>
            <tr>
              <th>Descrição</th><th>Referência</th><th>Data</th>
              <th className="num">Valor</th><th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {PAYS.map((p, i) => (
              <tr key={i}>
                <td style={{fontWeight:500}}>{p.what}</td>
                <td style={{fontFamily:'var(--mono)', fontSize:12.5}}>{p.ref}</td>
                <td>{fd(p.date)}</td>
                <td className="num" style={{fontWeight:500}}>{f(p.amount)}</td>
                <td><SP2 status={p.status}>{PAY_L[p.status]}</SP2></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

/* ============ CALENDAR ============ */
const CalendarView = () => {
  // December 2025 — starts on Monday Dec 1
  // Build a grid 6 rows × 7 days, anchored Monday → Sunday
  const month = 11; // 0-indexed (December)
  const year = 2025;
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7; // Mon=0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < offset; i++) {
    const d = new Date(year, month, 1 - (offset - i));
    cells.push({ day: d.getDate(), muted: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, today: d === 15 });
  }
  while (cells.length < 42) {
    const d = cells.length - (offset + daysInMonth) + 1;
    cells.push({ day: d, muted: true });
  }
  const wd = ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];

  return (
    <>
      <div className="portal-h">
        <div>
          <p className="h-sub">Todas as datas-limite — fiscais, salariais, societárias</p>
          <h2>Calendário fiscal</h2>
        </div>
        <div className="h-actions">
          <button className="p-btn"><I2 name="dl" size={14}/> Exportar (.ics)</button>
          <button className="p-btn primary"><I2 name="plus" size={14}/> Adicionar evento</button>
        </div>
      </div>

      <div className="p-card">
        <div className="p-card-h">
          <div style={{display:'flex', alignItems:'center', gap:14}}>
            <button className="p-btn"><I2 name="chev" size={12} style={{transform:'rotate(180deg)'}}/></button>
            <span style={{fontFamily:'var(--display)', fontSize:24, letterSpacing:'-.015em', fontWeight:500}}>Dezembro 2025</span>
            <button className="p-btn"><I2 name="chev" size={12}/></button>
          </div>
          <div className="p-seg">
            <button>Mês</button>
            <button className="active">Lista</button>
            <button>Calendário</button>
          </div>
        </div>

        <div className="cal-grid">
          {wd.map(w => <div className="cal-h" key={w}>{w}</div>)}
          {cells.map((c, i) => {
            const events = !c.muted ? (CAL_DEC[c.day] || []) : [];
            return (
              <div key={i} className={`cal-day ${c.muted?'muted':''} ${c.today?'today':''}`}>
                <span className="cal-num">{c.day}</span>
                {events.map((e, j) => (
                  <span key={j} className={`cal-evt ${e.type}`}>{e.label}</span>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-card">
        <div className="p-card-h">
          <span className="p-card-t">Legenda</span>
        </div>
        <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
          <span className="p-chip"><span style={{width:8,height:8,borderRadius:2,background:'#FBE9C8'}}/>IVA</span>
          <span className="p-chip"><span style={{width:8,height:8,borderRadius:2,background:'#DDE7F1'}}/>IRS · Retenções</span>
          <span className="p-chip"><span style={{width:8,height:8,borderRadius:2,background:'var(--green-tint)'}}/>Segurança Social</span>
          <span className="p-chip"><span style={{width:8,height:8,borderRadius:2,background:'#F2D7E0'}}/>Mod. 30 · IES · Anuais</span>
        </div>
      </div>
    </>
  );
};

window.InvoicesView = InvoicesView;
window.PaymentsView = PaymentsView;
window.CalendarView = CalendarView;
})();
