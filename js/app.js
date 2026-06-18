// Public Application Router & Renderer - Multi-Tenant Version
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

// App State
let appSettings = null;
let navMenu = document.getElementById('nav-menu');
let mainHeader = document.getElementById('main-header');

// Helper to get active site slug from URL parameters
function getActiveSiteSlug() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('site') || 'maxseal';
}

async function initApp() {
    // 1. Initialise Lucide icons
    lucide.createIcons();

    // 2. Load settings from database & synchronize branding
    await loadSettingsAndSync();

    // 3. Add Router Listener
    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);

    // 4. Render demo floating switcher widget (Removed)
    // renderFloatingSwitcher();

    // 5. Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 6. Setup Modal events
    const modalClose = document.getElementById('modal-close');
    const mediaModal = document.getElementById('media-modal');
    if (modalClose && mediaModal) {
        modalClose.addEventListener('click', () => {
            mediaModal.classList.remove('active');
            document.getElementById('modal-body-content').innerHTML = '';
        });
        mediaModal.addEventListener('click', (e) => {
            if (e.target === mediaModal) {
                mediaModal.classList.remove('active');
                document.getElementById('modal-body-content').innerHTML = '';
            }
        });
    }
}

// Check database and load settings dynamically
async function loadSettingsAndSync() {
    try {
        const isDbReady = await checkTableExistence();
        const activeSite = getActiveSiteSlug();

        if (!isDbReady) {
            if (activeSite !== 'dynalektric') {
                showDbWarningBanner();
            }
            return;
        }
        appSettings = await getSettings(activeSite);
        
        // Auto-seed if database settings are empty
        if (!appSettings) {
            console.log("Database tables are empty. Auto-seeding default multi-tenant dataset...");
            const seedRes = await seedDatabaseIfEmpty();
            if (seedRes.success) {
                appSettings = await getSettings(activeSite);
            }
        }
        
        if (appSettings) {
            // A. Dynamically Overwrite Style Theme colors
            const primary = appSettings.primaryColor || '#0B2C5D';
            const secondary = appSettings.secondaryColor || '#0E5CAD';
            const accent = appSettings.accentColor || '#19B5FE';
            
            document.documentElement.style.setProperty('--primary', primary);
            document.documentElement.style.setProperty('--secondary', secondary);
            document.documentElement.style.setProperty('--accent', accent);

            // B. Apply Settings to Header & Footer
            document.title = `${appSettings.companyName} | Powered by InnooRyze CMS`;
            
            const tagline = document.getElementById('footer-tagline');
            if (tagline) tagline.textContent = appSettings.tagline;

            const addr = document.getElementById('footer-addr');
            if (addr) addr.textContent = appSettings.address;

            const phone = document.getElementById('footer-phone');
            if (phone) phone.textContent = appSettings.phone;

            const email = document.getElementById('footer-email');
            if (email) email.textContent = appSettings.email;

            // Header & Footer Logo Splits
            if (activeSite !== 'dynalektric') {
                document.querySelectorAll('.logo, .footer-logo').forEach(el => {
                    const text = appSettings.logoText || 'MAX-SEAL';
                    if (text.includes(' ')) {
                        const parts = text.split(' ');
                        el.innerHTML = `${parts[0]}<span> ${parts.slice(1).join(' ')}</span>`;
                    } else if (text.includes('-')) {
                        const parts = text.split('-');
                        el.innerHTML = `${parts[0]}<span>${parts[1]}</span>`;
                    } else {
                        el.innerHTML = `${text.substring(0, Math.ceil(text.length/2))}<span>${text.substring(Math.ceil(text.length/2))}</span>`;
                    }
                });
            }

            // Socials mapping
            const fb = document.getElementById('footer-fb');
            if (fb) fb.href = appSettings.facebook || "#";
            const li = document.getElementById('footer-li');
            if (li) li.href = appSettings.linkedin || "#";
            const tw = document.getElementById('footer-tw');
            if (tw) tw.href = appSettings.twitter || "#";
        }
    } catch (e) {
        console.error("Failed loading site settings:", e);
        showDbWarningBanner();
    }
}

// Get Terminology maps based on current tenant slug
function getTerminology() {
    const slug = getActiveSiteSlug();
    if (slug === 'abcschool') {
        return {
            heroHeading: "Empowering Students for Academic Leadership",
            heroDesc: "Explore our AP curriculums, certified lab classrooms, and physical education programs designed to foster international standards of education.",
            productLabel: "Courses",
            exploreProductsLabel: "Explore Courses",
            exploreCatalogsLabel: "School Calendars",
            productsHeading: "Academic Program Streams",
            productsSub: "Advanced placement classes, sciences honours, and writing frameworks.",
            moreBtn: "Explore Programs",
            catalogLabel: "Parents & Students Handbooks",
            catalogSub: "Download school policies, academic calendars, admissions fees, and schedules.",
            timelineHeading: "ABC School Academic History",
            contactCta: "Admissions Consultation Inquiries",
            contactCtaSub: "Schedule a tour of our Springfield campus laboratories and libraries with our academic advisory panels.",
            contactBtn: "Contact Admissions Desk",
            subjectLabel: "Subject",
            specTitle: "Curriculum Details",
            tab1: "Overview & Schedule",
            tab2: "Key Objectives",
            tab3: "Prerequisites"
        };
    } else if (slug === 'hospital') {
        return {
            heroHeading: "Compassionate Care, Advanced Medicine",
            heroDesc: "Discover City Hope General Hospital specialties: cardiology, pediatrics, and neurological trauma centers providing 24/7 patient support.",
            productLabel: "Departments",
            exploreProductsLabel: "Explore Specialties",
            exploreCatalogsLabel: "Admission Guides",
            productsHeading: "Clinical Specialties",
            productsSub: "Our advanced healthcare wings are equipped with robotic surgery systems and dedicated post-op wards.",
            moreBtn: "Explore Specialties",
            catalogLabel: "Patient Forms & Guidelines",
            catalogSub: "Download clinical admission sheets, pre-operative protocols, and medical insurances booklets.",
            timelineHeading: "City Hope Service Milestones",
            contactCta: "Schedule a Medical Consultation",
            contactCtaSub: "Connect with our clinic heads to arrange admissions evaluations or request surgical coordinates.",
            contactBtn: "Contact Clinical Desk",
            subjectLabel: "Chief Specialty",
            specTitle: "Department Logistics",
            tab1: "Chiefs & Teams",
            tab2: "Care Protocols",
            tab3: "Treatments"
        };
    } else if (slug === 'agree') {
        return {
            heroHeading: "Sustainable Farming & Agriculture Innovations",
            heroDesc: "Empowering growers with organic methods and premium harvests. Explore our wholesale grains, organic vegetables, and distribution channels.",
            productLabel: "Crops & Produce",
            exploreProductsLabel: "Explore Harvests",
            exploreCatalogsLabel: "Harvest Calendars",
            productsHeading: "Seasonal Crop Selections",
            productsSub: "Pesticide-free organic vegetables, hardy grains, and quality control systems.",
            moreBtn: "Explore Produce Catalog",
            catalogLabel: "Organic Certifications & Reports",
            catalogSub: "Download crop reports, soil analysis sheets, farming standards, and certificates.",
            timelineHeading: "Agree Farms Heritage Milestones",
            contactCta: "Wholesale Partner Consultation",
            contactCtaSub: "Connect with our distribution team to evaluate seasonal agreements, harvest bookings, or supply chains.",
            contactBtn: "Contact Farms Desk",
            subjectLabel: "Crop Variety / Strain",
            specTitle: "Cultivation & Sowing Logs",
            tab1: "Sowing & Harvest",
            tab2: "Organic Methods",
            tab3: "Crop Profiles"
        };
    } else if (slug === 'dynalektric') {
        return {
            heroHeading: "Engineering built for industrial progress",
            heroDesc: "In-house engineering, manufacturing and testing for infrastructure, mobility, energy and industrial applications.",
            productLabel: "Engineering Solutions",
            exploreProductsLabel: "Explore Capabilities",
            exploreCatalogsLabel: "Corporate Resources",
            productsHeading: "What we engineer",
            productsSub: "Engineering systems that power, control and support industrial operations.",
            moreBtn: "Explore All Products",
            catalogLabel: "Engineering Brochures & Catalogs",
            catalogSub: "Download technical documentation, testing standards, and company overviews.",
            timelineHeading: "Our Journey",
            contactCta: "Discuss Your Requirement",
            contactCtaSub: "Contact Dynalektric to discuss industrial engineering, manufacturing, product development, or customised electrical systems.",
            contactBtn: "Contact Our Engineering Team",
            subjectLabel: "Capability",
            specTitle: "Details & Applications",
            tab1: "Overview",
            tab2: "Application",
            tab3: "Features"
        };
    } else {
        // Default: maxseal
        return {
            heroHeading: "Butterfly Valves For All Applications",
            heroDesc: "Experience extreme durability and low torque performance. Redesigned to support chemical processing, cryogenics, refining, water lines, and general industrial utilities.",
            productLabel: "Valves & Actuators",
            exploreProductsLabel: "Explore Products",
            exploreCatalogsLabel: "View Catalogs",
            productsHeading: "Featured Product Families",
            productsSub: "Engineered for high performance and zero-leakage configurations, satisfying the standards of critical industrial processes.",
            moreBtn: "See All Valve Lines",
            catalogLabel: "Technical Document Gallery",
            catalogSub: "Download full technical specifications, sizing details, and manual guidelines for our series.",
            timelineHeading: "Our Journey",
            contactCta: "Have a Custom Project Requirement?",
            contactCtaSub: "Our engineering panel can formulate custom valve seat configurations, lining choices, and automated actuation assembly setups matching your exact plant layout.",
            contactBtn: "Contact Our Engineers",
            subjectLabel: "Valve Model / Part No",
            specTitle: "Technical Specifications",
            tab1: "Specifications",
            tab2: "Key Features",
            tab3: "Applications"
        };
    }
}

// Show Warning Banner if DB Setup is needed
function showDbWarningBanner() {
    const existingBanner = document.getElementById('db-setup-banner');
    if (existingBanner) return;

    const banner = document.createElement('div');
    banner.id = 'db-setup-banner';
    banner.style.cssText = 'background: #EF4444; color: white; padding: 12px 24px; text-align: center; font-size: 14px; font-weight: 600; position: sticky; top: 0; z-index: 2000; display: flex; align-items: center; justify-content: center; gap: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);';
    banner.innerHTML = `
        <i data-lucide="alert-triangle"></i>
        <span>Database connection missing or tables unseeded! Go to <a href="admin.html" style="text-decoration: underline; color: white; margin-left:4px;">CMS Admin Login</a> ➔ Select 'Admin' role ➔ Click Settings ➔ Click Seed Live Database.</span>
    `;
    document.body.insertBefore(banner, document.body.firstChild);
    lucide.createIcons();
}

// Render floating select widget in bottom corner for demo preview
function renderFloatingSwitcher() {
    const existing = document.getElementById('demo-site-switcher');
    if (existing) existing.remove();

    const switcher = document.createElement('div');
    switcher.id = 'demo-site-switcher';
    switcher.style.cssText = 'position: fixed; bottom: 24px; left: 24px; z-index: 9999; background: #ffffff; padding: 12px 16px; border-radius: 8px; box-shadow: 0 10px 30px rgba(11, 44, 93, 0.15); border: 1px solid var(--border-color); display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 600;';
    
    const active = getActiveSiteSlug();
    switcher.innerHTML = `
        <span style="color: var(--primary); font-family: 'Outfit', sans-serif;"><i data-lucide="globe" style="width:16px; height:16px; vertical-align:middle; margin-right:4px; color: var(--accent);"></i> Tenant:</span>
        <select id="tenant-select" style="padding: 6px 12px; border-radius: 4px; border: 1px solid var(--border-color); font-weight: 600; color: var(--primary); outline: none; cursor: pointer;">
            <option value="maxseal" ${active === 'maxseal' ? 'selected' : ''}>MAX-SEAL (Valves)</option>
            <option value="abcschool" ${active === 'abcschool' ? 'selected' : ''}>ABC School (School)</option>
            <option value="hospital" ${active === 'hospital' ? 'selected' : ''}>City Hospital (Hospital)</option>
            <option value="agree" ${active === 'agree' ? 'selected' : ''}>Agree Farms (Agriculture)</option>
            <option value="dynalektric" ${active === 'dynalektric' ? 'selected' : ''}>Dynalektric (Engineering)</option>
        </select>
    `;
    document.body.appendChild(switcher);

    document.getElementById('tenant-select').addEventListener('change', (e) => {
        const newSite = e.target.value;
        const currentHash = window.location.hash || '#/';
        // Keep hash but replace URL query params
        window.location.href = `index.html?site=${newSite}${currentHash}`;
    });
    lucide.createIcons();
}

// ROUTER DISPATCHER
async function router() {
    const appView = document.getElementById('app-router-view');
    appView.style.opacity = '0';
    
    // Close mobile nav menu
    navMenu.classList.remove('active');

    // Parse URL Hash
    const rawUrl = window.location.hash || '#/';
    const path = rawUrl.substring(1);
    
    let route = path;
    let param = '';
    
    // Support query parameters clean-up inside hash route
    const hashRouteParts = path.split('?');
    const cleanRoute = hashRouteParts[0];

    if (cleanRoute.startsWith('/product/')) {
        route = '/product/:slug';
        param = cleanRoute.replace('/product/', '');
    } else {
        route = cleanRoute;
    }

    // Sync query parameters into header navigation links
    const activeSite = getActiveSiteSlug();
    document.querySelectorAll('#nav-menu a').forEach(a => {
        a.classList.remove('active');
        const routeAttr = a.getAttribute('data-route');
        a.href = `index.html?site=${activeSite}#${routeAttr}`;

        if (routeAttr === route || (route === '/' && routeAttr === '/')) {
            a.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo(0, 0);

    try {
        switch (route) {
            case '/':
            case '':
                await renderHome(appView);
                break;
            case '/about':
                await renderAbout(appView);
                break;
            case '/products':
                await renderProducts(appView);
                break;
            case '/product/:slug':
                await renderProductDetail(appView, param);
                break;
            case '/catalog':
                await renderCatalog(appView);
                break;
            case '/marketing':
                await renderMarketing(appView);
                break;
            case '/partners':
                await renderPartners(appView);
                break;
            case '/contact':
                await renderContact(appView);
                break;
            default:
                appView.innerHTML = `<div class="container section-padding text-center"><h2>404 Page Not Found</h2><p>The requested URL was not found.</p><a href="index.html?site=${activeSite}#/" class="btn btn-primary" style="margin-top: 20px;">Back Home</a></div>`;
                break;
        }
    } catch (err) {
        console.error("Route render error:", err);
        appView.innerHTML = `
            <div class="container section-padding text-center">
                <h2>Site Loading / Seed Needed</h2>
                <p style="color: var(--text-secondary); margin-top: 10px;">${err.message}</p>
                <div style="margin-top: 30px;">
                    <a href="admin.html" class="btn btn-primary">Go to CMS Admin</a>
                </div>
            </div>
        `;
    }

    setTimeout(() => {
        appView.style.opacity = '1';
        lucide.createIcons();
    }, 100);
}

// ==========================================
// RENDERERS
// ==========================================

async function renderHome(container) {
    const activeSite = getActiveSiteSlug();
    const terms = getTerminology();
    
    let products = [];
    let catalogs = [];
    try {
        products = await getProducts(activeSite);
        products = products.filter(p => p.status === 'Published').slice(0, 3);
        
        catalogs = await getDocuments(activeSite);
        catalogs = catalogs.filter(d => d.status === 'Published' && d.doc_type === 'Catalog').slice(0, 3);
    } catch (e) {
        console.warn("DB not ready, rendering with empty hooks", e);
    }

    // Unsplash photo selectors by site context
    const heroPhotos = {
        maxseal: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
        abcschool: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
        hospital: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80"
    };
    const activeHeroImg = heroPhotos[activeSite] || heroPhotos.maxseal;

    container.innerHTML = `
        <!-- Hero Section -->
        <section class="hero-section">
            <div class="hero-grid-pattern"></div>
            <div class="container">
                <div class="hero-content">
                    <h1>${terms.heroHeading}</h1>
                    <p>${terms.heroDesc}</p>
                    <div class="hero-buttons">
                        <a href="index.html?site=${activeSite}#/products" class="btn btn-accent"><i data-lucide="search"></i> ${terms.exploreProductsLabel}</a>
                        <a href="index.html?site=${activeSite}#/catalog" class="btn btn-secondary" style="border-color: white; color: white;"><i data-lucide="book-open"></i> ${terms.exploreCatalogsLabel}</a>
                    </div>
                </div>
                <div class="hero-render-container">
                    <div class="hero-render-bg"></div>
                    <div class="hero-particle" style="width: 12px; height: 12px; top: 20%; left: 10%; animation-delay: 0s;"></div>
                    <div class="hero-particle" style="width: 8px; height: 8px; bottom: 30%; right: 15%; animation-delay: 2s;"></div>
                    <div class="hero-particle" style="width: 14px; height: 14px; top: 70%; left: 40%; animation-delay: 4s;"></div>
                    <img src="${activeHeroImg}" alt="Feature Render" class="hero-product-img">
                </div>
            </div>
        </section>

        <!-- Featured Products -->
        <section class="section-padding">
            <div class="container">
                <div class="section-header text-center">
                    <h2>${terms.productsHeading}</h2>
                    <p>${terms.productsSub}</p>
                </div>
                <div class="product-families-grid">
                    ${products.length > 0 ? products.map(p => `
                        <div class="family-card glass-card">
                            <div class="family-image-wrapper">
                                <img src="${p.image_url || activeHeroImg}" alt="${p.title}">
                            </div>
                            <h3>${p.title}</h3>
                            <p>${p.description.substring(0, 120)}...</p>
                            <a href="index.html?site=${activeSite}#/product/${p.slug}" class="learn-more-link">View Details <i data-lucide="arrow-right"></i></a>
                        </div>
                    `).join('') : `
                        <div style="grid-column: span 3; text-align: center; color: var(--text-secondary);">
                            <p>No published items available. Go to the CMS Admin panel to configure content.</p>
                        </div>
                    `}
                </div>
                <div class="text-center" style="margin-top: 48px;">
                    <a href="index.html?site=${activeSite}#/products" class="btn btn-primary">${terms.moreBtn}</a>
                </div>
            </div>
        </section>

        <!-- Industries Served (Contextual Display) -->
        ${activeSite === 'maxseal' ? `
        <section class="section-padding industries-section">
            <div class="container">
                <div class="section-header text-center">
                    <h2>Industries We Serve</h2>
                    <p>Optimizing plant efficiency and flow control safety in complex environments around the globe.</p>
                </div>
                <div class="industries-grid">
                    <div class="industry-card">
                        <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80" alt="Oil">
                        <div class="industry-overlay">
                            <h3>Oil & Gas</h3>
                            <p>Corrosive sour gas service, drilling lines, refining utilities with firesafe certifications.</p>
                        </div>
                    </div>
                    <div class="industry-card">
                        <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80" alt="Chem">
                        <div class="industry-overlay">
                            <h3>Chemical Processing</h3>
                            <p>PFA lined series offering corrosion prevention in acid piping and hazardous chemical plants.</p>
                        </div>
                    </div>
                    <div class="industry-card">
                        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80" alt="Water">
                        <div class="industry-overlay">
                            <h3>Water & Wastewater</h3>
                            <p>Resilient seated valves approved for drinking water lines, filtration networks and sewage management.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        ` : ''}

        <!-- Latest Documents Section -->
        <section class="section-padding" style="background: ${activeSite !== 'maxseal' ? '#ffffff' : 'var(--background)'};">
            <div class="container">
                <div class="section-header text-center">
                    <h2>Latest ${terms.catalogLabel}</h2>
                    <p>${terms.catalogSub}</p>
                </div>
                <div class="catalog-grid">
                    ${catalogs.length > 0 ? catalogs.map(c => `
                        <div class="catalog-card glass-card">
                            <div class="catalog-thumb">
                                <i data-lucide="file-text" style="width: 48px; height: 48px; color: var(--primary);"></i>
                                <span class="catalog-badge">v${c.version}</span>
                            </div>
                            <h3>${c.title}</h3>
                            <div class="catalog-meta">
                                <span>Type: ${c.doc_type}</span>
                                <span>Updated: ${new Date(c.updated_at).toLocaleDateString()}</span>
                            </div>
                            <div class="catalog-actions">
                                <button onclick="previewPDF('${c.title}', '${c.file_url}')" class="btn btn-secondary" style="padding: 8px 12px; font-size: 13px;"><i data-lucide="eye"></i> Preview</button>
                                <a href="${c.file_url}" download class="btn btn-primary" style="padding: 8px 12px; font-size: 13px;"><i data-lucide="download"></i> Download</a>
                            </div>
                        </div>
                    `).join('') : `
                        <div style="grid-column: span 3; text-align: center; color: var(--text-secondary);">
                            <p>No document resources published yet.</p>
                        </div>
                    `}
                </div>
            </div>
        </section>

        <!-- About Brief -->
        <section class="section-padding" style="background-color: ${activeSite === 'maxseal' ? '#ffffff' : 'var(--background)'};">
            <div class="container about-grid">
                <div class="about-image">
                    <img src="${activeHeroImg}" alt="Factory R&D">
                    <div class="about-stats">
                        <div class="stat-item">
                            <h3>15+</h3>
                            <p>Active Staff</p>
                        </div>
                        <div class="stat-item">
                            <h3>100%</h3>
                            <p>Certified Quality</p>
                        </div>
                        <div class="stat-item">
                            <h3>500+</h3>
                            <p>Total Graduates / Patients</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="section-header text-left">
                        <h2>Dedicated to Serving with High Standards</h2>
                    </div>
                    <p style="color: var(--text-secondary); margin-bottom: 24px;">Our administration and engineering divisions coordinate safety checklists, advanced facility designs, and operational regulations. Everything is audited to maintain accreditation with international licensing bodies, ensuring complete reliability in critical services.</p>
                    <a href="index.html?site=${activeSite}#/about" class="btn btn-primary">Learn Our Story</a>
                </div>
            </div>
        </section>

        <!-- Contact CTA -->
        <section class="section-padding" style="background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%); color: white;">
            <div class="container text-center" style="max-width: 700px;">
                <h2 style="color: white; font-size: 36px; margin-bottom: 16px;">${terms.contactCta}</h2>
                <p style="color: rgba(255,255,255,0.85); margin-bottom: 32px;">${terms.contactCtaSub}</p>
                <a href="index.html?site=${activeSite}#/contact" class="btn btn-accent"><i data-lucide="phone-call"></i> ${terms.contactBtn}</a>
            </div>
        </section>
    `;
}

async function renderAbout(container) {
    const activeSite = getActiveSiteSlug();
    const terms = getTerminology();
    const activeHeroImg = activeSite === 'maxseal' 
        ? "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
        : (activeSite === 'abcschool' ? "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80" : "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80");

    container.innerHTML = `
        <div class="hero-section" style="padding: 60px 0; text-align: center;">
            <div class="container" style="display: block;">
                <h1>About ${appSettings ? appSettings.companyName : 'MAX-SEAL'}</h1>
                <p style="margin: 0 auto;">Dedicated to serving process industry leaders and local communities.</p>
            </div>
        </div>

        <section class="section-padding">
            <div class="container">
                <div class="about-grid">
                    <div>
                        <h2>Our Corporate Overview</h2>
                        <p style="color: var(--text-secondary); margin-top: 16px;">Over decades of development, we have structured our operations around safety checklists, advanced tools, and dynamic resources. We pride ourselves on custom configurations and rapid response times to resolve client needs.</p>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 30px;">
                            <div class="glass-card" style="padding: 20px; border-left: 4px solid var(--accent);">
                                <h3 style="font-size: 18px; margin-bottom: 8px;">Our Mission</h3>
                                <p style="font-size: 13px; color: var(--text-secondary);">Deliver robust, high-integrity outcomes that ensure safety, excellence, and support environmental and local growth.</p>
                            </div>
                            <div class="glass-card" style="padding: 20px; border-left: 4px solid var(--primary);">
                                <h3 style="font-size: 18px; margin-bottom: 8px;">Our Vision</h3>
                                <p style="font-size: 13px; color: var(--text-secondary);">Be the primary global standard and trusted reference point for our clients in all specialized divisions.</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src="${activeHeroImg}" alt="Overview Image" style="width: 100%; border-radius: var(--radius-md); box-shadow: var(--shadow-md);">
                    </div>
                </div>
            </div>
        </section>

        <!-- Excellence -->
        <section class="section-padding" style="background-color: #ffffff;">
            <div class="container">
                <div class="section-header text-center">
                    <h2>Our Quality Assurance</h2>
                    <p>How we ensure 100% efficiency and safety before final output delivery.</p>
                </div>
                <div class="product-families-grid">
                    <div class="family-card glass-card">
                        <i data-lucide="shield-check" style="width: 40px; height: 40px; color: var(--secondary); margin-bottom: 16px;"></i>
                        <h3>Certified Testing</h3>
                        <p>All process divisions undergo strict evaluations in compliance with global standards, ensuring safety containment under thermal and physical stresses.</p>
                    </div>
                    <div class="family-card glass-card">
                        <i data-lucide="gauge" style="width: 40px; height: 40px; color: var(--secondary); margin-bottom: 16px;"></i>
                        <h3>Operational Audits</h3>
                        <p>Every phase undergoes high-pressure performance testing and verification protocols prior to public launching.</p>
                    </div>
                    <div class="family-card glass-card">
                        <i data-lucide="award" style="width: 40px; height: 40px; color: var(--secondary); margin-bottom: 16px;"></i>
                        <h3>ISO Compliance</h3>
                        <p>We are managed under certified ISO Quality Protocols, supporting total traceability of raw elements and operations.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- History Timeline -->
        <section class="section-padding">
            <div class="container" style="max-width: 800px;">
                <div class="section-header text-center">
                    <h2>${terms.timelineHeading}</h2>
                    <p>Growing from a localized start to a verified multi-branch entity.</p>
                </div>
                <div class="timeline">
                    <div class="timeline-item">
                        <div class="timeline-year">2010</div>
                        <div class="timeline-desc">First foundation laid out, establishing basic licensing parameters.</div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-year">2017</div>
                        <div class="timeline-desc">Acquired advanced tech systems and expanded staff teams.</div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-year">2026</div>
                        <div class="timeline-desc">Full international certifications logged, supporting clients worldwide.</div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// Products list page
async function renderProducts(container) {
    const activeSite = getActiveSiteSlug();
    const terms = getTerminology();
    
    let rawProducts = [];
    try {
        rawProducts = await getProducts(activeSite);
    } catch (e) {
        console.warn("DB offline during products rendering", e);
    }

    const products = rawProducts.filter(p => p.status === 'Published');
    const categories = [...new Set(products.map(p => p.category))];

    container.innerHTML = `
        <div class="hero-section" style="padding: 60px 0; text-align: center;">
            <div class="container" style="display: block;">
                <h1>${terms.productLabel} Catalog</h1>
                <p style="margin: 0 auto;">Discover active programs and services offered under our corporate structure.</p>
            </div>
        </div>

        <section class="section-padding">
            <div class="container">
                
                <!-- Filters Bar -->
                <div class="filter-bar" style="grid-template-columns: 2fr 1fr 1fr;">
                    <div class="filter-group">
                        <label for="search-input">Search Items</label>
                        <input type="text" id="search-input" class="filter-input" placeholder="Search by keyword...">
                    </div>
                    <div class="filter-group">
                        <label for="category-select">Classification</label>
                        <select id="category-select" class="filter-input">
                            <option value="">All Categories</option>
                            ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                        </select>
                    </div>
                    <div class="filter-group">
                        <label for="sort-select">Sort By</label>
                        <select id="sort-select" class="filter-input">
                            <option value="name-asc">Name (A-Z)</option>
                            <option value="name-desc">Name (Z-A)</option>
                            <option value="newest">Newest First</option>
                        </select>
                    </div>
                </div>

                <!-- Cards Grid -->
                <div class="product-families-grid" id="products-list-target"></div>
            </div>
        </section>
    `;

    const searchInp = document.getElementById('search-input');
    const catSel = document.getElementById('category-select');
    const sortSel = document.getElementById('sort-select');

    const runFiltering = () => {
        let filtered = [...products];

        const query = searchInp.value.toLowerCase().trim();
        if (query) {
            filtered = filtered.filter(p => 
                p.title.toLowerCase().includes(query) || 
                p.description.toLowerCase().includes(query)
            );
        }

        const cat = catSel.value;
        if (cat) {
            filtered = filtered.filter(p => p.category === cat);
        }

        const sort = sortSel.value;
        if (sort === 'name-asc') {
            filtered.sort((a,b) => a.title.localeCompare(b.title));
        } else if (sort === 'name-desc') {
            filtered.sort((a,b) => b.title.localeCompare(a.title));
        } else if (sort === 'newest') {
            filtered.sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at));
        }

        renderFilteredCards(filtered);
    };

    const renderFilteredCards = (items) => {
        const target = document.getElementById('products-list-target');
        if (items.length === 0) {
            target.innerHTML = `<div style="grid-column: span 3; text-align: center; color: var(--text-secondary); padding: 40px 0;"><p>No matches found.</p></div>`;
            return;
        }

        const activeHeroImg = activeSite === 'maxseal' 
            ? "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
            : (activeSite === 'abcschool' ? "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80" : "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80");

        target.innerHTML = items.map(p => `
            <div class="family-card glass-card">
                <div class="family-image-wrapper">
                    <img src="${p.image_url || activeHeroImg}" alt="${p.title}">
                </div>
                <span class="product-category-tag" style="margin-bottom: 12px; align-self: flex-start;">${p.category}</span>
                <h3>${p.title}</h3>
                <p style="margin-bottom: 20px;">${p.description.substring(0, 100)}...</p>
                <a href="index.html?site=${activeSite}#/product/${p.slug}" class="btn btn-secondary" style="margin-top: auto; font-size: 13px; padding: 10px 16px;"><i data-lucide="eye"></i> View Details</a>
            </div>
        `).join('');
        lucide.createIcons();
    };

    searchInp.addEventListener('input', runFiltering);
    catSel.addEventListener('change', runFiltering);
    sortSel.addEventListener('change', runFiltering);

    runFiltering();
}

// Product Details Page
async function renderProductDetail(container, slug) {
    const activeSite = getActiveSiteSlug();
    const terms = getTerminology();
    const product = await getProductBySlug(slug, activeSite);
    
    if (!product) {
        container.innerHTML = `<div class="container section-padding text-center"><h2>Item Not Found</h2><a href="index.html?site=${activeSite}#/products" class="btn btn-primary" style="margin-top: 20px;">All Options</a></div>`;
        return;
    }

    let featuresList = [];
    try { featuresList = typeof product.features === 'string' ? JSON.parse(product.features) : product.features || []; } catch(e) {}
    
    let specsData = {};
    try { specsData = typeof product.specifications === 'string' ? JSON.parse(product.specifications) : product.specifications || {}; } catch(e) {}
    
    let industriesList = [];
    try { industriesList = typeof product.industries === 'string' ? JSON.parse(product.industries) : product.industries || []; } catch(e) {}

    let relatedDocs = [];
    try {
        const allDocs = await getDocuments(activeSite);
        relatedDocs = allDocs.filter(d => d.status === 'Published').slice(0, 2);
    } catch(e) {}

    const activeHeroImg = activeSite === 'maxseal' 
        ? "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80"
        : (activeSite === 'abcschool' ? "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80" : "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80");

    container.innerHTML = `
        <div class="hero-section" style="padding: 40px 0;">
            <div class="container" style="display: flex; flex-direction: column; gap: 10px;">
                <div style="font-size: 14px; opacity: 0.8;">
                    <a href="index.html?site=${activeSite}#/" style="color: white;">Home</a> / <a href="index.html?site=${activeSite}#/products" style="color: white;">Products</a> / <span>${product.title}</span>
                </div>
                <h1 style="color: white; font-size: 32px; margin-top: 10px;">${product.title}</h1>
            </div>
        </div>

        <section class="section-padding">
            <div class="container">
                <div class="product-detail-layout">
                    
                    <div class="product-gallery-panel">
                        <div class="product-main-view">
                            <img src="${product.image_url || activeHeroImg}" alt="${product.title}">
                        </div>
                    </div>

                    <div class="product-info-panel">
                        <span class="product-category-tag">${product.category}</span>
                        <h2>${terms.specTitle}</h2>
                        <p class="product-description-text" style="margin-top: 16px;">${product.description}</p>
                        
                        <div class="detail-tab-nav">
                            <button class="detail-tab-btn active" data-tab="specs">${terms.tab1}</button>
                            <button class="detail-tab-btn" data-tab="features">${terms.tab2}</button>
                            <button class="detail-tab-btn" data-tab="industries">${terms.tab3}</button>
                        </div>

                        <div class="detail-tab-content active" id="tab-specs">
                            <table class="specs-table">
                                ${Object.keys(specsData).length > 0 ? Object.entries(specsData).map(([key, val]) => `
                                    <tr>
                                        <td>${key}</td>
                                        <td>${val}</td>
                                    </tr>
                                `).join('') : `<tr><td colspan="2">No parameters logged.</td></tr>`}
                            </table>
                        </div>

                        <div class="detail-tab-content" id="tab-features">
                            <ul class="features-list">
                                ${featuresList.length > 0 ? featuresList.map(feat => `
                                    <li>${feat}</li>
                                `).join('') : `<li>No features bullet logs.</li>`}
                            </ul>
                        </div>

                        <div class="detail-tab-content" id="tab-industries">
                            <p style="color: var(--text-secondary); margin-bottom: 16px;">Target Domains / Accreditations:</p>
                            <div class="industries-tags">
                                ${industriesList.length > 0 ? industriesList.map(ind => `
                                    <span class="industry-tag">${ind}</span>
                                `).join('') : `<span>General Classification</span>`}
                            </div>
                        </div>

                        <div style="margin-top: 40px; border-top: 1px solid var(--border-color); padding-top: 24px;">
                            <h3>Technical Catalog Downloads</h3>
                            <div class="download-docs-grid">
                                ${relatedDocs.map(doc => `
                                    <div class="download-doc-item">
                                        <div class="download-doc-info">
                                            <i data-lucide="file-text" style="color: var(--danger);"></i>
                                            <div>
                                                <h4>${doc.title}</h4>
                                                <span>v${doc.version} &bull; PDF File</span>
                                            </div>
                                        </div>
                                        <a href="${doc.file_url}" download class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px;"><i data-lucide="download"></i> Download</a>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    `;

    document.querySelectorAll('.detail-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.detail-tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.detail-tab-content').forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(`tab-${tabId}`).classList.add('active');
        });
    });

    lucide.createIcons();
}

// Catalog Page
async function renderCatalog(container) {
    const activeSite = getActiveSiteSlug();
    const terms = getTerminology();
    
    let docs = [];
    try {
        docs = await getDocuments(activeSite);
    } catch (e) {
        console.warn("DB offline fetching documents", e);
    }

    const publishedDocs = docs.filter(d => d.status === 'Published');
    const docTypes = [...new Set(publishedDocs.map(d => d.doc_type))];

    container.innerHTML = `
        <div class="hero-section" style="padding: 60px 0; text-align: center;">
            <div class="container" style="display: block;">
                <h1>${terms.catalogLabel}</h1>
                <p style="margin: 0 auto;">Access catalogs, schedule grids, policy PDF forms, and registration flyers.</p>
            </div>
        </div>

        <section class="section-padding">
            <div class="container">
                
                <div class="filter-bar" style="grid-template-columns: 2fr 1fr 1fr;">
                    <div class="filter-group">
                        <label for="doc-search">Search Library</label>
                        <input type="text" id="doc-search" class="filter-input" placeholder="Search by name...">
                    </div>
                    <div class="filter-group">
                        <label for="doc-type-filter">Resource Type</label>
                        <select id="doc-type-filter" class="filter-input">
                            <option value="">All Types</option>
                            ${docTypes.map(t => `<option value="${t}">${t}</option>`).join('')}
                        </select>
                    </div>
                    <div class="filter-group">
                        <label for="doc-sort">Sort Date</label>
                        <select id="doc-sort" class="filter-input">
                            <option value="newest">Newest Update</option>
                            <option value="oldest">Oldest Update</option>
                        </select>
                    </div>
                </div>

                <div class="catalog-grid" id="catalog-target-grid"></div>
            </div>
        </section>
    `;

    const docSearch = document.getElementById('doc-search');
    const docTypeFilter = document.getElementById('doc-type-filter');
    const docSort = document.getElementById('doc-sort');

    const filterDocs = () => {
        let items = [...publishedDocs];

        const query = docSearch.value.toLowerCase().trim();
        if (query) {
            items = items.filter(d => d.title.toLowerCase().includes(query));
        }

        const type = docTypeFilter.value;
        if (type) {
            items = items.filter(d => d.doc_type === type);
        }

        const sort = docSort.value;
        if (sort === 'newest') {
            items.sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at));
        } else {
            items.sort((a,b) => new Date(a.updated_at) - new Date(b.updated_at));
        }

        const target = document.getElementById('catalog-target-grid');
        if (items.length === 0) {
            target.innerHTML = `<div style="grid-column: span 3; text-align: center; color: var(--text-secondary); padding: 40px 0;"><p>No files match selection.</p></div>`;
            return;
        }

        target.innerHTML = items.map(c => `
            <div class="catalog-card glass-card">
                <div class="catalog-thumb">
                    <i data-lucide="file-text" style="width: 48px; height: 48px; color: var(--primary);"></i>
                    <span class="catalog-badge">v${c.version}</span>
                </div>
                <h3>${c.title}</h3>
                <div class="catalog-meta">
                    <span>${c.doc_type}</span>
                    <span>Updated: ${new Date(c.updated_at).toLocaleDateString()}</span>
                </div>
                <div class="catalog-actions">
                    <button onclick="previewPDF('${c.title}', '${c.file_url}')" class="btn btn-secondary" style="padding: 8px 12px; font-size: 13px;"><i data-lucide="eye"></i> Preview</button>
                    <a href="${c.file_url}" download class="btn btn-primary" style="padding: 8px 12px; font-size: 13px;"><i data-lucide="download"></i> Download</a>
                </div>
            </div>
        `).join('');
        lucide.createIcons();
    };

    docSearch.addEventListener('input', filterDocs);
    docTypeFilter.addEventListener('change', filterDocs);
    docSort.addEventListener('change', filterDocs);

    filterDocs();
}

// Marketing Page
async function renderMarketing(container) {
    const activeSite = getActiveSiteSlug();
    let rawMkt = [];
    try {
        rawMkt = await getMarketing(activeSite);
    } catch(e) {}

    container.innerHTML = `
        <div class="hero-section" style="padding: 60px 0; text-align: center;">
            <div class="container" style="display: block;">
                <h1>Media & Marketing Resources</h1>
                <p style="margin: 0 auto;">Watch demonstrative videos, read handouts, and inspect flyers.</p>
            </div>
        </div>

        <section class="section-padding">
            <div class="container">
                <div class="marketing-grid">
                    ${rawMkt.length > 0 ? rawMkt.map(item => {
                        const isVideo = item.resource_type === 'Video';
                        return `
                            <div class="marketing-card glass-card">
                                <div class="marketing-media-preview">
                                    ${isVideo ? `
                                        <video src="${item.file_url}" muted></video>
                                        <div class="media-play-overlay" onclick="openVideoModal('${item.title}', '${item.file_url}')">
                                            <i data-lucide="play" style="width: 24px; height: 24px; color: var(--primary);"></i>
                                        </div>
                                    ` : `
                                        <i data-lucide="presentation" style="width: 60px; height: 60px; color: var(--accent);"></i>
                                    `}
                                </div>
                                <span class="product-category-tag" style="align-self: flex-start; margin-bottom: 12px;">${item.resource_type}</span>
                                <h3>${item.title}</h3>
                                <p>${item.description || 'Log resources for client presentations.'}</p>
                                <div style="display: flex; gap: 12px;">
                                    ${isVideo ? `
                                        <button onclick="openVideoModal('${item.title}', '${item.file_url}')" class="btn btn-primary" style="flex-grow: 1; padding: 10px; font-size: 13px;"><i data-lucide="tv"></i> Play Video</button>
                                    ` : `
                                        <button onclick="previewPDF('${item.title}', '${item.file_url}')" class="btn btn-secondary" style="flex-grow: 1; padding: 10px; font-size: 13px;"><i data-lucide="eye"></i> Preview</button>
                                        <a href="${item.file_url}" download class="btn btn-primary" style="flex-grow: 1; padding: 10px; font-size: 13px; text-align: center;"><i data-lucide="download"></i> Download</a>
                                    `}
                                </div>
                            </div>
                        `;
                    }).join('') : `
                        <div style="grid-column: span 3; text-align: center; color: var(--text-secondary);">
                            <p>No resources registered for this site.</p>
                        </div>
                    `}
                </div>
            </div>
        </section>
    `;
}

// Global Partners Page
async function renderPartners(container) {
    const activeSite = getActiveSiteSlug();
    let partners = [];
    try {
        partners = await getPartners(activeSite);
    } catch(e) {}

    container.innerHTML = `
        <div class="hero-section" style="padding: 60px 0; text-align: center;">
            <div class="container" style="display: block;">
                <h1>Distributor & Partners Network</h1>
                <p style="margin: 0 auto;">Connect with our accredited affiliations and authorized organizations globally.</p>
            </div>
        </div>

        <section class="section-padding">
            <div class="container">
                <div class="partners-grid">
                    ${partners.length > 0 ? partners.map(p => `
                        <div class="partner-card glass-card">
                            <div class="partner-logo-placeholder">${p.name.charAt(0)}</div>
                            <h3>${p.name}</h3>
                            <span>Location: ${p.country}</span>
                            <a href="${p.website_link || '#'}" target="_blank" class="btn btn-secondary" style="padding: 6px 12px; font-size: 12px; margin-top: auto;"><i data-lucide="external-link"></i> Website</a>
                        </div>
                    `).join('') : `
                        <div style="grid-column: span 3; text-align: center; color: var(--text-secondary);">
                            <p>No partners or affiliations logged.</p>
                        </div>
                    `}
                </div>
            </div>
        </section>
    `;
}

// Contact Page
async function renderContact(container) {
    const activeSite = getActiveSiteSlug();
    const terms = getTerminology();
    
    container.innerHTML = `
        <div class="hero-section" style="padding: 60px 0; text-align: center;">
            <div class="container" style="display: block;">
                <h1>Contact Office Desk</h1>
                <p style="margin: 0 auto;">Dispatch inquiries or admissions consultations directly to our administration teams.</p>
            </div>
        </div>

        <section class="section-padding">
            <div class="container contact-layout">
                
                <div class="contact-info-block">
                    <h2>Reach Us Instantly</h2>
                    <p style="color: var(--text-secondary);">Call our central dispatch desk or drop our department coordinators an email.</p>
                    
                    <div class="contact-card-item">
                        <div class="contact-icon-wrapper"><i data-lucide="map-pin"></i></div>
                        <div>
                            <h3>Office Location</h3>
                            <p id="contact-addr">${appSettings ? appSettings.address : '10200 Coldwater Road, Fort Wayne, IN 46825'}</p>
                        </div>
                    </div>
                    <div class="contact-card-item">
                        <div class="contact-icon-wrapper"><i data-lucide="phone"></i></div>
                        <div>
                            <h3>Phone Line</h3>
                            <p id="contact-phone">${appSettings ? appSettings.phone : '1-800-MAX-SEAL'}</p>
                        </div>
                    </div>
                    <div class="contact-card-item">
                        <div class="contact-icon-wrapper"><i data-lucide="mail"></i></div>
                        <div>
                            <h3>Office Email</h3>
                            <p id="contact-email">${appSettings ? appSettings.email : 'info@maxsealinc.com'}</p>
                        </div>
                    </div>
                </div>

                <!-- Form -->
                <div class="glass-card" style="padding: 40px;">
                    <h3 style="margin-bottom: 24px;">Send Inquiry Form</h3>
                    <form class="contact-form" onsubmit="handleContactSubmit(event)">
                        <div class="form-group">
                            <label style="font-size: 13px; font-weight:600; margin-bottom:8px; display:block;">Full Name</label>
                            <input type="text" class="form-input-control" required placeholder="John Doe">
                        </div>
                        <div class="form-group">
                            <label style="font-size: 13px; font-weight:600; margin-bottom:8px; display:block;">Email Address</label>
                            <input type="email" class="form-input-control" required placeholder="name@domain.com">
                        </div>
                        <div class="form-group-full">
                            <label style="font-size: 13px; font-weight:600; margin-bottom:8px; display:block;">${terms.subjectLabel}</label>
                            <input type="text" class="form-input-control" required placeholder="Inquiry Details">
                        </div>
                        <div class="form-group-full">
                            <label style="font-size: 13px; font-weight:600; margin-bottom:8px; display:block;">Inquiry Requirements / Sizes</label>
                            <textarea class="form-input-control" required placeholder="Explain your requirements..."></textarea>
                        </div>
                        <div class="form-group-full" style="margin-top: 10px;">
                            <button type="submit" class="btn btn-primary" style="width: 100%;"><i data-lucide="send"></i> Submit Request</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    `;
}

function handleContactSubmit(e) {
    e.preventDefault();
    alert("Inquiry logged successfully! An administrative response will be processed within 24 hours.");
    e.target.reset();
}

function previewPDF(title, url) {
    const modal = document.getElementById('media-modal');
    const body = document.getElementById('modal-body-content');
    
    body.innerHTML = `
        <h2 style="margin-bottom: 12px; font-size: 20px;">${title}</h2>
        <p style="color: var(--text-secondary); font-size: 13px; margin-bottom: 20px;">File URL: <a href="${url}" target="_blank" style="color: var(--secondary); text-decoration: underline;">${url}</a></p>
        <div style="background-color: #F1F5F9; border-radius: 4px; border: 1px solid var(--border-color); height: 450px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; text-align: center; padding: 24px;">
            <i data-lucide="file-text" style="width: 60px; height: 60px; color: var(--danger);"></i>
            <h3>Simulated Document Viewer</h3>
            <p style="color: var(--text-secondary); max-width: 420px;">For the POC, direct binary previews are bypassed. Click link above to view PDF file in browser.</p>
            <a href="${url}" target="_blank" class="btn btn-primary"><i data-lucide="external-link"></i> Open PDF in New Window</a>
        </div>
    `;
    
    modal.classList.add('active');
    lucide.createIcons();
}

function openVideoModal(title, url) {
    const modal = document.getElementById('media-modal');
    const body = document.getElementById('modal-body-content');
    
    body.innerHTML = `
        <h2 style="margin-bottom: 20px; font-size: 20px;">${title}</h2>
        <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%;">
            <video src="${url}" controls autoplay style="position: absolute; top:0; left:0; width: 100%; height:100%; border-radius: 4px; background-color: #000;"></video>
        </div>
    `;
    
    modal.classList.add('active');
    lucide.createIcons();
}
