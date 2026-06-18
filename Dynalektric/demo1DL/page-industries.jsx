/* page-industries.jsx */

function PageIndustries({ navigate, focusId, isEditMode, handleInlineEdit, handleInlineFileUpload, handleInlineOpenEditModal, handleInlineDeleteProduct, handleInlineAddProduct }) {
  useReveal();
  // Load DB industries and merge with static rich data
  const DB_INDUSTRIES = (window.CMS_DYNA_DATA && window.CMS_DYNA_DATA.industries) ? window.CMS_DYNA_DATA.industries : [];
  
  const COMBINED_INDUSTRIES = React.useMemo(() => {
    if (DB_INDUSTRIES.length === 0) return INDUSTRIES.map(ind => ({ ...ind, dbId: ind.id }));
    
    // Map of known slugs to static INDUSTRIES ids
    const slugMap = {
      'railway-traction': 'railways',
      'renewable-sectors': 'renewables',
      'power-utilities': 'powergrid',
      'heavy-industries': 'heavy',
      'material-handling-warehousing': 'mhe',
      'data-centers': 'datacenter'
    };

    // Helper to find the matching static ID for a DB item
    const getStaticId = (dbInd) => {
      if (dbInd.slug && slugMap[dbInd.slug]) return slugMap[dbInd.slug];
      const title = (dbInd.title || '').toLowerCase();
      if (title.includes('rail')) return 'railways';
      if (title.includes('renew')) return 'renewables';
      if (title.includes('power') || title.includes('utilit')) return 'powergrid';
      if (title.includes('heavy')) return 'heavy';
      if (title.includes('material') || title.includes('warehous')) return 'mhe';
      if (title.includes('data')) return 'datacenter';
      return null;
    };

    const combined = [];
    const usedDbIds = new Set();
    let counter = 1;

    // 1. Process static INDUSTRIES in their exact original order (1 to 6)
    INDUSTRIES.forEach((staticInd) => {
      // Find a matching DB industry for this static industry
      const matchedDbInd = DB_INDUSTRIES.find(dbInd => getStaticId(dbInd) === staticInd.id);
      
      let parsedFeatures = [];
      if (matchedDbInd) {
        usedDbIds.add(matchedDbInd.id);
        try { parsedFeatures = typeof matchedDbInd.features === 'string' ? JSON.parse(matchedDbInd.features) : (matchedDbInd.features || []); } catch(e) {}
      }

      combined.push({
        dbId: matchedDbInd ? matchedDbInd.id : staticInd.id,
        num: String(counter++).padStart(2, '0'),
        id: staticInd.id,
        name: matchedDbInd ? (matchedDbInd.title || staticInd.name) : staticInd.name,
        short: staticInd.short,
        body: matchedDbInd ? (matchedDbInd.description || staticInd.body) : staticInd.body,
        buyer: staticInd.buyer,
        qa: staticInd.qa,
        applications: parsedFeatures.length > 0 ? parsedFeatures : staticInd.applications,
        products: staticInd.products
      });
    });

    // 2. Process any remaining DB industries that weren't matched
    DB_INDUSTRIES.forEach((dbInd) => {
      if (!usedDbIds.has(dbInd.id)) {
        let parsedFeatures = [];
        try { parsedFeatures = typeof dbInd.features === 'string' ? JSON.parse(dbInd.features) : (dbInd.features || []); } catch(e) {}

        combined.push({
          dbId: dbInd.id,
          num: String(counter++).padStart(2, '0'),
          id: dbInd.id, // unique fallback for custom
          name: dbInd.title || 'New Industry',
          short: '',
          body: dbInd.description || '',
          buyer: 'Industry buyers, integrators and procurement teams.',
          qa: null,
          applications: parsedFeatures.length > 0 ? parsedFeatures : [],
          products: []
        });
      }
    });

    return combined;
  }, [DB_INDUSTRIES]);

  const [activeRow, setActiveRow] = React.useState(focusId || COMBINED_INDUSTRIES[0].id);
  const [activeCol, setActiveCol] = React.useState(null);
  const content = (window.CMS_DYNA_DATA && window.CMS_DYNA_DATA.settings && window.CMS_DYNA_DATA.settings.pageContent && window.CMS_DYNA_DATA.settings.pageContent.industries) || {};
  const heroImgSrc = content.heroImg || './assets/industry-railways.jpg';

  React.useEffect(() => {
    if (focusId) setActiveRow(focusId);
  }, [focusId]);

  const activeIndustry = COMBINED_INDUSTRIES.find(i => i.id === activeRow) || COMBINED_INDUSTRIES[0];

  return (
    <main className="page-enter">
      <section className="page-hero page-hero--split">
        <div className="container">
          <div className="page-hero-copy">
            <div className="mono">INDUSTRIES AND APPLICATIONS</div>
            <h1>Applications across railways, renewables, utilities and industrial sectors.</h1>
            <p className="lead">
              Six sectors served across Power, Motion and Safety. Use the matrix to see which product groups apply to each industry, then jump into a detailed view of applications and buyer profile.
            </p>
          </div>
          <div className="page-hero-visual" style={{ position: 'relative' }}>
            <img
              src={heroImgSrc}
              alt="Railway infrastructure — Dynalektric traction and industrial applications"
              width="720"
              height="540"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {isEditMode && (
              <button
                onClick={() => handleInlineFileUpload('industries', 'heroImg', 'image/*')}
                style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.7)', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 14px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 10 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                Change Image
              </button>
            )}
          </div>
        </div>
      </section>

      {/* MATRIX */}
      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span className="mono">Capability matrix</span></div>
            <div>
              <h2>Product group to industry fit.</h2>
            </div>
          </div>

          <div className="matrix-intro">
            <div className="matrix-intro-copy">
              <h4>Interactive capability map</h4>
              <p>Select an industry row to see relevant product groups and applications. Hover a product group column to see all industries it covers.</p>
            </div>
            <div className="matrix-legend">
              <div className="matrix-legend-item">
                <span className="mark filled"></span>
                <span>Active fit</span>
              </div>
              <div className="matrix-legend-item">
                <span className="mark"></span>
                <span>Not currently mapped</span>
              </div>
            </div>
          </div>

          <div className="matrix-wrap">
            <div className="matrix-table-wrap">
            <div className="matrix-table matrix-4col">
              {/* Header row */}
              <div className="matrix-cell head">Industry · Product group</div>
              {PRODUCTS.map(p => (
                <div
                  key={p.id}
                  className={`matrix-cell head ${activeCol === p.id ? 'is-active-col' : ''}`}
                  onMouseEnter={() => setActiveCol(p.id)}
                  onMouseLeave={() => setActiveCol(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {p.num}<br />{p.name}
                </div>
              ))}

              {/* Body rows */}
              {COMBINED_INDUSTRIES.map(ind => (
                <React.Fragment key={ind.id}>
                  <div
                    className={`matrix-cell row-head ${activeRow === ind.id ? 'is-active-row' : ''}`}
                    onClick={() => setActiveRow(ind.id)}
                  >
                    <span className="num">{ind.num}</span>
                    <span>{ind.name}</span>
                  </div>
                  {PRODUCTS.map(p => {
                    const on = p.industries.includes(ind.id) || ind.products.includes(p.id);
                    return (
                      <div
                        key={`${ind.id}-${p.id}`}
                        className={`matrix-cell ${on ? 'is-on' : ''} ${activeRow === ind.id ? 'is-active-row' : ''} ${activeCol === p.id ? 'is-active-col' : ''}`}
                        onClick={() => { setActiveRow(ind.id); setActiveCol(p.id); }}
                      >
                        <span className="mark"></span>
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
            </div>{/* /matrix-table-wrap */}

            {/* Detail panel */}
            <aside className="industry-detail">
              <div className="num">Selected industry</div>
              <h3>{activeIndustry.name}</h3>
              <p>{activeIndustry.body}</p>
              <div className="apps-label">Application examples</div>
              <ul className="apps">
                {activeIndustry.applications.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
              <div className="apps-label">Typical buyer need</div>
              <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6, marginTop: 4 }}>{activeIndustry.buyer}</p>
              {activeIndustry.qa && (
                <>
                  <div className="apps-label">Quality or testing consideration</div>
                  <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6, marginTop: 4 }}>{activeIndustry.qa}</p>
                </>
              )}
              <div className="apps-label">Relevant product groups</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {PRODUCTS.filter(p => p.industries.includes(activeRow) || activeIndustry.products.includes(p.id)).map(p => (
                  <button
                    key={p.id}
                    onClick={() => navigate('products', p.id)}
                    style={{ background: 'var(--bg-alt)', border: '1px solid var(--rule)', padding: '8px 14px', fontSize: 12, cursor: 'pointer', borderRadius: 2, fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'all 200ms' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--bg)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-alt)'; e.currentTarget.style.color = 'var(--ink)'; }}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
              <button className="btn btn-primary" style={{ marginTop: 32, width: '100%', justifyContent: 'center' }} onClick={() => navigate('contact')}>
                Submit RFQ for this application <span className="arrow">→</span>
              </button>
            </aside>
          </div>
        </div>
      </section>

      {/* DETAILED CARDS */}
      <section className="section reveal" style={{ background: 'var(--bg-alt)' }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow"><span className="mono">Industry deep dive</span></div>
            <div>
              <h2>Six sectors, one engineering approach.</h2>
              <p style={{ marginTop: 16, fontSize: 15, color: 'var(--ink-soft)' }}>
                Detailed view of each industry served: applications, relevant product groups and how to start a conversation.
              </p>
            </div>
          </div>

          <div className="industry-cards">
            {COMBINED_INDUSTRIES.map(ind => (
              <article className="industry-card reveal" key={ind.id} id={`industry-${ind.id}`} style={{ position: 'relative' }}>
                {isEditMode && ind.dbId && (
                  <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10, display: 'flex', gap: '8px' }}>
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleInlineOpenEditModal && handleInlineOpenEditModal(ind.dbId); }}
                      style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      Edit
                    </button>
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleInlineDeleteProduct && handleInlineDeleteProduct(ind.dbId); }}
                      style={{ background: 'rgba(220, 38, 38, 0.9)', color: '#fff', border: 'none', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      Delete
                    </button>
                  </div>
                )}
                <div className="num">{ind.num}</div>
                <div>
                  <h3>{ind.name}</h3>
                  <p className="body" style={{ marginTop: 12 }}>{ind.body}</p>
                  <div className="apps-label" style={{ marginTop: 20 }}>Typical buyer need</div>
                  <p className="body" style={{ marginTop: 4, fontSize: 13 }}>{ind.buyer}</p>
                  {ind.qa && (
                    <div className="qa-note">
                      <div className="case-label">Quality or testing consideration</div>
                      <div className="case-value">{ind.qa}</div>
                    </div>
                  )}
                </div>
                <div>
                  <div className="apps-label">Application examples</div>
                  <ul className="apps">
                    {ind.applications.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                </div>
                <div className="cta-col">
                  <div className="apps-label">Relevant product groups</div>
                  {PRODUCTS.filter(p => p.industries.includes(ind.id) || ind.products.includes(p.id)).map(p => (
                    <button key={p.id} style={{ background: 'none', border: 0, borderBottom: '1px solid var(--rule)', padding: '10px 0', fontSize: 13, cursor: 'pointer', textAlign: 'left', width: '100%', color: 'var(--ink)', fontWeight: 500 }} onClick={() => navigate('products', p.id)}>
                      {p.name} →
                    </button>
                  ))}
                  <button className="btn btn-primary" style={{ marginTop: 16, width: '100%', justifyContent: 'center' }} onClick={() => navigate('contact')}>
                    Submit RFQ <span className="arrow">→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA navigate={navigate} />
      <Footer navigate={navigate} />
    </main>
  );
}

window.PageIndustries = PageIndustries;
