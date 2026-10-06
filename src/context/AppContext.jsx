import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  PROPERTY_INFO,
  INITIAL_UNITS,
  INITIAL_TENANTS,
  INITIAL_INVOICES,
  INITIAL_PAYMENTS,
  INITIAL_MAINTENANCE,
  INITIAL_EXPENSES,
  INITIAL_NOTICES,
  calculateStats,
  loadStoredData,
  saveStoredData,
  clearAllStoredData
} from '../data/mockData';

const AppContext = createContext();

// Pre-configured Multi-Client Estates
const DEFAULT_CLIENT_PROPERTIES = [
  {
    id: "prop-ab-kilimani",
    name: "AB Apartments Kilimani",
    clientName: "AB Property Holdings Ltd",
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
    name: "Kilimani Heights Suites",
    clientName: "Heights Capital Properties",
    tagline: "Contemporary Executive Suites & Corporate Residences",
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
    billing: {
      mpesaPaybill: "522123",
      mpesaTill: "409182",
      bankName: "Standard Chartered Bank",
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
    clientName: "Riverside Luxury Assets",
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

export function AppProvider({ children }) {
  // Multi-Client Properties Store
  const [properties, setProperties] = useState(() => loadStoredData("client_properties", DEFAULT_CLIENT_PROPERTIES));
  const [currentPropertyId, setCurrentPropertyId] = useState(() => loadStoredData("current_property_id", "prop-ab-kilimani"));

  // Active Property
  const currentProperty = properties.find(p => p.id === currentPropertyId) || properties[0] || DEFAULT_CLIENT_PROPERTIES[0];

  // Core Collections (Stored with property scope)
  const [units, setUnits] = useState(() => loadStoredData(`units_${currentPropertyId}`, INITIAL_UNITS));
  const [tenants, setTenants] = useState(() => loadStoredData(`tenants_${currentPropertyId}`, INITIAL_TENANTS));
  const [invoices, setInvoices] = useState(() => loadStoredData(`invoices_${currentPropertyId}`, INITIAL_INVOICES));
  const [payments, setPayments] = useState(() => loadStoredData(`payments_${currentPropertyId}`, INITIAL_PAYMENTS));
  const [maintenance, setMaintenance] = useState(() => loadStoredData(`maintenance_${currentPropertyId}`, INITIAL_MAINTENANCE));
  const [expenses, setExpenses] = useState(() => loadStoredData(`expenses_${currentPropertyId}`, INITIAL_EXPENSES));
  const [notices, setNotices] = useState(() => loadStoredData(`notices_${currentPropertyId}`, INITIAL_NOTICES));

  // Navigation & Role State
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userRole, setUserRole] = useState("admin"); // 'admin' | 'resident'
  const [selectedResidentId, setSelectedResidentId] = useState("TEN-001");
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState("dark");
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Modals & Drawers state
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [isStkModalOpen, setIsStkModalOpen] = useState(false);
  const [stkPayload, setStkPayload] = useState(null);
  const [isAddTenantModalOpen, setIsAddTenantModalOpen] = useState(false);
  const [isAddUnitModalOpen, setIsAddUnitModalOpen] = useState(false);
  const [isAddMaintenanceModalOpen, setIsAddMaintenanceModalOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);
  const [isPropertySettingsModalOpen, setIsPropertySettingsModalOpen] = useState(false);

  // Notifications
  const [toasts, setToasts] = useState([]);

  // Check Backend Health
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          setIsBackendConnected(true);
        }
      })
      .catch(() => setIsBackendConnected(false));
  }, []);

  // Save changes to LocalStorage
  useEffect(() => { saveStoredData("client_properties", properties); }, [properties]);
  useEffect(() => { saveStoredData("current_property_id", currentPropertyId); }, [currentPropertyId]);
  useEffect(() => { saveStoredData(`units_${currentPropertyId}`, units); }, [units, currentPropertyId]);
  useEffect(() => { saveStoredData(`tenants_${currentPropertyId}`, tenants); }, [tenants, currentPropertyId]);
  useEffect(() => { saveStoredData(`invoices_${currentPropertyId}`, invoices); }, [invoices, currentPropertyId]);
  useEffect(() => { saveStoredData(`payments_${currentPropertyId}`, payments); }, [payments, currentPropertyId]);
  useEffect(() => { saveStoredData(`maintenance_${currentPropertyId}`, maintenance); }, [maintenance, currentPropertyId]);
  useEffect(() => { saveStoredData(`expenses_${currentPropertyId}`, expenses); }, [expenses, currentPropertyId]);
  useEffect(() => { saveStoredData(`notices_${currentPropertyId}`, notices); }, [notices, currentPropertyId]);

  // Switch Property Handler
  const switchProperty = (propId) => {
    setCurrentPropertyId(propId);
    // Reload collections for this property
    const propUnits = loadStoredData(`units_${propId}`, propId === "prop-ab-kilimani" ? INITIAL_UNITS : []);
    const propTenants = loadStoredData(`tenants_${propId}`, propId === "prop-ab-kilimani" ? INITIAL_TENANTS : []);
    const propInvoices = loadStoredData(`invoices_${propId}`, propId === "prop-ab-kilimani" ? INITIAL_INVOICES : []);
    const propPayments = loadStoredData(`payments_${propId}`, propId === "prop-ab-kilimani" ? INITIAL_PAYMENTS : []);
    const propMaintenance = loadStoredData(`maintenance_${propId}`, propId === "prop-ab-kilimani" ? INITIAL_MAINTENANCE : []);
    const propExpenses = loadStoredData(`expenses_${propId}`, propId === "prop-ab-kilimani" ? INITIAL_EXPENSES : []);
    const propNotices = loadStoredData(`notices_${propId}`, propId === "prop-ab-kilimani" ? INITIAL_NOTICES : []);

    setUnits(propUnits);
    setTenants(propTenants);
    setInvoices(propInvoices);
    setPayments(propPayments);
    setMaintenance(propMaintenance);
    setExpenses(propExpenses);
    setNotices(propNotices);
    if (propTenants.length > 0) setSelectedResidentId(propTenants[0].id);

    const targetProp = properties.find(p => p.id === propId);
    addToast("Client Switched", `Active property changed to ${targetProp?.name || propId}`, "info");
  };

  // Create New Client Property
  const createProperty = (propData) => {
    const id = "prop-" + propData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') + "-" + Math.floor(100 + Math.random() * 900);
    const newProp = {
      id,
      ...propData,
      totalUnits: parseInt(propData.totalUnits) || 20,
      floors: parseInt(propData.floors) || 4,
      blocks: propData.blocks || ["Wing A"],
      currency: propData.currency || "KES",
      currencySymbol: propData.currencySymbol || "KSh",
      billing: {
        mpesaPaybill: propData.billing?.mpesaPaybill || "400000",
        mpesaTill: propData.billing?.mpesaTill || "123456",
        bankName: propData.billing?.bankName || "NCBA Bank",
        bankBranch: propData.billing?.bankBranch || "Main Branch",
        accountNumber: propData.billing?.accountNumber || "100200300",
        lateFeePercent: parseFloat(propData.billing?.lateFeePercent) || 5,
        waterRatePerUnit: parseFloat(propData.billing?.waterRatePerUnit) || 160,
        dueDay: parseInt(propData.billing?.dueDay) || 5
      },
      contacts: propData.contacts || {
        manager: "Property Manager",
        phone: "+254 700 000 000",
        email: "info@estate.co.ke",
        caretaker: "Caretaker",
        caretakerPhone: "+254 711 000 000",
        securityGate: "+254 733 000 000"
      }
    };

    // Auto-generate starter units
    const starterUnits = [];
    const numFloors = newProp.floors;
    const unitsPerFloor = Math.ceil(newProp.totalUnits / numFloors);
    let count = 0;

    for (let fl = 1; fl <= numFloors; fl++) {
      for (let u = 1; u <= unitsPerFloor; u++) {
        if (count >= newProp.totalUnits) break;
        count++;
        const unitNum = `${fl}0${u}`;
        starterUnits.push({
          id: unitNum,
          block: newProp.blocks[0],
          floor: fl,
          type: u === 1 ? "Studio" : u === 2 ? "1-Bedroom" : "2-Bedroom Deluxe",
          sqm: u === 1 ? 45 : u === 2 ? 65 : 110,
          baseRent: u === 1 ? 45000 : u === 2 ? 65000 : 95000,
          serviceCharge: 6000,
          status: "vacant",
          kplcMeter: `MTR-${id.slice(-4)}-${unitNum}`,
          waterMeter: `WTR-${unitNum}`,
          balcony: true,
          dsq: false
        });
      }
    }

    setProperties(prev => [...prev, newProp]);
    saveStoredData(`units_${id}`, starterUnits);
    saveStoredData(`tenants_${id}`, []);
    saveStoredData(`invoices_${id}`, []);
    saveStoredData(`payments_${id}`, []);
    saveStoredData(`maintenance_${id}`, []);
    saveStoredData(`expenses_${id}`, []);
    saveStoredData(`notices_${id}`, []);

    // Also call backend API if connected
    if (isBackendConnected) {
      fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProp)
      }).catch(err => console.log('Backend sync skipped:', err));
    }

    switchProperty(id);
    addToast("Client Estate Created", `${newProp.name} configured with ${starterUnits.length} starter units.`, "success");
    setIsAddPropertyModalOpen(false);
  };

  const updatePropertySettings = (propId, updatedFields) => {
    setProperties(prev => prev.map(p => p.id === propId ? { ...p, ...updatedFields } : p));
    addToast("Settings Saved", `Configuration for ${currentProperty.name} updated.`, "success");
    setIsPropertySettingsModalOpen(false);
  };

  // Toast dispatch helper
  const addToast = (title, message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00a651', '#10b981', '#f59e0b', '#38bdf8']
      });
    } catch (e) {
      console.log('Confetti');
    }
  };

  // --- ACTIONS ---
  const recordPayment = ({
    invoiceId,
    unitId,
    tenantId,
    tenantName,
    amount,
    paymentMethod,
    reference,
    phoneNumber,
    description
  }) => {
    const numericAmount = parseFloat(amount) || 0;
    const paymentId = "PAY-" + Math.floor(1000 + Math.random() * 9000);
    const receiptNum = "RCPT-" + Math.floor(1000 + Math.random() * 9000);
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const newPayment = {
      id: paymentId,
      receiptNumber: receiptNum,
      invoiceId: invoiceId || `INV-${unitId}-MANUAL`,
      unitId,
      tenantId: tenantId || "TEN-GUEST",
      tenantName: tenantName || "Resident",
      amount: numericAmount,
      paymentMethod: paymentMethod || "mpesa_paybill",
      reference: reference || "SLK" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      phoneNumber: phoneNumber || "+254 7XX XXX XXX",
      date: formattedDate,
      status: "Verified",
      description: description || `Payment for Unit ${unitId} via ${paymentMethod}`
    };

    setPayments(prev => [newPayment, ...prev]);

    if (invoiceId) {
      setInvoices(prev => prev.map(inv => {
        if (inv.id === invoiceId) {
          const newPaid = (inv.amountPaid || 0) + numericAmount;
          const newBalance = Math.max(0, (inv.totalAmount || 0) - newPaid);
          const newStatus = newBalance <= 0 ? "paid" : "partial";
          return {
            ...inv,
            amountPaid: newPaid,
            balance: newBalance,
            status: newStatus,
            paidDate: newStatus === "paid" ? formattedDate : inv.paidDate
          };
        }
        return inv;
      }));
    }

    if (tenantId) {
      setTenants(prev => prev.map(t => {
        if (t.id === tenantId) {
          return {
            ...t,
            arrears: Math.max(0, (t.arrears || 0) - numericAmount)
          };
        }
        return t;
      }));
    }

    triggerConfetti();
    addToast(
      "Payment Verified",
      `Received ${currentProperty.currency} ${numericAmount.toLocaleString()} for Unit ${unitId}. Receipt #${receiptNum} generated.`,
      "success"
    );

    return newPayment;
  };

  const launchMpesaStkPush = (data) => {
    setStkPayload(data);
    setIsStkModalOpen(true);
  };

  const generateBulkInvoices = (monthYear = "November 2026") => {
    const activeTenants = tenants.filter(t => t.status === "active");
    const newInvoices = [];

    activeTenants.forEach(tenant => {
      const unit = units.find(u => u.id === tenant.unitId);
      if (!unit) return;

      const baseRent = unit.baseRent || 50000;
      const serviceCharge = unit.serviceCharge || 6000;
      const estWaterUnits = 12;
      const waterRate = currentProperty.billing.waterRatePerUnit || 160;
      const waterAmount = estWaterUnits * waterRate;
      const garbageFee = 1500;
      const total = baseRent + serviceCharge + waterAmount + garbageFee;

      const invId = `INV-${currentPropertyId.slice(-4)}-${monthYear.replace(/\s+/g, '-').toUpperCase()}-${unit.id}`;

      const exists = invoices.some(i => i.id === invId);
      if (!exists) {
        newInvoices.push({
          id: invId,
          unitId: unit.id,
          tenantId: tenant.id,
          tenantName: tenant.name,
          month: monthYear,
          issueDate: new Date().toISOString().split('T')[0],
          dueDate: "2026-11-05",
          baseRent,
          serviceCharge,
          waterUnits: estWaterUnits,
          waterRate,
          waterAmount,
          garbageFee,
          latePenalty: 0,
          totalAmount: total,
          amountPaid: 0,
          balance: total,
          status: "unpaid",
          paidDate: null
        });
      }
    });

    if (newInvoices.length > 0) {
      setInvoices(prev => [...newInvoices, ...prev]);
      addToast(
        "Invoices Generated",
        `Created ${newInvoices.length} monthly billing invoices for ${monthYear}.`,
        "info"
      );
    } else {
      addToast(
        "Up to Date",
        `All active tenants already have invoices for ${monthYear}.`,
        "info"
      );
    }
  };

  const addUnit = (unitData) => {
    const newUnit = {
      ...unitData,
      id: unitData.id.toUpperCase(),
      baseRent: parseFloat(unitData.baseRent) || 50000,
      serviceCharge: parseFloat(unitData.serviceCharge) || 6000,
      sqm: parseFloat(unitData.sqm) || 50,
      floor: parseInt(unitData.floor) || 1,
      status: unitData.status || "vacant"
    };

    setUnits(prev => [...prev, newUnit]);
    addToast("Unit Added", `Unit ${newUnit.id} successfully registered.`, "success");
  };

  const updateUnit = (unitId, updatedFields) => {
    setUnits(prev => prev.map(u => u.id === unitId ? { ...u, ...updatedFields } : u));
    addToast("Unit Updated", `Details for Unit ${unitId} updated.`, "success");
  };

  const addTenant = (tenantData) => {
    const tenantId = "TEN-" + String(tenants.length + 1).padStart(3, '0');
    const newTenant = {
      ...tenantData,
      id: tenantId,
      depositAmount: parseFloat(tenantData.depositAmount) || 0,
      depositPaid: true,
      status: "active",
      arrears: 0
    };

    setTenants(prev => [...prev, newTenant]);

    if (newTenant.unitId) {
      setUnits(prev => prev.map(u => u.id === newTenant.unitId ? { ...u, status: "occupied" } : u));
    }

    addToast("Tenant Registered", `${newTenant.name} registered and assigned to Unit ${newTenant.unitId}.`, "success");
  };

  const updateTenant = (tenantId, updatedFields) => {
    setTenants(prev => prev.map(t => t.id === tenantId ? { ...t, ...updatedFields } : t));
    addToast("Tenant Updated", `Tenant records have been updated.`, "success");
  };

  const addMaintenanceTicket = (ticketData) => {
    const ticketNo = "TKT-" + Math.floor(100 + Math.random() * 900);
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newTicket = {
      id: ticketNo,
      ticketNo,
      ...ticketData,
      status: "Open",
      reportedDate: formattedDate,
      estimatedCost: parseFloat(ticketData.estimatedCost) || 0,
      actualCost: null,
      resolvedDate: null,
      resolutionNotes: null
    };

    setMaintenance(prev => [newTicket, ...prev]);
    addToast("Work Order Logged", `Ticket #${ticketNo} registered for ${ticketData.unitId}.`, "info");
  };

  const updateMaintenanceTicket = (ticketId, fields) => {
    setMaintenance(prev => prev.map(t => {
      if (t.id === ticketId) {
        const updated = { ...t, ...fields };
        if (fields.status === "Resolved" && fields.actualCost && !t.resolvedDate) {
          logExpense({
            category: "Maintenance Repair",
            description: `Repairs for ${t.ticketNo} (${t.unitId}): ${t.title}`,
            amount: parseFloat(fields.actualCost),
            payee: t.assignedFundi || "Contractor",
            paymentMethod: "mpesa_paybill",
            reference: "EXP-AUTO-" + t.ticketNo
          });
        }
        return updated;
      }
      return t;
    }));
    addToast("Ticket Updated", `Ticket #${ticketId} updated.`, "success");
  };

  const logExpense = (expenseData) => {
    const expId = "EXP-" + Math.floor(100 + Math.random() * 900);
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];

    const newExp = {
      id: expId,
      date: expenseData.date || dateStr,
      category: expenseData.category || "General Operations",
      description: expenseData.description,
      amount: parseFloat(expenseData.amount) || 0,
      payee: expenseData.payee || "Vendor",
      paymentMethod: expenseData.paymentMethod || "mpesa_paybill",
      reference: expenseData.reference || "EXP-" + Math.random().toString(36).substring(2, 6).toUpperCase(),
      status: "Paid"
    };

    setExpenses(prev => [newExp, ...prev]);
    addToast("Expense Logged", `${currentProperty.currency} ${newExp.amount.toLocaleString()} logged for ${newExp.category}.`, "info");
  };

  const sendNotice = (noticeData) => {
    const noticeId = "NOT-" + Math.floor(200 + Math.random() * 800);
    const dateStr = new Date().toISOString().split('T')[0];

    const newNotice = {
      id: noticeId,
      date: dateStr,
      ...noticeData
    };

    setNotices(prev => [newNotice, ...prev]);
    addToast("Notice Dispatched", `Broadcast dispatched via ${noticeData.channel} to ${noticeData.target}.`, "success");
  };

  const resetToDefault = () => {
    clearAllStoredData();
    setProperties(DEFAULT_CLIENT_PROPERTIES);
    setCurrentPropertyId("prop-ab-kilimani");
    setUnits(INITIAL_UNITS);
    setTenants(INITIAL_TENANTS);
    setInvoices(INITIAL_INVOICES);
    setPayments(INITIAL_PAYMENTS);
    setMaintenance(INITIAL_MAINTENANCE);
    setExpenses(INITIAL_EXPENSES);
    setNotices(INITIAL_NOTICES);
    addToast("System Reset", "Demo data restored to initial factory defaults.", "info");
  };

  const exportBackup = () => {
    const payload = {
      properties,
      currentPropertyId,
      units,
      tenants,
      invoices,
      payments,
      maintenance,
      expenses,
      notices,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RentSync_Universal_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast("Backup Exported", "Complete database exported as JSON.", "success");
  };

  const stats = calculateStats(units, tenants, invoices, payments, expenses, maintenance);
  const currentResident = tenants.find(t => t.id === selectedResidentId) || tenants[0];
  const currentResidentUnit = units.find(u => u.id === currentResident?.unitId);
  const currentResidentInvoices = invoices.filter(i => i.tenantId === currentResident?.id);
  const currentResidentPayments = payments.filter(p => p.tenantId === currentResident?.id);
  const currentResidentTickets = maintenance.filter(m => m.unitId === currentResident?.unitId || m.reportedBy === currentResident?.name);

  return (
    <AppContext.Provider
      value={{
        properties,
        currentPropertyId,
        currentProperty,
        switchProperty,
        createProperty,
        updatePropertySettings,
        propertyInfo: currentProperty,
        units,
        tenants,
        invoices,
        payments,
        maintenance,
        expenses,
        notices,
        stats,
        activeTab,
        setActiveTab,
        userRole,
        setUserRole,
        selectedResidentId,
        setSelectedResidentId,
        currentResident,
        currentResidentUnit,
        currentResidentInvoices,
        currentResidentPayments,
        currentResidentTickets,
        searchQuery,
        setSearchQuery,
        theme,
        setTheme,
        isBackendConnected,
        // Modals
        selectedUnit,
        setSelectedUnit,
        selectedTenant,
        setSelectedTenant,
        selectedReceipt,
        setSelectedReceipt,
        isStkModalOpen,
        setIsStkModalOpen,
        stkPayload,
        launchMpesaStkPush,
        isAddTenantModalOpen,
        setIsAddTenantModalOpen,
        isAddUnitModalOpen,
        setIsAddUnitModalOpen,
        isAddMaintenanceModalOpen,
        setIsAddMaintenanceModalOpen,
        isAddExpenseModalOpen,
        setIsAddExpenseModalOpen,
        isAddPaymentModalOpen,
        setIsAddPaymentModalOpen,
        isBroadcastModalOpen,
        setIsBroadcastModalOpen,
        isReportModalOpen,
        setIsReportModalOpen,
        isAddPropertyModalOpen,
        setIsAddPropertyModalOpen,
        isPropertySettingsModalOpen,
        setIsPropertySettingsModalOpen,
        // Toasts
        toasts,
        addToast,
        removeToast,
        // Actions
        recordPayment,
        generateBulkInvoices,
        addUnit,
        updateUnit,
        addTenant,
        updateTenant,
        addMaintenanceTicket,
        updateMaintenanceTicket,
        logExpense,
        sendNotice,
        resetToDefault,
        exportBackup
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
