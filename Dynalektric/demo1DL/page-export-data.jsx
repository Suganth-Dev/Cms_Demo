/* page-export-data.jsx — Export page data, analytics + interactive sub-components
   All status values, certificate numbers and registration details are placeholders
   pending client-approved values. Nothing here is invented as a confirmed fact. */

/* ---------- Analytics ---------- */
function exportTrack(event, detail) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: event }, detail || {}));
  } catch (e) { /* no-op */ }
}

/* ---------- Section 1: hero trust indicators ---------- */
const EXP_TRUST = [
  { label: 'ISO 9001 quality system', state: 'active',  note: 'Held' },
  { label: 'IEC-aligned product design', state: 'active', note: 'Standard practice' },
  { label: 'Inspection and FAT support', state: 'active', note: 'Supported' },
  { label: 'Export documentation readiness', state: 'cond', note: 'Available based on requirement' },
];

/* ---------- Section 2: self-selection ---------- */
const EXP_REGIONS = [
  'North America', 'EU / EEA', 'GCC and Middle East', 'Africa', 'Southeast Asia', 'Australia and New Zealand',
];
const EXP_SECTORS = [
  'Railways', 'Power and utilities', 'Infrastructure', 'Data centres', 'Semiconductor', 'Heavy industries', 'Material handling',
];
const EXP_PORTFOLIO = [
  {
    id: 'magnetics', group: 'Magnetics', hs: '8504',
    rating: '50 VA to 5 MVA, up to 36 kV class',
    items: ['LV transformers', 'MV transformers', 'K-rated transformers', 'Air-core reactors', 'Oil-cooled reactors', 'De-tuned reactors'],
    docs: 'IEC 60076 / IS 2026 test reports, GA drawings, BoM, QAP',
    custom: 'Taps, impedance, low-loss core, shielding',
  },
  {
    id: 'control-panels', group: 'Control Panel Assemblies', hs: '8537',
    rating: 'Up to 6300 A, Form 2 to 4b',
    items: ['Locomotive panels', 'Driver desk panels', 'PDUs', 'Power panels'],
    docs: 'IEC 61439 type and routine tests, GA, wiring, FAT protocol',
    custom: 'Layout, form separation, busbar rating',
  },
  {
    id: 'power-electronics', group: 'Power Electronics Systems', hs: '8504.40',
    rating: '24 V to 220 V DC, up to 400 A',
    items: ['MHE battery chargers', 'Float cum boost chargers', 'Special application battery chargers'],
    docs: 'Functional, efficiency and burn-in reports, conformance notes',
    custom: 'Chemistry, connectivity (CAN, Modbus, RS485), enclosure',
  },
  {
    id: 'cross-segment', group: 'Cross-Segment Solutions', hs: '8544 / 8537, varies',
    rating: 'LV to MV configurations, per component',
    items: ['Busbars', 'Cable harnessing', 'UPS', "Driver's Display Unit", 'Current sensors', 'DC-DC converters', 'Fire detection units', 'Maximum voltage relays'],
    docs: 'Component datasheets, drawings, type-test references where applicable',
    custom: 'OEM-specific configurations to customer QAP',
  },
];

/* ---------- Section 3: trust & verification ---------- */
const EXP_LEGAL = [
  { k: 'Company legal name', v: 'Awaiting client-approved value' },
  { k: 'CIN', v: 'Awaiting client-approved value' },
  { k: 'GST', v: 'Awaiting client-approved value' },
  { k: 'IEC (Importer Exporter Code)', v: 'On file, reference on request' },
  { k: 'Registered address', v: 'Awaiting client-approved value' },
  { k: 'D-U-N-S number', v: 'Provided if available on request' },
];
const EXP_FINANCIAL = [
  { k: 'Bank reference', v: 'Available on request' },
  { k: 'Transaction methods', v: 'Subject to quotation and order terms' },
  { k: 'Customer references', v: 'Approved references shared on qualification' },
];

/* ---------- Section 4: certifications matrix ---------- */
/* status: held | progress | available */
const CERT_GROUPS = [
  {
    group: 'Management systems',
    rows: [
      { name: 'ISO 9001', scope: 'Quality management', status: 'held', product: 'All groups', region: 'All', note: 'Certificate reference and validity provided on request.' },
      { name: 'ISO 14001', scope: 'Environmental management', status: 'held', product: 'All groups', region: 'All', note: 'Certificate reference and validity provided on request.' },
      { name: 'ISO 45001', scope: 'Occupational health and safety', status: 'held', product: 'All groups', region: 'All', note: 'Certificate reference and validity provided on request.' },
      { name: 'IRIS / ISO 22163', scope: 'Rail quality management', status: 'progress', product: 'Rail products', region: 'Rail markets', note: 'Status subject to client confirmation.' },
    ],
  },
  {
    group: 'Product and market standards',
    rows: [
      { name: 'IEC 60076', scope: 'Power transformers', status: 'held', product: 'Magnetics', region: 'All', note: 'Products designed and routine / type tested to this standard.' },
      { name: 'IEC 61439', scope: 'LV switchgear and controlgear assemblies', status: 'held', product: 'Control panels', region: 'All', note: 'Type-tested assembly evidence available per order.' },
      { name: 'IEC 61558', scope: 'Safety of transformers and reactors', status: 'held', product: 'Magnetics', region: 'All', note: 'Applied where relevant to product category.' },
      { name: 'CE', scope: 'European conformity', status: 'available', product: 'Per product', region: 'EU / EEA', note: 'Evaluated based on product, directive and destination.' },
      { name: 'UL', scope: 'North American safety', status: 'available', product: 'Per product', region: 'North America', note: 'Evaluated based on product and order requirement.' },
      { name: 'EN 50155', scope: 'Railway electronic equipment', status: 'available', product: 'Rail electronics', region: 'Rail markets', note: 'Evaluated based on rolling-stock requirement.' },
    ],
  },
];
const CERT_STATUS = {
  held:      { label: 'Held', cls: 'is-held' },
  progress:  { label: 'In Progress', cls: 'is-progress' },
  available: { label: 'Available based on requirement', cls: 'is-available' },
};

/* ---------- Section 5: destination-market clearance ---------- */
const EXP_CLEARANCE = [
  {
    id: 'sa', country: 'Saudi Arabia', region: 'GCC and Middle East',
    schemes: ['SASO / SABER platform registration', 'Product Certificate of Conformity (PCoC)', 'Shipment Certificate of Conformity (SCoC)', 'Local importer holds the SABER account'],
  },
  {
    id: 'gcc', country: 'GCC (general)', region: 'GCC and Middle East',
    schemes: ['G-Mark for in-scope products', 'ECAS registration where applicable', 'Importer-led conformity steps'],
  },
  {
    id: 'ng', country: 'Nigeria', region: 'Africa',
    schemes: ['SONCAP product certificate', 'Product registration via accepted route', 'Pre-shipment inspection where required'],
  },
  {
    id: 'ke', country: 'Kenya', region: 'Africa',
    schemes: ['PVoC (Pre-Export Verification of Conformity)', 'Certificate of Conformity per consignment', 'Accepted test reports where applicable'],
  },
  {
    id: 'eg', country: 'Egypt', region: 'Africa',
    schemes: ['Importer registration (GOEIC) requirements', 'Conformity documentation per category', 'Local representation as required'],
  },
  {
    id: 'tz', country: 'Tanzania', region: 'Africa',
    schemes: ['PVoC route of conformity', 'Certificate of Conformity per shipment', 'Pre-shipment inspection where required'],
  },
  {
    id: 'ug', country: 'Uganda', region: 'Africa',
    schemes: ['PVoC route of conformity', 'Certificate of Conformity per shipment', 'Accepted test reports where applicable'],
  },
];
const EXP_TESTING_SUPPORT = [
  'ISO / IEC 17025 laboratory reports, where accepted',
  'IECEE CB scheme reports, where applicable',
  'Local testing requirements depend on product, market and importer responsibilities',
];

/* ---------- Section 6: quality, manufacturing, inspection ---------- */
const EXP_QUALITY = [
  'In-house engineering', 'Cross-functional engineering teams', 'Capacity planning', 'DFMEA discipline',
  'First-Time-Right approach', 'Digital production tracking', 'Product traceability', 'Inspection checkpoints',
  'Calibration controls', 'Documented quality review',
];
const EXP_QUALITY_DOCS = [
  { code: '01', title: 'Inspection plan', note: 'Hold and witness points by stage' },
  { code: '02', title: 'FAT checklist', note: 'Factory acceptance test scope' },
  { code: '03', title: 'Calibration record', note: 'Instrument calibration status' },
  { code: '04', title: 'Traceability record', note: 'Material to dispatch lineage' },
  { code: '05', title: 'Quality documentation pack', note: 'Consolidated per order' },
];

/* ---------- Section 7: trade compliance, ESG, IP ---------- */
const EXP_TRADE = [
  { k: 'Restricted-party screening', s: 'available' },
  { k: 'End-use review', s: 'available' },
  { k: 'End-user review', s: 'available' },
  { k: 'India export-control framework', s: 'available' },
  { k: 'SCOMET review, where applicable', s: 'review' },
  { k: 'NDA process', s: 'available' },
  { k: 'Intellectual-property protection process', s: 'available' },
];
const EXP_ESG = [
  { k: 'RoHS', s: 'requirement' },
  { k: 'REACH', s: 'requirement' },
  { k: 'Conflict-minerals policy', s: 'available' },
  { k: 'ISO 14001 status', s: 'available' },
  { k: 'ISO 45001 status', s: 'available' },
  { k: 'Product carbon-footprint data, where supported', s: 'review' },
];
const EXP_STATUS_CHIP = {
  available:   { label: 'Available', cls: 'chip-available' },
  review:      { label: 'Under Review', cls: 'chip-review' },
  requirement: { label: 'Based on Customer Requirement', cls: 'chip-requirement' },
};

/* ---------- Section 8: process, incoterms, docs, logistics ---------- */
const EXP_PROCESS = [
  { n: '01', t: 'Enquiry and technical clarification' },
  { n: '02', t: 'Quotation and Incoterms' },
  { n: '03', t: 'Order and payment terms' },
  { n: '04', t: 'Manufacturing' },
  { n: '05', t: 'FAT or TPI' },
  { n: '06', t: 'Documentation and export packing' },
  { n: '07', t: 'Customs coordination and dispatch' },
  { n: '08', t: 'Delivery and after-sales' },
];
const EXP_INCOTERMS = ['EXW', 'FOB', 'CIF', 'DAP', 'DDP'];
const EXP_DOCS_STD = ['Commercial Invoice', 'Packing List', 'Shipping Bill', 'Bill of Lading or Airway Bill', 'Certificate of Origin'];
const EXP_DOCS_APP = ['Product test report', 'Certificate of Conformity', 'MSDS', 'Warranty certificate', 'Inspection record', 'FAT documentation'];
const EXP_LOGISTICS2 = [
  'Export-grade packing', 'Product identification and labelling', 'Container-loading coordination',
  'Freight-forwarder coordination', 'Dispatch tracking', 'Indicative lead time by product family',
];

/* ---------- Section 9: after-sales + FAQ ---------- */
const EXP_AFTERSALES = [
  'Warranty terms confirmed per order', 'Remote support', 'On-site commissioning, where agreed',
  'Spares availability', 'Structured complaint resolution process',
];
const EXP_FAQ = [
  { q: 'What is the minimum order quantity?', a: 'MOQ depends on product group and configuration. Engineered items are quoted per requirement; component items may carry a batch minimum. Confirmed in the quotation.' },
  { q: 'Can products be customised for our specification?', a: 'Yes. Magnetics, panels and power electronics are engineered to application. Share ratings, standards and interfaces and the engineering team reviews feasibility.' },
  { q: 'How is certification handled by destination?', a: 'Currently held certifications are listed in the certifications matrix. Destination-market approvals such as SASO, G-Mark, SONCAP and PVoC are reviewed per product and country during quotation.' },
  { q: 'What payment terms are supported?', a: 'Transaction methods and payment terms are confirmed in the quotation, subject to order value, destination and Incoterms.' },
  { q: 'What lead times can we expect?', a: 'Indicative lead time is shared by product family during quotation. Fixed dates are confirmed at order, after specification freeze and inspection planning.' },
  { q: 'How does the inspection process work?', a: 'We support customer inspection, third-party inspection and FAT against an agreed inspection plan with defined hold and witness points.' },
  { q: 'What documents should an RFQ include?', a: 'Product category, application and load profile, destination market and standards, quantity, and documentation or inspection scope. One supporting document can be attached.' },
  { q: 'Are datasheets available?', a: 'Application-specific datasheets are provided on request per sub-category. Request them with your RFQ or supplier qualification.' },
];

/* ===========================================================
   COMPONENT: Self-selection (region / sector / product group)
   =========================================================== */
function ExportSelfSelect({ navigate }) {
  const [region, setRegion] = React.useState(null);
  const [sector, setSector] = React.useState(null);
  const [groupId, setGroupId] = React.useState(EXP_PORTFOLIO[0].id);
  const group = EXP_PORTFOLIO.find(g => g.id === groupId);

  function pickRegion(r) { setRegion(r); exportTrack('destination_selector_use', { region: r }); }

  return (
    <div className="exp-select">
      <div className="exp-select-controls">
        <div className="exp-select-field">
          <div className="exp-label">Region</div>
          <div className="exp-chip-row">
            {EXP_REGIONS.map(r => (
              <button key={r} className={`exp-chip ${region === r ? 'is-on' : ''}`} onClick={() => pickRegion(r)}>{r}</button>
            ))}
          </div>
        </div>
        <div className="exp-select-field">
          <div className="exp-label">Sector</div>
          <div className="exp-chip-row">
            {EXP_SECTORS.map(s => (
              <button key={s} className={`exp-chip exp-chip-blue ${sector === s ? 'is-on' : ''}`} onClick={() => setSector(s)}>{s}</button>
            ))}
          </div>
        </div>
        <div className="exp-select-field">
          <div className="exp-label">Product group</div>
          <div className="exp-chip-row">
            {EXP_PORTFOLIO.map(g => (
              <button key={g.id} className={`exp-chip ${groupId === g.id ? 'is-on' : ''}`} onClick={() => setGroupId(g.id)}>{g.group}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="exp-select-result">
        <div className="exp-select-result-head">
          <div>
            <div className="exp-label" style={{ color: 'var(--accent)' }}>Selected export path</div>
            <h3>{group.group}</h3>
          </div>
          <div className="exp-path-tags">
            <span className="exp-path-tag">{region || 'Any region'}</span>
            <span className="exp-path-tag exp-path-tag-blue">{sector || 'Any sector'}</span>
          </div>
        </div>
        <div className="exp-spec-rows">
          <div className="exp-spec-row"><span className="exp-label">Indicative HS heading</span><span className="exp-spec-val">{group.hs}</span></div>
          <div className="exp-spec-row"><span className="exp-label">Rating range</span><span className="exp-spec-val">{group.rating}</span></div>
          <div className="exp-spec-row"><span className="exp-label">Export documentation</span><span className="exp-spec-val">{group.docs}</span></div>
          <div className="exp-spec-row"><span className="exp-label">Customisation</span><span className="exp-spec-val">{group.custom}</span></div>
          <div className="exp-spec-row"><span className="exp-label">Includes</span><span className="exp-spec-val">{group.items.join(', ')}</span></div>
        </div>
        <p className="exp-fineprint">Indicative HS headings are confirmed per product and destination. Final classification is set at quotation.</p>
        <div className="exp-result-actions">
          <button className="btn btn-primary" onClick={() => { exportTrack('export_rfq_start', { group: group.id }); navigate('contact'); }}>
            Submit RFQ <span className="arrow" aria-hidden="true">→</span>
          </button>
          <button className="btn btn-secondary" onClick={() => { exportTrack('datasheet_download', { group: group.id }); navigate('products', group.id); }}>
            Request datasheet
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===========================================================
   COMPONENT: Certifications matrix (desktop table + mobile cards)
   =========================================================== */
function CertMatrix() {
  return (
    <div className="exp-cert">
      <div className="exp-cert-legend">
        {Object.keys(CERT_STATUS).map(k => (
          <span key={k} className={`exp-cert-key ${CERT_STATUS[k].cls}`}>
            <span className="exp-cert-dot" aria-hidden="true" />{CERT_STATUS[k].label}
          </span>
        ))}
      </div>

      {CERT_GROUPS.map(grp => (
        <div className="exp-cert-group" key={grp.group}>
          <h3 className="exp-cert-grouptitle">{grp.group}</h3>

          {/* desktop table */}
          <div className="exp-cert-table" role="table">
            <div className="exp-cert-trow exp-cert-thead" role="row">
              <span role="columnheader">Standard</span>
              <span role="columnheader">Status</span>
              <span role="columnheader">Product group</span>
              <span role="columnheader">Region</span>
              <span role="columnheader">Certificate / dates</span>
            </div>
            {grp.rows.map(r => (
              <div className="exp-cert-trow" role="row" key={r.name}>
                <span role="cell" className="exp-cert-name">
                  <strong>{r.name}</strong>
                  <span className="exp-cert-scope">{r.scope}</span>
                </span>
                <span role="cell">
                  <span className={`exp-cert-badge ${CERT_STATUS[r.status].cls}`}>
                    <span className="exp-cert-dot" aria-hidden="true" />{CERT_STATUS[r.status].label}
                  </span>
                </span>
                <span role="cell" className="exp-cert-meta">{r.product}</span>
                <span role="cell" className="exp-cert-meta">{r.region}</span>
                <span role="cell" className="exp-cert-meta">Reference on request<br /><span className="exp-cert-note">{r.note}</span></span>
              </div>
            ))}
          </div>

          {/* mobile expandable cards */}
          <div className="exp-cert-cards">
            {grp.rows.map(r => <CertCard key={r.name} r={r} />)}
          </div>
        </div>
      ))}

      <p className="exp-claims">Only currently held certifications are displayed as held. Additional market approvals are evaluated based on product, destination and order requirements. Certificate numbers and validity dates are provided on request and verification.</p>
    </div>
  );
}

function CertCard({ r }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={`exp-cert-card ${open ? 'open' : ''}`}>
      <button className="exp-cert-card-head" aria-expanded={open} onClick={() => { setOpen(!open); if (!open) exportTrack('clearance_scheme_view', { cert: r.name }); }}>
        <span className="exp-cert-card-name">{r.name}</span>
        <span className={`exp-cert-badge ${CERT_STATUS[r.status].cls}`}>
          <span className="exp-cert-dot" aria-hidden="true" />{CERT_STATUS[r.status].label}
        </span>
        <span className="exp-cert-card-icon" aria-hidden="true">{open ? '–' : '+'}</span>
      </button>
      <div className="exp-cert-card-body">
        <div className="exp-cert-card-inner">
          <div className="exp-spec-row"><span className="exp-label">Scope</span><span className="exp-spec-val">{r.scope}</span></div>
          <div className="exp-spec-row"><span className="exp-label">Product group</span><span className="exp-spec-val">{r.product}</span></div>
          <div className="exp-spec-row"><span className="exp-label">Region</span><span className="exp-spec-val">{r.region}</span></div>
          <div className="exp-spec-row"><span className="exp-label">Certificate / dates</span><span className="exp-spec-val">Reference on request</span></div>
          <p className="exp-cert-note">{r.note}</p>
          <button className="exp-textlink" onClick={() => exportTrack('certificate_download', { cert: r.name })}>Download certificate <span aria-hidden="true">→</span></button>
        </div>
      </div>
    </div>
  );
}

/* ===========================================================
   COMPONENT: Destination-market clearance selector
   =========================================================== */
function ClearanceSelector({ navigate }) {
  const [countryId, setCountryId] = React.useState(EXP_CLEARANCE[0].id);
  const [groupId, setGroupId] = React.useState(EXP_PORTFOLIO[0].id);
  const country = EXP_CLEARANCE.find(c => c.id === countryId);
  const group = EXP_PORTFOLIO.find(g => g.id === groupId);

  function pickCountry(id) { setCountryId(id); exportTrack('clearance_scheme_view', { country: id }); }

  return (
    <div className="exp-clear">
      <div className="exp-clear-controls">
        <div className="exp-clear-field">
          <div className="exp-label">1. Destination country</div>
          <div className="exp-chip-row">
            {EXP_CLEARANCE.map(c => (
              <button key={c.id} className={`exp-chip ${countryId === c.id ? 'is-on' : ''}`} onClick={() => pickCountry(c.id)}>{c.country}</button>
            ))}
          </div>
        </div>
        <div className="exp-clear-field">
          <div className="exp-label">2. Product group</div>
          <div className="exp-chip-row">
            {EXP_PORTFOLIO.map(g => (
              <button key={g.id} className={`exp-chip exp-chip-blue ${groupId === g.id ? 'is-on' : ''}`} onClick={() => setGroupId(g.id)}>{g.group}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="exp-clear-result">
        <div className="exp-clear-result-head">
          <div className="exp-label" style={{ color: 'var(--accent)' }}>3. Likely compliance path</div>
          <h3>{group.group} into {country.country}</h3>
          <span className="exp-path-tag exp-path-tag-blue">{country.region}</span>
        </div>
        <ol className="exp-clear-steps">
          {country.schemes.map((s, i) => (
            <li key={i}><span className="exp-clear-num">{String(i + 1).padStart(2, '0')}</span><span>{s}</span></li>
          ))}
        </ol>
        <p className="exp-fineprint">Destination-market requirements are reviewed based on product category, intended application, destination country and importer responsibilities. Final approval remains subject to the relevant authority and conformity process. We do not guarantee customs clearance or automatic acceptance.</p>
        <button className="btn btn-primary" onClick={() => { exportTrack('export_rfq_start', { country: country.id, group: group.id }); navigate('contact'); }}>
          4. Submit RFQ for detailed review <span className="arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}

/* ===========================================================
   COMPONENT: FAQ accordion
   =========================================================== */
function ExportFaq() {
  const [open, setOpen] = React.useState(0);
  return (
    <div className="exp-faq">
      {EXP_FAQ.map((f, i) => {
        const isOpen = open === i;
        return (
          <div className={`exp-faq-item ${isOpen ? 'open' : ''}`} key={i}>
            <button className="exp-faq-q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
              <span>{f.q}</span>
              <span className="exp-faq-icon" aria-hidden="true">{isOpen ? '–' : '+'}</span>
            </button>
            <div className="exp-faq-a"><div className="exp-faq-a-inner"><p>{f.a}</p></div></div>
          </div>
        );
      })}
    </div>
  );
}

/* ===========================================================
   COMPONENT: Multi-step export RFQ
   =========================================================== */
const RFQ_STANDARDS = ['IEC 60076', 'IEC 61439', 'IEC 61558', 'CE', 'UL', 'EN 50155', 'Customer specific', 'To be advised'];

function ExportRfq() {
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState({ group: '', country: '', qty: '', standard: '', requirement: '', file: '' });
  const [done, setDone] = React.useState(false);
  const total = 6;

  function set(k, v) { setData(d => Object.assign({}, d, { [k]: v })); }
  function next() {
    if (step < total) { const ns = step + 1; setStep(ns); exportTrack('export_rfq_step_' + (ns - 1), { step: ns }); }
  }
  function back() { if (step > 1) setStep(step - 1); }
  function submit() { exportTrack('export_rfq_submit', data); setDone(true); }

  React.useEffect(() => { exportTrack('export_rfq_start'); }, []);

  if (done) {
    return (
      <div className="exp-rfq exp-rfq-done">
        <div className="exp-rfq-check" aria-hidden="true">✓</div>
        <h3>Thank you. Your export requirement has been received.</h3>
        <p>Our team will review the product, destination and documentation needs and respond with the next steps.</p>
        <button className="btn btn-secondary" onClick={() => { setDone(false); setStep(1); setData({ group: '', country: '', qty: '', standard: '', requirement: '', file: '' }); }}>Start another enquiry</button>
      </div>
    );
  }

  return (
    <div className="exp-rfq">
      <div className="exp-rfq-progress">
        {Array.from({ length: total }).map((_, i) => (
          <span key={i} className={`exp-rfq-pip ${i + 1 <= step ? 'is-on' : ''}`} />
        ))}
        <span className="exp-rfq-stepno">Step {step} of {total}</span>
      </div>

      <div className="exp-rfq-body">
        {step === 1 && (
          <div className="exp-rfq-field">
            <label className="exp-label">Product group</label>
            <div className="exp-chip-row">
              {EXP_PORTFOLIO.map(g => (
                <button key={g.id} className={`exp-chip ${data.group === g.group ? 'is-on' : ''}`} onClick={() => set('group', g.group)}>{g.group}</button>
              ))}
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="exp-rfq-field">
            <label className="exp-label">Destination country</label>
            <div className="exp-chip-row">
              {EXP_CLEARANCE.map(c => (
                <button key={c.id} className={`exp-chip exp-chip-blue ${data.country === c.country ? 'is-on' : ''}`} onClick={() => set('country', c.country)}>{c.country}</button>
              ))}
              <button className={`exp-chip exp-chip-blue ${data.country === 'Other' ? 'is-on' : ''}`} onClick={() => set('country', 'Other')}>Other</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="exp-rfq-field">
            <label className="exp-label" htmlFor="rfq-qty">Quantity or project volume</label>
            <input id="rfq-qty" className="exp-input" type="text" value={data.qty} onChange={e => set('qty', e.target.value)} placeholder="e.g. 12 units, or 3 substations" />
          </div>
        )}
        {step === 4 && (
          <div className="exp-rfq-field">
            <label className="exp-label">Required standard or certification</label>
            <div className="exp-chip-row">
              {RFQ_STANDARDS.map(s => (
                <button key={s} className={`exp-chip ${data.standard === s ? 'is-on' : ''}`} onClick={() => set('standard', s)}>{s}</button>
              ))}
            </div>
          </div>
        )}
        {step === 5 && (
          <div className="exp-rfq-field">
            <label className="exp-label" htmlFor="rfq-req">Technical requirement</label>
            <textarea id="rfq-req" className="exp-input exp-textarea" value={data.requirement} onChange={e => set('requirement', e.target.value)} placeholder="Ratings, application, load profile, interfaces, timeline" rows="4" />
          </div>
        )}
        {step === 6 && (
          <div className="exp-rfq-field">
            <label className="exp-label" htmlFor="rfq-file">Upload one supporting document</label>
            <input id="rfq-file" className="exp-input exp-file" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" onChange={e => set('file', e.target.value)} />
            <p className="exp-fineprint">Accepted formats: PDF, Word, Excel. Please do not upload large DWG files at this stage.</p>
          </div>
        )}
      </div>

      <div className="exp-rfq-nav">
        <button className="btn btn-ghost" onClick={back} disabled={step === 1} style={{ opacity: step === 1 ? 0.4 : 1 }}>Back</button>
        {step < total
          ? <button className="btn btn-secondary" onClick={next}>Next <span className="arrow" aria-hidden="true">→</span></button>
          : <button className="btn btn-primary" onClick={submit}>Request an Export Quote <span className="arrow" aria-hidden="true">→</span></button>}
      </div>
    </div>
  );
}

Object.assign(window, {
  exportTrack,
  EXP_TRUST, EXP_REGIONS, EXP_SECTORS, EXP_PORTFOLIO, EXP_LEGAL, EXP_FINANCIAL,
  CERT_GROUPS, CERT_STATUS, EXP_CLEARANCE, EXP_TESTING_SUPPORT,
  EXP_QUALITY, EXP_QUALITY_DOCS, EXP_TRADE, EXP_ESG, EXP_STATUS_CHIP,
  EXP_PROCESS, EXP_INCOTERMS, EXP_DOCS_STD, EXP_DOCS_APP, EXP_LOGISTICS2,
  EXP_AFTERSALES, EXP_FAQ,
  ExportSelfSelect, CertMatrix, CertCard, ClearanceSelector, ExportFaq, ExportRfq,
});
