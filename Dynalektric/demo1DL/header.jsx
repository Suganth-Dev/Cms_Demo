/* header.jsx — shared site header and mobile drawer */

const NAV_LINKS = [
  { id: 'home',       label: 'Home',                        href: './dynalektric.html?site=dynalektric' },
  { id: 'about',      label: 'About',                       href: './dynalektric.html?site=dynalektric&page=about' },
  { id: 'products',   label: 'Products & Solutions',        href: './dynalektric.html?site=dynalektric&page=products' },
  { id: 'rnd',        label: 'Innovation Portfolio',         href: './dynalektric.html?site=dynalektric&page=rnd' },
  { id: 'industries', label: 'Industries & Applications',   href: './dynalektric.html?site=dynalektric&page=industries' },
  { id: 'export',     label: 'Export',                      href: './dynalektric.html?site=dynalektric&page=export' },
  { id: 'contact',    label: 'Contact',                     href: './dynalektric.html?site=dynalektric&page=contact' },
];

function Header({ currentPage = 'home', navigate = window.__navigate }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setDrawerOpen(false);
    navigate(id);
  };

  return (
    <>
      <header className="topbar" role="banner">
        <div className="topbar-inner">
          <a className="topbar-logo" href="./dynalektric.html?site=dynalektric" onClick={(e) => handleNavClick(e, 'home')} aria-label="Dynalektric home">
            <img src={(window.__resources && window.__resources.dynaLogo) || "Dynalektric/demo1DL/assets/dynalektric-logo.png"} alt="Dynalektric, Power Motion Safety" width="350" height="150" />
          </a>
          <nav className="topbar-nav" aria-label="Main navigation">
            {NAV_LINKS.map(n => (
              <a
                key={n.id}
                className="nav-link"
                href={n.href}
                onClick={(e) => handleNavClick(e, n.id)}
                aria-current={currentPage === n.id ? 'page' : undefined}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="topbar-cta">
            <a className="btn btn-primary" href="./contact.html" style={{ padding: '12px 22px' }} aria-label="Submit RFQ on contact page">
              Submit RFQ <span className="arrow" aria-hidden="true">→</span>
            </a>
            <button className="menu-btn" onClick={() => setDrawerOpen(true)} aria-label="Open menu">Menu</button>
          </div>
        </div>
      </header>

      <div className={`mobile-drawer ${drawerOpen ? 'is-open' : ''}`} role="dialog" aria-label="Mobile navigation" aria-hidden={!drawerOpen}>
        <button className="menu-btn close-btn" onClick={() => setDrawerOpen(false)} aria-label="Close menu">Close</button>
        {NAV_LINKS.map(n => (
          <a
            key={n.id}
            className="nav-link"
            href={n.href}
            onClick={(e) => handleNavClick(e, n.id)}
            aria-current={currentPage === n.id ? 'page' : undefined}
          >
            {n.label}
          </a>
        ))}
        <a className="btn btn-primary" href="./dynalektric.html?site=dynalektric&page=contact" onClick={(e) => handleNavClick(e, 'contact')} style={{ marginTop: 24, alignSelf: 'flex-start' }}>
          Submit RFQ <span className="arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </>
  );
}

window.Header = Header;
