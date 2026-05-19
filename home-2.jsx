/* eslint-disable */
/* SQG — Simulator, Dashboard, Team, Testimonial, Contact */

const fmtEUR = (n) => {
  const v = Math.max(0, Math.round(n));
  return v.toLocaleString('pt-PT', { style:'currency', currency:'EUR', maximumFractionDigits:0 });
};

const Simulator = () => {
  const [profile, setProfile] = React.useState('eni');
  const [revenue, setRevenue] = React.useState(45000);
  const [category, setCategory] = React.useState('servicos');

  // simplified IRS / IRC calculator — Categoria B vs IRC vs Regime Simplificado
  const results = React.useMemo(() => {
    if (profile === 'empresa') {
      // IRC simplified: 17% até 50k, 21% acima (PME)
      const tax = revenue <= 50000 ? revenue * 0.17 : 50000*0.17 + (revenue-50000)*0.21;
      const ss = revenue * 0.235 * 0.25; // simplified employer SS estimate
      const liquid = revenue - tax - ss;
      return [
        { label:'Volume de negócios', val: fmtEUR(revenue) },
        { label:'IRC estimado', val: fmtEUR(tax), bar: tax/revenue },
        { label:'Encargos SS (estimativa)', val: fmtEUR(ss), bar: ss/revenue },
        { label:'Resultado líquido aproximado', val: fmtEUR(liquid), bold:true },
      ];
    }
    // ENI / profissional liberal — Regime Simplificado Cat B
    const coef = category === 'servicos' ? 0.75 : (category === 'comercio' ? 0.15 : 0.35);
    const taxable = revenue * coef;
    // IRS progressive simplified brackets 2025
    const irs = (() => {
      const brackets = [
        [8059, 0.13],
        [12160, 0.165],
        [17233, 0.22],
        [22306, 0.25],
        [28400, 0.32],
        [41629, 0.355],
        [44987, 0.435],
        [83696, 0.45],
        [Infinity, 0.48],
      ];
      let remaining = taxable, prev = 0, tax = 0;
      for (const [limit, rate] of brackets) {
        const chunk = Math.min(remaining, limit - prev);
        if (chunk <= 0) break;
        tax += chunk * rate;
        remaining -= chunk;
        prev = limit;
        if (remaining <= 0) break;
      }
      return tax;
    })();
    const ss = revenue * 0.214 * 0.7; // simplified SS Cat B
    const liquid = revenue - irs - ss;
    return [
      { label:'Rendimento bruto', val: fmtEUR(revenue) },
      { label:`Base tributável (coef. ${coef})`, val: fmtEUR(taxable) },
      { label:'IRS estimado', val: fmtEUR(irs), bar: irs/revenue },
      { label:'Segurança Social', val: fmtEUR(ss), bar: ss/revenue },
      { label:'Rendimento líquido aproximado', val: fmtEUR(liquid), bold:true },
    ];
  }, [profile, revenue, category]);

  const liquidPct = (() => {
    const total = results.reduce((acc, r) => acc + (r.bar || 0), 0);
    return Math.max(0, Math.min(100, (1 - total) * 100));
  })();

  return (
    <section id="simulador">
      <div className="page">
        <div className="sec-head">
          <div><Eyebrow num="03">Simulador</Eyebrow></div>
          <div>
            <h2 className="h2">Quanto fica para si, no final do ano?</h2>
            <p style={{marginTop:18, color:'var(--fg-muted)', fontSize:17, maxWidth:'52ch'}}>
              Uma estimativa rápida — para começar a conversa. O cálculo definitivo depende de cada caso, e é aí que entramos nós.
            </p>
          </div>
        </div>

        <div className="simulator">
          <div className="sim-form">
            <div className="sim-field">
              <label>Perfil</label>
              <div className="sim-segment">
                <button className={profile==='eni'?'active':''} onClick={()=>setProfile('eni')}>Profissional / ENI</button>
                <button className={profile==='empresa'?'active':''} onClick={()=>setProfile('empresa')}>Empresa</button>
              </div>
            </div>

            <div className="sim-field">
              <label>{profile==='empresa' ? 'Volume de negócios anual' : 'Rendimento bruto anual'}</label>
              <div className="sim-input">
                <input
                  type="number"
                  value={revenue}
                  onChange={(e)=>setRevenue(Number(e.target.value)||0)}
                  step={1000} min={0}
                />
                <span className="unit">€</span>
              </div>
              <input
                type="range" min={5000} max={250000} step={1000}
                value={revenue}
                onChange={(e)=>setRevenue(Number(e.target.value))}
                style={{accentColor:'var(--accent)', marginTop:8}}
              />
            </div>

            {profile === 'eni' && (
              <div className="sim-field">
                <label>Atividade</label>
                <div className="sim-input">
                  <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                    <option value="servicos">Prestação de serviços (coef. 0,75)</option>
                    <option value="comercio">Comércio / restauração (coef. 0,15)</option>
                    <option value="profissoes">Profissões previstas (coef. 0,35)</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="sim-result">
            <div className="sim-headline">
              <span className="eyebrow">Resultado estimado</span>
              <div className="big">{fmtEUR(results[results.length-1].val.replace(/[^\d-]/g,''))}</div>
              <div className="sub">≈ {liquidPct.toFixed(0)}% do rendimento bruto</div>
            </div>
            <div className="sim-breakdown">
              {results.map((r, i) => (
                <div key={i} className="sim-row" style={{fontWeight:r.bold?500:400}}>
                  <span className="label">{r.label}</span>
                  <span className="val">{r.val}</span>
                </div>
              ))}
            </div>
            <p className="sim-note">
              * Estimativa indicativa baseada nos coeficientes do Regime Simplificado e escalões de IRS / IRC em vigor para 2025. Para um cálculo personalizado, fale connosco.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const DashboardDemo = () => (
  <section id="portal" className="dense">
    <div className="page">
      <div className="sec-head">
        <div><Eyebrow num="04">Portal de cliente</Eyebrow></div>
        <div>
          <h2 className="h2">Os seus números, à distância de um login.</h2>
          <p style={{marginTop:18, color:'var(--fg-muted)', fontSize:17, maxWidth:'52ch'}}>
            Tudo numa única plataforma — documentos, faturas, prazos, comunicações. Sem chamadas perdidas, sem emails que se acumulam.
          </p>
        </div>
      </div>

      <div className="dashboard">
        <div className="dashboard-bar">
          <div className="dots"><span/><span/><span/></div>
          <div className="url">portal.sqg.pt / Padaria do Bairro, Lda.</div>
          <div style={{width:60}}/>
        </div>
        <div className="dashboard-body">
          <aside className="dash-side">
            <div className="user">
              <div className="avatar">P</div>
              <div>
                <div className="user-name">Padaria do Bairro</div>
                <div className="user-role">Cliente desde 2014</div>
              </div>
            </div>
            <div className="nav-section">Geral</div>
            <div className="nav-item active"><span className="ic"/>Resumo</div>
            <div className="nav-item"><span className="ic"/>Documentos</div>
            <div className="nav-item"><span className="ic"/>Faturação</div>
            <div className="nav-item"><span className="ic"/>Pagamentos</div>
            <div className="nav-section">Conta</div>
            <div className="nav-item"><span className="ic"/>Calendário fiscal</div>
            <div className="nav-item"><span className="ic"/>Mensagens</div>
            <div className="nav-item"><span className="ic"/>Equipa SQG</div>
          </aside>

          <main className="dash-main">
            <div className="dash-h">
              <div>
                <h3 className="h3">Olá, Manuela.</h3>
                <p className="sub">Esta é a vista geral de novembro de 2025.</p>
              </div>
              <span className="pill">Tudo em dia</span>
            </div>

            <div className="dash-stats">
              <div className="dash-stat">
                <div className="l">Volume mês</div>
                <div className="v">{fmtEUR(28450)}</div>
                <div className="d">↑ 12,4% vs out</div>
              </div>
              <div className="dash-stat">
                <div className="l">Margem bruta</div>
                <div className="v">42,3%</div>
                <div className="d">↑ 1,8 p.p.</div>
              </div>
              <div className="dash-stat">
                <div className="l">A pagar IVA</div>
                <div className="v">{fmtEUR(3820)}</div>
                <div className="d" style={{color:'var(--fg-muted)'}}>15 dez</div>
              </div>
            </div>

            <div className="dash-list">
              <div className="dash-list-h">
                <span>Próximas obrigações</span>
                <span>Data limite</span>
                <span className="col-3">Valor</span>
                <span>Estado</span>
              </div>
              <div className="dash-list-row">
                <span>IVA — Outubro 2025</span>
                <span>15 dez 2025</span>
                <span className="col-3">{fmtEUR(3820)}</span>
                <span className="status warn">Em revisão</span>
              </div>
              <div className="dash-list-row">
                <span>Retenções IRS — novembro</span>
                <span>20 dez 2025</span>
                <span className="col-3">{fmtEUR(1240)}</span>
                <span className="status pend">Pendente</span>
              </div>
              <div className="dash-list-row">
                <span>Segurança Social — novembro</span>
                <span>20 dez 2025</span>
                <span className="col-3">{fmtEUR(2150)}</span>
                <span className="status ok">Submetido</span>
              </div>
              <div className="dash-list-row">
                <span>Modelo 30 — pagamentos a não residentes</span>
                <span>31 dez 2025</span>
                <span className="col-3">—</span>
                <span className="status pend">Pendente</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  </section>
);

const TEAM = [
  { name:"Sofia Quintão", role:"Sócia · Contabilista Certificada" },
  { name:"Rui Gonçalves",  role:"Sócio · Fiscalidade e Auditoria" },
  { name:"Helena Marques", role:"Senior · RH e Processamento" },
  { name:"Tiago Cordeiro", role:"Senior · Consultoria de gestão" },
];

const Team = () => (
  <section id="equipa">
    <div className="page">
      <div className="sec-head">
        <div><Eyebrow num="05">A equipa</Eyebrow></div>
        <div>
          <h2 className="h2">Pessoas que vai conhecer pelo nome — e que conhecem o seu negócio pelo nome.</h2>
        </div>
      </div>
      <div className="team">
        {TEAM.map((m, i) => (
          <div key={i} className="team-card">
            <div className="team-photo">
              <span className="placeholder-mark">{m.name.split(' ').map(x=>x[0]).slice(0,2).join('')}</span>
              <span className="glow"/>
            </div>
            <h3 className="team-name">{m.name}</h3>
            <p className="team-role">{m.role}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonial = () => (
  <section>
    <div className="page">
      <div className="testimonial">
        <div>
          <Eyebrow>Quem nos confia o trabalho</Eyebrow>
          <div className="quote-mark">"</div>
        </div>
        <div>
          <blockquote>
            Em vinte e dois anos como empresário, nunca tive uma contabilista que me ligasse antes de eu ligar a ela. A Sofia faz isso. É outro nível.
          </blockquote>
          <div className="author">
            <div className="avatar">JM</div>
            <div>
              <div className="author-name">João Mateus</div>
              <div className="author-co">CEO, Mateus & Filhos — cliente desde 2009</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

Object.assign(window, { Simulator, DashboardDemo, Team, Testimonial });
