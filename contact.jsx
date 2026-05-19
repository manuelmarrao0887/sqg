/* eslint-disable */
/* SQG — Contact (multi-step) */

const STEPS = [
  {
    label: "01 / 04 — Sobre si",
    q: "O que melhor o(a) descreve?",
    type: "options",
    key: "profile",
    options: [
      "Sou empresa / sociedade",
      "Sou profissional liberal ou ENI",
      "Sou particular / família",
      "Outro",
    ],
  },
  {
    label: "02 / 04 — Como podemos ajudar",
    q: "O que o trouxe até nós, hoje?",
    type: "options",
    key: "need",
    multi: true,
    options: [
      "Mudar de contabilista",
      "Constituir empresa",
      "Planeamento fiscal",
      "Apoio em inspeção / litígio",
      "Consultoria de gestão",
      "Outra coisa",
    ],
  },
  {
    label: "03 / 04 — Quando",
    q: "Há urgência?",
    type: "options",
    key: "urgency",
    options: [
      "É para ontem",
      "Próximas duas semanas",
      "Este trimestre",
      "Estou só a explorar",
    ],
  },
  {
    label: "04 / 04 — Como o contactamos",
    q: "Deixe-nos como o encontrar.",
    type: "form",
    key: "contact",
  },
];

const Contact = () => {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const [done, setDone] = React.useState(false);

  const current = STEPS[step];
  const total = STEPS.length;

  const setAns = (key, value) => setAnswers(prev => ({ ...prev, [key]: value }));
  const toggle = (key, value) => {
    const cur = answers[key] || [];
    const next = cur.includes(value) ? cur.filter(v => v !== value) : [...cur, value];
    setAns(key, next);
  };

  const canNext = (() => {
    if (current.type === 'options') {
      const v = answers[current.key];
      if (current.multi) return Array.isArray(v) && v.length > 0;
      return !!v;
    }
    if (current.type === 'form') {
      return answers.name && answers.email;
    }
    return true;
  })();

  return (
    <section id="contacto">
      <div className="page">
        <div className="contact">
          <div>
            <Eyebrow>Falar connosco</Eyebrow>
            <h2 className="h2">Uma conversa, sem compromisso. <em style={{fontStyle:'italic', color:'var(--green-3)'}}>Em 30 minutos.</em></h2>
            <p className="lead">
              Conte-nos onde está, e mostramos-lhe onde podemos chegar — juntos. Sem propostas-tipo, sem letras pequenas.
            </p>
            <div className="contact-info">
              <div><span className="l">Telefone</span><span className="v">+351 210 000 000</span></div>
              <div><span className="l">Email</span><span className="v">geral@sqg.pt</span></div>
              <div><span className="l">Morada</span><span className="v">Av. da Liberdade, 200<br/>1250-147 Lisboa</span></div>
              <div><span className="l">Horário</span><span className="v">Seg–Sex · 09h00 às 18h30</span></div>
            </div>
          </div>

          <div className="multistep">
            {done ? (
              <div className="success">
                <div className="success-check">✓</div>
                <h3 className="h3" style={{color:'inherit', margin:'0 0 8px'}}>Obrigado, {answers.name?.split(' ')[0] || 'a sua mensagem chegou'}.</h3>
                <p style={{color:'var(--green-soft)', maxWidth:'30ch', margin:'0 auto'}}>
                  Recebemos o seu contacto. Uma pessoa da equipa volta a si nas próximas 24 horas úteis.
                </p>
              </div>
            ) : (
              <>
                <div className="steps-bar">
                  {STEPS.map((_, i) => (
                    <div key={i} className={`step-pip ${i <= step ? 'active' : ''}`}/>
                  ))}
                </div>
                <div className="step-label">{current.label}</div>
                <h3 className="step-q">{current.q}</h3>

                {current.type === 'options' && (
                  <div className="step-options">
                    {current.options.map((opt, i) => {
                      const v = answers[current.key];
                      const selected = current.multi
                        ? (v || []).includes(opt)
                        : v === opt;
                      return (
                        <button
                          key={i}
                          className={`step-option ${selected ? 'selected' : ''}`}
                          onClick={() => current.multi
                            ? toggle(current.key, opt)
                            : setAns(current.key, opt)}
                        >
                          <span className="pip"/>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}

                {current.type === 'form' && (
                  <div style={{display:'flex', flexDirection:'column', gap:10}}>
                    <input
                      className="step-input" placeholder="Nome completo"
                      value={answers.name || ''} onChange={e=>setAns('name', e.target.value)}
                    />
                    <div className="step-grid">
                      <input
                        className="step-input" type="email" placeholder="Email"
                        value={answers.email || ''} onChange={e=>setAns('email', e.target.value)}
                      />
                      <input
                        className="step-input" placeholder="Telefone (opcional)"
                        value={answers.phone || ''} onChange={e=>setAns('phone', e.target.value)}
                      />
                    </div>
                    <input
                      className="step-input" placeholder="Empresa (opcional)"
                      value={answers.company || ''} onChange={e=>setAns('company', e.target.value)}
                    />
                  </div>
                )}

                <div className="step-nav">
                  <button onClick={() => setStep(s => Math.max(0, s-1))} disabled={step === 0}>
                    Voltar
                  </button>
                  {step < total - 1 ? (
                    <button
                      className="primary"
                      onClick={() => setStep(s => Math.min(total-1, s+1))}
                      disabled={!canNext}
                    >
                      Continuar →
                    </button>
                  ) : (
                    <button
                      className="primary"
                      onClick={() => setDone(true)}
                      disabled={!canNext}
                    >
                      Enviar pedido
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { Contact });
