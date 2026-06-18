// dynalektric.js - Bridge for Dynalektric Tenant Data

window.CMS_DYNA_READY = false;
window.CMS_DYNA_DATA = {
    settings: null,
    capabilities: [],
    industries: [],
    casestudies: [],
    marketing: [],
    documents: [],
    partners: []
};

async function loadDynalektricCMSData() {
    try {
        const isDbReady = await checkTableExistence();
        if (!isDbReady) {
            console.warn("CMS Database is not ready or seeded.");
            return;
        }

        let [settings, products, docs, marketing, partners] = await Promise.all([
            getSettings('dynalektric'),
            getProducts('dynalektric'),
            getDocuments('dynalektric'),
            getMarketing('dynalektric'),
            getPartners('dynalektric')
        ]);

        if ((!products || products.length === 0) && typeof MULTI_SITE_DATA !== 'undefined' && MULTI_SITE_DATA['dynalektric']) {
            console.log("Database empty for Dynalektric. Falling back to internal data index...");
            const fb = MULTI_SITE_DATA['dynalektric'];
            settings = settings || fb.settings;
            products = fb.products;
            docs = fb.documents;
            marketing = fb.marketing;
            partners = fb.partners;
        }

        window.CMS_DYNA_DATA.settings = settings;
        window.CMS_DYNA_DATA.capabilities = products.filter(p => p.category === 'Capability');
        window.CMS_DYNA_DATA.industries = products.filter(p => p.category === 'Industry');
        window.CMS_DYNA_DATA.casestudies = products.filter(p => p.category === 'Case Study');
        window.CMS_DYNA_DATA.marketing = marketing;
        window.CMS_DYNA_DATA.documents = docs;
        window.CMS_DYNA_DATA.partners = partners;

        console.log("Dynalektric CMS Data Loaded:", window.CMS_DYNA_DATA);
    } catch (err) {
        console.error("Error loading Dynalektric CMS data:", err);
    } finally {
        window.CMS_DYNA_READY = true;
        window.dispatchEvent(new Event('cms-dyna-ready'));
    }
}

// Load data when DOM is ready
document.addEventListener('DOMContentLoaded', loadDynalektricCMSData);
