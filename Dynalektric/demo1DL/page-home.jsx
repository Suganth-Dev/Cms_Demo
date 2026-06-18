/* page-home.jsx */

/* ============================================================
   Capability flip carousel (Home — "What we engineer")
   ============================================================ */
const FALLBACK_CAPABILITIES = [
  {
    num: '01', productId: 'magnetics', slotId: 'cap-magnetics',
    resKey: 'cardMagnetics', img: 'Dynalektric/demo1DL/assets/card-magnetics.jpg',
    title: 'Power Transformation and Magnetics',
    back: 'Transformers, reactors and magnetic components engineered for power conversion, distribution, harmonic control and specialised industrial applications.',
    labels: ['Application-specific engineering', 'Manufacturing and testing', 'Industrial and infrastructure use'],
    cta: 'Explore Magnetics',
    imgPlaceholder: 'Replace with Dynalektric Magnetics manufacturing image',
    imgAlt: 'Industrial transformer manufacturing at Dynalektric',
  },
  {
    num: '02', productId: 'control-panels', slotId: 'cap-control',
    resKey: 'cardControl', img: 'Dynalektric/demo1DL/assets/card-control.jpg',
    title: 'Control, Distribution and Panel Engineering',
    back: 'Panel and distribution assemblies developed around control, operating, safety and application requirements for railway, power and industrial equipment.',
    labels: ['Control integration', 'Assembly and wiring', 'Testing and documentation'],
    cta: 'Explore Panel Engineering',
    imgPlaceholder: 'Replace with Dynalektric Panel Engineering image',
    imgAlt: 'Electrical control panel assembly at Dynalektric',
  },
  {
    num: '03', productId: 'power-electronics', slotId: 'cap-power',
    resKey: 'cardPower', img: 'Dynalektric/demo1DL/assets/card-power.jpg',
    title: 'DC Power and Electronic Systems',
    back: 'DC power, charging and electronic systems configured for equipment duty, operational environments and specialised industrial applications.',
    labels: ['Duty-specific design', 'Power conversion', 'Validation and testing'],
    cta: 'Explore Power Electronics',
    imgPlaceholder: 'Replace with Dynalektric Power Electronics image',
    imgAlt: 'Battery charger and power electronics assembly at Dynalektric',
  },
  {
    num: '04', productId: 'cross-segment', slotId: 'cap-integrated',
    resKey: 'cardIntegrated', img: 'Dynalektric/demo1DL/assets/card-integrated.jpg',
    title: 'Integrated Components and Assemblies',
    back: 'Supporting electrical and electronic components integrated into railway, power, equipment and cross-sector industrial systems.',
    labels: ['Component integration', 'Custom assemblies', 'Cross-sector applications'],
    cta: 'Explore Integrated Solutions',
    imgPlaceholder: 'Replace with Dynalektric Integrated Components image',
    imgAlt: 'Dynalektric technician assembling integrated electrical components',
  },
];

const normalizeUrl = (url) => url?.startsWith('assets/') ? `Dynalektric/demo1DL/${url}` : url;

const getCapabilitiesData = () => {
  return (window.CMS_DYNA_DATA && window.CMS_DYNA_DATA.capabilities && window.CMS_DYNA_DATA.capabilities.length > 0) ? 
    window.CMS_DYNA_DATA.capabilities.map((c, i) => ({
      num: String(i + 1).padStart(2, '0'),
      productId: c.id,
      slotId: `cap-${i}`,
      resKey: `cap-${i}`,
      img: normalizeUrl(c.image_url) || 'Dynalektric/demo1DL/assets/card-magnetics.jpg',
      title: c.title,
      back: c.description || '',
      labels: (typeof c.features === 'string' ? JSON.parse(c.features || '[]') : c.features) || [],
      cta: (() => {
        try {
          const specs = typeof c.specifications === 'string' ? JSON.parse(c.specifications || '{}') : c.specifications;
          return (specs && specs.cta) ? specs.cta : 'Explore Capability';
        } catch(e) { return 'Explore Capability'; }
      })(),
      imgPlaceholder: 'Capability image',
      imgAlt: c.title
    })) : FALLBACK_CAPABILITIES;
};

function FlipCard({ cap, navigate, isEditMode, handleInlineProductEdit, handleInlineProductFileUpload, handleInlineOpenEditModal, handleInlineDeleteProduct }) {
  const [flipped, setFlipped] = React.useState(false);
  const frontBtnRef = React.useRef(null);
  const backBtnRef = React.useRef(null);

  // Move focus to the newly-revealed face's control for keyboard users.
  React.useEffect(() => {
    if (flipped) { backBtnRef.current && backBtnRef.current.focus(); }
  }, [flipped]);

  return (
    <div className="capcar-card">
      <div className="flip-inner" data-flipped={flipped}>
        {/* FRONT */}
        <div className="flip-face flip-front" aria-hidden={flipped} inert={flipped ? '' : undefined}>
          <image-slot
            id={`home-${cap.slotId}`}
            src={(window.__resources && window.__resources[cap.resKey]) || cap.img}
            fit="cover"
            position="50% 50%"
            placeholder={cap.imgPlaceholder}
            aria-label={cap.imgAlt}
            shape="rect"
          ></image-slot>
          {isEditMode && (
              <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10, display: 'flex', gap: '8px' }}>
                <button
                  className="btn btn-sm btn-ghost"
                  style={{ background: 'rgba(0,0,0,0.6)', color: 'white', padding: '4px 10px', fontSize: '12px', border: '1px solid rgba(255,255,255,0.2)' }}
                  onClick={(e) => { e.stopPropagation(); handleInlineOpenEditModal && handleInlineOpenEditModal(cap.productId); }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-ghost"
                  style={{ background: 'rgba(220,38,38,0.8)', color: 'white', padding: '4px 10px', fontSize: '12px', border: '1px solid rgba(255,255,255,0.2)' }}
                  onClick={(e) => { e.stopPropagation(); handleInlineDeleteProduct && handleInlineDeleteProduct(cap.productId); }}
                >
                  Delete
                </button>
              </div>
            )}
          <div className="flip-front-scrim"></div>
          <div className="flip-front-top">
            <span className="flip-front-num">{cap.num} / 04</span>
            <span className="flip-front-ind"><span className="pulse"></span>Capability</span>
          </div>
          <div className="flip-front-foot">
            <h3
              contentEditable={isEditMode} 
              suppressContentEditableWarning={true} 
              onBlur={(e) => handleInlineProductEdit && handleInlineProductEdit(cap.productId, 'title', e.currentTarget.innerText)}
              className={isEditMode ? 'inline-editable' : ''}
            >{cap.title}</h3>
            <button
              ref={frontBtnRef}
              type="button"
              className="flip-trigger"
              aria-expanded={flipped}
              aria-label={`Show details for ${cap.title}`}
              onClick={() => setFlipped(true)}
            >
              Click to explore <span className="arrow">↻</span>
            </button>
          </div>
        </div>

        {/* BACK */}
        <div className="flip-face flip-back" aria-hidden={!flipped} inert={!flipped ? '' : undefined}>
          <span className="flip-back-num">{cap.num} / 04</span>
          <h3
              contentEditable={isEditMode} 
              suppressContentEditableWarning={true} 
              onBlur={(e) => handleInlineProductEdit && handleInlineProductEdit(cap.productId, 'title', e.currentTarget.innerText)}
              className={isEditMode ? 'inline-editable' : ''}
          >{cap.title}</h3>
          <p className={`flip-back-text ${isEditMode ? 'inline-editable' : ''}`}
              contentEditable={isEditMode} 
              suppressContentEditableWarning={true} 
              onBlur={(e) => handleInlineProductEdit && handleInlineProductEdit(cap.productId, 'description', e.currentTarget.innerText)}
          >{cap.back}</p>
          <div className="flip-back-labels">
            {cap.labels.map(l => <span className="lbl" key={l}>{l}</span>)}
          </div>
          <div className="flip-back-foot">
            <button
              type="button"
              className="flip-cta"
              onClick={() => navigate('products', cap.productId)}
            >
              {cap.cta} <span className="arrow">→</span>
            </button>
            <button
              ref={backBtnRef}
              type="button"
              className="flip-flipback"
              aria-label={`Show image for ${cap.title}`}
              onClick={() => { setFlipped(false); frontBtnRef.current && frontBtnRef.current.focus(); }}
            >
              <span aria-hidden="true">←</span> Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CapabilityCarousel({ navigate, isEditMode, handleInlineProductEdit, handleInlineProductFileUpload, handleInlineAddProduct, handleInlineOpenEditModal, handleInlineDeleteProduct }) {
  const capsData = getCapabilitiesData();
  const actualTotal = capsData.length;
  const displayTotal = isEditMode ? actualTotal + 1 : actualTotal;
  const [index, setIndex] = React.useState(0);
  const [perPage, setPerPage] = React.useState(2);
  const trackRef = React.useRef(null);
  const [tx, setTx] = React.useState(0);

  // Responsive cards-per-view. <=720px is the stacked mobile layout (no transform).
  React.useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w <= 720) setPerPage(0);          // stacked
      else if (w <= 1080) setPerPage(1);    // tablet, one card + peek
      else setPerPage(2);                   // desktop, two cards + peek
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  const maxIndex = perPage === 0 ? 0 : Math.max(0, displayTotal - perPage);

  // Clamp index when layout changes.
  React.useEffect(() => {
    setIndex(i => Math.min(i, maxIndex));
  }, [maxIndex]);

  // Measure step (card width + gap) and translate accordingly.
  React.useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track || perPage === 0) { setTx(0); return; }
      const card = track.children[0];
      if (!card) return;
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
      const step = card.getBoundingClientRect().width + gap;
      setTx(-(index * step));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [index, perPage]);

  const stacked = perPage === 0;
  const atStart = index <= 0;
  const atEnd = index >= maxIndex;

  return (
    <div className="capcar">
      <div className="capcar-viewport">
        <div
          className="capcar-track"
          ref={trackRef}
          style={{ transform: stacked ? 'none' : `translateX(${tx}px)` }}
        >
          {capsData.map(cap => (
            <FlipCard key={cap.productId} cap={cap} navigate={navigate} isEditMode={isEditMode} handleInlineProductEdit={handleInlineProductEdit} handleInlineProductFileUpload={handleInlineProductFileUpload} handleInlineOpenEditModal={handleInlineOpenEditModal} handleInlineDeleteProduct={handleInlineDeleteProduct} />
          ))}
          {isEditMode && (
            <div className="capcar-card add-card-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--rule)', borderRadius: '12px', minHeight: '320px', cursor: 'pointer' }} onClick={() => handleInlineAddProduct && handleInlineAddProduct('Capability')}>
              <div style={{ textAlign: 'center', color: 'var(--on-bg-alt)' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>+</div>
                <div>Add Capability</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="capcar-controls">
        <div className="capcar-arrows">
          <button
            type="button"
            className="capcar-arrow"
            aria-label="Previous capability"
            disabled={atStart}
            onClick={() => setIndex(i => Math.max(0, i - 1))}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button
            type="button"
            className="capcar-arrow"
            aria-label="Next capability"
            disabled={atEnd}
            onClick={() => setIndex(i => Math.min(maxIndex, i + 1))}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
        <div className="capcar-count" aria-live="polite">
          <b>{String(Math.min(index + 1, actualTotal)).padStart(2, '0')}</b> / {String(actualTotal).padStart(2, '0')}
        </div>
        <div className="capcar-foot">
          <button className="btn btn-ghost" onClick={() => navigate('products')}>
            Explore all products and solutions →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Industry stage (Home — "Industries and applications")
   One large, visitor-controlled image stage. Manual only, no autoplay.
   ============================================================ */
const FALLBACK_HOME_INDUSTRIES = [
  {
    id: 'railways', num: '01', name: 'Railway & Traction',
    img: 'Dynalektric/demo1DL/assets/industry-railways.jpg', resKey: 'indRailways',
    desc: 'Electrical and electronic systems supporting onboard, trackside and railway equipment applications.',
    labels: ['Traction equipment', 'Onboard systems', 'Control and auxiliary power'],
    cta: 'Explore Railway Applications',
    placeholder: 'Replace with approved Dynalektric Railway application image',
    alt: 'Modern electric railway and traction infrastructure',
  },
  {
    id: 'renewables', num: '02', name: 'Renewable Sectors',
    img: 'Dynalektric/demo1DL/assets/industry-renewables.jpg', resKey: 'indRenewables',
    desc: 'Magnetics, reactors and power systems supporting conversion, grid integration and renewable-energy infrastructure.',
    labels: ['Solar and wind', 'Grid integration', 'Energy conversion'],
    cta: 'Explore Renewable Applications',
    placeholder: 'Replace with approved Dynalektric Renewable application image',
    alt: 'Renewable energy infrastructure with solar, wind and electrical systems',
  },
  {
    id: 'powergrid', num: '03', name: 'Power & Utilities',
    img: 'Dynalektric/demo1DL/assets/industry-powergrid.jpg', resKey: 'indPowergrid',
    desc: 'Power conversion, distribution and control solutions supporting utilities, EPC contractors and infrastructure projects.',
    labels: ['Power distribution', 'Utility systems', 'EPC projects'],
    cta: 'Explore Power Applications',
    placeholder: 'Replace with approved Dynalektric Power & Utilities image',
    alt: 'Power utility substation and electrical transmission infrastructure',
  },
  {
    id: 'heavy', num: '04', name: 'Heavy Industries',
    img: 'Dynalektric/demo1DL/assets/industry-heavy.jpg', resKey: 'indHeavy',
    desc: 'Electrical, magnetic and control solutions developed for demanding process and heavy-equipment environments.',
    labels: ['Steel and cement', 'Mining', 'Process industries'],
    cta: 'Explore Heavy Industry Applications',
    placeholder: 'Replace with approved Dynalektric Heavy Industries image',
    alt: 'Heavy industrial steel manufacturing and process equipment',
  },
  {
    id: 'mhe', num: '05', name: 'Material Handling & Warehousing',
    img: 'Dynalektric/demo1DL/assets/industry-mhe.jpg', resKey: 'indMhe',
    desc: 'Charging, power electronics and control systems supporting forklifts, AGVs and warehouse equipment.',
    labels: ['Forklifts', 'AGVs', 'Charging systems'],
    cta: 'Explore Material Handling Applications',
    placeholder: 'Replace with approved Dynalektric Material Handling image',
    alt: 'Material handling and automated warehousing operations',
  },
  {
    id: 'datacenter', num: '06', name: 'Data Centers',
    img: 'Dynalektric/demo1DL/assets/industry-datacenter.jpg', resKey: 'indDatacenter',
    desc: 'Distribution, UPS interface and critical-power support for data-centre infrastructure and operational continuity.',
    labels: ['Critical power', 'UPS interface', 'Distribution systems'],
    cta: 'Explore Data Center Applications',
    placeholder: 'Replace with approved Dynalektric Data Center power image',
    alt: 'Modern data center with server and critical power infrastructure',
  },
];

function IndustryStage({ navigate, isEditMode, handleInlineOpenEditModal, handleInlineDeleteProduct, handleInlineAddProduct }) {
  const DB_INDUSTRIES = (window.CMS_DYNA_DATA && window.CMS_DYNA_DATA.industries) ? window.CMS_DYNA_DATA.industries : [];

  const HOME_INDUSTRIES = React.useMemo(() => {
    if (DB_INDUSTRIES && DB_INDUSTRIES.length > 0) {
      return DB_INDUSTRIES.map((ind, i) => {
        let parsedFeatures = [];
        if (typeof ind.features === 'string') {
          try { parsedFeatures = JSON.parse(ind.features); } catch(e) {}
        } else if (Array.isArray(ind.features)) {
          parsedFeatures = ind.features;
        }

        let parsedSpecs = {};
        if (typeof ind.specifications === 'string') {
          try { parsedSpecs = JSON.parse(ind.specifications); } catch(e) {}
        } else if (ind.specifications) {
          parsedSpecs = ind.specifications;
        }

        return {
          id: ind.id,
          name: ind.title,
          img: normalizeUrl(ind.image_url) || 'Dynalektric/demo1DL/assets/industry-heavy.jpg',
          resKey: `ind-${i}`,
          desc: ind.description || '',
          labels: parsedFeatures,
          cta: parsedSpecs.cta || 'Explore Industry',
          placeholder: 'Industry image',
          alt: ind.title,
          num: String(i + 1).padStart(2, '0')
        };
      });
    }

    // Fallback if DB is completely empty (before auto-seed completes)
    return FALLBACK_HOME_INDUSTRIES.map((item, i) => ({
      ...item,
      num: String(i + 1).padStart(2, '0')
    }));
  }, [DB_INDUSTRIES]);
  const total = HOME_INDUSTRIES.length;
  const [active, setActive] = React.useState(0);
  const [preview, setPreview] = React.useState(null);
  const tabRefs = React.useRef([]);
  const touch = React.useRef({ x: 0, y: 0 });

  const shown = preview != null ? preview : active;
  const ind = HOME_INDUSTRIES[shown];

  const select = (i) => { setActive(i); setPreview(null); };
  const go = (dir) => setActive(i => {
    const n = i + dir;
    if (n < 0 || n > total - 1) return i;
    setPreview(null);
    return n;
  });

  // Roving keyboard nav across the selector rail.
  const onRailKey = (e, i) => {
    let n = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = Math.min(total - 1, i + 1);
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = Math.max(0, i - 1);
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = total - 1;
    if (n != null) {
      e.preventDefault();
      select(n);
      const el = tabRefs.current[n];
      el && el.focus();
    }
  };

  const onTouchStart = (e) => {
    const t = e.changedTouches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
  };

  return (
    <div className="indstage">
      {/* Active image stage */}
      <div
        className="indstage-main"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {HOME_INDUSTRIES.map((it, i) => (
          <div className="indstage-img" data-active={i === shown} aria-hidden={i !== shown} key={it.id}>
            <image-slot
              id={`home-ind-${it.id}`}
              src={(window.__resources && window.__resources[it.resKey]) || it.img}
              fit="cover"
              position="50% 50%"
              placeholder={it.placeholder}
              aria-label={it.alt}
              shape="rect"
            ></image-slot>
          </div>
        ))}
        <div className="indstage-scrim"></div>

        <div className="indstage-content" key={shown} role="tabpanel" aria-live="polite">
          {isEditMode && (
            <div className="admin-inline-actions" style={{ position: 'absolute', top: '15px', right: '15px', zIndex: 100, display: 'flex', gap: '8px' }}>
              <button 
                className="admin-inline-btn" 
                onClick={() => handleInlineOpenEditModal(ind.id)}
                style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                Edit
              </button>
              <button
                className="btn btn-sm btn-ghost"
                style={{ background: 'rgba(220,38,38,0.8)', color: 'white', padding: '4px 10px', fontSize: '12px', border: '1px solid rgba(255,255,255,0.2)' }}
                onClick={(e) => { e.stopPropagation(); handleInlineDeleteProduct && handleInlineDeleteProduct(ind.id); }}
              >
                Delete
              </button>
            </div>
          )}
          {isEditMode && (ind.id === 'railways' || ind.id === 'renewables' || ind.id === 'powergrid' || ind.id === 'heavy' || ind.id === 'mhe' || ind.id === 'datacenter') && (
            <div style={{ position: 'absolute', top: '-10px', right: '0', zIndex: 10 }}>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>Fallback data (Add real entry to DB to edit)</span>
            </div>
          )}
          <span className="indstage-num mono">{ind.num} / {String(total).padStart(2, '0')}</span>
          <h3>{ind.name}</h3>
          <p>{ind.desc}</p>
          <div className="indstage-labels">
            {ind.labels.map(l => <span className="indstage-chip" key={l}>{l}</span>)}
          </div>
          <button
            type="button"
            className="indstage-explore"
            onClick={() => navigate('industries', ind.id)}
          >
            {ind.cta} <span className="arrow">→</span>
          </button>
        </div>
      </div>

      {/* Selector rail */}
      <div className="indstage-rail" role="tablist" aria-label="Select an industry">
        {HOME_INDUSTRIES.map((it, i) => (
          <button
            key={it.id}
            type="button"
            role="tab"
            id={`indtab-${it.id}`}
            ref={el => (tabRefs.current[i] = el)}
            className="ind-sel"
            aria-selected={active === i}
            tabIndex={active === i ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={e => onRailKey(e, i)}
            onMouseEnter={() => setPreview(i)}
            onMouseLeave={() => setPreview(null)}
          >
            <span className="ind-sel-bar" aria-hidden="true"></span>
            <span className="num">{it.num}</span>
            <span className="nm">{it.name}</span>
          </button>
        ))}
        {isEditMode && (
          <button
            type="button"
            className="ind-sel"
            style={{ borderTop: '1px dashed rgba(255,255,255,0.2)', marginTop: '8px', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}
            onClick={() => handleInlineAddProduct && handleInlineAddProduct('Industry')}
          >
            <span className="ind-sel-bar" aria-hidden="true" style={{ background: 'transparent' }}></span>
            <span className="num" style={{ fontSize: '18px' }}>+</span>
            <span className="nm">Add Industry</span>
          </button>
        )}
      </div>

      {/* Manual controls */}
      <div className="indstage-controls">
        <div className="indstage-arrows">
          <button
            type="button"
            className="indstage-arrow"
            aria-label="Previous industry"
            disabled={active <= 0}
            onClick={() => go(-1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button
            type="button"
            className="indstage-arrow"
            aria-label="Next industry"
            disabled={active >= total - 1}
            onClick={() => go(1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
        <div className="indstage-count" aria-hidden="true">
          <b>{String(active + 1).padStart(2, '0')}</b> / {String(total).padStart(2, '0')}
        </div>
        <div className="indstage-foot">
          <button className="btn btn-ghost indstage-allbtn" onClick={() => navigate('industries')}>
            Explore All Industries and Applications →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Hero — credibility-led cinematic video experience.
   Poster slot (user-fillable, swap for <video> when footage lands).
   A subtle Ken Burns drift stands in for the loop and is driven by the
   custom play/pause control. Reduced-motion holds it on the poster.
   ============================================================ */
function HeroVideo({ navigate, isEditMode, handleInlineEdit, handleInlineFileUpload }) {
  const [playing, setPlaying] = React.useState(true);
  const videoRef = React.useRef(null);
  
  const content = (window.CMS_DYNA_DATA && window.CMS_DYNA_DATA.settings && window.CMS_DYNA_DATA.settings.pageContent && window.CMS_DYNA_DATA.settings.pageContent.home) || {};
  const heroTitle = content.heroTitle || 'Engineering-led electrical and electronics manufacturing.';
  const heroDesc = content.heroDesc || 'In-house engineering, manufacturing and testing for infrastructure, mobility, energy and industrial applications.';
  const heroVideoUrl = content.heroVideo || './public/videos/Dynalektric_Hero.mp4';

  React.useEffect(() => {
    const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    const video = videoRef.current;

    const applyMotionPreference = () => {
      if (!video || !mq) return;

      if (mq.matches) {
        video.pause();
        setPlaying(false);
      } else {
        video.play()
          .then(() => setPlaying(true))
          .catch(() => setPlaying(false));
      }
    };

    applyMotionPreference();

    if (mq && typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', applyMotionPreference);
      return () => mq.removeEventListener('change', applyMotionPreference);
    }

    if (mq && typeof mq.addListener === 'function') {
      mq.addListener(applyMotionPreference);
      return () => mq.removeListener(applyMotionPreference);
    }
  }, []);

  const toggleVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (video.paused) {
        await video.play();
        setPlaying(true);
      } else {
        video.pause();
        setPlaying(false);
      }
    } catch (error) {
      console.error('Unable to control hero video:', error);
      setPlaying(false);
    }
  };

  return (
    <section className="hero-video" data-playing={playing} aria-label="Dynalektric engineering and manufacturing">
      <div className="hero-video-media">
        <video
          ref={videoRef}
          className="hero-video-element"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={(window.__resources && window.__resources.heroPoster) || 'Dynalektric/demo1DL/assets/hero-poster.jpg'}
          aria-label="Dynalektric factory, engineering and manufacturing"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={(event) => {
            console.error('Hero video failed to load:', event.currentTarget.currentSrc);
            setPlaying(false);
          }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: 'cover',
            objectPosition: '50% 50%',
          }}
        >
          <source src={heroVideoUrl} type="video/mp4" />
          Your browser does not support background video.
        </video>
        {isEditMode && (
          <div 
            onClick={() => handleInlineFileUpload('home', 'heroVideo', 'video/mp4,video/webm')}
            style={{ position: 'absolute', inset: 0, zIndex: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', opacity: 0, transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
          >
            <span style={{ background: 'var(--accent)', color: 'white', padding: '8px 16px', borderRadius: '4px', fontWeight: 'bold' }}>Click to Upload Video</span>
          </div>
        )}
      </div>
      <div className="hero-video-scrim"></div>

      <div className="container">
        <div className="hero-video-content">
          <div className="hero-video-eyebrow mono"><span className="hero-video-line" aria-hidden="true"></span>Engineered for industry</div>
          <h1 
            contentEditable={isEditMode} 
            suppressContentEditableWarning={true} 
            onBlur={(e) => handleInlineEdit('home', 'heroTitle', e.currentTarget.innerText)}
            className={isEditMode ? 'inline-editable' : ''}
          >{heroTitle}</h1>
          <p 
            contentEditable={isEditMode} 
            suppressContentEditableWarning={true} 
            onBlur={(e) => handleInlineEdit('home', 'heroDesc', e.currentTarget.innerText)}
            className={isEditMode ? 'inline-editable' : ''}
          >{heroDesc}</p>
          <div className="hero-video-actions">
            <button className="btn btn-primary" onClick={() => navigate('about')}>
              Discover Dynalektric <span className="arrow">→</span>
            </button>
            <button type="button" className="hero-video-link" onClick={() => navigate('contact')}>
              Discuss Your Requirement <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="hero-video-toggle"
        aria-pressed={playing}
        aria-label={playing ? 'Pause background video' : 'Play background video'}
        onClick={toggleVideo}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6.5" y="5" width="3.6" height="14" rx="1"/><rect x="13.9" y="5" width="3.6" height="14" rx="1"/></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 8 5.5z"/></svg>
        )}
      </button>
    </section>
  );
}

/* ============================================================
   Inside Dynalektric — organisation credibility section.
   Editorial split: real facility image + three capability statements
   and a restrained proof row. Calm, company-led, no counters.
   ============================================================ */
function OrgSection({ navigate, content, isEditMode, handleInlineEdit, handleInlineFileUpload }) {
  const caps = [
    { t: 'In-house engineering', d: 'Design, development and application review supported by cross-functional technical teams.' },
    { t: 'Manufacturing capability', d: 'Structured production across magnetics, panels, power electronics and engineered assemblies.' },
    { t: 'Testing and documentation', d: 'Inspection, validation and documentation aligned to product and project requirements.' },
  ];
  const proof = [
    { k: 'Since 1980', v: 'Engineering and manufacturing' },
    { k: 'In-house', v: 'Design, production and testing' },
    { k: 'Six sectors', v: 'Industries supported' },
    { k: 'Export ready', v: 'Documentation and delivery' },
  ];

  const orgTitle = content.orgTitle || 'The organisation behind every engineered solution.';
  const orgLead = content.orgLead || 'Dynalektric combines engineering teams, manufacturing capability, testing processes and application experience within one operating environment.';
  const orgImg = normalizeUrl(content.orgImg) || 'Dynalektric/demo1DL/assets/card-magnetics.jpg';

  return (
    <section className="section reveal org-section">
      <div className="container">
        <div className="org-split">
          <div className="org-visual">
            <image-slot
              id="org-image"
              src={(window.__resources && window.__resources.cardMagnetics) || orgImg}
              fit="cover"
              position="50% 50%"
              placeholder="Replace with a Dynalektric factory floor, engineering team or testing image"
              aria-label="Dynalektric manufacturing facility and production floor"
              shape="rect"
            ></image-slot>
            {isEditMode && (
              <div 
                onClick={() => handleInlineFileUpload('home', 'orgImg', 'image/*')}
                style={{ position: 'absolute', inset: 0, zIndex: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', opacity: 0, transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
              >
                <span style={{ background: 'var(--accent)', color: 'white', padding: '8px 16px', borderRadius: '4px', fontWeight: 'bold' }}>Click to Upload Image</span>
              </div>
            )}
          </div>
          <div className="org-body">
            <div className="eyebrow"><span className="eyebrow-label">Inside Dynalektric</span></div>
            <h2 
              contentEditable={isEditMode} 
              suppressContentEditableWarning={true} 
              onBlur={(e) => handleInlineEdit('home', 'orgTitle', e.currentTarget.innerText)}
              className={isEditMode ? 'inline-editable' : ''}
            >{orgTitle}</h2>
            <p 
              contentEditable={isEditMode} 
              suppressContentEditableWarning={true} 
              onBlur={(e) => handleInlineEdit('home', 'orgLead', e.currentTarget.innerText)}
              className={`lead ${isEditMode ? 'inline-editable' : ''}`}
            >{orgLead}</p>
            <ul className="org-caps">
              {caps.map(c => (
                <li key={c.t}>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </li>
              ))}
            </ul>
            <button className="btn btn-ghost org-cta" onClick={() => navigate('about')}>
              About Dynalektric <span className="arrow">→</span>
            </button>
          </div>
        </div>
        <div className="org-proof" aria-label="Company credentials">
          {proof.map(p => (
            <div className="org-proof-item" key={p.k}>
              <div className="mono num">{p.k}</div>
              <div className="org-proof-label">{p.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Featured case studies — manual carousel (3 cases). No autoplay.
   Image-led, representative application imagery (user-replaceable).
   ============================================================ */
const FEATURED_CASES = [
  {
    id: 'railway', industry: 'Railway & Traction',
    title: 'Magnetic components for demanding rolling-stock applications',
    challenge: 'Rolling-stock equipment required magnetic components able to hold performance under vibration, thermal load and constrained installation envelopes.',
    response: 'Dynalektric engineered application-specific magnetics, then manufactured and validated them against the relevant railway and IEC requirements before delivery.',
    capability: ['Application engineering', 'Manufacturing', 'Testing and documentation'],
    img: 'Dynalektric/demo1DL/assets/industry-railways.jpg', resKey: 'indRailways',
    placeholder: 'Replace with approved Dynalektric railway project or product-in-application image',
    alt: 'Representative railway and traction application image',
    to: 'railways',
  },
  {
    id: 'renewable', industry: 'Renewable Energy',
    title: 'Reactor solution supporting renewable power conversion',
    challenge: 'A renewable power-conversion application needed reactors suited to harmonic conditions, grid-integration duty and a long project life.',
    response: 'Dynalektric developed reactor designs for the duty profile, then manufactured and tested them to the project and IEC requirements.',
    capability: ['Application engineering', 'Manufacturing', 'Testing and documentation'],
    img: 'Dynalektric/demo1DL/assets/industry-renewables.jpg', resKey: 'indRenewables',
    placeholder: 'Replace with approved Dynalektric renewable-energy project image',
    alt: 'Representative renewable-energy application image',
    to: 'renewables',
  },
  {
    id: 'power', industry: 'Power & Utilities',
    title: 'Power equipment engineered for utility and infrastructure requirements',
    challenge: 'A utility and infrastructure application required power equipment built to distribution duty, documentation standards and inspection requirements.',
    response: 'Dynalektric engineered the equipment to the application, then manufactured and tested it with documentation aligned to the project handover.',
    capability: ['Application engineering', 'Manufacturing', 'Testing and documentation'],
    img: 'Dynalektric/demo1DL/assets/industry-powergrid.jpg', resKey: 'indPowergrid',
    placeholder: 'Replace with approved Dynalektric utility or substation project image',
    alt: 'Representative power and utilities application image',
    to: 'powergrid',
  },
];

function FeaturedCases({ navigate, isEditMode, handleInlineAddProduct, handleInlineDeleteProduct, handleInlineOpenEditModal, handleInlineProductFileUpload }) {
  const DB_CASES = (window.CMS_DYNA_DATA && window.CMS_DYNA_DATA.casestudies) ? window.CMS_DYNA_DATA.casestudies : [];
  
  const CASES_DATA = React.useMemo(() => {
    if (DB_CASES && DB_CASES.length > 0) {
      return DB_CASES.map((cs, i) => {
        let parsedFeatures = [];
        if (typeof cs.features === 'string') {
          try { parsedFeatures = JSON.parse(cs.features); } catch(e) {}
        } else if (Array.isArray(cs.features)) {
          parsedFeatures = cs.features;
        }

        let parsedSpecs = {};
        if (typeof cs.specifications === 'string') {
          try { parsedSpecs = JSON.parse(cs.specifications); } catch(e) {}
        } else if (cs.specifications) {
          parsedSpecs = cs.specifications;
        }

        return {
          id: cs.id,
          industry: parsedSpecs.industry || cs.category,
          title: cs.title,
          challenge: cs.description || '',
          response: parsedSpecs.response || '',
          capability: parsedFeatures,
          img: normalizeUrl(cs.image_url) || 'Dynalektric/demo1DL/assets/industry-heavy.jpg',
          resKey: `case-${i}`,
          placeholder: 'Case study image',
          alt: cs.title,
          to: cs.slug || 'case-study',
        };
      });
    }
    return FEATURED_CASES;
  }, [DB_CASES]);

  const total = CASES_DATA.length;
  const [idx, setIdx] = React.useState(0);
  
  React.useEffect(() => {
    if (idx >= total && total > 0) {
      setIdx(total - 1);
    }
  }, [total, idx]);

  const thumbRefs = React.useRef([]);
  const touch = React.useRef({ x: 0, y: 0 });
  const c = CASES_DATA[idx];
  
  if (!c) return null;

  const go = (dir) => setIdx(i => (i + dir + total) % total);

  const onThumbKey = (e, i) => {
    let n = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % total;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + total) % total;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = total - 1;
    if (n != null) { e.preventDefault(); setIdx(n); const el = thumbRefs.current[n]; el && el.focus(); }
  };

  const onTouchStart = (e) => { const t = e.changedTouches[0]; touch.current = { x: t.clientX, y: t.clientY }; };
  const onTouchEnd = (e) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x, dy = t.clientY - touch.current.y;
    if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
  };

  return (
    <div className="cases">
      <div className="cases-stage">
        <div className="case-visual" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {CASES_DATA.map((it, i) => (
            <div className="case-img" data-active={i === idx} aria-hidden={i !== idx} key={it.id}>
              <image-slot
                id={`home-case-${it.id}`}
                src={(window.__resources && window.__resources[it.resKey]) || it.img}
                fit="cover"
                position="50% 50%"
                placeholder={it.placeholder}
                aria-label={it.alt}
                shape="rect"
              ></image-slot>
            </div>
          ))}
          <div className="case-img-scrim"></div>
          <span className="case-img-tag mono">Representative application image</span>
        </div>

        <div className="case-panel" key={idx} style={{ position: 'relative' }}>
          {isEditMode && (
            <div className="admin-inline-actions" style={{ position: 'absolute', top: '15px', right: '15px', zIndex: 100, display: 'flex', gap: '8px' }}>
              <button 
                className="admin-inline-btn" 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleInlineOpenEditModal(c.id); }}
                style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                Edit
              </button>
              <button 
                className="admin-inline-btn"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleInlineDeleteProduct(c.id); }}
                style={{ background: 'rgba(220, 38, 38, 0.8)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                Delete
              </button>
            </div>
          )}
          <div className="case-panel-top">
            <span className="case-industry mono">{c.industry}</span>
            <span className="case-count mono" aria-hidden="true"><b>{String(idx + 1).padStart(2, '0')}</b> / {String(total).padStart(2, '0')}</span>
          </div>
          <h3>{c.title}</h3>
          <div className="case-row">
            <span className="case-k mono">Challenge</span>
            <p>{c.challenge}</p>
          </div>
          <div className="case-row">
            <span className="case-k mono">Dynalektric response</span>
            <p>{c.response}</p>
          </div>
          <div className="case-caps">
            {c.capability.map(l => <span className="case-chip" key={l}>{l}</span>)}
          </div>
          <div className="case-foot">
            <button type="button" className="case-readlink" onClick={() => navigate('industries', c.to)}>
              View Application <span className="arrow">→</span>
            </button>
            <div className="case-arrows">
              <button type="button" className="case-arrow" aria-label="Previous case study" onClick={() => go(-1)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button type="button" className="case-arrow" aria-label="Next case study" onClick={() => go(1)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="case-thumbs" role="tablist" aria-label="Select a case study">
        {CASES_DATA.map((it, i) => (
          <button
            key={it.id}
            type="button"
            role="tab"
            ref={el => (thumbRefs.current[i] = el)}
            className="case-thumb"
            aria-selected={idx === i}
            tabIndex={idx === i ? 0 : -1}
            onClick={() => setIdx(i)}
            onKeyDown={e => onThumbKey(e, i)}
          >
            <span className="case-thumb-num mono">{String(i + 1).padStart(2, '0')}</span>
            <span className="case-thumb-name">{it.industry}</span>
          </button>
        ))}
        {isEditMode && (
          <button
            type="button"
            role="tab"
            className="case-thumb"
            onClick={() => handleInlineAddProduct('Case Study')}
            style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px dashed rgba(59, 130, 246, 0.5)', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <span className="case-thumb-num mono" style={{ color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Add New
            </span>
            <span className="case-thumb-name" style={{ color: '#3b82f6' }}>Case Study</span>
          </button>
        )}
        <p className="case-note">Customer names and project details are shown only where approved.</p>
      </div>
    </div>
  );
}

function PageHome({ navigate, focusId, tweaks, isEditMode, handleInlineEdit, handleInlineFileUpload, handleInlineProductEdit, handleInlineProductFileUpload, handleInlineAddProduct, handleInlineOpenEditModal, handleInlineDeleteProduct }) {
  useReveal();

  const content = (window.CMS_DYNA_DATA && window.CMS_DYNA_DATA.settings && window.CMS_DYNA_DATA.settings.pageContent && window.CMS_DYNA_DATA.settings.pageContent.home) || {};

  const capTitle = content.capTitle || 'Engineering systems that power, control and support industrial operations.';
  const capLead = content.capLead || 'Dynalektric combines engineering, manufacturing and testing across four core capability areas serving demanding industrial applications.';
  const indTitle = content.indTitle || 'Engineering capability applied across demanding industries.';
  const indLead = content.indLead || 'Dynalektric supports power, control and equipment applications across established infrastructure, mobility and industrial sectors.';
  const rndTitle = content.rndTitle || 'Custom requirements engineered in-house.';
  const rndLead = content.rndLead || 'Our engineering and new product development teams take a customer specification through feasibility, design, prototyping, validation and pilot production. One team, one process.';
  const rndImg = normalizeUrl(content.rndImg) || 'Dynalektric/demo1DL/assets/engineering-npd.jpg';
  const qualTitle = content.qualTitle || 'Type-tested designs, full documentation, traceable processes.';
  const qualLead = content.qualLead || 'Every product ships with routine and type test reports, QAP documentation and material traceability. Designs validated against IEC, IS and customer specifications.';
  const casesTitle = content.casesTitle || 'Engineering outcomes from real applications.';
  const casesLead = content.casesLead || 'Selected examples of how Dynalektric applies engineering, manufacturing and testing capability across industrial applications.';

  return (
    <main className="page-enter home-main">
      {/* HERO — cinematic video experience */}
      <HeroVideo navigate={navigate} isEditMode={isEditMode} handleInlineEdit={handleInlineEdit} handleInlineFileUpload={handleInlineFileUpload} />

      {/* INSIDE DYNALEKTRIC — organisation credibility */}
      <OrgSection navigate={navigate} content={content} isEditMode={isEditMode} handleInlineEdit={handleInlineEdit} handleInlineFileUpload={handleInlineFileUpload} />

      {/* WHAT WE ENGINEER — capability flip carousel */}
      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span className="eyebrow-label">What we engineer</span></div>
            <div>
              <h2
                contentEditable={isEditMode} 
                suppressContentEditableWarning={true} 
                onBlur={(e) => handleInlineEdit('home', 'capTitle', e.currentTarget.innerText)}
                className={isEditMode ? 'inline-editable' : ''}
              >{capTitle}</h2>
              <p className={`lead ${isEditMode ? 'inline-editable' : ''}`} style={{ marginTop: 16 }}
                contentEditable={isEditMode} 
                suppressContentEditableWarning={true} 
                onBlur={(e) => handleInlineEdit('home', 'capLead', e.currentTarget.innerText)}
              >
                {capLead}
              </p>
            </div>
          </div>

          <CapabilityCarousel navigate={navigate} isEditMode={isEditMode} handleInlineProductEdit={handleInlineProductEdit} handleInlineProductFileUpload={handleInlineProductFileUpload} handleInlineAddProduct={handleInlineAddProduct} handleInlineOpenEditModal={handleInlineOpenEditModal} handleInlineDeleteProduct={handleInlineDeleteProduct} />
        </div>
      </section>

      {/* INDUSTRIES STRIP */}
      <section className="section reveal" style={{ background: 'var(--panel-dark)', color: 'var(--on-dark)', margin: '0' }}>
        <div className="container">
          <div className="section-head" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="eyebrow"><span className="eyebrow-label on-dark">Industries &amp; applications</span></div>
            <div>
              <h2 style={{ color: 'var(--bg)' }}
                contentEditable={isEditMode} 
                suppressContentEditableWarning={true} 
                onBlur={(e) => handleInlineEdit('home', 'indTitle', e.currentTarget.innerText)}
                className={isEditMode ? 'inline-editable' : ''}
              >{indTitle}</h2>
              <p style={{ marginTop: 16, fontSize: 15, color: 'rgba(244,244,241,0.7)', maxWidth: '60ch' }}
                contentEditable={isEditMode} 
                suppressContentEditableWarning={true} 
                onBlur={(e) => handleInlineEdit('home', 'indLead', e.currentTarget.innerText)}
                className={isEditMode ? 'inline-editable' : ''}
              >
                {indLead}
              </p>
            </div>
          </div>

          <IndustryStage navigate={navigate} isEditMode={isEditMode} handleInlineOpenEditModal={handleInlineOpenEditModal} handleInlineDeleteProduct={handleInlineDeleteProduct} handleInlineAddProduct={handleInlineAddProduct} />
        </div>
      </section>

      {/* R&D TEASER */}
      <section className="section reveal" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div className="rnd-teaser">
            <div className="rnd-teaser-copy">
              <div className="eyebrow" style={{ marginBottom: 24 }}><span className="eyebrow-label">Engineering and NPD</span></div>
              <h2
                contentEditable={isEditMode} 
                suppressContentEditableWarning={true} 
                onBlur={(e) => handleInlineEdit('home', 'rndTitle', e.currentTarget.innerText)}
                className={isEditMode ? 'inline-editable' : ''}
              >{rndTitle}</h2>
              <p className={`lead ${isEditMode ? 'inline-editable' : ''}`} style={{ marginTop: 24 }}
                contentEditable={isEditMode} 
                suppressContentEditableWarning={true} 
                onBlur={(e) => handleInlineEdit('home', 'rndLead', e.currentTarget.innerText)}
              >
                {rndLead}
              </p>
              <button className="btn btn-ghost" style={{ marginTop: 32 }} onClick={() => navigate('rnd')}>
                View engineering capability →
              </button>
            </div>
            <div className="rnd-teaser-visual">
              <div className="rnd-teaser-figure">
                <image-slot
                  id="home-engineering-npd"
                  src={(window.__resources && window.__resources.engineeringNpd) || rndImg}
                  fit="cover"
                  position="50% 50%"
                  placeholder="Replace with a Dynalektric in-house engineering and assembly image"
                  aria-label="Dynalektric engineers developing and assembling a custom electrical solution in-house"
                  shape="rect"
                ></image-slot>
                {isEditMode && (
                  <div 
                    onClick={() => handleInlineFileUpload('home', 'rndImg', 'image/*')}
                    style={{ position: 'absolute', inset: 0, zIndex: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', opacity: 0, transition: 'opacity 0.2s', borderRadius: 'var(--radius)' }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                  >
                    <span style={{ background: 'var(--accent)', color: 'white', padding: '8px 16px', borderRadius: '4px', fontWeight: 'bold' }}>Click to Change Image</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / CERTS / STATS */}
      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span className="eyebrow-label">Standards and testing</span></div>
            <div>
              <h2
                contentEditable={isEditMode} 
                suppressContentEditableWarning={true} 
                onBlur={(e) => handleInlineEdit('home', 'qualTitle', e.currentTarget.innerText)}
                className={isEditMode ? 'inline-editable' : ''}
              >{qualTitle}</h2>
              <p style={{ marginTop: 16, fontSize: 15, color: 'var(--ink-soft)' }}
                contentEditable={isEditMode} 
                suppressContentEditableWarning={true} 
                onBlur={(e) => handleInlineEdit('home', 'qualLead', e.currentTarget.innerText)}
                className={isEditMode ? 'inline-editable' : ''}
              >
                {qualLead}
              </p>
            </div>
          </div>

          <div className="standards-grid">
            <div>
              <div className="mono" style={{ marginBottom: 24, color: 'var(--accent)', fontWeight: 600 }}>Certifications and standards</div>
              <div className="cert-row">
                {CERTIFICATIONS.map(c => (
                  <div className="cert-item" key={c.code}>
                    <div className="cert-code">{c.code}</div>
                    <div className="cert-label mono">{c.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16 }} className="mono">Certificate copies available on request</div>
            </div>
            <div className="qa-card">
              <div className="mono" style={{ marginBottom: 16, color: 'var(--accent)', fontWeight: 600 }}>Quality process</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li style={{ fontSize: 13, paddingBottom: 12, borderBottom: '1px solid var(--rule-soft)' }}>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>Routine testing</div>
                  <div style={{ color: 'var(--ink-soft)' }}>100% electrical validation on every unit</div>
                </li>
                <li style={{ fontSize: 13, paddingBottom: 12, borderBottom: '1px solid var(--rule-soft)' }}>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>Type testing</div>
                  <div style={{ color: 'var(--ink-soft)' }}>On-site labs plus accredited externals</div>
                </li>
                <li style={{ fontSize: 13, paddingBottom: 12, borderBottom: '1px solid var(--rule-soft)' }}>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>FAT support</div>
                  <div style={{ color: 'var(--ink-soft)' }}>Customer factory acceptance testing</div>
                </li>
                <li style={{ fontSize: 13 }}>
                  <div style={{ fontWeight: 500, marginBottom: 4 }}>Documentation</div>
                  <div style={{ color: 'var(--ink-soft)' }}>QAP, GA drawings, test reports, BoM</div>
                </li>
              </ul>
            </div>
          </div>

          <div style={{ background: 'var(--panel-dark)', borderRadius: 'var(--radius-card)', padding: '48px 40px', marginTop: 56 }}>
            <div className="stats-row">
              {STATS.map((s, i) => (
                <div className="stats-item reveal" key={i} style={{ transitionDelay: `${i * 80}ms`, textAlign: 'center' }}>
                  <div className="big-num" style={{ color: '#ffffff' }}>
                    {s.value.includes('+')
                      ? <><Counter to={parseInt(s.value)} />+</>
                      : s.value
                    }
                  </div>
                  <div className="mono" style={{ marginTop: 12, color: 'rgba(244,244,241,0.55)' }}>{s.sub}</div>
                  <div style={{ fontSize: 14, color: 'rgba(244,244,241,0.75)', marginTop: 8 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES — featured carousel */}
      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span className="eyebrow-label">Case studies</span></div>
            <div>
              <h2
                contentEditable={isEditMode} 
                suppressContentEditableWarning={true} 
                onBlur={(e) => handleInlineEdit('home', 'casesTitle', e.currentTarget.innerText)}
                className={isEditMode ? 'inline-editable' : ''}
              >{casesTitle}</h2>
              <p style={{ marginTop: 16, fontSize: 15, color: 'var(--ink-soft)' }}
                contentEditable={isEditMode} 
                suppressContentEditableWarning={true} 
                onBlur={(e) => handleInlineEdit('home', 'casesLead', e.currentTarget.innerText)}
                className={isEditMode ? 'inline-editable' : ''}
              >
                {casesLead}
              </p>
            </div>
          </div>
          <FeaturedCases 
            navigate={navigate} 
            isEditMode={isEditMode}
            handleInlineAddProduct={handleInlineAddProduct}
            handleInlineDeleteProduct={handleInlineDeleteProduct}
            handleInlineOpenEditModal={handleInlineOpenEditModal}
            handleInlineProductFileUpload={handleInlineProductFileUpload} 
          />
        </div>
      </section>

      <FinalCTA
        navigate={navigate}
        eyebrow="Discuss your requirement"
        heading="Discuss your application or engineering requirement"
        body="Connect with the Dynalektric team to discuss your application, technical requirement or project context."
        primaryLabel="Discuss Your Requirement"
        primaryTo="contact"
        secondaryLabel="Explore Our Capabilities"
        secondaryTo="about"
        tertiaryLabel="Submit a Detailed RFQ"
        tertiaryTo="contact"
      />
      <Footer navigate={navigate} />
    </main>
  );
}

window.PageHome = PageHome;
