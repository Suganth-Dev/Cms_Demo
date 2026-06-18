/* page-contact.jsx — Structured RFQ and enquiry */

const REQ_TYPES = [
  'New requirement',
  'Replacement',
  'Custom modification',
  'Technical clarification',
  'Supplier qualification',
  'Export enquiry',
];

const QTY_RANGES = [
  'Prototype',
  'Small batch',
  'Production scale',
  'Not confirmed',
];

const INDUSTRY_OPTS = [
  { id: 'railways',    label: 'Railway & Traction' },
  { id: 'renewables',  label: 'Renewable Sectors' },
  { id: 'powergrid',   label: 'Power & Utilities' },
  { id: 'heavy',       label: 'Heavy Industries' },
  { id: 'mhe',         label: 'Material Handling & Warehousing' },
  { id: 'datacenter',  label: 'Data Centers' },
  { id: 'other',       label: 'Other' },
];

const ACCEPTED_FILE_TYPES = '.pdf,.doc,.docx,.xls,.xlsx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

function PageContact({ navigate }) {
  useReveal();
  const [form, setForm] = React.useState({
    name: '', company: '', email: '', phone: '', country: '',
    product: '', industry: '', reqType: '', qty: '',
    message: '',
  });
  const [file, setFile] = React.useState(null);
  const [fileError, setFileError] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const onFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) { setFile(null); setFileError(''); return; }
    const okTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx'];
    const ext = (f.name.split('.').pop() || '').toLowerCase();
    if (!okTypes.includes(ext)) {
      setFileError('Please upload a PDF, Word or Excel file.');
      setFile(null);
      e.target.value = '';
      return;
    }
    if (f.size > 8 * 1024 * 1024) {
      setFileError('Please keep the file under 8 MB.');
      setFile(null);
      e.target.value = '';
      return;
    }
    setFile(f);
    setFileError('');
  };

  const clearFile = () => {
    setFile(null);
    setFileError('');
    const input = document.getElementById('rfq-file-input');
    if (input) input.value = '';
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim())    errs.name    = 'Required';
    if (!form.company.trim()) errs.company = 'Required';
    if (!form.email.trim())   errs.email   = 'Required';
    else if (!/.+@.+\..+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.phone.trim())   errs.phone   = 'Required';
    if (!form.country.trim()) errs.country = 'Required';
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      // CRM-ready payload (logged for prototype). In production this would
      // POST to a CRM endpoint; on failure the form would email sales01@dynalektric.com.
      const payload = {
        leadSource: 'Website RFQ',
        name: form.name,
        company: form.company,
        email: form.email,
        phone: form.phone,
        country: form.country,
        productInterest: form.product,
        industry: form.industry,
        requirementType: form.reqType,
        quantityRange: form.qty,
        message: form.message,
        uploadedDocument: file ? { name: file.name, size: file.size, type: file.type } : null,
        receivedAt: new Date().toISOString(),
      };
      // eslint-disable-next-line no-console
      console.log('RFQ payload', payload);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /* ============================
     Success state
     ============================ */
  if (submitted) {
    return (
      <main className="page-enter">
        <section className="page-hero page-hero--split">
          <div className="container">
            <div className="page-hero-copy">
              <div className="mono">CONTACT DYNALEKTRIC</div>
              <h1>Thank you. Your requirement has been received.</h1>
            </div>
            <div className="page-hero-visual">
              <img
                src="./assets/card-magnetics.jpg"
                alt="Dynalektric precision magnetics and transformer manufacturing"
                width="720"
                height="540"
              />
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="success-state">
              <div className="check">✓</div>
              <h2 style={{ marginBottom: 16 }}>Your requirement has been received.</h2>
              <p className="lead" style={{ margin: '0 auto 24px' }}>
                Thank you. Our team will review the details and respond with the next steps within one business day.
              </p>
              <div className="success-summary">
                <div className="mono" style={{ color: 'var(--ink-muted)', marginBottom: 12 }}>Submission reference</div>
                <div className="success-row">
                  <span className="mono">Lead source</span>
                  <span>Website RFQ</span>
                </div>
                {form.product && (
                  <div className="success-row">
                    <span className="mono">Product interest</span>
                    <span>{(PRODUCTS.find(p => p.id === form.product) || {}).name || form.product}</span>
                  </div>
                )}
                {form.industry && (
                  <div className="success-row">
                    <span className="mono">Industry</span>
                    <span>{(INDUSTRY_OPTS.find(i => i.id === form.industry) || {}).label || form.industry}</span>
                  </div>
                )}
                {form.reqType && (
                  <div className="success-row">
                    <span className="mono">Requirement type</span>
                    <span>{form.reqType}</span>
                  </div>
                )}
                {form.qty && (
                  <div className="success-row">
                    <span className="mono">Quantity range</span>
                    <span>{form.qty}</span>
                  </div>
                )}
                {file && (
                  <div className="success-row">
                    <span className="mono">Document</span>
                    <span>{file.name}</span>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 32 }}>
                <button className="btn btn-secondary" onClick={() => {
                  setSubmitted(false);
                  setForm({ name: '', company: '', email: '', phone: '', country: '', product: '', industry: '', reqType: '', qty: '', message: '' });
                  setFile(null);
                  setErrors({});
                }}>Submit another</button>
                <button className="btn btn-primary" onClick={() => navigate('home')}>Back to home <span className="arrow">→</span></button>
              </div>
            </div>
          </div>
        </section>
        <Footer navigate={navigate} />
      </main>
    );
  }

  /* ============================
     Form
     ============================ */
  return (
    <main className="page-enter">
      <section className="page-hero page-hero--split">
        <div className="container">
          <div className="page-hero-copy">
            <div className="mono">CONTACT DYNALEKTRIC</div>
            <h1>Discuss your engineering requirement.</h1>
            <p className="lead">
              Share your product requirement, application details and a supporting document. Our team will review and respond with the next steps.
            </p>
          </div>
          <div className="page-hero-visual">
            <img
              src="./assets/card-magnetics.jpg"
              alt="Dynalektric precision magnetics and transformer manufacturing"
              width="720"
              height="540"
            />
          </div>
        </div>
      </section>

      <section className="container">
        <div className="contact-grid">
          <form className="contact-form reveal" onSubmit={submit} noValidate>
            <div className="who-you-are-block">
              <div className="form-section-head">
                <div className="mono" style={{ color: 'var(--red)', fontWeight: 600 }}>Contact</div>
                <h3>Tell us who you are.</h3>
              </div>

              <div className="contact-form-row">
                <div className="form-row">
                  <label>Name *</label>
                  <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Full name" />
                  {errors.name && <span className="form-err">{errors.name}</span>}
                </div>
                <div className="form-row">
                  <label>Company *</label>
                  <input value={form.company} onChange={e => set('company', e.target.value)} placeholder="Organisation name" />
                  {errors.company && <span className="form-err">{errors.company}</span>}
                </div>
              </div>
              <div className="contact-form-row">
                <div className="form-row">
                  <label>Email *</label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@company.com" />
                  {errors.email && <span className="form-err">{errors.email}</span>}
                </div>
                <div className="form-row">
                  <label>Phone *</label>
                  <input required value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+ country code, number" />
                  {errors.phone && <span className="form-err">{errors.phone}</span>}
                </div>
              </div>
              <div className="form-row">
                <label>Country *</label>
                <input value={form.country} onChange={e => set('country', e.target.value)} placeholder="e.g. Germany, UAE, USA, India" />
                {errors.country && <span className="form-err">{errors.country}</span>}
              </div>
            </div>

            <div className="form-section-head" style={{ marginTop: 32 }}>
              <div className="mono" style={{ color: 'var(--accent)', fontWeight: 600 }}>Requirement</div>
              <h3>Tell us what you need.</h3>
            </div>

            <div className="contact-form-row">
              <div className="form-row">
                <label>Product interest</label>
                <select value={form.product} onChange={e => set('product', e.target.value)}>
                  <option value="">Select a product group</option>
                  {PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  <option value="notsure">Not sure</option>
                </select>
              </div>
              <div className="form-row">
                <label>Industry or application</label>
                <select value={form.industry} onChange={e => set('industry', e.target.value)}>
                  <option value="">Select an industry</option>
                  {INDUSTRY_OPTS.map(i => <option key={i.id} value={i.id}>{i.label}</option>)}
                </select>
              </div>
            </div>

            <div className="contact-form-row">
              <div className="form-row">
                <label>Requirement type</label>
                <select value={form.reqType} onChange={e => set('reqType', e.target.value)}>
                  <option value="">Select requirement type</option>
                  {REQ_TYPES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="form-row">
                <label>Quantity range</label>
                <select value={form.qty} onChange={e => set('qty', e.target.value)}>
                  <option value="">Select quantity range</option>
                  {QTY_RANGES.map(q => <option key={q} value={q}>{q}</option>)}
                </select>
              </div>
            </div>

            <div className="form-row">
              <label>Message or requirement details</label>
              <textarea
                rows="5"
                value={form.message}
                onChange={e => set('message', e.target.value)}
                placeholder="Application, specification, ratings, environment, timeline."
              ></textarea>
            </div>

            <div className="form-row">
              <label>Supporting document</label>
              <div className="rfq-upload">
                <input
                  id="rfq-file-input"
                  type="file"
                  accept={ACCEPTED_FILE_TYPES}
                  onChange={onFileChange}
                  hidden
                />
                {!file ? (
                  <label htmlFor="rfq-file-input" className="rfq-upload-btn">
                    <span className="mono">+</span>
                    <span>Choose a file</span>
                  </label>
                ) : (
                  <div className="rfq-upload-file">
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{file.name}</div>
                      <div className="mono" style={{ color: 'var(--ink-muted)', marginTop: 2 }}>
                        {Math.ceil(file.size / 1024)} KB
                      </div>
                    </div>
                    <button type="button" className="rfq-upload-remove" onClick={clearFile} aria-label="Remove file">
                      Remove
                    </button>
                  </div>
                )}
              </div>
              <p className="rfq-upload-note">
                Please upload one supporting document in PDF, Word or Excel format. Large drawing files are not required at this stage.
              </p>
              {fileError && <span className="form-err">{fileError}</span>}
            </div>

            <div className="form-footer">
              <p style={{ fontSize: 12, color: 'var(--ink-muted)', maxWidth: '46ch' }}>
                Your details are used only to respond to this enquiry. They are not shared with third parties. Final supply terms are subject to engineering review.
              </p>
              <button type="submit" className="btn btn-primary">Submit RFQ <span className="arrow">→</span></button>
            </div>
          </form>

          <aside className="contact-info reveal">
            <div className="contact-info-block">
              <div className="label">Sales enquiries</div>
              <div className="value">sales01@dynalektric.com</div>
            </div>
            <div className="contact-info-block">
              <div className="label">General email</div>
              <div className="value">enquiry@dynalektric.com</div>
            </div>
            <div className="contact-info-block">
              <div className="label">Phone</div>
              <div className="value">+91 (placeholder)</div>
            </div>
            <div className="contact-info-block">
              <div className="label">Address</div>
              <div className="value">Dynalektric Pvt. Ltd.<br />Manufacturing facility<br />India (placeholder)</div>
            </div>
            <div className="contact-info-block">
              <div className="label">Working hours</div>
              <div className="value">Mon to Sat, 09:00 to 18:00 IST</div>
            </div>
            <div className="contact-info-block">
              <div className="label">For procurement teams</div>
              <div className="value" style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                Request our supplier qualification pack, ISO certificates and sample test reports by email.
              </div>
            </div>
            <div className="contact-info-block">
              <div className="label">Response window</div>
              <div className="value" style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                One business day for complete specifications. Larger scopes may take longer, subject to engineering review.
              </div>
            </div>
        <div className="contact-map">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7782.2830804704245!2d77.62583052848488!3d12.769318741084197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae69fde1bc74cd%3A0x9dbf3aaa6f14c1c7!2sDynalektric%20Equipment%20Private%20Limited!5e0!3m2!1sen!2sin!4v1781670618586!5m2!1sen!2sin"
    width="100%"
    height="400"
    style={{
      border: 0,
      borderRadius: "12px"
    }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Dynalektric Equipment Private Limited"
  ></iframe>
</div>
          </aside>
        </div>
      </section>

      <Footer navigate={navigate} />
    </main>
  );
}

window.PageContact = PageContact;
