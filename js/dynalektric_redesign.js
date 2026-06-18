// Visual Redesign Customizer Controller for Dynalektric
const activeSiteSlug = 'dynalektric';
let currentSettings = {};
let redesignProductsCache = [];

document.addEventListener('DOMContentLoaded', () => {
    initRedesignApp();
});

async function initRedesignApp() {
    lucide.createIcons();

    // 1. Set chrome preview browser address bar
    document.getElementById('chrome-address-url').textContent = `${window.location.origin}/dynalektric.html`;
    
    // 2. Load initial settings
    try {
        await checkTableExistence();
        const settingsData = await getSettings(activeSiteSlug);
        if (settingsData) {
            currentSettings = settingsData;
        } else {
            currentSettings = { primaryColor: '#0077B6', secondaryColor: '#003366' };
        }
        
        populateRedesignForm();
    } catch(err) {
        showToast("Error reading settings: " + err.message, 'error');
    }

    // 3. Setup event bindings for color pickers & text input sync
    setupColorSync('redesign-color-primary', 'redesign-color-primary-text');
    setupColorSync('redesign-color-secondary', 'redesign-color-secondary-text');

    // 4. Viewport responsive sizing toggles
    setupViewportToggles();

    // 5. Visual Customizer layout tabs & product forms initializer
    setupTabsSwitcher();
    await initProductEditor();
}

function populateRedesignForm() {
    const primaryHex = currentSettings.primaryColor || '#0077B6';
    const secondaryHex = currentSettings.secondaryColor || '#003366';

    document.getElementById('redesign-color-primary').value = primaryHex;
    document.getElementById('redesign-color-primary-text').value = primaryHex;
    document.getElementById('redesign-color-secondary').value = secondaryHex;
    document.getElementById('redesign-color-secondary-text').value = secondaryHex;
}

function setupColorSync(pickerId, textId) {
    const picker = document.getElementById(pickerId);
    const textInput = document.getElementById(textId);
    if (!picker || !textInput) return;

    picker.addEventListener('input', (e) => {
        textInput.value = e.target.value.toUpperCase();
    });

    textInput.addEventListener('input', (e) => {
        let val = e.target.value;
        if (!val.startsWith('#')) val = '#' + val;
        if (/^#[A-Fa-f0-9]{6}$/.test(val)) {
            picker.value = val;
        }
    });
}

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
    iframe.src = iframe.src;
}

async function handleRedesignSave(e) {
    e.preventDefault();
    
    currentSettings.primaryColor = document.getElementById('redesign-color-primary').value;
    currentSettings.secondaryColor = document.getElementById('redesign-color-secondary').value;
    
    const saveBtn = document.querySelector('#redesign-settings-form .save-publish-btn');
    const originalHtml = saveBtn.innerHTML;
    saveBtn.disabled = true;
    saveBtn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> Publishing...`;
    lucide.createIcons();

    try {
        await saveSettings(currentSettings, activeSiteSlug);
        showToast("Theme updated and published live!");
        reloadPreview();
    } catch(err) {
        showToast("Failed publishing: " + err.message, 'error');
    } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = originalHtml;
        lucide.createIcons();
    }
}

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
            if (tab === 'theme') {
                document.getElementById('redesign-settings-form').classList.add('active');
            } else if (tab === 'pagecontent') {
                document.getElementById('redesign-pagecontent-form').classList.add('active');
                loadPageContentForm();
            } else if (tab === 'products') {
                document.getElementById('redesign-product-form').classList.add('active');
            }
        });
    });
}

function loadPageContentForm() {
    const page = document.getElementById('redesign-content-select').value;
    const container = document.getElementById('redesign-content-fields');
    
    // Ensure nested object exists
    if (!currentSettings.pageContent) currentSettings.pageContent = {};
    if (!currentSettings.pageContent[page]) currentSettings.pageContent[page] = {};
    const content = currentSettings.pageContent[page];

    let html = '';
    
    if (page === 'home') {
        html += `
            <h3 style="margin-top:20px; margin-bottom:10px; padding-bottom:5px; border-bottom:1px solid var(--rule)">Hero Section</h3>
            <div class="form-group">
                <label>Hero Title</label>
                <textarea id="pagecontent-home-title" rows="2">${content.heroTitle || 'Engineering-led electrical and electronics manufacturing.'}</textarea>
            </div>
            <div class="form-group">
                <label>Hero Description</label>
                <textarea id="pagecontent-home-desc" rows="3">${content.heroDesc || 'In-house engineering, manufacturing and testing for infrastructure, mobility, energy and industrial applications.'}</textarea>
            </div>
            <div class="form-group">
                <label>Hero Background Video URL</label>
                <input type="text" id="pagecontent-home-video" value="${content.heroVideo || 'Dynalektric/demo1DL/public/videos/Dynalektric_Hero.mp4'}">
            </div>

            <h3 style="margin-top:20px; margin-bottom:10px; padding-bottom:5px; border-bottom:1px solid var(--rule)">Organisation Section</h3>
            <div class="form-group">
                <label>Section Title</label>
                <textarea id="pagecontent-home-orgtitle" rows="2">${content.orgTitle || 'The organisation behind every engineered solution.'}</textarea>
            </div>
            <div class="form-group">
                <label>Lead Text</label>
                <textarea id="pagecontent-home-orglead" rows="3">${content.orgLead || 'Dynalektric combines engineering teams, manufacturing capability...'}</textarea>
            </div>
            <div class="form-group">
                <label>Image URL</label>
                <input type="text" id="pagecontent-home-orgimg" value="${content.orgImg || 'Dynalektric/demo1DL/assets/card-magnetics.jpg'}">
            </div>

            <h3 style="margin-top:20px; margin-bottom:10px; padding-bottom:5px; border-bottom:1px solid var(--rule)">Capabilities Section</h3>
            <div class="form-group">
                <label>Section Title</label>
                <textarea id="pagecontent-home-captitle" rows="2">${content.capTitle || 'Engineering systems that power, control and support industrial operations.'}</textarea>
            </div>
            <div class="form-group">
                <label>Lead Text</label>
                <textarea id="pagecontent-home-caplead" rows="3">${content.capLead || 'Dynalektric combines engineering, manufacturing and testing...'}</textarea>
            </div>

            <h3 style="margin-top:20px; margin-bottom:10px; padding-bottom:5px; border-bottom:1px solid var(--rule)">Industries Section</h3>
            <div class="form-group">
                <label>Section Title</label>
                <textarea id="pagecontent-home-indtitle" rows="2">${content.indTitle || 'Engineering capability applied across demanding industries.'}</textarea>
            </div>
            <div class="form-group">
                <label>Lead Text</label>
                <textarea id="pagecontent-home-indlead" rows="3">${content.indLead || 'Dynalektric supports power, control and equipment applications...'}</textarea>
            </div>

            <h3 style="margin-top:20px; margin-bottom:10px; padding-bottom:5px; border-bottom:1px solid var(--rule)">R&D Section</h3>
            <div class="form-group">
                <label>Section Title</label>
                <textarea id="pagecontent-home-rndtitle" rows="2">${content.rndTitle || 'Custom requirements engineered in-house.'}</textarea>
            </div>
            <div class="form-group">
                <label>Lead Text</label>
                <textarea id="pagecontent-home-rndlead" rows="3">${content.rndLead || 'Our engineering and new product development teams take...'}</textarea>
            </div>
            <div class="form-group">
                <label>Image URL</label>
                <input type="text" id="pagecontent-home-rndimg" value="${content.rndImg || 'Dynalektric/demo1DL/assets/engineering-npd.jpg'}">
            </div>

            <h3 style="margin-top:20px; margin-bottom:10px; padding-bottom:5px; border-bottom:1px solid var(--rule)">Quality Section</h3>
            <div class="form-group">
                <label>Section Title</label>
                <textarea id="pagecontent-home-qualtitle" rows="2">${content.qualTitle || 'Type-tested designs, full documentation, traceable processes.'}</textarea>
            </div>
            <div class="form-group">
                <label>Lead Text</label>
                <textarea id="pagecontent-home-quallead" rows="3">${content.qualLead || 'Every product ships with routine and type test reports...'}</textarea>
            </div>

            <h3 style="margin-top:20px; margin-bottom:10px; padding-bottom:5px; border-bottom:1px solid var(--rule)">Case Studies Section</h3>
            <div class="form-group">
                <label>Section Title</label>
                <textarea id="pagecontent-home-casestitle" rows="2">${content.casesTitle || 'Engineering outcomes from real applications.'}</textarea>
            </div>
            <div class="form-group">
                <label>Lead Text</label>
                <textarea id="pagecontent-home-caseslead" rows="3">${content.casesLead || 'Selected examples of how Dynalektric applies engineering...'}</textarea>
            </div>
        `;
    } else if (page === 'about') {
        html += `
            <div class="form-group">
                <label>About Page Header Title</label>
                <textarea id="pagecontent-about-title" rows="2">${content.title || 'Engineering and Manufacturing Capability'}</textarea>
            </div>
            <div class="form-group">
                <label>About Page Description</label>
                <textarea id="pagecontent-about-desc" rows="5">${content.desc || 'Dynalektric supports OEMs, utilities, and EPC contractors...'}</textarea>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

async function handleRedesignPageContentSave(e) {
    e.preventDefault();
    const page = document.getElementById('redesign-content-select').value;
    
    if (!currentSettings.pageContent) currentSettings.pageContent = {};
    if (!currentSettings.pageContent[page]) currentSettings.pageContent[page] = {};

    if (page === 'home') {
        currentSettings.pageContent.home.heroTitle = document.getElementById('pagecontent-home-title').value;
        currentSettings.pageContent.home.heroDesc = document.getElementById('pagecontent-home-desc').value;
        currentSettings.pageContent.home.heroVideo = document.getElementById('pagecontent-home-video').value;
        currentSettings.pageContent.home.orgTitle = document.getElementById('pagecontent-home-orgtitle').value;
        currentSettings.pageContent.home.orgLead = document.getElementById('pagecontent-home-orglead').value;
        currentSettings.pageContent.home.orgImg = document.getElementById('pagecontent-home-orgimg').value;
        currentSettings.pageContent.home.capTitle = document.getElementById('pagecontent-home-captitle').value;
        currentSettings.pageContent.home.capLead = document.getElementById('pagecontent-home-caplead').value;
        currentSettings.pageContent.home.indTitle = document.getElementById('pagecontent-home-indtitle').value;
        currentSettings.pageContent.home.indLead = document.getElementById('pagecontent-home-indlead').value;
        currentSettings.pageContent.home.rndTitle = document.getElementById('pagecontent-home-rndtitle').value;
        currentSettings.pageContent.home.rndLead = document.getElementById('pagecontent-home-rndlead').value;
        currentSettings.pageContent.home.rndImg = document.getElementById('pagecontent-home-rndimg').value;
        currentSettings.pageContent.home.qualTitle = document.getElementById('pagecontent-home-qualtitle').value;
        currentSettings.pageContent.home.qualLead = document.getElementById('pagecontent-home-quallead').value;
        currentSettings.pageContent.home.casesTitle = document.getElementById('pagecontent-home-casestitle').value;
        currentSettings.pageContent.home.casesLead = document.getElementById('pagecontent-home-caseslead').value;
    } else if (page === 'about') {
        currentSettings.pageContent.about.title = document.getElementById('pagecontent-about-title').value;
        currentSettings.pageContent.about.desc = document.getElementById('pagecontent-about-desc').value;
    }

    const saveBtn = document.querySelector('#redesign-pagecontent-form .save-publish-btn');
    const originalHtml = saveBtn.innerHTML;
    saveBtn.disabled = true;
    saveBtn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> Publishing...`;
    lucide.createIcons();

    try {
        await saveSettings(currentSettings, activeSiteSlug);
        showToast("Page Content updated and published live!");
        reloadPreview();
    } catch(err) {
        showToast("Failed publishing: " + err.message, 'error');
    } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = originalHtml;
        lucide.createIcons();
    }
}

async function initProductEditor() {
    await loadRedesignProductsList();
    
    // Seed any missing default products (e.g. case studies) without affecting user-added ones
    ensureDefaultProductsSeeded();
    
    const productSelect = document.getElementById('redesign-product-select');
    if (productSelect) {
        productSelect.addEventListener('change', loadRedesignProductDetails);
    }
}

async function loadRedesignProductsList(selectedId = null) {
    try {
        let products = await getProducts(activeSiteSlug);
        redesignProductsCache = products;
        
        const selector = document.getElementById('redesign-product-select');
        if (selector) {
            let html = '<option value="new">-- Create New Entry --</option>';
            html += redesignProductsCache.map(p => `<option value="${p.id}">${p.title} (${p.category})</option>`).join('');
            selector.innerHTML = html;

            if (selectedId) {
                selector.value = selectedId;
            } else {
                selector.value = 'new';
            }
            loadRedesignProductDetails();
        }
    } catch(err) {
        console.error("Failed loading products for customizer selection", err);
    }
}

async function ensureDefaultProductsSeeded() {
    try {
        if (typeof seedDatabaseIfEmpty !== 'function') return;
        const products = await getProducts(activeSiteSlug);
        
        // Get the default slugs from mock data for this site
        const siteData = typeof MULTI_SITE_DATA !== 'undefined' ? MULTI_SITE_DATA[activeSiteSlug] : null;
        if (!siteData || !siteData.products) return;
        
        const existingSlugs = new Set(products.map(p => p.slug));
        const missing = siteData.products.filter(p => !existingSlugs.has(p.slug));
        
        if (missing.length > 0) {
            console.log(`Seeding ${missing.length} missing default products...`);
            for (const p of missing) {
                try { await saveProduct(p, activeSiteSlug); } catch(e) { console.warn('Seed skip:', p.slug, e); }
            }
            await loadRedesignProductsList();
            reloadPreview();
        }
    } catch(err) {
        console.error('ensureDefaultProductsSeeded failed:', err);
    }
}

function loadRedesignProductDetails() {
    const selector = document.getElementById('redesign-product-select');
    if (!selector) return;

    const val = selector.value;
    
    if (val === 'new') {
        document.getElementById('redesign-prod-id').value = '';
        document.getElementById('redesign-prod-title').value = '';
        document.getElementById('redesign-prod-category').value = 'Capability';
        document.getElementById('redesign-prod-image').value = '';
        document.getElementById('redesign-prod-desc').value = '';
        document.getElementById('redesign-prod-features').value = '';
        document.getElementById('redesign-prod-cta').value = '';
    } else {
        const p = redesignProductsCache.find(x => x.id === val);
        if (!p) return;

        document.getElementById('redesign-prod-id').value = p.id;
        document.getElementById('redesign-prod-title').value = p.title;
        document.getElementById('redesign-prod-category').value = p.category;
        document.getElementById('redesign-prod-image').value = p.image_url || '';
        document.getElementById('redesign-prod-desc').value = p.description || '';

        try {
            const feats = typeof p.features === 'string' ? JSON.parse(p.features) : p.features || [];
            document.getElementById('redesign-prod-features').value = feats.join('\n');
        } catch(e) { document.getElementById('redesign-prod-features').value = ''; }

        try {
            const specs = typeof p.specifications === 'string' ? JSON.parse(p.specifications) : p.specifications || {};
            document.getElementById('redesign-prod-cta').value = specs.cta || '';
        } catch(e) { document.getElementById('redesign-prod-cta').value = ''; }
    }
}

async function handleProductSubmit(e) {
    e.preventDefault();

    const id = document.getElementById('product-id').value;
    const title = document.getElementById('product-title').value;
    const category = document.getElementById('product-category').value;
    const image_url = document.getElementById('product-image').value;
    const description = document.getElementById('product-desc').value;

    const features = document.getElementById('product-features').value.split('\n').map(x => x.trim()).filter(x => x !== '');
    
    let specifications = {};
    try {
        specifications = JSON.parse(document.getElementById('product-specs').value || '{}');
    } catch(err) {
        showToast("Specifications is not valid JSON!", 'error');
        return;
    }

    const industries = [];
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
        status: 'Published'
    };

    if (id) {
        pObj.id = id;
    }

    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn ? btn.innerHTML : 'Save Entry';
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> Publishing...`;
        lucide.createIcons();
    }

    try {
        const resultObj = await saveProduct(pObj, activeSiteSlug);
        showToast(`Item "${title}" published live successfully!`);
        
        closeProductModal();
        reloadPreview();
        await loadRedesignProductsList(resultObj.id);
    } catch(err) {
        showToast("Error saving item: " + err.message, 'error');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = originalText;
            lucide.createIcons();
        }
    }
}

// ==========================================
// Inline Editor Integration
// ==========================================

// Listen for inline edits from the iframe
window.addEventListener('message', async (event) => {
    if (event.data && event.data.type === 'INLINE_EDIT') {
        const { page, key, value } = event.data;
        
        if (!currentSettings.pageContent) currentSettings.pageContent = {};
        if (!currentSettings.pageContent[page]) currentSettings.pageContent[page] = {};
        
        currentSettings.pageContent[page][key] = value;
        console.log(`Inline edit received: ${page}.${key} = ${value}`);
        
        // Auto-save
        await saveInlineChangesSilent();
    }
    
    if (event.data && event.data.type === 'INLINE_FILE_UPLOAD') {
        const { page, key, fileData, fileName, fileType } = event.data;
        console.log(`Inline file upload received: ${page}.${key} (${fileName})`);
        
        try {
            // Convert base64 data to File object
            const res = await fetch(fileData);
            const blob = await res.blob();
            const file = new File([blob], fileName, { type: fileType });
            
            // Upload to DB/storage
            const mediaRecord = await uploadMediaFile(file, activeSiteSlug);
            
            // Update settings
            if (!currentSettings.pageContent) currentSettings.pageContent = {};
            if (!currentSettings.pageContent[page]) currentSettings.pageContent[page] = {};
            currentSettings.pageContent[page][key] = mediaRecord.file_url;
            
            // Auto-save
            await saveInlineChangesSilent();
            showToast("Media uploaded and saved successfully!", "success");
            
            // Reload preview to show the new uploaded image natively
            reloadPreview();
        } catch (err) {
            console.error("Inline upload failed:", err);
            showToast("Failed to upload media: " + err.message, "error");
        }
    }
    
    if (event.data && event.data.type === 'INLINE_PRODUCT_FILE_UPLOAD') {
        const { productId, fileData, fileName, fileType } = event.data;
        console.log(`Inline product file upload received: ${productId} (${fileName})`);
        
        try {
            const res = await fetch(fileData);
            const blob = await res.blob();
            const file = new File([blob], fileName, { type: fileType });
            
            const mediaRecord = await uploadMediaFile(file, activeSiteSlug);
            
            const p = redesignProductsCache.find(x => x.id === productId);
            if (p) {
                p.image_url = mediaRecord.file_url;
                await saveProduct(p, activeSiteSlug);
                showToast("Product image uploaded and saved successfully!", "success");
                reloadPreview();
            }
        } catch (err) {
            console.error("Inline product upload failed:", err);
            showToast("Failed to upload product image: " + err.message, "error");
        }
    }
    
    if (event.data && event.data.type === 'INLINE_PRODUCT_EDIT') {
        const { productId, key, value } = event.data;
        console.log(`Inline product edit received: ${productId}.${key} = ${value}`);
        
        try {
            const p = redesignProductsCache.find(x => x.id === productId);
            if (p) {
                p[key] = value;
                await saveProduct(p, activeSiteSlug);
                console.log(`Product ${productId} auto-saved.`);
            }
        } catch(err) {
            console.error("Inline product edit failed:", err);
            showToast("Failed to save product change: " + err.message, "error");
        }
    }

    if (event.data && event.data.type === 'INLINE_ADD_PRODUCT') {
        const { category } = event.data;
        console.log(`Inline add product requested for category: ${category}`);
        openProductModal(null, category);
    }
    
    if (event.data && event.data.type === 'INLINE_OPEN_EDIT_MODAL') {
        const { productId } = event.data;
        const p = redesignProductsCache.find(x => x.id == productId);
        if (p) {
            openProductModal(p);
        } else {
            console.error(`Product ${productId} not found in redesignProductsCache`);
        }
    }
    
    if (event.data && event.data.type === 'INLINE_DELETE_PRODUCT') {
        const { productId } = event.data;
        if (confirm("Are you sure you want to delete this item?")) {
            deleteProduct(productId, activeSiteSlug).then(() => {
                showToast("Item deleted successfully", "success");
                reloadPreview();
                loadRedesignProductsList();
            }).catch(err => {
                showToast("Failed to delete item: " + err.message, "error");
            });
        }
    }
});

// Modal Logic
function openProductModal(product = null, defaultCategory = 'Capability') {
    document.getElementById('product-modal').classList.add('active');
    
    if (product) {
        document.getElementById('product-modal-title').textContent = "Modify Entry";
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-title').value = product.title || '';
        document.getElementById('product-category').value = product.category || defaultCategory;
        document.getElementById('product-image').value = product.image_url || '';
        document.getElementById('product-desc').value = product.description || '';
        
        let feats = product.features;
        if (typeof feats === 'string') {
            try { feats = JSON.parse(feats); } catch(e) { feats = []; }
        }
        document.getElementById('product-features').value = Array.isArray(feats) ? feats.join('\n') : '';
        
        let specs = product.specifications;
        if (typeof specs === 'string' && specs.startsWith('{')) {
            document.getElementById('product-specs').value = specs;
        } else {
            document.getElementById('product-specs').value = JSON.stringify(specs || {cta: 'Explore'});
        }
        
        if (product.image_url) {
            document.getElementById('product-image-preview').src = normalizeUrl(product.image_url);
            document.getElementById('product-image-preview-container').style.display = 'block';
        } else {
            document.getElementById('product-image-preview-container').style.display = 'none';
        }
    } else {
        document.getElementById('product-modal-title').textContent = "Create Entry";
        document.getElementById('product-id').value = '';
        document.getElementById('product-form').reset();
        document.getElementById('product-category').value = defaultCategory;
        document.getElementById('product-image-preview-container').style.display = 'none';
        document.getElementById('product-specs').value = JSON.stringify({cta: 'Explore ' + defaultCategory});
    }
}

function normalizeUrl(url) {
    if (!url) return '';
    return url.startsWith('assets/') ? 'Dynalektric/demo1DL/' + url : url;
}

function closeProductModal() {
    document.getElementById('product-modal').classList.remove('active');
}

function clearProductImage() {
    document.getElementById('product-image').value = '';
    document.getElementById('product-image-file').value = '';
    document.getElementById('product-image-preview-container').style.display = 'none';
}

// Bind file input for modal image
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('product-image-file');
    if (fileInput) {
        fileInput.addEventListener('change', async (e) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                try {
                    const media = await uploadMediaFile(file, activeSiteSlug);
                    document.getElementById('product-image').value = media.file_url;
                    document.getElementById('product-image-preview').src = normalizeUrl(media.file_url);
                    document.getElementById('product-image-preview-container').style.display = 'block';
                } catch(err) {
                    showToast("Failed to upload image: " + err.message, "error");
                }
            }
        });
    }
});

async function handleProductSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('product-id').value;
    const title = document.getElementById('product-title').value;
    const category = document.getElementById('product-category').value;
    const image_url = document.getElementById('product-image').value;
    const description = document.getElementById('product-desc').value;
    
    let features = [];
    const featStr = document.getElementById('product-features').value;
    if (featStr) {
        features = featStr.split('\n').map(s => s.trim()).filter(s => s.length > 0);
    }
    
    let specs = {};
    const specsStr = document.getElementById('product-specs').value;
    if (specsStr) {
        try { specs = JSON.parse(specsStr); } catch(err) { showToast("Invalid JSON in Specifications", "error"); return; }
    }
    
    const pObj = {
        title,
        category,
        image_url,
        description,
        features: JSON.stringify(features),
        specifications: JSON.stringify(specs),
        industries: '[]',
        status: 'Published'
    };
    
    if (id) {
        pObj.id = id;
    } else {
        pObj.slug = 'new-' + category.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    }
    
    const btn = e.target.querySelector('button[type="submit"]');
    const ogHtml = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = 'Saving...';
    
    try {
        await saveProduct(pObj, activeSiteSlug);
        showToast(id ? "Entry updated successfully" : "Entry created successfully", "success");
        closeProductModal();
        reloadPreview();
        loadRedesignProductsList();
    } catch(err) {
        showToast("Error saving entry: " + err.message, "error");
    } finally {
        btn.disabled = false;
        btn.innerHTML = ogHtml;
    }
}

async function saveInlineChangesSilent() {
    try {
        await saveSettings(currentSettings, activeSiteSlug);
        console.log("Auto-saved inline changes.");
    } catch(err) {
        console.error("Auto-save failed:", err);
    }
}

async function saveInlineChanges() {
    const btn = document.querySelector('.save-publish-btn');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader-2" class="spin"></i> Publishing...`;
    lucide.createIcons();

    try {
        await saveSettings(currentSettings, activeSiteSlug);
        showToast("Inline changes published live!", "success");
    } catch(err) {
        showToast("Failed publishing: " + err.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
        lucide.createIcons();
    }
}
