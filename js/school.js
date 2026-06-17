// ABC School Academy Script
let coursesData = [];
let isPreview = false;

// Check if running inside iframe
if (window.self !== window.top) {
    isPreview = true;
    console.log("ABC School loaded in Preview Mode (Iframe)");
}

document.addEventListener('DOMContentLoaded', () => {
    initSchoolPortal();
    setupPreviewListener();
});

async function initSchoolPortal() {
    try {
        await checkTableExistence();
        
        // 1. Fetch & Apply settings
        const savedSettings = await getSettings('abcschool');
        const mockDefaults = (typeof MULTI_SITE_DATA !== 'undefined' && MULTI_SITE_DATA.abcschool)
            ? MULTI_SITE_DATA.abcschool.settings || {}
            : {};
        const settings = savedSettings ? { ...mockDefaults, ...savedSettings } : { ...mockDefaults };
        applySettings(settings);

        // 2. Fetch & Render Courses
        await loadCourses();

        // 3. Fetch & Render Documents
        await loadDocuments();

        // 4. Fetch & Render Marketing Showcase
        await loadMarketing();

        // 5. Fetch & Render Partners / Councils
        await loadPartners();

        // 6. Bind nav link routing events for visual customizer
        setupCustomizerNavigation();

    } catch (err) {
        console.error("School Portal initialization error:", err);
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
            if (href === '#courses-section') {
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

    // Apply copy elements
    if (settings.logoText) document.getElementById('logo-text').textContent = settings.logoText;
    if (settings.heroHeading) document.getElementById('hero-title').textContent = settings.heroHeading;
    if (settings.heroSubheading) document.getElementById('hero-subtitle').textContent = settings.heroSubheading;
    
    if (settings.heroImage) {
        document.getElementById('hero-section').style.backgroundImage = `url('${settings.heroImage}')`;
    }

    if (settings.phone) {
        document.getElementById('phone-text').textContent = settings.phone;
        document.getElementById('header-phone').setAttribute('href', `tel:${settings.phone}`);
        document.getElementById('footer-phone-full').innerHTML = `<i data-lucide="phone"></i> ${settings.phone}`;
    }

    if (settings.companyName) document.getElementById('footer-company-name').textContent = settings.companyName;
    if (settings.tagline) document.getElementById('footer-tagline').textContent = settings.tagline;

    if (settings.address) {
        document.getElementById('footer-address').innerHTML = `<i data-lucide="map-pin"></i> ${settings.address}`;
    }

    if (settings.email) {
        document.getElementById('footer-email').innerHTML = `<i data-lucide="mail"></i> ${settings.email}`;
    }

    // Socials
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

// Load curriculum products
async function loadCourses() {
    const grid = document.getElementById('courses-grid-container');
    try {
        let list = await getProducts('abcschool');
        
        // Filter: If NOT in preview, show only Published courses
        if (!isPreview) {
            list = list.filter(p => p.status === 'Published');
        }

        coursesData = list;

        if (list.length === 0) {
            grid.innerHTML = `<p class="loading-placeholder">No courses listed at this time.</p>`;
            return;
        }

        renderCoursesGrid(list);
        setupFilterClicks();

    } catch (e) {
        grid.innerHTML = `<p class="loading-placeholder" style="color:#EF4444;">Error: ${e.message}</p>`;
    }
}

function renderCoursesGrid(list) {
    const grid = document.getElementById('courses-grid-container');
    
    grid.innerHTML = list.map(p => {
        let statusBadge = '';
        if (isPreview) {
            statusBadge = `<span class="course-category-badge" style="right:16px; left:auto; background:var(--bg-dark); color:white; font-size:9px;">${p.status}</span>`;
        }

        return `
            <div class="course-card" data-category="${p.category}">
                <div class="course-card-preview">
                    <img src="${p.image_url || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&auto=format&fit=crop&q=80'}" alt="Course Image">
                    <span class="course-category-badge">${p.category}</span>
                    ${statusBadge}
                </div>
                <div class="course-card-content">
                    <h3 class="course-card-title">${p.title}</h3>
                    <p class="course-card-desc">${p.description || ''}</p>
                    <div class="course-card-action" onclick="openProductDetailModal('${p.id}')">
                        <span>Read Syllabus Highlights</span>
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
            const cards = document.querySelectorAll('.course-card');
            
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

// Course details modal disclosure
window.openProductDetailModal = function(id) {
    const p = coursesData.find(x => x.id === id);
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

    // Parameters details
    const specsContainer = document.getElementById('modal-product-specs');
    let specs = {};
    try {
        specs = typeof p.specifications === 'string' ? JSON.parse(p.specifications) : p.specifications || {};
    } catch(e) { specs = {}; }
    
    // Separate Brochure Link from specs
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

    // Brochure PDF Download button
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
            <a href="${brochureUrl}" target="_blank" class="btn btn-primary" style="display:inline-flex; width:100%; align-items:center; justify-content:center; gap:8px; padding:10px 20px; text-decoration:none; background-color:var(--accent-color); color:var(--bg-dark); font-weight:700; border-radius:30px;">
                <i data-lucide="download" style="width:16px; height:16px;"></i> Download Course Syllabus
            </a>
        `;
        brochureBlock.style.display = 'block';
    } else {
        brochureBlock.style.display = 'none';
    }

    // Syllabus Highlights List
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

    // Career pathways
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

// Handbooks table downloads
async function loadDocuments() {
    const tbody = document.getElementById('downloads-table-body');
    try {
        let list = await getDocuments('abcschool');
        
        if (!isPreview) {
            list = list.filter(d => d.status === 'Published');
        }

        if (list.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted);">No school files currently listed.</td></tr>`;
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
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#EF4444;">Error: ${e.message}</td></tr>`;
    }
}

// Campus life videos
async function loadMarketing() {
    const container = document.getElementById('marketing-container');
    try {
        const list = await getMarketing('abcschool');
        if (list.length === 0) {
            container.innerHTML = `<p style="grid-column: span 3; text-align:center; color:var(--text-muted);">No campus videos loaded.</p>`;
            return;
        }

        container.innerHTML = list.map(m => `
            <div class="marketing-card">
                <div class="video-container">
                    <video controls muted preload="none" poster="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60">
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
        container.innerHTML = `<p style="grid-column: span 3; color:#EF4444;">Error: ${e.message}</p>`;
    }
}

// Affiliated boards
async function loadPartners() {
    const container = document.getElementById('partners-grid-container');
    try {
        const list = await getPartners('abcschool');
        if (list.length === 0) {
            container.innerHTML = `<p style="grid-column: span 4; text-align:center; color:var(--text-muted);">No board affiliations listed.</p>`;
            return;
        }

        container.innerHTML = list.map(p => `
            <div class="partner-card">
                <span class="partner-country">${p.country}</span>
                <h3>${p.name}</h3>
                ${p.website_link ? `<a href="${p.website_link}" target="_blank" class="partner-link">Visit Education Board <i data-lucide="external-link"></i></a>` : ''}
            </div>
        `).join('');
        lucide.createIcons();
    } catch (e) {
        container.innerHTML = `<p style="grid-column: span 4; color:#EF4444;">Error: ${e.message}</p>`;
    }
}

// postMessage setup
function setupPreviewListener() {
    window.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'cms-preview-update') {
            console.log("School received visual settings payload");
            applySettings(event.data.settings);
        }
    });
}
