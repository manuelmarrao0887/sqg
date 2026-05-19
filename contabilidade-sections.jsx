/* eslint-disable */
/* SQG — Contabilidade service page */

const ContabilidadeHero = () => (
  <section className="hero" style={{paddingTop:'48px'}}>
    <div className="page">
      <div style={{display:'flex', gap:8, alignItems:'center', marginBottom:24, fontSize:13, color:'var(--fg-muted)', fontFamily:'var(--mono)', letterSpacing:'.1em', textTransform:'uppercase'}}>
        <a href="index.html" style={{color:'inherit'}}>SQG</a>
        <span>/</span>
        <span>Serviços</span>
        <span>/</span>
        <span style={{color:'var(--fg)'}}>Contabilidade</span>
      </div>

      <div className="hero-grid">
        <div>
          <Eyebrow>01 · Serviço</Eyebrow>
          <h1 className="h-display" style={{marginTop:16}}>
            Contabilidade<br/>
            <span style={{color:'var(--accent-2)', fontStyle:'italic'}}>certificada,</span><br/>
            sem surpresas.
          </h1>
          <p className="lead" style={{marginTop:36}}>
            Lançamentos rigorosos, prazos cumpridos, relatórios que fazem sentido para si — não para os robôs das Finanças. Tudo com um único interlocutor que conhece o seu negócio.
          </p>
          <div className="hero-actions" style={{marginTop:32}}>
            <a href="#calculadora" className="btn">Calcular o seu custo <ArrowIcon/></a>
            <a href="#contacto" className="btn ghost">Falar com a Sofia</a>
          </div>
        </div>

        <aside className="hero-side">
          <div className="stat-line">
            <div className="stat-num">100%</div>
            <div className="stat-label">dos nossos contabilistas com CC ativa pela OCC</div>
          </div>
          <div className="stat-line">
            <div className="stat-num">0</div>
            <div className="stat-label">multas por entrega fora de prazo nos últimos 5 anos</div>
          </div>
          <div className="stat-line">
            <div className="stat-num">24h</div>
            <div className="stat-label">resposta a documentos enviados pelo portal de cliente</div>
          </div>
        </aside>
      </div>
    </div>
  </section>
);

const WhatsIncluded = () => {
  const groups = [
    {
      eyebrow: "Lançamentos",
      title: "O dia-a-dia, tratado.",
      items: [
        { t:"Classificação documental", b:"Cada fatura entra no lugar certo, na conta certa, no mês certo." },
        { t:"Reconciliação bancária", b:"Movimentos cruzados com extratos — a um clique do nosso portal." },
        { t:"Faturação eletrónica", b:"Software AT homologado, integração com os principais ERPs e POS." },
        { t:"Inventários e existências", b:"Para quem trabalha com stock — controlo permanente e validações ao encerrar." },
      ]
    },
    {
      eyebrow: "Reporting",
      title: "Os seus números, claros.",
      items: [
        { t:"Balancetes mensais", b:"Entregues até dia 15 de cada mês. Com leitura, não apenas com números." },
        { t:"Dashboard de gestão", b:"Margem, prazos médios, tesouraria projetada — atualizado a tempo real." },
        { t:"Conta de exploração", b:"P&L por centro de custo, projeto ou produto, à medida do seu negócio." },
        { t:"Análise vs orçamento", b:"O que estava previsto, o que aconteceu, e o porquê — explicado." },
      ]
    },
    {
      eyebrow: "Obrigações",
      title: "As Finanças, em silêncio.",
      items: [
        { t:"IVA mensal ou trimestral", b:"Apuramento, validação e submissão dentro dos prazos legais." },
        { t:"Modelo 22 e IES", b:"Encerramento anual, dossier fiscal e entrega da declaração — chave-na-mão." },
        { t:"Retenções e DMR", b:"Mensalmente, sem que tenha de pensar no assunto." },
        { t:"e-Fatura e SAF-T", b:"Comunicação automática à AT e respostas a pedidos de elementos." },
      ]
    },
  ];

  return (
    <section>
      <div className="page">
        <div className="sec-head">
          <div><Eyebrow num="02">O que está incluído</Eyebrow></div>
          <div>
            <h2 className="h2">Não é uma lista de tarefas. É uma forma de cuidar.</h2>
          </div>
        </div>

        {groups.map((g, gi) => (
          <div key={gi} style={{
            display:'grid',
            gridTemplateColumns:'1fr 2fr',
            gap:48,
            padding:'48px 0',
            borderTop:'1px solid var(--border)'
          }} className="incl-row">
            <div>
              <Eyebrow>{g.eyebrow}</Eyebrow>
              <h3 className="h3" style={{margin:'14px 0 0', maxWidth:'14ch'}}>{g.title}</h3>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'32px 48px'}}>
              {g.items.map((it, i) => (
                <div key={i}>
                  <div style={{
                    display:'flex', alignItems:'center', gap:8,
                    fontSize:14, fontWeight:500, marginBottom:6,
                  }}>
                    <span style={{
                      width:18, height:1, background:'var(--accent-2)'
                    }}/>
                    {it.t}
                  </div>
                  <p style={{margin:0, color:'var(--fg-muted)', fontSize:13.5, lineHeight:1.55}}>{it.b}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const PriceCalculator = () => {
  const [type, setType] = React.useState('empresa');
  const [docs, setDocs] = React.useState(60);
  const [employees, setEmployees] = React.useState(3);
  const [revenue, setRevenue] = React.useState(250000);
  const [extras, setExtras] = React.useState({ payroll:true, fiscal:false, dashboard:false });

  const price = React.useMemo(() => {
    // Heuristic pricing — for design purposes
    let base = 0;
    if (type === 'eni') {
      base = 65 + Math.max(0, docs - 20) * 0.6;
    } else if (type === 'micro') {
      base = 145 + Math.max(0, docs - 40) * 0.55;
    } else if (type === 'empresa') {
      const docCost = 180 + Math.max(0, docs - 60) * 0.5;
      const revAdj = revenue > 500000 ? (revenue - 500000) / 1000 * 0.04 : 0;
      base = docCost + revAdj;
    } else {
      base = 320 + Math.max(0, docs - 100) * 0.45;
    }
    if (extras.payroll) base += 14 * Math.max(1, employees);
    if (extras.fiscal) base += 90;
    if (extras.dashboard) base += 75;
    return Math.round(base);
  }, [type, docs, employees, revenue, extras]);

  return (
    <section id="calculadora" className="dense">
      <div className="page">
        <div className="sec-head">
          <div><Eyebrow num="03">Calculadora</Eyebrow></div>
          <div>
            <h2 className="h2">Quanto custa? <em style={{fontStyle:'italic', color:'var(--accent-2)'}}>Depende — mas pode ver.</em></h2>
            <p style={{marginTop:18, color:'var(--fg-muted)', fontSize:17, maxWidth:'52ch'}}>
              Calculamos com base no que tem realmente — não em pacotes inflados. Aqui em baixo, uma estimativa em tempo real para começar a conversa.
            </p>
          </div>
        </div>

        <div className="simulator">
          <div className="sim-form">
            <div className="sim-field">
              <label>Tipo de cliente</label>
              <div className="sim-segment" style={{flexWrap:'wrap'}}>
                <button className={type==='eni'?'active':''} onClick={()=>setType('eni')}>ENI</button>
                <button className={type==='micro'?'active':''} onClick={()=>setType('micro')}>Micro</button>
                <button className={type==='empresa'?'active':''} onClick={()=>setType('empresa')}>PME</button>
                <button className={type==='grupo'?'active':''} onClick={()=>setType('grupo')}>Grupo</button>
              </div>
            </div>

            <div className="sim-field">
              <label>Documentos por mês <span style={{color:'var(--fg)', fontFamily:'var(--display)', fontSize:18, letterSpacing:'-.02em', textTransform:'none', marginLeft:8}}>{docs}</span></label>
              <input
                type="range" min={10} max={400} step={5} value={docs}
                onChange={e=>setDocs(Number(e.target.value))}
                style={{accentColor:'var(--accent)', width:'100%'}}
              />
              <div style={{display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--fg-muted)', fontFamily:'var(--mono)'}}>
                <span>10</span><span>200</span><span>400+</span>
              </div>
            </div>

            {(type === 'empresa' || type === 'grupo') && (
              <div className="sim-field">
                <label>Volume anual estimado</label>
                <div className="sim-input">
                  <input type="number" value={revenue} step={10000} min={0}
                    onChange={e=>setRevenue(Number(e.target.value)||0)}/>
                  <span className="unit">€</span>
                </div>
              </div>
            )}

            <div className="sim-field">
              <label>Extras</label>
              <div style={{display:'flex', flexDirection:'column', gap:8}}>
                {[
                  { k:'payroll',   t:'Processamento salarial', sub:`+ €14/colaborador · mês` },
                  { k:'fiscal',    t:'Planeamento fiscal anual', sub:'+ €90 · mês' },
                  { k:'dashboard', t:'Dashboard de gestão premium', sub:'+ €75 · mês' },
                ].map(opt => (
                  <label key={opt.k} style={{
                    display:'flex', gap:14, alignItems:'center',
                    padding:'12px 14px', borderRadius:8,
                    border:'1px solid var(--border)', cursor:'pointer',
                    background: extras[opt.k] ? 'var(--green-tint)' : 'var(--surface)',
                    borderColor: extras[opt.k] ? 'var(--accent-2)' : 'var(--border)',
                    transition:'all .2s'
                  }}>
                    <input
                      type="checkbox" checked={extras[opt.k]}
                      onChange={()=>setExtras(p=>({...p, [opt.k]:!p[opt.k]}))}
                      style={{accentColor:'var(--accent)'}}
                    />
                    <div style={{flex:1}}>
                      <div style={{fontSize:13.5, fontWeight:500}}>{opt.t}</div>
                      <div style={{fontSize:11.5, color:'var(--fg-muted)', fontFamily:'var(--mono)', marginTop:2}}>{opt.sub}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {extras.payroll && (
              <div className="sim-field">
                <label>Nº de colaboradores</label>
                <input
                  type="range" min={1} max={50} step={1} value={employees}
                  onChange={e=>setEmployees(Number(e.target.value))}
                  style={{accentColor:'var(--accent)', width:'100%'}}
                />
                <div style={{display:'flex', justifyContent:'space-between', fontSize:12, color:'var(--fg-muted)'}}>
                  <span>1</span>
                  <span style={{fontFamily:'var(--display)', fontSize:18, color:'var(--fg)'}}>{employees}</span>
                  <span>50+</span>
                </div>
              </div>
            )}
          </div>

          <div className="sim-result">
            <div className="sim-headline">
              <span className="eyebrow">Estimativa mensal</span>
              <div className="big">{fmtEUR(price)}<span style={{fontSize:'.35em', color:'var(--fg-muted)', marginLeft:8}}>/ mês</span></div>
              <div className="sub">{fmtEUR(price*12)} por ano · IVA não incluído</div>
            </div>

            <div className="sim-breakdown">
              <div className="sim-row">
                <span className="label">Avença base ({type === 'eni' ? 'ENI' : type === 'micro' ? 'Micro' : type === 'empresa' ? 'PME' : 'Grupo'})</span>
                <span className="val">{fmtEUR(Math.round(price * 0.7))}</span>
              </div>
              {extras.payroll && (
                <div className="sim-row">
                  <span className="label">Processamento salarial · {employees} colaboradores</span>
                  <span className="val">{fmtEUR(14 * employees)}</span>
                </div>
              )}
              {extras.fiscal && (
                <div className="sim-row">
                  <span className="label">Planeamento fiscal</span>
                  <span className="val">€90</span>
                </div>
              )}
              {extras.dashboard && (
                <div className="sim-row">
                  <span className="label">Dashboard premium</span>
                  <span className="val">€75</span>
                </div>
              )}
            </div>

            <p className="sim-note">
              Os valores são uma estimativa — a avença definitiva é confirmada após uma reunião sem compromisso (30 minutos), onde percebemos o seu negócio.
            </p>

            <a href="#contacto" className="btn" style={{alignSelf:'flex-start', marginTop:4, position:'relative'}}>
              Pedir proposta personalizada <ArrowIcon/>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { n:"01", t:"Conversa inicial", b:"30 minutos. Sem compromisso. Percebemos onde está, o que precisa e se somos a peça certa para si." },
    { n:"02", t:"Transição", b:"Tratamos do pedido aos seus contabilistas anteriores e da migração de toda a documentação. Sem trabalho para si." },
    { n:"03", t:"Setup", b:"Configuramos o portal, integramos com o seu software de faturação e definimos o calendário de entregas." },
    { n:"04", t:"Acompanhamento", b:"Um gestor de conta dedicado. Balancetes mensais até dia 15. Resposta em 24h a qualquer pedido." },
  ];

  return (
    <section>
      <div className="page">
        <div className="sec-head">
          <div><Eyebrow num="04">Como começamos</Eyebrow></div>
          <div>
            <h2 className="h2">Mudar de contabilista não tem de ser uma chatice.</h2>
          </div>
        </div>

        <div style={{
          display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'1px',
          background:'var(--border)', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden'
        }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              background:'var(--surface)', padding:'40px 32px 36px',
              display:'flex', flexDirection:'column', gap:14, minHeight:240,
              position:'relative'
            }}>
              <div style={{fontFamily:'var(--mono)', fontSize:11, letterSpacing:'.14em', color:'var(--fg-muted)'}}>{s.n}</div>
              <h3 style={{
                fontFamily:'var(--display)', fontSize:26, margin:0, letterSpacing:'-.015em', lineHeight:1.1
              }}>{s.t}</h3>
              <p style={{margin:0, fontSize:14, color:'var(--fg-muted)', lineHeight:1.55}}>{s.b}</p>
              {i < steps.length - 1 && (
                <div style={{
                  position:'absolute', top:48, right:-8, color:'var(--accent-2)',
                  fontFamily:'var(--display)', fontSize:24
                }}>→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const items = [
    { q:"Quanto tempo demora a mudar de contabilista?", a:"Tipicamente 2 a 3 semanas. Tratamos da comunicação ao seu contabilista anterior, recolhemos a documentação dos últimos exercícios, configuramos o portal e definimos o calendário. Não precisa de fazer nada — apenas confirmar a procuração." },
    { q:"Trabalham com empresas de qualquer dimensão?", a:"Trabalhamos com profissionais liberais, ENI, micro-empresas, PME e grupos até cerca de €15M de volume. Acima disso, recomendamos parceiros com quem temos relação de longa data." },
    { q:"E se eu já uso software de faturação?", a:"Melhor. Integramos com os principais ERPs e softwares portugueses — PHC, Primavera, Sage, Moloni, InvoiceXpress, Vendus, entre outros. A integração é feita por nós, sem custo adicional." },
    { q:"O que acontece se algo correr mal?", a:"Erros nossos, custos nossos. É assim desde 1998. Temos seguro de responsabilidade civil profissional até €500.000 por sinistro, e nunca o utilizámos por culpa nossa." },
    { q:"Posso falar com a equipa antes de assinar?", a:"Tem de poder. A primeira conversa é gratuita, sem compromisso, com a Sofia ou o Rui — os dois sócios. Se não houver química, não há proposta." },
  ];

  const [open, setOpen] = React.useState(0);
  return (
    <section>
      <div className="page">
        <div className="sec-head">
          <div><Eyebrow num="05">Perguntas frequentes</Eyebrow></div>
          <div><h2 className="h2">O que normalmente nos perguntam.</h2></div>
        </div>

        <div style={{borderTop:'1px solid var(--border)'}}>
          {items.map((it, i) => (
            <div key={i} style={{borderBottom:'1px solid var(--border)'}}>
              <button
                onClick={()=>setOpen(open === i ? -1 : i)}
                style={{
                  width:'100%', textAlign:'left', background:'transparent', border:0,
                  padding:'28px 0', display:'grid', gridTemplateColumns:'1fr auto', gap:24,
                  alignItems:'center', cursor:'pointer'
                }}
              >
                <span style={{
                  fontFamily:'var(--display)', fontSize:'clamp(20px, 2vw, 26px)',
                  letterSpacing:'-.01em', color:'var(--fg)'
                }}>{it.q}</span>
                <span style={{
                  width:32, height:32, borderRadius:'50%', border:'1px solid var(--border)',
                  display:'grid', placeItems:'center', transition:'all .25s',
                  transform: open === i ? 'rotate(45deg)' : 'none',
                  background: open === i ? 'var(--accent)' : 'transparent',
                  color: open === i ? 'var(--paper)' : 'var(--fg)',
                  borderColor: open === i ? 'var(--accent)' : 'var(--border)',
                  fontSize:18, lineHeight:1
                }}>+</span>
              </button>
              <div style={{
                maxHeight: open === i ? 200 : 0,
                overflow:'hidden', transition:'max-height .35s var(--ease)',
              }}>
                <p style={{
                  margin:'0 0 28px', maxWidth:'62ch', color:'var(--fg-muted)',
                  fontSize:15.5, lineHeight:1.6
                }}>{it.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { ContabilidadeHero, WhatsIncluded, PriceCalculator, Process, FAQ });
