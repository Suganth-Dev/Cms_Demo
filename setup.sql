-- =====================================================================
-- INNOORYZE MINI CMS - DATABASE SETUP SCRIPT
-- =====================================================================
-- Copy and paste this entire script into your Supabase SQL Editor and run it.
-- This sets up the schemas, relationships, default metadata, and permissions.
-- =====================================================================

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    site_slug TEXT NOT NULL DEFAULT 'maxseal',
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Draft', -- Draft, In Review, Approved, Published, Archived
    image_url TEXT,
    description TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    specifications JSONB DEFAULT '{}'::jsonb,
    industries JSONB DEFAULT '[]'::jsonb,
    slug TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_site_product_slug UNIQUE (site_slug, slug)
);

-- 2. Create Documents Table (for Catalogs / PDFs with versioning)
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    site_slug TEXT NOT NULL DEFAULT 'maxseal',
    title TEXT NOT NULL,
    doc_type TEXT NOT NULL, -- Catalog, Brochure, Technical Bulletin, Price List, Marketing Brochure
    version INT NOT NULL DEFAULT 1,
    file_url TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Draft', -- Draft, In Review, Approved, Published, Archived
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    original_filename TEXT,
    parent_id UUID REFERENCES public.documents(id) ON DELETE SET NULL -- links to previous versions
);

-- 3. Create Media Library Table
CREATE TABLE IF NOT EXISTS public.media (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    site_slug TEXT NOT NULL DEFAULT 'maxseal',
    filename TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    size INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Settings Table
CREATE TABLE IF NOT EXISTS public.settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    site_slug TEXT NOT NULL UNIQUE,
    settings_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create Marketing Resources Table
CREATE TABLE IF NOT EXISTS public.marketing (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    site_slug TEXT NOT NULL DEFAULT 'maxseal',
    title TEXT NOT NULL,
    resource_type TEXT NOT NULL, -- Brochure, Flyer, Presentation, Video, Image
    file_url TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Create Global Partners Table
CREATE TABLE IF NOT EXISTS public.partners (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    site_slug TEXT NOT NULL DEFAULT 'maxseal',
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    website_link TEXT,
    logo_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Create Admin Users Table
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'Admin', -- Admin, Reviewer, Editor
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Disable Row Level Security (RLS) for POC
-- This ensures the client-side Anon Key can directly read, insert, update, and delete entries.
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.media DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users DISABLE ROW LEVEL SECURITY;

-- 9. Add Indexes for Faster Fetching
CREATE INDEX IF NOT EXISTS idx_products_site_slug ON public.products(site_slug);
CREATE INDEX IF NOT EXISTS idx_documents_site_slug ON public.documents(site_slug);
CREATE INDEX IF NOT EXISTS idx_media_site_slug ON public.media(site_slug);
CREATE INDEX IF NOT EXISTS idx_marketing_site_slug ON public.marketing(site_slug);
CREATE INDEX IF NOT EXISTS idx_partners_site_slug ON public.partners(site_slug);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);

-- Setup completed successfully.

-- =====================================================================
-- SEED DATA INSERTS
-- =====================================================================

-- 1. Insert settings
INSERT INTO public.settings (site_slug, settings_data) VALUES
('maxseal', '{"companyName": "MAX-SEAL Valves & Controls", "logoText": "MAX-SEAL", "tagline": "High Quality Industrial Valve Solutions & Controls", "address": "10200 Coldwater Road, Fort Wayne, IN 46825", "phone": "1-800-MAX-SEAL (629-7325)", "email": "info@maxsealinc.com", "facebook": "https://facebook.com/maxsealinc", "linkedin": "https://linkedin.com/company/max-seal-valves-and-controls", "twitter": "https://twitter.com/maxsealinc", "primaryColor": "#0B2C5D", "secondaryColor": "#0E5CAD", "accentColor": "#19B5FE"}'),
('abcschool', '{"companyName": "ABC International School", "logoText": "ABC School", "tagline": "Empowering Students for Global Academic Leadership", "address": "742 Evergreen Terrace, Springfield, IL 62704", "phone": "1-555-ABC-SCHL (222-7245)", "email": "admissions@abcschool.edu", "facebook": "https://facebook.com/abcschoolspringfield", "linkedin": "https://linkedin.com/company/abc-international-school", "twitter": "https://twitter.com/abcschools", "primaryColor": "#1B4332", "secondaryColor": "#2D6A4F", "accentColor": "#D4AF37"}'),
('hospital', '{"companyName": "City Hope General Hospital", "logoText": "City Hope", "tagline": "Compassionate Care, Advanced Medicine, Patient Safety First", "address": "500 Healthcare Parkway, Boston, MA 02111", "phone": "1-800-HOPE-MED (467-3633)", "email": "appointments@cityhopehospital.org", "facebook": "https://facebook.com/cityhopehospital", "linkedin": "https://linkedin.com/company/city-hope-general-hospital", "twitter": "https://twitter.com/cityhopehealth", "primaryColor": "#0D9488", "secondaryColor": "#0F766E", "accentColor": "#38BDF8"}')
ON CONFLICT (site_slug) DO UPDATE SET settings_data = EXCLUDED.settings_data;

-- 2. Insert products
INSERT INTO public.products (site_slug, title, category, status, image_url, description, features, specifications, industries, slug) VALUES
('maxseal', 'Tri-Max Series Triple Offset Butterfly Valve', 'Triple Offset Valves', 'Published', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80', 'The Tri-Max Series features a triple offset design that provides zero-leakage bi-directional shut-off. Perfect for high-pressure and extreme temperature services in refining, chemical processing, and power generation.', '["Triple eccentric design for friction-free opening and closing", "Metal-to-metal seating ensures fire-safe operation", "Zero leakage performance in compliance with API 598", "Bi-directional shutoff under full rating differential pressure", "Stellite 6 hardfaced seat for high wear resistance"]'::jsonb, '{"Size Range": "3\" to 48\" (80mm - 1200mm)", "Body Styles": "Wafer, Lug, Flanged", "Seat Materials": "Stellite 6 / Duplex Stainless Steel laminated with Graphite", "Pressure Rating": "Class 150, 300, and 600", "Temperature Range": "-320°F to 1000°F (-196°C to 538°C)"}'::jsonb, '["Oil & Gas", "Chemical Processing", "Refineries", "Power Generation", "Cryogenics"]'::jsonb, 'tri-max-series-triple-offset-butterfly-valve'),
('maxseal', 'Chem-Flo Series PFA Lined Butterfly Valve', 'PFA Lined Valves', 'Published', 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?w=800&auto=format&fit=crop&q=80', 'The Chem-Flo series is designed specifically for highly corrosive and toxic media applications. The valve is fully lined with high-density PFA (minimum thickness 3mm) to prevent permeation and isolate the valve body from the process fluid.', '["Minimum 3mm virgin PFA lining fully bonded to body and disc", "Live-loaded stem sealing prevents fugitive emissions", "One-piece disc and stem design minimizes flow turbulence", "PTFE-lined bearings eliminate shaft friction and side thrusts", "ISO 5211 mounting pad for quick actuator installation"]'::jsonb, '{"Size Range": "2\" to 24\" (50mm - 600mm)", "Body Styles": "Wafer, Lug", "Lining Material": "Virgin PFA (Option for Conductive PFA)", "Pressure Rating": "150 PSI working pressure", "Temperature Range": "-20°F to 350°F (-29°C to 176°C)"}'::jsonb, '["Chemical Processing", "Pharmaceuticals", "Acid Pickling", "Pulp & Paper", "Mining"]'::jsonb, 'chem-flo-series-pfa-lined-butterfly-valve'),
('abcschool', 'Advanced Placement Calculus AB', 'Mathematics', 'Published', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80', 'AP Calculus AB covers limits, derivatives, definite and indefinite integrals, and fundamental calculus theorems. Designed to prepare students for college-level engineering and science paths.', '["Prepares students for AP Exams with college credits", "Includes detailed interactive graphic tools", "Small classroom sizes (max 15)", "Guided tutorial hours with math chairs"]'::jsonb, '{"Grade Level": "11th and 12th Grades", "Course Length": "Full Academic Year", "Credits Available": "1.0 High School / 4.0 College Credits", "Prerequisite": "Pre-Calculus (Min Grade B)"}'::jsonb, '["Academics", "College Prep", "STEM Fields"]'::jsonb, 'ap-calculus-ab-honours'),
('hospital', 'Cardiovascular Health & Surgery Center', 'Cardiology Center', 'Published', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80', 'Provides full cardiac evaluations, coronary artery stenting, heart failure diagnostics, valve repairs, and post-operative cardiac rehabilitation clinics under certified heart specialists.', '["24/7 Dedicated cardiac catheterisation lab", "Minimally invasive keyhole heart surgeries", "Outpatient support remote tracking"]'::jsonb, '{"Bed Count": "45 Intensive Care Beds", "Specialties": "Electrophysiology, Angioplasty, Valve Repairs", "Operating Rooms": "4 Hybrid Surgical Theaters", "Chief of Department": "Dr. Sarah Lin, MD, FACC"}'::jsonb, '["Critical Care", "Surgery", "Heart Diagnostics"]'::jsonb, 'cardiovascular-health-surgery-center')
ON CONFLICT (site_slug, slug) DO NOTHING;

-- 3. Insert documents
INSERT INTO public.documents (site_slug, title, doc_type, version, file_url, status, original_filename) VALUES
('maxseal', 'MAX-SEAL General Butterfly Valve Catalog', 'Catalog', 1, 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'Published', 'maxseal_butterfly_catalog.pdf'),
('maxseal', 'Tri-Max Triple Offset Valves Technical Bulletin', 'Technical Bulletin', 1, 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'Published', 'trimax_technical_bulletin.pdf'),
('abcschool', 'Student & Parent Handbook - 2026', 'Catalog', 1, 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'Published', 'student_parent_handbook_2026.pdf'),
('hospital', 'Patient Rights & Intake Forms Booklet', 'Catalog', 1, 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'Published', 'patient_intake_forms.pdf');

-- 4. Insert marketing
INSERT INTO public.marketing (site_slug, title, resource_type, file_url, description) VALUES
('maxseal', 'High Performance Valve Product Showcase', 'Video', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Demonstration and structural overview of the High Performance Valve.'),
('abcschool', 'ABC School Campus Virtual Tour', 'Video', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Explore our science labs and libraries.'),
('hospital', 'Cardiology Department Surgical Innovations', 'Video', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Robotic heart valve diagnostics.');

-- 5. Insert partners
INSERT INTO public.partners (site_slug, name, country, website_link) VALUES
('maxseal', 'Global Valves & Actuators Ltd', 'United Kingdom', 'https://example.com'),
('abcschool', 'Cambridge Assessment International Education', 'United Kingdom', 'https://example.com'),
('hospital', 'Harvard Medical School Affiliate', 'United States', 'https://example.com');

-- 6. Insert admin users
INSERT INTO public.admin_users (email, password, role) VALUES
('admin@maxsealinc.com', 'admin123', 'Admin'),
('reviewer@maxsealinc.com', 'reviewer123', 'Reviewer'),
('editor@maxsealinc.com', 'editor123', 'Editor')
ON CONFLICT (email) DO NOTHING;

