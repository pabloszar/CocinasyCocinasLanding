const { useState, useEffect, useMemo, useRef } = React;

const NAV_LINKS = [
  { label: "INICIO", href: "#hero" },
  { label: "CONÓCENOS", href: "#manifiesto" },
  { label: "GALERÍA DE PROYECTOS", href: "#proyectos" },
  { label: "CONTACTO", href: "#contacto" }
];

const PROYECTOS = [
  { id: 1, style: "moderno", place: "Metepec", img: "assets/proyecto_1_1783407469044.png" },
  { id: 2, style: "minimalista", place: "Toluca Centro", img: "assets/proyecto_2_1783407476697.png" },
  { id: 3, style: "clasico", place: "San Mateo Atenco", img: "assets/proyecto_3_1783407500576.png" },
  { id: 4, style: "moderno", place: "Lerma", img: "assets/proyecto_4_1783407571012.png" }
];

const PROCESO = [
  { n: "01", t: "DESCUBRIMOS", d: "Escuchamos tus ideas y entendemos tus necesidades." },
  { n: "02", t: "DISEÑAMOS", d: "Creamos una propuesta que refleje tu estilo y funcionalidad." },
  { n: "03", t: "VISUALIZAMOS", d: "Te mostramos tu proyecto con imágenes realistas y detalladas." },
  { n: "04", t: "FABRICAMOS", d: "Construimos tu cocina con precisión y los mejores materiales." },
  { n: "05", t: "INSTALAMOS", d: "Nuestro equipo instala cada detalle con el máximo cuidado." },
  { n: "06", t: "ACOMPAÑAMOS", d: "Estamos contigo incluso después de entregar tu proyecto." }
];

const FAQS = [
  { q: "¿Cuánto cuesta una cocina integral de diseño?", a: "Depende del tamaño, los materiales y el estilo. La mayoría de nuestros proyectos en Toluca van de $80,000 a $200,000 MXN. Te hacemos una cotización sin compromiso con el precio exacto." },
  { q: "¿Cuánto tiempo tarda el proceso desde el diseño hasta la instalación?", a: "En proyectos estándar, entre 4 y 8 semanas. Te lo confirmamos al inicio con un calendario por escrito." },
  { q: "¿Qué pasa si algo falla después de la instalación?", a: "Damos garantía en materiales y en mano de obra. Las cubiertas y los electrodomésticos Mabe / TEKA conservan la garantía del fabricante." },
  { q: "¿Manejan facturación y crédito para arquitectos?", a: "Sí. Damos factura electrónica, manejamos esquemas de pago por etapa y atendemos órdenes de compra de despachos." }
];

const WA_TEXT = "?text=Hola%2C%20vi%20su%20sitio%20web%20y%20quiero%20agendar%20una%20asesor%C3%ADa";
const WA_URL = "https://wa.me/527223183942" + WA_TEXT;

const I = {
  arrowRight: (p = {}) => <svg {...p} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>,
  wa: (p = {}) => <svg {...p} width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4a7.94 7.94 0 0 0-6.88 11.91l-1.05 3.83 3.93-1.03A7.94 7.94 0 0 0 12.05 20h.01a7.94 7.94 0 0 0 7.94-7.93 7.88 7.88 0 0 0-2.4-5.75zm-5.55 12.2h-.01a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.33.61.62-2.27-.16-.24a6.6 6.6 0 1 1 12.21-3.49 6.6 6.6 0 0 1-6.6 6.45zm3.62-4.93c-.2-.1-1.18-.58-1.36-.65-.18-.07-.31-.1-.45.1-.13.2-.51.65-.62.78-.12.13-.23.15-.42.05-.2-.1-.83-.31-1.59-.98-.59-.52-.98-1.17-1.1-1.37-.12-.2-.01-.3.09-.4.09-.09.2-.23.3-.35.1-.12.13-.2.2-.33.07-.13.03-.25-.02-.35-.05-.1-.45-1.08-.61-1.48-.16-.39-.33-.34-.45-.34l-.39-.01a.74.74 0 0 0-.54.25c-.18.2-.7.69-.7 1.67 0 .98.72 1.93.82 2.06.1.13 1.42 2.18 3.45 3.06.48.21.86.33 1.15.43.48.15.92.13 1.27.08.39-.06 1.18-.48 1.35-.95.17-.46.17-.86.12-.95-.05-.08-.18-.13-.38-.23z" /></svg>,
  ig: (p = {}) => <svg {...p} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
  fb: (p = {}) => <svg {...p} width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22V13H16.5L17 9.5H13.5V7.5C13.5 6.5 13.8 5.8 15.2 5.8H17V2.7C16.7 2.7 15.6 2.6 14.4 2.6C11.9 2.6 10.2 4.1 10.2 6.9V9.5H7V13H10.2V22H13.5Z" /></svg>
};

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navStyles = scrolled ? {
    position: 'fixed',
    top: 24,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'calc(100% - 96px)',
    maxWidth: 1200,
    background: 'rgba(25, 25, 25, 0.7)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 999,
    padding: '12px 32px',
    boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  } : {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: 'transparent',
    padding: '24px 48px',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  return (
    <nav style={navStyles}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, transform: scrolled ? 'scale(0.85)' : 'none', transformOrigin: 'left center', transition: 'transform 0.4s ease' }}>
        <img src="assets/logo-mark.svg" alt="Cocinas y Cocinas" style={{ height: 48, filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(340deg)' }} />
        <div style={{ color: 'white', fontFamily: 'Playfair Display' }}>
          <div style={{ fontSize: 20, fontWeight: 600 }}>COCINAS <em style={{ color: 'var(--orange-soft)' }}>&</em> COCINAS®</div>
          <div style={{ fontSize: 10, letterSpacing: '0.15em' }}>EN EL CORAZÓN DE TU HOGAR</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 40, alignItems: 'center' }} className="hide-sm">
        {NAV_LINKS.map(l => <a key={l.label} href={l.href} style={{ color: 'white', fontSize: 12, letterSpacing: '0.1em' }}>{l.label}</a>)}
      </div>
      <a href={WA_URL} target="_blank" className="hide-sm" style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '12px 24px', color: 'white', fontSize: 11, letterSpacing: '0.1em', borderRadius: 999, transition: 'all 0.3s ease' }}>AGENDA UNA ASESORÍA &rarr;</a>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" style={{ position: 'relative', height: '100vh', minHeight: 700, display: 'flex', alignItems: 'center', padding: '0 48px' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img src="assets/Hero-CocinasYCocinas-2.0.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Hero Kitchen" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 800, color: 'white', marginTop: 80 }}>
        <h1 style={{ color: 'white', fontSize: 'clamp(56px, 8vw, 100px)', lineHeight: 1.05, marginBottom: 24, textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
          Diseñamos espacios que <em style={{ color: 'var(--orange-soft)' }}>se viven.</em>
        </h1>
        <p style={{ fontFamily: 'Inter', fontSize: 14, letterSpacing: '0.15em', lineHeight: 1.6, maxWidth: 500, opacity: 0.9 }}>
          COCINAS PERSONALIZADAS CON MATERIALES PREMIUM Y UN DISEÑO QUE TRASCIENDE EL TIEMPO.
        </p>
        <div style={{ marginTop: 40 }}>
          <a href="#proyectos" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, color: 'white', borderBottom: '1px solid var(--orange-soft)', paddingBottom: 4, letterSpacing: '0.1em', fontSize: 13, textTransform: 'uppercase' }}>
            CONOCE NUESTROS PROYECTOS &rarr;
          </a>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 48, left: 48, zIndex: 10, display: 'flex', alignItems: 'center', gap: 16, color: 'white' }}>
        <div style={{ width: 32, height: 48, border: '1px solid rgba(255,255,255,0.5)', borderRadius: 16, position: 'relative' }}>
          <div style={{ width: 2, height: 8, background: 'white', position: 'absolute', top: 8, left: 14, borderRadius: 2 }} />
        </div>
        <span style={{ fontSize: 10, letterSpacing: '0.1em', opacity: 0.8, textTransform: 'uppercase' }}>DESLIZA PARA DESCUBRIR</span>
      </div>
    </section>
  );
}

function Manifiesto() {
  return (
    <section id="manifiesto" style={{ padding: '120px 48px', background: 'white' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'center' }}>
        <div>
          <img src="assets/materiales_cocina_1783407391928.png" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} alt="Detalle" />
        </div>
        <div>
          <div style={{ color: 'var(--orange-deep)', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24, fontWeight: 600 }}>NUESTRO MANIFIESTO</div>
          <h2 style={{ fontSize: 'clamp(36px, 4vw, 56px)', marginBottom: 32, lineHeight: 1.2, color: 'var(--ink)' }}>
            Las mejores cocinas no se diseñan para verse bien. Se diseñan para vivir mejor durante los próximos veinte años.
          </h2>
          <p style={{ color: 'var(--ink-3)', fontSize: 18, lineHeight: 1.6, maxWidth: 600 }}>
            Cada proyecto es único. Escuchamos, entendemos y creamos cocinas que reflejan tu estilo de vida, combinando funcionalidad, estética y materiales Mabe y TEKA excepcionales con un nivel de detalle impecable.
          </p>
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  const pillars = [
    { t: "ARQUITECTURA", d: "Diseñamos en armonía con tu espacio y tu estilo de vida.", img: "assets/arquitectura_cocina_1783407382459.png" },
    { t: "MATERIALES", d: "Seleccionamos solo materiales premium y acabados impecables.", img: "assets/materiales_cocina_1783407391928.png" },
    { t: "FABRICACIÓN", d: "Fabricación a la medida con precisión y pasión por el detalle.", img: "assets/fabricacion_cocina_1783407401320.png" }
  ];
  return (
    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
      {pillars.map(p => (
        <div key={p.t} style={{ position: 'relative', height: 600, overflow: 'hidden' }}>
          <img src={p.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={p.t} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', bottom: 40, left: 40, right: 40, color: 'white' }}>
            <h3 style={{ fontSize: 24, marginBottom: 12, letterSpacing: '0.05em', color: 'white' }}>{p.t}</h3>
            <p style={{ fontSize: 15, opacity: 0.9 }}>{p.d}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

function Gallery() {
  return (
    <section id="proyectos" style={{ padding: '120px 48px', background: 'var(--cream)' }}>
      <style>
        {`
          .editorial-grid {
            display: grid;
            gap: 32px;
            grid-template-columns: 1fr;
            padding-bottom: 40px;
          }
          @media (min-width: 768px) {
            .editorial-grid {
              grid-template-columns: repeat(12, 1fr);
            }
            .editorial-item-0 { grid-column: span 7; height: 600px !important; }
            .editorial-item-1 { grid-column: span 5; height: 600px !important; }
            .editorial-item-2 { grid-column: span 4; }
            .editorial-item-3 { grid-column: span 4; }
            .editorial-item-4 { grid-column: span 4; }
          }
        `}
      </style>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 60, flexWrap: 'wrap', gap: 32 }}>
        <div>
          <div style={{ color: 'var(--orange-deep)', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16, fontWeight: 600 }}>PROYECTOS</div>
          <h2 style={{ fontSize: 'clamp(36px, 4vw, 56px)', color: 'var(--ink)' }}>Espacios únicos,<br />historias reales.</h2>
        </div>
        <a href={WA_URL} target="_blank" style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--ink)', fontSize: 12, letterSpacing: '0.1em', fontWeight: 600, textTransform: 'uppercase', borderBottom: '1px solid var(--ink)', paddingBottom: 4 }}>
          VER TODOS LOS PROYECTOS {I.arrowRight({ width: 16, height: 16 })}
        </a>
      </div>
      <div className="editorial-grid" style={{ maxWidth: 1400, margin: '0 auto' }}>
        {PROYECTOS.map((p, i) => (
          <div key={p.id} className={`editorial-item-${i}`} style={{ height: 450, position: 'relative', overflow: 'hidden' }}>
            <img src={p.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={`Proyecto ${p.place}`} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)' }} />
            <div style={{ position: 'absolute', bottom: 32, left: 32, color: 'white' }}>
              <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8, color: 'var(--orange-soft)' }}>{p.style}</div>
              <h3 style={{ fontSize: 20, fontWeight: 500, letterSpacing: '0.05em', color: 'white' }}>{p.place}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Proceso() {
  return (
    <section style={{ padding: '120px 48px', background: 'white' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ color: 'var(--orange-deep)', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 60, fontWeight: 600 }}>NUESTRO PROCESO</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 12, left: 0, right: 0, height: 1, background: 'var(--line)' }} className="hide-sm" />
          {PROCESO.map(p => (
            <div key={p.n} style={{ position: 'relative' }}>
              <div style={{ fontSize: 24, fontFamily: 'Playfair Display', color: 'var(--ink)', marginBottom: 24, background: 'white', display: 'inline-block', paddingRight: 16 }}>{p.n}</div>
              <h4 style={{ fontSize: 13, letterSpacing: '0.1em', fontWeight: 700, marginBottom: 12 }}>{p.t}</h4>
              <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Materiales() {
  const items = [
    { t: "MADERAS", d: "Naturaleza que aporta calidez y carácter.", img: "assets/textura_madera_1783407578520.png" },
    { t: "PIEDRAS NATURALES", d: "Belleza única, resistencia que trasciende.", img: "assets/textura_piedra_1783411422290.png" },
    { t: "ACABADOS", d: "Cada detalle, un estándar de excelencia.", img: "assets/textura_acabado_1783411463320.png" },
    { t: "DETALLES", d: "Pequeños detalles que hacen una gran diferencia.", img: "assets/detalle_cocina_1783411470474.png" }
  ];
  return (
    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
      {items.map(i => (
        <div key={i.t} style={{ position: 'relative', height: 600 }}>
          <img src={i.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={i.t} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)' }} />
          <div style={{ position: 'absolute', bottom: 40, left: 40, right: 40, color: 'white' }}>
            <h3 style={{ fontSize: 24, letterSpacing: '0.05em', fontWeight: 400, marginBottom: 12, color: 'white', fontFamily: 'Playfair Display' }}>{i.t}</h3>
            <p style={{ fontSize: 15, opacity: 0.9 }}>{i.d}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

function Testimonial() {
  return (
    <section style={{ position: 'relative', padding: '160px 48px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img src="assets/proyecto_3_1783407500576.png" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.3)' }} alt="Fondo" />
      </div>
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 900 }}>
        <div style={{ color: 'var(--orange-soft)', fontSize: 64, fontFamily: 'Playfair Display', lineHeight: 0.5, marginBottom: 24 }}>&ldquo;</div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: 1.4, marginBottom: 40, fontWeight: 400, color: 'white' }}>
          Hoy nuestra cocina es el lugar donde más tiempo pasamos en familia. Funcional, hermosa y hecha exactamente para nosotros.
        </h2>
        <div style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--orange-soft)', fontWeight: 600 }}>&mdash; Mariana R. (Metepec)</div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(0);
  return (
    <section style={{ padding: '120px 48px', background: 'var(--cream)', color: 'var(--ink)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 80 }}>
        <div>
          <div style={{ color: 'var(--orange-deep)', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24, fontWeight: 600 }}>FAQ</div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: 'var(--ink)', marginBottom: 24 }}>Preguntas Frecuentes.</h2>
          <p style={{ color: 'var(--ink-3)', fontSize: 16, marginBottom: 40 }}>Resolvemos tus dudas antes de empezar tu proyecto.</p>
        </div>
        <div>
          {FAQS.map((f, i) => (
            <div key={i} onClick={() => setOpen(open === i ? -1 : i)} style={{ borderBottom: '1px solid var(--line)', padding: '32px 0', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: 20, color: 'var(--ink)', fontWeight: 500 }}>{f.q}</h3>
                <span style={{ fontSize: 24, color: 'var(--orange-deep)', transform: open === i ? 'rotate(45deg)' : 'none', transition: 'all 0.3s' }}>+</span>
              </div>
              <div style={{ maxHeight: open === i ? 200 : 0, overflow: 'hidden', transition: 'all 0.3s' }}>
                <p style={{ marginTop: 24, color: 'var(--ink-3)', lineHeight: 1.6 }}>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Locations() {
  const locs = [
    { n: "Toluca · Pino Suárez", d: "Blvr. José María Pino Suárez 905", p: "722 318 3942", map: "https://www.google.com/maps?q=Blvr.+Jos%C3%A9+Mar%C3%ADa+Pino+Su%C3%A1rez+905,+Toluca,+Estado+de+M%C3%A9xico&output=embed" },
    { n: "San Mateo Atenco", d: "Juárez #601, Barrio de la Concepción", p: "722 706 3545", map: "https://www.google.com/maps?q=Ju%C3%A1rez+601,+Barrio+de+la+Concepci%C3%B3n,+San+Mateo+Atenco&output=embed" }
  ];
  return (
    <section style={{ padding: '120px 48px', background: 'var(--cream-2)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center', marginBottom: 60 }}>
        <div style={{ color: 'var(--orange-deep)', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16, fontWeight: 600 }}>VISÍTANOS</div>
        <h2 style={{ fontSize: 'clamp(36px, 4vw, 56px)', color: 'var(--ink)', marginBottom: 24 }}>Estamos cerca de ti.</h2>
        <p style={{ color: 'var(--ink-3)', fontSize: 16, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
          Dos espacios diseñados para inspirarte.<br/>Conoce nuestras tiendas y agenda una cita personalizada.
        </p>
      </div>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 40 }}>
        {locs.map((l, idx) => (
          <div key={l.n} style={{ background: 'var(--cream)' }}>
            <iframe src={l.map} style={{ width: '100%', height: 400, border: 0 }} />
            <div style={{ padding: 48, position: 'relative' }}>
              <div style={{ color: 'var(--orange-deep)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16, fontWeight: 600 }}>{l.n}</div>
              <h3 style={{ fontSize: 24, marginBottom: 32, fontFamily: 'Playfair Display', color: 'var(--ink)', fontWeight: 400 }}>{l.d}</h3>
              <p style={{ color: 'var(--ink-3)', fontSize: 15, marginBottom: 32, letterSpacing: '0.05em' }}>{l.p}</p>
              <a href={l.map} target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, color: 'var(--orange-deep)', fontSize: 11, letterSpacing: '0.1em', fontWeight: 600, textTransform: 'uppercase' }}>
                CÓMO LLEGAR {I.arrowRight({width: 14, height: 14})}
              </a>
              {/* Hoja decorativa sutil */}
              <svg width="120" height="120" viewBox="0 0 200 200" style={{ position: 'absolute', right: 0, bottom: 20, opacity: 0.1, pointerEvents: 'none', transform: idx === 0 ? 'scaleX(-1)' : 'none' }}>
                <path fill="currentColor" color="var(--ink)" d="M100,200 C40,200 0,160 0,100 C0,40 40,0 100,0 C160,0 200,40 200,100 C200,160 160,200 100,200 Z" />
              </svg>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 80 }}>
        <a href={WA_URL} target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, color: 'var(--ink)', fontSize: 11, letterSpacing: '0.15em', fontWeight: 600, textTransform: 'uppercase' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--orange-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--orange-deep)" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          AGENDA UNA CITA PERSONALIZADA {I.arrowRight({width: 16, height: 16, color: 'var(--orange-soft)'})}
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contacto" style={{ background: 'var(--ink-2)', color: 'white' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', minHeight: 600 }}>
        <div style={{ padding: '120px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--ink)' }}>
          <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', color: 'white', marginBottom: 40, lineHeight: 1.1 }}>
            ¿Listo para diseñar el espacio más importante de tu hogar?
          </h2>
        </div>
        <div style={{ padding: '120px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', marginBottom: 40, lineHeight: 1.6 }}>
            Agenda una asesoría privada y comencemos a crear la cocina que siempre has imaginado. Presupuestos sin compromiso y plazos por escrito.
          </p>
          <a href={WA_URL} target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'var(--orange-deep)', color: 'white', padding: '20px 40px', fontSize: 14, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', alignSelf: 'flex-start', borderRadius: 999 }}>
            {I.wa()} AGENDA TU ASESORÍA
          </a>
        </div>
      </div>
      <div style={{ padding: '40px 80px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24, background: 'var(--ink)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="assets/logo-mark.svg" alt="Logo" style={{ height: 32, filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(340deg)' }} />
          <span style={{ fontSize: 16, fontFamily: 'Playfair Display' }}>COCINAS <em style={{ color: 'var(--orange-soft)' }}>&</em> COCINAS®</span>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>© 2026 Cocinas y Cocinas. Todos los derechos reservados.</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Toluca / San Mateo Atenco, Edomex</div>
        <div style={{ display: 'flex', gap: 16 }}>
          <a href="https://instagram.com/cocinascocinas21" target="_blank" style={{ color: 'white' }}>{I.ig()}</a>
          <a href="https://facebook.com/Cocinas-Cocinas-296995724578621" target="_blank" style={{ color: 'white' }}>{I.fb()}</a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Manifiesto />
      <Pillars />
      <Gallery />
      <Proceso />
      <Materiales />
      <Testimonial />
      <FAQSection />
      <Locations />
      <Footer />
      <a href={WA_URL} target="_blank" style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 100, background: 'var(--wa)', color: 'white', width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)' }}>
        {I.wa({ width: 44, height: 44 })}
      </a>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);