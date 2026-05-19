# SQG — Rebranding & Website

Rebranding completo da [SQG](https://sqg.pt) — Serviço, Qualidade e Gestão — incluindo:

- **Marca:** monograma + wordmark, paleta editorial moderna (deep forest + chartreuse), tipografia Geist + Instrument Serif
- **Website:** homepage + página de serviço (Contabilidade) com calculadora de preço em tempo real
- **Portal de cliente:** SPA demo navegável com login pré-preenchido — 8 vistas funcionais

## Demo online

Quando publicado, navega para:

- `/` — Homepage do novo site
- `/contabilidade.html` — Página de serviço com calculadora
- `/portal/login.html` — Login do portal (credenciais já preenchidas)
- `/portal/` — Portal de cliente (Resumo, Documentos, Faturação, Pagamentos, Calendário, Mensagens, Equipa, Definições)

## Tweaks ao vivo

No topo da preview, ativa **Tweaks** para mexer em:

- Cor de acento (4 duos: forest+lime, midnight+mint, ink+lime, plum+coral)
- Tipografia (sans / editorial serif)
- Modo claro / escuro
- Densidade (generosa / compacta)
- Versão de copy do hero (A / B / C)

## Deploy ao GitHub Pages

1. Cria um repositório no GitHub
2. Commit todos os ficheiros à raiz do repo:
   ```
   index.html, contabilidade.html, styles.css, components.css,
   brand.jsx, home-1.jsx, home-2.jsx, contact.jsx,
   contabilidade-sections.jsx, tweaks.jsx, tweaks-panel.jsx,
   portal/ (pasta completa)
   ```
3. **Settings → Pages → Source: Deploy from branch → main / root**
4. Após ~1 min, a demo fica em `https://<utilizador>.github.io/<repo>/`

> Não precisa de servidor — é tudo estático (HTML + CSS + React via CDN).

## Estrutura

```
├─ index.html                  # Homepage
├─ contabilidade.html          # Serviço de contabilidade + calculadora
├─ styles.css                  # Tokens, tipografia, layout base
├─ components.css              # Nav, hero, serviços, footer, etc.
├─ brand.jsx                   # Logo, monograma, Nav, Footer
├─ home-1.jsx                  # Hero, Marquee, Services, Philosophy
├─ home-2.jsx                  # Simulator, Dashboard demo, Team, Testimonial
├─ contact.jsx                 # Multi-step contact form
├─ contabilidade-sections.jsx  # Hero, Includes, Calculator, Process, FAQ
├─ tweaks.jsx                  # Tweaks panel (cores, tipo, modo, hero copy)
├─ tweaks-panel.jsx            # Tweaks shell library
│
└─ portal/                     # Portal de cliente (demo)
   ├─ login.html               # Login pré-preenchido
   ├─ index.html               # SPA shell
   ├─ portal.css               # Estilos do portal
   ├─ data.js                  # Mock data (Padaria do Bairro, Lda.)
   ├─ icons.jsx                # Set de ícones inline
   ├─ app.jsx                  # Shell (sidebar + topbar + router)
   ├─ views-1.jsx              # Overview + Documentos
   ├─ views-2.jsx              # Faturação + Pagamentos + Calendário
   └─ views-3.jsx              # Mensagens + Equipa + Definições
```

## Notas

- **Dados são fictícios.** Padaria do Bairro, Lda. — NIPC 509 482 720 — é uma empresa imaginária para fins de demonstração.
- O simulador fiscal usa coeficientes do Regime Simplificado e escalões de IRS/IRC indicativos (valores reais a confirmar com a equipa fiscal).
- O portal é um protótipo navegável — todas as ações (enviar mensagem, exportar, etc.) são simuladas no cliente.
