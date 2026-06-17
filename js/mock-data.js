// Seed mock data for multiple websites (maxseal, abcschool, hospital)

const MULTI_SITE_DATA = {
    // -------------------------------------------------------------
    // MAX-SEAL VALVES & CONTROLS (slug: maxseal)
    // -------------------------------------------------------------
    maxseal: {
        settings: {
            companyName: "MAX-SEAL Valves & Controls",
            logoText: "MAX-SEAL",
            tagline: "Butterfly Valves for All Applications",
            address: "4815 West 5th Street, Lumberton, N.C. 28358",
            phone: "910-738-2866",
            email: "sales@iv-controls.com",
            facebook: "https://facebook.com/maxsealinc",
            linkedin: "https://linkedin.com/company/max-seal-valves-and-controls",
            twitter: "https://twitter.com/maxsealinc",
            primaryColor: "#0B2C5D",
            secondaryColor: "#0E5CAD",
            accentColor: "#19B5FE",
            heroHeading: "Butterfly Valves for All Applications.",
            heroSubheading: "Max-Seal Butterfly Valves are leading the way for Butterfly Valve Designs and Reliability. One-stop shop for all Butterfly Valve and Automation requirements.",
            // Header-specific
            headerCtaText: "910-738-2866",
            headerCtaHref: "tel:9107382866",
            navLabels: ["Home", "About", "Products", "Ask The Experts", "Catalog", "Marketing", "Global Partners", "Pricelist"],
            // Footer-specific
            footerCompany: "Max-Seal Butterfly Valves & Controls",
            footerTagline: "A subdivision of Flotite. Leading the way for Butterfly Valve Designs and Reliability since 2004.",
            footerCopyright: "Maxseal Inc Valve & Control",
            footerAddress: "4815 West 5th Street, Lumberton, N.C. 28358",
            footerPhone: "910-738-2866",
            footerFax: "910-739-1733",
            footerEmail: "sales@iv-controls.com",
            footerLinks: ["Home", "Terms & Conditions", "Contact Us", "Pricelist"]
        },
        products: [
            {
                title: "Tri-Max Series Triple Offset Butterfly Valve",
                category: "Triple Offset Valves",
                status: "Published",
                image_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
                description: "The Tri-Max Series features a triple offset design that provides zero-leakage bi-directional shut-off. Perfect for high-pressure and extreme temperature services in refining, chemical processing, and power generation.",
                features: JSON.stringify([
                    "Triple eccentric design for friction-free opening and closing",
                    "Metal-to-metal seating ensures fire-safe operation",
                    "Zero leakage performance in compliance with API 598",
                    "Bi-directional shutoff under full rating differential pressure",
                    "Stellite 6 hardfaced seat for high wear resistance"
                ]),
                specifications: JSON.stringify({
                    "Size Range": '3" to 48" (80mm - 1200mm)',
                    "Pressure Rating": "Class 150, 300, and 600",
                    "Body Styles": "Wafer, Lug, Flanged",
                    "Temperature Range": "-320°F to 1000°F (-196°C to 538°C)",
                    "Seat Materials": "Stellite 6 / Duplex Stainless Steel laminated with Graphite"
                }),
                industries: JSON.stringify(["Oil & Gas", "Chemical Processing", "Refineries", "Power Generation", "Cryogenics"]),
                slug: "tri-max-series-triple-offset-butterfly-valve"
            },
            {
                title: "Chem-Flo Series PFA Lined Butterfly Valve",
                category: "PFA Lined Valves",
                status: "Published",
                image_url: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?w=800&auto=format&fit=crop&q=80",
                description: "The Chem-Flo series is designed specifically for highly corrosive and toxic media applications. The valve is fully lined with high-density PFA (minimum thickness 3mm) to prevent permeation and isolate the valve body from the process fluid.",
                features: JSON.stringify([
                    "Minimum 3mm virgin PFA lining fully bonded to body and disc",
                    "Live-loaded stem sealing prevents fugitive emissions",
                    "One-piece disc and stem design minimizes flow turbulence",
                    "PTFE-lined bearings eliminate shaft friction and side thrusts",
                    "ISO 5211 mounting pad for quick actuator installation"
                ]),
                specifications: JSON.stringify({
                    "Size Range": '2" to 24" (50mm - 600mm)',
                    "Pressure Rating": "150 PSI working pressure",
                    "Body Styles": "Wafer, Lug",
                    "Temperature Range": "-20°F to 350°F (-29°C to 176°C)",
                    "Lining Material": "Virgin PFA (Option for Conductive PFA)"
                }),
                industries: JSON.stringify(["Chemical Processing", "Pharmaceuticals", "Acid Pickling", "Pulp & Paper", "Mining"]),
                slug: "chem-flo-series-pfa-lined-butterfly-valve"
            },
            {
                title: "High Performance Double Offset Butterfly Valve",
                category: "High Performance Valves",
                status: "Published",
                image_url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&auto=format&fit=crop&q=80",
                description: "Engineered for high cycles, steam service, and general process utilities, the High Performance Series utilizes a double offset geometry to minimize seat wear and maximize cycle life.",
                features: JSON.stringify([
                    "Double offset eccentric configuration prevents seat wear",
                    "RTFE dynamic seats provide bubble-tight closure",
                    "Blowout-proof stem design ensures maximum operator safety",
                    "NACE MR0175 compliance for sour gas service",
                    "Adjustable stem packing under operational pressure"
                ]),
                specifications: JSON.stringify({
                    "Size Range": '2" to 36" (50mm - 900mm)',
                    "Pressure Rating": "Class 150 & Class 300",
                    "Body Styles": "Wafer, Lug, Double Flanged",
                    "Temperature Range": "-50°F to 500°F (-45°C to 260°C)",
                    "Seat Materials": "RTFE, Fire-safe, or Metal Seat"
                }),
                industries: JSON.stringify(["HVAC", "Water & Wastewater", "Pulp & Paper", "Steel Mills", "Steam Utilities"]),
                slug: "high-performance-double-offset-butterfly-valve"
            }
        ],
        documents: [
            {
                title: "MAX-SEAL General Butterfly Valve Catalog",
                doc_type: "Catalog",
                version: 1,
                file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                status: "Published",
                original_filename: "maxseal_butterfly_catalog.pdf"
            },
            {
                title: "Tri-Max Triple Offset Valves Technical Bulletin",
                doc_type: "Technical Bulletin",
                version: 1,
                file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                status: "Published",
                original_filename: "trimax_technical_bulletin.pdf"
            }
        ],
        marketing: [
            {
                title: "High Performance Valve Product Showcase",
                resource_type: "Video",
                file_url: "https://www.w3schools.com/html/mov_bbb.mp4",
                description: "Demonstration and structural overview of the High Performance Valve."
            }
        ],
        partners: [
            { name: "Global Valves & Actuators Ltd", country: "United Kingdom", website_link: "https://example.com" },
            { name: "EuroFlow Industrial Supply", country: "Germany", website_link: "https://example.com" }
        ],
        media: [
            { filename: "butterfly-hero.jpg", file_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80", file_type: "image/jpeg", size: 489201 },
            { filename: "dummy_pdf.pdf", file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", file_type: "application/pdf", size: 54103 }
        ]
    },

    // -------------------------------------------------------------
    // ABC INTERNATIONAL SCHOOL (slug: abcschool)
    // -------------------------------------------------------------
    abcschool: {
        settings: {
            companyName: "ABC International School",
            logoText: "ABC School",
            tagline: "Empowering Students for Global Academic Leadership",
            address: "742 Evergreen Terrace, Springfield, IL 62704",
            phone: "1-555-ABC-SCHL (222-7245)",
            email: "admissions@abcschool.edu",
            facebook: "https://facebook.com/abcschoolspringfield",
            linkedin: "https://linkedin.com/company/abc-international-school",
            twitter: "https://twitter.com/abcschools",
            primaryColor: "#1B4332",
            secondaryColor: "#2D6A4F",
            accentColor: "#D4AF37",
            heroHeading: "Empowering Students for Global Academic Leadership",
            heroSubheading: "World-class education in a nurturing, internationally accredited environment. Preparing students for top universities worldwide.",
            // Header-specific
            headerCtaText: "1-555-ABC-SCHL",
            headerCtaHref: "tel:15552227245",
            navLabels: ["Home", "About Us", "Courses", "Admissions", "Campus Life", "Contact"],
            // Footer-specific
            footerCompany: "ABC International School",
            footerTagline: "Empowering minds. Building futures. Inspiring global citizens since 2005.",
            footerCopyright: "ABC International School. All Rights Reserved.",
            footerAddress: "742 Evergreen Terrace, Springfield, IL 62704",
            footerPhone: "1-555-ABC-SCHL (222-7245)",
            footerFax: "1-555-222-7246",
            footerEmail: "admissions@abcschool.edu",
            footerLinks: ["Home", "Courses", "Admissions", "Contact Us"]
        },
        products: [
            {
                title: "Advanced Placement Calculus AB",
                category: "Mathematics",
                status: "Published",
                image_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
                description: "AP Calculus AB covers limits, derivatives, definite and indefinite integrals, and fundamental calculus theorems. Designed to prepare students for college-level engineering and science paths.",
                features: JSON.stringify([
                    "Prepares students for official AP Exams with college credits",
                    "Includes detailed interactive graphic calculus tools",
                    "Small classroom sizes limit peer congestion (max 15)",
                    "Guided tutorial hours twice per week with math chairs"
                ]),
                specifications: JSON.stringify({
                    "Grade Level": "11th and 12th Grades",
                    "Prerequisite": "Pre-Calculus (Minimum Grade B)",
                    "Course Length": "Full Academic Year (2 Semesters)",
                    "Credits Available": "1.0 High School / 4.0 College Credits equivalent"
                }),
                industries: JSON.stringify(["Academics", "College Prep", "STEM Fields"]),
                slug: "ap-calculus-ab-honours"
            },
            {
                title: "Organic Chemistry Honors",
                category: "Science & Technology",
                status: "Published",
                image_url: "https://images.unsplash.com/photo-1532187640685-44c894ed8baa?w=800&auto=format&fit=crop&q=80",
                description: "An in-depth study of carbon-based molecules: their properties, structural isomerism, reaction mechanisms, functional groups, and laboratory synthesis techniques. Prepares students for pre-med programs.",
                features: JSON.stringify([
                    "State-of-the-art wet lab experiments once per week",
                    "Focuses on modern molecular models and spectroscopy analysis",
                    "Collaborative peer projects investigating polymer syntheses"
                ]),
                specifications: JSON.stringify({
                    "Grade Level": "12th Grade",
                    "Prerequisite": "General Chemistry Honours",
                    "Course Length": "Full Academic Year",
                    "Lab Hours": "3.5 Hours per week"
                }),
                industries: JSON.stringify(["Science Track", "Pre-Medicine", "Lab Research"]),
                slug: "organic-chemistry-honors-science"
            }
        ],
        documents: [
            {
                title: "Student & Parent Handbook - 2026",
                doc_type: "Catalog",
                version: 1,
                file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                status: "Published",
                original_filename: "student_parent_handbook_2026.pdf"
            },
            {
                title: "Admissions Brochure & Tuition Schedule",
                doc_type: "Marketing Brochure",
                version: 1,
                file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                status: "Published",
                original_filename: "tuition_schedule_2026.pdf"
            }
        ],
        marketing: [
            {
                title: "ABC School Campus Virtual Tour",
                resource_type: "Video",
                file_url: "https://www.w3schools.com/html/mov_bbb.mp4",
                description: "Explore our modern science labs, Olympic swimming pool, dynamic art rooms, and boarding dormitories."
            }
        ],
        partners: [
            { name: "Cambridge Assessment International Education", country: "United Kingdom", website_link: "https://example.com" },
            { name: "International Baccalaureate Organisation", country: "Switzerland", website_link: "https://example.com" }
        ],
        media: [
            { filename: "school-campus.jpg", file_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80", file_type: "image/jpeg", size: 382901 }
        ]
    },

    // -------------------------------------------------------------
    // CITY HOPE GENERAL HOSPITAL (slug: hospital)
    // -------------------------------------------------------------
    hospital: {
        settings: {
            companyName: "City Hope General Hospital",
            logoText: "City Hope",
            tagline: "Compassionate Care, Advanced Medicine, Patient Safety First",
            address: "500 Healthcare Parkway, Boston, MA 02111",
            phone: "1-800-HOPE-MED (467-3633)",
            email: "appointments@cityhopehospital.org",
            facebook: "https://facebook.com/cityhopehospital",
            linkedin: "https://linkedin.com/company/city-hope-general-hospital",
            twitter: "https://twitter.com/cityhopehealth",
            primaryColor: "#0D9488",
            secondaryColor: "#0F766E",
            accentColor: "#38BDF8",
            heroHeading: "Compassionate Care, Advanced Medicine",
            heroSubheading: "State-of-the-art healthcare delivered with compassion. Our board-certified specialists are committed to your health, safety, and recovery.",
            // Header-specific
            headerCtaText: "1-800-HOPE-MED",
            headerCtaHref: "tel:18004673633",
            navLabels: ["Home", "About Us", "Specialties", "Appointments", "Research", "Contact"],
            // Footer-specific
            footerCompany: "City Hope General Hospital",
            footerTagline: "Committed to excellence in patient care, clinical research, and community health since 1989.",
            footerCopyright: "City Hope General Hospital. All Rights Reserved.",
            footerAddress: "500 Healthcare Parkway, Boston, MA 02111",
            footerPhone: "1-800-HOPE-MED (467-3633)",
            footerFax: "1-800-467-3699",
            footerEmail: "appointments@cityhopehospital.org",
            footerLinks: ["Home", "Specialties", "Appointments", "Contact Us"]
        },
        products: [
            {
                title: "Cardiovascular Health & Surgery Center",
                category: "Cardiology Center",
                status: "Published",
                image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
                description: "Provides full cardiac evaluations, coronary artery stenting, heart failure diagnostics, valve repairs, and post-operative cardiac rehabilitation clinics under certified heart specialists.",
                features: JSON.stringify([
                    "24/7 Dedicated cardiac catheterisation laboratory",
                    "Minimally invasive keyhole heart surgeries reduce recovery cycles",
                    "Outpatient support systems tracking vital rates remotely"
                ]),
                specifications: JSON.stringify({
                    "Chief of Department": "Dr. Sarah Lin, MD, FACC",
                    "Bed Count": "45 Intensive Care Beds",
                    "Operating Rooms": "4 Hybrid Surgical Theaters",
                    "Specialties": "Electrophysiology, Angioplasty, Valve Repairs"
                }),
                industries: JSON.stringify(["Critical Care", "Surgery", "Heart Diagnostics"]),
                slug: "cardiovascular-health-surgery-center"
            },
            {
                title: "Pediatric Care & Neonatology Department",
                category: "Pediatric Care",
                status: "Published",
                image_url: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&auto=format&fit=crop&q=80",
                description: "Comprehensive medical services from infants to adolescents. Our neonatology ward features Level III NICU units equipped with high-tech temperature and respiration sensors.",
                features: JSON.stringify([
                    "Level III Neonatal Intensive Care Unit (NICU)",
                    "Child-friendly examination rooms reduce clinical anxiety",
                    "Developmental pediatrics evaluation panel available"
                ]),
                specifications: JSON.stringify({
                    "Chief of Department": "Dr. Marcus Vance, MD, FAAP",
                    "NICU Beds": "22 Isolette incubators",
                    "Visitor Rules": "Parents welcome 24/7",
                    "Core Services": "Pediatric ICU, Asthma clinics, Developmental care"
                }),
                industries: JSON.stringify(["Child Healthcare", "NICU", "Neonatal Care"]),
                slug: "pediatric-care-neonatology-department"
            }
        ],
        documents: [
            {
                title: "Patient Rights & Intake Forms Booklet",
                doc_type: "Catalog",
                version: 1,
                file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                status: "Published",
                original_filename: "patient_intake_forms.pdf"
            },
            {
                title: "Cardiac Surgery Post-Op Guide",
                doc_type: "Technical Bulletin",
                version: 1,
                file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                status: "Published",
                original_filename: "cardiac_postop_guide.pdf"
            }
        ],
        marketing: [
            {
                title: "Cardiology Department Surgical Innovations",
                resource_type: "Video",
                file_url: "https://www.w3schools.com/html/mov_bbb.mp4",
                description: "Documentary detailing the implementation of new robotic surgical assists and heart valve diagnostics."
            }
        ],
        partners: [
            { name: "Harvard Medical School Affiliate", country: "United States", website_link: "https://example.com" },
            { name: "Joint Commission Hospital Accreditation", country: "United States", website_link: "https://example.com" }
        ],
        media: [
            { filename: "cardiology-theater.jpg", file_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80", file_type: "image/jpeg", size: 412091 }
        ]
    }
};

// Seeding function called in settings page
async function seedDatabaseIfEmpty() {
    console.log("Checking multi-tenant database status for seeding...");
    try {
        const isFallback = typeof useLocalFallback !== 'undefined' ? useLocalFallback : false;

        for (const [siteSlug, siteData] of Object.entries(MULTI_SITE_DATA)) {
            console.log(`Seeding data for tenant: ${siteSlug}...`);

            // 1. Seed settings
            const currentSettings = await getSettings(siteSlug);
            if (!currentSettings) {
                console.log(`- Seeding settings for ${siteSlug}...`);
                await saveSettings(siteData.settings, siteSlug);
            }

            // 2. Seed products
            const currentProducts = await getProducts(siteSlug);
            if (currentProducts.length === 0) {
                console.log(`- Seeding ${siteData.products.length} products for ${siteSlug}...`);
                for (const p of siteData.products) {
                    await saveProduct(p, siteSlug);
                }
            }

            // 3. Seed documents
            const currentDocs = await getDocuments(siteSlug);
            if (currentDocs.length === 0) {
                console.log(`- Seeding ${siteData.documents.length} documents for ${siteSlug}...`);
                for (const d of siteData.documents) {
                    await saveDocument(d, siteSlug);
                }
            }

            // 4. Seed marketing
            const currentMkt = await getMarketing(siteSlug);
            if (currentMkt.length === 0) {
                console.log(`- Seeding marketing for ${siteSlug}...`);
                for (const m of siteData.marketing) {
                    await saveMarketing(m, siteSlug);
                }
            }

            // 5. Seed partners
            const currentPartners = await getPartners(siteSlug);
            if (currentPartners.length === 0) {
                console.log(`- Seeding partners for ${siteSlug}...`);
                for (const pt of siteData.partners) {
                    await savePartner(pt, siteSlug);
                }
            }

            // 6. Seed media records
            const currentMedia = await getMedia(siteSlug);
            if (currentMedia.length === 0) {
                console.log(`- Seeding media library index for ${siteSlug}...`);
                for (const md of siteData.media) {
                    if (isFallback) {
                        const list = getLocal('media') || [];
                        const newMd = { ...md, id: 'm_' + Math.random().toString(36).substring(2), site_slug: siteSlug };
                        list.push(newMd);
                        setLocal('media', list);
                    } else {
                        const record = { ...md, site_slug: siteSlug };
                        delete record.id;
                        await supabaseClient.from('media').insert([record]);
                    }
                }
            }
        }

        console.log("Multi-tenant seeding completed successfully!");
        return { success: true, message: "Multi-tenant database tables seeded successfully!" };
    } catch (error) {
        console.error("Multi-tenant database seeding encountered an error:", error);
        return { success: false, message: error.message };
    }
}
