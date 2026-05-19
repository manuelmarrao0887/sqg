/* eslint-disable */
/* SQG — Tweaks panel */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "forest",
  "type": "sans",
  "theme": "light",
  "density": "normal",
  "heroVariant": "A"
}/*EDITMODE-END*/;

const ACCENT_MAP = {
  // Each preset is a (deep ink-tone, bright energy color) duo
  forest:   { a: '#0F2E26', a2: '#D4F25E', soft: '#CFE0D2', tint: '#E4EDE2' },  // forest + chartreuse
  midnight: { a: '#0E1640', a2: '#A9F0E7', soft: '#C6CDE8', tint: '#E4E8F4' },  // midnight + cyan-mint
  ink:      { a: '#0E1416', a2: '#D4F25E', soft: '#D8DBD8', tint: '#ECEEEC' },  // pure ink + chartreuse
  plum:     { a: '#321B3A', a2: '#FF8A65', soft: '#E2CDE3', tint: '#EFE3F0' },  // plum + coral
};
const ACCENT_OPTS = [
  { value:'forest',   hex:'#0F2E26' },
  { value:'midnight', hex:'#0E1640' },
  { value:'ink',      hex:'#0E1416' },
  { value:'plum',     hex:'#321B3A' },
];

const SQGTweaks = ({ onHeroVariantChange }) => {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const c = ACCENT_MAP[t.accent] || ACCENT_MAP.forest;
    const root = document.documentElement;
    root.style.setProperty('--accent',     c.a);
    root.style.setProperty('--accent-2',   c.a2);
    root.style.setProperty('--green',      c.a);
    root.style.setProperty('--green-3',    c.a2);
    root.style.setProperty('--green-soft', c.soft);
    root.style.setProperty('--green-tint', c.tint);
    root.setAttribute('data-type', t.type);
    root.setAttribute('data-theme', t.theme);
    root.setAttribute('data-density', t.density);
    onHeroVariantChange && onHeroVariantChange(t.heroVariant);
  }, [t.accent, t.type, t.theme, t.density, t.heroVariant]);

  // Pick the hex matching current accent for the swatch picker value
  const currentHex = (ACCENT_MAP[t.accent] || ACCENT_MAP.forest).a;
  const onColorChange = (hex) => {
    const found = ACCENT_OPTS.find(o => o.hex === hex);
    if (found) setTweak('accent', found.value);
  };

  return (
    <TweaksPanel>
      <TweakSection label="Cor de acento">
        <TweakColor
          label="Paleta"
          value={currentHex}
          onChange={onColorChange}
          options={ACCENT_OPTS.map(o => o.hex)}
        />
      </TweakSection>

      <TweakSection label="Tipografia">
        <TweakRadio
          label="Estilo"
          value={t.type}
          options={['serif', 'sans']}
          onChange={v => setTweak('type', v)}
        />
      </TweakSection>

      <TweakSection label="Modo">
        <TweakRadio
          label="Tema"
          value={t.theme}
          options={['light', 'dark']}
          onChange={v => setTweak('theme', v)}
        />
      </TweakSection>

      <TweakSection label="Densidade">
        <TweakRadio
          label="Espaçamento"
          value={t.density}
          options={['normal', 'compact']}
          onChange={v => setTweak('density', v)}
        />
      </TweakSection>

      <TweakSection label="Hero copy">
        <TweakRadio
          label="Versão"
          value={t.heroVariant}
          options={['A', 'B', 'C']}
          onChange={v => setTweak('heroVariant', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
};

Object.assign(window, { SQGTweaks });
