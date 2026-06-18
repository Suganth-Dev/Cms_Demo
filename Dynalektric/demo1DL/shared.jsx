/* shared.jsx — shared data, components, hooks for Dynalektric prototype */

const PRODUCTS = [
  {
    id: 'magnetics',
    num: '01',
    name: 'Magnetics',
    tagline: 'TUV SUD-certified transformers, reactors and magnetic components for railways, renewable energy and industrial OEMs.',
    overview: 'Dynalektric designs and manufactures dry-type control and MV transformers, air-core reactors, chokes, de-tuned reactors and oil-cooled magnetics in aluminium or copper windings, insulation class F or H, built to IEC 60076, IS 2026 and IS 11171. Supplied to railway OEMs, renewable energy EPCs, heavy industry and major PSU contractors.',
    subcategories: [
      { code: '01.1', name: 'LV Transformers',          detail: 'Dry-type control and isolation transformers, 50 VA to 2500 kVA, up to 11 kV, single and three-phase, with OCTL/OCTC/OLTC tapping, Class F and H insulation, to IS 11171 and IEC 60076' },
      { code: '01.2', name: 'MV Transformers',          detail: 'Dry-type and oil-cooled distribution transformers up to 5 MVA, primary voltage up to 11 kV, ONAN/OFWF/AN/AF cooling, for industrial substations, traction supply and furnace duty' },
      { code: '01.3', name: 'K-Rated Transformers',     detail: 'Transformers engineered for non-linear and harmonic-rich loads in IT power chains, drive-fed circuits and data centre environments, Class F or H insulation' },
      { code: '01.4', name: 'Air-Core Reactor',         detail: 'Open-type air-core reactors up to 2000 A at 36 kV system voltage, Class B/F/H insulation, to IEC 60076-6, for reactive power compensation, harmonic filtering and inrush current limiting' },
      { code: '01.5', name: 'Oil-Cooled Reactors',      detail: 'Oil-cooled reactors for higher-rating furnace and grid applications, ONAN/OFWF cooling, up to 5 MVA, for large industrial reactive compensation and grid damping duties' },
      { code: '01.6', name: 'De-tuned Reactor',         detail: 'Three-phase de-tuned reactor-capacitor series circuits tuned below the 5th harmonic; eliminates harmonic amplification, extends capacitor life and prevents nuisance breaker tripping in PFC installations' },
    ],
    placeholders: [
      { k: 'Rating range',    v: '50 VA to 5 MVA' },
      { k: 'Voltage class',   v: 'up to 36 kV' },
      { k: 'Insulation',      v: 'Class B, F or H' },
      { k: 'Cooling',         v: 'AN, AF, ONAN, OFAF' },
      { k: 'Enclosure',       v: 'Indoor or outdoor IP rated' },
      { k: 'Standards',       v: 'IEC 60076, IS 2026, IEC 60289' },
    ],
    applications: ['Industrial substations', 'Renewable inverter stations', 'Traction power supply', 'Harmonic mitigation', 'Reactive compensation', 'Power conditioning'],
    industries: ['railways', 'renewables', 'powergrid', 'heavy', 'datacenter'],
  },
  {
    id: 'control-panels',
    num: '02',
    name: 'Control Panel Assemblies',
    tagline: 'Railway-grade and industrial control panels built, wired and tested in-house for locomotive OEMs and PSU contracts.',
    overview: 'Cubicle and control panels for locomotive and driver desk applications, power distribution units and main power panels. Engineered with full protection for railway auxiliary equipment, input ratings from 110 VDC to 1000 VAC and outputs from 24 VDC to 415 VAC. Designed, wired and tested to IEC 61439 and IRS/RDSO requirements with complete FA documentation.',
    subcategories: [
      { code: '02.1', name: 'Locomotive Panels',  detail: 'Cubicle-type locomotive control panels, input 110 VDC/415/1000 VAC, output 110 VDC/110/230/415 VAC, 50 Hz, with full protection for onboard auxiliary and traction control systems' },
      { code: '02.2', name: 'Driver Desk Panels', detail: 'Railway driver desk panels, input 110 VDC/230 VAC, output 230 VAC/110/48/24 VDC, with switchgear for blower, compressor, crew fan, cab heater and earthing fault; front glass window for easy inspection' },
      { code: '02.3', name: 'PDUs',               detail: 'Power distribution units for industrial, traction and data centre use, built to IEC 61439 with custom busbar layouts, metering and protection per buyer specification' },
      { code: '02.4', name: 'Power Panels',       detail: 'LV main and sub-distribution power panels, fully wired and tested in-house to IEC 61439, supplied with GA drawings, BoM and FAT documentation' },
    ],
    placeholders: [
      { k: 'Standard',         v: 'IEC 61439-1 and 61439-2' },
      { k: 'Form',             v: 'Form 2, 3b or 4b' },
      { k: 'Current ratings',  v: 'up to 6300 A' },
      { k: 'Enclosure',        v: 'IP rated, custom layouts' },
      { k: 'Tests',            v: 'Routine and type tested' },
      { k: 'Documentation',    v: 'GA drawings, BoM, QAP, FAT' },
    ],
    applications: ['Locomotive control cabinets', 'Driver desk consoles', 'Industrial automation', 'MCC and PCC distribution', 'Process control'],
    industries: ['railways', 'heavy', 'powergrid', 'datacenter'],
  },
  {
    id: 'power-electronics',
    num: '03',
    name: 'Power Electronics Systems',
    tagline: 'Microcontroller-based battery chargers for MHE fleets, utility substations and special traction and defence applications.',
    overview: 'MHE DC1 and DC3 battery chargers for single-phase and three-phase forklift and warehouse fleets, float cum boost chargers for substation auxiliary supply, and special application chargers for traction and industrial use. SCR and IGBT-based designs with DIN41772 charging profiles, compatible with Lead-Acid, Trojan and VRLA chemistries, supporting normal and opportunity charging modes.',
    subcategories: [
      { code: '03.1', name: 'MHE Battery Chargers',                detail: 'DC1 single-phase charger (12–72 V DC, 10–70 A) and DC3 three-phase charger (24–120 V DC, 50–200 A); microcontroller-based SCR control, DIN41772 profile, opportunity charging, Lead-Acid/VRLA compatible' },
      { code: '03.2', name: 'Float Cum Boost Chargers',            detail: 'Float cum boost chargers for substation and utility DC battery banks, automatic float/boost mode switching, continuous-duty rated for 24/7 auxiliary power supply' },
      { code: '03.3', name: 'Special Application Battery Chargers', detail: 'Application-engineered battery chargers for traction, marine and defence platforms; IGBT or SCR topology, ruggedised enclosures, built to customer QAP and application specifications' },
    ],
    placeholders: [
      { k: 'Output voltage',   v: '24 V to 220 V DC' },
      { k: 'Output current',   v: 'up to 400 A' },
      { k: 'Chemistries',      v: 'Lead-acid, Li-ion, NiCd' },
      { k: 'Connectivity',     v: 'CAN, Modbus, RS485' },
      { k: 'Enclosure',        v: 'IP rated industrial' },
      { k: 'Tests',            v: 'Routine and type tested' },
    ],
    applications: ['Forklift fleets', 'AGV depots', 'Substation auxiliary supply', 'Marine and defence', 'Industrial DC backup'],
    industries: ['mhe', 'powergrid', 'railways', 'datacenter'],
  },
  {
    id: 'cross-segment',
    num: '04',
    name: 'Cross-Segment Solutions',
    tagline: 'Precision-processed busbars, certified wire harnesses, online UPS systems and OEM-integrated sub-assemblies.',
    overview: 'Copper and aluminium busbars CNC-processed on Siemens-controlled equipment, in-house wire harness assemblies with automated crimping and crimp pull testing, online UPS from 1 to 250 KVA with built-in isolation transformers, and specialised sub-assemblies for railway and industrial OEM integration. All supplied with full test and traceability documentation.',
    subcategories: [
      { code: '04.1', name: 'Busbars',                 detail: 'Copper and aluminium busbars and extrusions, CNC-sheared, punched and Siemens-controlled bent; Tin/Nickel/Silver plating available; sizes from 12×2 mm to 200×15 mm; to IS 3052, IS 613 and IEC 61439' },
      { code: '04.2', name: 'Cable Harnessing',        detail: 'In-house wire harness assemblies using automated cutting, crimping and ferrule printing machines; crimp pull tested, continuity and performance verified; assembled to electrical schematic and GA drawings' },
      { code: '04.3', name: 'UPS',                     detail: 'Online double-conversion UPS, 1 to 250 KVA, pure sinewave IGBT inverter, built-in isolation transformer, bidirectional static switch, SNMP monitoring, diesel generator compatible; 1Ph-1Ph, 3Ph-1Ph and 3Ph-3Ph models' },
      { code: '04.4', name: "Driver's Display Unit",   detail: 'Onboard display and HMI units for locomotive and metro cabs; sunlight-readable, vibration-tolerant, with CAN/Ethernet/MVB interfaces, built to EN 50155 inputs for railway rolling stock' },
      { code: '04.5', name: 'Current Sensors',         detail: 'Hall-effect and shunt-based current sensing modules for traction, renewable energy and panel protection; accuracy class 0.5 to 1, calibrated against traceable references' },
      { code: '04.6', name: 'DC-DC Converters',        detail: 'Isolated and non-isolated DC-DC modules for onboard auxiliary supplies, battery systems and industrial control; application-specific input/output voltage, to EN 50155 and IEC 61287' },
      { code: '04.7', name: 'Fire Detection Unit',     detail: 'Onboard fire detection units for rolling stock and panel cabinets; multi-criteria smoke and heat sensing, volt-free alarm contacts, vibration-tolerant enclosures, to EN 45545 and EN 50155 inputs' },
      { code: '04.8', name: 'Maximum Voltage Relay',   detail: 'Overvoltage protection relays for traction and utility applications; fast-response definite-time trip, volt-free contacts, custom set points, to IEC 60255 inputs' },
    ],
    placeholders: [
      { k: 'Customisation',    v: 'OEM-specific designs' },
      { k: 'Standards',        v: 'IEC, IS, IRS as applicable' },
      { k: 'Voltage range',    v: 'LV to MV configurations' },
      { k: 'Applications',     v: 'Rolling stock, industrial, utility' },
      { k: 'Tests',            v: 'Per customer QAP' },
      { k: 'Documentation',    v: 'Datasheets available on request' },
    ],
    applications: ['Rolling stock onboard systems', 'Industrial control', 'Critical load backup', 'Sensing and protection', 'OEM integration'],
    industries: ['railways', 'heavy', 'powergrid', 'mhe', 'renewables', 'datacenter'],
  },
];

const INDUSTRIES = [
  {
    id: 'railways',
    num: '01',
    name: 'Railway & Traction',
    short: 'Onboard and trackside power for rolling stock OEMs and rail operators.',
    body: 'Vibration-tolerant magnetics, traction-grade transformers, locomotive and driver-desk panels, onboard converters and protection relays. Designed and tested against IRS, RDSO and IEC requirements.',
    applications: ['Traction transformers and reactors', 'Locomotive control panels', 'Driver desk consoles', 'Auxiliary converter magnetics', 'Onboard protection and display'],
    buyer: 'Rolling stock OEMs, traction integrators, signalling contractors and rail operators.',
    qa: 'Vibration, impulse and temperature rise tests where applicable. IRS, RDSO and IEC conformance based on tender requirement.',
    products: ['magnetics', 'control-panels', 'power-electronics', 'cross-segment'],
  },
  {
    id: 'renewables',
    num: '02',
    name: 'Renewable Sectors',
    short: 'Inverter-grade magnetics and grid-tie components for solar, wind and storage plants.',
    body: 'Inverter chokes, harmonic filter reactors, grid-tie transformers and balance-of-plant components for utility-scale solar, wind and battery storage. Designed for 25-year project life and full type testing.',
    applications: ['Solar inverter magnetics', 'String-level chokes', 'Wind converter components', 'Grid-tie transformers', 'Substation panels and protection'],
    buyer: 'Renewable EPC contractors, inverter OEMs, IPP owners and utilities.',
    qa: 'Routine tests on every unit. Type tests for thermal endurance and partial discharge, where applicable. Documentation aligned with EPC handover requirements.',
    products: ['magnetics', 'cross-segment'],
  },
  {
    id: 'powergrid',
    num: '03',
    name: 'Power & Utilities',
    short: 'Distribution transformers, reactors and protective panels for utilities and EPC contractors.',
    body: 'Type-tested transformers, reactors, distribution panels, float and boost chargers and protection assemblies meeting IEC and IS requirements for distribution networks, industrial substations and captive power plants.',
    applications: ['MV distribution transformers', 'Harmonic filter reactors', 'Substation panels and PDUs', 'Float cum boost chargers', 'Auxiliary supply systems'],
    buyer: 'Utilities, T&D EPC contractors and industrial substation owners.',
    qa: 'IEC 60076 and IEC 61439 routine tests. Type tests through accredited labs, where applicable. Third-party inspection ready.',
    products: ['magnetics', 'control-panels', 'power-electronics', 'cross-segment'],
  },
  {
    id: 'heavy',
    num: '04',
    name: 'Heavy Industries',
    short: 'Power and control packages for steel, cement, mining and process industries.',
    body: 'Isolation transformers, MV switchgear interfaces, drive cabinets and PDUs for plant electrification. Engineered for heavy duty cycles and built to customer QAP frameworks.',
    applications: ['Drive and motor control cabinets', 'Isolation transformers', 'Plant PDUs', 'Servo power supplies', 'Process automation panels'],
    buyer: 'Process plant owners, machine builders and EPC contractors for heavy industry.',
    qa: 'Customer QAP and stage inspection. Routine tests on every assembly. Material traceability available on request.',
    products: ['magnetics', 'control-panels', 'cross-segment'],
  },
  {
    id: 'mhe',
    num: '05',
    name: 'Material Handling & Warehousing',
    short: 'Chargers and power electronics for forklift, AGV and warehouse fleets.',
    body: 'High-frequency chargers and battery management systems for 24 / 7 fleet operations. Built for opportunity charging, multi-chemistry compatibility and fleet management integration.',
    applications: ['Forklift fleet charging', 'AGV depots', 'Cold-chain warehousing', 'E-commerce fulfilment centres'],
    buyer: 'Material handling equipment OEMs, fleet operators and warehouse logistics providers.',
    qa: 'Functional, efficiency and burn-in tests, where applicable. Conformance to chemistry-specific charging profiles. Optional third-party inspection.',
    products: ['power-electronics', 'cross-segment'],
  },
  {
    id: 'datacenter',
    num: '06',
    name: 'Data Centers',
    short: 'Distribution, UPS interface and critical-load backup for data centre infrastructure.',
    body: 'K-rated transformers, IT-grade PDUs, UPS units and busbar systems for data centre power chains. Supplied with documentation aligned to customer reliability and audit requirements.',
    applications: ['K-rated isolation transformers', 'IT power distribution', 'UPS and battery backup', 'Busbar trunking', 'Auxiliary protection'],
    buyer: 'Data centre operators, colocation providers and critical-power EPC contractors.',
    qa: 'IEC 61439 routine tests on assemblies. K-factor verification on magnetics, where applicable. Documentation prepared for audit and acceptance.',
    products: ['magnetics', 'control-panels', 'power-electronics', 'cross-segment'],
  },
];

const CERTIFICATIONS = [
  { code: 'ISO 9001',  label: 'Quality management' },
  { code: 'ISO 14001', label: 'Environmental management' },
  { code: 'ISO 45001', label: 'Occupational health and safety' },
  { code: 'IEC',       label: 'International standards' },
  { code: 'CE',        label: 'European conformity' },
];

const STATS = [
  { value: '40+',   label: 'Years of in-house engineering', sub: 'Established 1980' },
  { value: '500+',  label: 'Custom designs delivered',      sub: 'Magnetics, panels and systems' },
  { value: '15+',   label: 'Export markets served',         sub: 'Europe, Middle East, Asia' },
  { value: '1 day', label: 'Typical RFQ response time',     sub: 'For complete specifications' },
];

const HERO_HEADLINES = [
  {
    pre: 'Manufacturing partner · India · ISO 9001',
    main: 'Precision-engineered power solutions for industrial and export markets.',
    sub: 'Transformers, control panels, power electronics and cross-segment components, designed and tested in-house to IEC and IS standards. Supplied to OEMs, EPC contractors, utilities and procurement teams across Europe, the Middle East and Asia.',
  },
  {
    pre: 'Engineered to specification',
    main: 'Transformers, panels and power electronics for industrial OEMs and EPC projects.',
    sub: 'Forty years of in-house design, winding, panel build and testing. IEC and IS compliant. Type-tested with full QAP, FAT support and export documentation.',
  },
  {
    pre: 'Supplier qualification ready',
    main: 'A long-term manufacturing partner for power and motion systems.',
    sub: 'Four product groups covering magnetics, control panels, power electronics and cross-segment components. One engineering team from feasibility to series production.',
  },
];

/* ============================================================
   Sub-category detail map (keyed by code)
   ============================================================ */
const SUBCAT_DETAIL = {
  /* Magnetics */
  '01.1': {
    description: 'Low-voltage distribution and isolation transformers for industrial sub-distribution, control supply and signal isolation. Cast resin and dry-type options.',
    applications: ['Industrial sub-distribution', 'Control supply circuits', 'Signal and load isolation', 'Auxiliary supply for panels'],
    specs: [
      { k: 'Rating range',   v: '50 VA to 2.5 MVA' },
      { k: 'Voltage class',  v: 'up to 1.1 kV' },
      { k: 'Insulation',     v: 'Class B, F or H' },
      { k: 'Cooling',        v: 'AN or AF' },
      { k: 'Enclosure',      v: 'Indoor IP 21, outdoor up to IP 54' },
      { k: 'Tests',          v: 'Routine, type tests where applicable' },
      { k: 'Standards',      v: 'IEC 60076, IS 2026' },
      { k: 'Custom options', v: 'Tap changers, shielding, low-loss core' },
      { k: 'Datasheet',      v: 'On request' },
    ],
    industries: ['powergrid', 'heavy', 'datacenter', 'mhe'],
  },
  '01.2': {
    description: 'Medium-voltage distribution and special-purpose transformers for industrial substations, traction power and renewable inverter stations. Cast resin and oil-filled options.',
    applications: ['Industrial substations', 'Traction power supply', 'Renewable inverter stations', 'Captive power plants'],
    specs: [
      { k: 'Rating range',   v: '100 kVA to 5 MVA' },
      { k: 'Voltage class',  v: '3.3 kV to 36 kV' },
      { k: 'Insulation',     v: 'Cast resin or mineral oil' },
      { k: 'Cooling',        v: 'AN, AF, ONAN, ONAF' },
      { k: 'Enclosure',      v: 'Indoor or outdoor, IP rated' },
      { k: 'Tests',          v: 'Routine, type tests through accredited labs where applicable' },
      { k: 'Standards',      v: 'IEC 60076, IS 2026' },
      { k: 'Custom options', v: 'Off-load taps, special impedance, low losses' },
      { k: 'Datasheet',      v: 'On request' },
    ],
    industries: ['powergrid', 'renewables', 'railways', 'heavy'],
  },
  '01.3': {
    description: 'K-factor transformers for non-linear and harmonic-rich loads. Built for IT power chains, drive-fed circuits and harmonic-sensitive environments.',
    applications: ['Data centre IT power', 'Drive-fed loads', 'Harmonic-rich environments', 'UPS interface'],
    specs: [
      { k: 'Rating range',   v: '50 kVA to 2.5 MVA' },
      { k: 'K-factor',       v: 'K4, K13, K20 per application' },
      { k: 'Voltage class',  v: 'LV to 11 kV' },
      { k: 'Insulation',     v: 'Class F or H' },
      { k: 'Cooling',        v: 'AN or AF' },
      { k: 'Tests',          v: 'Routine plus K-factor verification, where applicable' },
      { k: 'Standards',      v: 'IEC 60076, IEEE C57.110 inputs' },
      { k: 'Custom options', v: 'Electrostatic shield, low-noise core' },
      { k: 'Datasheet',      v: 'On request' },
    ],
    industries: ['datacenter', 'heavy', 'powergrid'],
  },
  '01.4': {
    description: 'Open-wound air-core reactors with no magnetic saturation, lower losses and minimal magnetic interference. Aluminium or copper construction, suitable for indoor and outdoor installation. Engineered for reactive compensation, harmonic filtering and inrush current limiting in renewable energy, traction and industrial applications.',
    applications: ['Fault current limiting', 'Harmonic filtering and capacitor bank protection', 'Voltage stabilisation and grid reliability', 'Power factor correction', 'Reactive power compensation', 'Renewable energy grid integration'],
    specs: [
      { k: 'Rated current',     v: 'up to 2000 A' },
      { k: 'System voltage',    v: '36 kV' },
      { k: 'Insulation level',  v: '70 / 250 kV' },
      { k: 'Insulation class',  v: 'Class B, F and H' },
      { k: 'Construction',      v: 'Aluminium or copper winding' },
      { k: 'Cooling',           v: 'Air Natural (AN) or Air Forced (AF)' },
      { k: 'Tests',             v: 'Routine, type tests where applicable' },
      { k: 'Standards',         v: 'IEC 60076-6' },
      { k: 'Datasheet',         v: 'On request' },
    ],
    industries: ['renewables', 'powergrid', 'railways', 'heavy'],
  },
  '01.5': {
    description: 'Oil-cooled reactors and furnace transformers for higher-rating industrial and grid applications. Dry-type and oil-cooled variants available, single and three-phase, with cooling modes suited to continuous heavy-duty operation.',
    applications: ['Furnace duty reactive compensation', 'Industrial substation grid damping', 'Large reactive compensation', 'Captive power plant support'],
    specs: [
      { k: 'Rating range',   v: 'up to 5 MVA' },
      { k: 'Primary voltage', v: 'up to 11 kV' },
      { k: 'Phases',         v: 'Single and three-phase' },
      { k: 'Cooling',        v: 'ONAN, OFWF, AN, AF' },
      { k: 'Vector group',   v: 'As per requirement' },
      { k: 'Tests',          v: 'Routine, type tests where applicable' },
      { k: 'Standards',      v: 'IS 2026, IS 11171, IEC 60076' },
      { k: 'Datasheet',      v: 'On request' },
    ],
    industries: ['powergrid', 'renewables', 'heavy'],
  },
  '01.6': {
    description: 'Three-phase inductors connected in series with power factor correction capacitors to form a resonant circuit tuned below the dominant harmonic frequency. Prevents parallel resonance with the supply network, eliminates harmonic amplification, reduces overheating of transformers and switchgear, and extends capacitor service life.',
    applications: ['Harmonic filtering and capacitor bank protection', 'Power factor correction in harmonic-rich environments', 'Renewable energy plant reactive compensation', 'Industrial drive and VFD installations'],
    specs: [
      { k: 'Network voltage',    v: '230 V, 400 V or 690 V, 50 Hz' },
      { k: 'Impedance / tuning', v: '5.70% (4.2), 7% (3.8), 14% (2.7)' },
      { k: 'Rating range',       v: '6.5 kVAR to 100 kVAR per step' },
      { k: 'Insulation class',   v: 'Class F or H' },
      { k: 'Cooling',            v: 'Natural air' },
      { k: 'Tests',              v: 'Routine, type tests where applicable' },
      { k: 'Datasheet',          v: 'On request' },
    ],
    industries: ['heavy', 'powergrid', 'renewables', 'datacenter'],
  },

  /* Control Panel Assemblies */
  '02.1': {
    description: 'Onboard locomotive control panels for rolling stock OEMs. Engineered for traction power management, vehicle control logic and onboard protection.',
    applications: ['Traction propulsion control', 'Onboard auxiliary control', 'Protection and interlocking', 'Vehicle management interface'],
    specs: [
      { k: 'Voltage class',  v: 'LV with traction bus inputs' },
      { k: 'Enclosure',      v: 'IP rated, vibration-tolerant' },
      { k: 'Insulation',     v: 'Per EN 50155 inputs' },
      { k: 'Cooling',        v: 'Natural or forced air' },
      { k: 'Tests',          v: 'Routine plus vibration and EMC, where applicable' },
      { k: 'Standards',      v: 'IRS, RDSO, EN 50155 inputs' },
      { k: 'Custom options', v: 'Customer-specific HMI and protection logic' },
      { k: 'Datasheet',      v: 'On request' },
    ],
    industries: ['railways'],
  },
  '02.2': {
    description: 'Driver desk consoles and operator HMI assemblies for rolling stock cabs. Built for ergonomic, vibration and visibility requirements.',
    applications: ['Locomotive cab consoles', 'Metro driver desks', 'Train operator HMI', 'Onboard control terminals'],
    specs: [
      { k: 'Construction',   v: 'Welded sheet steel, powder coated' },
      { k: 'Enclosure',      v: 'IP rated, vibration-tolerant' },
      { k: 'Mounting',       v: 'Cab integration as per OEM drawing' },
      { k: 'Tests',          v: 'Routine plus vibration and EMC, where applicable' },
      { k: 'Standards',      v: 'IRS, RDSO, EN 50155 inputs' },
      { k: 'Custom options', v: 'Custom switch layouts and labelling' },
      { k: 'Datasheet',      v: 'On request' },
    ],
    industries: ['railways'],
  },
  '02.3': {
    description: 'Power distribution units for industrial, traction and IT applications. Engineered to IEC 61439 with custom layouts per buyer specification.',
    applications: ['Industrial power distribution', 'Onboard PDUs for traction', 'IT and data centre power', 'Auxiliary distribution'],
    specs: [
      { k: 'Current rating', v: 'up to 6300 A' },
      { k: 'Form',           v: 'Form 2, 3b or 4b' },
      { k: 'Enclosure',      v: 'IP 31 to IP 54' },
      { k: 'Tests',          v: 'Routine and type, IEC 61439' },
      { k: 'Standards',      v: 'IEC 61439-1, 61439-2' },
      { k: 'Custom options', v: 'Bus options, metering and protection layouts' },
      { k: 'Datasheet',      v: 'On request' },
    ],
    industries: ['railways', 'heavy', 'datacenter', 'powergrid'],
  },
  '02.4': {
    description: 'LV and MV main and sub-distribution power panels. Built, wired and tested to IEC 61439 with full GA, BoM and FAT documentation.',
    applications: ['Main and sub-distribution', 'Motor control centres', 'Industrial automation', 'Process plant electrification'],
    specs: [
      { k: 'Current rating', v: 'up to 6300 A' },
      { k: 'Voltage class',  v: 'LV up to 1.1 kV, MV variants on request' },
      { k: 'Form',           v: 'Form 2, 3b or 4b' },
      { k: 'Enclosure',      v: 'IP 31 to IP 54' },
      { k: 'Tests',          v: 'Routine and type tested assembly' },
      { k: 'Standards',      v: 'IEC 61439-1, 61439-2' },
      { k: 'Custom options', v: 'Custom layouts, drive and PLC integration' },
      { k: 'Datasheet',      v: 'On request' },
    ],
    industries: ['heavy', 'powergrid', 'datacenter', 'renewables'],
  },

  /* Power Electronics Systems */
  '03.1': {
    description: 'DC1 single-phase and DC3 three-phase microcontroller-based battery chargers for forklift, AGV and warehouse fleet operations. SCR-controlled taper current charging to DIN 41772 profile, with normal and opportunity charging modes. Compatible with Lead-Acid, Trojan and VRLA batteries. Prevents overcharging and undercharging automatically.',
    applications: ['Forklift fleet charging', 'AGV depot charging', 'Cold-chain warehousing', 'E-commerce fulfilment centres'],
    specs: [
      { k: 'DC1 output voltage', v: '12 V to 72 V DC (single-phase)' },
      { k: 'DC1 output current', v: '10 A to 70 A' },
      { k: 'DC3 output voltage', v: '24 V to 120 V DC (three-phase)' },
      { k: 'DC3 output current', v: '50 A to 200 A' },
      { k: 'Chemistries',        v: 'Lead-Acid, Trojan, VRLA' },
      { k: 'Recharge time',      v: '8–9 hours or 11–12 hours' },
      { k: 'Charging standard',  v: 'DIN 41772 profile' },
      { k: 'Tests',              v: 'Functional, burn-in, charging profile verification' },
      { k: 'Datasheet',          v: 'On request' },
    ],
    industries: ['mhe'],
  },
  '03.2': {
    description: 'Float cum boost chargers for substation auxiliary battery banks and utility DC backup. Designed for continuous-duty service.',
    applications: ['Substation auxiliary supply', 'Utility DC battery banks', 'Switchyard control supply', 'Industrial DC backup'],
    specs: [
      { k: 'Output voltage', v: '24 V to 220 V DC' },
      { k: 'Output current', v: '10 A to 400 A' },
      { k: 'Modes',          v: 'Float, boost, manual or auto' },
      { k: 'Connectivity',   v: 'Modbus or RS485' },
      { k: 'Tests',          v: 'Routine plus burn-in, where applicable' },
      { k: 'Standards',      v: 'IEEE 946 and IEC 60146 inputs' },
      { k: 'Custom options', v: 'Redundant modules, alarm contacts, remote signalling' },
      { k: 'Datasheet',      v: 'On request' },
    ],
    industries: ['powergrid', 'railways', 'heavy'],
  },
  '03.3': {
    description: 'Battery chargers for special applications such as traction, marine, defence and specialised industrial use. Engineered to customer specifications.',
    applications: ['Traction onboard charging', 'Marine vessel auxiliary', 'Defence platforms', 'Specialised industrial DC'],
    specs: [
      { k: 'Output voltage', v: 'per application, up to 750 V DC' },
      { k: 'Output current', v: 'per application' },
      { k: 'Topology',       v: 'IGBT or SiC based' },
      { k: 'Enclosure',      v: 'Ruggedised, application-specific' },
      { k: 'Tests',          v: 'Routine, type tests as per QAP' },
      { k: 'Standards',      v: 'EN 50155, MIL inputs, marine class as applicable' },
      { k: 'Custom options', v: 'Full engineering co-design with platform owner' },
      { k: 'Datasheet',      v: 'On request' },
    ],
    industries: ['railways', 'powergrid'],
  },

  /* Cross-Segment Solutions */
  '04.1': {
    description: 'Copper and aluminium busbars and extrusions, precision-processed on CNC equipment: double-column shear cutting (no burrs, no waste), six-mode turnplate punching and Siemens-controlled bending. Ready to install — no on-site drilling required. Tin, Nickel or Silver plating available as surface finish.',
    applications: ['Panel internal busbars and DC links', 'Switchgear and switchboard distribution', 'Industrial power distribution systems', 'Railway traction and rolling stock assemblies'],
    specs: [
      { k: 'Materials',       v: 'Copper and aluminium bars and extrusions' },
      { k: 'Size range',      v: '12×2 mm to 200×15 mm' },
      { k: 'Surface finish',  v: 'Tin, Nickel or Silver plating' },
      { k: 'Processing',      v: 'CNC cut, punch and Siemens-controlled bend' },
      { k: 'Tests',           v: 'Conductivity verification, visual and dimensional' },
      { k: 'Standards',       v: 'IS 3052, IS 613, IS 1897, BS EN 13601, IEC 61439' },
      { k: 'Datasheet',       v: 'On request' },
    ],
    industries: ['railways', 'heavy', 'datacenter', 'powergrid'],
  },
  '04.2': {
    description: 'In-house wire harness manufacturing using automated cutting and stripping, automatic crimping and ferrule printing machines. Each harness is assembled to electrical schematic and GA drawings, crimp pull tested, continuity verified and performance tested before final inspection. Skilled wiring technicians with certified operator qualification and standardised torquing process.',
    applications: ['Rolling stock and locomotive wiring looms', 'Control panel internal harnesses', 'Industrial OEM wiring assemblies', 'Specialised equipment and defence wiring'],
    specs: [
      { k: 'Cutting and stripping', v: 'Automatic CNC wire cutting and stripping machine' },
      { k: 'Crimping',              v: 'Automatic crimping machine with uniform crimp quality' },
      { k: 'Identification',        v: 'Ferrule printer for clear wire labelling' },
      { k: 'Quality check',         v: 'Crimp pull tester for connection reliability' },
      { k: 'Tests',                 v: 'Continuity test and performance test on every harness' },
      { k: 'Inspection',            v: 'Final visual and fitment check before dispatch' },
      { k: 'Datasheet',             v: 'On request' },
    ],
    industries: ['railways', 'heavy', 'mhe'],
  },
  '04.3': {
    description: 'Online double-conversion UPS systems from 1 kVA to 250 kVA. Pure sinewave output from a high-frequency IGBT inverter with in-built isolation transformer. Supports 1Ph-1Ph, 3Ph-1Ph and 3Ph-3Ph configurations. Compatible with diesel generators, with optional SNMP monitoring and bidirectional static switch for redundant system deployments.',
    applications: ['Critical IT and data centre loads', 'Industrial control and automation backup', 'Substation and utility auxiliary supply', 'Frequency converter applications'],
    specs: [
      { k: 'Rating range',    v: '1 kVA to 250 kVA' },
      { k: 'Configurations',  v: '1Ph-1Ph, 3Ph-1Ph, 3Ph-3Ph' },
      { k: 'Output waveform', v: 'Pure sinewave' },
      { k: 'Inverter',        v: 'High-frequency IGBT' },
      { k: 'Isolation',       v: 'In-built isolation transformer' },
      { k: 'THD',             v: '≤5% linear loads, ≤8% non-linear loads' },
      { k: 'Overload',        v: '125% for 10 min, 150% for 1 min' },
      { k: 'Monitoring',      v: 'Optional SNMP, LCD display panel' },
      { k: 'Tests',           v: 'Functional, burn-in, transfer time verification' },
      { k: 'Datasheet',       v: 'On request' },
    ],
    industries: ['datacenter', 'heavy', 'railways'],
  },
  '04.4': {
    description: 'Onboard driver display and HMI units for traction and specialised equipment. Built for cab integration, vibration and visibility requirements.',
    applications: ['Locomotive driver display', 'Metro cab HMI', 'Specialised vehicle display', 'Operator HMI'],
    specs: [
      { k: 'Display size',   v: '7 inch to 15 inch typical' },
      { k: 'Brightness',     v: 'Sunlight readable' },
      { k: 'Interfaces',     v: 'CAN, Ethernet, MVB inputs' },
      { k: 'Tests',          v: 'Vibration, EMC, temperature cycling' },
      { k: 'Standards',      v: 'EN 50155 inputs' },
      { k: 'Custom options', v: 'Customer HMI design, multi-language' },
      { k: 'Datasheet',      v: 'On request' },
    ],
    industries: ['railways'],
  },
  '04.5': {
    description: 'Hall-effect and shunt-based current sensing modules for protection, metering and feedback in power electronics and panels.',
    applications: ['Drive feedback', 'Protection relaying', 'Metering circuits', 'Battery management'],
    specs: [
      { k: 'Range',          v: '5 A to 4000 A' },
      { k: 'Topology',       v: 'Open or closed loop Hall, shunt-based' },
      { k: 'Accuracy class', v: 'Class 0.5 to Class 1' },
      { k: 'Output',         v: 'Analog, digital, isolated' },
      { k: 'Tests',          v: 'Calibration against traceable references' },
      { k: 'Standards',      v: 'IEC 60044, IEC 61869 inputs' },
      { k: 'Custom options', v: 'Custom housings, calibration certificates' },
      { k: 'Datasheet',      v: 'On request' },
    ],
    industries: ['railways', 'renewables', 'heavy', 'powergrid'],
  },
  '04.6': {
    description: 'Isolated and non-isolated DC-DC conversion modules for onboard, industrial and power-supply applications. Application-specific design and packaging.',
    applications: ['Onboard auxiliary supplies', 'Battery system DC-DC', 'Industrial control supply', 'Sensor power'],
    specs: [
      { k: 'Input voltage',  v: '24 V to 1500 V DC, application-specific' },
      { k: 'Output voltage', v: 'application-specific' },
      { k: 'Power range',    v: '50 W to 10 kW per module' },
      { k: 'Isolation',      v: 'Isolated or non-isolated topologies' },
      { k: 'Tests',          v: 'Functional, efficiency, burn-in' },
      { k: 'Standards',      v: 'EN 50155, IEC 61287 inputs' },
      { k: 'Custom options', v: 'Custom firmware, cooling and packaging' },
      { k: 'Datasheet',      v: 'On request' },
    ],
    industries: ['railways', 'heavy', 'renewables'],
  },
  '04.7': {
    description: 'Onboard fire detection units for rolling stock, panel cabinets and specialised installations. Multi-sensor configurations with fault and alarm outputs.',
    applications: ['Rolling stock onboard detection', 'Panel and switchgear cabinets', 'Critical equipment rooms', 'Specialised installations'],
    specs: [
      { k: 'Sensor types',   v: 'Smoke, heat, multi-criteria' },
      { k: 'Outputs',        v: 'Volt-free fault and alarm contacts' },
      { k: 'Power supply',   v: '24 V to 110 V DC, application-specific' },
      { k: 'Enclosure',      v: 'Vibration-tolerant, IP rated' },
      { k: 'Tests',          v: 'Functional plus environmental, where applicable' },
      { k: 'Standards',      v: 'EN 45545, EN 50155 inputs' },
      { k: 'Custom options', v: 'Custom interfaces and multi-zone logic' },
      { k: 'Datasheet',      v: 'On request' },
    ],
    industries: ['railways', 'heavy'],
  },
  '04.8': {
    description: 'Overvoltage protection relays for traction and utility applications. Built for fast response and reliable trip behaviour under transient conditions.',
    applications: ['Traction overvoltage protection', 'Utility transient protection', 'Critical load isolation', 'Battery system protection'],
    specs: [
      { k: 'Voltage range',  v: 'LV to MV, application-specific' },
      { k: 'Trip behaviour', v: 'Fast response, definite time' },
      { k: 'Outputs',        v: 'Volt-free trip contacts, signalling' },
      { k: 'Tests',          v: 'Functional, transient response' },
      { k: 'Standards',      v: 'IEC 60255 inputs' },
      { k: 'Custom options', v: 'Custom set points and signalling logic' },
      { k: 'Datasheet',      v: 'On request' },
    ],
    industries: ['railways', 'powergrid'],
  },
};

const QUALIFICATION = [
  { num: '01', title: 'Documentation pack',    body: 'QAP, GA drawings, BoM, datasheets, routine and type test reports, FAT protocol and material traceability on request.' },
  { num: '02', title: 'Standards compliance',  body: 'Designs and tests aligned with IEC 60076, IEC 61439, IEC 60068, IS 2026 and customer-specific specifications.' },
  { num: '03', title: 'In-house testing',      body: 'Routine testing on every unit. Type testing on-site for HV, partial discharge, temperature rise and impulse. Accredited external labs for type approvals.' },
  { num: '04', title: 'Export readiness',      body: 'Seaworthy packing, country of origin documentation, INCOTERMS support and CE marking pathway for European projects.' },
];

/* ============================================================
   Anonymous case study content (no project or client names)
   ============================================================ */
const CASE_STUDIES = [
  {
    tag: 'Railway equipment application',
    title: 'Auxiliary converter magnetics for metro rolling stock.',
    productGroup: 'Magnetics',
    buyerNeed: 'Vibration-tolerant magnetics on a fixed delivery schedule, qualified for onboard duty cycles.',
    quality: 'Type tests for vibration, impulse and temperature rise. Documentation aligned with rolling stock acceptance requirements.',
  },
  {
    tag: 'Renewable energy application',
    title: 'Harmonic filter reactors for a utility-scale solar plant.',
    productGroup: 'Magnetics',
    buyerNeed: 'Air-core reactor banks at the inverter station, validated for 25-year project life.',
    quality: 'Routine and type tests against IEC 60289 inputs. Documentation aligned with EPC handover. Subject to engineering review for site conditions.',
  },
  {
    tag: 'Power utility application',
    title: 'MV distribution transformers and substation panels.',
    productGroup: 'Magnetics + Control Panel Assemblies',
    buyerNeed: 'Type-tested transformers and IEC 61439 distribution panels for an industrial substation upgrade.',
    quality: 'Routine tests on every unit. Type tests through accredited external lab. Third-party witness inspection at hold points.',
  },
  {
    tag: 'Industrial automation application',
    title: 'Drive cabinets and isolation transformers for a heavy machine builder.',
    productGroup: 'Control Panel Assemblies + Magnetics',
    buyerNeed: 'Wired and tested cabinets with motor isolation, integrated with the customer drive platform.',
    quality: 'Stage inspection per customer QAP. FAT protocol agreed in advance. Material traceability supplied with dispatch.',
  },
  {
    tag: 'Material handling equipment application',
    title: 'High-frequency chargers for a multi-site forklift fleet.',
    productGroup: 'Power Electronics Systems',
    buyerNeed: 'Opportunity charging across two battery chemistries with fleet management integration.',
    quality: 'Functional, efficiency and burn-in tests. Documentation aligned with destination market requirements, where applicable.',
  },
  {
    tag: 'Data center power support application',
    title: 'K-rated isolation transformers and PDUs for an IT power chain.',
    productGroup: 'Magnetics + Control Panel Assemblies',
    buyerNeed: 'Harmonic-tolerant isolation transformers and audit-ready PDUs for a critical-load deployment.',
    quality: 'K-factor verification on magnetics, where applicable. IEC 61439 routine tests on assemblies. Documentation prepared for audit and acceptance.',
  },
];

/* ============================================================
   Reusable CaseStudyGrid component
   ============================================================ */
function CaseStudyGrid({ items = CASE_STUDIES, limit }) {
  const data = limit ? items.slice(0, limit) : items;
  return (
    <div className="case-grid">
      {data.map((c, i) => (
        <article className="case-card" key={i}>
          <div className="case-tag">{c.tag}</div>
          <h3>{c.title}</h3>
          <div className="case-section">
            <div className="case-label">Product group</div>
            <div className="case-value">{c.productGroup}</div>
          </div>
          <div className="case-section">
            <div className="case-label">Buyer need</div>
            <div className="case-value">{c.buyerNeed}</div>
          </div>
          <div className="case-section">
            <div className="case-label">Quality or documentation consideration</div>
            <div className="case-value">{c.quality}</div>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ============================================================
   Reveal hook
   ============================================================ */
function useReveal() {
  React.useLayoutEffect(() => {
    let cancelled = false;
    let io = null;

    const setup = () => {
      if (cancelled) return;
      const els = document.querySelectorAll('.reveal:not(.is-visible)');
      if (!('IntersectionObserver' in window)) {
        els.forEach(el => el.classList.add('is-visible'));
        return;
      }
      io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      els.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          el.classList.add('is-visible');
        } else {
          io.observe(el);
        }
      });
    };

    const raf1 = requestAnimationFrame(() => requestAnimationFrame(setup));

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      if (io) io.disconnect();
    };
  }, []);
}

/* ============================================================
   Animated counter
   ============================================================ */
function Counter({ to, suffix = '', duration = 1400 }) {
  const [val, setVal] = React.useState(0);
  const ref = React.useRef(null);
  const [start, setStart] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStart(true); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVal(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to, duration]);

  return <span ref={ref} className="mono-num">{val}{suffix}</span>;
}

/* ============================================================
   Engineering abstract visual (SVG)
   ============================================================ */
function EngineeringVisual({ variant = 'grid' }) {
  return (
    <svg viewBox="0 0 600 660" className="eng-svg" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <pattern id="dynaGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(14,17,22,0.06)" strokeWidth="1" />
        </pattern>
        <pattern id="dynaGridMajor" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(14,17,22,0.12)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="600" height="660" fill="var(--bg-card)" />
      <rect width="600" height="660" fill="url(#dynaGrid)" />
      <rect width="600" height="660" fill="url(#dynaGridMajor)" />
      <g transform="translate(300 330)" fill="none" stroke="var(--ink)" strokeWidth="1">
        <circle r="40" />
        <circle r="80" />
        <circle r="120" strokeOpacity="0.7" />
        <circle r="160" strokeOpacity="0.5" />
        <circle r="200" strokeOpacity="0.3" />
        <circle r="240" strokeOpacity="0.15" />
      </g>
      <g stroke="var(--accent)" strokeWidth="1.5" fill="none">
        <path d="M 60 330 L 180 330" />
        <path d="M 420 330 L 540 330" />
        <circle cx="180" cy="330" r="3" fill="var(--accent)" />
        <circle cx="420" cy="330" r="3" fill="var(--accent)" />
      </g>
      <path d="M 60 540 Q 105 500 150 540 T 240 540 T 330 540 T 420 540 T 510 540 T 540 540"
            fill="none" stroke="var(--accent-2)" strokeWidth="1.5" />
      <g stroke="var(--ink)" strokeWidth="1">
        <line x1="60" y1="60" x2="60" y2="80" />
        <line x1="60" y1="60" x2="80" y2="60" />
        <line x1="540" y1="60" x2="540" y2="80" />
        <line x1="540" y1="60" x2="520" y2="60" />
        <line x1="60" y1="600" x2="60" y2="580" />
        <line x1="60" y1="600" x2="80" y2="600" />
        <line x1="540" y1="600" x2="540" y2="580" />
        <line x1="540" y1="600" x2="520" y2="600" />
      </g>
      <g fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--ink-muted)" letterSpacing="1">
        <text x="60" y="50">FIG. 01 / CORE TOPOLOGY</text>
        <text x="60" y="640">f = 50 / 60 Hz</text>
        <text x="540" y="640" textAnchor="end">DYN-01.A</text>
      </g>
    </svg>
  );
}

/* ============================================================
   Footer
   ============================================================ */
function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <img className="footer-logo" src={(window.__resources && window.__resources.dynaLogoReversed) || "assets/dynalektric-logo-reversed2.png"} alt="Dynalektric logo" width="320" height="200" loading="lazy" />
            <p className="footer-tag">Magnetics, control panels, power electronics and cross-segment components. Engineered in India for industrial, power, railway, renewable and material handling applications worldwide.</p>
          </div>
          <div className="footer-col">
            <h4>Sitemap</h4>
            <nav aria-label="Footer navigation">
              <ul>
                <li><a href="./Dynalektric.html">Home</a></li>
                <li><a href="./about.html">About</a></li>
                <li><a href="./products-solutions.html">Products &amp; Solutions</a></li>
                <li><a href="./innovation-rd.html">Innovation Portfolio</a></li>
                <li><a href="./industries-applications.html">Industries &amp; Applications</a></li>
                <li><a href="./export.html">Export</a></li>
                <li><a href="./contact.html">Contact</a></li>
              </ul>
            </nav>
          </div>
          <div className="footer-col">
            <h4>Product groups</h4>
            <ul>
              {PRODUCTS.map(p => (
                <li key={p.id}><a href={`./products-solutions.html?focus=${p.id}`}>{p.name}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Enquiries</h4>
            <ul>
              <li><a>+91 (placeholder)</a></li>
              <li><a>sales01@dynalektric.com</a></li>
              <li><a>enquiry@dynalektric.com</a></li>
              <li><a href="./contact.html">Submit RFQ →</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {currentYear} Dynalektric · Power · Motion · Safety</span>
          <span>Engineered in India · Exported worldwide</span>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   Final CTA strip
   ============================================================ */
function FinalCTA({
  navigate,
  eyebrow = 'RFQ and enquiry',
  heading = 'Send a specification. Get an engineering response in one business day.',
  body = 'Share your application, ratings, environment and timeline. Our engineering team replies with feasibility, indicative pricing and the relevant datasheets.',
  primaryLabel = 'Submit RFQ',
  primaryTo = 'contact',
  secondaryLabel = 'Browse products',
  secondaryTo = 'products',
  tertiaryLabel = null,
  tertiaryTo = 'contact',
}) {
  return (
    <section className="section reveal" style={{ paddingTop: 'calc(var(--section-y) * 1.2)', paddingBottom: 'calc(var(--section-y) * 1.2)' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto' }}>
        <div className="mono" style={{ marginBottom: 24, color: 'var(--accent)' }}>{eyebrow}</div>
        <h2 style={{ marginBottom: 32 }}>{heading}</h2>
        <p className="lead" style={{ margin: '0 auto 40px', textAlign: 'center' }}>
          {body}
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => navigate(primaryTo)}>
            {primaryLabel} <span className="arrow">→</span>
          </button>
          <button className="btn btn-secondary" onClick={() => navigate(secondaryTo)}>
            {secondaryLabel}
          </button>
        </div>
        {tertiaryLabel && (
          <div style={{ marginTop: 24 }}>
            <button
              className="mono"
              onClick={() => navigate(tertiaryTo)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)', textDecoration: 'underline', textUnderlineOffset: 4, padding: 4, fontSize: 13 }}
            >
              {tertiaryLabel}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* expose to window */
Object.assign(window, {
  PRODUCTS, INDUSTRIES, CERTIFICATIONS, STATS, HERO_HEADLINES, QUALIFICATION,
  CASE_STUDIES, SUBCAT_DETAIL,
  useReveal, Counter, EngineeringVisual, Footer, FinalCTA, CaseStudyGrid,
});
