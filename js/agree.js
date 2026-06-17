// Agree Farms Portal Script
let cropsData = [];
let isPreview = false;

// Check if running inside iframe
if (window.self !== window.top) {
    isPreview = true;
    console.log("Agree Farms loaded in Preview Mode (Iframe)");
}

document.addEventListener('DOMContentLoaded', () => {
    initAgreePortal();
    setupPreviewListener();
});

async function initAgreePortal() {
    try {
        await checkTableExistence();
        
        // 1. Fetch & Apply settings
        const savedSettings = await getSettings('agree');
        const mockDefaults = (typeof MULTI_SITE_DATA !== 'undefined' && MULTI_SITE_DATA.agree)
            ? MULTI_SITE_DATA.agree.settings || {}
            : {};
        const settings = savedSettings ? { ...mockDefaults, ...savedSettings } : { ...mockDefaults };
        applySettings(settings);

        // 2. Fetch & Render Crops
        await loadCrops();

        // 3. Fetch & Render Intake Reports PDF downloads
        await loadDocuments();

        // 4. Fetch & Render Guides marketing resources
        await loadMarketing();

        // 5. Fetch & Render Distributing Partners
        await loadPartners();

        // 6. Bind nav link routing events for visual customizer
        setupCustomizerNavigation();

    } catch (err) {
        console.error("Agree Farms Portal initialization error:", err);
    }
}

function setupCustomizerNavigation() {
    // Logo click → home tab
    const logoEl = document.querySelector('.site-logo, #site-logo-container');
    if (logoEl) {
        logoEl.addEventListener('click', () => {
            if (window.parent && window.parent !== window)
                window.parent.postMessage({ type: 'cms-route-change', route: 'home' }, '*');
        });
    }
    // Header click → header tab
    const siteHeader = document.querySelector('.site-header');
    if (siteHeader) {
        siteHeader.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-link') && !e.target.closest('.site-logo') && !e.target.closest('#site-logo-container')) {
                if (window.parent && window.parent !== window)
                    window.parent.postMessage({ type: 'cms-route-change', route: 'header' }, '*');
            }
        });
    }
    // Footer click → footer tab
    const siteFooter = document.querySelector('footer, .site-footer');
    if (siteFooter) {
        siteFooter.addEventListener('click', () => {
            if (window.parent && window.parent !== window)
                window.parent.postMessage({ type: 'cms-route-change', route: 'footer' }, '*');
        });
    }
    // Nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const href = link.getAttribute('href') || '';
            if (href === '#crops-section') {
                if (window.parent && window.parent !== window)
                    window.parent.postMessage({ type: 'cms-route-change', route: 'products' }, '*');
            } else if (href === '#hero-section' || href === '#') {
                if (window.parent && window.parent !== window)
                    window.parent.postMessage({ type: 'cms-route-change', route: 'home' }, '*');
            }
        });
    });
}

// Apply settings dynamically
function applySettings(settings) {
    if (!settings) return;

    // Apply CSS variables
    if (settings.primaryColor) document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
    if (settings.secondaryColor) document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);
    if (settings.accentColor) document.documentElement.style.setProperty('--accent-color', settings.accentColor);

    // Apply branding copy elements
    if (settings.logoText) {
        const logoTextEl = document.getElementById('logo-text');
        if (logoTextEl) logoTextEl.textContent = settings.logoText;
    }
    if (settings.heroHeading) {
        const heroTitleEl = document.getElementById('hero-title');
        if (heroTitleEl) heroTitleEl.textContent = settings.heroHeading;
    }
    if (settings.heroSubheading) {
        const heroSubEl = document.getElementById('hero-subtitle');
        if (heroSubEl) heroSubEl.textContent = settings.heroSubheading;
    }
    
    if (settings.heroImage) {
        const heroSec = document.getElementById('hero-section');
        if (heroSec) heroSec.style.backgroundImage = `url('${settings.heroImage}')`;
    }

    if (settings.phone) {
        const phoneTxt = document.getElementById('phone-text');
        if (phoneTxt) phoneTxt.textContent = settings.phone;
        const headPhone = document.getElementById('header-phone');
        if (headPhone) headPhone.setAttribute('href', `tel:${settings.phone}`);
        const footPhone = document.getElementById('footer-phone-full');
        if (footPhone) footPhone.innerHTML = `<i data-lucide="phone"></i> ${settings.phone}`;
    }

    if (settings.companyName) {
        const footCompany = document.getElementById('footer-company-name');
        if (footCompany) footCompany.textContent = settings.companyName;
    }
    if (settings.tagline) {
        const footTag = document.getElementById('footer-tagline');
        if (footTag) footTag.textContent = settings.tagline;
    }

    if (settings.address) {
        const footAddr = document.getElementById('footer-address');
        if (footAddr) footAddr.innerHTML = `<i data-lucide="map-pin"></i> ${settings.address}`;
    }

    if (settings.email) {
        const footEmail = document.getElementById('footer-email');
        if (footEmail) footEmail.innerHTML = `<i data-lucide="mail"></i> ${settings.email}`;
    }

    // Social buttons
    const socialsRow = document.getElementById('footer-social-links');
    if (socialsRow) {
        let html = '';
        if (settings.facebook) {
            html += `<a href="${settings.facebook}" target="_blank" class="social-btn"><i data-lucide="facebook"></i></a>`;
        }
        if (settings.linkedin) {
            html += `<a href="${settings.linkedin}" target="_blank" class="social-btn"><i data-lucide="linkedin"></i></a>`;
        }
        if (settings.twitter) {
            html += `<a href="${settings.twitter}" target="_blank" class="social-btn"><i data-lucide="twitter"></i></a>`;
        }
        socialsRow.innerHTML = html;
    }

    lucide.createIcons();
}

// Fetch and render crops
async function loadCrops() {
    const grid = document.getElementById('crops-grid-container');
    try {
        let list = await getProducts('agree');
        
        // Filter: If NOT in preview mode, show only Published items
        if (!isPreview) {
            list = list.filter(item => item.status === 'Published');
        }
        cropsData = list;

        if (list.length === 0) {
            grid.innerHTML = `<p class="placeholder-msg">No crops published in the database yet.</p>`;
            return;
        }

        renderCropsGrid(list);

    } catch (err) {
        console.error("Error loading crops:", err);
        grid.innerHTML = `<p class="placeholder-msg error">Failed to load crop database items.</p>`;
    }
}

function renderCropsGrid(crops) {
    const grid = document.getElementById('crops-grid-container');
    grid.innerHTML = '';

    crops.forEach(crop => {
        const card = document.createElement('div');
        card.className = `crop-card ${isPreview ? 'customizer-interactive' : ''}`;
        card.setAttribute('data-category', crop.category);
        if (isPreview) {
            // Clicking card in visual customizer opens product editor view
            card.onclick = (e) => {
                e.stopPropagation();
                if (window.parent && window.parent !== window) {
                    window.parent.postMessage({ type: 'cms-route-change', route: 'products', itemId: crop.id }, '*');
                }
            };
        } else {
            card.onclick = () => openProductDetailModal(crop.id);
        }

        card.innerHTML = `
            <div class="crop-image-wrapper">
                <img src="${crop.image_url || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80'}" alt="${crop.title}">
                <span class="crop-badge">${crop.category}</span>
            </div>
            <div class="crop-details">
                <h3>${crop.title}</h3>
                <p class="crop-desc-short">${crop.description}</p>
                <div class="crop-action-row">
                    <span class="view-details-link">View Cultivation Profile <i data-lucide="arrow-right"></i></span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    setupFilterButtons();
    lucide.createIcons();
}

function setupFilterButtons() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.onclick = (e) => {
            e.stopPropagation();
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            const cards = document.querySelectorAll('.crop-card');

            cards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        };
    });
}

// Fetch and render certifications
async function loadDocuments() {
    const tableBody = document.getElementById('downloads-table-body');
    try {
        let list = await getDocuments('agree');
        if (!isPreview) {
            list = list.filter(d => d.status === 'Published');
        }

        if (list.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No organic reports or certificates available.</td></tr>`;
            return;
        }

        tableBody.innerHTML = '';
        list.forEach(doc => {
            const tr = document.createElement('tr');
            if (isPreview) {
                tr.className = 'customizer-interactive';
                tr.onclick = (e) => {
                    e.stopPropagation();
                    if (window.parent && window.parent !== window) {
                        window.parent.postMessage({ type: 'cms-route-change', route: 'documents', itemId: doc.id }, '*');
                    }
                };
            }

            // Extract values
            const version = doc.version || '1.0';
            const dateStr = doc.updated_at ? new Date(doc.updated_at).toLocaleDateString() : new Date().toLocaleDateString();

            tr.innerHTML = `
                <td style="font-weight: 600; color: var(--primary-color);">${doc.title}</td>
                <td><span class="doc-badge">${doc.category || 'Compliance'}</span></td>
                <td>v${version}</td>
                <td>${dateStr}</td>
                <td><span style="font-weight: 700; color:#B91C1C; font-size:12px;">PDF File</span></td>
                <td>
                    <a href="${doc.file_url}" target="_blank" class="download-link" onclick="e => e.stopPropagation()">
                        <i data-lucide="download"></i> Download
                    </a>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        lucide.createIcons();

    } catch (err) {
        console.error("Error loading documents:", err);
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#B91C1C;">Failed to load PDF certificates.</td></tr>`;
    }
}

// Fetch and render farming guides
async function loadMarketing() {
    const container = document.getElementById('marketing-container');
    try {
        let list = await getMarketing('agree');
        if (!isPreview) {
            list = list.filter(m => m.status === 'Published');
        }

        if (list.length === 0) {
            container.innerHTML = `<p class="placeholder-msg">No guides or bulletins published.</p>`;
            return;
        }

        container.innerHTML = '';
        list.forEach(m => {
            const card = document.createElement('div');
            card.className = `marketing-card ${isPreview ? 'customizer-interactive' : ''}`;
            if (isPreview) {
                card.onclick = (e) => {
                    e.stopPropagation();
                    if (window.parent && window.parent !== window) {
                        window.parent.postMessage({ type: 'cms-route-change', route: 'marketing', itemId: m.id }, '*');
                    }
                };
            }

            card.innerHTML = `
                <div class="mkt-video-wrapper">
                    <video controls preload="metadata">
                        <source src="${m.file_url}" type="video/mp4">
                        Your browser does not support HTML5 video player.
                    </video>
                </div>
                <div class="mkt-content">
                    <h4>${m.title}</h4>
                    <p>${m.description}</p>
                </div>
            `;
            container.appendChild(card);
        });

    } catch (err) {
        console.error("Error loading guides:", err);
    }
}

// Fetch and render distributors
async function loadPartners() {
    const container = document.getElementById('partners-grid-container');
    try {
        let list = await getPartners('agree');
        if (list.length === 0) {
            container.innerHTML = `<p class="placeholder-msg">No distributing partners registered.</p>`;
            return;
        }

        container.innerHTML = '';
        list.forEach(p => {
            const card = document.createElement('div');
            card.className = `partner-logo-card ${isPreview ? 'customizer-interactive' : ''}`;
            if (isPreview) {
                card.onclick = (e) => {
                    e.stopPropagation();
                    if (window.parent && window.parent !== window) {
                        window.parent.postMessage({ type: 'cms-route-change', route: 'partners', itemId: p.id }, '*');
                    }
                };
            }

            card.innerHTML = `
                <div class="partner-meta">
                    <h5>${p.name}</h5>
                    <span>${p.country}</span>
                </div>
                <a href="${p.website_link || '#'}" target="_blank" class="partner-link" onclick="e => e.stopPropagation()">
                    Distributor Network <i data-lucide="external-link" style="width:12px;height:12px;margin-left:2px;vertical-align:middle;"></i>
                </a>
            `;
            container.appendChild(card);
        });

        lucide.createIcons();

    } catch (err) {
        console.error("Error loading partners:", err);
    }
}

// Product detail modal popup
function openProductDetailModal(id) {
    const crop = cropsData.find(c => c.id === id);
    if (!crop) return;

    document.getElementById('modal-product-img').src = crop.image_url || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80';
    document.getElementById('modal-product-category').textContent = crop.category;
    document.getElementById('modal-product-title').textContent = crop.title;
    document.getElementById('modal-product-desc').textContent = crop.description;

    // Load dynamic specs
    const specsGrid = document.getElementById('modal-product-specs');
    specsGrid.innerHTML = '';
    try {
        const specs = typeof crop.specifications === 'string' ? JSON.parse(crop.specifications) : crop.specifications;
        for (const [k, v] of Object.entries(specs || {})) {
            specsGrid.innerHTML += `
                <div class="spec-item">
                    <span class="spec-label">${k}</span>
                    <span class="spec-val">${v}</span>
                </div>
            `;
        }
    } catch(e) { console.error("Specs parse error", e); }

    // Load features
    const featList = document.getElementById('modal-product-features');
    featList.innerHTML = '';
    try {
        const features = typeof crop.features === 'string' ? JSON.parse(crop.features) : crop.features;
        (features || []).forEach(f => {
            featList.innerHTML += `<li><i data-lucide="check" style="color:var(--accent-color); width:14px; height:14px; margin-right:6px; vertical-align:middle;"></i> ${f}</li>`;
        });
    } catch(e) { console.error("Features parse error", e); }

    // Load associated industries
    const indGrid = document.getElementById('modal-product-industries');
    indGrid.innerHTML = '';
    try {
        const ind = typeof crop.industries === 'string' ? JSON.parse(crop.industries) : crop.industries;
        (ind || []).forEach(tag => {
            indGrid.innerHTML += `<span class="industry-tag">${tag}</span>`;
        });
    } catch(e) { console.error("Industries parse error", e); }

    document.getElementById('product-detail-modal').classList.add('active');
    lucide.createIcons();
}

function closeProductDetailModal() {
    document.getElementById('product-detail-modal').classList.remove('active');
}

// Visual Customizer live sync message listener
function setupPreviewListener() {
    window.addEventListener('message', async (e) => {
        const msg = e.data;
        if (!msg || !msg.type) return;

        console.log("Agree Farms Portal received customizer message:", msg);

        if (msg.type === 'cms-update-settings') {
            applySettings(msg.settings);
        } else if (msg.type === 'cms-update-products') {
            await loadCrops();
        } else if (msg.type === 'cms-update-documents') {
            await loadDocuments();
        } else if (msg.type === 'cms-update-marketing') {
            await loadMarketing();
        } else if (msg.type === 'cms-update-partners') {
            await loadPartners();
        }
    });
}
