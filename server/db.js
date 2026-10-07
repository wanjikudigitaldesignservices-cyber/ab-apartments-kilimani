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

// Clean Initial Database Schema - ZERO DEMO DATA OR DEMO ESTATES
const getEmptyDatabase = () => ({
  properties: [],
  units: [],
  tenants: [],
  invoices: [],
  payments: [],
  maintenance: [],
  expenses: [],
  notices: []
});

class Database {
  constructor() {
    this.data = this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        const parsed = JSON.parse(raw);
        // Ensure all collections exist
        return {
          properties: parsed.properties || [],
          units: parsed.units || [],
          tenants: parsed.tenants || [],
          invoices: parsed.invoices || [],
          payments: parsed.payments || [],
          maintenance: parsed.maintenance || [],
          expenses: parsed.expenses || [],
          notices: parsed.notices || []
        };
      }
    } catch (e) {
      console.error("Error reading database file, initializing clean database:", e);
    }

    const initialDb = getEmptyDatabase();
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

    // Auto-generate starter units for the new client according to their structure
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
          baseRent: parseFloat(propData.startingRent) || 50000,
          serviceCharge: parseFloat(propData.serviceCharge) || 6000,
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
