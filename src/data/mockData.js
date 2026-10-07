// AB Apartments Kilimani - Comprehensive Real Estate Mock & Seed Data
// Location: Kindaruma Road, off Ring Road Kilimani, Nairobi, Kenya

export const PROPERTY_INFO = {
  name: "AB Apartments Kilimani",
  tagline: "Executive Urban Residences & Luxury Suites",
  address: "Plot 24, Kindaruma Road, Kilimani, Nairobi",
  county: "Nairobi City County",
  postalCode: "P.O. Box 48291 - 00100, Nairobi",
  blocks: ["Block A (Sunburst Wing)", "Block B (Jacaranda Wing)"],
  floors: 6,
  totalUnits: 48,
  yearBuilt: 2023,
  amenities: [
    "Heated Rooftop Infinity Pool",
    "Equipped Rooftop Fitness Gym",
    "Borehole with RO Filtration System",
    "Standby Automatic Generator (Cummins 250kVA)",
    "Dual High-Speed Schindler Elevators",
    "Biometric & RFID Access Control",
    "24/7 Manned Security & CCTV Surveillance",
    "Dedicated Electric Vehicle Charging Spots",
    "High-Speed Safaricom & Zuku Fiber Ready",
    "Solar Water Heating Backup"
  ],
  contacts: {
    propertyManager: "Patrick Kariuki",
    managerPhone: "+254 722 980 120",
    managerEmail: "management@abapartmentskilimani.co.ke",
    caretaker: "Francis Mwangi",
    caretakerPhone: "+254 711 445 522",
    securityDesk: "+254 733 998 811",
    policeKilimani: "020 272 2452 / 999"
  },
  billing: {
    mpesaPaybill: "408920",
    mpesaAccountPrefix: "Unit No (e.g. A302)",
    mpesaTillNumber: "982145",
    bankName: "NCBA Bank Kenya PLC",
    bankBranch: "Upper Hill Branch",
    accountNumber: "1002938471001",
    swiftCode: "NCBAKENX",
    defaultDueDateDay: 5,
    lateFeePercentage: 5,
    waterRatePerUnit: 160 // KES per cubic meter
  }
};

// Generate 48 realistic units (24 in Block A, 24 in Block B)
export const INITIAL_UNITS = [
  // Block A (Sunburst Wing) - 4 units per floor x 6 floors = 24 units
  // Floor 1
  { id: "A101", block: "Block A", floor: 1, type: "Studio", sqm: 45, baseRent: 50000, serviceCharge: 6000, status: "occupied", kplcMeter: "44109820-01", waterMeter: "WTR-A101", balcony: true, dsq: false, furnished: false },
  { id: "A102", block: "Block A", floor: 1, type: "1-Bedroom", sqm: 68, baseRent: 70000, serviceCharge: 7500, status: "occupied", kplcMeter: "44109820-02", waterMeter: "WTR-A102", balcony: true, dsq: false, furnished: false },
  { id: "A103", block: "Block A", floor: 1, type: "2-Bedroom Deluxe", sqm: 110, baseRent: 100000, serviceCharge: 9000, status: "occupied", kplcMeter: "44109820-03", waterMeter: "WTR-A103", balcony: true, dsq: false, furnished: false },
  { id: "A104", block: "Block A", floor: 1, type: "2-Bedroom Deluxe", sqm: 115, baseRent: 105000, serviceCharge: 9000, status: "vacant", kplcMeter: "44109820-04", waterMeter: "WTR-A104", balcony: true, dsq: false, furnished: false },
  // Floor 2
  { id: "A201", block: "Block A", floor: 2, type: "Studio", sqm: 45, baseRent: 50000, serviceCharge: 6000, status: "occupied", kplcMeter: "44109820-05", waterMeter: "WTR-A201", balcony: true, dsq: false, furnished: false },
  { id: "A202", block: "Block A", floor: 2, type: "1-Bedroom", sqm: 68, baseRent: 72000, serviceCharge: 7500, status: "occupied", kplcMeter: "44109820-06", waterMeter: "WTR-A202", balcony: true, dsq: false, furnished: false },
  { id: "A203", block: "Block A", floor: 2, type: "2-Bedroom Deluxe", sqm: 112, baseRent: 100000, serviceCharge: 9000, status: "maintenance", kplcMeter: "44109820-07", waterMeter: "WTR-A203", balcony: true, dsq: false, furnished: false },
  { id: "A204", block: "Block A", floor: 2, type: "2-Bedroom Deluxe", sqm: 115, baseRent: 105000, serviceCharge: 9000, status: "occupied", kplcMeter: "44109820-08", waterMeter: "WTR-A204", balcony: true, dsq: false, furnished: false },
  // Floor 3
  { id: "A301", block: "Block A", floor: 3, type: "Studio", sqm: 46, baseRent: 52000, serviceCharge: 6000, status: "occupied", kplcMeter: "44109820-09", waterMeter: "WTR-A301", balcony: true, dsq: false, furnished: false },
  { id: "A302", block: "Block A", floor: 3, type: "1-Bedroom", sqm: 70, baseRent: 75000, serviceCharge: 8000, status: "occupied", kplcMeter: "44109820-10", waterMeter: "WTR-A302", balcony: true, dsq: false, furnished: false },
  { id: "A303", block: "Block A", floor: 3, type: "2-Bedroom Deluxe", sqm: 115, baseRent: 105000, serviceCharge: 9000, status: "occupied", kplcMeter: "44109820-11", waterMeter: "WTR-A303", balcony: true, dsq: false, furnished: false },
  { id: "A304", block: "Block A", floor: 3, type: "2-Bedroom Deluxe", sqm: 118, baseRent: 108000, serviceCharge: 9000, status: "occupied", kplcMeter: "44109820-12", waterMeter: "WTR-A304", balcony: true, dsq: false, furnished: false },
  // Floor 4
  { id: "A401", block: "Block A", floor: 4, type: "Studio", sqm: 46, baseRent: 52000, serviceCharge: 6000, status: "vacant", kplcMeter: "44109820-13", waterMeter: "WTR-A401", balcony: true, dsq: false, furnished: false },
  { id: "A402", block: "Block A", floor: 4, type: "1-Bedroom", sqm: 70, baseRent: 75000, serviceCharge: 8000, status: "occupied", kplcMeter: "44109820-14", waterMeter: "WTR-A402", balcony: true, dsq: false, furnished: false },
  { id: "A403", block: "Block A", floor: 4, type: "2-Bedroom Deluxe", sqm: 118, baseRent: 110000, serviceCharge: 9500, status: "occupied", kplcMeter: "44109820-15", waterMeter: "WTR-A403", balcony: true, dsq: false, furnished: false },
  { id: "A404", block: "Block A", floor: 4, type: "2-Bedroom Deluxe", sqm: 120, baseRent: 110000, serviceCharge: 9500, status: "occupied", kplcMeter: "44109820-16", waterMeter: "WTR-A404", balcony: true, dsq: false, furnished: false },
  // Floor 5
  { id: "A501", block: "Block A", floor: 5, type: "1-Bedroom", sqm: 72, baseRent: 78000, serviceCharge: 8000, status: "occupied", kplcMeter: "44109820-17", waterMeter: "WTR-A501", balcony: true, dsq: false, furnished: false },
  { id: "A502", block: "Block A", floor: 5, type: "2-Bedroom Deluxe", sqm: 120, baseRent: 115000, serviceCharge: 9500, status: "occupied", kplcMeter: "44109820-18", waterMeter: "WTR-A502", balcony: true, dsq: false, furnished: false },
  { id: "A503", block: "Block A", floor: 5, type: "2-Bedroom Deluxe", sqm: 122, baseRent: 115000, serviceCharge: 9500, status: "occupied", kplcMeter: "44109820-19", waterMeter: "WTR-A503", balcony: true, dsq: false, furnished: false },
  { id: "A504", block: "Block A", floor: 5, type: "3-Bedroom Penthouse", sqm: 175, baseRent: 145000, serviceCharge: 12000, status: "occupied", kplcMeter: "44109820-20", waterMeter: "WTR-A504", balcony: true, dsq: true, furnished: true },
  // Floor 6 (Penthouses)
  { id: "A601", block: "Block A", floor: 6, type: "2-Bedroom Deluxe", sqm: 125, baseRent: 120000, serviceCharge: 10000, status: "occupied", kplcMeter: "44109820-21", waterMeter: "WTR-A601", balcony: true, dsq: false, furnished: false },
  { id: "A602", block: "Block A", floor: 6, type: "3-Bedroom Penthouse", sqm: 180, baseRent: 150000, serviceCharge: 12000, status: "occupied", kplcMeter: "44109820-22", waterMeter: "WTR-A602", balcony: true, dsq: true, furnished: true },
  { id: "A603", block: "Block A", floor: 6, type: "3-Bedroom Penthouse", sqm: 185, baseRent: 155000, serviceCharge: 12000, status: "reserved", kplcMeter: "44109820-23", waterMeter: "WTR-A603", balcony: true, dsq: true, furnished: true },
  { id: "A604", block: "Block A", floor: 6, type: "3-Bedroom Penthouse", sqm: 195, baseRent: 165000, serviceCharge: 13000, status: "occupied", kplcMeter: "44109820-24", waterMeter: "WTR-A604", balcony: true, dsq: true, furnished: true },

  // Block B (Jacaranda Wing) - 24 units
  // Floor 1
  { id: "B101", block: "Block B", floor: 1, type: "Studio", sqm: 45, baseRent: 50000, serviceCharge: 6000, status: "occupied", kplcMeter: "44109830-01", waterMeter: "WTR-B101", balcony: true, dsq: false, furnished: false },
  { id: "B102", block: "Block B", floor: 1, type: "1-Bedroom", sqm: 68, baseRent: 70000, serviceCharge: 7500, status: "occupied", kplcMeter: "44109830-02", waterMeter: "WTR-B102", balcony: true, dsq: false, furnished: false },
  { id: "B103", block: "Block B", floor: 1, type: "2-Bedroom Deluxe", sqm: 110, baseRent: 100000, serviceCharge: 9000, status: "vacant", kplcMeter: "44109830-03", waterMeter: "WTR-B103", balcony: true, dsq: false, furnished: false },
  { id: "B104", block: "Block B", floor: 1, type: "2-Bedroom Deluxe", sqm: 115, baseRent: 105000, serviceCharge: 9000, status: "occupied", kplcMeter: "44109830-04", waterMeter: "WTR-B104", balcony: true, dsq: false, furnished: false },
  // Floor 2
  { id: "B201", block: "Block B", floor: 2, type: "Studio", sqm: 45, baseRent: 50000, serviceCharge: 6000, status: "occupied", kplcMeter: "44109830-05", waterMeter: "WTR-B201", balcony: true, dsq: false, furnished: false },
  { id: "B202", block: "Block B", floor: 2, type: "1-Bedroom", sqm: 68, baseRent: 72000, serviceCharge: 7500, status: "occupied", kplcMeter: "44109830-06", waterMeter: "WTR-B202", balcony: true, dsq: false, furnished: false },
  { id: "B203", block: "Block B", floor: 2, type: "2-Bedroom Deluxe", sqm: 112, baseRent: 100000, serviceCharge: 9000, status: "occupied", kplcMeter: "44109830-07", waterMeter: "WTR-B203", balcony: true, dsq: false, furnished: false },
  { id: "B204", block: "Block B", floor: 2, type: "2-Bedroom Deluxe", sqm: 115, baseRent: 105000, serviceCharge: 9000, status: "occupied", kplcMeter: "44109830-08", waterMeter: "WTR-B204", balcony: true, dsq: false, furnished: false },
  // Floor 3
  { id: "B301", block: "Block B", floor: 3, type: "Studio", sqm: 46, baseRent: 52000, serviceCharge: 6000, status: "occupied", kplcMeter: "44109830-09", waterMeter: "WTR-B301", balcony: true, dsq: false, furnished: false },
  { id: "B302", block: "Block B", floor: 3, type: "1-Bedroom", sqm: 70, baseRent: 75000, serviceCharge: 8000, status: "vacant", kplcMeter: "44109830-10", waterMeter: "WTR-B302", balcony: true, dsq: false, furnished: false },
  { id: "B303", block: "Block B", floor: 3, type: "2-Bedroom Deluxe", sqm: 115, baseRent: 105000, serviceCharge: 9000, status: "occupied", kplcMeter: "44109830-11", waterMeter: "WTR-B303", balcony: true, dsq: false, furnished: false },
  { id: "B304", block: "Block B", floor: 3, type: "2-Bedroom Deluxe", sqm: 118, baseRent: 108000, serviceCharge: 9000, status: "occupied", kplcMeter: "44109830-12", waterMeter: "WTR-B304", balcony: true, dsq: false, furnished: false },
  // Floor 4
  { id: "B401", block: "Block B", floor: 4, type: "Studio", sqm: 46, baseRent: 52000, serviceCharge: 6000, status: "occupied", kplcMeter: "44109830-13", waterMeter: "WTR-B401", balcony: true, dsq: false, furnished: false },
  { id: "B402", block: "Block B", floor: 4, type: "1-Bedroom", sqm: 70, baseRent: 75000, serviceCharge: 8000, status: "occupied", kplcMeter: "44109830-14", waterMeter: "WTR-B402", balcony: true, dsq: false, furnished: false },
  { id: "B403", block: "Block B", floor: 4, type: "2-Bedroom Deluxe", sqm: 118, baseRent: 110000, serviceCharge: 9500, status: "occupied", kplcMeter: "44109830-15", waterMeter: "WTR-B403", balcony: true, dsq: false, furnished: false },
  { id: "B404", block: "Block B", floor: 4, type: "2-Bedroom Deluxe", sqm: 120, baseRent: 110000, serviceCharge: 9500, status: "occupied", kplcMeter: "44109830-16", waterMeter: "WTR-B404", balcony: true, dsq: false, furnished: false },
  // Floor 5
  { id: "B501", block: "Block B", floor: 5, type: "1-Bedroom", sqm: 72, baseRent: 78000, serviceCharge: 8000, status: "occupied", kplcMeter: "44109830-17", waterMeter: "WTR-B501", balcony: true, dsq: false, furnished: false },
  { id: "B502", block: "Block B", floor: 5, type: "2-Bedroom Deluxe", sqm: 120, baseRent: 115000, serviceCharge: 9500, status: "occupied", kplcMeter: "44109830-18", waterMeter: "WTR-B502", balcony: true, dsq: false, furnished: false },
  { id: "B503", block: "Block B", floor: 5, type: "2-Bedroom Deluxe", sqm: 122, baseRent: 115000, serviceCharge: 9500, status: "maintenance", kplcMeter: "44109830-19", waterMeter: "WTR-B503", balcony: true, dsq: false, furnished: false },
  { id: "B504", block: "Block B", floor: 5, type: "3-Bedroom Penthouse", sqm: 175, baseRent: 145000, serviceCharge: 12000, status: "occupied", kplcMeter: "44109830-20", waterMeter: "WTR-B504", balcony: true, dsq: true, furnished: true },
  // Floor 6
  { id: "B601", block: "Block B", floor: 6, type: "2-Bedroom Deluxe", sqm: 125, baseRent: 120000, serviceCharge: 10000, status: "occupied", kplcMeter: "44109830-21", waterMeter: "WTR-B601", balcony: true, dsq: false, furnished: false },
  { id: "B602", block: "Block B", floor: 6, type: "3-Bedroom Penthouse", sqm: 180, baseRent: 150000, serviceCharge: 12000, status: "occupied", kplcMeter: "44109830-22", waterMeter: "WTR-B602", balcony: true, dsq: true, furnished: true },
  { id: "B603", block: "Block B", floor: 6, type: "3-Bedroom Penthouse", sqm: 185, baseRent: 155000, serviceCharge: 12000, status: "occupied", kplcMeter: "44109830-23", waterMeter: "WTR-B603", balcony: true, dsq: true, furnished: true },
  { id: "B604", block: "Block B", floor: 6, type: "3-Bedroom Penthouse", sqm: 195, baseRent: 165000, serviceCharge: 13000, status: "occupied", kplcMeter: "44109830-24", waterMeter: "WTR-B604", balcony: true, dsq: true, furnished: true }
];

export const INITIAL_TENANTS = [
  {
    id: "TEN-001",
    name: "Sharon Akinyi Ochieng",
    email: "sharon.ochieng@gmail.com",
    phone: "+254 722 341 890",
    nationalId: "28491820",
    unitId: "A302",
    occupation: "Senior Software Engineer (Google Kenya)",
    vehiclePlate: "KDF 219Q",
    leaseStart: "2025-06-01",
    leaseEnd: "2027-05-31",
    depositAmount: 75000,
    depositPaid: true,
    status: "active",
    arrears: 0,
    emergencyContact: { name: "David Ochieng", relation: "Brother", phone: "+254 733 912 301" }
  },
  {
    id: "TEN-002",
    name: "Brian Kiprop Cheruiyot",
    email: "brian.kiprop@pwc.com",
    phone: "+254 718 902 443",
    nationalId: "31892014",
    unitId: "A204",
    occupation: "Financial Risk Manager (PwC Westlands)",
    vehiclePlate: "KDG 849X",
    leaseStart: "2025-03-01",
    leaseEnd: "2027-02-28",
    depositAmount: 105000,
    depositPaid: true,
    status: "active",
    arrears: 114000, // In arrears for current month
    emergencyContact: { name: "Mercy Cheruiyot", relation: "Spouse", phone: "+254 720 119 450" }
  },
  {
    id: "TEN-003",
    name: "Dr. Amina Mohamed Hassan",
    email: "dr.amina.hassan@akuh.edu",
    phone: "+254 701 552 198",
    nationalId: "24901842",
    unitId: "A604",
    occupation: "Consultant Pediatrician (Aga Khan University Hospital)",
    vehiclePlate: "KDA 004M",
    leaseStart: "2024-11-01",
    leaseEnd: "2026-10-31", // Expiring soon!
    depositAmount: 165000,
    depositPaid: true,
    status: "active",
    arrears: 0,
    emergencyContact: { name: "Farhan Hassan", relation: "Spouse", phone: "+254 721 880 321" }
  },
  {
    id: "TEN-004",
    name: "Dennis Mutua Musyoka",
    email: "d.mutua@safaricom.co.ke",
    phone: "+254 724 991 034",
    nationalId: "29801243",
    unitId: "B201",
    occupation: "Principal Fintech Architect (Safaricom)",
    vehiclePlate: "KDH 512B",
    leaseStart: "2025-08-01",
    leaseEnd: "2027-07-31",
    depositAmount: 50000,
    depositPaid: true,
    status: "active",
    arrears: 0,
    emergencyContact: { name: "Faith Musyoka", relation: "Sister", phone: "+254 712 344 911" }
  },
  {
    id: "TEN-005",
    name: "Faith Wambui Kamau",
    email: "faith.wambui@equitybank.co.ke",
    phone: "+254 726 443 219",
    nationalId: "30192847",
    unitId: "B504",
    occupation: "Corporate Relationship Director (Equity Bank)",
    vehiclePlate: "KDB 931R",
    leaseStart: "2025-01-15",
    leaseEnd: "2027-01-14",
    depositAmount: 145000,
    depositPaid: true,
    status: "active",
    arrears: 0,
    emergencyContact: { name: "James Kamau", relation: "Father", phone: "+254 722 811 002" }
  },
  {
    id: "TEN-006",
    name: "Tariq Omar Al-Mansoor",
    email: "tariq.almansoor@tradeafrica.org",
    phone: "+254 734 772 105",
    nationalId: "P-7819284A", // Expat Passport
    unitId: "A504",
    occupation: "Regional Trade Envoy (East Africa Business Council)",
    vehiclePlate: "KDC 118L",
    leaseStart: "2025-05-01",
    leaseEnd: "2026-11-30", // Expiring soon
    depositAmount: 145000,
    depositPaid: true,
    status: "active",
    arrears: 157000, // In arrears
    emergencyContact: { name: "Zainab Omar", relation: "Sister", phone: "+254 731 229 018" }
  },
  {
    id: "TEN-007",
    name: "Wanjiru Joyce Gitau",
    email: "w.gitau@kenyalaw.org",
    phone: "+254 722 189 402",
    nationalId: "27819203",
    unitId: "B403",
    occupation: "Partner, Gitau & Associates Advocates",
    vehiclePlate: "KDJ 773S",
    leaseStart: "2025-09-01",
    leaseEnd: "2027-08-31",
    depositAmount: 110000,
    depositPaid: true,
    status: "active",
    arrears: 0,
    emergencyContact: { name: "Samuel Gitau", relation: "Brother", phone: "+254 720 901 884" }
  },
  {
    id: "TEN-008",
    name: "Kevin Maina Mwangi",
    email: "kevin.mwangi@kcbgroup.com",
    phone: "+254 715 678 901",
    nationalId: "31092837",
    unitId: "A101",
    occupation: "Digital Banking Product Lead",
    vehiclePlate: "KDF 332T",
    leaseStart: "2025-04-01",
    leaseEnd: "2027-03-31",
    depositAmount: 50000,
    depositPaid: true,
    status: "active",
    arrears: 0,
    emergencyContact: { name: "Esther Mwangi", relation: "Mother", phone: "+254 723 440 918" }
  },
  {
    id: "TEN-009",
    name: "Linda Wangari Njoroge",
    email: "linda.njoroge@unicef.org",
    phone: "+254 700 812 345",
    nationalId: "28910482",
    unitId: "B102",
    occupation: "UN Humanitarian Affairs Officer",
    vehiclePlate: "UN 49K",
    leaseStart: "2025-02-01",
    leaseEnd: "2027-01-31",
    depositAmount: 70000,
    depositPaid: true,
    status: "active",
    arrears: 0,
    emergencyContact: { name: "Peter Njoroge", relation: "Father", phone: "+254 722 551 229" }
  },
  {
    id: "TEN-010",
    name: "Marcus Adebayo Oladipo",
    email: "marcus.oladipo@africell.com",
    phone: "+254 780 441 992",
    nationalId: "P-NG882109",
    unitId: "A602",
    occupation: "Chief Marketing Officer (Telecomms)",
    vehiclePlate: "KDG 102Z",
    leaseStart: "2025-07-01",
    leaseEnd: "2027-06-30",
    depositAmount: 150000,
    depositPaid: true,
    status: "active",
    arrears: 0,
    emergencyContact: { name: "Folake Oladipo", relation: "Spouse", phone: "+254 788 120 449" }
  }
];

export const INITIAL_INVOICES = [
  // October 2026 Invoices
  {
    id: "INV-2026-10-A302",
    unitId: "A302",
    tenantId: "TEN-001",
    tenantName: "Sharon Akinyi Ochieng",
    month: "October 2026",
    issueDate: "2026-10-01",
    dueDate: "2026-10-05",
    baseRent: 75000,
    serviceCharge: 8000,
    waterUnits: 12,
    waterRate: 160,
    waterAmount: 1920,
    garbageFee: 1500,
    latePenalty: 0,
    totalAmount: 86420,
    amountPaid: 86420,
    balance: 0,
    status: "paid",
    paidDate: "2026-10-03 10:22:15"
  },
  {
    id: "INV-2026-10-A204",
    unitId: "A204",
    tenantId: "TEN-002",
    tenantName: "Brian Kiprop Cheruiyot",
    month: "October 2026",
    issueDate: "2026-10-01",
    dueDate: "2026-10-05",
    baseRent: 105000,
    serviceCharge: 9000,
    waterUnits: 15,
    waterRate: 160,
    waterAmount: 2400,
    garbageFee: 1500,
    latePenalty: 5745, // 5% late penalty added after 5th Oct
    totalAmount: 123645,
    amountPaid: 0,
    balance: 123645,
    status: "overdue",
    paidDate: null
  },
  {
    id: "INV-2026-10-A604",
    unitId: "A604",
    tenantId: "TEN-003",
    tenantName: "Dr. Amina Mohamed Hassan",
    month: "October 2026",
    issueDate: "2026-10-01",
    dueDate: "2026-10-05",
    baseRent: 165000,
    serviceCharge: 13000,
    waterUnits: 18,
    waterRate: 160,
    waterAmount: 2880,
    garbageFee: 1500,
    latePenalty: 0,
    totalAmount: 182380,
    amountPaid: 182380,
    balance: 0,
    status: "paid",
    paidDate: "2026-10-02 14:10:48"
  },
  {
    id: "INV-2026-10-B201",
    unitId: "B201",
    tenantId: "TEN-004",
    tenantName: "Dennis Mutua Musyoka",
    month: "October 2026",
    issueDate: "2026-10-01",
    dueDate: "2026-10-05",
    baseRent: 50000,
    serviceCharge: 6000,
    waterUnits: 8,
    waterRate: 160,
    waterAmount: 1280,
    garbageFee: 1500,
    latePenalty: 0,
    totalAmount: 58780,
    amountPaid: 58780,
    balance: 0,
    status: "paid",
    paidDate: "2026-10-04 09:30:12"
  },
  {
    id: "INV-2026-10-B504",
    unitId: "B504",
    tenantId: "TEN-005",
    tenantName: "Faith Wambui Kamau",
    month: "October 2026",
    issueDate: "2026-10-01",
    dueDate: "2026-10-05",
    baseRent: 145000,
    serviceCharge: 12000,
    waterUnits: 20,
    waterRate: 160,
    waterAmount: 3200,
    garbageFee: 1500,
    latePenalty: 0,
    totalAmount: 161700,
    amountPaid: 161700,
    balance: 0,
    status: "paid",
    paidDate: "2026-10-01 18:45:00"
  },
  {
    id: "INV-2026-10-A504",
    unitId: "A504",
    tenantId: "TEN-006",
    tenantName: "Tariq Omar Al-Mansoor",
    month: "October 2026",
    issueDate: "2026-10-01",
    dueDate: "2026-10-05",
    baseRent: 145000,
    serviceCharge: 12000,
    waterUnits: 16,
    waterRate: 160,
    waterAmount: 2560,
    garbageFee: 1500,
    latePenalty: 8053,
    totalAmount: 169113,
    amountPaid: 0,
    balance: 169113,
    status: "overdue",
    paidDate: null
  },
  {
    id: "INV-2026-10-B403",
    unitId: "B403",
    tenantId: "TEN-007",
    tenantName: "Wanjiru Joyce Gitau",
    month: "October 2026",
    issueDate: "2026-10-01",
    dueDate: "2026-10-05",
    baseRent: 110000,
    serviceCharge: 9500,
    waterUnits: 14,
    waterRate: 160,
    waterAmount: 2240,
    garbageFee: 1500,
    latePenalty: 0,
    totalAmount: 123240,
    amountPaid: 123240,
    balance: 0,
    status: "paid",
    paidDate: "2026-10-04 11:15:30"
  },
  {
    id: "INV-2026-10-A101",
    unitId: "A101",
    tenantId: "TEN-008",
    tenantName: "Kevin Maina Mwangi",
    month: "October 2026",
    issueDate: "2026-10-01",
    dueDate: "2026-10-05",
    baseRent: 50000,
    serviceCharge: 6000,
    waterUnits: 10,
    waterRate: 160,
    waterAmount: 1600,
    garbageFee: 1500,
    latePenalty: 0,
    totalAmount: 59100,
    amountPaid: 59100,
    balance: 0,
    status: "paid",
    paidDate: "2026-10-05 08:20:00"
  },
  {
    id: "INV-2026-10-B102",
    unitId: "B102",
    tenantId: "TEN-009",
    tenantName: "Linda Wangari Njoroge",
    month: "October 2026",
    issueDate: "2026-10-01",
    dueDate: "2026-10-05",
    baseRent: 70000,
    serviceCharge: 7500,
    waterUnits: 11,
    waterRate: 160,
    waterAmount: 1760,
    garbageFee: 1500,
    latePenalty: 0,
    totalAmount: 80760,
    amountPaid: 80760,
    balance: 0,
    status: "paid",
    paidDate: "2026-10-03 16:40:19"
  },
  {
    id: "INV-2026-10-A602",
    unitId: "A602",
    tenantId: "TEN-010",
    tenantName: "Marcus Adebayo Oladipo",
    month: "October 2026",
    issueDate: "2026-10-01",
    dueDate: "2026-10-05",
    baseRent: 150000,
    serviceCharge: 12000,
    waterUnits: 19,
    waterRate: 160,
    waterAmount: 3040,
    garbageFee: 1500,
    latePenalty: 0,
    totalAmount: 166540,
    amountPaid: 166540,
    balance: 0,
    status: "paid",
    paidDate: "2026-10-02 12:05:44"
  }
];

export const INITIAL_PAYMENTS = [
  {
    id: "PAY-1001",
    receiptNumber: "AB-RCPT-2026-1041",
    invoiceId: "INV-2026-10-A302",
    unitId: "A302",
    tenantId: "TEN-001",
    tenantName: "Sharon Akinyi Ochieng",
    amount: 86420,
    paymentMethod: "mpesa_paybill",
    reference: "SLK92H81QP",
    phoneNumber: "+254 722 341 890",
    date: "2026-10-03 10:22:15",
    status: "Verified",
    description: "Rent & Utilities Oct 2026 - M-Pesa Paybill 408920"
  },
  {
    id: "PAY-1002",
    receiptNumber: "AB-RCPT-2026-1042",
    invoiceId: "INV-2026-10-A604",
    unitId: "A604",
    tenantId: "TEN-003",
    tenantName: "Dr. Amina Mohamed Hassan",
    amount: 182380,
    paymentMethod: "bank_transfer",
    reference: "NCBA-FT-9912048",
    phoneNumber: "+254 701 552 198",
    date: "2026-10-02 14:10:48",
    status: "Verified",
    description: "Oct 2026 Penthouse Rent via NCBA EFT"
  },
  {
    id: "PAY-1003",
    receiptNumber: "AB-RCPT-2026-1043",
    invoiceId: "INV-2026-10-B201",
    unitId: "B201",
    tenantId: "TEN-004",
    tenantName: "Dennis Mutua Musyoka",
    amount: 58780,
    paymentMethod: "mpesa_stk",
    reference: "SLK71X04MN",
    phoneNumber: "+254 724 991 034",
    date: "2026-10-04 09:30:12",
    status: "Verified",
    description: "STK Push Express Checkout - Oct 2026"
  },
  {
    id: "PAY-1004",
    receiptNumber: "AB-RCPT-2026-1044",
    invoiceId: "INV-2026-10-B504",
    unitId: "B504",
    tenantId: "TEN-005",
    tenantName: "Faith Wambui Kamau",
    amount: 161700,
    paymentMethod: "mpesa_paybill",
    reference: "SLJ88P92KD",
    phoneNumber: "+254 726 443 219",
    date: "2026-10-01 18:45:00",
    status: "Verified",
    description: "Rent & Utilities Oct 2026 - M-Pesa Paybill"
  },
  {
    id: "PAY-1005",
    receiptNumber: "AB-RCPT-2026-1045",
    invoiceId: "INV-2026-10-B403",
    unitId: "B403",
    tenantId: "TEN-007",
    tenantName: "Wanjiru Joyce Gitau",
    amount: 123240,
    paymentMethod: "bank_transfer",
    reference: "KCB-RTGS-88129",
    phoneNumber: "+254 722 189 402",
    date: "2026-10-04 11:15:30",
    status: "Verified",
    description: "RTGS transfer from KCB Kilimani Branch"
  },
  {
    id: "PAY-1006",
    receiptNumber: "AB-RCPT-2026-1046",
    invoiceId: "INV-2026-10-A101",
    unitId: "A101",
    tenantId: "TEN-008",
    tenantName: "Kevin Maina Mwangi",
    amount: 59100,
    paymentMethod: "mpesa_paybill",
    reference: "SLK99Q12RT",
    phoneNumber: "+254 715 678 901",
    date: "2026-10-05 08:20:00",
    status: "Verified",
    description: "M-Pesa Paybill payment Unit A101"
  },
  {
    id: "PAY-1007",
    receiptNumber: "AB-RCPT-2026-1047",
    invoiceId: "INV-2026-10-B102",
    unitId: "B102",
    tenantId: "TEN-009",
    tenantName: "Linda Wangari Njoroge",
    amount: 80760,
    paymentMethod: "bank_transfer",
    reference: "STANBIC-EFT-4091",
    phoneNumber: "+254 700 812 345",
    date: "2026-10-03 16:40:19",
    status: "Verified",
    description: "Stanbic direct transfer for Oct 2026"
  },
  {
    id: "PAY-1008",
    receiptNumber: "AB-RCPT-2026-1048",
    invoiceId: "INV-2026-10-A602",
    unitId: "A602",
    tenantId: "TEN-010",
    tenantName: "Marcus Adebayo Oladipo",
    amount: 166540,
    paymentMethod: "mpesa_stk",
    reference: "SLK63W91AA",
    phoneNumber: "+254 780 441 992",
    date: "2026-10-02 12:05:44",
    status: "Verified",
    description: "M-Pesa Online STK Push confirmation"
  }
];

export const INITIAL_MAINTENANCE = [
  {
    id: "TKT-108",
    ticketNo: "TKT-108",
    unitId: "A204",
    reportedBy: "Brian Kiprop Cheruiyot",
    category: "Plumbing",
    priority: "High",
    title: "Master bathroom shower mixer pressure drop and slow drip",
    description: "The hot water thermostatic cartridge seems calcified, leading to lukewarm water and dripping through the wall plate.",
    status: "In Progress",
    reportedDate: "2026-10-04 11:20",
    assignedFundi: "Fundi Juma Plumbing & Pipeworks",
    fundiPhone: "+254 721 884 102",
    estimatedCost: 6500,
    actualCost: null,
    resolvedDate: null,
    resolutionNotes: "Fundi Juma scheduled replacement cartridge installation today at 2:00 PM."
  },
  {
    id: "TKT-109",
    ticketNo: "TKT-109",
    unitId: "Block A & B",
    reportedBy: "Caretaker Francis Mwangi",
    category: "Elevator",
    priority: "Urgent",
    title: "Schindler Lift #2 routine bi-monthly safety brake inspection",
    description: "Periodic preventative maintenance contract check with Schindler Kenya engineers.",
    status: "Open",
    reportedDate: "2026-10-05 08:00",
    assignedFundi: "Schindler Lifts East Africa Ltd",
    fundiPhone: "+254 20 690 1000",
    estimatedCost: 38000,
    actualCost: null,
    resolvedDate: null,
    resolutionNotes: null
  },
  {
    id: "TKT-110",
    ticketNo: "TKT-110",
    unitId: "A302",
    reportedBy: "Sharon Akinyi Ochieng",
    category: "Electrical",
    priority: "Medium",
    title: "Kitchen island pendant light flicker",
    description: "Dimmer switch on the 3-pendant brass fixture over the granite breakfast bar is flickering when microwave is on.",
    status: "Resolved",
    reportedDate: "2026-10-02 15:30",
    assignedFundi: "Omondi Master Electricians",
    fundiPhone: "+254 712 990 411",
    estimatedCost: 3500,
    actualCost: 3200,
    resolvedDate: "2026-10-03 14:00",
    resolutionNotes: "Replaced faulty LED trailing-edge driver with high quality Philips driver. Tested under full load."
  },
  {
    id: "TKT-111",
    ticketNo: "TKT-111",
    unitId: "B503",
    reportedBy: "Property Inspection Team",
    category: "Carpentry",
    priority: "Low",
    title: "Wardrobe hinge alignment & soft-close adjustment",
    description: "Master bedroom walk-in closet sliding runner needs silicone lubrication and hinge alignment prior to tenant handover.",
    status: "In Progress",
    reportedDate: "2026-10-03 09:00",
    assignedFundi: "Mwangi Woodcraft & Joinery",
    fundiPhone: "+254 723 551 890",
    estimatedCost: 4000,
    actualCost: null,
    resolvedDate: null,
    resolutionNotes: "Hardware ordered, fixing today."
  },
  {
    id: "TKT-112",
    ticketNo: "TKT-112",
    unitId: "Compound",
    reportedBy: "Security Supervisor",
    category: "Security",
    priority: "High",
    title: "Electric fence zone 3 tension sensor alert check",
    description: "Tree branch from neighboring compound leaning against perimeter top wire during heavy wind.",
    status: "Resolved",
    reportedDate: "2026-10-01 19:40",
    assignedFundi: "Topsec Security Solutions",
    fundiPhone: "+254 733 400 918",
    estimatedCost: 8000,
    actualCost: 7500,
    resolvedDate: "2026-10-02 10:15",
    resolutionNotes: "Pruned overhanging branches with gardener and re-tensioned zone 3 ceramic insulators."
  }
];

export const INITIAL_EXPENSES = [
  {
    id: "EXP-101",
    date: "2026-10-01",
    category: "Security & Biometrics",
    description: "Securex 24/7 Manned Guard Service (4 Day / 4 Night Guards) & Biometric Gate maintenance",
    amount: 195000,
    payee: "Securex Security Systems Ltd",
    paymentMethod: "bank_transfer",
    reference: "EFT-SCX-99120",
    status: "Paid"
  },
  {
    id: "EXP-102",
    date: "2026-10-02",
    category: "Common Utilities (KPLC)",
    description: "Kenya Power Common Services (Lifts, Rooftop Gym, Security Lighting & Water Booster Pumps)",
    amount: 88400,
    payee: "Kenya Power & Lighting Co (KPLC)",
    paymentMethod: "mpesa_paybill",
    reference: "SLJ991208K",
    status: "Paid"
  },
  {
    id: "EXP-103",
    date: "2026-10-03",
    category: "Elevator Maintenance",
    description: "Schindler Lifts East Africa - Monthly Full Comprehensive AMC Contract",
    amount: 54000,
    payee: "Schindler Lifts EA Ltd",
    paymentMethod: "bank_transfer",
    reference: "EFT-SCH-44910",
    status: "Paid"
  },
  {
    id: "EXP-104",
    date: "2026-10-03",
    category: "Cleaning & Waste Management",
    description: "Kilimani Clean Services - Daily common corridors, glass facades, and 3x weekly garbage disposal",
    amount: 65000,
    payee: "Kilimani Waste & Hygiene Ltd",
    paymentMethod: "bank_transfer",
    reference: "NCBA-CL-1928",
    status: "Paid"
  },
  {
    id: "EXP-105",
    date: "2026-10-04",
    category: "Water & Borehole Treatment",
    description: "Monthly reverse osmosis salt replenishment & chemicals for borehole treatment plant",
    amount: 32500,
    payee: "Davis & Shirtliff Water Tech",
    paymentMethod: "mpesa_paybill",
    reference: "SLK11894PQ",
    status: "Paid"
  },
  {
    id: "EXP-106",
    date: "2026-10-05",
    category: "Caretaker & Grounds Staff",
    description: "Resident Caretaker & Assistant Groundsman monthly allowance & NSSF/SHIF statutory",
    amount: 60000,
    payee: "Francis Mwangi & Joseph Kibet",
    paymentMethod: "mpesa_paybill",
    reference: "SLK559102T",
    status: "Paid"
  }
];

export const INITIAL_NOTICES = [
  {
    id: "NOT-201",
    date: "2026-10-05",
    title: "Quarterly Water Storage Disinfection & Pressure Test",
    target: "All Residents",
    channel: "SMS & Tenant Portal",
    priority: "Important",
    message: "Dear Residents of AB Apartments Kilimani, Davis & Shirtliff engineers will conduct routine sanitation and pressure testing of overhead reserve tanks on Saturday 11th October between 09:00 AM and 01:00 PM. Auxiliary borehole supply will maintain normal tap pressure throughout. Thank you for your cooperation."
  },
  {
    id: "NOT-202",
    date: "2026-10-01",
    title: "Monthly Rent Due Reminder (October 2026)",
    target: "All Residents",
    channel: "SMS & Email",
    priority: "Standard",
    message: "Dear Tenant, please remember that monthly rent and utilities for October 2026 are due on or before 5th October. Kindly make payment via Safaricom Paybill: 408920, with Account Number as your Unit (e.g., A302 or B201). For instant receipts, you can also use the Tenant Portal STK push."
  },
  {
    id: "NOT-203",
    date: "2026-09-28",
    title: "Rooftop Heated Pool & Gym Upgrades Complete",
    target: "All Residents",
    channel: "Tenant Portal",
    priority: "Info",
    message: "We are pleased to inform all residents that new cardio ellipticals and heat pump thermostats have been installed at the rooftop fitness deck. Operating hours remain 5:30 AM to 10:00 PM daily. Please remember to sign in guests at the rooftop reception."
  }
];

// Helper to calculate statistics
export function calculateStats(units, tenants, invoices, payments, expenses, maintenance) {
  const totalUnitsCount = units.length;
  const occupiedUnits = units.filter(u => u.status === "occupied").length;
  const vacantUnits = units.filter(u => u.status === "vacant").length;
  const maintenanceUnits = units.filter(u => u.status === "maintenance").length;
  const reservedUnits = units.filter(u => u.status === "reserved").length;

  const occupancyRate = totalUnitsCount > 0 ? ((occupiedUnits / totalUnitsCount) * 100).toFixed(1) : 0;

  // Financials for Current Month (October 2026)
  const totalInvoiced = invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
  const totalCollected = payments.reduce((sum, pay) => sum + (pay.amount || 0), 0);
  const totalArrears = invoices.reduce((sum, inv) => sum + (inv.balance || 0), 0);

  const totalOperatingExpenses = expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);
  const netOperatingIncome = totalCollected - totalOperatingExpenses;

  const collectionRate = totalInvoiced > 0 ? ((totalCollected / totalInvoiced) * 100).toFixed(1) : 0;

  const openTickets = maintenance.filter(t => t.status === "Open" || t.status === "In Progress").length;
  const urgentTickets = maintenance.filter(t => t.priority === "Urgent" && (t.status === "Open" || t.status === "In Progress")).length;

  return {
    totalUnitsCount,
    occupiedUnits,
    vacantUnits,
    maintenanceUnits,
    reservedUnits,
    occupancyRate,
    totalInvoiced,
    totalCollected,
    totalArrears,
    totalOperatingExpenses,
    netOperatingIncome,
    collectionRate,
    openTickets,
    urgentTickets
  };
}

// LocalStorage Persistence Keys (Universal RentSync)
const STORAGE_PREFIX = "rentsync_rms_";

export function loadStoredData(key, fallback) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading localStorage key:", key, e);
    return fallback;
  }
}

export function saveStoredData(key, value) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error("Error saving localStorage key:", key, e);
  }
}

export function clearAllStoredData() {
  try {
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith("rentsync_rms_") || k.startsWith("ab_apartments_")) {
        localStorage.removeItem(k);
      }
    });
  } catch (e) {
    console.error("Error clearing storage:", e);
  }
}
