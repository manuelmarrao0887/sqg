/* eslint-disable */
/* SQG — Home sections */

const HERO_VARIANTS = {
  A: {
    eyebrow: "Consultoria · Lisboa · Desde 1998",
    title: ["A confiança", "constrói-se", "número a número."],
    lead: "Há mais de duas décadas que acompanhamos PMEs, profissionais e famílias portuguesas — com o rigor de uma grande consultora e a proximidade de um parceiro de longa data.",
  },
  B: {
    eyebrow: "Próximos. Rigorosos. Seus.",
    title: ["A sua contabilidade,", "tratada como", "deve ser tratada."],
    lead: "Não somos só os seus contabilistas. Somos quem está do outro lado do telefone, quando o ano fiscal aperta e a decisão tem de ser hoje.",
  },
  C: {
    eyebrow: "Serviço · Qualidade · Gestão",
    title: ["Quem cuida", "dos seus números,", "cuida do seu futuro."],
    lead: "Contabilidade, fiscalidade, RH e consultoria de gestão para quem quer dormir bem — sabendo que está tudo em ordem.",
  },
};

const Hero = ({ heroVariant = 'A' }) => {
  const v = HERO_VARIANTS[heroVariant] || HERO_VARIANTS.A;
  return (
    <section className="hero">
      <div className="page">
        <div className="hero-meta">
          <span className="tag"><span className="pulse"/>Aceitando novos clientes — 2026</span>
        </div>
        <div className="hero-grid">
          <div>
            <Eyebrow>{v.eyebrow}</Eyebrow>
            <h1 className="h-display" style={{ marginTop: 16 }}>
              {v.title.map((line, i) => (
                <span key={i} style={{ display: 'block' }}>
                  {line}
                  {i === v.title.length - 1 && (
                    <span style={{ color: 'var(--accent-2)', fontStyle: 'italic' }}>.</span>
                  )}
                </span>
              ))}
            </h1>
            <p className="lead">{v.lead}</p>
            <div className="hero-actions">
              <a href="#contacto" className="btn">Marcar conversa <ArrowIcon/></a>
              <a href="#servicos" className="btn ghost">Ver serviços</a>
            </div>
          </div>
          <aside className="hero-side">
            <div className="stat-line">
              <div className="stat-num">26<span style={{color:'var(--accent-2)'}}>·</span></div>
              <div className="stat-label">anos a acompanhar empresas e famílias portuguesas</div>
            </div>
            <div className="stat-line">
              <div className="stat-num">480+</div>
              <div className="stat-label">clientes ativos em todo o território nacional</div>
            </div>
            <div className="stat-line">
              <div className="stat-num">12h</div>
              <div className="stat-label">tempo médio de resposta a uma questão fiscal urgente</div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

const Marquee = () => {
  const items = [
    "Contabilidade certificada", "OCC nº 12.480", "Membro AOTOC",
    "Certificação ISO 9001:2015", "Software AT homologado",
    "Faturação eletrónica B2G", "RGPD compliant"
  ];
  const doubled = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((it, i) => <span key={i} className="marquee-item">{it}</span>)}
      </div>
    </div>
  );
};

const SERVICES = [
  {
    num: "01",
    title: "Contabilidade",
    desc: "Lançamentos rigorosos, prazos cumpridos, reporting que faz sentido para si — não para os robôs das Finanças.",
    items: ["POC e SNC", "Encerramento de contas", "IES e Modelo 22", "Faturação eletrónica"],
    href: "contabilidade.html",
  },
  {
    num: "02",
    title: "Fiscalidade",
    desc: "Planeamento fiscal para empresas, ENI e famílias. Antecipamos, otimizamos, defendemos.",
    items: ["IRS, IRC, IVA", "Planeamento sucessório", "Tributação patrimonial", "Apoio em inspeções"],
    href: "#",
  },
  {
    num: "03",
    title: "Consultoria de gestão",
    desc: "Olhamos para os seus números e ajudamos a tomar decisões — investimento, financiamento, expansão.",
    items: ["Análise económica", "Business plans", "Apoio a candidaturas", "Reestruturação"],
    href: "#",
  },
  {
    num: "04",
    title: "Recursos humanos",
    desc: "Processamento salarial, contratos e o lado humano da relação laboral — porque pessoas não são entradas em folha de cálculo.",
    items: ["Processamento salarial", "Contratos e admissões", "Higiene e segurança", "Formação obrigatória"],
    href: "#",
  },
];

const Services = () => (
  <section id="servicos">
    <div className="page">
      <div className="sec-head">
        <div>
          <Eyebrow num="01">O que fazemos</Eyebrow>
        </div>
        <div>
          <h2 className="h2">Quatro áreas, uma equipa, uma só forma de trabalhar — com cuidado.</h2>
          <p style={{marginTop:18, color:'var(--fg-muted)', fontSize:17, maxWidth:'52ch'}}>
            Cada cliente tem um gestor de conta dedicado. Não há call-centers, não há tickets — há pessoas que conhecem o seu negócio pelo primeiro nome.
          </p>
        </div>
      </div>
      <div className="services">
        {SERVICES.map((s, i) => (
          <a key={i} href={s.href} className="service-card">
            <div className="service-num">{s.num}</div>
            <h3 className="service-title">{s.title}</h3>
            <p className="service-desc">{s.desc}</p>
            <div className="service-list">
              {s.items.map((it, j) => (
                <div key={j} className="service-list-item">{it}</div>
              ))}
            </div>
            <span className="service-arrow"><ArrowIcon size={13}/></span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

const Philosophy = () => (
  <section className="dense">
    <div className="page">
      <div className="philosophy">
        <Eyebrow num="02">A nossa filosofia</Eyebrow>
        <h2 className="h2">
          Há quem trate de papéis. Nós tratamos de pessoas.
        </h2>
        <div className="philosophy-grid">
          <p>
            A SQG nasceu em 1998 com uma convicção simples: quem cuida dos números de alguém, está a cuidar do seu futuro. Vinte e seis anos depois, essa convicção continua a ser a régua por onde medimos tudo o que fazemos.
          </p>
          <div className="principles">
            {[
              { n:"I", t:"Proximidade real", b:"Um único interlocutor que conhece a sua história. Sem chatbots, sem números de ticket." },
              { n:"II", t:"Rigor antes da rapidez", b:"Preferimos demorar um dia a mais e entregar certo, do que correr e custar-lhe juros e multas." },
              { n:"III", t:"Transparência total", b:"O que está bem, dizemos. O que está mal, também. Mesmo quando não é o que quer ouvir." },
              { n:"IV", t:"Longo prazo", b:"Não trabalhamos por contratos anuais. Trabalhamos por relações de uma década." },
            ].map((p, i) => (
              <div key={i} className="principle">
                <div className="principle-num">{p.n}</div>
                <div>
                  <div className="principle-title">{p.t}</div>
                  <div className="principle-body">{p.b}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

Object.assign(window, { Hero, Marquee, Services, Philosophy });
