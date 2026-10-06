// Universal Multi-Client Rental Management Database Engine
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isVercel = process.env.VERCEL === '1';
const DATA_DIR = isVercel ? '/tmp' : path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'store.json');

// Ensure data directory exists if not serverless /tmp
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (e) {
    console.error("Directory creation notice:", e.message);
  }
}

// Seed Client Properties
const DEFAULT_PROPERTIES = [
  {
    id: "prop-ab-kilimani",
    name: "AB Apartments Kilimani",
    clientName: "AB Property Holdings Kenya Ltd",
    tagline: "Executive Urban Residences & Luxury Suites",
    address: "Plot 24, Kindaruma Road, Kilimani, Nairobi",
    city: "Nairobi",
    county: "Nairobi City County",
    country: "Kenya",
    currency: "KES",
    currencySymbol: "KSh",
    kraPin: "P051928490B",
    blocks: ["Block A (Sunburst Wing)", "Block B (Jacaranda Wing)"],
    floors: 6,
    totalUnits: 48,
    image: "/ab-facade.jpg",
    amenities: [
      "Heated Rooftop Infinity Pool",
      "Rooftop Fitness Gym",
      "Borehole with RO Filtration",
      "Automatic Standby Generator (250kVA)",
      "High-Speed Schindler Lifts",
      "24/7 Biometric Security Gate"
    ],
    billing: {
      mpesaPaybill: "408920",
      mpesaTill: "982145",
      bankName: "NCBA Bank Kenya PLC",
      bankBranch: "Upper Hill Branch",
      accountNumber: "1002938471001",
      lateFeePercent: 5,
      waterRatePerUnit: 160,
      dueDay: 5
    },
    contacts: {
      manager: "Patrick Kariuki",
      phone: "+254 722 980 120",
      email: "management@abapartmentskilimani.co.ke",
      caretaker: "Francis Mwangi",
      caretakerPhone: "+254 711 445 522",
      securityGate: "+254 733 998 811"
    }
  },
  {
    id: "prop-kilimani-heights",
    name: "Kilimani Heights Executive Suites",
    clientName: "Heights Capital Properties",
    tagline: "Contemporary Living in the Heart of Kilimani",
    address: "Argwings Kodhek Road, Kilimani, Nairobi",
    city: "Nairobi",
    county: "Nairobi City County",
    country: "Kenya",
    currency: "KES",
    currencySymbol: "KSh",
    kraPin: "P051839201A",
    blocks: ["East Tower", "West Tower"],
    floors: 8,
    totalUnits: 32,
    image: "/ab-facade.jpg",
    amenities: [
      "Conference Room & Lounge",
      "Solar Backup Lighting",
      "Basement Parking (2 slots/unit)",
      "Borehole Water Backup"
    ],
    billing: {
      mpesaPaybill: "522123",
      mpesaTill: "409182",
      bankName: "Standard Chartered Kenya",
      bankBranch: "Yaya Centre Branch",
      accountNumber: "0108291049201",
      lateFeePercent: 7.5,
      waterRatePerUnit: 175,
      dueDay: 5
    },
    contacts: {
      manager: "Grace Wanjiru",
      phone: "+254 721 440 918",
      email: "info@kilimaniheights.co.ke",
      caretaker: "Peter Odhiambo",
      caretakerPhone: "+254 710 992 341",
      securityGate: "+254 732 110 900"
    }
  },
  {
    id: "prop-riverside-haven",
    name: "Riverside Haven Duplexes",
    clientName: "Riverside Luxury Assets Ltd",
    tagline: "Serene Luxury Townhouses & Riverside Living",
    address: "Riverside Drive, Westlands, Nairobi",
    city: "Nairobi",
    county: "Nairobi City County",
    country: "Kenya",
    currency: "KES",
    currencySymbol: "KSh",
    kraPin: "P052910482C",
    blocks: ["Phase 1 (Villas 1-9)", "Phase 2 (Villas 10-18)"],
    floors: 3,
    totalUnits: 18,
    image: "/ab-interior.jpg",
    amenities: [
      "Private Plunge Pools",
      "Private Landscaped Gardens",
      "Clubhouse & Tennis Court",
      "Solar Water Heating"
    ],
    billing: {
      mpesaPaybill: "400200",
      mpesaTill: "661290",
      bankName: "I&M Bank Kenya",
      bankBranch: "Riverside Branch",
      accountNumber: "2009182049102",
      lateFeePercent: 5,
      waterRatePerUnit: 180,
      dueDay: 1
    },
    contacts: {
      manager: "Alex Mwiti",
      phone: "+254 722 884 100",
      email: "manager@riversidehaven.co.ke",
      caretaker: "Salim Bakari",
      caretakerPhone: "+254 713 552 901",
      securityGate: "+254 731 002 888"
    }
  }
];

class Database {
  constructor() {
    this.data = this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error("Error reading database file, initializing defaults:", e);
    }

    // Default Seed
    const initialDb = {
      properties: DEFAULT_PROPERTIES,
      units: [],
      tenants: [],
      invoices: [],
      payments: [],
      maintenance: [],
      expenses: [],
      notices: []
    };

    // Auto-seed units for AB Apartments Kilimani
    for (let fl = 1; fl <= 6; fl++) {
      ['A', 'B'].forEach(wing => {
        const blk = wing === 'A' ? "Block A (Sunburst Wing)" : "Block B (Jacaranda Wing)";
        initialDb.units.push(
          { id: `${wing}${fl}01`, propertyId: "prop-ab-kilimani", block: blk, floor: fl, type: "Studio", sqm: 45, baseRent: 50000, serviceCharge: 6000, status: fl === 4 && wing === 'A' ? "vacant" : "occupied", kplcMeter: `441098${wing}-01`, waterMeter: `WTR-${wing}${fl}01` },
          { id: `${wing}${fl}02`, propertyId: "prop-ab-kilimani", block: blk, floor: fl, type: "1-Bedroom", sqm: 68, baseRent: 72000, serviceCharge: 7500, status: fl === 3 && wing === 'B' ? "vacant" : "occupied", kplcMeter: `441098${wing}-02`, waterMeter: `WTR-${wing}${fl}02` },
          { id: `${wing}${fl}03`, propertyId: "prop-ab-kilimani", block: blk, floor: fl, type: "2-Bedroom Deluxe", sqm: 112, baseRent: 105000, serviceCharge: 9000, status: fl === 1 && wing === 'B' ? "vacant" : "occupied", kplcMeter: `441098${wing}-03`, waterMeter: `WTR-${wing}${fl}03` },
          { id: `${wing}${fl}04`, propertyId: "prop-ab-kilimani", block: blk, floor: fl, type: fl === 6 ? "3-Bedroom Penthouse" : "2-Bedroom Deluxe", sqm: fl === 6 ? 185 : 115, baseRent: fl === 6 ? 165000 : 105000, serviceCharge: fl === 6 ? 13000 : 9000, status: fl === 1 && wing === 'A' ? "vacant" : "occupied", kplcMeter: `441098${wing}-04`, waterMeter: `WTR-${wing}${fl}04` }
        );
      });
    }

    // Seed Initial Tenants
    initialDb.tenants = [
      { id: "TEN-001", propertyId: "prop-ab-kilimani", name: "Sharon Akinyi Ochieng", email: "sharon.ochieng@gmail.com", phone: "+254 722 341 890", nationalId: "28491820", unitId: "A302", occupation: "Senior Software Engineer (Google Kenya)", vehiclePlate: "KDF 219Q", leaseStart: "2025-06-01", leaseEnd: "2027-05-31", depositAmount: 75000, status: "active", arrears: 0, emergencyContact: { name: "David Ochieng", relation: "Brother", phone: "+254 733 912 301" } },
      { id: "TEN-002", propertyId: "prop-ab-kilimani", name: "Brian Kiprop Cheruiyot", email: "brian.kiprop@pwc.com", phone: "+254 718 902 443", nationalId: "31892014", unitId: "A204", occupation: "Financial Risk Manager (PwC)", vehiclePlate: "KDG 849X", leaseStart: "2025-03-01", leaseEnd: "2027-02-28", depositAmount: 105000, status: "active", arrears: 123645, emergencyContact: { name: "Mercy Cheruiyot", relation: "Spouse", phone: "+254 720 119 450" } },
      { id: "TEN-003", propertyId: "prop-ab-kilimani", name: "Dr. Amina Mohamed Hassan", email: "dr.amina.hassan@akuh.edu", phone: "+254 701 552 198", nationalId: "24901842", unitId: "A604", occupation: "Consultant Pediatrician (Aga Khan Hospital)", vehiclePlate: "KDA 004M", leaseStart: "2024-11-01", leaseEnd: "2026-10-31", depositAmount: 165000, status: "active", arrears: 0, emergencyContact: { name: "Farhan Hassan", relation: "Spouse", phone: "+254 721 880 321" } },
      { id: "TEN-004", propertyId: "prop-ab-kilimani", name: "Dennis Mutua Musyoka", email: "d.mutua@safaricom.co.ke", phone: "+254 724 991 034", nationalId: "29801243", unitId: "B201", occupation: "Principal Fintech Architect (Safaricom)", vehiclePlate: "KDH 512B", leaseStart: "2025-08-01", leaseEnd: "2027-07-31", depositAmount: 50000, status: "active", arrears: 0, emergencyContact: { name: "Faith Musyoka", relation: "Sister", phone: "+254 712 344 911" } }
    ];

    // Seed Invoices
    initialDb.invoices = [
      { id: "INV-2026-10-A302", propertyId: "prop-ab-kilimani", unitId: "A302", tenantId: "TEN-001", tenantName: "Sharon Akinyi Ochieng", month: "October 2026", issueDate: "2026-10-01", dueDate: "2026-10-05", baseRent: 75000, serviceCharge: 8000, waterUnits: 12, waterRate: 160, waterAmount: 1920, garbageFee: 1500, latePenalty: 0, totalAmount: 86420, amountPaid: 86420, balance: 0, status: "paid" },
      { id: "INV-2026-10-A204", propertyId: "prop-ab-kilimani", unitId: "A204", tenantId: "TEN-002", tenantName: "Brian Kiprop Cheruiyot", month: "October 2026", issueDate: "2026-10-01", dueDate: "2026-10-05", baseRent: 105000, serviceCharge: 9000, waterUnits: 15, waterRate: 160, waterAmount: 2400, garbageFee: 1500, latePenalty: 5745, totalAmount: 123645, amountPaid: 0, balance: 123645, status: "overdue" },
      { id: "INV-2026-10-A604", propertyId: "prop-ab-kilimani", unitId: "A604", tenantId: "TEN-003", tenantName: "Dr. Amina Mohamed Hassan", month: "October 2026", issueDate: "2026-10-01", dueDate: "2026-10-05", baseRent: 165000, serviceCharge: 13000, waterUnits: 18, waterRate: 160, waterAmount: 2880, garbageFee: 1500, latePenalty: 0, totalAmount: 182380, amountPaid: 182380, balance: 0, status: "paid" },
      { id: "INV-2026-10-B201", propertyId: "prop-ab-kilimani", unitId: "B201", tenantId: "TEN-004", tenantName: "Dennis Mutua Musyoka", month: "October 2026", issueDate: "2026-10-01", dueDate: "2026-10-05", baseRent: 50000, serviceCharge: 6000, waterUnits: 8, waterRate: 160, waterAmount: 1280, garbageFee: 1500, latePenalty: 0, totalAmount: 58780, amountPaid: 58780, balance: 0, status: "paid" }
    ];

    // Seed Payments
    initialDb.payments = [
      { id: "PAY-1001", propertyId: "prop-ab-kilimani", receiptNumber: "AB-RCPT-2026-1041", invoiceId: "INV-2026-10-A302", unitId: "A302", tenantId: "TEN-001", tenantName: "Sharon Akinyi Ochieng", amount: 86420, paymentMethod: "mpesa_paybill", reference: "SLK92H81QP", phoneNumber: "+254 722 341 890", date: "2026-10-03 10:22:15", status: "Verified", description: "Rent & Utilities Oct 2026" },
      { id: "PAY-1002", propertyId: "prop-ab-kilimani", receiptNumber: "AB-RCPT-2026-1042", invoiceId: "INV-2026-10-A604", unitId: "A604", tenantId: "TEN-003", tenantName: "Dr. Amina Mohamed Hassan", amount: 182380, paymentMethod: "bank_transfer", reference: "NCBA-FT-9912048", phoneNumber: "+254 701 552 198", date: "2026-10-02 14:10:48", status: "Verified", description: "Oct 2026 Penthouse Rent via NCBA EFT" },
      { id: "PAY-1003", propertyId: "prop-ab-kilimani", receiptNumber: "AB-RCPT-2026-1043", invoiceId: "INV-2026-10-B201", unitId: "B201", tenantId: "TEN-004", tenantName: "Dennis Mutua Musyoka", amount: 58780, paymentMethod: "mpesa_stk", reference: "SLK71X04MN", phoneNumber: "+254 724 991 034", date: "2026-10-04 09:30:12", status: "Verified", description: "STK Push Express Checkout" }
    ];

    // Seed Maintenance
    initialDb.maintenance = [
      { id: "TKT-108", propertyId: "prop-ab-kilimani", ticketNo: "TKT-108", unitId: "A204", reportedBy: "Brian Kiprop", category: "Plumbing", priority: "High", title: "Master bathroom shower mixer pressure drop", description: "Thermostatic mixer calcified", status: "In Progress", reportedDate: "2026-10-04 11:20", assignedFundi: "Fundi Juma Plumbing", fundiPhone: "+254 721 884 102", estimatedCost: 6500 },
      { id: "TKT-109", propertyId: "prop-ab-kilimani", ticketNo: "TKT-109", unitId: "Block A & B", reportedBy: "Caretaker Francis", category: "Elevator", priority: "Urgent", title: "Schindler Lift #2 routine brake safety inspection", description: "AMC Preventative maintenance", status: "Open", reportedDate: "2026-10-05 08:00", assignedFundi: "Schindler Lifts EA Ltd", fundiPhone: "+254 20 690 1000", estimatedCost: 38000 }
    ];

    // Seed Expenses
    initialDb.expenses = [
      { id: "EXP-101", propertyId: "prop-ab-kilimani", date: "2026-10-01", category: "Security & Biometrics", description: "Securex 24/7 Guard patrol & biometric gate maintenance", amount: 195000, payee: "Securex Security Systems Ltd", paymentMethod: "bank_transfer", reference: "EFT-SCX-99120", status: "Paid" },
      { id: "EXP-102", propertyId: "prop-ab-kilimani", date: "2026-10-02", category: "Common Utilities (KPLC)", description: "Kenya Power Common Services (Lifts, pool, security lights)", amount: 88400, payee: "Kenya Power & Lighting Co", paymentMethod: "mpesa_paybill", reference: "SLJ991208K", status: "Paid" }
    ];

    // Seed Notices
    initialDb.notices = [
      { id: "NOT-201", propertyId: "prop-ab-kilimani", date: "2026-10-05", title: "Quarterly Water Storage Disinfection & Pressure Test", target: "All Residents", channel: "SMS & Tenant Portal", priority: "Important", message: "Davis & Shirtliff engineers will conduct routine sanitation of overhead tanks on Saturday 11th Oct from 9:00 AM." },
      { id: "NOT-202", propertyId: "prop-ab-kilimani", date: "2026-10-01", title: "Monthly Rent Due Reminder (October 2026)", target: "All Residents", channel: "SMS & Email", priority: "Standard", message: "Rent and utilities are due on or before 5th October via Safaricom Paybill 408920." }
    ];

    this.save(initialDb);
    return initialDb;
  }

  save(data = this.data) {
    try {
      this.data = data;
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (e) {
      console.error("Error saving database file:", e);
    }
  }

  // --- Multi-Client Property Queries ---
  getProperties() {
    return this.data.properties || [];
  }

  getProperty(id) {
    return this.data.properties.find(p => p.id === id);
  }

  createProperty(propData) {
    const id = "prop-" + propData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') + "-" + Math.floor(100 + Math.random() * 900);
    const newProp = {
      id,
      ...propData,
      totalUnits: parseInt(propData.totalUnits) || 20,
      floors: parseInt(propData.floors) || 4,
      blocks: propData.blocks || ["Main Wing"]
    };

    this.data.properties.push(newProp);

    // Auto-generate starter units for the new client
    const numFloors = newProp.floors;
    const unitsPerFloor = Math.ceil(newProp.totalUnits / numFloors);
    let count = 0;

    for (let fl = 1; fl <= numFloors; fl++) {
      for (let u = 1; u <= unitsPerFloor; u++) {
        if (count >= newProp.totalUnits) break;
        count++;
        const unitNum = `${fl}0${u}`;
        this.data.units.push({
          id: unitNum,
          propertyId: id,
          block: newProp.blocks[0],
          floor: fl,
          type: u === 1 ? "Studio" : u === 2 ? "1-Bedroom" : "2-Bedroom Deluxe",
          sqm: u === 1 ? 45 : u === 2 ? 65 : 110,
          baseRent: u === 1 ? 45000 : u === 2 ? 65000 : 95000,
          serviceCharge: 6000,
          status: "vacant",
          kplcMeter: `MTR-${id.slice(-4)}-${unitNum}`,
          waterMeter: `WTR-${unitNum}`
        });
      }
    }

    this.save();
    return newProp;
  }

  updateProperty(id, fields) {
    const idx = this.data.properties.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.data.properties[idx] = { ...this.data.properties[idx], ...fields };
      this.save();
      return this.data.properties[idx];
    }
    return null;
  }

  deleteProperty(id) {
    this.data.properties = this.data.properties.filter(p => p.id !== id);
    this.data.units = this.data.units.filter(u => u.propertyId !== id);
    this.data.tenants = this.data.tenants.filter(t => t.propertyId !== id);
    this.data.invoices = this.data.invoices.filter(i => i.propertyId !== id);
    this.data.payments = this.data.payments.filter(p => p.propertyId !== id);
    this.data.maintenance = this.data.maintenance.filter(m => m.propertyId !== id);
    this.data.expenses = this.data.expenses.filter(e => e.propertyId !== id);
    this.data.notices = this.data.notices.filter(n => n.propertyId !== id);
    this.save();
  }

  // --- Property Scoped Data Retrieval ---
  getPropertyFullData(propertyId) {
    const property = this.getProperty(propertyId) || this.data.properties[0];
    if (!property) return null;

    const units = this.data.units.filter(u => u.propertyId === property.id);
    const tenants = this.data.tenants.filter(t => t.propertyId === property.id);
    const invoices = this.data.invoices.filter(i => i.propertyId === property.id);
    const payments = this.data.payments.filter(p => p.propertyId === property.id);
    const maintenance = this.data.maintenance.filter(m => m.propertyId === property.id);
    const expenses = this.data.expenses.filter(e => e.propertyId === property.id);
    const notices = this.data.notices.filter(n => n.propertyId === property.id);

    return {
      property,
      units,
      tenants,
      invoices,
      payments,
      maintenance,
      expenses,
      notices
    };
  }

  // --- Transactions & Mutations ---
  addUnit(unitData) {
    this.data.units.push(unitData);
    this.save();
    return unitData;
  }

  updateUnit(propertyId, unitId, fields) {
    const idx = this.data.units.findIndex(u => u.propertyId === propertyId && u.id === unitId);
    if (idx !== -1) {
      this.data.units[idx] = { ...this.data.units[idx], ...fields };
      this.save();
      return this.data.units[idx];
    }
    return null;
  }

  addTenant(tenantData) {
    this.data.tenants.push(tenantData);
    // Mark unit occupied
    if (tenantData.unitId) {
      const uIdx = this.data.units.findIndex(u => u.propertyId === tenantData.propertyId && u.id === tenantData.unitId);
      if (uIdx !== -1) this.data.units[uIdx].status = "occupied";
    }
    this.save();
    return tenantData;
  }

  recordPayment(payData) {
    this.data.payments.unshift(payData);

    // Reconcile invoice
    if (payData.invoiceId) {
      const invIdx = this.data.invoices.findIndex(i => i.id === payData.invoiceId);
      if (invIdx !== -1) {
        const inv = this.data.invoices[invIdx];
        const newPaid = (inv.amountPaid || 0) + payData.amount;
        const newBal = Math.max(0, (inv.totalAmount || 0) - newPaid);
        inv.amountPaid = newPaid;
        inv.balance = newBal;
        inv.status = newBal <= 0 ? "paid" : "partial";
      }
    }

    // Update tenant arrears
    if (payData.tenantId) {
      const tIdx = this.data.tenants.findIndex(t => t.id === payData.tenantId);
      if (tIdx !== -1) {
        this.data.tenants[tIdx].arrears = Math.max(0, (this.data.tenants[tIdx].arrears || 0) - payData.amount);
      }
    }

    this.save();
    return payData;
  }

  generateInvoices(propertyId, monthYear) {
    const propTenants = this.data.tenants.filter(t => t.propertyId === propertyId && t.status === "active");
    const propUnits = this.data.units.filter(u => u.propertyId === propertyId);
    const prop = this.getProperty(propertyId);
    const created = [];

    propTenants.forEach(tenant => {
      const unit = propUnits.find(u => u.id === tenant.unitId);
      if (!unit) return;

      const baseRent = unit.baseRent || 50000;
      const serviceCharge = unit.serviceCharge || 6000;
      const waterUnits = 12;
      const waterAmount = waterUnits * (prop?.billing?.waterRatePerUnit || 160);
      const garbageFee = 1500;
      const total = baseRent + serviceCharge + waterAmount + garbageFee;
      const id = `INV-${propertyId.slice(-4)}-${monthYear.replace(/\s+/g, '')}-${unit.id}`;

      if (!this.data.invoices.some(i => i.id === id)) {
        const inv = {
          id,
          propertyId,
          unitId: unit.id,
          tenantId: tenant.id,
          tenantName: tenant.name,
          month: monthYear,
          issueDate: new Date().toISOString().split('T')[0],
          dueDate: "2026-11-05",
          baseRent,
          serviceCharge,
          waterUnits,
          waterAmount,
          garbageFee,
          latePenalty: 0,
          totalAmount: total,
          amountPaid: 0,
          balance: total,
          status: "unpaid"
        };
        this.data.invoices.unshift(inv);
        created.push(inv);
      }
    });

    this.save();
    return created;
  }

  addMaintenance(ticketData) {
    this.data.maintenance.unshift(ticketData);
    this.save();
    return ticketData;
  }

  updateMaintenance(propertyId, ticketId, fields) {
    const idx = this.data.maintenance.findIndex(m => m.propertyId === propertyId && m.id === ticketId);
    if (idx !== -1) {
      this.data.maintenance[idx] = { ...this.data.maintenance[idx], ...fields };
      // Auto-log expense if resolved with actual cost
      if (fields.status === "Resolved" && fields.actualCost) {
        this.addExpense({
          propertyId,
          date: new Date().toISOString().split('T')[0],
          category: "Maintenance Repair",
          description: `Repairs for ${this.data.maintenance[idx].ticketNo}: ${this.data.maintenance[idx].title}`,
          amount: parseFloat(fields.actualCost),
          payee: this.data.maintenance[idx].assignedFundi || "Contractor",
          paymentMethod: "mpesa_paybill",
          reference: "EXP-AUTO-" + this.data.maintenance[idx].ticketNo,
          status: "Paid"
        });
      }
      this.save();
      return this.data.maintenance[idx];
    }
    return null;
  }

  addExpense(expData) {
    this.data.expenses.unshift(expData);
    this.save();
    return expData;
  }

  addNotice(noticeData) {
    this.data.notices.unshift(noticeData);
    this.save();
    return noticeData;
  }
}

export const db = new Database();
