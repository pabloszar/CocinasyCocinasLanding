const { useState, useEffect, useMemo } = React;

// ---------- Data ----------

const NAV_LINKS = [
{ label: "Proyectos", href: "#galeria" },
{ label: "Servicios", href: "#servicios" },
{ label: "Nosotros", href: "#nosotros" },
{ label: "Reseñas", href: "#resenas" },
{ label: "Ubicaciones", href: "#ubicaciones" },
{ label: "FAQ", href: "#faq" }];


const STATS = [
{ num: "20", suf: "años", lab: "diseñando cocinas en Toluca y el Estado de México" },
{ num: "200", suf: "+", lab: "proyectos terminados en la zona metropolitana" },
{ num: "2", suf: "", lab: "showrooms — Centro Toluca y San Mateo Atenco" },
{ num: "100", suf: "%", lab: "fabricación a medida y diseño personalizado" }];


const DIFFS = [
{
  n: "01",
  t: "Portafolio real, no renders",
  p: "Cada cocina que ves es nuestra. Fotos del proyecto terminado en la casa del cliente — no inspiración prestada de Pinterest. Si te gusta, podemos hacer la tuya."
},
{
  n: "02",
  t: "Dos showrooms, sin cruzar la ciudad",
  p: "Visítanos en el Centro de Toluca o en San Mateo Atenco. Toca los acabados, abre los cajones, mide los herrajes antes de decidir."
},
{
  n: "03",
  t: "Marcas que sí puedes verificar",
  p: "Trabajamos con Mabe y TEKA — marcas con respaldo, garantía y refacciones disponibles. Sabes qué estás comprando antes de firmar."
}];


const BENEFITS = [
{
  t: "Diseño que parte de tu espacio real",
  p: "No vendemos módulos estándar. Medimos tu cocina, entendemos cómo la usas y diseñamos lo que funciona — en el estilo que tú eliges.",
  ico:
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 21V11M3 11L8 5L13 11M3 11H21M21 11V21M21 11L18 8M14 21V15H21V21" />
      </svg>

},
{
  t: "Materiales de marcas que ya conoces",
  p: "Mabe y TEKA — electrodomésticos y cubiertas que puedes verificar. Sabes el origen, la garantía y el respaldo antes de que empiece la obra.",
  ico:
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2L15 8L21 9L17 14L18 21L12 18L6 21L7 14L3 9L9 8L12 2Z" />
      </svg>

},
{
  t: "Instalación incluida en todo el Edomex",
  p: "Llevamos, instalamos y no te dejamos a medias. Cumplimos calendario por escrito y damos garantía en materiales y mano de obra.",
  ico:
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 22S20 16 20 10A8 8 0 0 0 4 10C4 16 12 22 12 22Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>

}];


const SERVICES = [
{ tag: "01 / Especialidad", t: "Cocinas integrales", d: "Diseño a medida en estilo minimalista, clásico, moderno o rústico. Materiales premium y herrajes con cierre suave.", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80" },
{ tag: "02 / Espacios", t: "Closets y vestidores", d: "Soluciones a medida para recámaras y vestidores. Iluminación interior, herrajes alemanes y acabados sin tropiezos.", img: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=900&q=80" },
{ tag: "03 / Materiales", t: "Cubiertas premium", d: "Granito, cuarzo y laminados TEKA. Asesoría para que la cubierta sobreviva a la vida real, no solo a la foto.", img: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=900&q=80" },
{ tag: "04 / Carpintería", t: "Muebles a medida", d: "Comedores, alacenas, libreros e islas. Si la pieza no existe en catálogo, la diseñamos y la fabricamos.", img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80" },
{ tag: "05 / Servicio", t: "Diseño y asesoría", d: "Cita en showroom o en obra. Plano 3D, lista de materiales y cotización detallada — sin costo al cotizar.", img: "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=900&q=80" },
{ tag: "06 / Garantía", t: "Instalación y servicio", d: "Cuadrilla propia, instalación incluida y servicio post-venta. Si algo falla, regresamos a atenderlo.", img: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=900&q=80" }];


const GALLERY = [
{ id: 1, style: "moderno", place: "Metepec", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80" },
{ id: 2, style: "minimalista", place: "Toluca Centro", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80" },
{ id: 3, style: "clasico", place: "San Mateo Atenco", img: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=900&q=80" },
{ id: 4, style: "moderno", place: "Lerma", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&q=80" },
{ id: 5, style: "minimalista", place: "Metepec", img: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=900&q=80" },
{ id: 6, style: "rustico", place: "Ocoyoacac", img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=900&q=80" },
{ id: 7, style: "moderno", place: "Toluca", img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=80" },
{ id: 8, style: "clasico", place: "Metepec", img: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=900&q=80" },
{ id: 9, style: "minimalista", place: "San Mateo Atenco", img: "https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?w=900&q=80" },
{ id: 10, style: "moderno", place: "Toluca Centro", img: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=900&q=80" },
{ id: 11, style: "rustico", place: "Atenco", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=900&q=80" },
{ id: 12, style: "minimalista", place: "Metepec", img: "https://images.unsplash.com/photo-1556909114-44e3e9399a2e?w=900&q=80" },
{ id: 13, style: "moderno", place: "Toluca", img: "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?w=900&q=80" },
{ id: 14, style: "clasico", place: "Lerma", img: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=900&q=80" },
{ id: 15, style: "moderno", place: "Metepec", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=80" },
{ id: 16, style: "minimalista", place: "San Mateo Atenco", img: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=900&q=80" }];


const REVIEWS = [
{
  text: "Después de cotizar con tres lugares, nos quedamos con Cocinas y Cocinas. Cumplieron la fecha de entrega exacta y los acabados son impecables. Un año después, todo sigue como el primer día.",
  name: "Mariana R.",
  src: "Google · Metepec",
  initial: "M"
},
{
  text: "Nos atendieron con muchísima paciencia, vimos los materiales en el showroom de San Mateo y nos dieron un plano 3D antes de pagar nada. Quedó tal cual lo soñamos.",
  name: "Luis y Andrea P.",
  src: "Google · Toluca",
  initial: "L"
},
{
  text: "Trabajo profesional de principio a fin. La cuadrilla limpió todos los días, instalaron en una semana y la garantía la han respetado sin problema. Recomendados.",
  name: "Arq. Daniela H.",
  src: "Google · Lerma",
  initial: "D"
}];


const FAQS = [
{
  q: "¿Cuánto cuesta una cocina integral de diseño?",
  a: "Depende del tamaño, los materiales y el estilo. La mayoría de nuestros proyectos en Toluca van de $80,000 a $200,000 MXN. Te hacemos una cotización sin compromiso con el precio exacto para tu espacio."
},
{
  q: "¿Cuánto tiempo tarda el proceso desde el diseño hasta la instalación?",
  a: "En proyectos estándar, entre 4 y 8 semanas. Te lo confirmamos al inicio con un calendario por escrito — fecha de medición, fabricación, entrega e instalación."
},
{
  q: "¿Trabajan en toda el área de Toluca y Metepec?",
  a: "Sí. Tenemos dos ubicaciones — Centro de Toluca y San Mateo Atenco — y instalamos en todo el Estado de México: Metepec, Lerma, Ocoyoacac, Atizapán, Zinacantepec y la zona conurbada."
},
{
  q: "¿Qué pasa si algo falla después de la instalación?",
  a: "Damos garantía en materiales y en mano de obra. Si hay un problema, regresamos a atenderlo. Las cubiertas y los electrodomésticos Mabe / TEKA conservan además la garantía propia del fabricante."
},
{
  q: "¿Puedo ver proyectos terminados antes de decidir?",
  a: "Sí. Puedes recorrer la galería de más de 60 proyectos aquí mismo, y agendar una visita a cualquiera de nuestros dos showrooms para ver muestras físicas de los materiales antes de cotizar."
},
{
  q: "¿Manejan facturación y crédito para arquitectos?",
  a: "Sí. Damos factura electrónica, manejamos esquemas de pago por etapa y atendemos órdenes de compra de despachos. Pregunta por nuestro programa para arquitectos e interioristas."
}];


const WA_TEXT = "?text=Hola%2C%20vi%20su%20sitio%20web%20y%20quiero%20cotizar%20una%20cocina%20integral";
const WA_TOLUCA = "https://wa.me/527223183942" + WA_TEXT;
const WA_ATENCO = "https://wa.me/527227063545" + WA_TEXT;
const WA_URL = WA_TOLUCA; // Toluca como sucursal principal

const LOCATIONS = [
{
  tag: "Showroom 01 · Principal",
  name: "Toluca · Pino Suárez",
  addr: "Blvr. José María Pino Suárez 905",
  city: "Toluca, Estado de México",
  hours: "Lun – Sáb · 10:00 – 19:00",
  phones: ["+52 722 318 3942", "+52 722 167 0575"],
  wa: WA_TOLUCA,
  map: "https://www.google.com/maps?q=Blvr.+Jos%C3%A9+Mar%C3%ADa+Pino+Su%C3%A1rez+905,+Toluca,+Estado+de+M%C3%A9xico&output=embed",
  dir: "https://www.google.com/maps/dir/?api=1&destination=Blvr.+Jos%C3%A9+Mar%C3%ADa+Pino+Su%C3%A1rez+905+Toluca+Estado+de+M%C3%A9xico"
},
{
  tag: "Showroom 02",
  name: "San Mateo Atenco",
  // CP por verificar con cliente: 94133 atípico para San Mateo Atenco
  addr: "Juárez #601, Barrio de la Concepción",
  city: "San Mateo Atenco, Estado de México · 94133",
  hours: "Lun – Sáb · 10:00 – 18:00",
  phones: ["+52 722 706 3545"],
  wa: WA_ATENCO,
  map: "https://www.google.com/maps?q=Ju%C3%A1rez+601,+Barrio+de+la+Concepci%C3%B3n,+San+Mateo+Atenco&output=embed",
  dir: "https://www.google.com/maps/dir/?api=1&destination=Ju%C3%A1rez+601+Barrio+de+la+Concepci%C3%B3n+San+Mateo+Atenco"
}];

// ---------- Icons ----------
const I = {
  arrow: (p = {}) => <svg {...p} width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M1 7H13M13 7L7 1M13 7L7 13" /></svg>,
  wa: (p = {}) => <svg {...p} width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4a7.94 7.94 0 0 0-6.88 11.91l-1.05 3.83 3.93-1.03A7.94 7.94 0 0 0 12.05 20h.01a7.94 7.94 0 0 0 7.94-7.93 7.88 7.88 0 0 0-2.4-5.75zm-5.55 12.2h-.01a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.33.61.62-2.27-.16-.24a6.6 6.6 0 1 1 12.21-3.49 6.6 6.6 0 0 1-6.6 6.45zm3.62-4.93c-.2-.1-1.18-.58-1.36-.65-.18-.07-.31-.1-.45.1-.13.2-.51.65-.62.78-.12.13-.23.15-.42.05-.2-.1-.83-.31-1.59-.98-.59-.52-.98-1.17-1.1-1.37-.12-.2-.01-.3.09-.4.09-.09.2-.23.3-.35.1-.12.13-.2.2-.33.07-.13.03-.25-.02-.35-.05-.1-.45-1.08-.61-1.48-.16-.39-.33-.34-.45-.34l-.39-.01a.74.74 0 0 0-.54.25c-.18.2-.7.69-.7 1.67 0 .98.72 1.93.82 2.06.1.13 1.42 2.18 3.45 3.06.48.21.86.33 1.15.43.48.15.92.13 1.27.08.39-.06 1.18-.48 1.35-.95.17-.46.17-.86.12-.95-.05-.08-.18-.13-.38-.23z" /></svg>,
  pin: (p = {}) => <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22S20 16 20 10A8 8 0 0 0 4 10C4 16 12 22 12 22Z" /><circle cx="12" cy="10" r="3" /></svg>,
  clock: (p = {}) => <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 7V12L15 14" /></svg>,
  phone: (p = {}) => <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 5C3 14 10 21 19 21L21 17L17 15L15 17C13 16 8 11 7 9L9 7L7 3L3 5Z" /></svg>,
  mail: (p = {}) => <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="1" /><path d="M3 7L12 13L21 7" /></svg>,
  ig: (p = {}) => <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></svg>,
  fb: (p = {}) => <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22V13H16.5L17 9.5H13.5V7.5C13.5 6.5 13.8 5.8 15.2 5.8H17V2.7C16.7 2.7 15.6 2.6 14.4 2.6C11.9 2.6 10.2 4.1 10.2 6.9V9.5H7V13H10.2V22H13.5Z" /></svg>,
  check: (p = {}) => <svg {...p} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12L10 17L20 7" /></svg>
};

// ---------- Components ----------

function TopBar() {
  return (
    <div className="topbar">
      <div className="wrap row">
        <div className="left">
          <span className="pill">20 Años · 1 Compromiso</span>
          <span className="desktop-only">En el corazón de tu hogar — desde 2005</span>
        </div>
        <div className="right">
          <a href="tel:+527223183942" className="desktop-only" style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
            {I.phone()}<span>722 318 3942</span>
          </a>
          <a href="https://instagram.com/cocinascocinas21" target="_blank" rel="noopener">{I.ig()}</a>
          <a href="https://facebook.com/Cocinas-Cocinas-296995724578621" target="_blank" rel="noopener">{I.fb()}</a>
        </div>
      </div>
    </div>);

}

function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-row">
        <a href="#" className="nav-logo">
          <img src="assets/logo-mark.svg" alt="Cocinas y Cocinas" />
          <div className="stack hide-sm">
            <div className="a">Cocinas <em style={{ fontStyle: 'italic', color: '#C26715' }}>&amp;</em> Cocinas</div>
            <div className="b">EN EL CORAZÓN DE TU HOGAR</div>
          </div>
        </a>
        <nav className="nav-links">
          {NAV_LINKS.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <a href={WA_URL} target="_blank" rel="noopener" className="btn btn-orange">
          Cotizar mi cocina {I.arrow()}
        </a>
      </div>
    </header>);

}

function Hero() {
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="wrap hero-grid">
        <div>
          <div className="eyebrow">Toluca · Metepec · San Mateo Atenco</div>
          <h1 style={{ marginTop: 18 }}>
            Tu cocina diseñada a la medida — <span className="or">por quienes llevan 20 años haciéndolo</span>
          </h1>
          <p className="lede">
            Fabricamos e instalamos cocinas integrales de diseño con materiales Mabe y TEKA. Dos showrooms en Toluca y San Mateo Atenco. Cotización sin compromiso, plazos por escrito y garantía real.
          </p>
          <div className="ctas">
            <a className="btn btn-primary" href="#galeria">Ver proyectos y agendar cita {I.arrow()}</a>
            <a className="btn btn-wa" href={WA_URL} target="_blank" rel="noopener">{I.wa()} Escríbenos por WhatsApp</a>
          </div>
          <div className="badges">
            <span className="badge"><span className="dot" />20 años de experiencia</span>
            <span className="badge"><span className="dot" />+200 cocinas instaladas</span>
            <span className="badge"><span className="dot" />Materiales Mabe &amp; TEKA</span>
          </div>
        </div>
        <div className="hero-photo">
          <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80" alt="Cocina integral terminada en Toluca" loading="eager" />
          <div className="overlay">
            <div className="num">66</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>Proyectos en portafolio</div>
              <div style={{ opacity: .75, fontSize: 12 }}>Toluca · Metepec · San Mateo Atenco</div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-side">Edición 2026 · Cocinas y Cocinas</div>
    </section>);

}

function Stats() {
  return (
    <section className="stats" style={{ padding: 0 }} data-screen-label="02 Stats">
      <div className="wrap" style={{ padding: '48px 32px' }}>
        <div className="stats-grid">
          {STATS.map((s, i) =>
          <div key={i} className="stat">
              <div className="num">{s.num}<sup>{s.suf}</sup></div>
              <div className="lab">{s.lab}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

function Differentiator() {
  return (
    <section data-screen-label="03 Diferenciador" id="diferenciador">
      <div className="wrap">
        <div className="sec-head">
          <div className="title-row">
            <span className="num">/ 01</span>
            <span className="eyebrow">Por qué nosotros</span>
          </div>
          <h2>No somos los más antiguos. Somos los que tienen el portafolio que te interesa.</h2>
          <p className="sub">Tres ventajas concretas frente a las opciones que ya cotizaste — verificables hoy mismo.</p>
        </div>
        <div className="diff-grid">
          {DIFFS.map((d) =>
          <div key={d.n} className="diff">
              <div className="marker">{d.n}</div>
              <h3>{d.t}</h3>
              <p>{d.p}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}

function Benefits() {
  return (
    <section style={{ background: 'var(--cream-2)' }} data-screen-label="04 Beneficios" id="beneficios">
      <div className="wrap">
        <div className="sec-head">
          <div className="title-row">
            <span className="num">/ 02</span>
            <span className="eyebrow">Cómo trabajamos</span>
          </div>
          <h2>Tres compromisos que cumplimos con cada cocina.</h2>
        </div>
        <div className="benefits-grid">
          {BENEFITS.map((b, i) =>
          <div key={i} className="benefit">
              <span className="num">/0{i + 1}</span>
              <div className="ico">{b.ico}</div>
              <h3>{b.t}</h3>
              <p>{b.p}</p>
            </div>
          )}
        </div>
        <div className="cta-line">
          <p>“¿Quieres ver cómo quedó la cocina de tu vecino?”</p>
          <a href="#galeria" className="btn btn-orange">Explorar la galería {I.arrow()}</a>
        </div>
      </div>
    </section>);

}

function Services() {
  return (
    <section id="servicios" data-screen-label="05 Servicios">
      <div className="wrap">
        <div className="sec-head">
          <div className="title-row">
            <span className="num">/ 03</span>
            <span className="eyebrow">Servicios</span>
          </div>
          <h2>Lo que diseñamos y fabricamos.</h2>
          <p className="sub">Cocina integral, closets, cubiertas y muebles a medida — todo bajo un mismo equipo, una misma garantía y un solo calendario.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) =>
          <a key={i} href={WA_URL} target="_blank" rel="noopener" className="service">
              <div className="service-photo">
                <img src={s.img} alt={s.t} loading="lazy" />
              </div>
              <div className="service-body">
                <span className="tag">{s.tag}</span>
                <h3>{s.t}</h3>
                <p className="desc">{s.d}</p>
                <span className="link">Cotizar este servicio {I.arrow()}</span>
              </div>
            </a>
          )}
        </div>
      </div>
    </section>);

}

function Gallery({ onOpen }) {
  const [filter, setFilter] = useState("todos");

  const counts = useMemo(() => {
    const map = { todos: GALLERY.length, moderno: 0, minimalista: 0, clasico: 0, rustico: 0 };
    GALLERY.forEach((g) => {map[g.style] = (map[g.style] || 0) + 1;});
    return map;
  }, []);

  const items = filter === "todos" ? GALLERY : GALLERY.filter((g) => g.style === filter);

  const FILTERS = [
  { id: "todos", lab: "Todos" },
  { id: "moderno", lab: "Moderno" },
  { id: "minimalista", lab: "Minimalista" },
  { id: "clasico", lab: "Clásico" },
  { id: "rustico", lab: "Rústico" }];


  return (
    <section id="galeria" style={{ background: 'var(--cream)' }} data-screen-label="06 Galería">
      <div className="wrap">
        <div className="sec-head" style={{ maxWidth: 'unset', marginBottom: 24 }}>
          <div className="title-row">
            <span className="num">/ 04</span>
            <span className="eyebrow">Portafolio · 2005 — 2026</span>
          </div>
          <h2>66 cocinas, ejemplos a lo largo de 20 años. Filtra por el estilo que estás imaginando.</h2>
        </div>

        <div className="gallery-head">
          <p style={{ color: 'var(--ink-3)', maxWidth: 460, fontSize: 15 }}>
            Cada foto es un proyecto real entregado en Toluca, Metepec, Lerma, Ocoyoacac o San Mateo Atenco. Toca cualquier imagen para ampliar.
          </p>
          <div className="filters">
            {FILTERS.map((f) =>
            <button key={f.id}
            className={`filter-btn ${filter === f.id ? 'active' : ''}`}
            onClick={() => setFilter(f.id)}>
                {f.lab}<span className="count">{counts[f.id] || 0}</span>
              </button>
            )}
          </div>
        </div>

        <div className="masonry">
          {items.map((g) =>
          <div key={g.id} className="item" onClick={() => onOpen(g)}>
              <img src={g.img} alt={`Cocina ${g.style} en ${g.place}`} loading="lazy" />
              <div className="meta">
                <div>
                  <div className="style">{g.style}</div>
                  <div className="place">{g.place}</div>
                </div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, opacity: 0.8 }}>#{String(g.id).padStart(3, '0')}</div>
              </div>
            </div>
          )}
        </div>

        <div className="gallery-foot">
          <a href={WA_URL} target="_blank" rel="noopener" className="btn btn-primary">
            Quiero una cocina como esta — agendar cita {I.arrow()}
          </a>
        </div>
      </div>
    </section>);

}

function About() {
  return (
    <section id="nosotros" style={{ background: 'var(--cream-2)' }} data-screen-label="07 Sobre nosotros">
      <div className="wrap about-grid about">
        <div>
          <div className="title-row sec-head" style={{ marginBottom: 20, padding: 0 }}>
            <span className="num">/ 05</span>
            <span className="eyebrow">Sobre Cocinas y Cocinas</span>
          </div>
          <h2 style={{ marginBottom: 24 }}>Veinte años fabricando lo que se queda en el corazón del hogar.</h2>
          <p>
            Empezamos en 2005 como un taller familiar en el Centro de Toluca. La primera cocina la diseñamos en una hoja de papel, la fabricamos a mano y la instalamos un sábado por la tarde. Veinte años después, seguimos diseñando con la misma cercanía — solo que ahora con plano 3D, dos showrooms y una cuadrilla propia que conoce el oficio de memoria.
          </p>
          <p>
            No somos los más grandes ni los más antiguos del rubro. Somos los que cumplen el calendario por escrito, los que enseñan los acabados antes de cobrar y los que regresan si algo falla.
          </p>
          <div className="brands">
            <div className="lab">Marcas asociadas</div>
            <div className="row">
              <span className="brand-name">Mabe</span>
              <span style={{ color: 'var(--line)' }}>·</span>
              <span className="brand-name">TEKA</span>
              <span style={{ color: 'var(--line)' }}>·</span>
              <span className="brand-name">Hettich</span>
              <span style={{ color: 'var(--line)' }}>·</span>
              <span className="brand-name">Caesarstone</span>
            </div>
          </div>
        </div>
        <div className="about-photo-stack">
          <div><img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80" alt="Showroom" /></div>
          <div><img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80" alt="Detalle de acabado" /></div>
          <div><img src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=80" alt="Proyecto terminado" /></div>
        </div>
      </div>
    </section>);

}

function SocialProof() {
  return (
    <section id="resenas" data-screen-label="08 Reseñas">
      <div className="wrap">
        <div className="sec-head">
          <div className="title-row">
            <span className="num">/ 06</span>
            <span className="eyebrow">Lo que dicen las familias</span>
          </div>
          <h2>Reseñas reales de clientes en Toluca y Metepec.</h2>
          <p className="sub">Calificación promedio 4.9 / 5 en Google Maps — basadas en proyectos terminados entre 2022 y 2025.</p>
        </div>
        <div className="reviews-grid">
          {REVIEWS.map((r, i) =>
          <div key={i} className="review">
              <div className="stars">★ ★ ★ ★ ★</div>
              <p>“{r.text}”</p>
              <div className="who">
                <div className="avatar">{r.initial}</div>
                <div>
                  <div className="name">{r.name}</div>
                  <div className="src">{r.src}</div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="cta-line" style={{ background: 'var(--cream-2)', marginTop: 56 }}>
          <p>“Únete a las familias en Toluca que ya tienen su cocina perfecta.”</p>
          <a href="#contacto" className="btn btn-orange">Agendar cita sin compromiso {I.arrow()}</a>
        </div>
      </div>
    </section>);

}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" style={{ background: 'var(--cream-2)' }} data-screen-label="09 FAQ">
      <div className="wrap faq-grid">
        <div>
          <div className="title-row" style={{ marginBottom: 14, display: 'flex', gap: 14, alignItems: 'baseline' }}>
            <span className="num" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--orange-deep)', fontSize: 13 }}>/ 07</span>
            <span className="eyebrow">Preguntas frecuentes</span>
          </div>
          <h2>Lo que preguntan antes de cotizar.</h2>
          <p style={{ marginTop: 16, color: 'var(--ink-3)', fontSize: 16, lineHeight: 1.6 }}>
            ¿No encuentras tu pregunta? Escríbenos por WhatsApp y respondemos en menos de 24 horas hábiles.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener" className="btn btn-wa" style={{ marginTop: 24 }}>
            {I.wa()} Preguntar por WhatsApp
          </a>
        </div>
        <div>
          {FAQS.map((f, i) =>
          <div key={i} className={`faq-item ${open === i ? 'open' : ''}`} onClick={() => setOpen(open === i ? -1 : i)}>
              <div className="faq-q">
                <span>{f.q}</span>
                <span className="faq-toggle">+</span>
              </div>
              <div className="faq-a"><p style={{ paddingTop: 4 }}>{f.a}</p></div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

function Locations() {
  return (
    <section id="ubicaciones" data-screen-label="10 Ubicaciones">
      <div className="wrap">
        <div className="sec-head">
          <div className="title-row">
            <span className="num">/ 08</span>
            <span className="eyebrow">Visítanos</span>
          </div>
          <h2>Dos showrooms en el Estado de México.</h2>
          <p className="sub">Sin cita y con cita — ven a tocar los acabados, abrir los cajones y ver las muestras antes de decidir.</p>
        </div>
        <div className="loc-grid">
          {LOCATIONS.map((l, i) =>
          <div key={i} className="location">
              <iframe className="map-frame" src={l.map} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={l.name}></iframe>
              <div className="loc-body">
                <span className="tag">{l.tag}</span>
                <h3>{l.name}</h3>
                <div className="loc-info">
                  <div className="row"><span className="ico">{I.pin()}</span><span>{l.addr}<br />{l.city}</span></div>
                  <div className="row"><span className="ico">{I.clock()}</span><span>{l.hours}</span></div>
                  <div className="row"><span className="ico">{I.phone()}</span><span style={{display:'flex', flexDirection:'column', gap:2}}>{l.phones.map(p => <a key={p} href={`tel:${p.replace(/\s/g, '')}`}>{p}</a>)}</span></div>
                </div>
                <div className="loc-actions">
                  <a className="btn btn-ghost" style={{ padding: '10px 16px', fontSize: 13 }} href={`tel:${l.phones[0].replace(/\s/g,'')}`}>Llamar {I.arrow()}</a>
                  <a className="btn btn-wa" style={{ padding: '10px 16px', fontSize: 13 }} href={l.wa} target="_blank" rel="noopener">{I.wa()} WhatsApp</a>
                  <a className="btn btn-orange" style={{ padding: '10px 16px', fontSize: 13 }} href={l.dir} target="_blank" rel="noopener">Cómo llegar</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ nombre: "", whats: "", zona: "", estilo: "" });

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="contact" data-screen-label="11 Contacto">
      <div className="wrap contact-grid">
        <div className="contact-side">
          <div className="title-row" style={{ marginBottom: 20, display: 'flex', gap: 14, alignItems: 'baseline' }}>
            <span className="num" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--orange-soft)', fontSize: 13 }}>/ 09</span>
            <span className="eyebrow" style={{ color: 'var(--orange-soft)' }}>Cotiza tu cocina</span>
          </div>
          <h3 style={{ fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: 1.15, fontFamily: "'Playfair Display',serif" }}>
            ¿Lista para tu nueva cocina? Escríbenos hoy — respondemos antes de 24 horas.
          </h3>
          <p>Cuatro datos y nos ponemos en contacto contigo el mismo día hábil. Sin compromiso — solo una conversación honesta sobre tu proyecto.

          </p>
          <div className="info">
            <div className="info-row"><span className="ico">{I.phone()}</span><span style={{display:'flex', flexDirection:'column', gap:2}}><a href="tel:+527223183942">722 318 3942 · Toluca</a><a href="tel:+527227063545">722 706 3545 · San Mateo Atenco</a></span></div>
            <div className="info-row"><span className="ico">{I.mail()}</span><a href="mailto:cocinasycocinastoluca@hotmail.com">cocinasycocinastoluca@hotmail.com</a></div>
            <div className="info-row"><span className="ico">{I.wa()}</span><a href={WA_URL} target="_blank" rel="noopener">WhatsApp directo</a></div>
            <div className="info-row"><span className="ico">{I.ig()}</span><a href="https://instagram.com/cocinascocinas21" target="_blank" rel="noopener">@cocinascocinas21</a></div>
          </div>
        </div>

        {!submitted ?
        <form className="form" onSubmit={submit}>
            <div className="field">
              <label htmlFor="f-nombre">Tu nombre</label>
              <input id="f-nombre" required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="María Hernández" />
            </div>
            <div className="field">
              <label htmlFor="f-whats">WhatsApp</label>
              <input id="f-whats" type="tel" required value={form.whats} onChange={(e) => setForm({ ...form, whats: e.target.value })} placeholder="722 000 0000" />
            </div>
            <div className="row2">
              <div className="field">
                <label htmlFor="f-zona">Zona</label>
                <select id="f-zona" required value={form.zona} onChange={(e) => setForm({ ...form, zona: e.target.value })}>
                  <option value="">Selecciona</option>
                  <option>Toluca Centro</option>
                  <option>Metepec</option>
                  <option>San Mateo Atenco</option>
                  <option>Lerma / Ocoyoacac</option>
                  <option>Otra</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-estilo">Estilo de cocina</label>
                <select id="f-estilo" required value={form.estilo} onChange={(e) => setForm({ ...form, estilo: e.target.value })}>
                  <option value="">Selecciona</option>
                  <option>Minimalista</option>
                  <option>Clásico</option>
                  <option>Moderno</option>
                  <option>Rústico</option>
                  <option>Aún no lo decido</option>
                </select>
              </div>
            </div>
            <div className="submit-row">
              <button type="submit" className="btn btn-orange">Quiero mi cotización {I.arrow()}</button>
              <span className="small">o llámanos al <a href="tel:+527223183942" style={{ color: 'var(--orange-soft)' }}>722 318 3942</a></span>
            </div>
            <span className="small">Tus datos solo se usan para contactarte sobre tu cotización. Cero spam.</span>
          </form> :

        <div className="form-success">
            <div className="check">{I.check()}</div>
            <h3>¡Recibimos tu solicitud, {form.nombre.split(' ')[0] || 'gracias'}!</h3>
            <p>Te contactamos al WhatsApp <strong style={{ color: 'var(--orange-soft)' }}>{form.whats}</strong> antes de 24 horas hábiles. Mientras tanto, puedes seguirnos en Instagram para ver proyectos recientes.</p>
            <a href="https://instagram.com/cocinascocinas21" target="_blank" rel="noopener" className="btn btn-orange" style={{ marginTop: 20 }}>{I.ig()} @cocinascocinas21</a>
          </div>
        }
      </div>
    </section>);

}

function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <img src="assets/logo-mark.svg" alt="Cocinas y Cocinas" />
            <p>
              Cocinas integrales de diseño a medida en Toluca y San Mateo Atenco. En el corazón de tu hogar desde 2005.
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
              <a href="https://instagram.com/cocinascocinas21" target="_blank" rel="noopener">{I.ig()}</a>
              <a href="https://facebook.com/Cocinas-Cocinas-296995724578621" target="_blank" rel="noopener">{I.fb()}</a>
            </div>
          </div>
          <div className="foot-col">
            <h4>Servicios</h4>
            <ul>
              <li><a href="#servicios">Cocinas integrales</a></li>
              <li><a href="#servicios">Closets a medida</a></li>
              <li><a href="#servicios">Cubiertas premium</a></li>
              <li><a href="#servicios">Muebles especiales</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Toluca · Pino Suárez</h4>
            <ul>
              <li><span style={{ fontSize: 13, opacity: .85 }}>Blvr. Pino Suárez 905<br />Toluca, Edomex</span></li>
              <li><a href="tel:+527223183942">722 318 3942</a></li>
              <li><a href="tel:+527221670575">722 167 0575</a></li>
              <li><a href={WA_TOLUCA} target="_blank" rel="noopener">WhatsApp Toluca</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>San Mateo Atenco</h4>
            {/* CP por verificar con cliente: 94133 atípico para San Mateo Atenco */}
            <ul>
              <li><span style={{ fontSize: 13, opacity: .85 }}>Juárez #601, B. de la Concepción<br />San Mateo Atenco · 94133</span></li>
              <li><a href="tel:+527227063545">722 706 3545</a></li>
              <li><a href={WA_ATENCO} target="_blank" rel="noopener">WhatsApp Atenco</a></li>
              <li><a href="mailto:cocinasycocinastoluca@hotmail.com">cocinasycocinastoluca@hotmail.com</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <div>© 2005–2026 Cocinas &amp; Cocinas®. Todos los derechos reservados.</div>
          <div className="legal">
            <a href="#">Aviso de privacidad</a>
            <a href="#">Términos</a>
          </div>
        </div>
      </div>
    </footer>);

}

function StickyWA() {
  return (
    <a className="wa-fab" href={WA_URL} target="_blank" rel="noopener" aria-label="WhatsApp">
      {I.wa()} <span className="lab">WhatsApp</span>
    </a>);

}

function Lightbox({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => {if (e.key === 'Escape') onClose();};
    if (item) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [item, onClose]);
  if (!item) return null;
  return (
    <div className="lightbox" onClick={onClose}>
      <button className="close" onClick={onClose} aria-label="Cerrar">×</button>
      <img src={item.img.replace('w=900', 'w=1600')} alt="" />
    </div>);

}

function App() {
  const [lightbox, setLightbox] = useState(null);
  return (
    <>
      <TopBar />
      <Nav />
      <Hero />
      <Stats />
      <Differentiator />
      <Benefits />
      <Services />
      <Gallery onOpen={setLightbox} />
      <About />
      <SocialProof />
      <FAQ />
      <Locations />
      <Contact />
      <Footer />
      <StickyWA />
      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
    </>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);