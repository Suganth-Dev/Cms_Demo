// Visual Redesign Customizer Controller - Multi-Site
let activeSiteSlug = 'maxseal';
let currentSettings = {};

// Default Fallbacks for Hero Content if not already present in Supabase JSON
const DEFAULT_HEROS = {
    maxseal: {
        heroHeading: "High Quality Industrial Valve Solutions",
        heroSubheading: "Zero-leakage performance under extreme pressures and temperatures. Certified for Oil & Gas, Chemicals, and Power Generation.",
        heroImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80"
    },
    abcschool: {
        heroHeading: "Empowering Students for Academic Leadership",
        heroSubheading: "AP Honours courses, high-tech science laboratories, and certified physical education systems for complete growth.",
        heroImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80"
    },
    hospital: {
        heroHeading: "Compassionate Care, Advanced Clinical Medicine",
        heroSubheading: "Providing hybrid cardiovascular theaters, robotic diagnostics, and specialized critical health centers open 24/7.",
        heroImage: "https://images.unsplash.com/photo-1586773860418-d3b3de97e663?w=1200&auto=format&fit=crop&q=80"
    },
    agree: {
        heroHeading: "Cultivating Quality, Nurturing the Future.",
        heroSubheading: "Agree Farms utilizes state-of-the-art agricultural techniques and sustainable processes to produce premium organic vegetables, wholesale grains, and fruits.",
        heroImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80"
    }
};

// Preset Hero Images mapping
const PRESET_IMAGES = {
    maxseal: [
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1535813547-99c456a41d4a?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80"
    ],
    abcschool: [
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80"
    ],
    hospital: [
        "https://images.unsplash.com/photo-1586773860418-d3b3de97e663?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80"
    ],
    agree: [
        "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=800&auto=format&fit=crop&q=80"
    ]
};

let redesignProductsCache = [];

document.addEventListener('DOMContentLoaded', () => {
    initRedesignApp();
});

async function initRedesignApp() {
    lucide.createIcons();

    // 1. Resolve site slug from query parameter
    const params = new URLSearchParams(window.location.search);
    activeSiteSlug = params.get('site') || 'maxseal';
    
    // Validate slug
    if (!['maxseal', 'abcschool', 'hospital', 'agree'].includes(activeSiteSlug)) {
        activeSiteSlug = 'maxseal';
    }

    // 2. Set chrome preview browser address bar
    let siteHtmlFile = 'maxseal.html';
    if (activeSiteSlug === 'abcschool') siteHtmlFile = 'school.html';
    if (activeSiteSlug === 'hospital') siteHtmlFile = 'hospital.html';
    if (activeSiteSlug === 'agree') siteHtmlFile = 'agree.html';

    document.getElementById('chrome-address-url').textContent = `${window.location.origin}/${siteHtmlFile}`;
    
    // Set preview iframe src
    const iframe = document.getElementById('preview-frame');
    iframe.src = siteHtmlFile;

    // 3. Load initial settings
    try {
        await checkTableExistence(); // checks db status / fallback mode
        const settingsData = await getSettings(activeSiteSlug);
        
        if (settingsData) {
            // Merge with mock defaults so any new fields not yet saved get populated
            const mockDefaults = (typeof MULTI_SITE_DATA !== 'undefined' && MULTI_SITE_DATA[activeSiteSlug])
                ? MULTI_SITE_DATA[activeSiteSlug].settings || {}
                : {};
            currentSettings = { ...mockDefaults, ...settingsData };
        } else {
            console.warn("No saved settings found. Loading from mock-data defaults for: " + activeSiteSlug);
            // Seed from mock-data
            const mockDefaults = (typeof MULTI_SITE_DATA !== 'undefined' && MULTI_SITE_DATA[activeSiteSlug])
                ? MULTI_SITE_DATA[activeSiteSlug].settings || {}
                : {};
            currentSettings = { ...mockDefaults };
        }
        
        // Fill form fields
        populateRedesignForm();
    } catch(err) {
        showToast("Error reading settings: " + err.message, 'error');
    }

    // 4. Render preset images
    renderPresetImages();

    // 5. Setup event bindings for color pickers & text input sync
    setupColorSync('redesign-color-primary', 'redesign-color-primary-text');
    setupColorSync('redesign-color-secondary', 'redesign-color-secondary-text');
    setupColorSync('redesign-color-accent', 'redesign-color-accent-text');

    // 6. Bind live input preview changes
    setupLivePreviewListeners();

    // 7. Viewport responsive sizing toggles
    setupViewportToggles();

    // 8. Visual Customizer layout tabs & product forms initializer
    setupTabsSwitcher();
    await initProductEditor();

    // 9. Setup direct image upload handlers
    setupDirectUploads();
}

// Populate UI form inputs
function populateRedesignForm() {
    const fallback = DEFAULT_HEROS[activeSiteSlug] || DEFAULT_HEROS.maxseal;

    document.getElementById('redesign-company-name').value = currentSettings.companyName || '';
    document.getElementById('redesign-logo-text').value = currentSettings.logoText || '';
    document.getElementById('redesign-tagline').value = currentSettings.tagline || '';
    document.getElementById('redesign-address').value = currentSettings.address || '';
    document.getElementById('redesign-phone').value = currentSettings.phone || '';
    document.getElementById('redesign-email').value = currentSettings.email || '';

    // Hero Content
    document.getElementById('redesign-hero-heading').value = currentSettings.heroHeading || fallback.heroHeading;
    document.getElementById('redesign-hero-subheading').value = currentSettings.heroSubheading || fallback.heroSubheading;
    const heroImgUrl = currentSettings.heroImage || fallback.heroImage;
    document.getElementById('redesign-hero-image').value = heroImgUrl;
    if (heroImgUrl) {
        showUploadPreview('redesign-hero-image', heroImgUrl);
    } else {
        hideUploadPreview('redesign-hero-image');
    }

    // Colors
    let defaultPrimary = '#0B2C5D';
    let defaultSecondary = '#0E5CAD';
    let defaultAccent = '#19B5FE';
    if (activeSiteSlug === 'abcschool') {
        defaultPrimary = '#1B4332'; defaultSecondary = '#2D6A4F'; defaultAccent = '#D4AF37';
    } else if (activeSiteSlug === 'hospital') {
        defaultPrimary = '#0D9488'; defaultSecondary = '#0F766E'; defaultAccent = '#38BDF8';
    } else if (activeSiteSlug === 'agree') {
        defaultPrimary = '#15803d'; defaultSecondary = '#166534'; defaultAccent = '#f59e0b';
    }

    const primaryHex = currentSettings.primaryColor || defaultPrimary;
    const secondaryHex = currentSettings.secondaryColor || defaultSecondary;
    const accentHex = currentSettings.accentColor || defaultAccent;

    document.getElementById('redesign-color-primary').value = primaryHex;
    document.getElementById('redesign-color-primary-text').value = primaryHex;
    document.getElementById('redesign-color-secondary').value = secondaryHex;
    document.getElementById('redesign-color-secondary-text').value = secondaryHex;
    document.getElementById('redesign-color-accent').value = accentHex;
    document.getElementById('redesign-color-accent-text').value = accentHex;

    // Header tab fields
    const logoImgEl = document.getElementById('redesign-logo-image');
    if (logoImgEl) logoImgEl.value = currentSettings.logoImage || '';
    if (currentSettings.logoImage) showUploadPreview('redesign-logo-image', currentSettings.logoImage);
    const logoTxtH = document.getElementById('redesign-logo-text-header');
    if (logoTxtH) logoTxtH.value = currentSettings.logoText || '';
    const ctaText = document.getElementById('redesign-header-cta-text');
    if (ctaText) ctaText.value = currentSettings.headerCtaText || '';
    const ctaHref = document.getElementById('redesign-header-cta-href');
    if (ctaHref) ctaHref.value = currentSettings.headerCtaHref || '';
    const navLabels = currentSettings.navLabels || [];
    for (let i = 1; i <= 5; i++) {
        const el = document.getElementById(`redesign-nav-${i}`);
        if (el) el.value = navLabels[i-1] || '';
    }

    // Footer tab fields
    const footerCompany = document.getElementById('redesign-footer-company');
    if (footerCompany) footerCompany.value = currentSettings.footerCompany || currentSettings.companyName || '';
    const footerTagline = document.getElementById('redesign-footer-tagline');
    if (footerTagline) footerTagline.value = currentSettings.footerTagline || currentSettings.tagline || '';
    const footerCopy = document.getElementById('redesign-footer-copyright');
    if (footerCopy) footerCopy.value = currentSettings.footerCopyright || '';
    const footerAddr = document.getElementById('redesign-footer-address');
    if (footerAddr) footerAddr.value = currentSettings.footerAddress || currentSettings.address || '';
    const footerPhone = document.getElementById('redesign-footer-phone');
    if (footerPhone) footerPhone.value = currentSettings.footerPhone || currentSettings.phone || '';
    const footerFax = document.getElementById('redesign-footer-fax');
    if (footerFax) footerFax.value = currentSettings.footerFax || '';
    const footerEmail = document.getElementById('redesign-footer-email');
    if (footerEmail) footerEmail.value = currentSettings.footerEmail || currentSettings.email || '';
    const footerFb = document.getElementById('redesign-footer-facebook');
    if (footerFb) footerFb.value = currentSettings.facebook || '';
    const footerTw = document.getElementById('redesign-footer-twitter');
    if (footerTw) footerTw.value = currentSettings.twitter || '';
    const footerLi = document.getElementById('redesign-footer-linkedin');
    if (footerLi) footerLi.value = currentSettings.linkedin || '';
    const footerLinks = currentSettings.footerLinks || [];
    for (let i = 1; i <= 4; i++) {
        const el = document.getElementById(`redesign-footer-link-${i}`);
        if (el) el.value = footerLinks[i-1] || '';
    }
}

// Synchronize color pickers and hex text inputs
function setupColorSync(pickerId, textId) {
    const picker = document.getElementById(pickerId);
    const textInput = document.getElementById(textId);

    picker.addEventListener('input', (e) => {
        textInput.value = e.target.value.toUpperCase();
        triggerLivePreviewUpdate();
    });

    textInput.addEventListener('input', (e) => {
        let val = e.target.value;
        if (!val.startsWith('#')) val = '#' + val;
        if (/^#[A-Fa-f0-9]{6}$/.test(val)) {
            picker.value = val;
            triggerLivePreviewUpdate();
        }
    });
}

// Render Presets
function renderPresetImages() {
    const container = document.getElementById('hero-presets-row');
    const images = PRESET_IMAGES[activeSiteSlug] || PRESET_IMAGES.maxseal;
    const currentHeroImg = document.getElementById('redesign-hero-image').value;

    container.innerHTML = images.map(url => `
        <div class="preset-img-thumb ${url === currentHeroImg ? 'active' : ''}" onclick="selectPresetImage('${url}', this)">
            <img src="${url}" alt="Preset">
        </div>
    `).join('');
}

function selectPresetImage(url, element) {
    document.getElementById('redesign-hero-image').value = url;
    
    // Toggle active state
    document.querySelectorAll('.preset-img-thumb').forEach(el => el.classList.remove('active'));
    element.classList.add('active');

    triggerLivePreviewUpdate();
}

// Setup live preview postMessage communication
function setupLivePreviewListeners() {
    const formInputs = [
        'redesign-company-name',
        'redesign-logo-text',
        'redesign-tagline',
        'redesign-address',
        'redesign-phone',
        'redesign-email',
        'redesign-hero-heading',
        'redesign-hero-subheading',
        'redesign-hero-image'
    ];

    formInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', triggerLivePreviewUpdate);
        }
    });

    // Also wait for the iframe to load to send initial sync payload
    const iframe = document.getElementById('preview-frame');
    iframe.addEventListener('load', () => {
        // Send initial settings state
        triggerLivePreviewUpdate();
    });
}

// Grab current settings from Form state (all tabs merged)
function getFormData() {
    const navLabels = [];
    for (let i = 1; i <= 5; i++) {
        const el = document.getElementById(`redesign-nav-${i}`);
        navLabels.push(el ? el.value : '');
    }
    const footerLinks = [];
    for (let i = 1; i <= 4; i++) {
        const el = document.getElementById(`redesign-footer-link-${i}`);
        footerLinks.push(el ? el.value : '');
    }
    const v = (id) => { const el = document.getElementById(id); return el ? el.value : ''; };
    return {
        companyName: v('redesign-company-name'),
        logoText: v('redesign-logo-text') || v('redesign-logo-text-header'),
        logoImage: v('redesign-logo-image'),
        tagline: v('redesign-tagline'),
        address: v('redesign-address'),
        phone: v('redesign-phone'),
        email: v('redesign-email'),
        // Social links: prefer footer tab inputs; fallback to currentSettings
        facebook: v('redesign-footer-facebook') || currentSettings.facebook || '',
        linkedin: v('redesign-footer-linkedin') || currentSettings.linkedin || '',
        twitter:  v('redesign-footer-twitter')  || currentSettings.twitter  || '',
        heroHeading: v('redesign-hero-heading'),
        heroSubheading: v('redesign-hero-subheading'),
        heroImage: v('redesign-hero-image'),
        primaryColor: v('redesign-color-primary'),
        secondaryColor: v('redesign-color-secondary'),
        accentColor: v('redesign-color-accent'),
        // Header
        headerCtaText: v('redesign-header-cta-text'),
        headerCtaHref: v('redesign-header-cta-href'),
        navLabels,
        // Footer
        footerCompany: v('redesign-footer-company') || currentSettings.footerCompany || '',
        footerTagline: v('redesign-footer-tagline') || currentSettings.footerTagline || '',
        footerCopyright: v('redesign-footer-copyright') || currentSettings.footerCopyright || '',
        footerAddress: v('redesign-footer-address') || currentSettings.footerAddress || '',
        footerPhone: v('redesign-footer-phone') || currentSettings.footerPhone || '',
        footerFax: v('redesign-footer-fax') || currentSettings.footerFax || '',
        footerEmail: v('redesign-footer-email') || currentSettings.footerEmail || '',
        footerLinks,
    };
}

// Dispatch message to iframe
function triggerLivePreviewUpdate() {
    const iframe = document.getElementById('preview-frame');
    if (iframe && iframe.contentWindow) {
        const currentData = getFormData();
        iframe.contentWindow.postMessage({
            type: 'cms-preview-update',
            settings: currentData
        }, '*');
    }
}

// Setup responsive viewport controls
function setupViewportToggles() {
    const buttons = document.querySelectorAll('.viewport-toggle');
    const container = document.getElementById('preview-iframe-wrapper');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const mode = btn.getAttribute('data-mode');
            container.className = 'iframe-container';
            if (mode !== 'desktop') {
                container.classList.add(mode);
            }
        });
    });
}

function reloadPreview() {
    const iframe = document.getElementById('preview-frame');
    iframe.src = iframe.src; // Reload
}

// Handle Form Save & Publish
async function handleRedesignSave(e) {
    e.preventDefault();
    
    // Get current data
    const settingsData = getFormData();
    
    // Button state UI
    const saveBtn = document.querySelector('.save-publish-btn');
    const originalHtml = saveBtn.innerHTML;
    saveBtn.disabled = true;
    saveBtn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> Publishing...`;
    lucide.createIcons();

    try {
        // Save to Supabase
        await saveSettings(settingsData, activeSiteSlug);
        showToast("Site appearance updated and published live!");
        
        // Reload preview to ensure full dynamic sync with fresh Supabase content
        reloadPreview();
    } catch(err) {
        showToast("Failed publishing: " + err.message, 'error');
    } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = originalHtml;
        lucide.createIcons();
    }
}

// Redesign Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('redesign-toast');
    const toastMsg = document.getElementById('redesign-toast-message');
    
    toast.className = `admin-alert-toast ${type === 'success' ? 'toast-success' : 'toast-error'}`;
    toastMsg.textContent = message;
    
    toast.style.display = 'flex';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 4000);
}

function setupTabsSwitcher() {
    const buttons = document.querySelectorAll('.customizer-tabs .tab-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const tab = btn.getAttribute('data-tab');
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            if (tab === 'home') {
                document.getElementById('redesign-settings-form').classList.add('active');
            } else if (tab === 'header') {
                document.getElementById('redesign-header-form').classList.add('active');
            } else if (tab === 'footer') {
                document.getElementById('redesign-footer-form').classList.add('active');
            } else if (tab === 'products') {
                document.getElementById('redesign-product-form').classList.add('active');
            }
        });
    });
}

// Save Header settings
async function handleHeaderSave(e) {
    e.preventDefault();
    const merged = { ...currentSettings, ...getFormData() };
    const btn = document.querySelector('#redesign-header-form .save-publish-btn');
    const orig = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> Saving...`;
    if (window.lucide) lucide.createIcons();
    try {
        await saveSettings(merged, activeSiteSlug);
        currentSettings = merged;
        triggerLivePreviewUpdate();
        showToast('Header settings saved & published!');
        reloadPreview();
    } catch(err) {
        showToast('Save failed: ' + err.message, 'error');
    } finally {
        btn.disabled = false; btn.innerHTML = orig;
        if (window.lucide) lucide.createIcons();
    }
}

// Save Footer settings
async function handleFooterSave(e) {
    e.preventDefault();
    const merged = { ...currentSettings, ...getFormData() };
    // also sync social links from footer tab fields
    merged.facebook = (document.getElementById('redesign-footer-facebook') || {}).value || merged.facebook || '';
    merged.twitter  = (document.getElementById('redesign-footer-twitter')  || {}).value || merged.twitter  || '';
    merged.linkedin = (document.getElementById('redesign-footer-linkedin') || {}).value || merged.linkedin || '';
    const btn = document.querySelector('#redesign-footer-form .save-publish-btn');
    const orig = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> Publishing...`;
    if (window.lucide) lucide.createIcons();
    try {
        await saveSettings(merged, activeSiteSlug);
        currentSettings = merged;
        triggerLivePreviewUpdate();
        showToast('Footer published live!');
        reloadPreview();
    } catch(err) {
        showToast('Save failed: ' + err.message, 'error');
    } finally {
        btn.disabled = false; btn.innerHTML = orig;
        if (window.lucide) lucide.createIcons();
    }
}

async function initProductEditor() {
    populateProductCategories();
    await loadRedesignProductsList();
    await loadRedesignBrochuresList();
    
    // Bind product select change event
    const productSelect = document.getElementById('redesign-product-select');
    if (productSelect) {
        productSelect.addEventListener('change', loadRedesignProductDetails);
    }
}

function populateProductCategories() {
    const categorySelect = document.getElementById('redesign-prod-category');
    if (!categorySelect) return;

    if (activeSiteSlug === 'abcschool') {
        categorySelect.innerHTML = `
            <option value="Mathematics">Mathematics</option>
            <option value="Science & Technology">Science & Technology</option>
            <option value="Humanities">Humanities</option>
            <option value="Sports & Athletics">Sports & Athletics</option>
        `;
    } else if (activeSiteSlug === 'hospital') {
        categorySelect.innerHTML = `
            <option value="Cardiology Center">Cardiology Center</option>
            <option value="Pediatric Care">Pediatric Care</option>
            <option value="Neurology Specialty">Neurology Specialty</option>
            <option value="Oncology Care">Oncology Care</option>
        `;
    } else if (activeSiteSlug === 'agree') {
        categorySelect.innerHTML = `
            <option value="Organic Vegetables">Organic Vegetables</option>
            <option value="Wholesale Grains">Wholesale Grains</option>
            <option value="Seasonal Fruits">Seasonal Fruits</option>
            <option value="Farming Equipment">Farming Equipment</option>
        `;
    } else {
        categorySelect.innerHTML = `
            <option value="Triple Offset Valves">Triple Offset Valves</option>
            <option value="PFA Lined Valves">PFA Lined Valves</option>
            <option value="High Performance Valves">High Performance Valves</option>
            <option value="Actuation & Controls">Actuation & Controls</option>
        `;
    }
}

async function loadRedesignProductsList(selectedId = null) {
    const selector = document.getElementById('redesign-product-select');
    if (!selector) return;

    try {
        redesignProductsCache = await getProducts(activeSiteSlug);
        
        let html = '<option value="new">-- Create New Entry --</option>';
        html += redesignProductsCache.map(p => `<option value="${p.id}">${p.title} (${p.status})</option>`).join('');
        selector.innerHTML = html;

        if (selectedId) {
            selector.value = selectedId;
        } else {
            selector.value = 'new';
        }
        loadRedesignProductDetails();
    } catch(err) {
        console.error("Failed loading products for customizer selection", err);
    }
}

async function loadRedesignBrochuresList() {
    const selector = document.getElementById('redesign-prod-pdf');
    if (!selector) return;

    try {
        const docs = await getDocuments(activeSiteSlug);
        let html = '<option value="">-- None --</option>';
        html += docs.map(d => `<option value="${d.file_url}">${d.title} (v${d.version})</option>`).join('');
        selector.innerHTML = html;
    } catch(err) {
        console.error("Failed loading brochures for customizer selector", err);
    }
}

function loadRedesignProductDetails() {
    const selector = document.getElementById('redesign-product-select');
    if (!selector) return;

    const val = selector.value;
    
    if (val === 'new') {
        document.getElementById('redesign-prod-id').value = '';
        document.getElementById('redesign-prod-title').value = '';
        document.getElementById('redesign-prod-image').value = '';
        hideUploadPreview('redesign-prod-image');
        document.getElementById('redesign-prod-desc').value = '';
        document.getElementById('redesign-prod-features').value = '';
        document.getElementById('redesign-prod-specs').value = '{}';
        document.getElementById('redesign-prod-industries').value = '';
        document.getElementById('redesign-prod-pdf').value = '';
    } else {
        const p = redesignProductsCache.find(x => x.id === val);
        if (!p) return;

        document.getElementById('redesign-prod-id').value = p.id;
        document.getElementById('redesign-prod-title').value = p.title;
        document.getElementById('redesign-prod-category').value = p.category;
        document.getElementById('redesign-prod-image').value = p.image_url || '';
        if (p.image_url) {
            showUploadPreview('redesign-prod-image', p.image_url);
        } else {
            hideUploadPreview('redesign-prod-image');
        }
        document.getElementById('redesign-prod-desc').value = p.description || '';

        // Features Highlights List
        try {
            const feats = typeof p.features === 'string' ? JSON.parse(p.features) : p.features || [];
            document.getElementById('redesign-prod-features').value = feats.join('\n');
        } catch(e) { document.getElementById('redesign-prod-features').value = ''; }

        // Specifications
        let specs = {};
        try {
            specs = typeof p.specifications === 'string' ? JSON.parse(p.specifications) : p.specifications || {};
        } catch(e) { specs = {}; }

        // Associated PDF
        const brochureUrl = specs["Brochure Link"] || "";
        document.getElementById('redesign-prod-pdf').value = brochureUrl;

        // Strip Brochure Link out of JSON to show clean spec values
        const cleanSpecs = { ...specs };
        delete cleanSpecs["Brochure Link"];
        document.getElementById('redesign-prod-specs').value = JSON.stringify(cleanSpecs, null, 2);

        // Keywords
        try {
            const inds = typeof p.industries === 'string' ? JSON.parse(p.industries) : p.industries || [];
            document.getElementById('redesign-prod-industries').value = inds.join(', ');
        } catch(e) { document.getElementById('redesign-prod-industries').value = ''; }
    }
}

async function handleRedesignProductSave(e) {
    e.preventDefault();

    const id = document.getElementById('redesign-prod-id').value;
    const title = document.getElementById('redesign-prod-title').value;
    const category = document.getElementById('redesign-prod-category').value;
    const image_url = document.getElementById('redesign-prod-image').value;
    const description = document.getElementById('redesign-prod-desc').value;

    const features = document.getElementById('redesign-prod-features').value.split('\n').map(x => x.trim()).filter(x => x !== '');

    let specifications = {};
    try {
        specifications = JSON.parse(document.getElementById('redesign-prod-specs').value || '{}');
    } catch(err) {
        alert("Specifications is not valid JSON format! Example:\n{\n  \"Size\": \"12 inch\"\n}");
        return;
    }

    // Attach PDF brochure link if selected
    const pdfLink = document.getElementById('redesign-prod-pdf').value;
    if (pdfLink) {
        specifications["Brochure Link"] = pdfLink;
    }

    const industries = document.getElementById('redesign-prod-industries').value.split(',').map(x => x.trim()).filter(x => x !== '');
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const pObj = {
        title,
        category,
        image_url,
        description,
        features: JSON.stringify(features),
        specifications: JSON.stringify(specifications),
        industries: JSON.stringify(industries),
        slug,
        status: 'Published' // Auto-publish from customizer
    };

    if (id) {
        pObj.id = id;
    }

    const btn = document.querySelector('#redesign-product-form .save-publish-btn');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> Publishing...`;
    lucide.createIcons();

    try {
        const resultObj = await saveProduct(pObj, activeSiteSlug);
        showToast(`Product "${title}" published live successfully!`);
        
        // Reload preview & selector
        reloadPreview();
        await loadRedesignProductsList(resultObj.id);
    } catch(err) {
        showToast("Error saving product: " + err.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
        lucide.createIcons();
    }
}

// Global Routing messages listener (Iframe -> Redesign)
window.addEventListener('message', async (event) => {
    if (event.data && event.data.type === 'cms-route-change') {
        const route = event.data.route;
        const productId = event.data.productId;
        
        if (route === 'products') {
            // Activate Products tab button
            const tabBtn = document.querySelector(`.customizer-tabs .tab-btn[data-tab="products"]`);
            if (tabBtn) {
                document.querySelectorAll('.customizer-tabs .tab-btn').forEach(b => b.classList.remove('active'));
                tabBtn.classList.add('active');

                document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
                document.getElementById('redesign-product-form').classList.add('active');
            }

            if (productId) {
                // Wait if cache is uninitialized
                if (redesignProductsCache.length === 0) {
                    await loadRedesignProductsList();
                }
                const selectEl = document.getElementById('redesign-product-select');
                if (selectEl) {
                    selectEl.value = productId;
                    loadRedesignProductDetails();
                }
            }
        }
    if (route === 'home') {
            // Activate Home tab button
            const tabBtn = document.querySelector(`.customizer-tabs .tab-btn[data-tab="home"]`);
            if (tabBtn) {
                document.querySelectorAll('.customizer-tabs .tab-btn').forEach(b => b.classList.remove('active'));
                tabBtn.classList.add('active');
                document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
                document.getElementById('redesign-settings-form').classList.add('active');
            }
        }
        if (route === 'header') {
            const tabBtn = document.querySelector(`.customizer-tabs .tab-btn[data-tab="header"]`);
            if (tabBtn) {
                document.querySelectorAll('.customizer-tabs .tab-btn').forEach(b => b.classList.remove('active'));
                tabBtn.classList.add('active');
                document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
                document.getElementById('redesign-header-form').classList.add('active');
            }
        }
        if (route === 'footer') {
            const tabBtn = document.querySelector(`.customizer-tabs .tab-btn[data-tab="footer"]`);
            if (tabBtn) {
                document.querySelectorAll('.customizer-tabs .tab-btn').forEach(b => b.classList.remove('active'));
                tabBtn.classList.add('active');
                document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
                document.getElementById('redesign-footer-form').classList.add('active');
            }
        }
    }
});

// Setup direct file uploads for Redesign Customizer
function setupDirectUploads() {
    // 1. Hero background image upload listener
    const heroFileInput = document.getElementById('redesign-hero-image-file');
    const heroTextInput = document.getElementById('redesign-hero-image');
    
    if (heroFileInput) {
        heroFileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                // Show loading indicator
                const uploadBtn = heroFileInput.nextElementSibling;
                const originalText = uploadBtn.innerHTML;
                uploadBtn.disabled = true;
                uploadBtn.innerHTML = `<i data-lucide="loader-2" class="spin" style="width:14px; height:14px;"></i> Uploading...`;
                if (window.lucide) lucide.createIcons();

                const record = await uploadMediaFile(file, activeSiteSlug);
                heroTextInput.value = record.file_url;
                
                // Show preview
                showUploadPreview('redesign-hero-image', record.file_url);
                triggerLivePreviewUpdate();

                uploadBtn.disabled = false;
                uploadBtn.innerHTML = originalText;
                if (window.lucide) lucide.createIcons();
            } catch (err) {
                showToast("Upload failed: " + err.message, "error");
            }
        });
    }

    if (heroTextInput) {
        heroTextInput.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            if (val) {
                showUploadPreview('redesign-hero-image', val);
            } else {
                hideUploadPreview('redesign-hero-image');
            }
        });
    }

    // 2. Product image upload listener
    const prodFileInput = document.getElementById('redesign-prod-image-file');
    const prodTextInput = document.getElementById('redesign-prod-image');

    if (prodFileInput) {
        prodFileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                // Show loading
                const uploadBtn = prodFileInput.nextElementSibling;
                const originalText = uploadBtn.innerHTML;
                uploadBtn.disabled = true;
                uploadBtn.innerHTML = `<i data-lucide="loader-2" class="spin" style="width:14px; height:14px;"></i> Uploading...`;
                if (window.lucide) lucide.createIcons();

                const record = await uploadMediaFile(file, activeSiteSlug);
                prodTextInput.value = record.file_url;

                // Show preview
                showUploadPreview('redesign-prod-image', record.file_url);

                uploadBtn.disabled = false;
                uploadBtn.innerHTML = originalText;
                if (window.lucide) lucide.createIcons();
            } catch (err) {
                showToast("Upload failed: " + err.message, "error");
            }
        });
    }

    if (prodTextInput) {
        prodTextInput.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            if (val) {
                showUploadPreview('redesign-prod-image', val);
            } else {
                hideUploadPreview('redesign-prod-image');
            }
        });
    }

    // 3. Product PDF direct upload listener
    const pdfFileInput = document.getElementById('redesign-prod-pdf-file');
    if (pdfFileInput) {
        pdfFileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const uploadBtn = pdfFileInput.nextElementSibling;
            const originalText = uploadBtn.innerHTML;
            uploadBtn.disabled = true;
            uploadBtn.innerHTML = `<i data-lucide="loader-2" class="spin" style="width:14px; height:14px;"></i> Uploading...`;
            if (window.lucide) lucide.createIcons();

            try {
                // Upload file (Supabase Storage or Base64 locally)
                const record = await uploadMediaFile(file, activeSiteSlug);

                // Auto-register this PDF as a document in the documents table
                const newDoc = {
                    title: file.name.replace(/\.pdf$/i, '').replace(/[_-]/g, ' '),
                    doc_type: 'Brochure',
                    version: 1,
                    file_url: record.file_url,
                    status: 'Published',
                    original_filename: file.name
                };

                let docRecord;
                try {
                    docRecord = await saveDocument(newDoc, activeSiteSlug);
                } catch (docErr) {
                    console.warn('Could not auto-save document record', docErr);
                    docRecord = { file_url: record.file_url };
                }

                // Update the select with new option and select it
                const pdfSelect = document.getElementById('redesign-prod-pdf');
                if (pdfSelect) {
                    const opt = document.createElement('option');
                    opt.value = docRecord.file_url;
                    opt.textContent = newDoc.title + ' (v1)';
                    opt.selected = true;
                    pdfSelect.appendChild(opt);
                }

                // Show badge with filename
                const badge = document.getElementById('redesign-prod-pdf-badge');
                const badgeName = document.getElementById('redesign-prod-pdf-badge-name');
                if (badge && badgeName) {
                    badgeName.textContent = file.name;
                    badge.style.display = 'flex';
                    if (window.lucide) lucide.createIcons();
                }

                showToast(`PDF "${file.name}" uploaded and linked!`);
            } catch (err) {
                showToast('PDF upload failed: ' + err.message, 'error');
            } finally {
                uploadBtn.disabled = false;
                uploadBtn.innerHTML = originalText;
                if (window.lucide) lucide.createIcons();
            }
        });
    }
}

function showUploadPreview(idPrefix, url) {
    const previewContainer = document.getElementById(`${idPrefix}-preview-container`);
    const previewImg = document.getElementById(`${idPrefix}-preview`);
    if (previewContainer && previewImg) {
        previewImg.src = url;
        previewContainer.style.display = 'block';
    }
}

function hideUploadPreview(idPrefix) {
    const previewContainer = document.getElementById(`${idPrefix}-preview-container`);
    const previewImg = document.getElementById(`${idPrefix}-preview`);
    if (previewContainer) {
        previewContainer.style.display = 'none';
    }
    if (previewImg) {
        previewImg.src = '';
    }
}

window.clearUpload = function(idPrefix) {
    const fileInput = document.getElementById(`${idPrefix}-file`);
    const textInput = document.getElementById(idPrefix);
    if (fileInput) fileInput.value = '';
    if (textInput) textInput.value = '';
    
    hideUploadPreview(idPrefix);
    triggerLivePreviewUpdate();
};

window.clearPdfUpload = function() {
    const fileInput = document.getElementById('redesign-prod-pdf-file');
    const badge = document.getElementById('redesign-prod-pdf-badge');
    const pdfSelect = document.getElementById('redesign-prod-pdf');
    if (fileInput) fileInput.value = '';
    if (badge) badge.style.display = 'none';
    if (pdfSelect) pdfSelect.value = '';
};
