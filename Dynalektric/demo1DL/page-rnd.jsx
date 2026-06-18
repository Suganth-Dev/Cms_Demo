/* page-rnd.jsx — Innovation & R&D Portfolio */

const FOCUS_AREAS = [
  {
    num: '01',
    title: 'Magnetics engineering',
    body: 'Design and development of transformers, reactors and magnetic components for industrial, railway and renewable applications.',
    deliverables: ['LV Transformers', 'MV Transformers', 'Air-Core Reactors', 'De-tuned Reactors'],
  },
  {
    num: '02',
    title: 'Control panel engineering',
    body: 'Engineering and manufacturing of locomotive panels, driver desk panels and power distribution assemblies.',
    deliverables: ['Locomotive Panels', 'Driver Desk Panels', 'PDUs', 'Power Panels'],
  },
  {
    num: '03',
    title: 'Power electronics solutions',
    body: 'Battery charging and power conversion systems for material handling, utility and special applications.',
    deliverables: ['MHE Battery Chargers', 'Float Cum Boost Chargers', 'Special Application Chargers', 'UPS Systems'],
  },
  {
    num: '04',
    title: 'OEM integration solutions',
    body: 'Custom electrical assemblies and sub-systems supporting railway and industrial customers.',
    deliverables: ['Busbars', 'Wire Harnesses', 'Current Sensors', 'Fire Detection Units'],
  },
];

const PROCESS = [
  { num: '01', title: 'Brief and specification',        body: 'Application, load profile, environment and compliance requirements.' },
  { num: '02', title: 'Technical review and proposal',  body: 'Engineering review, technical feasibility and commercial proposal based on customer requirements.' },
  { num: '03', title: 'Design and engineering',         body: 'Electrical, mechanical and application-specific engineering based on customer requirements.' },
  { num: '04', title: 'Prototype and test',             body: 'Manufacturing, assembly, inspection and testing according to project requirements.' },
  { num: '05', title: 'Series production',              body: 'Production, documentation, dispatch and after-sales support.' },
];

function PageRnd({ navigate, isEditMode, handleInlineEdit, handleInlineFileUpload }) {
  useReveal();
  const content = (window.CMS_DYNA_DATA && window.CMS_DYNA_DATA.settings && window.CMS_DYNA_DATA.settings.pageContent && window.CMS_DYNA_DATA.settings.pageContent.rnd) || {};
  const heroImgSrc = content.heroImg || './assets/engineering-npd.jpg';
  const engImgSrc = content.engImg || './assets/engineering-bench.jpg';
  return (
    <main className="page-enter">
      <section className="page-hero page-hero--split">
        <div className="container">
          <div className="page-hero-copy">
            <div className="mono">INNOVATION PORTFOLIO</div>
            <h1>Innovation and R&amp;D portfolio for custom power solutions.</h1>
            <p className="lead">
              Our engineering capability covers transformers, reactors, control panels, battery chargers and custom electrical assemblies. From design and manufacturing to testing and documentation, Dynalektric supports OEMs, utilities and industrial customers with reliable power solutions.
            </p>
          </div>
          <div className="page-hero-visual" style={{ position: 'relative' }}>
            <img
              src={heroImgSrc}
              alt="Dynalektric engineering and product development"
              width="720"
              height="540"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {isEditMode && (
              <button
                onClick={() => handleInlineFileUpload('rnd', 'heroImg', 'image/*')}
                style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.7)', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 14px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 10 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                Change Image
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span className="mono">Focus areas</span></div>
            <div>
              <h2>Four programmes, one engineering team.</h2>
              <p style={{ marginTop: 16, fontSize: 15, color: 'var(--ink-soft)' }}>Hover any focus area to see programme deliverables in active development.</p>
            </div>
          </div>

          <div className="focus-grid">
            {FOCUS_AREAS.map(f => (
              <div className="cap-card reveal" key={f.num}>
                <div>
                  <div className="num">{f.num}</div>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', color: 'var(--ink-muted)', marginBottom: 16, textTransform: 'uppercase' }}>Focus Area</div>
                  <h3>{f.title}</h3>
                  <p className="reveal-body">{f.body}</p>
                  <ul className="reveal-body focus-deliverables">
                    {f.deliverables.map((d, i) => (
                      <li key={i}><span className="mono">+</span> {d}</li>
                    ))}
                  </ul>
                </div>
                <div className="footer-mark">
                  <span>In-house engineering</span>
                  <span>+</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section reveal" style={{ background: 'var(--panel-dark)', color: 'var(--on-dark)' }}>
        <div className="container">
          <div className="section-head" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="eyebrow"><span className="mono" style={{ color: 'rgba(244,244,241,0.6)' }}>Engineering workflow</span></div>
            <div><h2 style={{ color: 'var(--bg)' }}>How a Dynalektric project moves.</h2></div>
          </div>
          <div className="process-flow">
            {PROCESS.map(s => (
              <div className="process-step" key={s.num}>
                <div className="num">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="mono" style={{ color: 'var(--accent)' }}>Custom engineering</div>
              <h2 style={{ marginTop: 16 }}>Have a non-standard requirement?</h2>
              <p className="lead" style={{ marginTop: 24 }}>Our engineering team supports customer-specific requirements with technical review, product customization and manufacturing support for industrial, railway and power applications.</p>
              <div style={{ display: 'flex', gap: 16, marginTop: 32, flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={() => navigate('contact')}>Submit RFQ <span className="arrow">→</span></button>
                <button className="btn btn-secondary" onClick={() => navigate('products')}>Browse products</button>
              </div>
            </div>
           <div style={{ aspectRatio: '4/3', position: 'relative' }}>
            <img
              src={engImgSrc}
              alt="Dynalektric engineering and manufacturing"
              width="720"
              height="540"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px'
               }}
            />
            {isEditMode && (
              <button
                onClick={() => handleInlineFileUpload('rnd', 'engImg', 'image/*')}
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

      <Footer navigate={navigate} />
    </main>
  );
}

window.PageRnd = PageRnd;
