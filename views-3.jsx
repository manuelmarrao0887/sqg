/* eslint-disable */
/* SQG Portal — Views: Messages, Team, Settings */
(function() {

const { Icon: I3 } = window.PortalIcons;
const { CHAT_THREADS: TH, CHAT_MSGS: MSGS, TEAM_SQG: TEAM3, ORG: ORG3 } = window.PortalData;

/* ============ MESSAGES ============ */
const MessagesView = () => {
  const [active, setActive] = React.useState('sofia');
  const [text, setText] = React.useState('');
  const [days, setDays] = React.useState(MSGS[active]);
  const [_, setT] = React.useState(0); // tick to force update after fake send

  React.useEffect(() => { setDays(MSGS[active]); }, [active]);

  const send = () => {
    if (!text.trim()) return;
    const last = days[days.length - 1];
    const today = (last.day === 'hoje') ? last : null;
    const ts = new Date().toLocaleTimeString('pt-PT', {hour:'2-digit', minute:'2-digit'});
    if (today) {
      today.msgs.push({ who:'me', text, time: ts });
    } else {
      days.push({ day:'hoje', msgs: [{ who:'me', text, time: ts }] });
    }
    setText('');
    setT(t => t+1);
    // Auto-reply
    setTimeout(() => {
      const last2 = days[days.length - 1];
      last2.msgs.push({
        who:'them',
        text: 'Recebido — vou verificar e digo-lhe algo até ao fim do dia.',
        time: new Date().toLocaleTimeString('pt-PT', {hour:'2-digit', minute:'2-digit'})
      });
      setT(t => t+1);
    }, 1400);
  };

  const thread = TH.find(t => t.id === active);

  return (
    <>
      <div className="portal-h">
        <div>
          <p className="h-sub">Conversa direta com quem trata da sua contabilidade</p>
          <h2>Mensagens</h2>
        </div>
        <div className="h-actions">
          <button className="p-btn primary"><I3 name="plus" size={14}/> Nova mensagem</button>
        </div>
      </div>

      <div className="chat-shell">
        <div className="chat-side">
          <div className="chat-search">
            <input placeholder="Pesquisar conversas…"/>
          </div>
          <div className="chat-list">
            {TH.map(t => (
              <div key={t.id} className={`chat-thread ${active === t.id ? 'active':''}`}
                onClick={() => setActive(t.id)}>
                <div className="av">{t.initials}</div>
                <div className="ti">
                  <div className="ti-n">
                    <span>{t.name}{t.unread && <span className="unread-dot"/>}</span>
                    <time>{t.time}</time>
                  </div>
                  <div className="ti-p">{t.preview}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-pane">
          <div className="chat-pane-h">
            <div className="av">{thread.initials}</div>
            <div>
              <div className="who">{thread.name}</div>
              <div className="role">{thread.role}</div>
            </div>
            <button className="p-btn" style={{marginLeft:'auto'}}><I3 name="user" size={13}/> Perfil</button>
          </div>

          <div className="chat-pane-body">
            {days.map((d, di) => (
              <React.Fragment key={di}>
                <div className="chat-day">{d.day}</div>
                {d.msgs.map((m, mi) => (
                  <div key={mi} className={`chat-msg ${m.who}`}>
                    {m.who === 'them' && (
                      <div style={{
                        width:32, height:32, borderRadius:'50%',
                        background:'var(--accent)', color:'var(--accent-2)',
                        display:'grid', placeItems:'center',
                        fontFamily:'var(--display)', fontWeight:600, fontSize:13, flexShrink:0
                      }}>{thread.initials}</div>
                    )}
                    <div>
                      <div className="bubble">{m.text}</div>
                      <div className="meta">{m.time}</div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>

          <div className="chat-compose">
            <button className="p-btn"><I3 name="paper" size={14}/></button>
            <input
              value={text}
              onChange={e=>setText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder={`Escrever para ${thread.name.split(' ')[0]}…`}/>
            <button className="p-btn primary" onClick={send}>
              <I3 name="send" size={14}/> Enviar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

/* ============ TEAM ============ */
const TeamView = () => {
  return (
    <>
      <div className="portal-h">
        <div>
          <p className="h-sub">As pessoas da SQG dedicadas ao seu negócio</p>
          <h2>A sua equipa</h2>
        </div>
        <div className="h-actions">
          <button className="p-btn"><I3 name="cal" size={14}/> Marcar reunião</button>
        </div>
      </div>

      <div className="p-card" style={{padding:32, background:'var(--ink)', color:'var(--paper)', border:'none'}}>
        <div style={{display:'grid', gridTemplateColumns:'auto 1fr', gap:32, alignItems:'center'}}>
          <div style={{
            width:96, height:96, borderRadius:24,
            background:'var(--accent-2)', color:'var(--ink)',
            display:'grid', placeItems:'center',
            fontFamily:'var(--display)', fontSize:42, fontWeight:600, letterSpacing:'-.04em'
          }}>SQ</div>
          <div>
            <span style={{
              fontFamily:'var(--mono)', fontSize:11, letterSpacing:'.12em',
              textTransform:'uppercase', color:'var(--accent-2)'
            }}>Gestora de conta</span>
            <h3 style={{
              fontFamily:'var(--display)', fontWeight:500, fontSize:36,
              letterSpacing:'-.02em', margin:'8px 0 6px', color:'var(--paper)'
            }}>Sofia Quintão</h3>
            <p style={{margin:'0 0 20px', color:'rgba(255,255,255,.7)', fontSize:15, maxWidth:'52ch', lineHeight:1.55}}>
              Sócia da SQG desde 2002. Tratou da sua contabilidade nos últimos {new Date().getFullYear() - 2014} anos. Resposta garantida em 24h úteis.
            </p>
            <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>
              <a href="mailto:sofia.quintao@sqg.pt" style={{
                padding:'10px 18px', borderRadius:999,
                background:'var(--accent-2)', color:'var(--ink)',
                fontSize:13.5, fontWeight:500, display:'inline-flex', alignItems:'center', gap:8
              }}><I3 name="paper" size={14}/> sofia.quintao@sqg.pt</a>
              <a href="tel:+351210000001" style={{
                padding:'10px 18px', borderRadius:999,
                background:'transparent', border:'1px solid rgba(255,255,255,.2)',
                color:'var(--paper)', fontSize:13.5, fontWeight:500,
                display:'inline-flex', alignItems:'center', gap:8
              }}>+351 210 000 001</a>
              <button style={{
                padding:'10px 18px', borderRadius:999,
                background:'transparent', border:'1px solid rgba(255,255,255,.2)',
                color:'var(--paper)', fontSize:13.5, fontWeight:500,
                display:'inline-flex', alignItems:'center', gap:8, cursor:'pointer'
              }}><I3 name="cal" size={14}/> Ver agenda</button>
            </div>
          </div>
        </div>
      </div>

      <h3 style={{
        fontFamily:'var(--display)', fontWeight:500, fontSize:22,
        letterSpacing:'-.01em', margin:'8px 0 0'
      }}>Equipa de apoio</h3>

      <div className="team-strip">
        {TEAM3.slice(1).map((t, i) => (
          <div className="person" key={i}>
            <div className="av">{t.initials}</div>
            <div style={{flex:1}}>
              <div className="n">{t.name}</div>
              <div className="r">{t.role}</div>
              <div style={{fontSize:11.5, color:'var(--fg-muted)', marginTop:4}}>{t.email}</div>
            </div>
            <button className="p-btn"><I3 name="chat" size={13}/></button>
          </div>
        ))}
      </div>

      <div className="p-card">
        <div className="p-card-h">
          <span className="p-card-t">Como trabalhamos consigo</span>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:18, padding:'8px 0'}}>
          {[
            { ic:'chat', t:'Resposta em 24h úteis', d:'Garantido contratualmente. Para urgências, ligue diretamente à Sofia.' },
            { ic:'cal', t:'Reunião mensal opcional', d:'30 minutos, em vídeo ou no escritório. Para alinhar números e prioridades.' },
            { ic:'info', t:'Comunicação proativa', d:'Avisamos sobre prazos críticos. Não esperamos que se lembre.' },
          ].map((it, i) => (
            <div key={i}>
              <div style={{
                width:38, height:38, borderRadius:10,
                background:'var(--green-tint)', color:'var(--accent)',
                display:'grid', placeItems:'center', marginBottom:12
              }}><I3 name={it.ic} size={18}/></div>
              <div style={{fontSize:14, fontWeight:500, marginBottom:6}}>{it.t}</div>
              <div style={{fontSize:13, color:'var(--fg-muted)', lineHeight:1.5}}>{it.d}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

/* ============ SETTINGS ============ */
const SettingsView = ({ logout }) => {
  const [tab, setTab] = React.useState('account');
  const tabs = [
    { k:'account',  l:'Conta' },
    { k:'org',      l:'Organização' },
    { k:'users',    l:'Utilizadores' },
    { k:'notif',    l:'Notificações' },
    { k:'integ',    l:'Integrações' },
    { k:'sec',      l:'Segurança' },
  ];

  return (
    <>
      <div className="portal-h">
        <div>
          <p className="h-sub">Configurações do portal</p>
          <h2>Definições</h2>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'220px 1fr', gap:24}}>
        <div style={{display:'flex', flexDirection:'column', gap:2}}>
          {tabs.map(t => (
            <button key={t.k} onClick={()=>setTab(t.k)} style={{
              border:0, background:tab===t.k ? 'var(--cream-2)' : 'transparent',
              padding:'10px 14px', borderRadius:8,
              textAlign:'left', fontSize:13.5, fontFamily:'var(--body)',
              color: tab===t.k ? 'var(--fg)' : 'var(--fg-muted)',
              fontWeight: tab===t.k ? 500 : 400, cursor:'pointer'
            }}>{t.l}</button>
          ))}
          <button onClick={logout} style={{
            marginTop:18, border:0, background:'transparent',
            padding:'10px 14px', borderRadius:8,
            textAlign:'left', fontSize:13.5, color:'#B23B2A',
            display:'inline-flex', alignItems:'center', gap:8, cursor:'pointer'
          }}><I3 name="log" size={14}/> Terminar sessão</button>
        </div>

        <div className="p-card" style={{minHeight:400}}>
          {tab === 'account' && (
            <>
              <div className="p-card-h"><span className="p-card-t">Os seus dados</span></div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, padding:'8px 0'}}>
                <SettingField label="Nome" value={ORG3.user.name}/>
                <SettingField label="Função" value={ORG3.user.role}/>
                <SettingField label="Email" value={ORG3.user.email}/>
                <SettingField label="Telemóvel" value={ORG3.user.phone}/>
              </div>
              <div style={{borderTop:'1px solid var(--border)', paddingTop:18, marginTop:18}}>
                <button className="p-btn primary">Guardar alterações</button>
              </div>
            </>
          )}
          {tab === 'org' && (
            <>
              <div className="p-card-h"><span className="p-card-t">Organização</span></div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, padding:'8px 0'}}>
                <SettingField label="Razão social" value={ORG3.name}/>
                <SettingField label="NIPC" value={ORG3.nif}/>
                <SettingField label="CAE" value={ORG3.cae}/>
                <SettingField label="Cliente SQG" value="desde maio 2014"/>
                <SettingField label="Morada fiscal" value="Rua das Salgadeiras, 18 · 1200-396 Lisboa"/>
                <SettingField label="Regime IVA" value="Mensal — POC"/>
              </div>
            </>
          )}
          {tab === 'users' && (
            <>
              <div className="p-card-h"><span className="p-card-t">Utilizadores do portal</span>
                <button className="p-btn primary"><I3 name="plus" size={13}/> Convidar</button>
              </div>
              <div style={{padding:'8px 0'}}>
                {[
                  { n:'Manuela Sousa', r:'Gerente · Admin total', i:'MS' },
                  { n:'Ricardo Almeida', r:'TOC externo · Leitura', i:'RA' },
                  { n:'Paula Vieira', r:'RH · Salários', i:'PV' },
                ].map((u, i) => (
                  <div key={i} style={{
                    display:'flex', alignItems:'center', gap:14, padding:'14px 0',
                    borderBottom:'1px solid var(--line-soft)'
                  }}>
                    <div style={{
                      width:36, height:36, borderRadius:'50%',
                      background:'var(--accent)', color:'var(--accent-2)',
                      display:'grid', placeItems:'center',
                      fontFamily:'var(--display)', fontWeight:600, fontSize:13
                    }}>{u.i}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:14, fontWeight:500}}>{u.n}</div>
                      <div style={{fontSize:12, color:'var(--fg-muted)'}}>{u.r}</div>
                    </div>
                    <button className="p-btn">Gerir</button>
                  </div>
                ))}
              </div>
            </>
          )}
          {tab === 'notif' && (
            <>
              <div className="p-card-h"><span className="p-card-t">Notificações</span></div>
              <div style={{padding:'8px 0'}}>
                {[
                  { t:'Novos documentos disponibilizados', d:'Email e portal', on:true },
                  { t:'Resposta de mensagens da equipa SQG', d:'Email, portal e SMS', on:true },
                  { t:'Lembretes de prazos fiscais', d:'Email, portal · 7 e 3 dias antes', on:true },
                  { t:'Faturas em atraso de clientes', d:'Email semanal · segundas', on:true },
                  { t:'Resumo mensal de KPIs', d:'Email · dia 5 de cada mês', on:false },
                ].map((n, i) => (
                  <label key={i} style={{
                    display:'flex', alignItems:'center', gap:14, padding:'14px 0',
                    borderBottom:'1px solid var(--line-soft)', cursor:'pointer'
                  }}>
                    <input type="checkbox" defaultChecked={n.on} style={{accentColor:'var(--accent)', width:18, height:18}}/>
                    <div style={{flex:1}}>
                      <div style={{fontSize:14, fontWeight:500}}>{n.t}</div>
                      <div style={{fontSize:12, color:'var(--fg-muted)'}}>{n.d}</div>
                    </div>
                  </label>
                ))}
              </div>
            </>
          )}
          {tab === 'integ' && (
            <>
              <div className="p-card-h"><span className="p-card-t">Integrações ativas</span></div>
              <div style={{padding:'8px 0'}}>
                {[
                  { t:'PHC CS · Faturação', d:'Sincronização contínua · última: há 12 min', on:true },
                  { t:'Banco BPI · Empresas', d:'Importação diária · última: hoje 06h12', on:true },
                  { t:'AT · Portal das Finanças', d:'e-Fatura e SAF-T automáticos', on:true },
                  { t:'Banco Santander · Empresas', d:'Não ligado', on:false },
                  { t:'Stripe · Pagamentos online', d:'Não ligado', on:false },
                ].map((it, i) => (
                  <div key={i} style={{
                    display:'flex', alignItems:'center', gap:14, padding:'14px 0',
                    borderBottom:'1px solid var(--line-soft)'
                  }}>
                    <div style={{
                      width:36, height:36, borderRadius:8,
                      background: it.on ? 'var(--green-tint)' : 'var(--cream-2)',
                      display:'grid', placeItems:'center',
                      color: it.on ? 'var(--accent)' : 'var(--fg-muted)'
                    }}>{it.on ? <I3 name="check" size={16}/> : <I3 name="plus" size={16}/>}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:14, fontWeight:500}}>{it.t}</div>
                      <div style={{fontSize:12, color:'var(--fg-muted)'}}>{it.d}</div>
                    </div>
                    <button className="p-btn">{it.on ? 'Configurar' : 'Ligar'}</button>
                  </div>
                ))}
              </div>
            </>
          )}
          {tab === 'sec' && (
            <>
              <div className="p-card-h"><span className="p-card-t">Segurança</span></div>
              <div style={{padding:'12px 0', display:'flex', flexDirection:'column', gap:14}}>
                <SettingField label="Palavra-passe" value="••••••••••••" action="Alterar"/>
                <SettingField label="Autenticação em 2 passos" value="Ativa · App Authenticator" action="Reconfigurar"/>
                <SettingField label="Sessões ativas" value="2 dispositivos (este e iPhone)" action="Gerir"/>
                <SettingField label="Histórico de acesso" value="Última entrada · hoje 09h14 · Lisboa" action="Ver tudo"/>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const SettingField = ({ label, value, action }) => (
  <div style={{display:'flex', flexDirection:'column', gap:6}}>
    <span style={{
      fontFamily:'var(--mono)', fontSize:10.5, letterSpacing:'.12em',
      textTransform:'uppercase', color:'var(--fg-muted)'
    }}>{label}</span>
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'12px 14px', borderRadius:8,
      border:'1px solid var(--border)', background:'var(--bg)',
      fontSize:14
    }}>
      <span>{value}</span>
      {action && <button className="p-btn" style={{padding:'6px 12px', fontSize:12}}>{action}</button>}
    </div>
  </div>
);

window.MessagesView = MessagesView;
window.TeamView = TeamView;
window.SettingsView = SettingsView;
})();
