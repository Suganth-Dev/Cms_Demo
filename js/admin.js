// CMS Admin Dashboard Controller - Multi-Tenant Version

// Current Active Tenant & User State
let currentSiteSlug = 'maxseal';
let currentUser = {
    email: 'admin@maxsealinc.com',
    role: 'Admin'
};

// Data Store Cache
let cacheProducts = [];
let cacheDocuments = [];
let cacheMedia = [];
let cacheMarketing = [];
let cachePartners = [];

// DOM Ready initialization
document.addEventListener('DOMContentLoaded', () => {
    initAdminApp();
});
function initAdminApp() {
    // 0. Initialize premium login background
    initLoginCanvasBackground();

    // 1. Initialise Lucide icons
    lucide.createIcons();

    // 2. Read existing session if logged in
    const savedRole = localStorage.getItem('cms_role');
    const savedEmail = localStorage.getItem('cms_email');
    if (savedRole && savedEmail) {
        currentUser.role = savedRole;
        currentUser.email = savedEmail;
        showDashboard();
    } else {
        showLogin();
    }

    // 3. Bind Sidebar Navigation Clicks
    document.querySelectorAll('#sidebar-menu-links li').forEach(li => {
        li.addEventListener('click', (e) => {
            e.preventDefault();
            const targetView = li.getAttribute('data-target');
            switchSectionView(targetView);
        });
    });

    // 4. Bind Tenant Context Selector Change
    const siteSelect = document.getElementById('admin-site-context');
    if (siteSelect) {
        siteSelect.addEventListener('change', async (e) => {
            currentSiteSlug = e.target.value;
            showToast(`Switched active context to: ${currentSiteSlug.toUpperCase()}`);
            
            // Auto-seed if database settings are empty for this tenant
            try {
                const settingsObj = await getSettings(currentSiteSlug);
                if (!settingsObj) {
                    console.log(`Auto-seeding empty tenant database for: ${currentSiteSlug}...`);
                    await seedDatabaseIfEmpty();
                }
            } catch (err) {
                console.warn("Seeding check on context change failed:", err);
            }

            // Re-render active section
            const activeLi = document.querySelector('#sidebar-menu-links li.active');
            if (activeLi) {
                const targetView = activeLi.getAttribute('data-target');
                switchSectionView(targetView);
            }
        });
    }

    // 5. Setup direct uploads
    setupAdminUploads();
}

// ==========================================
// AUTHENTICATION CONTROLS
// ==========================================

async function handleAdminLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const submitBtn = document.getElementById('login-submit-btn') || e.target.querySelector('button[type="submit"]');
    let originalHtml = '';
    if (submitBtn) {
        originalHtml = submitBtn.innerHTML;
        submitBtn.disabled = true;
        const btnText = submitBtn.querySelector('.lf-btn-text');
        if (btnText) {
            btnText.textContent = "Authenticating...";
        } else {
            submitBtn.textContent = "Authenticating...";
        }
    }

    try {
        const authRes = await validateAdminCredentials(email, password);
        if (authRes.success) {
            const user = authRes.user;
            currentUser.email = user.email;
            currentUser.role = user.role;
            
            // Save to session
            localStorage.setItem('cms_role', user.role);
            localStorage.setItem('cms_email', user.email);
            
            showToast(`Logged in successfully as ${user.role}`);
            await showDashboard();
        } else {
            showToast(authRes.message, 'error');
        }
    } catch (err) {
        console.error("Login failure:", err);
        showToast("Authentication service failed.", 'error');
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalHtml;
        }
    }
}

function handleAdminLogout() {
    localStorage.removeItem('cms_role');
    localStorage.removeItem('cms_email');
    showLogin();
}

function showLogin() {
    document.getElementById('admin-login-wrapper').style.display = 'flex';
    document.getElementById('admin-dashboard-wrapper').style.display = 'none';
}

async function showDashboard() {
    document.getElementById('admin-login-wrapper').style.display = 'none';
    document.getElementById('admin-dashboard-wrapper').style.display = 'flex';
    
    // Update User Identity Display
    document.getElementById('current-user-email').textContent = currentUser.email;
    document.getElementById('current-user-role').textContent = currentUser.role;
    document.getElementById('current-user-avatar').textContent = currentUser.role.charAt(0);
    
    // Default context selection
    const siteSelect = document.getElementById('admin-site-context');
    if (siteSelect) {
        currentSiteSlug = siteSelect.value;
    }

    switchSectionView('dashboard');
}

// Switch Sidebar sections view
async function switchSectionView(viewName) {
    // 1. Mark menu links active
    document.querySelectorAll('#sidebar-menu-links li').forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('data-target') === viewName) {
            li.classList.add('active');
        }
    });

    // 2. Hide all section panels, show targeted
    document.querySelectorAll('.admin-view-section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    const targetSection = document.getElementById(`admin-${viewName}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Dynamic Title mapping by Tenant
    const displayContext = currentSiteSlug.toUpperCase();
    const titles = {
        dashboard: `Dashboard Overview [${displayContext}]`,
        products: `Valves & Content Catalog [${displayContext}]`,
        documents: `Document & Version Control [${displayContext}]`,
        media: `Media Library [${displayContext}]`,
        marketing: `Marketing Resources [${displayContext}]`,
        partners: `Distributors & Partners [${displayContext}]`,
        settings: `Settings Configuration [${displayContext}]`
    };
    document.getElementById('admin-view-title').textContent = titles[viewName] || "CMS Dashboard";

    // 3. Load section data
    try {
        await refreshSectionData(viewName);
    } catch (err) {
        console.error(`Failed loading section ${viewName}:`, err);
        showToast(`Error: ${err.message}`, 'error');
    }

    updateLaunchRedesignButtons();
    lucide.createIcons();
}

function updateLaunchRedesignButtons() {
    const launchBtn = document.getElementById('launch-site-btn');
    const redesignBtn = document.getElementById('redesign-site-btn');
    
    let htmlFile = 'maxseal.html';
    if (currentSiteSlug === 'abcschool') {
        htmlFile = 'school.html';
    } else if (currentSiteSlug === 'hospital') {
        htmlFile = 'hospital.html';
    } else if (currentSiteSlug === 'agree') {
        htmlFile = 'agree.html';
    }
    
    if (launchBtn) {
        launchBtn.setAttribute('href', htmlFile);
    }
    if (redesignBtn) {
        redesignBtn.setAttribute('href', `redesign.html?site=${currentSiteSlug}`);
    }
}

// Fetch and render data by section
async function refreshSectionData(viewName) {
    const isDbReady = await checkTableExistence();
    const isFallback = typeof useLocalFallback !== 'undefined' ? useLocalFallback : false;

    if (!isDbReady && !isFallback) {
        if (viewName === 'dashboard') {
            document.getElementById('db-health-report').innerHTML = `
                <div style="color: #B91C1C; font-weight: 600;">
                    <i data-lucide="alert-octagon" style="vertical-align: middle;"></i> Table Schema Missing!
                </div>
                <p style="margin-top: 10px; color: var(--admin-text-secondary);">
                    Please run setup.sql in your Supabase SQL editor to create the database schemas, then visit Settings ➔ Click **Seed Live Database Tables**.
                </p>
            `;
            lucide.createIcons();
        }
        return;
    }

    if (viewName === 'dashboard') {
        try {
            let products = await getProducts(currentSiteSlug);
            let docs = await getDocuments(currentSiteSlug);
            let media = await getMedia(currentSiteSlug);
            let settingsObj = await getSettings(currentSiteSlug);
            
            // Auto-seed if database settings are empty
            if (products.length === 0 && docs.length === 0 && !settingsObj) {
                console.log("Database tables are empty. Auto-seeding default multi-tenant dataset...");
                const seedRes = await seedDatabaseIfEmpty();
                if (seedRes.success) {
                    products = await getProducts(currentSiteSlug);
                    docs = await getDocuments(currentSiteSlug);
                    media = await getMedia(currentSiteSlug);
                }
            }
            
            document.getElementById('dash-count-products').textContent = products.length;
            document.getElementById('dash-count-docs').textContent = docs.length;
            document.getElementById('dash-count-media').textContent = media.length;
            
            if (isFallback) {
                document.getElementById('db-health-report').innerHTML = `
                    <div style="color: #D97706; font-weight: 600; display:flex; align-items:center; gap:8px;">
                        <span style="width:10px; height:10px; border-radius:50%; background:#F59E0B; display:inline-block;"></span>
                        LocalStorage Fallback Mode (Demo / Offline)
                    </div>
                    <p style="margin-top: 6px; color: var(--admin-text-secondary); font-size:12px;">
                        Connection state: Local Sandbox. Data is saved in your local browser storage.
                    </p>
                `;
            } else {
                document.getElementById('db-health-report').innerHTML = `
                    <div style="color: #065F46; font-weight: 600; display:flex; align-items:center; gap:8px;">
                        <span style="width:10px; height:10px; border-radius:50%; background:#10B981; display:inline-block;"></span>
                        Active Tenant Workspace: ${currentSiteSlug.toUpperCase()}
                    </div>
                    <p style="margin-top: 6px; color: var(--admin-text-secondary); font-size:12px;">
                        Connection state: Live. Data rows retrieved cleanly under tenant context.
                    </p>
                `;
            }
        } catch(e) {
            document.getElementById('db-health-report').textContent = "Connection error: " + e.message;
        }
    }
    else if (viewName === 'products') {
        await loadProductsTable();
    }
    else if (viewName === 'documents') {
        await loadDocumentsTable();
    }
    else if (viewName === 'media') {
        await loadMediaLibrary();
    }
    else if (viewName === 'marketing') {
        await loadMarketingTable();
    }
    else if (viewName === 'partners') {
        await loadPartnersTable();
    }
    else if (viewName === 'settings') {
        await loadSettingsForm();
    }
}

// Toast Helper
function showToast(message, type = 'success') {
    const toast = document.getElementById('admin-toast');
    const toastMsg = document.getElementById('toast-message');
    
    toast.className = `admin-alert-toast ${type === 'success' ? 'toast-success' : 'toast-error'}`;
    toastMsg.textContent = message;
    
    toast.style.display = 'flex';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// ==========================================
// WORKFLOW RULES & BADGE HELPERS
// ==========================================

function getStatusBadgeClass(status) {
    const mapping = {
        'Draft': 'status-draft',
        'In Review': 'status-inreview',
        'Approved': 'status-approved',
        'Published': 'status-published',
        'Archived': 'status-archived'
    };
    return mapping[status] || 'status-draft';
}

function getWorkflowButtons(itemId, currentStatus, moduleType) {
    const role = currentUser.role;
    let buttons = '';

    if (currentStatus === 'Draft') {
        if (role === 'Editor' || role === 'Reviewer' || role === 'Admin') {
            buttons += `<button onclick="updateWorkflowStatus('${itemId}', 'In Review', '${moduleType}')" class="action-btn" title="Submit for review"><i data-lucide="send" style="width:12px; height:12px;"></i> Review</button>`;
        }
    }
    else if (currentStatus === 'In Review') {
        if (role === 'Reviewer' || role === 'Admin') {
            buttons += `<button onclick="updateWorkflowStatus('${itemId}', 'Approved', '${moduleType}')" class="action-btn" style="color:#1E40AF; border-color:#DBEAFE;" title="Approve"><i data-lucide="check" style="width:12px; height:12px;"></i> Approve</button>`;
            buttons += `<button onclick="updateWorkflowStatus('${itemId}', 'Draft', '${moduleType}')" class="action-btn" style="color:#991B1B; border-color:#FEE2E2;" title="Reject to Draft"><i data-lucide="x" style="width:12px; height:12px;"></i> Reject</button>`;
        }
    }
    else if (currentStatus === 'Approved') {
        if (role === 'Admin') {
            buttons += `<button onclick="updateWorkflowStatus('${itemId}', 'Published', '${moduleType}')" class="action-btn action-btn-primary" title="Publish live"><i data-lucide="globe" style="width:12px; height:12px;"></i> Publish</button>`;
        } else {
            buttons += `<span style="font-size:11px; color:var(--admin-text-secondary);">Approved</span>`;
        }
    }
    else if (currentStatus === 'Published') {
        if (role === 'Admin') {
            buttons += `<button onclick="updateWorkflowStatus('${itemId}', 'Archived', '${moduleType}')" class="action-btn" style="color:var(--admin-text-secondary);" title="Archive"><i data-lucide="archive" style="width:12px; height:12px;"></i> Archive</button>`;
        }
    }
    else if (currentStatus === 'Archived') {
        if (role === 'Admin') {
            buttons += `<button onclick="updateWorkflowStatus('${itemId}', 'Draft', '${moduleType}')" class="action-btn" title="Restore to Draft"><i data-lucide="rotate-ccw" style="width:12px; height:12px;"></i> Restore</button>`;
        }
    }

    return `<div class="action-btn-group">${buttons}</div>`;
}

async function updateWorkflowStatus(id, newStatus, moduleType) {
    try {
        if (moduleType === 'product') {
            const p = cacheProducts.find(x => x.id === id);
            p.status = newStatus;
            await saveProduct(p, currentSiteSlug);
            showToast(`Product status changed to ${newStatus}`);
            await loadProductsTable();
        } else if (moduleType === 'document') {
            const d = cacheDocuments.find(x => x.id === id);
            d.status = newStatus;
            await saveDocument(d, currentSiteSlug);
            showToast(`Document status changed to ${newStatus}`);
            await loadDocumentsTable();
        }
    } catch(err) {
        showToast(err.message, 'error');
    }
}

// ==========================================
// 2. PRODUCTS MODULE CRUD HANDLERS
// ==========================================

async function loadProductsTable() {
    const tbody = document.getElementById('admin-products-table-body');
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center;">Loading catalog...</td></tr>`;
    
    try {
        cacheProducts = await getProducts(currentSiteSlug);
        if (cacheProducts.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--admin-text-secondary);">No items configured in Supabase. Click Settings ➔ Seed Database.</td></tr>`;
            return;
        }

        tbody.innerHTML = cacheProducts.map(p => `
            <tr>
                <td>
                    <div class="admin-table-thumb">
                        <img src="${p.image_url || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=100&auto=format&fit=crop&q=80'}" alt="Thumb">
                    </div>
                </td>
                <td style="font-weight:600; color:var(--admin-sidebar);">${p.title}</td>
                <td>${p.category}</td>
                <td><span class="status-badge ${getStatusBadgeClass(p.status)}">${p.status}</span></td>
                <td style="font-size:12px; color:var(--admin-text-secondary);">${new Date(p.updated_at).toLocaleString()}</td>
                <td>
                    <div style="display:flex; flex-direction:column; gap:8px;">
                        ${getWorkflowButtons(p.id, p.status, 'product')}
                        <div class="action-btn-group" style="margin-top:2px;">
                            <button onclick="openProductModal('${p.id}')" class="action-btn" title="Edit"><i data-lucide="edit-3" style="width:12px; height:12px;"></i> Edit</button>
                            <button onclick="handleProductDelete('${p.id}')" class="action-btn action-btn-danger" title="Delete"><i data-lucide="trash-2" style="width:12px; height:12px;"></i></button>
                        </div>
                    </div>
                </td>
            </tr>
        `).join('');
        lucide.createIcons();
    } catch (e) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--color-archived);">${e.message}</td></tr>`;
    }
}

function openProductModal(id = null) {
    const modal = document.getElementById('product-modal');
    const form = document.getElementById('product-form');
    form.reset();
    
    document.getElementById('product-id').value = '';
    document.getElementById('product-modal-title').textContent = "Create New Entry";
    hideAdminUploadPreview('product-image');

    // Adjust categories selection by site
    const categorySelect = document.getElementById('product-category');
    if (currentSiteSlug === 'abcschool') {
        categorySelect.innerHTML = `
            <option value="Mathematics">Mathematics</option>
            <option value="Science & Technology">Science & Technology</option>
            <option value="Humanities">Humanities</option>
            <option value="Sports & Athletics">Sports & Athletics</option>
        `;
    } else if (currentSiteSlug === 'hospital') {
        categorySelect.innerHTML = `
            <option value="Cardiology Center">Cardiology Center</option>
            <option value="Pediatric Care">Pediatric Care</option>
            <option value="Neurology Specialty">Neurology Specialty</option>
            <option value="Oncology Care">Oncology Care</option>
        `;
    } else if (currentSiteSlug === 'agree') {
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
            <option value="Resilient Seated Valves">Resilient Seated Valves</option>
            <option value="Actuation & Controls">Actuation & Controls</option>
        `;
    }

    if (id) {
        document.getElementById('product-id').value = id;
        document.getElementById('product-modal-title').textContent = "Modify Entry";
        
        const p = cacheProducts.find(x => x.id === id);
        if (p) {
            document.getElementById('product-title').value = p.title;
            document.getElementById('product-category').value = p.category;
            document.getElementById('product-image').value = p.image_url || '';
            if (p.image_url) {
                showAdminUploadPreview('product-image', p.image_url, '', 'image');
            } else {
                hideAdminUploadPreview('product-image');
            }
            document.getElementById('product-desc').value = p.description || '';
            
            try {
                const feats = typeof p.features === 'string' ? JSON.parse(p.features) : p.features || [];
                document.getElementById('product-features').value = feats.join('\n');
            } catch(e) { document.getElementById('product-features').value = ''; }

            try {
                const specs = typeof p.specifications === 'string' ? JSON.parse(p.specifications) : p.specifications || {};
                document.getElementById('product-specs').value = JSON.stringify(specs, null, 2);
            } catch(e) { document.getElementById('product-specs').value = '{}'; }

            try {
                const inds = typeof p.industries === 'string' ? JSON.parse(p.industries) : p.industries || [];
                document.getElementById('product-industries').value = inds.join(', ');
            } catch(e) { document.getElementById('product-industries').value = ''; }
        }
    }

    modal.classList.add('active');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.remove('active');
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
        alert("Specifications is not valid JSON!");
        return;
    }

    const industries = document.getElementById('product-industries').value.split(',').map(x => x.trim()).filter(x => x !== '');
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const productObj = {
        title,
        category,
        image_url,
        description,
        features: JSON.stringify(features),
        specifications: JSON.stringify(specifications),
        industries: JSON.stringify(industries),
        slug
    };

    if (id) {
        productObj.id = id;
        const oldP = cacheProducts.find(x => x.id === id);
        if (oldP) productObj.status = oldP.status;
    } else {
        productObj.status = 'Draft';
    }

    try {
        await saveProduct(productObj, currentSiteSlug);
        showToast("Product saved successfully");
        closeProductModal();
        await loadProductsTable();
    } catch(err) {
        showToast(err.message, 'error');
    }
}

async function handleProductDelete(id) {
    if (confirm("Are you sure you want to delete this product?")) {
        try {
            await deleteProduct(id);
            showToast("Product deleted successfully");
            await loadProductsTable();
        } catch(err) {
            showToast(err.message, 'error');
        }
    }
}

// ==========================================
// 3. DOCUMENTS MODULE
// ==========================================

async function loadDocumentsTable() {
    const tbody = document.getElementById('admin-documents-table-body');
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center;">Loading documents...</td></tr>`;

    try {
        cacheDocuments = await getDocuments(currentSiteSlug);
        if (cacheDocuments.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--admin-text-secondary);">No documents configured. Click Settings ➔ Seed Database.</td></tr>`;
            return;
        }

        tbody.innerHTML = cacheDocuments.map(d => `
            <tr>
                <td>
                    <div class="admin-table-thumb" style="background:#FEE2E2; border-color:#FCA5A5;">
                        <i data-lucide="file-text" style="color:#EF4444; width:20px; height:20px;"></i>
                    </div>
                </td>
                <td style="font-weight:600; color:var(--admin-sidebar);">${d.title}</td>
                <td>${d.doc_type}</td>
                <td style="font-weight:700; color:var(--admin-accent-hover);">v${d.version}</td>
                <td><span class="status-badge ${getStatusBadgeClass(d.status)}">${d.status}</span></td>
                <td style="font-size:12px; color:var(--admin-text-secondary);">${new Date(d.updated_at).toLocaleString()}</td>
                <td>
                    <div style="display:flex; flex-direction:column; gap:8px;">
                        ${getWorkflowButtons(d.id, d.status, 'document')}
                        <div class="action-btn-group" style="margin-top:2px;">
                            <button onclick="openReplaceDocModal('${d.id}')" class="action-btn action-btn-primary" style="background-color:var(--admin-accent); color:var(--admin-primary); border:none;" title="Replace PDF file"><i data-lucide="refresh-cw" style="width:12px; height:12px;"></i> Replace</button>
                            <button onclick="openDocumentModal('${d.id}')" class="action-btn" title="Edit Metadata"><i data-lucide="edit-3" style="width:12px; height:12px;"></i> Edit</button>
                            <button onclick="handleDocumentDelete('${d.id}')" class="action-btn action-btn-danger" title="Delete"><i data-lucide="trash-2" style="width:12px; height:12px;"></i></button>
                        </div>
                    </div>
                </td>
            </tr>
        `).join('');
        lucide.createIcons();
    } catch(err) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--color-archived);">${err.message}</td></tr>`;
    }
}

function openDocumentModal(id = null) {
    const modal = document.getElementById('document-modal');
    const form = document.getElementById('document-form');
    form.reset();

    document.getElementById('document-id').value = '';
    document.getElementById('document-parent-id').value = '';
    document.getElementById('document-version-group').style.display = 'block';
    document.getElementById('document-modal-title').textContent = "Upload PDF Catalog";
    hideAdminUploadPreview('document-url');

    if (id) {
        document.getElementById('document-id').value = id;
        document.getElementById('document-modal-title').textContent = "Edit Document Metadata";
        document.getElementById('document-version-group').style.display = 'none';

        const d = cacheDocuments.find(x => x.id === id);
        if (d) {
            document.getElementById('document-title').value = d.title;
            document.getElementById('document-type').value = d.doc_type;
            document.getElementById('document-url').value = d.file_url;
            if (d.file_url) {
                showAdminUploadPreview('document-url', d.file_url, d.filename || d.file_url.split('/').pop(), 'pdf');
            } else {
                hideAdminUploadPreview('document-url');
            }
            if (d.parent_id) document.getElementById('document-parent-id').value = d.parent_id;
        }
    }

    modal.classList.add('active');
}

function closeDocumentModal() {
    document.getElementById('document-modal').classList.remove('active');
}

async function handleDocumentSubmit(e) {
    e.preventDefault();

    const id = document.getElementById('document-id').value;
    const parent_id = document.getElementById('document-parent-id').value;
    const title = document.getElementById('document-title').value;
    const doc_type = document.getElementById('document-type').value;
    const file_url = document.getElementById('document-url').value;
    const version = parseInt(document.getElementById('document-version').value) || 1;

    const docObj = { title, doc_type, file_url };

    if (id) {
        docObj.id = id;
        if (parent_id) docObj.parent_id = parent_id;
        const oldD = cacheDocuments.find(x => x.id === id);
        if (oldD) {
            docObj.version = oldD.version;
            docObj.status = oldD.status;
        }
    } else {
        docObj.version = version;
        docObj.status = 'Draft';
        docObj.original_filename = file_url.split('/').pop();
    }

    try {
        await saveDocument(docObj, currentSiteSlug);
        showToast("Document saved successfully");
        closeDocumentModal();
        await loadDocumentsTable();
    } catch(err) {
        showToast(err.message, 'error');
    }
}

async function handleDocumentDelete(id) {
    if (confirm("Are you sure you want to delete this document catalog?")) {
        try {
            const { error } = await supabaseClient.from('documents').delete().eq('id', id);
            if (error) throw new Error(error.message);
            showToast("Document deleted successfully");
            await loadDocumentsTable();
        } catch(err) {
            showToast(err.message, 'error');
        }
    }
}

function openReplaceDocModal(id) {
    const modal = document.getElementById('replace-doc-modal');
    const doc = cacheDocuments.find(x => x.id === id);
    if (!doc) return;

    document.getElementById('replace-doc-id').value = id;
    document.getElementById('replace-doc-current-name').textContent = `${doc.title} (v${doc.version})`;
    document.getElementById('replace-doc-next-version').textContent = `v${doc.version + 1}`;
    document.getElementById('replace-doc-url').value = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    hideAdminUploadPreview('replace-doc-url');

    modal.classList.add('active');
}

function closeReplaceDocModal() {
    document.getElementById('replace-doc-modal').classList.remove('active');
}

async function handleReplaceDocSubmit(e) {
    e.preventDefault();

    const oldId = document.getElementById('replace-doc-id').value;
    const fileUrl = document.getElementById('replace-doc-url').value;
    const filename = fileUrl.split('/').pop() || 'replaced_pdf.pdf';

    try {
        await replaceDocument(oldId, { file_url: fileUrl, filename }, currentSiteSlug);
        showToast("PDF replaced and version incremented (created as Draft)");
        closeReplaceDocModal();
        await loadDocumentsTable();
    } catch(err) {
        showToast(err.message, 'error');
    }
}

// ==========================================
// 4. MEDIA LIBRARY MODULE HANDLERS
// ==========================================

async function loadMediaLibrary() {
    const grid = document.getElementById('admin-media-grid');
    grid.innerHTML = `<p style="text-align: center; grid-column: span 5;">Loading media grid...</p>`;

    try {
        cacheMedia = await getMedia(currentSiteSlug);
        if (cacheMedia.length === 0) {
            grid.innerHTML = `<p style="text-align: center; grid-column: span 5; color: var(--admin-text-secondary);">No media assets registered in workspace.</p>`;
            return;
        }

        grid.innerHTML = cacheMedia.map(m => {
            const isImage = m.file_type.startsWith('image/');
            return `
                <div class="media-card">
                    <div class="media-card-preview">
                        ${isImage ? `<img src="${m.file_url}" alt="Img">` : `<i data-lucide="file-text" style="color:var(--admin-sidebar);"></i>`}
                    </div>
                    <div class="media-card-info">
                        <div class="media-card-name" title="${m.filename}">${m.filename}</div>
                        <div class="media-card-meta">
                            <span>${(m.size / 1024).toFixed(1)} KB</span>
                            <span>${isImage ? 'Image' : 'PDF'}</span>
                        </div>
                    </div>
                    <button class="media-card-delete-btn" onclick="handleMediaDelete('${m.id}')" title="Delete"><i data-lucide="trash-2"></i></button>
                </div>
            `;
        }).join('');
        lucide.createIcons();
    } catch(err) {
        grid.innerHTML = `<p style="text-align: center; grid-column: span 5; color: var(--color-archived);">${err.message}</p>`;
    }
}

function triggerMediaUpload() {
    document.getElementById('media-file-input').click();
}

async function handleMediaFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;

    showToast(`Uploading ${file.name}...`);
    try {
        await uploadMediaFile(file, currentSiteSlug);
        showToast("Media uploaded and logged successfully!");
        await loadMediaLibrary();
    } catch(err) {
        showToast(err.message, 'error');
    }
    e.target.value = '';
}

async function handleMediaDelete(id) {
    if (confirm("Delete this media asset from database history?")) {
        try {
            await deleteMedia(id);
            showToast("Media deleted successfully!");
            await loadMediaLibrary();
        } catch(err) {
            showToast(err.message, 'error');
        }
    }
}

// ==========================================
// 5. MARKETING RESOURCES CRUD HANDLERS
// ==========================================

async function loadMarketingTable() {
    const tbody = document.getElementById('admin-marketing-table-body');
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center;">Loading resources...</td></tr>`;

    try {
        cacheMarketing = await getMarketing(currentSiteSlug);
        if (cacheMarketing.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--admin-text-secondary);">No marketing assets configured.</td></tr>`;
            return;
        }

        tbody.innerHTML = cacheMarketing.map(m => `
            <tr>
                <td style="font-weight:600; color:var(--admin-sidebar);">${m.title}</td>
                <td><span class="status-badge status-approved">${m.resource_type}</span></td>
                <td><a href="${m.file_url}" target="_blank" style="color:var(--admin-accent-hover); font-size:12px; text-decoration:underline;">Link</a></td>
                <td style="font-size:13px; color:var(--admin-text-secondary); max-width:280px; text-overflow:ellipsis; overflow:hidden;">${m.description || ''}</td>
                <td>
                    <div class="action-btn-group">
                        <button onclick="openMarketingModal('${m.id}')" class="action-btn" title="Edit"><i data-lucide="edit-3" style="width:12px; height:12px;"></i> Edit</button>
                        <button onclick="handleMarketingDelete('${m.id}')" class="action-btn action-btn-danger" title="Delete"><i data-lucide="trash-2" style="width:12px; height:12px;"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
        lucide.createIcons();
    } catch(err) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--color-archived);">${err.message}</td></tr>`;
    }
}

function openMarketingModal(id = null) {
    const modal = document.getElementById('marketing-modal');
    const form = document.getElementById('marketing-form');
    form.reset();
    
    document.getElementById('marketing-id').value = '';
    document.getElementById('marketing-modal-title').textContent = "Create Marketing Resource";
    hideAdminUploadPreview('marketing-url');

    if (id) {
        document.getElementById('marketing-id').value = id;
        document.getElementById('marketing-modal-title').textContent = "Modify Resource";
        
        const m = cacheMarketing.find(x => x.id === id);
        if (m) {
            document.getElementById('marketing-title').value = m.title;
            document.getElementById('marketing-type').value = m.resource_type;
            document.getElementById('marketing-url').value = m.file_url;
            if (m.file_url) {
                showAdminUploadPreview('marketing-url', m.file_url, m.file_url.split('/').pop(), 'media');
            } else {
                hideAdminUploadPreview('marketing-url');
            }
            document.getElementById('marketing-desc').value = m.description || '';
        }
    }
    modal.classList.add('active');
}

function closeMarketingModal() {
    document.getElementById('marketing-modal').classList.remove('active');
}

async function handleMarketingSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('marketing-id').value;
    const title = document.getElementById('marketing-title').value;
    const resource_type = document.getElementById('marketing-type').value;
    const file_url = document.getElementById('marketing-url').value;
    const description = document.getElementById('marketing-desc').value;

    const mktObj = { title, resource_type, file_url, description };
    if (id) mktObj.id = id;

    try {
        await saveMarketing(mktObj, currentSiteSlug);
        showToast("Marketing resource saved successfully");
        closeMarketingModal();
        await loadMarketingTable();
    } catch(err) {
        showToast(err.message, 'error');
    }
}

async function handleMarketingDelete(id) {
    if (confirm("Delete this marketing resource?")) {
        try {
            await deleteMarketing(id);
            showToast("Marketing resource deleted");
            await loadMarketingTable();
        } catch(err) {
            showToast(err.message, 'error');
        }
    }
}

// ==========================================
// 6. GLOBAL PARTNERS CRUD HANDLERS
// ==========================================

async function loadPartnersTable() {
    const tbody = document.getElementById('admin-partners-table-body');
    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center;">Loading partners...</td></tr>`;

    try {
        cachePartners = await getPartners(currentSiteSlug);
        if (cachePartners.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--admin-text-secondary);">No partners registered.</td></tr>`;
            return;
        }

        tbody.innerHTML = cachePartners.map(p => `
            <tr>
                <td style="font-weight:600; color:var(--admin-sidebar);">${p.name}</td>
                <td>${p.country}</td>
                <td><a href="${p.website_link || '#'}" target="_blank" style="color:var(--admin-accent-hover); font-size:12px;">Link <i data-lucide="external-link" style="width:10px; height:10px;"></i></a></td>
                <td>
                    <div class="action-btn-group">
                        <button onclick="openPartnerModal('${p.id}')" class="action-btn" title="Edit"><i data-lucide="edit-3" style="width:12px; height:12px;"></i> Edit</button>
                        <button onclick="handlePartnerDelete('${p.id}')" class="action-btn action-btn-danger" title="Delete"><i data-lucide="trash-2" style="width:12px; height:12px;"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
        lucide.createIcons();
    } catch(err) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--color-archived);">${err.message}</td></tr>`;
    }
}

function openPartnerModal(id = null) {
    const modal = document.getElementById('partner-modal');
    const form = document.getElementById('partner-form');
    form.reset();

    document.getElementById('partner-id').value = '';
    document.getElementById('partner-modal-title').textContent = "Add Partner / Affiliation";

    if (id) {
        document.getElementById('partner-id').value = id;
        document.getElementById('partner-modal-title').textContent = "Modify Partner Details";

        const p = cachePartners.find(x => x.id === id);
        if (p) {
            document.getElementById('partner-name').value = p.name;
            document.getElementById('partner-country').value = p.country;
            document.getElementById('partner-link').value = p.website_link || '';
        }
    }
    modal.classList.add('active');
}

function closePartnerModal() {
    document.getElementById('partner-modal').classList.remove('active');
}

async function handlePartnerSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('partner-id').value;
    const name = document.getElementById('partner-name').value;
    const country = document.getElementById('partner-country').value;
    const website_link = document.getElementById('partner-link').value;

    const partnerObj = { name, country, website_link };
    if (id) partnerObj.id = id;

    try {
        await savePartner(partnerObj, currentSiteSlug);
        showToast("Partner distributor saved successfully");
        closePartnerModal();
        await loadPartnersTable();
    } catch(err) {
        showToast(err.message, 'error');
    }
}

async function handlePartnerDelete(id) {
    if (confirm("Delete partner connection?")) {
        try {
            await deletePartner(id);
            showToast("Partner deleted");
            await loadPartnersTable();
        } catch(err) {
            showToast(err.message, 'error');
        }
    }
}

// ==========================================
// 7. SETTINGS HANDLERS
// ==========================================

async function loadSettingsForm() {
    try {
        const settings = await getSettings(currentSiteSlug);
        
        // Settings form values sync
        document.getElementById('settings-company').value = settings ? settings.companyName || '' : '';
        document.getElementById('settings-logo').value = settings ? settings.logoText || '' : '';
        document.getElementById('settings-tagline').value = settings ? settings.tagline || '' : '';
        document.getElementById('settings-address').value = settings ? settings.address || '' : '';
        document.getElementById('settings-phone').value = settings ? settings.phone || '' : '';
        document.getElementById('settings-email').value = settings ? settings.email || '' : '';
        document.getElementById('settings-fb').value = settings ? settings.facebook || '' : '';
        document.getElementById('settings-li').value = settings ? settings.linkedin || '' : '';
    } catch(err) {
        console.warn("Failed fetching settings form content", err);
    }
}

async function handleSettingsSave(e) {
    e.preventDefault();
    
    // Check permission - Only Admin role can save settings
    if (currentUser.role !== 'Admin') {
        alert("Workflow restriction: Only the Admin role can save Global Settings configuration.");
        return;
    }

    // Preserve existing theme colors from initial seeds if present
    let primary = "#0B2C5D";
    let secondary = "#0E5CAD";
    let accent = "#19B5FE";

    if (currentSiteSlug === 'abcschool') {
        primary = "#1B4332"; secondary = "#2D6A4F"; accent = "#D4AF37";
    } else if (currentSiteSlug === 'hospital') {
        primary = "#0D9488"; secondary = "#0F766E"; accent = "#38BDF8";
    } else if (currentSiteSlug === 'agree') {
        primary = "#15803d"; secondary = "#166534"; accent = "#f59e0b";
    }

    const settingsObj = {
        companyName: document.getElementById('settings-company').value,
        logoText: document.getElementById('settings-logo').value,
        tagline: document.getElementById('settings-tagline').value,
        address: document.getElementById('settings-address').value,
        phone: document.getElementById('settings-phone').value,
        email: document.getElementById('settings-email').value,
        facebook: document.getElementById('settings-fb').value,
        linkedin: document.getElementById('settings-li').value,
        primaryColor: primary,
        secondaryColor: secondary,
        accentColor: accent
    };

    try {
        await saveSettings(settingsObj, currentSiteSlug);
        showToast("Settings configuration saved successfully. Public page sync updated.");
        await loadSettingsForm();
    } catch(err) {
        showToast(err.message, 'error');
    }
}

// Seed live database action button
async function triggerSeeding() {
    if (currentUser.role !== 'Admin') {
        alert("Workflow restriction: Only the Admin role can seed database tables.");
        return;
    }

    if (confirm("Confirm database seeding? This will populate Supabase tables with initial high-fidelity valve catalogs, school programs, and clinical specialties.")) {
        showToast("Seeding Supabase tables...");
        const result = await seedDatabaseIfEmpty();
        if (result.success) {
            showToast(result.message);
            await refreshSectionData('dashboard');
        } else {
            showToast(`Error seeding: ${result.message}`, 'error');
        }
    }
}

// Setup direct file uploads for Admin Dashboard
function setupAdminUploads() {
    // 1. Product Modal Image Upload
    setupSingleAdminUpload('product-image-file', 'product-image', 'image');

    // 2. Document Modal PDF Upload
    setupSingleAdminUpload('document-url-file', 'document-url', 'pdf');

    // 3. Marketing Modal Resource Upload
    setupSingleAdminUpload('marketing-url-file', 'marketing-url', 'media');

    // 4. Replace Document PDF Upload
    setupSingleAdminUpload('replace-doc-url-file', 'replace-doc-url', 'pdf');
}

function setupSingleAdminUpload(fileInputId, textInputId, type) {
    const fileInput = document.getElementById(fileInputId);
    const textInput = document.getElementById(textInputId);

    if (fileInput && textInput) {
        fileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                // Find next button to show progress
                const uploadBtn = fileInput.nextElementSibling;
                const originalText = uploadBtn ? uploadBtn.innerHTML : '';
                if (uploadBtn) {
                    uploadBtn.disabled = true;
                    uploadBtn.innerHTML = `<i data-lucide="loader-2" class="spin" style="width:14px; height:14px;"></i> Uploading...`;
                    if (window.lucide) lucide.createIcons();
                }

                const record = await uploadMediaFile(file, currentSiteSlug);
                textInput.value = record.file_url;

                // Show preview
                showAdminUploadPreview(textInputId, record.file_url, file.name, type);

                if (uploadBtn) {
                    uploadBtn.disabled = false;
                    uploadBtn.innerHTML = originalText;
                    if (window.lucide) lucide.createIcons();
                }
            } catch (err) {
                showToast("Upload failed: " + err.message, "error");
            }
        });

        // Also update preview if text is pasted/edited
        textInput.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            if (val) {
                showAdminUploadPreview(textInputId, val, "Linked Resource", type);
            } else {
                hideAdminUploadPreview(textInputId);
            }
        });
    }
}

function showAdminUploadPreview(textInputId, url, filename, type) {
    const container = document.getElementById(`${textInputId}-preview-container`);
    if (!container) return;

    if (type === 'image') {
        const previewImg = document.getElementById(`${textInputId}-preview`);
        if (previewImg) previewImg.src = url;
    } else {
        const nameSpan = document.getElementById(`${textInputId}-preview-name`);
        if (nameSpan) nameSpan.textContent = filename || "Uploaded File";
    }
    
    container.style.display = 'flex';
}

function hideAdminUploadPreview(textInputId) {
    const container = document.getElementById(`${textInputId}-preview-container`);
    if (container) {
        container.style.display = 'none';
    }
    const previewImg = document.getElementById(`${textInputId}-preview`);
    if (previewImg) previewImg.src = '';
}

window.clearAdminUpload = function(textInputId) {
    const fileInput = document.getElementById(`${textInputId}-file`);
    const textInput = document.getElementById(textInputId);
    if (fileInput) fileInput.value = '';
    if (textInput) textInput.value = '';
    hideAdminUploadPreview(textInputId);
};

// ==========================================
// 3D MULTI-TENANT CMS GRAPH ANIMATION
// ==========================================
function initLoginCanvasBackground() {
    const canvas = document.getElementById('login-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    function hexToRgba(hex, alpha) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
        return result 
            ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`
            : `rgba(34, 211, 238, ${alpha})`;
    }

    function drawRoundRect(ctx, x, y, width, height, radius, fill, stroke) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        if (fill) ctx.fill();
        if (stroke) ctx.stroke();
    }

    window.addEventListener('resize', () => {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    });

    // Mouse positions for parallax and hover tracking
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetX = width / 2;
    let targetY = height / 2;
    let mouseCanvasX = -1000;
    let mouseCanvasY = -1000;

    // Drag-and-drop state
    let draggedNode = null;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        const rect = canvas.getBoundingClientRect();
        mouseCanvasX = e.clientX - rect.left;
        mouseCanvasY = e.clientY - rect.top;

        if (draggedNode && draggedNode.isDragging) {
            let targetDragX = mouseCanvasX - dragOffsetX;
            let targetDragY = mouseCanvasY - dragOffsetY;
            draggedNode.currentX = Math.max(45, Math.min(width - 45, targetDragX));
            draggedNode.currentY = Math.max(45, Math.min(height - 45, targetDragY));
        }
    });

    window.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return; // Only left clicks
        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        childNodes.forEach((node) => {
            const dx = clickX - node.currentX;
            const dy = clickY - node.currentY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 26) {
                draggedNode = node;
                node.isDragging = true;
                node.isSnapping = false;
                dragOffsetX = clickX - node.currentX;
                dragOffsetY = clickY - node.currentY;
            }
        });
    });

    window.addEventListener('dblclick', (e) => {
        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        childNodes.forEach((node) => {
            const dx = clickX - node.currentX;
            const dy = clickY - node.currentY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 26) {
                let htmlFile = 'maxseal.html';
                if (node.slug === 'abcschool') {
                    htmlFile = 'school.html';
                } else if (node.slug === 'hospital') {
                    htmlFile = 'hospital.html';
                } else if (node.slug === 'agree') {
                    htmlFile = 'agree.html';
                }
                window.open(htmlFile, '_blank');
            }
        });
    });

    window.addEventListener('mouseup', () => {
        if (draggedNode) {
            draggedNode.isDragging = false;
            draggedNode.isSnapping = true;
            draggedNode = null;
        }
    });

    window.addEventListener('blur', () => {
        if (draggedNode) {
            draggedNode.isDragging = false;
            draggedNode.isSnapping = true;
            draggedNode = null;
        }
    });

    // 3D Cube (CMS Core Hub) vertices in 3D space
    const vertices = [
        {x: -1, y: -1, z: -1},
        {x: 1, y: -1, z: -1},
        {x: 1, y: 1, z: -1},
        {x: -1, y: 1, z: -1},
        {x: -1, y: -1, z: 1},
        {x: 1, y: -1, z: 1},
        {x: 1, y: 1, z: 1},
        {x: -1, y: 1, z: 1}
    ];

    const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0], // Bottom face
        [4, 5], [5, 6], [6, 7], [7, 4], // Top face
        [0, 4], [1, 5], [2, 6], [3, 7]  // Verticals
    ];

    // Projection function
    function project(v, scale, cx, cy, rx, ry, rz) {
        // Rotate X
        let y1 = v.y * Math.cos(rx) - v.z * Math.sin(rx);
        let z1 = v.y * Math.sin(rx) + v.z * Math.cos(rx);
        // Rotate Y
        let x2 = v.x * Math.cos(ry) + z1 * Math.sin(ry);
        let z2 = -v.x * Math.sin(ry) + z1 * Math.cos(ry);
        // Rotate Z
        let x3 = x2 * Math.cos(rz) - y1 * Math.sin(rz);
        let y3 = x2 * Math.sin(rz) + y1 * Math.cos(rz);

        // Perspective
        const dist = 2.5;
        const pers = dist / (dist - z2);

        return {
            x: cx + x3 * scale * pers,
            y: cy + y3 * scale * pers,
            z: z2
        };
    }

    // Client/Tenant Nodes data
    const childNodes = [
        {
            name: "MAX-SEAL",
            slug: "maxseal",
            angleOffset: -Math.PI / 4, // Top-Left
            color: "#22D3EE",
            accent: "#0EA5E9",
            badge: "Manufacturing",
            pulse: 0,
            hoverAlpha: 0,
            x: 0, y: 0,
            currentX: 0, currentY: 0,
            isDragging: false,
            isSnapping: false,
            drawIcon: (cx, cy) => {
                // Draw Gear shape
                ctx.beginPath();
                ctx.arc(cx, cy, 6, 0, Math.PI * 2);
                ctx.stroke();
                ctx.save();
                ctx.translate(cx, cy);
                ctx.lineWidth = 2;
                for (let i = 0; i < 8; i++) {
                    ctx.rotate(Math.PI / 4);
                    ctx.beginPath();
                    ctx.moveTo(0, -6);
                    ctx.lineTo(0, -10);
                    ctx.stroke();
                }
                ctx.restore();
            }
        },
        {
            name: "ABC SCHOOL",
            slug: "abcschool",
            angleOffset: Math.PI / 4, // Top-Right
            color: "#F59E0B",
            accent: "#D4AF37",
            badge: "Education",
            pulse: 0,
            hoverAlpha: 0,
            x: 0, y: 0,
            currentX: 0, currentY: 0,
            isDragging: false,
            isSnapping: false,
            drawIcon: (cx, cy) => {
                // Draw star-like education spark
                ctx.beginPath();
                ctx.moveTo(cx - 10, cy);
                ctx.lineTo(cx, cy - 10);
                ctx.lineTo(cx + 10, cy);
                ctx.lineTo(cx, cy + 10);
                ctx.closePath();
                ctx.stroke();
            }
        },
        {
            name: "CITY HOPE HOSPITAL",
            slug: "hospital",
            angleOffset: Math.PI / 2, // Bottom center
            color: "#EF4444",
            accent: "#0D9488",
            badge: "Healthcare",
            pulse: 0,
            hoverAlpha: 0,
            x: 0, y: 0,
            currentX: 0, currentY: 0,
            isDragging: false,
            isSnapping: false,
            drawIcon: (cx, cy) => {
                // Draw Medical Cross
                ctx.beginPath();
                ctx.moveTo(cx - 8, cy); ctx.lineTo(cx + 8, cy);
                ctx.moveTo(cx, cy - 8); ctx.lineTo(cx, cy + 8);
                ctx.stroke();
            }
        },
        {
            name: "AGREE FARMS",
            slug: "agree",
            angleOffset: Math.PI * 0.75, // Bottom-Right
            color: "#22C55E",
            accent: "#f59e0b",
            badge: "Agriculture",
            pulse: 0,
            hoverAlpha: 0,
            x: 0, y: 0,
            currentX: 0, currentY: 0,
            isDragging: false,
            isSnapping: false,
            drawIcon: (cx, cy) => {
                // Draw leaf/plant shape
                ctx.beginPath();
                ctx.moveTo(cx, cy + 8);
                ctx.quadraticCurveTo(cx - 8, cy, cx, cy - 8);
                ctx.quadraticCurveTo(cx + 8, cy, cx, cy - 8);
                ctx.closePath();
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(cx, cy + 8);
                ctx.lineTo(cx, cy - 8);
                ctx.stroke();
            }
        }
    ];

    // Data Flow Packets running along paths
    const dataPackets = [];
    for (let i = 0; i < 4; i++) {
        dataPackets.push({
            nodeIndex: i,
            progress: Math.random(),
            speed: 0.003 + Math.random() * 0.003,
            size: 2 + Math.random() * 2
        });
        dataPackets.push({
            nodeIndex: i,
            progress: Math.random(),
            speed: 0.004 + Math.random() * 0.004,
            size: 2 + Math.random() * 2
        });
    }

    // Generic floating dust particles
    class Dust {
        constructor() {
            this.reset();
            this.y = Math.random() * height;
        }
        reset() {
            this.x = Math.random() * width;
            this.y = height + 10;
            this.vx = (Math.random() - 0.5) * 0.15;
            this.vy = 0.15 + Math.random() * 0.35;
            this.r = 0.4 + Math.random() * 1.2;
            this.alpha = 0.15 + Math.random() * 0.35;
        }
        update() {
            this.y -= this.vy;
            this.x += this.vx;
            if (this.y < 0) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(34, 211, 238, ${this.alpha})`;
            ctx.fill();
        }
    }
    const dustParticles = Array.from({ length: 45 }, () => new Dust());

    // 3D rotation angles
    let rx = 0;
    let ry = 0;
    let rz = 0;

    function animate(time) {
        ctx.clearRect(0, 0, width, height);

        // Draw background drag glow if dragging
        if (draggedNode && draggedNode.isDragging) {
            ctx.save();
            const glowGradient = ctx.createRadialGradient(
                draggedNode.currentX, draggedNode.currentY, 0,
                draggedNode.currentX, draggedNode.currentY, Math.max(width, height) * 0.65
            );
            const glowColor = draggedNode.color;
            glowGradient.addColorStop(0, hexToRgba(glowColor, 0.22));
            glowGradient.addColorStop(0.35, hexToRgba(glowColor, 0.06));
            glowGradient.addColorStop(1, 'rgba(2, 8, 23, 0)');

            ctx.fillStyle = glowGradient;
            ctx.fillRect(0, 0, width, height);
            ctx.restore();
        }

        // Smooth mouse parallax
        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;
        const pX = (mouseX - width / 2) * 0.025;
        const pY = (mouseY - height / 2) * 0.025;

        const cx = width / 2 + pX;
        const cy = height / 2 + pY;

        rx += 0.005;
        ry += 0.007;
        rz += 0.003;

        // Position of child nodes relative to central CMS Core
        const isMobile = width < 768;
        const nodeDistance = isMobile ? 80 : Math.min(width * 0.32, 340);

        childNodes.forEach((node, idx) => {
            let targetNodeX = cx;
            let targetNodeY = cy;

            if (isMobile) {
                if (node.slug === 'maxseal') {
                    targetNodeX = cx - 90;
                    targetNodeY = cy - 300;
                } else if (node.slug === 'abcschool') {
                    targetNodeX = cx + 90;
                    targetNodeY = cy - 300;
                } else if (node.slug === 'hospital') {
                    targetNodeX = cx - 90;
                    targetNodeY = cy + 300;
                } else if (node.slug === 'agree') {
                    targetNodeX = cx + 90;
                    targetNodeY = cy + 300;
                }
            } else {
                if (node.slug === 'maxseal') {
                    targetNodeX = cx - nodeDistance;
                    targetNodeY = cy - 110;
                } else if (node.slug === 'abcschool') {
                    targetNodeX = cx + nodeDistance;
                    targetNodeY = cy - 110;
                } else if (node.slug === 'hospital') {
                    targetNodeX = cx - nodeDistance;
                    targetNodeY = cy + 110;
                } else if (node.slug === 'agree') {
                    targetNodeX = cx + nodeDistance;
                    targetNodeY = cy + 110;
                }
            }

            // Clamp coordinates to keep nodes inside canvas padding
            node.x = Math.max(45, Math.min(width - 45, targetNodeX));
            node.y = Math.max(45, Math.min(height - 45, targetNodeY));

            // Initialize rendering coordinates on first frame
            if (!node.currentX || isNaN(node.currentX)) {
                node.currentX = node.x;
                node.currentY = node.y;
            }

            // Coordinate state machine
            if (node.isDragging) {
                node.currentX = Math.max(45, Math.min(width - 45, node.currentX));
                node.currentY = Math.max(45, Math.min(height - 45, node.currentY));
            } else if (node.isSnapping) {
                // Spring lerp back
                const dx = node.x - node.currentX;
                const dy = node.y - node.currentY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 0.5) {
                    node.currentX = node.x;
                    node.currentY = node.y;
                    node.isSnapping = false;
                } else {
                    node.currentX += dx * 0.15;
                    node.currentY += dy * 0.15;
                }
            } else {
                node.currentX = node.x;
                node.currentY = node.y;
            }
        });

        // Detect hovered node
        let hoveredNode = null;
        childNodes.forEach((node) => {
            const dx = mouseCanvasX - node.currentX;
            const dy = mouseCanvasY - node.currentY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            // Circle check (active radius is 26px)
            if (dist < 26) {
                hoveredNode = node;
            }
        });

        // Set cursor pointer/default on body/canvas
        if (hoveredNode) {
            document.body.style.cursor = 'pointer';
        } else {
            document.body.style.cursor = 'default';
        }

        childNodes.forEach((node, idx) => {
            // Update hover Alpha
            const isCurrentlyHovered = (hoveredNode === node);
            if (isCurrentlyHovered) {
                node.hoverAlpha = Math.min(1, node.hoverAlpha + 0.15);
            } else {
                node.hoverAlpha = Math.max(0, node.hoverAlpha - 0.15);
            }

            // Draw connecting path (Blueprint pipeline)
            ctx.strokeStyle = 'rgba(14, 165, 233, 0.06)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(node.currentX, node.currentY);
            ctx.stroke();

            // Pipeline indicator dashes
            ctx.save();
            ctx.setLineDash([4, 6]);
            ctx.strokeStyle = 'rgba(34, 211, 238, 0.08)';
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(node.currentX, node.currentY);
            ctx.stroke();
            ctx.restore();

            // Node rings and pulses
            if (node.pulse > 0) node.pulse -= 0.04;

            ctx.lineWidth = 1;
            ctx.strokeStyle = `rgba(14, 165, 233, ${0.1 + node.pulse * 0.2})`;
            ctx.beginPath();
            ctx.arc(node.currentX, node.currentY, 36 + node.pulse * 10, 0, Math.PI * 2);
            ctx.stroke();

            // Draw hover extra outer glow ring
            if (node.hoverAlpha > 0) {
                ctx.strokeStyle = `rgba(34, 211, 238, ${node.hoverAlpha * 0.3})`;
                ctx.beginPath();
                ctx.arc(node.currentX, node.currentY, 45, 0, Math.PI * 2);
                ctx.stroke();
            }

            ctx.save();
            ctx.setLineDash([3, 5]);
            ctx.strokeStyle = node.color + '40';
            ctx.beginPath();
            ctx.arc(node.currentX, node.currentY, 28, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();

            ctx.fillStyle = '#020817';
            ctx.beginPath();
            ctx.arc(node.currentX, node.currentY, 22, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = node.color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(node.currentX, node.currentY, 22, 0, Math.PI * 2);
            ctx.stroke();

            // Inner Icon
            ctx.strokeStyle = node.color;
            ctx.lineWidth = 1.5;
            node.drawIcon(node.currentX, node.currentY);

            // Labels
            ctx.font = 'bold 10px monospace';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText(node.name, node.currentX, node.currentY - 42);

            ctx.font = '8px monospace';
            ctx.fillStyle = node.accent;
            ctx.fillText(`[ ${node.badge} ]`, node.currentX, node.currentY - 30);
            ctx.fillText('STATUS: ONLINE', node.currentX, node.currentY + 36);
        });

        // Draw Flow Packets
        dataPackets.forEach(pkt => {
            pkt.progress += pkt.speed;
            if (pkt.progress >= 1) {
                pkt.progress = 0;
                childNodes[pkt.nodeIndex].pulse = 1.0;
            }

            const targetNode = childNodes[pkt.nodeIndex];
            const px = cx + (targetNode.currentX - cx) * pkt.progress;
            const py = cy + (targetNode.currentY - cy) * pkt.progress;

            ctx.beginPath();
            ctx.arc(px, py, pkt.size + 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(34, 211, 238, 0.15)`;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(px, py, pkt.size, 0, Math.PI * 2);
            ctx.fillStyle = targetNode.color;
            ctx.fill();
        });

        // Draw Perspective 3D Cube Core
        const coreScale = 75;
        const projected = vertices.map(v => project(v, coreScale, cx, cy, rx, ry, rz));

        ctx.fillStyle = 'rgba(11, 44, 93, 0.03)';
        ctx.beginPath();
        projected.forEach((p, idx) => {
            if (idx === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
        });
        ctx.fill();

        ctx.lineWidth = 1;
        edges.forEach(edge => {
            const p1 = projected[edge[0]];
            const p2 = projected[edge[1]];

            const avgZ = (p1.z + p2.z) / 2;
            const alpha = 0.1 + ((avgZ + 1) / 2) * 0.4;

            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
        });

        // pulsing core sphere
        const pulseCoreRadius = 24 + Math.sin(time / 250) * 4;
        ctx.beginPath();
        ctx.arc(cx, cy, pulseCoreRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(14, 165, 233, 0.04)';
        ctx.fill();

        ctx.strokeStyle = 'rgba(34, 211, 238, 0.3)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, pulseCoreRadius - 4, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = 'bold 9px monospace';
        ctx.fillStyle = '#22D3EE';
        ctx.textAlign = 'center';
        ctx.fillText('CMS', cx, cy - 2);
        ctx.font = '8px monospace';
        ctx.fillStyle = 'rgba(14, 165, 233, 0.7)';
        ctx.fillText('HUB_V3', cx, cy + 8);

        ctx.strokeStyle = 'rgba(14, 165, 233, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, 58, 0, Math.PI * 2);
        ctx.stroke();

        dustParticles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw HUD Tooltips on top of everything
        childNodes.forEach(node => {
            if (node.hoverAlpha > 0) {
                ctx.save();
                ctx.globalAlpha = node.hoverAlpha;

                // Tooltip box size
                const boxWidth = 200;
                const boxHeight = 105;
                
                // Determine layout direction (draw left or right of node)
                let boxX = node.currentX + 35;
                if (node.currentX < cx) { // Left side of center, draw to its left
                    boxX = node.currentX - boxWidth - 35;
                }
                
                let boxY = node.currentY - boxHeight / 2;
                boxY = Math.max(15, Math.min(height - boxHeight - 15, boxY));

                // Draw drop shadow blur for neon glow matching node color
                ctx.shadowColor = node.color;
                ctx.shadowBlur = 15;
                ctx.fillStyle = 'rgba(2, 8, 23, 0.9)';
                ctx.strokeStyle = node.color;
                ctx.lineWidth = 1.5;

                drawRoundRect(ctx, boxX, boxY, boxWidth, boxHeight, 8, true, true);
                
                ctx.shadowBlur = 0;

                ctx.fillStyle = node.color;
                ctx.fillRect(boxX + 12, boxY + 28, boxWidth - 24, 1);

                ctx.font = 'bold 11px monospace';
                ctx.fillStyle = '#FFFFFF';
                ctx.textAlign = 'left';
                ctx.fillText(node.name, boxX + 12, boxY + 20);

                ctx.font = '9px monospace';
                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                
                // Sector
                ctx.fillText(`SECTOR:`, boxX + 12, boxY + 45);
                ctx.fillStyle = '#FFFFFF';
                ctx.fillText(node.badge.toUpperCase(), boxX + 65, boxY + 45);
                
                // Domain
                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                ctx.fillText(`DOMAIN:`, boxX + 12, boxY + 60);
                ctx.fillStyle = '#FFFFFF';
                const domainStr = node.slug === 'maxseal' ? 'maxsealinc.com' : (node.slug === 'abcschool' ? 'abcschool.edu' : (node.slug === 'hospital' ? 'cityhope.org' : 'agreefarms.com'));
                ctx.fillText(domainStr, boxX + 65, boxY + 60);

                // Contact
                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                ctx.fillText(`CONTACT:`, boxX + 12, boxY + 75);
                ctx.fillStyle = '#FFFFFF';
                const phoneStr = node.slug === 'maxseal' ? '910-738-2866' : (node.slug === 'abcschool' ? '555-ABC-SCHL' : (node.slug === 'hospital' ? '800-HOPE-MED' : '800-555-FARM'));
                ctx.fillText(phoneStr, boxX + 65, boxY + 75);

                // Status tag (Online pill)
                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                ctx.fillText(`STATUS:`, boxX + 12, boxY + 90);
                
                ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
                drawRoundRect(ctx, boxX + 65, boxY + 81, 52, 12, 3, true, false);
                ctx.fillStyle = '#10B981';
                ctx.font = 'bold 8px monospace';
                ctx.fillText('ONLINE', boxX + 73, boxY + 90);

                ctx.restore();
            }
        });

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}
