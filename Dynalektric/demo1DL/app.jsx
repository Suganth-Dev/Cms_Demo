/* app.jsx — Dynalektric SPA shell */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": 0,
  "typography": "sohne",
  "heroVariant": 0,
  "texture": "clean",
  "density": "comfortable"
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = [
  ['#0077B6', '#003366'], // ocean blue + deep navy (default)
  ['#003366', '#0077B6'], // deep navy led
  ['#002A52', '#0077B6'], // ink navy + ocean blue
  ['#005F92', '#003366'], // hover blue + deep navy
];

const PAGE_URLS = {
  home:       './Dynalektric.html',
  about:      './about.html',
  products:   './products-solutions.html',
  rnd:        './innovation-rd.html',
  industries: './industries-applications.html',
  export:     './export.html',
  contact:    './contact.html',
};

const urlPage = new URLSearchParams(window.location.search).get('page');
const initialPage = urlPage || document.body.dataset.page || 'home';
const initialFocusId = new URLSearchParams(window.location.search).get('focus') || null;

// Global fallback, overridden by App
window.__navigate = (id, focus = null) => {
  let url = `./dynalektric.html?site=dynalektric&page=${id}`;
  if (focus) url += `&focus=${encodeURIComponent(focus)}`;
  window.location.href = url;
};

/* SEO metadata per route — kept for reference, no longer called at runtime */
const PAGE_META = {
  home: {
    title: 'Dynalektric | Industrial Engineering and Manufacturing Solutions',
    description: 'Explore Dynalektric\'s engineering, manufacturing, testing and application capabilities across mobility, energy, utilities, infrastructure and industrial sectors.',
    path: '/',
  },
  about: {
    title: 'About Dynalektric | Engineering and Manufacturing Capability',
    description: 'Learn about Dynalektric\'s engineering teams, manufacturing capability, facilities, testing processes and experience across industrial applications.',
    path: '/about.html',
  },
  products: {
    title: 'Products and Solutions | Dynalektric',
    description: 'Explore Dynalektric solutions across magnetics, control panel assemblies, power electronics systems and integrated electrical components.',
    path: '/products-solutions.html',
  },
  rnd: {
    title: 'Innovation Portfolio | Dynalektric Engineering and R&D',
    description: 'Explore Dynalektric\'s innovation, engineering and product development capability from feasibility and design through prototyping, testing and production.',
    path: '/innovation-rd.html',
  },
  industries: {
    title: 'Industries and Applications | Dynalektric',
    description: 'Discover Dynalektric applications across railways, renewable energy, power, heavy industries, material handling, warehousing and data centres.',
    path: '/industries-applications.html',
  },
  export: {
    title: 'Export Capability and Global Delivery | Dynalektric',
    description: 'Learn how Dynalektric supports international customers through engineering coordination, documentation, testing, packaging and export delivery.',
    path: '/export.html',
  },
  contact: {
    title: 'Contact Dynalektric | Discuss Your Engineering Requirement',
    description: 'Contact Dynalektric to discuss industrial engineering, manufacturing, product development, export or customised electrical system requirements.',
    path: '/contact.html',
  },
};

const SITE_ORIGIN = 'https://dynalektric.com';

/* updateDocumentMeta is retained for reference but no longer called —
   each HTML page now carries its own static SEO metadata as the source of truth. */
function updateDocumentMeta(pageId) {
  const meta = PAGE_META[pageId] || PAGE_META.home;
  document.title = meta.title;

  const setMeta = (selector, attr, value) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };
  setMeta('meta[name="description"]', 'content', meta.description);
  setMeta('meta[property="og:title"]', 'content', meta.title);
  setMeta('meta[property="og:description"]', 'content', meta.description);
  setMeta('meta[property="og:url"]', 'content', SITE_ORIGIN + meta.path);
  setMeta('meta[name="twitter:title"]', 'content', meta.title);
  setMeta('meta[name="twitter:description"]', 'content', meta.description);
  setMeta('link[rel="canonical"]', 'href', SITE_ORIGIN + meta.path);
}

function App() {
  const [page, setPage] = React.useState(initialPage);
  const [focus, setFocus] = React.useState(initialFocusId);
  const [isEditMode, setIsEditMode] = React.useState(
    new URLSearchParams(window.location.search).get('editMode') === 'true'
  );
  const tw = useTweaks(TWEAK_DEFAULTS);
  const t = tw.values;
  const setTweak = tw.set;

  const navigate = (id, focusId = null) => {
    const currentEditMode = new URLSearchParams(window.location.search).get('editMode');
    let url = `./dynalektric.html?site=dynalektric&page=${id}`;
    if (focusId) url += `&focus=${encodeURIComponent(focusId)}`;
    if (currentEditMode === 'true') url += `&editMode=true`;
    window.history.pushState({}, '', url);
    setPage(id);
    setFocus(focusId);
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    window.__navigate = navigate;
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const p = params.get('page') || 'home';
      const f = params.get('focus') || null;
      setPage(p);
      setFocus(f);
      setIsEditMode(params.get('editMode') === 'true');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigate]);

  // Listen for editMode changes from the parent builder via postMessage
  React.useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'SET_EDIT_MODE') {
        setIsEditMode(event.data.editMode === true);
      }
    };
    window.addEventListener('message', handleMessage);
    // Also check URL on mount (in case iframe already has editMode=true)
    setIsEditMode(new URLSearchParams(window.location.search).get('editMode') === 'true');
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Apply tweaks to body
  React.useEffect(() => {
    const accent = ACCENT_OPTIONS[t.accent] || ACCENT_OPTIONS[0];
    const root = document.documentElement;
    if (typeof t.accent === 'number') {
      root.style.setProperty('--accent', accent[0]);
      root.style.setProperty('--accent-2', accent[1]);
    } else if (typeof t.accent === 'string') {
      root.style.setProperty('--accent', t.accent);
    }
    document.body.dataset.texture = t.texture || 'clean';
    document.body.dataset.density = t.density || 'comfortable';

    // Typography — Montserrat only, single family across the site
    root.style.setProperty('--font-display', "'Montserrat', 'Helvetica Neue', Arial, sans-serif");
    root.style.setProperty('--font-body', "'Montserrat', 'Helvetica Neue', Arial, sans-serif");
    root.style.setProperty('--font-mono', "'Montserrat', 'Helvetica Neue', Arial, sans-serif");
  }, [t.accent, t.texture, t.density]);

  const renderPage = () => {
    const handleInlineEdit = (pageName, key, value) => {
      if (isEditMode && window.parent) {
        window.parent.postMessage({ type: 'INLINE_EDIT', page: pageName, key, value }, '*');
      }
    };
    
    const handleInlineFileUpload = (pageName, key, accept) => {
      if (!isEditMode || !window.parent) return;
      
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = accept;
      
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (ev) => {
          window.parent.postMessage({
            type: 'INLINE_FILE_UPLOAD',
            page: pageName,
            key: key,
            fileData: ev.target.result,
            fileName: file.name,
            fileType: file.type
          }, '*');
        };
        reader.readAsDataURL(file);
      };
      
      input.click();
    };

    const handleInlineProductEdit = (productId, key, value) => {
      if (isEditMode && window.parent) {
        window.parent.postMessage({ type: 'INLINE_PRODUCT_EDIT', productId, key, value }, '*');
      }
    };

    const handleInlineProductFileUpload = (productId) => {
      if (!isEditMode || !window.parent) return;
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          window.parent.postMessage({
            type: 'INLINE_PRODUCT_FILE_UPLOAD',
            productId: productId,
            fileData: ev.target.result,
            fileName: file.name,
            fileType: file.type
          }, '*');
        };
        reader.readAsDataURL(file);
      };
      input.click();
    };

    const handleInlineAddProduct = (category) => {
      if (isEditMode && window.parent) {
        window.parent.postMessage({ type: 'INLINE_ADD_PRODUCT', category }, '*');
      }
    };

    const handleInlineOpenEditModal = (productId) => {
      if (isEditMode && window.parent) {
        window.parent.postMessage({ type: 'INLINE_OPEN_EDIT_MODAL', productId }, '*');
      }
    };

    const handleInlineDeleteProduct = (productId) => {
      if (isEditMode && window.parent) {
        window.parent.postMessage({ type: 'INLINE_DELETE_PRODUCT', productId }, '*');
      }
    };

    const props = { navigate, focusId: focus, tweaks: t, isEditMode, handleInlineEdit, handleInlineFileUpload, handleInlineProductEdit, handleInlineProductFileUpload, handleInlineAddProduct, handleInlineOpenEditModal, handleInlineDeleteProduct };
    switch (page) {
      case 'home':       return <PageHome {...props} />;
      case 'about':      return <PageAbout {...props} />;
      case 'products':   return <PageProducts {...props} />;
      case 'industries': return <PageIndustries {...props} />;
      case 'rnd':        return <PageRnd {...props} />;
      case 'export':     return <PageExport {...props} />;
      case 'contact':    return <PageContact {...props} />;
      default:           return <PageHome {...props} />;
    }
  };

  return (
    <>
      <Header currentPage={page} navigate={navigate} />
      {renderPage()}
      <DynaTweaksPanel t={t} setTweak={setTweak} />
    </>
  );
}

function DynaTweaksPanel({ t, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Accent palette">
        <TweakColor
          label="Accent pair"
          value={typeof t.accent === 'number' ? t.accent : 0}
          options={ACCENT_OPTIONS}
          onChange={v => setTweak('accent', v)}
        />
      </TweakSection>

      <TweakSection title="Background texture">
        <TweakRadio
          label="Surface"
          value={t.texture}
          options={[
            { label: 'Clean', value: 'clean' },
            { label: 'Grid', value: 'grid' },
            { label: 'Dots', value: 'dots' },
          ]}
          onChange={v => setTweak('texture', v)}
        />
      </TweakSection>

      <TweakSection title="Density">
        <TweakRadio
          label="Spacing"
          value={t.density}
          options={[
            { label: 'Comfortable', value: 'comfortable' },
            { label: 'Compact', value: 'compact' },
          ]}
          onChange={v => setTweak('density', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));

function renderApp() {
  root.render(<App />);
}

if (window.CMS_DYNA_READY) {
  renderApp();
} else {
  // Option to render a loading state first
  root.render(<div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>Loading Dynalektric...</div>);
  window.addEventListener('cms-dyna-ready', renderApp);
}
