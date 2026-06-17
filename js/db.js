// Supabase Database Adapter with LocalStorage Fallback for Offline/Unconfigured states
let useLocalFallback = false;
let supabaseClient = null;

if (typeof supabase !== 'undefined') {
    try {
        const { createClient } = supabase;
        supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } catch (err) {
        console.warn("Failed to initialize Supabase client. Running in LocalStorage fallback mode.", err);
        useLocalFallback = true;
    }
} else {
    console.warn("Supabase SDK CDN not found. Running in LocalStorage fallback mode.");
    useLocalFallback = true;
}

// Check database table existence, toggle fallback mode
async function checkTableExistence() {
    if (useLocalFallback) return false;
    try {
        const { error } = await supabaseClient.from('products').select('id').limit(1);
        if (error) {
            console.warn("Supabase database tables missing. Enabling LocalStorage fallback.", error.message);
            useLocalFallback = true;
            return false;
        }
        return true;
    } catch (e) {
        console.warn("Cannot connect to Supabase tables. Enabling LocalStorage fallback.", e);
        useLocalFallback = true;
        return false;
    }
}

// ==========================================
// LOCAL STORAGE BACKEND SHIM
// ==========================================
const LS_PREFIX = "innoryze_cms_";

function getLocal(key) {
    try {
        const val = localStorage.getItem(LS_PREFIX + key);
        return val ? JSON.parse(val) : null;
    } catch (e) {
        return null;
    }
}

function setLocal(key, data) {
    try {
        localStorage.setItem(LS_PREFIX + key, JSON.stringify(data));
    } catch (e) {
        console.error("Local storage save error:", e);
    }
}

// ==========================================
// PRODUCTS MODULE
// ==========================================

async function getProducts(siteSlug = 'maxseal') {
    if (useLocalFallback) {
        const list = getLocal('products') || [];
        return list.filter(p => p.site_slug === siteSlug).sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at));
    }

    const { data, error } = await supabaseClient
        .from('products')
        .select('*')
        .eq('site_slug', siteSlug)
        .order('updated_at', { ascending: false });
    
    if (error) {
        throw new Error("Error fetching products: " + error.message);
    }
    return data || [];
}

async function getProductBySlug(slug, siteSlug = 'maxseal') {
    if (useLocalFallback) {
        const list = getLocal('products') || [];
        return list.find(p => p.site_slug === siteSlug && p.slug === slug) || null;
    }

    const { data, error } = await supabaseClient
        .from('products')
        .select('*')
        .eq('site_slug', siteSlug)
        .eq('slug', slug)
        .maybeSingle();
    
    if (error) {
        throw new Error("Error fetching product details: " + error.message);
    }
    return data;
}

async function saveProduct(product, siteSlug = 'maxseal') {
    if (useLocalFallback) {
        const list = getLocal('products') || [];
        const productData = {
            ...product,
            site_slug: siteSlug,
            updated_at: new Date().toISOString()
        };

        if (productData.id) {
            const index = list.findIndex(p => p.id === productData.id);
            if (index !== -1) {
                list[index] = productData;
            } else {
                list.push(productData);
            }
        } else {
            productData.id = crypto.randomUUID ? crypto.randomUUID() : 'p_' + Math.random().toString(36).substring(2);
            list.push(productData);
        }
        setLocal('products', list);
        return productData;
    }

    const productData = {
        ...product,
        site_slug: siteSlug,
        updated_at: new Date().toISOString()
    };

    let result;
    if (productData.id) {
        result = await supabaseClient
            .from('products')
            .update(productData)
            .eq('id', productData.id)
            .select();
    } else {
        delete productData.id;
        result = await supabaseClient
            .from('products')
            .insert([productData])
            .select();
    }

    if (result.error) {
        throw new Error("Error saving product: " + result.error.message);
    }
    return result.data[0];
}

async function deleteProduct(productId) {
    if (useLocalFallback) {
        let list = getLocal('products') || [];
        list = list.filter(p => p.id !== productId);
        setLocal('products', list);
        return [{ id: productId }];
    }

    const { data, error } = await supabaseClient
        .from('products')
        .delete()
        .eq('id', productId)
        .select();
    
    if (error) {
        throw new Error("Error deleting product: " + error.message);
    }
    return data;
}

// ==========================================
// DOCUMENTS MODULE
// ==========================================

async function getDocuments(siteSlug = 'maxseal') {
    if (useLocalFallback) {
        const list = getLocal('documents') || [];
        return list.filter(d => d.site_slug === siteSlug).sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at));
    }

    const { data, error } = await supabaseClient
        .from('documents')
        .select('*')
        .eq('site_slug', siteSlug)
        .order('updated_at', { ascending: false });
    
    if (error) {
        throw new Error("Error fetching documents: " + error.message);
    }
    return data || [];
}

async function saveDocument(document, siteSlug = 'maxseal') {
    if (useLocalFallback) {
        const list = getLocal('documents') || [];
        const docData = {
            ...document,
            site_slug: siteSlug,
            updated_at: new Date().toISOString()
        };

        if (docData.id) {
            const index = list.findIndex(d => d.id === docData.id);
            if (index !== -1) {
                list[index] = docData;
            } else {
                list.push(docData);
            }
        } else {
            docData.id = crypto.randomUUID ? crypto.randomUUID() : 'd_' + Math.random().toString(36).substring(2);
            list.push(docData);
        }
        setLocal('documents', list);
        return docData;
    }

    const docData = {
        ...document,
        site_slug: siteSlug,
        updated_at: new Date().toISOString()
    };

    let result;
    if (docData.id) {
        result = await supabaseClient
            .from('documents')
            .update(docData)
            .eq('id', docData.id)
            .select();
    } else {
        delete docData.id;
        result = await supabaseClient
            .from('documents')
            .insert([docData])
            .select();
    }

    if (result.error) {
        throw new Error("Error saving document: " + result.error.message);
    }
    return result.data[0];
}

async function replaceDocument(oldDocId, newFileData, siteSlug = 'maxseal') {
    if (useLocalFallback) {
        const list = getLocal('documents') || [];
        const oldIndex = list.findIndex(d => d.id === oldDocId);
        if (oldIndex === -1) throw new Error("Could not find document to replace");

        // 1. Archive old document
        list[oldIndex].status = 'Archived';
        list[oldIndex].updated_at = new Date().toISOString();

        const oldDoc = list[oldIndex];

        // 2. Add new version row
        const newDoc = {
            id: crypto.randomUUID ? crypto.randomUUID() : 'd_' + Math.random().toString(36).substring(2),
            site_slug: siteSlug,
            title: oldDoc.title,
            doc_type: oldDoc.doc_type,
            version: oldDoc.version + 1,
            file_url: newFileData.file_url,
            status: 'Draft',
            updated_at: new Date().toISOString(),
            original_filename: newFileData.filename,
            parent_id: oldDocId
        };
        list.push(newDoc);
        setLocal('documents', list);
        return newDoc;
    }

    // 1. Fetch old document
    const { data: oldDoc, error: fetchErr } = await supabaseClient
        .from('documents')
        .select('*')
        .eq('id', oldDocId)
        .single();
    
    if (fetchErr) throw new Error("Could not find document to replace: " + fetchErr.message);

    // 2. Set the old document to 'Archived' status
    await supabaseClient
        .from('documents')
        .update({ status: 'Archived', updated_at: new Date().toISOString() })
        .eq('id', oldDocId);

    // 3. Create the new document
    const newDoc = {
        title: oldDoc.title,
        doc_type: oldDoc.doc_type,
        version: oldDoc.version + 1,
        file_url: newFileData.file_url,
        status: 'Draft',
        site_slug: siteSlug,
        original_filename: newFileData.filename,
        parent_id: oldDocId
    };

    const { data: inserted, error: insertErr } = await supabaseClient
        .from('documents')
        .insert([newDoc])
        .select();

    if (insertErr) throw new Error("Error creating new version of document: " + insertErr.message);
    return inserted[0];
}

// ==========================================
// MEDIA LIBRARY MODULE
// ==========================================

async function getMedia(siteSlug = 'maxseal') {
    if (useLocalFallback) {
        const list = getLocal('media') || [];
        return list.filter(m => m.site_slug === siteSlug).sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
    }

    const { data, error } = await supabaseClient
        .from('media')
        .select('*')
        .eq('site_slug', siteSlug)
        .order('created_at', { ascending: false });
    
    if (error) {
        throw new Error("Error fetching media: " + error.message);
    }
    return data || [];
}

async function uploadMediaFile(file, siteSlug = 'maxseal') {
    const cleanFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    let fileUrl = '';

    // Convert file to Base64 data URL to show a real preview locally
    const getBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    try {
        fileUrl = await getBase64(file);
    } catch (e) {
        console.error("Base64 conversion failed", e);
        fileUrl = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=60';
    }

    if (!useLocalFallback) {
        try {
            const { data, error } = await supabaseClient.storage
                .from('media')
                .upload(cleanFileName, file, { cacheControl: '3600', upsert: true });

            if (error) {
                console.warn("Storage upload failed, falling back to Base64 data URL.", error.message);
            } else {
                const { data: urlData } = supabaseClient.storage
                    .from('media')
                    .getPublicUrl(cleanFileName);
                fileUrl = urlData.publicUrl;
            }
        } catch (err) {
            console.warn("Storage error, using Base64.", err);
        }
    }

    const mediaRecord = {
        id: crypto.randomUUID ? crypto.randomUUID() : 'm_' + Math.random().toString(36).substring(2),
        site_slug: siteSlug,
        filename: file.name,
        file_url: fileUrl,
        file_type: file.type || 'application/pdf',
        size: file.size,
        created_at: new Date().toISOString()
    };

    if (useLocalFallback) {
        const list = getLocal('media') || [];
        list.push(mediaRecord);
        setLocal('media', list);
        return mediaRecord;
    }

    const { data, error } = await supabaseClient
        .from('media')
        .insert([mediaRecord])
        .select();

    if (error) {
        throw new Error("Error logging media record: " + error.message);
    }
    return data[0];
}

async function deleteMedia(mediaId) {
    if (useLocalFallback) {
        let list = getLocal('media') || [];
        list = list.filter(m => m.id !== mediaId);
        setLocal('media', list);
        return [{ id: mediaId }];
    }

    const { data, error } = await supabaseClient
        .from('media')
        .delete()
        .eq('id', mediaId)
        .select();
    
    if (error) {
        throw new Error("Error deleting media: " + error.message);
    }
    return data;
}

// ==========================================
// SETTINGS MODULE
// ==========================================

async function getSettings(siteSlug = 'maxseal') {
    if (useLocalFallback) {
        // Use site-specific key so each website has isolated storage
        return getLocal(`settings_${siteSlug}`) || null;
    }

    const { data, error } = await supabaseClient
        .from('settings')
        .select('*')
        .eq('site_slug', siteSlug)
        .maybeSingle();

    if (error) {
        throw new Error("Error fetching settings: " + error.message);
    }
    return data ? data.settings_data : null;
}

async function saveSettings(settingsData, siteSlug = 'maxseal') {
    if (useLocalFallback) {
        // Use site-specific key so each website has isolated storage
        setLocal(`settings_${siteSlug}`, settingsData);
        return settingsData;
    }

    const { data: existing } = await supabaseClient
        .from('settings')
        .select('id')
        .eq('site_slug', siteSlug)
        .maybeSingle();

    let result;
    if (existing) {
        result = await supabaseClient
            .from('settings')
            .update({ settings_data: settingsData, updated_at: new Date().toISOString() })
            .eq('site_slug', siteSlug)
            .select();
    } else {
        result = await supabaseClient
            .from('settings')
            .insert([{ site_slug: siteSlug, settings_data: settingsData }])
            .select();
    }

    if (result.error) {
        throw new Error("Error saving settings: " + result.error.message);
    }
    return result.data[0].settings_data;
}

// ==========================================
// MARKETING RESOURCES MODULE
// ==========================================

async function getMarketing(siteSlug = 'maxseal') {
    if (useLocalFallback) {
        const list = getLocal('marketing') || [];
        return list.filter(m => m.site_slug === siteSlug).sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at));
    }

    const { data, error } = await supabaseClient
        .from('marketing')
        .select('*')
        .eq('site_slug', siteSlug)
        .order('updated_at', { ascending: false });
    
    if (error) {
        throw new Error("Error fetching marketing resources: " + error.message);
    }
    return data || [];
}

async function saveMarketing(item, siteSlug = 'maxseal') {
    if (useLocalFallback) {
        const list = getLocal('marketing') || [];
        const itemData = {
            ...item,
            site_slug: siteSlug,
            updated_at: new Date().toISOString()
        };

        if (itemData.id) {
            const index = list.findIndex(m => m.id === itemData.id);
            if (index !== -1) {
                list[index] = itemData;
            } else {
                list.push(itemData);
            }
        } else {
            itemData.id = crypto.randomUUID ? crypto.randomUUID() : 'mkt_' + Math.random().toString(36).substring(2);
            list.push(itemData);
        }
        setLocal('marketing', list);
        return itemData;
    }

    const itemData = {
        ...item,
        site_slug: siteSlug,
        updated_at: new Date().toISOString()
    };

    let result;
    if (itemData.id) {
        result = await supabaseClient
            .from('marketing')
            .update(itemData)
            .eq('id', itemData.id)
            .select();
    } else {
        delete itemData.id;
        result = await supabaseClient
            .from('marketing')
            .insert([itemData])
            .select();
    }

    if (result.error) {
        throw new Error("Error saving marketing resource: " + result.error.message);
    }
    return result.data[0];
}

async function deleteMarketing(id) {
    if (useLocalFallback) {
        let list = getLocal('marketing') || [];
        list = list.filter(m => m.id !== id);
        setLocal('marketing', list);
        return [{ id }];
    }

    const { data, error } = await supabaseClient
        .from('marketing')
        .delete()
        .eq('id', id)
        .select();
    
    if (error) {
        throw new Error("Error deleting marketing resource: " + error.message);
    }
    return data;
}

// ==========================================
// GLOBAL PARTNERS MODULE
// ==========================================

async function getPartners(siteSlug = 'maxseal') {
    if (useLocalFallback) {
        const list = getLocal('partners') || [];
        return list.filter(p => p.site_slug === siteSlug).sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at));
    }

    const { data, error } = await supabaseClient
        .from('partners')
        .select('*')
        .eq('site_slug', siteSlug)
        .order('updated_at', { ascending: false });
    
    if (error) {
        throw new Error("Error fetching global partners: " + error.message);
    }
    return data || [];
}

async function savePartner(partner, siteSlug = 'maxseal') {
    if (useLocalFallback) {
        const list = getLocal('partners') || [];
        const partnerData = {
            ...partner,
            site_slug: siteSlug,
            updated_at: new Date().toISOString()
        };

        if (partnerData.id) {
            const index = list.findIndex(p => p.id === partnerData.id);
            if (index !== -1) {
                list[index] = partnerData;
            } else {
                list.push(partnerData);
            }
        } else {
            partnerData.id = crypto.randomUUID ? crypto.randomUUID() : 'pt_' + Math.random().toString(36).substring(2);
            list.push(partnerData);
        }
        setLocal('partners', list);
        return partnerData;
    }

    const partnerData = {
        ...partner,
        site_slug: siteSlug,
        updated_at: new Date().toISOString()
    };

    let result;
    if (partnerData.id) {
        result = await supabaseClient
            .from('partners')
            .update(partnerData)
            .eq('id', partnerData.id)
            .select();
    } else {
        delete partnerData.id;
        result = await supabaseClient
            .from('partners')
            .insert([partnerData])
            .select();
    }

    if (result.error) {
        throw new Error("Error saving global partner: " + result.error.message);
    }
    return result.data[0];
}

async function deletePartner(id) {
    if (useLocalFallback) {
        let list = getLocal('partners') || [];
        list = list.filter(p => p.id !== id);
        setLocal('partners', list);
        return [{ id }];
    }

    const { data, error } = await supabaseClient
        .from('partners')
        .delete()
        .eq('id', id)
        .select();
    
    if (error) {
        throw new Error("Error deleting partner: " + error.message);
    }
    return data;
}
