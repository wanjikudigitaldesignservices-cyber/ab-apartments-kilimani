import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  UserPlus,
  CreditCard,
  Building2,
  Wrench,
  TrendingDown,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Settings,
  DollarSign
} from 'lucide-react';

export function ActionModals() {
  const {
    units,
    tenants,
    currentProperty,
    createProperty,
    updatePropertySettings,
    isAddTenantModalOpen,
    setIsAddTenantModalOpen,
    isAddPaymentModalOpen,
    setIsAddPaymentModalOpen,
    isAddUnitModalOpen,
    setIsAddUnitModalOpen,
    isAddMaintenanceModalOpen,
    setIsAddMaintenanceModalOpen,
    isAddExpenseModalOpen,
    setIsAddExpenseModalOpen,
    isAddPropertyModalOpen,
    setIsAddPropertyModalOpen,
    isPropertySettingsModalOpen,
    setIsPropertySettingsModalOpen,
    addTenant,
    addUnit,
    recordPayment,
    addMaintenanceTicket,
    logExpense,
    addToast
  } = useApp();

  const vacantUnits = units.filter(u => u.status === 'vacant');

  // --- Add Tenant Form State ---
  const [tenantName, setTenantName] = useState('');
  const [tenantPhone, setTenantPhone] = useState('+254 7');
  const [tenantEmail, setTenantEmail] = useState('');
  const [tenantIdDoc, setTenantIdDoc] = useState('');
  const [tenantOcc, setTenantOcc] = useState('');
  const [tenantPlate, setTenantPlate] = useState('K');
  const [tenantUnitId, setTenantUnitId] = useState(vacantUnits[0]?.id || units[0]?.id || 'A104');
  const [leaseStart, setLeaseStart] = useState('2026-11-01');
  const [leaseEnd, setLeaseEnd] = useState('2028-10-31');
  const [depositAmount, setDepositAmount] = useState('75000');
  const [kinName, setKinName] = useState('');
  const [kinPhone, setKinPhone] = useState('+254 7');

  const handleAddTenant = (e) => {
    e.preventDefault();
    if (!tenantName || !tenantPhone || !tenantUnitId) {
      alert("Please fill required tenant details");
      return;
    }

    addTenant({
      name: tenantName,
      phone: tenantPhone,
      email: tenantEmail || `${tenantName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      nationalId: tenantIdDoc || Math.floor(20000000 + Math.random() * 10000000).toString(),
      occupation: tenantOcc || "Corporate Professional",
      vehiclePlate: tenantPlate || "KDG " + Math.floor(100 + Math.random() * 900) + "X",
      unitId: tenantUnitId,
      leaseStart,
      leaseEnd,
      depositAmount: parseFloat(depositAmount) || 0,
      emergencyContact: {
        name: kinName || "Family Member",
        relation: "Next of Kin",
        phone: kinPhone
      }
    });

    setIsAddTenantModalOpen(false);
    setTenantName('');
    setTenantEmail('');
  };

  // --- Add Payment Form State ---
  const [payUnitId, setPayUnitId] = useState(tenants[0]?.unitId || units[0]?.id || 'A302');
  const [payAmount, setPayAmount] = useState('86420');
  const [payMethod, setPayMethod] = useState('mpesa_paybill');
  const [payRef, setPayRef] = useState('SLK' + Math.random().toString(36).substring(2, 8).toUpperCase());
  const [payPhone, setPayPhone] = useState('+254 722 341 890');
  const [payNotes, setPayNotes] = useState('Monthly Rent & Service Charge Settlement');

  const handleAddPayment = (e) => {
    e.preventDefault();
    const matchedTenant = tenants.find(t => t.unitId === payUnitId);

    recordPayment({
      unitId: payUnitId,
      tenantId: matchedTenant?.id,
      tenantName: matchedTenant?.name || "Resident",
      amount: parseFloat(payAmount) || 0,
      paymentMethod: payMethod,
      reference: payRef,
      phoneNumber: payPhone,
      description: payNotes
    });

    setIsAddPaymentModalOpen(false);
    setPayRef('SLK' + Math.random().toString(36).substring(2, 8).toUpperCase());
  };

  // --- Add Unit Form State ---
  const [newUnitId, setNewUnitId] = useState('A701');
  const [newUnitBlock, setNewUnitBlock] = useState(currentProperty.blocks[0] || 'Block A');
  const [newUnitFloor, setNewUnitFloor] = useState('7');
  const [newUnitType, setNewUnitType] = useState('2-Bedroom Deluxe');
  const [newUnitSqm, setNewUnitSqm] = useState('115');
  const [newUnitRent, setNewUnitRent] = useState('105000');
  const [newUnitService, setNewUnitService] = useState('9000');

  const handleAddUnit = (e) => {
    e.preventDefault();
    addUnit({
      id: newUnitId,
      block: newUnitBlock,
      floor: parseInt(newUnitFloor),
      type: newUnitType,
      sqm: parseFloat(newUnitSqm),
      baseRent: parseFloat(newUnitRent),
      serviceCharge: parseFloat(newUnitService),
      status: 'vacant',
      kplcMeter: `MTR-${newUnitId}`,
      waterMeter: `WTR-${newUnitId}`,
      balcony: true,
      dsq: newUnitType.includes('Penthouse')
    });
    setIsAddUnitModalOpen(false);
  };

  // --- Add Maintenance Form State ---
  const [maintUnit, setMaintUnit] = useState(units[0]?.id || 'A204');
  const [maintReporter, setMaintReporter] = useState('Resident');
  const [maintCategory, setMaintCategory] = useState('Plumbing');
  const [maintPriority, setMaintPriority] = useState('High');
  const [maintTitle, setMaintTitle] = useState('');
  const [maintDesc, setMaintDesc] = useState('');
  const [maintFundi, setMaintFundi] = useState('Fundi Juma Plumbing');
  const [maintFundiPhone, setMaintFundiPhone] = useState('+254 721 884 102');
  const [maintEstCost, setMaintEstCost] = useState('4500');

  const handleAddMaint = (e) => {
    e.preventDefault();
    addMaintenanceTicket({
      unitId: maintUnit,
      reportedBy: maintReporter,
      category: maintCategory,
      priority: maintPriority,
      title: maintTitle,
      description: maintDesc,
      assignedFundi: maintFundi,
      fundiPhone: maintFundiPhone,
      estimatedCost: parseFloat(maintEstCost) || 0
    });
    setIsAddMaintenanceModalOpen(false);
    setMaintTitle('');
    setMaintDesc('');
  };

  // --- Add Expense Form State ---
  const [expCategory, setExpCategory] = useState('Security & Biometrics');
  const [expDesc, setExpDesc] = useState('');
  const [expAmount, setExpAmount] = useState('25000');
  const [expPayee, setExpPayee] = useState('');
  const [expMethod, setExpMethod] = useState('mpesa_paybill');
  const [expRef, setExpRef] = useState('EXP-REF-' + Math.floor(1000 + Math.random() * 9000));

  const handleAddExpense = (e) => {
    e.preventDefault();
    logExpense({
      category: expCategory,
      description: expDesc,
      amount: parseFloat(expAmount) || 0,
      payee: expPayee || 'Vendor Contractor',
      paymentMethod: expMethod,
      reference: expRef
    });
    setIsAddExpenseModalOpen(false);
    setExpDesc('');
    setExpPayee('');
  };

  // --- New Client Property Form State ---
  const [propName, setPropName] = useState('');
  const [propClient, setPropClient] = useState('');
  const [propTagline, setPropTagline] = useState('Luxury Residential Apartments');
  const [propAddress, setPropAddress] = useState('');
  const [propCity, setPropCity] = useState('Nairobi');
  const [propCounty, setPropCounty] = useState('Nairobi City County');
  const [propCurrency, setPropCurrency] = useState('KES');
  const [propCurrencySymbol, setPropCurrencySymbol] = useState('KSh');
  const [propUnitsCount, setPropUnitsCount] = useState('32');
  const [propFloorsCount, setPropFloorsCount] = useState('5');
  const [propBlocksInput, setPropBlocksInput] = useState('Wing A, Wing B');
  const [propPaybill, setPropPaybill] = useState('400222');
  const [propTill, setPropTill] = useState('512900');
  const [propBank, setPropBank] = useState('NCBA Bank Kenya');
  const [propBankAcc, setPropBankAcc] = useState('1008291040');
  const [propLateFee, setPropLateFee] = useState('5');
  const [propWaterRate, setPropWaterRate] = useState('160');

  const handleCreateProperty = (e) => {
    e.preventDefault();
    if (!propName || !propAddress) {
      alert("Please provide the property name and address");
      return;
    }

    const blocksList = propBlocksInput.split(',').map(b => b.trim()).filter(Boolean);

    createProperty({
      name: propName,
      clientName: propClient || `${propName} Holdings Ltd`,
      tagline: propTagline,
      address: propAddress,
      city: propCity,
      county: propCounty,
      country: "Kenya",
      currency: propCurrency,
      currencySymbol: propCurrencySymbol,
      totalUnits: parseInt(propUnitsCount) || 20,
      floors: parseInt(propFloorsCount) || 4,
      blocks: blocksList.length > 0 ? blocksList : ["Main Wing"],
      billing: {
        mpesaPaybill: propPaybill,
        mpesaTill: propTill,
        bankName: propBank,
        accountNumber: propBankAcc,
        lateFeePercent: parseFloat(propLateFee) || 5,
        waterRatePerUnit: parseFloat(propWaterRate) || 160,
        dueDay: 5
      }
    });

    setPropName('');
    setPropAddress('');
  };

  // --- Property Settings State ---
  const [settPaybill, setSettPaybill] = useState(currentProperty.billing.mpesaPaybill);
  const [settTill, setSettTill] = useState(currentProperty.billing.mpesaTill || '');
  const [settBank, setSettBank] = useState(currentProperty.billing.bankName);
  const [settBankAcc, setSettBankAcc] = useState(currentProperty.billing.accountNumber);
  const [settLateFee, setSettLateFee] = useState(currentProperty.billing.lateFeePercent);
  const [settWaterRate, setSettWaterRate] = useState(currentProperty.billing.waterRatePerUnit);
  const [settManagerPhone, setSettManagerPhone] = useState(currentProperty.contacts.phone);
  const [settCaretakerPhone, setSettCaretakerPhone] = useState(currentProperty.contacts.caretakerPhone);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updatePropertySettings(currentProperty.id, {
      billing: {
        ...currentProperty.billing,
        mpesaPaybill: settPaybill,
        mpesaTill: settTill,
        bankName: settBank,
        accountNumber: settBankAcc,
        lateFeePercent: parseFloat(settLateFee),
        waterRatePerUnit: parseFloat(settWaterRate)
      },
      contacts: {
        ...currentProperty.contacts,
        phone: settManagerPhone,
        caretakerPhone: settCaretakerPhone
      }
    });
  };

  return (
    <>
      {/* 1. Add New Client Estate Modal */}
      {isAddPropertyModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content action-modal animate-fade-in" style={{ width: '820px' }}>
            <div className="modal-header">
              <div className="header-brand">
                <Layers size={22} className="text-gold" />
                <h3>Onboard New Client / Rental Estate</h3>
              </div>
              <button className="icon-btn" onClick={() => setIsAddPropertyModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateProperty} className="modal-body">
              <p className="font-xs text-muted" style={{ marginBottom: '14px' }}>
                Universal Multi-Client SaaS: Setup an independent rental portal for a new client with custom wings, floors, currency, and Safaricom Paybill.
              </p>

              <div className="form-grid-2col">
                <div className="form-group">
                  <label>Property / Estate Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Parklands Terrace Residences"
                    value={propName}
                    onChange={(e) => setPropName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Client / Landlord Organization</label>
                  <input
                    type="text"
                    placeholder="e.g. Parklands Asset Management Ltd"
                    value={propClient}
                    onChange={(e) => setPropClient(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Physical Address / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. 3rd Parklands Avenue, Nairobi"
                    value={propAddress}
                    onChange={(e) => setPropAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>City & County</label>
                  <input
                    type="text"
                    placeholder="Nairobi, Nairobi County"
                    value={propCity}
                    onChange={(e) => setPropCity(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Billing Currency</label>
                  <select value={propCurrency} onChange={(e) => {
                    setPropCurrency(e.target.value);
                    setPropCurrencySymbol(e.target.value === 'USD' ? '$' : e.target.value === 'EUR' ? '€' : 'KSh');
                  }}>
                    <option value="KES">KES - Kenyan Shillings (KSh)</option>
                    <option value="USD">USD - United States Dollar ($)</option>
                    <option value="EUR">EUR - Euro (€)</option>
                    <option value="GBP">GBP - British Pound (£)</option>
                    <option value="UGX">UGX - Ugandan Shillings</option>
                    <option value="TZS">TZS - Tanzanian Shillings</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Total Units Count</label>
                  <input
                    type="number"
                    value={propUnitsCount}
                    onChange={(e) => setPropUnitsCount(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Number of Floors</label>
                  <input
                    type="number"
                    value={propFloorsCount}
                    onChange={(e) => setPropFloorsCount(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Wings / Blocks (Comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. Wing A, Wing B"
                    value={propBlocksInput}
                    onChange={(e) => setPropBlocksInput(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Safaricom M-Pesa Paybill Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 408920"
                    value={propPaybill}
                    onChange={(e) => setPropPaybill(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>M-Pesa Till / Buy Goods Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 982145"
                    value={propTill}
                    onChange={(e) => setPropTill(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Bank Name & Branch</label>
                  <input
                    type="text"
                    placeholder="e.g. NCBA Bank Upper Hill"
                    value={propBank}
                    onChange={(e) => setPropBank(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Bank Account Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 1002938471"
                    value={propBankAcc}
                    onChange={(e) => setPropBankAcc(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-actions-bar">
                <button type="submit" className="btn-primary">
                  Deploy Client Estate & Scaffold Units
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setIsAddPropertyModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Client Estate Settings / Customization Modal */}
      {isPropertySettingsModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content action-modal animate-fade-in">
            <div className="modal-header">
              <div className="header-brand">
                <Settings size={22} className="text-emerald" />
                <h3>Configure {currentProperty.name}</h3>
              </div>
              <button className="icon-btn" onClick={() => setIsPropertySettingsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveSettings} className="modal-body">
              <div className="form-grid-2col">
                <div className="form-group">
                  <label>M-Pesa Paybill Number</label>
                  <input
                    type="text"
                    value={settPaybill}
                    onChange={(e) => setSettPaybill(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>M-Pesa Till Number</label>
                  <input
                    type="text"
                    value={settTill}
                    onChange={(e) => setSettTill(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Bank Name</label>
                  <input
                    type="text"
                    value={settBank}
                    onChange={(e) => setSettBank(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Bank Account Number</label>
                  <input
                    type="text"
                    value={settBankAcc}
                    onChange={(e) => setSettBankAcc(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Late Fee Percentage (%)</label>
                  <input
                    type="number"
                    value={settLateFee}
                    onChange={(e) => setSettLateFee(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Water Rate ({currentProperty.currency} / m³)</label>
                  <input
                    type="number"
                    value={settWaterRate}
                    onChange={(e) => setSettWaterRate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Management Hotline Phone</label>
                  <input
                    type="text"
                    value={settManagerPhone}
                    onChange={(e) => setSettManagerPhone(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Caretaker Mobile Phone</label>
                  <input
                    type="text"
                    value={settCaretakerPhone}
                    onChange={(e) => setSettCaretakerPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-actions-bar">
                <button type="submit" className="btn-primary">
                  Save Estate Settings
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setIsPropertySettingsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Add Tenant Modal */}
      {isAddTenantModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content action-modal animate-fade-in">
            <div className="modal-header">
              <div className="header-brand">
                <UserPlus size={22} className="text-emerald" />
                <h3>Onboard Tenant to {currentProperty.name}</h3>
              </div>
              <button className="icon-btn" onClick={() => setIsAddTenantModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddTenant} className="modal-body">
              <div className="form-grid-2col">
                <div className="form-group">
                  <label>Full Legal Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Grace Njeri Waweru"
                    value={tenantName}
                    onChange={(e) => setTenantName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Safaricom Phone Number</label>
                  <input
                    type="text"
                    placeholder="+254 722 000 000"
                    value={tenantPhone}
                    onChange={(e) => setTenantPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="resident@gmail.com"
                    value={tenantEmail}
                    onChange={(e) => setTenantEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>National ID / Passport Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 29481920"
                    value={tenantIdDoc}
                    onChange={(e) => setTenantIdDoc(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Select Vacant Apartment Unit</label>
                  <select 
                    value={tenantUnitId} 
                    onChange={(e) => {
                      setTenantUnitId(e.target.value);
                      const u = units.find(item => item.id === e.target.value);
                      if (u) setDepositAmount(String(u.baseRent));
                    }}
                  >
                    {vacantUnits.map(u => (
                      <option key={u.id} value={u.id}>
                        Unit {u.id} ({u.type}) - {currentProperty.currency} {u.baseRent.toLocaleString()}/mo
                      </option>
                    ))}
                    {vacantUnits.length === 0 && (
                      <option value="A104">Unit A104</option>
                    )}
                  </select>
                </div>

                <div className="form-group">
                  <label>Security Deposit ({currentProperty.currency})</label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Lease Start Date</label>
                  <input
                    type="date"
                    value={leaseStart}
                    onChange={(e) => setLeaseStart(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Lease End Date</label>
                  <input
                    type="date"
                    value={leaseEnd}
                    onChange={(e) => setLeaseEnd(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Vehicle Plate</label>
                  <input
                    type="text"
                    placeholder="e.g. KDF 884M"
                    value={tenantPlate}
                    onChange={(e) => setTenantPlate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Occupation / Employer</label>
                  <input
                    type="text"
                    placeholder="e.g. Software Consultant"
                    value={tenantOcc}
                    onChange={(e) => setTenantOcc(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-actions-bar">
                <button type="submit" className="btn-primary">
                  Register & Assign Unit {tenantUnitId}
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setIsAddTenantModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Record Payment Modal */}
      {isAddPaymentModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content action-modal animate-fade-in">
            <div className="modal-header">
              <div className="header-brand">
                <CreditCard size={22} className="text-emerald" />
                <h3>Record Payment for {currentProperty.name}</h3>
              </div>
              <button className="icon-btn" onClick={() => setIsAddPaymentModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddPayment} className="modal-body">
              <div className="form-grid-2col">
                <div className="form-group">
                  <label>Select Unit / Resident</label>
                  <select 
                    value={payUnitId} 
                    onChange={(e) => {
                      setPayUnitId(e.target.value);
                      const t = tenants.find(item => item.unitId === e.target.value);
                      if (t && t.phone) setPayPhone(t.phone);
                    }}
                  >
                    {units.map(u => (
                      <option key={u.id} value={u.id}>
                        Unit {u.id} {tenants.find(t => t.unitId === u.id) ? `(${tenants.find(t => t.unitId === u.id).name})` : '(Vacant)'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Amount ({currentProperty.currency})</label>
                  <input
                    type="number"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Payment Gateway</label>
                  <select value={payMethod} onChange={(e) => setPayMethod(e.target.value)}>
                    <option value="mpesa_paybill">Safaricom M-Pesa Paybill ({currentProperty.billing.mpesaPaybill})</option>
                    <option value="mpesa_stk">M-Pesa STK Push Express Checkout</option>
                    <option value="bank_transfer">{currentProperty.billing.bankName} Direct Wire</option>
                    <option value="cash">Cash Received at Management Office</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Reference Code / Receipt</label>
                  <input
                    type="text"
                    value={payRef}
                    onChange={(e) => setPayRef(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Payer Mobile Phone</label>
                  <input
                    type="text"
                    value={payPhone}
                    onChange={(e) => setPayPhone(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Notes</label>
                  <input
                    type="text"
                    value={payNotes}
                    onChange={(e) => setPayNotes(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-actions-bar">
                <button type="submit" className="btn-primary">
                  Verify & Issue Receipt
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setIsAddPaymentModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Add Custom Unit Modal */}
      {isAddUnitModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content action-modal animate-fade-in">
            <div className="modal-header">
              <div className="header-brand">
                <Building2 size={22} className="text-emerald" />
                <h3>Add Unit to {currentProperty.name}</h3>
              </div>
              <button className="icon-btn" onClick={() => setIsAddUnitModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddUnit} className="modal-body">
              <div className="form-grid-2col">
                <div className="form-group">
                  <label>Unit Identifier</label>
                  <input
                    type="text"
                    value={newUnitId}
                    onChange={(e) => setNewUnitId(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Wing / Block</label>
                  <select value={newUnitBlock} onChange={(e) => setNewUnitBlock(e.target.value)}>
                    {currentProperty.blocks.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Floor Number</label>
                  <input
                    type="number"
                    value={newUnitFloor}
                    onChange={(e) => setNewUnitFloor(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Layout Type</label>
                  <select value={newUnitType} onChange={(e) => setNewUnitType(e.target.value)}>
                    <option value="Studio">Studio</option>
                    <option value="1-Bedroom">1-Bedroom</option>
                    <option value="2-Bedroom Deluxe">2-Bedroom Deluxe</option>
                    <option value="3-Bedroom Penthouse">3-Bedroom Penthouse</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Monthly Base Rent ({currentProperty.currency})</label>
                  <input
                    type="number"
                    value={newUnitRent}
                    onChange={(e) => setNewUnitRent(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Service Charge ({currentProperty.currency})</label>
                  <input
                    type="number"
                    value={newUnitService}
                    onChange={(e) => setNewUnitService(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="modal-actions-bar">
                <button type="submit" className="btn-primary">
                  Create Unit {newUnitId}
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setIsAddUnitModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Log Maintenance Modal */}
      {isAddMaintenanceModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content action-modal animate-fade-in">
            <div className="modal-header">
              <div className="header-brand">
                <Wrench size={22} className="text-emerald" />
                <h3>Log Maintenance for {currentProperty.name}</h3>
              </div>
              <button className="icon-btn" onClick={() => setIsAddMaintenanceModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddMaint} className="modal-body">
              <div className="form-grid-2col">
                <div className="form-group">
                  <label>Location / Unit</label>
                  <select value={maintUnit} onChange={(e) => setMaintUnit(e.target.value)}>
                    <option value="Common Compound">Common Areas (Compound/Lifts/Gates)</option>
                    {units.map(u => (
                      <option key={u.id} value={u.id}>Unit {u.id}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select value={maintCategory} onChange={(e) => setMaintCategory(e.target.value)}>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Elevator">Elevator</option>
                    <option value="Security">Security & Biometrics</option>
                    <option value="Borehole">Borehole & Water</option>
                    <option value="Carpentry">Carpentry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Priority</label>
                  <select value={maintPriority} onChange={(e) => setMaintPriority(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Contractor / Fundi Name</label>
                  <input
                    type="text"
                    value={maintFundi}
                    onChange={(e) => setMaintFundi(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Issue Summary</label>
                <input
                  type="text"
                  placeholder="e.g. Master bathroom pressure regulator drip"
                  value={maintTitle}
                  onChange={(e) => setMaintTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="3"
                  value={maintDesc}
                  onChange={(e) => setMaintDesc(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="modal-actions-bar">
                <button type="submit" className="btn-primary">
                  Dispatch Ticket
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setIsAddMaintenanceModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Add Expense Modal */}
      {isAddExpenseModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content action-modal animate-fade-in">
            <div className="modal-header">
              <div className="header-brand">
                <TrendingDown size={22} className="text-rose" />
                <h3>Log Expense for {currentProperty.name}</h3>
              </div>
              <button className="icon-btn" onClick={() => setIsAddExpenseModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddExpense} className="modal-body">
              <div className="form-grid-2col">
                <div className="form-group">
                  <label>Expense Category</label>
                  <select value={expCategory} onChange={(e) => setExpCategory(e.target.value)}>
                    <option value="Security & Biometrics">Security & Biometrics</option>
                    <option value="Common Utilities (KPLC)">Common Utilities (KPLC)</option>
                    <option value="Elevator Maintenance">Elevator Maintenance</option>
                    <option value="Cleaning & Waste Management">Cleaning & Waste Management</option>
                    <option value="Water & Borehole Treatment">Water & Borehole Treatment</option>
                    <option value="Staff Payroll">Staff & Caretaker Payroll</option>
                    <option value="Maintenance Repair">Ad-hoc Maintenance Repair</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Amount ({currentProperty.currency})</label>
                  <input
                    type="number"
                    value={expAmount}
                    onChange={(e) => setExpAmount(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Payee / Vendor</label>
                  <input
                    type="text"
                    value={expPayee}
                    onChange={(e) => setExpPayee(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Payment Method</label>
                  <select value={expMethod} onChange={(e) => setExpMethod(e.target.value)}>
                    <option value="mpesa_paybill">M-Pesa Paybill / Buy Goods</option>
                    <option value="bank_transfer">Direct Bank Transfer</option>
                    <option value="cash">Petty Cash</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Monthly service contract fee"
                  value={expDesc}
                  onChange={(e) => setExpDesc(e.target.value)}
                  required
                />
              </div>

              <div className="modal-actions-bar">
                <button type="submit" className="btn-primary">
                  Log Expense
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setIsAddExpenseModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
