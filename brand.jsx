/* eslint-disable */
/* SQG — Shared brand components */

const SQGLogo = ({ size = 36, showWord = true, variant }) => {
  return (
    <a href="#" className="logo">
      <SQGMonogram size={size} variant={variant} />
      {showWord && (
        <div className="logo-word">
          <span className="word">SQG</span>
          <span className="tag">Serviço · Qualidade · Gestão</span>
        </div>
      )}
    </a>
  );
};

const SQGMonogram = ({ size = 36, variant }) => {
  // Editorial monogram — three nested arcs that read as S, Q, G
  return (
    <span className="logo-mark" style={{ width: size, height: size, borderRadius: size * 0.22 }}>
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        {/* S — top arc */}
        <path
          d="M27 12 C 24 9, 16 9, 13 12 C 10 15, 12 18, 16 19 L 24 21 C 28 22, 30 25, 27 28 C 24 31, 16 31, 13 28"
          stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none"
        />
        {/* Q — small dot bottom right, the descender */}
        <circle cx="27" cy="30" r="1.6" fill="currentColor"/>
      </svg>
    </span>
  );
};

const Eyebrow = ({ children, num }) => (
  <span className="eyebrow">
    {num && <span style={{ marginRight: 10, opacity: .6 }}>{num}</span>}
    {children}
  </span>
);

const ArrowIcon = ({ size = 14 }) => (
  <svg className="arrow" width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MobileMenu = ({ open, onClose, links }) => {
  React.useEffect(() => {
    document.body.classList.toggle('mobile-menu-open', open);
    return () => document.body.classList.remove('mobile-menu-open');
  }, [open]);
  return (
    <div className={`mobile-menu ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div className="mobile-menu-h">
        <SQGLogo/>
        <button className="mobile-menu-close" onClick={onClose} aria-label="Fechar menu">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18"/>
          </svg>
        </button>
      </div>
      <div className="mobile-menu-links">
        {links.map((l, i) => (
          <a key={i} href={l.href} onClick={onClose}>{l.label}</a>
        ))}
      </div>
      <div className="mobile-menu-cta">
        <a href="portal/login.html" className="btn ghost" onClick={onClose}>Portal de cliente</a>
        <a href="#contacto" className="btn" onClick={onClose}>Marcar conversa <ArrowIcon/></a>
      </div>
    </div>
  );
};

const Nav = ({ links = [] }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <React.Fragment>
      <header className="nav">
        <div className="page nav-inner">
          <SQGLogo />
          <nav className="nav-links">
            {links.map((l, i) => (
              <a key={i} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </nav>
          <div className="nav-cta">
            <a href="portal/login.html" className="nav-link">Portal de cliente</a>
            <a href="#contacto" className="btn sm">Marcar conversa <ArrowIcon/></a>
            <button className="nav-burger" onClick={() => setMenuOpen(true)} aria-label="Abrir menu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16"/>
              </svg>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links}/>
    </React.Fragment>
  );
};

const Footer = () => (
  <footer className="footer">
    <div className="page">
      <div className="footer-grid">
        <div>
          <SQGLogo />
          <p className="footer-pitch">
            Mais de duas décadas a cuidar dos números que sustentam negócios e famílias portuguesas.
          </p>
        </div>
        <div className="footer-col">
          <h4>Serviços</h4>
          <a href="contabilidade.html">Contabilidade</a>
          <a href="#">Fiscalidade</a>
          <a href="#">Consultoria</a>
          <a href="#">Recursos Humanos</a>
          <a href="#">Gestão patrimonial</a>
        </div>
        <div className="footer-col">
          <h4>Cliente</h4>
          <a href="portal/login.html">Portal de cliente</a>
          <a href="#">Quem somos</a>
          <a href="#">Equipa</a>
          <a href="#">Insights</a>
          <a href="#">Carreiras</a>
          <a href="#">Calendário fiscal</a>
        </div>
        <div className="footer-col">
          <h4>Contacto</h4>
          <a href="mailto:geral@sqg.pt">geral@sqg.pt</a>
          <a href="tel:+351210000000">+351 210 000 000</a>
          <a href="#">Av. da Liberdade, Lisboa</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 SQG — Serviço, Qualidade e Gestão, Lda. NIPC 500 000 000</span>
        <span><a href="#">Política de privacidade</a> · <a href="#">Cookies</a> · <a href="#">RGPD</a></span>
      </div>
    </div>
  </footer>
);

Object.assign(window, { SQGLogo, SQGMonogram, Eyebrow, ArrowIcon, Nav, MobileMenu, Footer });
