const fs = require('fs');
let code = fs.readFileSync('app.jsx', 'utf8');

// 1. Add GlobalStyles
code = code.replace('};\n\nfunction Nav() {', `};

function GlobalStyles() {
  return (
    <style>
      {\`
        @media (max-width: 768px) {
          .hide-sm { display: none !important; }
          .stack-sm { grid-template-columns: 1fr !important; display: flex !important; flex-direction: column !important; gap: 40px !important; }
          .pad-sm { padding: 60px 24px !important; }
          .pad-hero-sm { padding: 0 24px !important; }
          .nav-sm { padding: 16px 24px !important; }
          .footer-pad-sm { padding: 40px 24px !important; }
          .loc-card-sm { padding: 32px 24px !important; }
        }
      \`}
    </style>
  );
}

function Nav() {`);

// 2. Nav
code = code.replace('<nav style={navStyles}>', '<nav style={navStyles} className="nav-sm">');

// 3. Hero
code = code.replace(
  '<section id="hero" style={{ position: \'sticky\', top: 0, zIndex: 0, height: \'100vh\', minHeight: 700, display: \'flex\', alignItems: \'center\', padding: \'0 48px\', overflow: \'hidden\' }}>',
  '<section id="hero" style={{ position: \'sticky\', top: 0, zIndex: 0, height: \'100vh\', minHeight: 700, display: \'flex\', alignItems: \'center\', padding: \'0 48px\', overflow: \'hidden\' }} className="pad-hero-sm">'
);

// 4. Manifiesto
code = code.replace(
  '<section id="manifiesto" style={{ position: \'relative\', zIndex: 10, padding: \'120px 48px\', background: \'white\', boxShadow: \'0 -24px 64px rgba(0,0,0,0.2)\' }}>',
  '<section id="manifiesto" style={{ position: \'relative\', zIndex: 10, padding: \'120px 48px\', background: \'white\', boxShadow: \'0 -24px 64px rgba(0,0,0,0.2)\' }} className="pad-sm">'
);
code = code.replace(
  '<div style={{ maxWidth: 1200, margin: \'0 auto\', display: \'grid\', gridTemplateColumns: \'1fr 1.2fr\', gap: 80, alignItems: \'center\' }}>',
  '<div style={{ maxWidth: 1200, margin: \'0 auto\', display: \'grid\', gridTemplateColumns: \'1fr 1.2fr\', gap: 80, alignItems: \'center\' }} className="stack-sm">'
);

// 5. Gallery
code = code.replace(
  '<section id="proyectos" style={{ padding: \'120px 48px\', background: \'var(--cream)\' }}>',
  '<section id="proyectos" style={{ padding: \'120px 48px\', background: \'var(--cream)\' }} className="pad-sm">'
);

// 6. Proceso
code = code.replace(
  '<section style={{ padding: \'120px 48px\', background: \'white\' }}>',
  '<section style={{ padding: \'120px 48px\', background: \'white\' }} className="pad-sm">'
);

// 7. Testimonial
code = code.replace(
  '<section style={{ position: \'relative\', padding: \'160px 48px\', color: \'white\', display: \'flex\', alignItems: \'center\', justifyContent: \'center\', textAlign: \'center\' }}>',
  '<section style={{ position: \'relative\', padding: \'160px 48px\', color: \'white\', display: \'flex\', alignItems: \'center\', justifyContent: \'center\', textAlign: \'center\' }} className="pad-sm">'
);

// 8. FAQSection
code = code.replace(
  '<section style={{ padding: \'120px 48px\', background: \'var(--cream)\', color: \'var(--ink)\' }}>',
  '<section style={{ padding: \'120px 48px\', background: \'var(--cream)\', color: \'var(--ink)\' }} className="pad-sm">'
);
code = code.replace(
  '<div style={{ maxWidth: 1200, margin: \'0 auto\', display: \'grid\', gridTemplateColumns: \'1fr 1.5fr\', gap: 80 }}>',
  '<div style={{ maxWidth: 1200, margin: \'0 auto\', display: \'grid\', gridTemplateColumns: \'1fr 1.5fr\', gap: 80 }} className="stack-sm">'
);

// 9. Locations
code = code.replace(
  '<section style={{ padding: \'120px 48px\', background: \'var(--cream-2)\' }}>',
  '<section style={{ padding: \'120px 48px\', background: \'var(--cream-2)\' }} className="pad-sm">'
);
code = code.replace(
  '<div style={{ maxWidth: 1200, margin: \'0 auto\', display: \'grid\', gridTemplateColumns: \'repeat(auto-fit, minmax(400px, 1fr))\', gap: 40 }}>',
  '<div style={{ maxWidth: 1200, margin: \'0 auto\', display: \'grid\', gridTemplateColumns: \'repeat(auto-fit, minmax(280px, 1fr))\', gap: 40 }}>'
);
code = code.replaceAll( // There are multiple
  '<div style={{ padding: 48, position: \'relative\' }}>',
  '<div style={{ padding: 48, position: \'relative\' }} className="loc-card-sm">'
);

// 10. Footer
code = code.replace(
  '<div style={{ display: \'grid\', gridTemplateColumns: \'1.2fr 1fr\', minHeight: 600 }}>',
  '<div style={{ display: \'grid\', gridTemplateColumns: \'1.2fr 1fr\', minHeight: 600 }} className="stack-sm">'
);
code = code.replace(
  '<div style={{ padding: \'120px 80px\', display: \'flex\', flexDirection: \'column\', justifyContent: \'center\', background: \'var(--ink)\' }}>',
  '<div style={{ padding: \'120px 80px\', display: \'flex\', flexDirection: \'column\', justifyContent: \'center\', background: \'var(--ink)\' }} className="footer-pad-sm">'
);
code = code.replace(
  '<div style={{ padding: \'120px 80px\', display: \'flex\', flexDirection: \'column\', justifyContent: \'center\' }}>',
  '<div style={{ padding: \'120px 80px\', display: \'flex\', flexDirection: \'column\', justifyContent: \'center\' }} className="footer-pad-sm">'
);
code = code.replace(
  '<div style={{ padding: \'40px 80px\', borderTop: \'1px solid rgba(255,255,255,0.1)\', display: \'flex\', justifyContent: \'space-between\', alignItems: \'center\', flexWrap: \'wrap\', gap: 24, background: \'var(--ink)\' }}>',
  '<div style={{ padding: \'40px 80px\', borderTop: \'1px solid rgba(255,255,255,0.1)\', display: \'flex\', justifyContent: \'space-between\', alignItems: \'center\', flexWrap: \'wrap\', gap: 24, background: \'var(--ink)\' }} className="footer-pad-sm">'
);

// 11. App
code = code.replace(
  'function App() {\n  return (\n    <>\n      <Nav />',
  'function App() {\n  return (\n    <>\n      <GlobalStyles />\n      <Nav />'
);

fs.writeFileSync('app.jsx', code);
console.log('Done!');
