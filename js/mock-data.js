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
    },
    // -------------------------------------------------------------
    // AGREE FARMS & AGRICULTURE (slug: agree)
    // -------------------------------------------------------------
    agree: {
        settings: {
            companyName: "Agree Farms & Agriculture",
            logoText: "Agree Farms",
            tagline: "Premium Sustainable Farming & Organic Crops",
            address: "1024 Harvest Way, Salinas Valley, CA 93901",
            phone: "1-800-555-FARM (3276)",
            email: "info@agreefarms.com",
            facebook: "https://facebook.com/agreefarms",
            linkedin: "https://linkedin.com/company/agree-farms",
            twitter: "https://twitter.com/agreefarms",
            primaryColor: "#15803d",
            secondaryColor: "#166534",
            accentColor: "#f59e0b",
            heroHeading: "Cultivating Quality, Nurturing the Future.",
            heroSubheading: "Agree Farms utilizes state-of-the-art agricultural techniques and sustainable processes to produce premium organic vegetables, wholesale grains, and fruits.",
            headerCtaText: "1-800-555-FARM",
            headerCtaHref: "tel:18005553276",
            navLabels: ["Home", "Produce", "Harvest Reports", "Guides", "Partners", "Contact"],
            footerCompany: "Agree Farms & Agriculture",
            footerTagline: "Providing premium organic harvests and sustainable distributing partnerships since 2012.",
            footerCopyright: "Agree Farms Agriculture Group",
            footerAddress: "1024 Harvest Way, Salinas Valley, CA 93901",
            footerPhone: "1-800-555-FARM",
            footerFax: "1-800-555-3277",
            footerEmail: "info@agreefarms.com",
            footerLinks: ["Home", "Organic Standards", "Partnerships", "Careers"]
        },
        products: [
            {
                title: "USDA Organic Honeycrisp Apples",
                category: "Seasonal Fruits",
                status: "Published",
                image_url: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&auto=format&fit=crop&q=80",
                description: "Sweet, crisp, and 100% certified organic Honeycrisp apples, grown under strict natural soil management and hand-harvested.",
                features: JSON.stringify([
                    "Certified organic by USDA",
                    "Naturally sun-ripened",
                    "Ideal for wholesale and retail",
                    "High dietary fiber & vitamins",
                    "Long storage life under temperature control"
                ]),
                specifications: JSON.stringify({
                    "Harvest Season": "Late Summer / Early Autumn",
                    "Sowing Log": "Perennial Orchard",
                    "Farming Method": "100% Pesticide-Free Organic Orchard",
                    "Packaging": "40lb wholesale cardboard crates"
                }),
                industries: JSON.stringify(["Wholesale Retailers", "Organic Food Markets", "Juice Producers"]),
                slug: "usda-organic-honeycrisp-apples"
            },
            {
                title: "Heritage Hard Red Winter Wheat",
                category: "Wholesale Grains",
                status: "Published",
                image_url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80",
                description: "Premium red winter wheat with high protein content, ideal for flour mills, bread baking, and industrial food processing.",
                features: JSON.stringify([
                    "High protein concentration (13%+)",
                    "Locally sourced heirloom strain",
                    "Grown with sustainable crop rotation",
                    "Triple cleaned for maximum purity",
                    "Certified non-GMO grains"
                ]),
                specifications: JSON.stringify({
                    "Harvest Season": "Mid-Summer",
                    "Sowing Log": "Autumn Sowing",
                    "Farming Method": "No-Till Conservation Tillage",
                    "Packaging": "1-ton bulk transport sacks"
                }),
                industries: JSON.stringify(["Commercial Flour Mills", "Bakehouses", "Food Processors"]),
                slug: "heritage-hard-red-winter-wheat"
            },
            {
                title: "Premium Hydroponic Butterhead Lettuce",
                category: "Organic Vegetables",
                status: "Published",
                image_url: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=800&auto=format&fit=crop&q=80",
                description: "Ultra-fresh greenhouse-grown butterhead lettuce, delivered root-on to maintain maximum crispness and shelf life.",
                features: JSON.stringify([
                    "Hydroponically grown inside controlled greenhouse",
                    "Zero synthetic pesticide contact",
                    "Delivered with root system intact",
                    "Rich buttery texture and sweet flavor",
                    "Consistently sized heads"
                ]),
                specifications: JSON.stringify({
                    "Harvest Season": "Year-round production",
                    "Sowing Log": "Continuous 30-day rotation",
                    "Farming Method": "Closed-Loop Nutrient Film Hydroponics",
                    "Packaging": "12-count individual breathable clamshells"
                }),
                industries: JSON.stringify(["Supermarkets", "Restaurants", "Salad Packagers"]),
                slug: "premium-hydroponic-butterhead-lettuce"
            }
        ],
        documents: [
            {
                title: "USDA Organic Compliance Certificate 2026",
                doc_type: "Organic Certifications",
                version: 1,
                status: "Published",
                original_filename: "organic_cert_2026.pdf",
                file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                title: "Salinas Valley Soil & Water Analysis Report",
                doc_type: "Harvest Reports",
                version: 1,
                status: "Published",
                original_filename: "soil_water_analysis.pdf",
                file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            }
        ],
        marketing: [
            {
                title: "Organic Crop Rotation & Soil Nutrition Guide",
                resource_type: "Video",
                file_url: "https://www.w3schools.com/html/mov_bbb.mp4",
                description: "Educational video outlining crop rotation intervals to naturally replenish soil nitrogen without synthetic fertilizers."
            }
        ],
        partners: [
            { name: "Salinas Valley Growers Alliance", country: "United States", website_link: "https://example.com" },
            { name: "Pacific Organic Distributors Group", country: "United States", website_link: "https://example.com" }
        ],
        media: [
            { filename: "harvest-fields.jpg", file_url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80", file_type: "image/jpeg", size: 382091 }
        ]
    },
    // -------------------------------------------------------------
    // DYNALEKTRIC (slug: dynalektric)
    // -------------------------------------------------------------
    dynalektric: {
        settings: {
            companyName: "Dynalektric Engineering",
            logoText: "Dynalektric",
            tagline: "Industrial Engineering and Manufacturing Solutions",
            address: "Dynalektric HQ, Engineering Drive, Industrial Park",
            phone: "1-800-DYNALEK",
            email: "contact@dynalektric.com",
            facebook: "https://facebook.com/dynalektric",
            linkedin: "https://linkedin.com/company/dynalektric",
            twitter: "https://twitter.com/dynalektric",
            primaryColor: "#002A52",
            secondaryColor: "#003366",
            accentColor: "#0077B6",
            heroHeading: "Engineering built for industrial progress.",
            heroSubheading: "In-house engineering, manufacturing and testing for infrastructure, mobility, energy and industrial applications.",
            headerCtaText: "1-800-DYNALEK",
            headerCtaHref: "tel:1800DYNALEK",
            navLabels: ["Home", "About", "Products", "R&D", "Industries", "Export", "Contact"],
            footerCompany: "Dynalektric Engineering",
            footerTagline: "Engineering solutions for demanding environments.",
            footerCopyright: "Dynalektric. All Rights Reserved.",
            footerAddress: "Dynalektric HQ, Engineering Drive",
            footerPhone: "1-800-DYNALEK",
            footerFax: "1-800-DYNALEK-FAX",
            footerEmail: "contact@dynalektric.com",
            footerLinks: ["Home", "About", "Contact"],
            pageContent: {
                home: {
                    heroTitle: "Engineering-led electrical and electronics manufacturing.",
                    heroDesc: "In-house engineering, manufacturing and testing for infrastructure, mobility, energy and industrial applications.",
                    heroVideo: "Dynalektric/demo1DL/public/videos/Dynalektric_Hero.mp4",
                    orgTitle: "The organisation behind every engineered solution.",
                    orgLead: "Dynalektric combines engineering teams, manufacturing capability, testing processes and application experience within one operating environment.",
                    orgImg: "Dynalektric/demo1DL/assets/card-magnetics.jpg",
                    capTitle: "Engineering systems that power, control and support industrial operations.",
                    capLead: "Dynalektric combines engineering, manufacturing and testing across four core capability areas serving demanding industrial applications.",
                    indTitle: "Engineering capability applied across demanding industries.",
                    indLead: "Dynalektric supports power, control and equipment applications across established infrastructure, mobility and industrial sectors.",
                    rndTitle: "Custom requirements engineered in-house.",
                    rndLead: "Our engineering and new product development teams take a customer specification through feasibility, design, prototyping, validation and pilot production. One team, one process.",
                    rndImg: "Dynalektric/demo1DL/assets/engineering-npd.jpg",
                    qualTitle: "Type-tested designs, full documentation, traceable processes.",
                    qualLead: "Every product ships with routine and type test reports, QAP documentation and material traceability. Designs validated against IEC, IS and customer specifications.",
                    casesTitle: "Engineering outcomes from real applications.",
                    casesLead: "Selected examples of how Dynalektric applies engineering, manufacturing and testing capability across industrial applications."
                },
                about: {
                    title: "Engineering and Manufacturing Capability",
                    desc: "Dynalektric supports OEMs, utilities, and EPC contractors with application-specific engineering, manufacturing, and testing of electrical and electronic equipment."
                }
            }
        },
        products: [
            {
                title: "Power Transformation and Magnetics",
                category: "Capability",
                status: "Published",
                image_url: "Dynalektric/demo1DL/assets/card-magnetics.jpg",
                description: "Transformers, reactors and magnetic components engineered for power conversion, distribution, harmonic control and specialised industrial applications.",
                features: JSON.stringify(["Application-specific engineering", "Manufacturing and testing", "Industrial and infrastructure use"]),
                specifications: JSON.stringify({"cta": "Explore Magnetics"}),
                industries: JSON.stringify(["Power Grid", "Renewable Sectors"]),
                slug: "power-transformation-magnetics"
            },
            {
                title: "Control, Distribution and Panel Engineering",
                category: "Capability",
                status: "Published",
                image_url: "Dynalektric/demo1DL/assets/card-control.jpg",
                description: "Panel and distribution assemblies developed around control, operating, safety and application requirements for railway, power and industrial equipment.",
                features: JSON.stringify(["Control integration", "Assembly and wiring", "Testing and documentation"]),
                specifications: JSON.stringify({"cta": "Explore Panel Engineering"}),
                industries: JSON.stringify(["Railway & Traction", "Heavy Industries"]),
                slug: "control-distribution-panel-engineering"
            },
            {
                title: "DC Power and Electronic Systems",
                category: "Capability",
                status: "Published",
                image_url: "Dynalektric/demo1DL/assets/card-power.jpg",
                description: "DC power, charging and electronic systems configured for equipment duty, operational environments and specialised industrial applications.",
                features: JSON.stringify(["Duty-specific design", "Power conversion", "Validation and testing"]),
                specifications: JSON.stringify({"cta": "Explore Power Electronics"}),
                industries: JSON.stringify(["Material Handling", "Data Centers"]),
                slug: "dc-power-electronic-systems"
            },
            {
                title: "Integrated Components and Assemblies",
                category: "Capability",
                status: "Published",
                image_url: "Dynalektric/demo1DL/assets/card-integrated.jpg",
                description: "Supporting electrical and electronic components integrated into railway, power, equipment and cross-sector industrial systems.",
                features: JSON.stringify(["Component integration", "Custom assemblies", "Cross-sector applications"]),
                specifications: JSON.stringify({"cta": "Explore Integrated Solutions"}),
                industries: JSON.stringify(["Heavy Industries", "Railway & Traction"]),
                slug: "integrated-components-assemblies"
            },
            {
                title: "Railway & Traction",
                category: "Industry",
                status: "Published",
                image_url: "Dynalektric/demo1DL/assets/industry-railways.jpg",
                description: "Electrical and electronic systems supporting onboard, trackside and railway equipment applications.",
                features: JSON.stringify(["Traction equipment", "Onboard systems", "Control and auxiliary power"]),
                specifications: JSON.stringify({"cta": "Explore Railway Applications"}),
                slug: "railway-traction"
            },
            {
                title: "Renewable Sectors",
                category: "Industry",
                status: "Published",
                image_url: "Dynalektric/demo1DL/assets/industry-renewables.jpg",
                description: "Magnetics, reactors and power systems supporting conversion, grid integration and renewable-energy infrastructure.",
                features: JSON.stringify(["Solar and wind", "Grid integration", "Energy conversion"]),
                specifications: JSON.stringify({"cta": "Explore Renewable Applications"}),
                slug: "renewable-sectors"
            },
            {
                title: "Power & Utilities",
                category: "Industry",
                status: "Published",
                image_url: "Dynalektric/demo1DL/assets/industry-powergrid.jpg",
                description: "Power conversion, distribution and control solutions supporting utilities, EPC contractors and infrastructure projects.",
                features: JSON.stringify(["Power distribution", "Utility systems", "EPC projects"]),
                specifications: JSON.stringify({"cta": "Explore Power Applications"}),
                slug: "power-utilities"
            },
            {
                title: "Heavy Industries",
                category: "Industry",
                status: "Published",
                image_url: "Dynalektric/demo1DL/assets/industry-heavy.jpg",
                description: "Electrical, magnetic and control solutions developed for demanding process and heavy-equipment environments.",
                features: JSON.stringify(["Steel and cement", "Mining", "Process industries"]),
                specifications: JSON.stringify({"cta": "Explore Heavy Industry Applications"}),
                slug: "heavy-industries"
            },
            {
                title: "Material Handling & Warehousing",
                category: "Industry",
                status: "Published",
                image_url: "Dynalektric/demo1DL/assets/industry-mhe.jpg",
                description: "Charging, power electronics and control systems supporting forklifts, AGVs and warehouse equipment.",
                features: JSON.stringify(["Forklifts", "AGVs", "Charging systems"]),
                specifications: JSON.stringify({"cta": "Explore Material Handling Applications"}),
                slug: "material-handling-warehousing"
            },
            {
                title: "Data Centers",
                category: "Industry",
                status: "Published",
                image_url: "Dynalektric/demo1DL/assets/industry-datacenter.jpg",
                description: "Distribution, UPS interface and critical-power support for data-centre infrastructure and operational continuity.",
                features: JSON.stringify(["Critical power", "UPS interface", "Distribution systems"]),
                specifications: JSON.stringify({"cta": "Explore Data Center Applications"}),
                specifications: JSON.stringify({"cta": "Explore Data Center Applications"}),
                slug: "data-centers"
            },
            {
                title: "Magnetic components for demanding rolling-stock applications",
                category: "Case Study",
                status: "Published",
                image_url: "Dynalektric/demo1DL/assets/industry-railways.jpg",
                description: "Rolling-stock equipment required magnetic components able to hold performance under vibration, thermal load and constrained installation envelopes.",
                features: JSON.stringify(["Application engineering", "Manufacturing", "Testing and documentation"]),
                specifications: JSON.stringify({"cta": "View Application", "industry": "Railway & Traction", "response": "Dynalektric engineered application-specific magnetics, then manufactured and validated them against the relevant railway and IEC requirements before delivery."}),
                slug: "magnetic-components-rolling-stock"
            },
            {
                title: "Reactor solution supporting renewable power conversion",
                category: "Case Study",
                status: "Published",
                image_url: "Dynalektric/demo1DL/assets/industry-renewables.jpg",
                description: "A renewable power-conversion application needed reactors suited to harmonic conditions, grid-integration duty and a long project life.",
                features: JSON.stringify(["Application engineering", "Manufacturing", "Testing and documentation"]),
                specifications: JSON.stringify({"cta": "View Application", "industry": "Renewable Energy", "response": "Dynalektric developed reactor designs for the duty profile, then manufactured and tested them to the project and IEC requirements."}),
                slug: "reactor-solution-renewable-power"
            },
            {
                title: "Power equipment engineered for utility and infrastructure requirements",
                category: "Case Study",
                status: "Published",
                image_url: "Dynalektric/demo1DL/assets/industry-powergrid.jpg",
                description: "A utility and infrastructure application required power equipment built to distribution duty, documentation standards and inspection requirements.",
                features: JSON.stringify(["Application engineering", "Manufacturing", "Testing and documentation"]),
                specifications: JSON.stringify({"cta": "View Application", "industry": "Power & Utilities", "response": "Dynalektric engineered the equipment to the application, then manufactured and tested it with documentation aligned to the project handover."}),
                slug: "power-equipment-utility-infrastructure"
            }
        ],
        documents: [
            {
                title: "Dynalektric Corporate Brochure",
                doc_type: "Catalog",
                version: 1,
                file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                status: "Published",
                original_filename: "dynalektric_corporate.pdf"
            }
        ],
        marketing: [
            {
                title: "Dynalektric Hero Video",
                resource_type: "Video",
                file_url: "Dynalektric/demo1DL/public/videos/Dynalektric_Hero.mp4",
                description: "Cinematic hero video representing engineering and manufacturing."
            }
        ],
        partners: [
            { name: "Dynalektric Distributors", country: "Global", website_link: "https://dynalektric.com" }
        ],
        media: [
            { filename: "card-control.jpg", file_url: "Dynalektric/demo1DL/assets/card-control.jpg", file_type: "image/jpeg", size: 265012 },
            { filename: "card-integrated.jpg", file_url: "Dynalektric/demo1DL/assets/card-integrated.jpg", file_type: "image/jpeg", size: 302209 },
            { filename: "card-magnetics.jpg", file_url: "Dynalektric/demo1DL/assets/card-magnetics.jpg", file_type: "image/jpeg", size: 279609 },
            { filename: "card-power.jpg", file_url: "Dynalektric/demo1DL/assets/card-power.jpg", file_type: "image/jpeg", size: 248071 },
            { filename: "dynalektric-logo-reversed.png", file_url: "Dynalektric/demo1DL/assets/dynalektric-logo-reversed.png", file_type: "image/png", size: 15796 },
            { filename: "dynalektric-logo.png", file_url: "Dynalektric/demo1DL/assets/dynalektric-logo.png", file_type: "image/png", size: 84269 },
            { filename: "engineering-npd.jpg", file_url: "Dynalektric/demo1DL/assets/engineering-npd.jpg", file_type: "image/jpeg", size: 255464 },
            { filename: "hero-poster.jpg", file_url: "Dynalektric/demo1DL/assets/hero-poster.jpg", file_type: "image/jpeg", size: 302209 },
            { filename: "industry-datacenter.jpg", file_url: "Dynalektric/demo1DL/assets/industry-datacenter.jpg", file_type: "image/jpeg", size: 314535 },
            { filename: "industry-heavy.jpg", file_url: "Dynalektric/demo1DL/assets/industry-heavy.jpg", file_type: "image/jpeg", size: 400517 },
            { filename: "industry-mhe.jpg", file_url: "Dynalektric/demo1DL/assets/industry-mhe.jpg", file_type: "image/jpeg", size: 362006 },
            { filename: "industry-powergrid.jpg", file_url: "Dynalektric/demo1DL/assets/industry-powergrid.jpg", file_type: "image/jpeg", size: 313818 },
            { filename: "industry-railways.jpg", file_url: "Dynalektric/demo1DL/assets/industry-railways.jpg", file_type: "image/jpeg", size: 264729 },
            { filename: "industry-renewables.jpg", file_url: "Dynalektric/demo1DL/assets/industry-renewables.jpg", file_type: "image/jpeg", size: 261450 },
            { filename: "Dynalektric_Hero.mp4", file_url: "Dynalektric/demo1DL/public/videos/Dynalektric_Hero.mp4", file_type: "video/mp4", size: 5000000 }
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

        // 7. Seed Admin Users table if not in fallback mode and empty
        if (!isFallback) {
            try {
                const { data: existingUsers, error: checkErr } = await supabaseClient.from('admin_users').select('id').limit(1);
                if (!checkErr && (!existingUsers || existingUsers.length === 0)) {
                    console.log("- Seeding admin users...");
                    await supabaseClient.from('admin_users').insert([
                        { email: 'admin@maxsealinc.com', password: 'admin123', role: 'Admin' },
                        { email: 'reviewer@maxsealinc.com', password: 'reviewer123', role: 'Reviewer' },
                        { email: 'editor@maxsealinc.com', password: 'editor123', role: 'Editor' }
                    ]);
                }
            } catch (err) {
                console.warn("Could not seed admin_users table (might not exist yet):", err.message);
            }
        }

        console.log("Multi-tenant seeding completed successfully!");
        return { success: true, message: "Multi-tenant database tables seeded successfully!" };
    } catch (error) {
        console.error("Multi-tenant database seeding encountered an error:", error);
        return { success: false, message: error.message };
    }
}
