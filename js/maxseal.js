// MAX-SEAL Industrial Portal Script
let productsData = [];
let isPreview = false;

// Check if running inside iframe
if (window.self !== window.top) {
    isPreview = true;
    console.log("MAX-SEAL loaded in Preview Mode (Iframe)");
}

document.addEventListener('DOMContentLoaded', () => {
    initPortal();
    setupPreviewListener();
});

async function initPortal() {
    try {
        await checkTableExistence(); // Initializes connection and sets fallback flag
        
        // 1. Fetch & Apply Appearance Settings
        const savedSettings = await getSettings('maxseal');
        const mockDefaults = (typeof MULTI_SITE_DATA !== 'undefined' && MULTI_SITE_DATA.maxseal)
            ? MULTI_SITE_DATA.maxseal.settings || {}
            : {};
        // Merge: mock defaults first, then saved settings override
        const settings = savedSettings ? { ...mockDefaults, ...savedSettings } : { ...mockDefaults };
        applySettings(settings);

        // 2. Fetch & Render Catalog Items
        await loadProducts();

        // 3. Fetch & Render Documents
        await loadDocuments();

        // 4. Fetch & Render Marketing Resources
        await loadMarketing();

        // 5. Fetch & Render Partners
        await loadPartners();

        // 6. Bind nav link routing events for visual customizer
        setupCustomizerNavigation();

    } catch (err) {
        console.error("Portal initialisation error:", err);
    }
}

function setupCustomizerNavigation() {
    // Logo click → home tab
    const logoContainer = document.getElementById('site-logo-container');
    if (logoContainer) {
        logoContainer.addEventListener('click', () => {
            if (window.parent && window.parent !== window) {
                window.parent.postMessage({ type: 'cms-route-change', route: 'home' }, '*');
            }
        });
    }

    // Header click → header tab
    const siteHeader = document.querySelector('.site-header');
    if (siteHeader) {
        siteHeader.addEventListener('click', (e) => {
            // Only trigger if user clicks the header background or phone CTA (not nav links which have their own handler)
            if (e.target.closest('.site-header') && !e.target.closest('.nav-menu') && !e.target.closest('#site-logo-container')) {
                if (window.parent && window.parent !== window) {
                    window.parent.postMessage({ type: 'cms-route-change', route: 'header' }, '*');
                }
            }
        });
    }

    // Footer click → footer tab
    const siteFooter = document.querySelector('.site-footer-maxseal, .site-footer, footer');
    if (siteFooter) {
        siteFooter.addEventListener('click', () => {
            if (window.parent && window.parent !== window) {
                window.parent.postMessage({ type: 'cms-route-change', route: 'footer' }, '*');
            }
        });
    }

    // Nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const href = link.getAttribute('href') || '';
            if (href === '#hero-section' || href === '#') {
                if (window.parent && window.parent !== window) {
                    window.parent.postMessage({ type: 'cms-route-change', route: 'home' }, '*');
                }
            } else if (href === '#products-section') {
                if (window.parent && window.parent !== window) {
                    window.parent.postMessage({ type: 'cms-route-change', route: 'products' }, '*');
                }
            }
        });
    });
}

// Apply settings dynamically
function applySettings(settings) {
    if (!settings) return;

    const S = settings;
    const get = (id) => document.getElementById(id);

    // --- CSS Theme Variables ---
    if (S.primaryColor)   document.documentElement.style.setProperty('--primary-color',   S.primaryColor);
    if (S.secondaryColor) document.documentElement.style.setProperty('--secondary-color', S.secondaryColor);
    if (S.accentColor)    document.documentElement.style.setProperty('--accent-color',    S.accentColor);

    // --- Logo ---
    const logoTextEl = get('logo-text');
    if (logoTextEl && S.logoText) logoTextEl.textContent = S.logoText;

    // --- Hero ---
    const heroTitle = get('hero-title');
    if (heroTitle && S.heroHeading) heroTitle.textContent = S.heroHeading;

    const heroSubtitle = get('hero-subtitle');
    if (heroSubtitle && S.heroSubheading) heroSubtitle.textContent = S.heroSubheading;

    const heroSection = get('hero-section');
    if (heroSection && S.heroImage) heroSection.style.backgroundImage = `url('${S.heroImage}')`;

    // --- Header CTA Phone ---
    const phoneVal = S.headerCtaText || S.phone;
    const phoneText = get('phone-text');
    const headerPhone = get('header-phone');
    if (phoneVal) {
        if (phoneText) phoneText.textContent = phoneVal;
        const hrefVal = S.headerCtaHref || `tel:${phoneVal.replace(/\D/g,'')}`;
        if (headerPhone) headerPhone.setAttribute('href', hrefVal);
    }

    // --- FOOTER Contact Info (uses footerXxx keys, falls back to base keys) ---
    const fCompany = get('footer-company-name');
    if (fCompany) fCompany.textContent = S.footerCompany || S.companyName || '';

    const fAddress = get('footer-address');
    if (fAddress) fAddress.innerHTML = (S.footerAddress || S.address || '').replace(/,\s*/g, ',<br>');

    const fPhoneFull = get('footer-phone-full');
    const fPhoneLink = get('footer-phone-link');
    const fPhoneVal = S.footerPhone || S.phone || '';
    if (fPhoneFull) fPhoneFull.textContent = fPhoneVal;
    if (fPhoneLink && fPhoneVal) fPhoneLink.setAttribute('href', `tel:${fPhoneVal.replace(/\D/g,'')}`);

    const fFax = get('footer-fax');
    if (fFax) fFax.textContent = S.footerFax || '';

    const fEmailLink = get('footer-email-link') || get('footer-email');
    const fEmailVal = S.footerEmail || S.email || '';
    if (fEmailLink) {
        fEmailLink.textContent = fEmailVal;
        fEmailLink.setAttribute('href', `mailto:${fEmailVal}`);
    }

    const fFbLink = get('footer-fb-link');
    if (fFbLink && S.facebook) fFbLink.setAttribute('href', S.facebook);

    const fTwLink = get('footer-tw-link');
    if (fTwLink && S.twitter) fTwLink.setAttribute('href', S.twitter);

    const fCopyright = get('footer-copyright');
    if (fCopyright && S.footerCopyright) {
        fCopyright.textContent = `${S.footerCopyright} | Powered by InnooRyze CMS`;
    }

    if (window.lucide) lucide.createIcons();
}

// Fetch and render products
async function loadProducts() {
    const grid = document.getElementById('products-grid-container');
    try {
        let list = await getProducts('maxseal');
        
        // Filter: If NOT in preview mode, show only Published items
        if (!isPreview) {
            list = list.filter(p => p.status === 'Published');
        }

        productsData = list;

        if (list.length === 0) {
            grid.innerHTML = `<p class="loading-placeholder">No valves registered at the moment.</p>`;
            return;
        }

        renderProductsGrid(list);
        setupFilterClicks();

    } catch (e) {
        grid.innerHTML = `<p class="loading-placeholder" style="color:#EF4444;">Error: ${e.message}</p>`;
    }
}

function renderProductsGrid(list) {
    const grid = document.getElementById('products-grid-container');
    
    grid.innerHTML = list.map(p => {
        let badge = '';
        if (isPreview) {
            // Label status in preview mode so content editors see work status
            badge = `<span class="product-category-badge" style="right:16px; left:auto; background:var(--bg-dark); color:white; font-size:9px;">${p.status}</span>`;
        }

        return `
            <div class="product-card" data-category="${p.category}">
                <div class="product-card-preview">
                    <img src="${p.image_url || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80'}" alt="Valve Image">
                    <span class="product-category-badge">${p.category}</span>
                    ${badge}
                </div>
                <div class="product-card-content">
                    <h3 class="product-card-title">${p.title}</h3>
                    <p class="product-card-desc">${p.description || ''}</p>
                    <div class="product-card-action" onclick="openProductDetailModal('${p.id}')" style="cursor:pointer;">
                        <span>View Specifications</span>
                        <i data-lucide="arrow-right" style="width:16px; height:16px;"></i>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    lucide.createIcons();
}

function setupFilterClicks() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            const cards = document.querySelectorAll('.product-card');
            
            cards.forEach(card => {
                const cat = card.getAttribute('data-category');
                if (filter === 'all' || cat === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Modal open detail
window.openProductDetailModal = function(id) {
    const p = productsData.find(x => x.id === id);
    if (!p) return;

    // Send routing postMessage to visual customizer
    if (window.parent && window.parent !== window) {
        window.parent.postMessage({
            type: 'cms-route-change',
            route: 'products',
            productId: id
        }, '*');
    }

    const modal = document.getElementById('product-detail-modal');
    document.getElementById('modal-product-img').src = p.image_url || '';
    document.getElementById('modal-product-category').textContent = p.category;
    document.getElementById('modal-product-title').textContent = p.title;
    document.getElementById('modal-product-desc').textContent = p.description || '';

    // Specifications Key-Value Grid
    const specsContainer = document.getElementById('modal-product-specs');
    let specs = {};
    try {
        specs = typeof p.specifications === 'string' ? JSON.parse(p.specifications) : p.specifications || {};
    } catch(e) { specs = {}; }
    
    // Separate Brochure Link from regular specifications
    let brochureUrl = "";
    const cleanSpecs = {};
    Object.entries(specs).forEach(([k, v]) => {
        if (k === "Brochure Link") {
            brochureUrl = v;
        } else {
            cleanSpecs[k] = v;
        }
    });

    if (Object.keys(cleanSpecs).length === 0) {
        specsContainer.parentElement.style.display = 'none';
    } else {
        specsContainer.parentElement.style.display = 'block';
        specsContainer.innerHTML = Object.entries(cleanSpecs).map(([k, v]) => `
            <div class="spec-val-row">
                <span class="spec-key">${k}:</span>
                <span class="spec-val">${v}</span>
            </div>
        `).join('');
    }

    // Brochure PDF Download button display
    let brochureBlock = document.getElementById('modal-product-brochure-block');
    if (!brochureBlock) {
        brochureBlock = document.createElement('div');
        brochureBlock.id = 'modal-product-brochure-block';
        brochureBlock.style.marginTop = '24px';
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
            modalContent.appendChild(brochureBlock);
        }
    }

    if (brochureUrl) {
        brochureBlock.innerHTML = `
            <a href="${brochureUrl}" target="_blank" class="btn btn-primary" style="display:inline-flex; width:100%; align-items:center; justify-content:center; gap:8px; padding:10px 20px; text-decoration:none; background-color:var(--accent-color); color:var(--bg-dark); font-weight:700; border-radius:var(--radius-sm);">
                <i data-lucide="download" style="width:16px; height:16px;"></i> Download Technical Brochure
            </a>
        `;
        brochureBlock.style.display = 'block';
    } else {
        brochureBlock.style.display = 'none';
    }

    // Features Highlights List
    const featContainer = document.getElementById('modal-product-features');
    let features = [];
    try {
        features = typeof p.features === 'string' ? JSON.parse(p.features) : p.features || [];
    } catch(e) { features = []; }

    if (features.length === 0) {
        featContainer.parentElement.style.display = 'none';
    } else {
        featContainer.parentElement.style.display = 'block';
        featContainer.innerHTML = features.map(f => `<li>${f}</li>`).join('');
    }

    // Industries/Markets Tags
    const indContainer = document.getElementById('modal-product-industries');
    let industries = [];
    try {
        industries = typeof p.industries === 'string' ? JSON.parse(p.industries) : p.industries || [];
    } catch(e) { industries = []; }

    if (industries.length === 0) {
        indContainer.parentElement.style.display = 'none';
    } else {
        indContainer.parentElement.style.display = 'block';
        indContainer.innerHTML = industries.map(ind => `<span class="industry-tag">${ind}</span>`).join('');
    }

    modal.classList.add('active');
};

window.closeProductDetailModal = function() {
    document.getElementById('product-detail-modal').classList.remove('active');
};

// Fetch and render Technical documents
async function loadDocuments() {
    const tbody = document.getElementById('downloads-table-body');
    try {
        let list = await getDocuments('maxseal');
        
        // Filter: If NOT in preview mode, show only Published items
        if (!isPreview) {
            list = list.filter(d => d.status === 'Published');
        }

        if (list.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted);">No documents loaded under this brand.</td></tr>`;
            return;
        }

        tbody.innerHTML = list.map(d => `
            <tr>
                <td style="font-weight:600; color:var(--primary-color);">${d.title}</td>
                <td>${d.doc_type}</td>
                <td style="font-weight:700;">v${d.version}</td>
                <td style="font-size:12px; color:var(--text-muted);">${new Date(d.updated_at).toLocaleDateString()}</td>
                <td style="font-weight:600; color:#EF4444;"><i data-lucide="file-text" style="width:14px; height:14px; vertical-align:middle; margin-right:4px;"></i> PDF</td>
                <td>
                    <a href="${d.file_url}" target="_blank" class="doc-download-btn">
                        <i data-lucide="download"></i> Download ${isPreview ? `(${d.status})` : ''}
                    </a>
                </td>
            </tr>
        `).join('');
        lucide.createIcons();
    } catch (e) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#EF4444;">Error loading: ${e.message}</td></tr>`;
    }
}

// Fetch and render Marketing resources
async function loadMarketing() {
    const container = document.getElementById('marketing-container');
    try {
        const list = await getMarketing('maxseal');
        if (list.length === 0) {
            container.innerHTML = `<p style="grid-column: span 3; text-align:center; color:var(--text-muted);">No showcase items logged.</p>`;
            return;
        }

        container.innerHTML = list.map(m => `
            <div class="marketing-card">
                <div class="video-container">
                    <video controls muted preload="none" poster="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=60">
                        <source src="${m.file_url}" type="video/mp4">
                        Your browser does not support HTML5 video player.
                    </video>
                </div>
                <div class="marketing-card-content">
                    <h3>${m.title}</h3>
                    <p>${m.description || ''}</p>
                </div>
            </div>
        `).join('');
    } catch (e) {
        container.innerHTML = `<p style="grid-column: span 3; color:#EF4444;">Error loading: ${e.message}</p>`;
    }
}

// Fetch and render global partners
async function loadPartners() {
    const container = document.getElementById('partners-grid-container');
    try {
        const list = await getPartners('maxseal');
        if (list.length === 0) {
            container.innerHTML = `<p style="grid-column: span 4; text-align:center; color:var(--text-muted);">No global sales offices listed.</p>`;
            return;
        }

        container.innerHTML = list.map(p => `
            <div class="partner-card">
                <span class="partner-country">${p.country}</span>
                <h3>${p.name}</h3>
                ${p.website_link ? `<a href="${p.website_link}" target="_blank" class="partner-link">Visit Representative Website <i data-lucide="external-link"></i></a>` : ''}
            </div>
        `).join('');
        lucide.createIcons();
    } catch (e) {
        container.innerHTML = `<p style="grid-column: span 4; color:#EF4444;">Error loading: ${e.message}</p>`;
    }
}

// Real-time customizer event messaging
function setupPreviewListener() {
    window.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'cms-preview-update') {
            console.log("Received appearance update via postMessage");
            applySettings(event.data.settings);
        }
    });
}
