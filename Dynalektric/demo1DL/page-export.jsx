/* page-export.jsx — Export page: 10-section IA revision
   Montserrat throughout. No invented data. All status values pending client approval.
   Analytics preserved. Reuses all existing datasets and components from page-export-data.jsx. */

/* ============================================================
   COMPONENT: Export Capability Overview — 3 tabs
   Quality & Manufacturing | Trade Compliance | ESG & Carbon Readiness
   ============================================================ */
function ExportCapabilityTabs() {
  const [tab, setTab] = React.useState(0);
  const TABS = ['Quality & Manufacturing', 'Trade Compliance', 'ESG & Carbon Readiness'];

  return (
    <div className="exp-tabs-wrap">
      <div className="exp-tabs" role="tablist" aria-label="Export capability overview">
        {TABS.map((t, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={tab === i}
            aria-controls={`exp-tabpanel-cap-${i}`}
            id={`exp-tab-cap-${i}`}
            className={`exp-tab-btn ${tab === i ? 'is-active' : ''}`}
            onClick={() => { setTab(i); exportTrack('capability_tab_select', { tab: t }); }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab 0 — Quality & Manufacturing */}
      <div
        id="exp-tabpanel-cap-0"
        role="tabpanel"
        aria-labelledby="exp-tab-cap-0"
        hidden={tab !== 0}
        className="exp-tab-panel"
      >
        <div className="exp-tab-cols">
          <div className="export-quality-list">
            <ul className="export-tick-list">
              {EXP_QUALITY.map((q, i) => (
                <li key={i}><span aria-hidden="true">›</span><span>{q}</span></li>
              ))}
            </ul>
            <div className="export-inspect-callout" style={{ marginTop: 24 }}>
              <span className="mono">Inspection</span>
              <p>We welcome customer inspection, third-party inspection and Factory Acceptance Tests based on agreed project requirements.</p>
            </div>
          </div>
          <div className="export-doc-cards">
            {EXP_QUALITY_DOCS.map(d => (
              <div className="export-doc-card2" key={d.code}>
                <div className="mono num">{d.code}</div>
                <div>
                  <h3>{d.title}</h3>
                  <p>{d.note}</p>
                </div>
                <button className="exp-textlink" onClick={() => exportTrack('certificate_download', { doc: d.title })}>
                  Preview <span aria-hidden="true">→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab 1 — Trade Compliance */}
      <div
        id="exp-tabpanel-cap-1"
        role="tabpanel"
        aria-labelledby="exp-tab-cap-1"
        hidden={tab !== 1}
        className="exp-tab-panel"
      >
        <div className="export-status-list exp-status-list-narrow">
          {EXP_TRADE.map(item => (
            <div className="export-status-row" key={item.k}>
              <span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span aria-hidden="true" style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>›</span>
                {item.k}
              </span>
              <span className={`export-chip ${EXP_STATUS_CHIP[item.s].cls}`}>{EXP_STATUS_CHIP[item.s].label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tab 2 — ESG & Carbon Readiness */}
      <div
        id="exp-tabpanel-cap-2"
        role="tabpanel"
        aria-labelledby="exp-tab-cap-2"
        hidden={tab !== 2}
        className="exp-tab-panel"
      >
        <div className="export-status-list exp-status-list-narrow">
          {EXP_ESG.map(item => (
            <div className="export-status-row" key={item.k}>
              <span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span aria-hidden="true" style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>›</span>
                {item.k}
              </span>
              <span className={`export-chip ${EXP_STATUS_CHIP[item.s].cls}`}>{EXP_STATUS_CHIP[item.s].label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   COMPONENT: Resources — 3 tabs
   Documentation | Logistics & Incoterms | Warranty & Support
   ============================================================ */
function ResourcesTabs() {
  const [tab, setTab] = React.useState(0);
  const TABS = ['Documentation', 'Logistics & Incoterms', 'Warranty & Support'];

  return (
    <div className="exp-tabs-wrap">
      <div className="exp-tabs" role="tablist" aria-label="Resources">
        {TABS.map((t, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={tab === i}
            aria-controls={`exp-tabpanel-res-${i}`}
            id={`exp-tab-res-${i}`}
            className={`exp-tab-btn ${tab === i ? 'is-active' : ''}`}
            onClick={() => setTab(i)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab 0 — Documentation */}
      <div
        id="exp-tabpanel-res-0"
        role="tabpanel"
        aria-labelledby="exp-tab-res-0"
        hidden={tab !== 0}
        className="exp-tab-panel"
      >
        <div className="exp-resources-cols">
          <div>
            <div className="export-doc-subhead">Standard documents</div>
            <ul className="export-tick-list">
              {EXP_DOCS_STD.map((d, i) => (
                <li key={i}><span aria-hidden="true">›</span><span>{d}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="export-doc-subhead">Applicable documents</div>
            <ul className="export-tick-list">
              {EXP_DOCS_APP.map((d, i) => (
                <li key={i}><span aria-hidden="true">›</span><span>{d}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Tab 1 — Logistics & Incoterms */}
      <div
        id="exp-tabpanel-res-1"
        role="tabpanel"
        aria-labelledby="exp-tab-res-1"
        hidden={tab !== 1}
        className="exp-tab-panel"
      >
        <div className="exp-resources-cols">
          <div>
            <div className="export-doc-subhead">Supported Incoterms</div>
            <div className="export-incoterm-row">
              {EXP_INCOTERMS.map(t => (
                <span className="export-incoterm exp-incoterm-light" key={t}>{t}</span>
              ))}
            </div>
            <p className="exp-fineprint">Final Incoterms, payment terms and delivery responsibilities are confirmed in the quotation.</p>
          </div>
          <div>
            <div className="export-doc-subhead">Logistics support</div>
            <ul className="export-tick-list">
              {EXP_LOGISTICS2.map((d, i) => (
                <li key={i}><span aria-hidden="true">›</span><span>{d}</span></li>
              ))}
            </ul>
            <p className="exp-fineprint">Indicative lead time is shared by product family. Fixed dates are confirmed at order.</p>
          </div>
        </div>
      </div>

      {/* Tab 2 — Warranty & Support */}
      <div
        id="exp-tabpanel-res-2"
        role="tabpanel"
        aria-labelledby="exp-tab-res-2"
        hidden={tab !== 2}
        className="exp-tab-panel"
      >
        <ul className="export-tick-list">
          {EXP_AFTERSALES.map((a, i) => (
            <li key={i}><span aria-hidden="true">›</span><span>{a}</span></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ============================================================
   EXPORT PROCESS JOURNEY — 4-phase roadmap
   ============================================================ */
const JOURNEY_PHASES = [
  {
    phase: '01',
    name: 'Enquiry & Proposal',
    steps: [
      {
        n: '01',
        title: 'Technical Review',
        desc: 'Customer drawings, application requirements and compliance expectations reviewed.',
        items: ['Drawings review', 'Technical clarification', 'Customer discussions'],
      },
      {
        n: '02',
        title: 'Commercial Proposal',
        desc: 'Commercial offer prepared with delivery schedule, Incoterms and lead time commitments.',
        items: ['Commercial offer', 'Incoterms', 'Lead time estimation'],
      },
    ],
  },
  {
    phase: '02',
    name: 'Engineering & Production',
    steps: [
      {
        n: '03',
        title: 'Engineering & Manufacturing',
        desc: 'Design, planning and manufacturing executed for the confirmed order.',
        items: ['Transformers', 'Control Panels', 'Battery Chargers', 'Custom assemblies'],
      },
      {
        n: '04',
        title: 'Testing & FAT',
        desc: 'Routine quality tests and Factory Acceptance Tests conducted before dispatch.',
        items: ['Routine tests', 'Factory Acceptance Test', 'Third-party inspection'],
      },
    ],
  },
  {
    phase: '03',
    name: 'Documentation & Logistics',
    steps: [
      {
        n: '05',
        title: 'Documentation',
        desc: 'Export documentation prepared and verified for international shipment compliance.',
        items: ['Packing List', 'Commercial Invoice', 'Certificate of Origin', 'Test Certificates'],
      },
      {
        n: '06',
        title: 'Shipping & Customs',
        desc: 'Export clearance and freight coordination managed end-to-end.',
        items: ['Export clearance', 'Freight coordination', 'Customs support'],
      },
    ],
  },
  {
    phase: '04',
    name: 'Delivery & Support',
    steps: [
      {
        n: '07',
        title: 'Delivery',
        desc: 'Shipment dispatched on schedule with material handling and customer coordination.',
        items: ['On-time shipment', 'Material handling', 'Customer coordination'],
      },
      {
        n: '08',
        title: 'After-Sales Support',
        desc: 'Technical assistance, spare part guidance and responsive customer communication post-delivery.',
        items: ['Technical support', 'Spare assistance', 'Customer communication'],
      },
    ],
  },
];

/* ============================================================
   PAGE — 10 sections in order
   ============================================================ */
function PageExport({ navigate, isEditMode, handleInlineEdit, handleInlineFileUpload }) {
  useReveal();
  const content = (window.CMS_DYNA_DATA && window.CMS_DYNA_DATA.settings && window.CMS_DYNA_DATA.settings.pageContent && window.CMS_DYNA_DATA.settings.pageContent.export) || {};
  const heroImgSrc = content.heroImg || './assets/card-integrated.jpg';

  /* scroll-depth analytics — preserved */
  React.useEffect(() => {
    const fired = {};
    function onScroll() {
      const sc = document.scrollingElement || document.documentElement;
      const pct = (sc.scrollTop + sc.clientHeight) / sc.scrollHeight;
      if (pct >= 0.5 && !fired['50']) { fired['50'] = 1; exportTrack('export_page_scroll_50'); }
      if (pct >= 0.9 && !fired['90']) { fired['90'] = 1; exportTrack('export_page_scroll_90'); }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="page-enter" data-screen-label="Export">

      {/* ===== SECTION 1 — HERO ===== */}
      <section className="page-hero export-hero">
        <div className="container">
          <div className="export-hero-grid">
            <div>
              <div className="mono">EXPORT CAPABILITY</div>
              <h1>Engineered in India. Prepared for global industrial requirements.</h1>
              <p className="lead">
                Dynalektric supplies magnetics, DC power systems, control panels and engineered assemblies with structured documentation, testing coordination and export support for international industrial buyers.
              </p>
              <div className="export-hero-cta">
                <button className="btn btn-primary" onClick={() => { exportTrack('export_rfq_start', { from: 'hero' }); navigate('contact'); }}>
                  Request an Export Quote <span className="arrow" aria-hidden="true">→</span>
                </button>
                <button className="btn btn-secondary" onClick={() => { exportTrack('supplier_qualification_click'); navigate('contact'); }}>
                  Start Supplier Qualification
                </button>
              </div>
              <div className="export-trust-row">
                {EXP_TRUST.map(t => (
                  <span className={`export-trust-chip ${t.state === 'cond' ? 'is-cond' : ''}`} key={t.label}>
                    <span className="export-trust-mark" aria-hidden="true" />
                    <span className="export-trust-label">{t.label}</span>
                    <span className="export-trust-note">{t.note}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="page-hero-visual" style={{ position: 'relative' }}>
              <img
                src={heroImgSrc}
                alt="Dynalektric integrated and assembled engineered systems"
                width="720"
                height="540"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {isEditMode && (
                <button
                  onClick={() => handleInlineFileUpload('export', 'heroImg', 'image/*')}
                  style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.7)', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 14px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 10 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  Change Image
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2 — GLOBAL REACH & INDUSTRIES SERVED ===== */}
      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">
              <span className="mono">Global reach</span>
            </div>
            <div>
              <h2>Global Reach &amp; Industries Served</h2>
              <p className="export-sub">Dynalektric supports industrial customers across multiple regions and sectors with engineered products and export coordination.</p>
            </div>
          </div>
          <div className="exp-reach-grid">
            <div className="exp-reach-panel">
              <div className="exp-reach-title">Regions served</div>
              <div className="exp-reach-chips">
                {EXP_REGIONS.map(r => (
                  <span className="exp-reach-chip" key={r}>{r}</span>
                ))}
              </div>
            </div>
            <div className="exp-reach-panel">
              <div className="exp-reach-title">Industries served</div>
              <div className="exp-reach-chips">
                {EXP_SECTORS.map(s => (
                  <span className="exp-reach-chip exp-reach-chip-ind" key={s}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3 — EXPORT PRODUCT PORTFOLIO ===== */}
      <section className="section reveal" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">
              <span className="mono">Product portfolio</span>
            </div>
            <div>
              <h2>Export Product Portfolio</h2>
              <p className="export-sub">Core product groups prepared for international industrial applications.</p>
            </div>
          </div>

          {/* Desktop / tablet table */}
          <div className="exp-ptable-wrap">
            <table className="exp-ptable">
              <thead>
                <tr>
                  <th>Product Group</th>
                  <th>Indicative HS Heading</th>
                  <th>Rating Range</th>
                  <th>Documentation</th>
                  <th>Customisation Capability</th>
                </tr>
              </thead>
              <tbody>
                {EXP_PORTFOLIO.map(g => (
                  <tr key={g.id}>
                    <td className="exp-ptable-group">
                      <span className="exp-ptable-name">{g.group}</span>
                      <ul className="exp-ptable-items">
                        {g.items.map(item => <li key={item}>{item}</li>)}
                      </ul>
                    </td>
                    <td><span className="mono exp-ptable-hs">HS {g.hs}</span></td>
                    <td>{g.rating}</td>
                    <td>{g.docs}</td>
                    <td>{g.custom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked cards */}
          <div className="exp-pmobile">
            {EXP_PORTFOLIO.map(g => (
              <div className="exp-pmobile-card" key={g.id}>
                <div className="exp-pmobile-head">
                  <span className="exp-ptable-name">{g.group}</span>
                  <span className="mono exp-ptable-hs">HS {g.hs}</span>
                </div>
                <ul className="exp-ptable-items exp-pmobile-items">
                  {g.items.map(item => <li key={item}>{item}</li>)}
                </ul>
                <div className="exp-pmobile-meta">
                  <div className="exp-pmobile-row">
                    <span className="exp-pmobile-k">Rating range</span>
                    <span className="exp-pmobile-v">{g.rating}</span>
                  </div>
                  <div className="exp-pmobile-row">
                    <span className="exp-pmobile-k">Documentation</span>
                    <span className="exp-pmobile-v">{g.docs}</span>
                  </div>
                  <div className="exp-pmobile-row">
                    <span className="exp-pmobile-k">Customisation</span>
                    <span className="exp-pmobile-v">{g.custom}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="exp-fineprint">Indicative HS headings are confirmed per product and destination. Final classification is set at quotation.</p>
        </div>
      </section>

      {/* ===== SECTION 4 — TRUST & VERIFICATION ===== */}
      <section className="section reveal" style={{ background: 'var(--panel-dark)', color: 'var(--on-dark)' }}>
        <div className="container">
          <div className="section-head" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
            <div className="eyebrow">
              <span className="mono" style={{ color: 'rgba(244,244,241,0.6)' }}>Trust and verification</span>
            </div>
            <div>
              <h2 style={{ color: 'var(--on-dark)' }}>Trust &amp; Verification</h2>
              <p className="export-sub" style={{ color: 'rgba(244,244,241,0.72)' }}>Legal identity, independent verification and financial readiness for procurement onboarding. Values shown as placeholders are confirmed with client-approved data.</p>
            </div>
          </div>
          <div className="export-verify-grid">
            <div className="export-verify-panel">
              <div className="mono export-verify-title">Legal identity</div>
              <div className="exp-spec-rows on-dark">
                {EXP_LEGAL.map(f => (
                  <div className="exp-spec-row" key={f.k}>
                    <span className="exp-label">{f.k}</span>
                    <span className="exp-spec-val">{f.v}</span>
                  </div>
                ))}
              </div>
              <div className="export-map" aria-label="Registered address map placeholder">
                <span className="mono">Registered address map</span>
              </div>
            </div>
            <div className="export-verify-side">
              <div className="export-verify-panel">
                <div className="mono export-verify-title">Financial readiness</div>
                <div className="exp-spec-rows on-dark">
                  {EXP_FINANCIAL.map(f => (
                    <div className="exp-spec-row" key={f.k}>
                      <span className="exp-label">{f.k}</span>
                      <span className="exp-spec-val">{f.v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="export-verify-panel">
                <div className="mono export-verify-title">Social proof</div>
                <p className="export-verify-p">Approved customer logos, anonymous case studies and approved testimonials are shared once the supplier qualification request is reviewed.</p>
                <div className="export-logo-row">
                  {[1, 2, 3, 4].map(i => <span className="export-logo-slot" key={i}>Approved logo</span>)}
                </div>
              </div>
              <div className="export-verify-actions">
                <button className="btn btn-primary" onClick={() => exportTrack('company_verification_download')}>
                  Download Company Verification Pack <span className="arrow" aria-hidden="true">→</span>
                </button>
                <button className="btn btn-ghost on-dark" onClick={() => exportTrack('clearance_scheme_view', { action: 'view_address' })}>
                  View Registered Address
                </button>
                <button className="btn btn-ghost on-dark" onClick={() => { exportTrack('supplier_qualification_click'); navigate('contact'); }}>
                  Submit Supplier Qualification Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5 — CERTIFICATIONS MATRIX ===== */}
      <section className="section reveal" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">
              <span className="mono">Certifications and standards</span>
            </div>
            <div>
              <h2>Certifications and Standards</h2>
              <p className="export-sub">A three-status view across management systems and product or market standards. Status reflects current position and is confirmed with certificate references on request.</p>
            </div>
          </div>
          <CertMatrix />
        </div>
      </section>

      {/* ===== SECTION 6 — DESTINATION MARKET CLEARANCE SCHEMES ===== */}
      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">
              <span className="mono">Destination-market clearance</span>
            </div>
            <div>
              <h2>Destination Market Clearance Schemes</h2>
              <p className="export-sub">Select a destination country and product group to view a likely compliance path. Schemes shown are indicative and confirmed per product and order.</p>
            </div>
          </div>
          <ClearanceSelector navigate={navigate} />
          <div className="export-testing-note">
            <div className="mono export-verify-title" style={{ color: 'var(--accent-2)' }}>Testing support</div>
            <ul className="export-tick-list export-tick-blue">
              {EXP_TESTING_SUPPORT.map((t, i) => <li key={i}><span aria-hidden="true">›</span><span>{t}</span></li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== SECTION 7 — EXPORT CAPABILITY OVERVIEW ===== */}
      <section className="section reveal" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">
              <span className="mono">Capability overview</span>
            </div>
            <div>
              <h2>Export Capability Overview</h2>
              <p className="export-sub">Structured quality systems, trade compliance processes and sustainability readiness support international customer requirements.</p>
            </div>
          </div>
          <ExportCapabilityTabs />
        </div>
      </section>

      {/* ===== SECTION 8 — EXPORT PROCESS JOURNEY ===== */}
      <section className="section reveal" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">
              <span className="mono">From RFQ to after-sales</span>
            </div>
            <div>
              <h2>Export Process Journey</h2>
              <p className="export-sub">Eight structured steps across four phases — from initial enquiry to delivery and after-sales support.</p>
            </div>
          </div>

          <div className="exp-roadmap" role="list" aria-label="Export process phases">
            {JOURNEY_PHASES.map((phase) => (
              <div className="exp-phase" key={phase.phase} role="listitem">
                <div className="exp-phase-hd">
                  <span className="exp-phase-num">{phase.phase}</span>
                  <span className="exp-phase-name">{phase.name}</span>
                </div>
                <div className="exp-phase-body">
                  {phase.steps.map(step => (
                    <div className="exp-phase-step" key={step.n}>
                      <div className="exp-step-hd">
                        <span className="exp-step-n">{step.n}</span>
                        <span className="exp-step-title">{step.title}</span>
                      </div>
                      <p className="exp-step-desc">{step.desc}</p>
                      <ul className="exp-step-items">
                        {step.items.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="exp-fineprint" style={{ marginTop: 24 }}>
            Indicative sequence. Specific milestones are aligned with customer project requirements and confirmed at order.
          </p>
        </div>
      </section>

      {/* ===== SECTION 9 — RESOURCES ===== */}
      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">
              <span className="mono">Documentation, logistics and support</span>
            </div>
            <div>
              <h2>Resources</h2>
              <p className="export-sub">Documentation packages, Incoterms, logistics support and after-sales terms for international orders.</p>
            </div>
          </div>
          <ResourcesTabs />
        </div>
      </section>

      {/* ===== SECTION 10 — FAQ ===== */}
      <section className="section reveal" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">
              <span className="mono">Common questions</span>
            </div>
            <div>
              <h2>Frequently Asked Questions</h2>
            </div>
          </div>
          <ExportFaq />
        </div>
      </section>

      <Footer navigate={navigate} />
    </main>
  );
}

window.PageExport = PageExport;
