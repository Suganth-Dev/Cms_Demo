/* page-about.jsx */

function PageAbout({ navigate, isEditMode, handleInlineEdit, handleInlineFileUpload }) {
  useReveal();

  const content = (window.CMS_DYNA_DATA && window.CMS_DYNA_DATA.settings && window.CMS_DYNA_DATA.settings.pageContent && window.CMS_DYNA_DATA.settings.pageContent.about) || {};
  const pageTitle = content.title || 'Engineering and Manufacturing Capability';
  const pageDesc = content.desc || 'Dynalektric designs and manufactures custom magnetics, transformers, control panels and power electronics for OEMs, EPC contractors and utilities. We engineer to specification, test in-house and document everything we ship.';
  const heroImgSrc = content.heroImg || './assets/hero-poster.jpg';
  const facilityImgSrc = content.facilityImg || null;
  const windingImgSrc = content.windingImg || null;
  const testBayImgSrc = content.testBayImg || null;

  return (
    <main className="page-enter">
      <section className="page-hero page-hero--split">
        <div className="container">
          <div className="page-hero-copy">
            <div className="mono">ABOUT DYNALEKTRIC</div>
            <h1
              contentEditable={isEditMode}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleInlineEdit('about', 'title', e.currentTarget.innerText)}
              className={isEditMode ? 'inline-editable' : ''}
            >{pageTitle}</h1>
            <p
              contentEditable={isEditMode}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleInlineEdit('about', 'desc', e.currentTarget.innerText)}
              className={isEditMode ? 'inline-editable lead' : 'lead'}
            >
              {pageDesc}
            </p>
          </div>
          <div className="page-hero-visual" style={{ position: 'relative' }}>
            <img
              src={heroImgSrc}
              alt="Dynalektric manufacturing facility"
              width="720"
              height="540"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {isEditMode && (
              <button
                onClick={() => handleInlineFileUpload('about', 'heroImg', 'image/*')}
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
          <div className="about-grid">
            <div>
              <div className="mono" style={{ color: 'var(--accent)', marginBottom: 16, fontWeight: 600 }}>Company</div>
              <h2 style={{ marginBottom: 24 }}>An engineering-led manufacturer.</h2>
              <div style={{ paddingTop: 24, borderTop: '1px solid var(--rule)' }}>
                <div className="mono" style={{ marginBottom: 12 }}>Established</div>
                <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 20 }}>1980, India</div>
                <div className="mono" style={{ marginBottom: 12 }}>Markets served</div>
                <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 20 }}>India, Europe, Middle East, Asia</div>
                <div className="mono" style={{ marginBottom: 12 }}>Buyers we work with</div>
                <div style={{ fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.5 }}>OEMs, EPC contractors, utilities, railways, industrial automation companies, procurement and SCM teams.</div>
              </div>
            </div>
            <div>
              <p className="lead" style={{ marginBottom: 24 }}>
                We work as a long-term manufacturing partner. Our engineers take a customer specification, ask the right questions and supply a tested, documented solution on schedule.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-soft)' }}>
                From single prototype builds to repeat production lines, the approach is the same: every Dynalektric product is designed, wound, wired, tested and documented in-house. Engineering, manufacturing and quality work on one floor, on one team.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section reveal" style={{ background: 'var(--panel-dark)', color: 'var(--on-dark)', padding: 'calc(var(--section-y) * 0.8) 0' }}>
        <div className="container">
          <div className="mono" style={{ color: 'rgba(244,244,241,0.6)', marginBottom: 40, textAlign: 'center' }}>By the numbers</div>
          <div className="about-stats">
            <div style={{ textAlign: 'center' }}>
              <div className="big-num" style={{ marginBottom: 16, color: '#ffffff' }}><Counter to={40} />+</div>
              <div className="mono" style={{ color: 'rgba(244,244,241,0.6)', marginBottom: 8 }}>Years</div>
              <p style={{ fontSize: 14, color: 'rgba(244,244,241,0.75)' }}>Of in-house engineering and manufacturing</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="big-num" style={{ marginBottom: 16, color: '#ffffff' }}><Counter to={500} />+</div>
              <div className="mono" style={{ color: 'rgba(244,244,241,0.6)', marginBottom: 8 }}>Designs</div>
              <p style={{ fontSize: 14, color: 'rgba(244,244,241,0.75)' }}>Custom solutions delivered to specification</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="big-num" style={{ marginBottom: 16, color: '#ffffff' }}><Counter to={15} />+</div>
              <div className="mono" style={{ color: 'rgba(244,244,241,0.6)', marginBottom: 8 }}>Markets</div>
              <p style={{ fontSize: 14, color: 'rgba(244,244,241,0.75)' }}>Export destinations across three continents</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span className="mono">Manufacturing and engineering capability</span></div>
            <div><h2>Designed, wound, wired and tested in-house.</h2></div>
          </div>

          <div className="about-cap-grid">
            <div className="about-cap-item">
              <div className="mono num">01</div>
              <h3>Design and development</h3>
              <p>In-house electrical, mechanical and thermal design. From concept and feasibility through prototype, validation and series production release.</p>
            </div>
            <div className="about-cap-item">
              <div className="mono num">02</div>
              <h3>Winding and assembly</h3>
              <p>Precision winding lines for magnetics and transformers. Vacuum pressure impregnation, oven curing and quality control at every stage.</p>
            </div>
            <div className="about-cap-item">
              <div className="mono num">03</div>
              <h3>Panel build and wiring</h3>
              <p>Type-tested control panel assemblies built to IEC 61439 with full mechanical, electrical and FAT documentation.</p>
            </div>
            <div className="about-cap-item">
              <div className="mono num">04</div>
              <h3>Routine and type testing</h3>
              <p>On-site test labs for high-voltage, partial discharge, temperature rise and impulse testing. Supplemented by accredited external partners.</p>
            </div>
            <div className="about-cap-item">
              <div className="mono num">05</div>
              <h3>Quality systems</h3>
              <p>Quality management aligned with ISO 9001, supported by customer-specific QAP frameworks and full material traceability on request.</p>
            </div>
            <div className="about-cap-item">
              <div className="mono num">06</div>
              <h3>Engineering support</h3>
              <p>Application engineering stays engaged after dispatch through commissioning, field issues and product-life support.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section reveal" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span className="mono">Quality and compliance</span></div>
            <div>
              <h2>Standards, testing and documentation.</h2>
              <p style={{ marginTop: 16, fontSize: 15, color: 'var(--ink-soft)' }}>
                Designs validated against IEC, IS and region-specific requirements. Routine and type testing on every order. Documentation prepared for supplier qualification and project handover.
              </p>
            </div>
          </div>
          <div className="cert-row">
            {CERTIFICATIONS.map(c => (
              <div className="cert-item" key={c.code}>
                <div className="cert-code">{c.code}</div>
                <div className="cert-label mono">{c.label}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, padding: 24, background: 'var(--bg-card)', border: '1px solid var(--rule)' }}>
            <div className="mono" style={{ marginBottom: 12, color: 'var(--accent)', fontWeight: 600 }}>Quality assurance process</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Routine testing</div>
                <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>100% electrical and thermal validation</div>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Type testing</div>
                <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>On-site and accredited external labs</div>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>FAT support</div>
                <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>Factory acceptance testing with the customer</div>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Documentation</div>
                <div style={{ fontSize: 13, color: 'var(--ink-soft)' }}>Full QAP, test reports, GA drawings, BoM</div>
              </div>
            </div>
          </div>
          <div className="mono" style={{ marginTop: 24, color: 'var(--ink-muted)' }}>Certificate copies available on request for supplier qualification</div>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span className="mono">Facility</span></div>
            <div><h2>One floor, one team, one engineering culture.</h2></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32, position: 'relative' }}>
            <div style={{ aspectRatio: '16/9', position: 'relative', background: facilityImgSrc ? 'none' : 'var(--bg-alt)', border: facilityImgSrc ? 'none' : '1px dashed var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '4px' }}>
              {facilityImgSrc
                ? <img src={facilityImgSrc} alt="Facility" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span className="mono" style={{ color: 'var(--ink-muted)', fontSize: 13 }}>Facility wide-shot — click Upload to add</span>
              }
              {isEditMode && (
                <button
                  onClick={() => handleInlineFileUpload('about', 'facilityImg', 'image/*')}
                  style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.7)', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 14px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 10, whiteSpace: 'nowrap' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  {facilityImgSrc ? 'Change Image' : 'Upload Facility Image'}
                </button>
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 32 }}>
              <div style={{ position: 'relative', background: windingImgSrc ? 'none' : 'var(--bg-alt)', border: windingImgSrc ? 'none' : '1px dashed var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '4px', minHeight: '120px' }}>
                {windingImgSrc
                  ? <img src={windingImgSrc} alt="Winding floor" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <span className="mono" style={{ color: 'var(--ink-muted)', fontSize: 12 }}>Winding floor</span>
                }
                {isEditMode && (
                  <button
                    onClick={() => handleInlineFileUpload('about', 'windingImg', 'image/*')}
                    style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.7)', color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', zIndex: 10, whiteSpace: 'nowrap' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    {windingImgSrc ? 'Change' : 'Upload'}
                  </button>
                )}
              </div>
              <div style={{ position: 'relative', background: testBayImgSrc ? 'none' : 'var(--bg-alt)', border: testBayImgSrc ? 'none' : '1px dashed var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '4px', minHeight: '120px' }}>
                {testBayImgSrc
                  ? <img src={testBayImgSrc} alt="Test bay" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <span className="mono" style={{ color: 'var(--ink-muted)', fontSize: 12 }}>Test bay</span>
                }
                {isEditMode && (
                  <button
                    onClick={() => handleInlineFileUpload('about', 'testBayImg', 'image/*')}
                    style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.7)', color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', zIndex: 10, whiteSpace: 'nowrap' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    {testBayImgSrc ? 'Change' : 'Upload'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA navigate={navigate} />
      <Footer navigate={navigate} />
    </main>
  );
}

window.PageAbout = PageAbout;
