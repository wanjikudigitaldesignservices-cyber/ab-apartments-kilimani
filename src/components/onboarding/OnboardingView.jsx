import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Smartphone,
  CreditCard,
  Users,
  Shield,
  Layers,
  Zap,
  Droplets,
  Phone,
  DollarSign,
  Plus,
  Play
} from 'lucide-react';

export function OnboardingView({ onComplete }) {
  const {
    properties,
    switchProperty,
    createProperty,
    addToast
  } = useApp();

  const [wizardStep, setWizardStep] = useState(1); // 1: Details, 2: Structure, 3: Payments, 4: Facilities, 5: Review
  const [selectedDemo, setSelectedDemo] = useState(null);

  // Form State
  const [propName, setPropName] = useState('');
  const [clientName, setClientName] = useState('');
  const [propType, setPropType] = useState('Executive Residential Apartments');
  const [tagline, setTagline] = useState('Modern Living & Executive Suites');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Nairobi');
  const [county, setCounty] = useState('Nairobi City County');
  const [country, setCountry] = useState('Kenya');

  // Architecture
  const [blocksInput, setBlocksInput] = useState('Block A (Sunburst Wing), Block B (Jacaranda Wing)');
  const [floorsCount, setFloorsCount] = useState('6');
  const [unitsCount, setUnitsCount] = useState('48');
  const [startingRent, setStartingRent] = useState('65000');
  const [serviceCharge, setServiceCharge] = useState('7500');

  // Payments & M-Pesa
  const [currency, setCurrency] = useState('KES');
  const [currencySymbol, setCurrencySymbol] = useState('KSh');
  const [mpesaPaybill, setMpesaPaybill] = useState('408920');
  const [mpesaTill, setMpesaTill] = useState('982145');
  const [bankName, setBankName] = useState('NCBA Bank Kenya PLC');
  const [bankBranch, setBankBranch] = useState('Upper Hill Branch');
  const [bankAccount, setBankAccount] = useState('1002938471001');
  const [dueDay, setDueDay] = useState('5');
  const [lateFeePercent, setLateFeePercent] = useState('5');
  const [waterRate, setWaterRate] = useState('160');

  // Amenities & Staff
  const [amenities, setAmenities] = useState([
    'High-Speed Schindler Elevators',
    'Borehole with RO Filtration System',
    'Standby Automatic Generator (250kVA)',
    '24/7 Biometric Security Gate & CCTV',
    'Rooftop Heated Pool & Fitness Gym'
  ]);
  const [managerName, setManagerName] = useState('Patrick Kariuki');
  const [managerPhone, setManagerPhone] = useState('+254 722 980 120');
  const [managerEmail, setManagerEmail] = useState('management@estate.co.ke');
  const [caretakerName, setCaretakerName] = useState('Francis Mwangi');
  const [caretakerPhone, setCaretakerPhone] = useState('+254 711 445 522');
  const [securityPhone, setSecurityPhone] = useState('+254 733 998 811');

  const toggleAmenity = (item) => {
    if (amenities.includes(item)) {
      setAmenities(amenities.filter(a => a !== item));
    } else {
      setAmenities([...amenities, item]);
    }
  };

  const handleLaunchCustom = (e) => {
    if (e) e.preventDefault();
    if (!propName || !address) {
      alert("Please enter your property name and address to continue.");
      setWizardStep(1);
      return;
    }

    const blocksList = blocksInput.split(',').map(b => b.trim()).filter(Boolean);

    createProperty({
      name: propName,
      clientName: clientName || `${propName} Holdings Ltd`,
      tagline: tagline || "Modern Residential Living",
      address,
      city,
      county,
      country,
      currency,
      currencySymbol,
      totalUnits: parseInt(unitsCount) || 24,
      floors: parseInt(floorsCount) || 4,
      blocks: blocksList.length > 0 ? blocksList : ["Main Wing"],
      amenities,
      billing: {
        mpesaPaybill,
        mpesaTill,
        bankName,
        bankBranch,
        accountNumber: bankAccount,
        lateFeePercent: parseFloat(lateFeePercent) || 5,
        waterRatePerUnit: parseFloat(waterRate) || 160,
        dueDay: parseInt(dueDay) || 5
      },
      contacts: {
        manager: managerName,
        phone: managerPhone,
        email: managerEmail,
        caretaker: caretakerName,
        caretakerPhone: caretakerPhone,
        securityGate: securityPhone
      }
    });

    if (onComplete) onComplete();
  };

  const handleLaunchDemo = (propId) => {
    switchProperty(propId);
    if (onComplete) onComplete();
  };

  return (
    <div className="onboarding-page-container animate-fade-in">
      {/* Universal Hero Header */}
      <header className="onboarding-hero">
        <div className="onboarding-brand-pill">
          <Sparkles size={14} className="text-gold" />
          <span>RentSync Universal RMS • Kenya & East Africa Cloud</span>
        </div>
        <h1>Universal Rental & Property Management System</h1>
        <p className="onboarding-subtitle">
          Engineered for landlords, property management firms, and estate agents. Setup any residential, commercial, or mixed-use property in minutes with integrated Safaricom M-Pesa STK billing.
        </p>
      </header>

      {/* Main Choice Section */}
      <div className="onboarding-main-grid">
        {/* Left Column: Interactive 4-Step Setup Wizard */}
        <div className="onboarding-wizard-card glass-card">
          <div className="wizard-progress-header">
            <div className="wizard-title-block">
              <span className="badge badge-paid">Setup Wizard</span>
              <h3>Configure Your Property</h3>
            </div>

            {/* Stepper Dots */}
            <div className="wizard-stepper-dots">
              {[1, 2, 3, 4, 5].map(step => (
                <div
                  key={step}
                  className={`step-circle ${wizardStep === step ? 'active' : wizardStep > step ? 'completed' : ''}`}
                  onClick={() => setWizardStep(step)}
                >
                  {wizardStep > step ? <CheckCircle2 size={13} /> : step}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Identity & Location */}
          {wizardStep === 1 && (
            <div className="step-content animate-fade-in">
              <div className="step-intro">
                <h4>Step 1: Property Identity & Location</h4>
                <p className="font-xs text-muted">Enter the official title and geographical location of your rentals.</p>
              </div>

              <div className="form-grid-2col">
                <div className="form-group">
                  <label>Property / Building Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. AB Apartments Kilimani"
                    value={propName}
                    onChange={(e) => setPropName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Client / Management Company</label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Property Holdings Ltd"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Property Category</label>
                  <select value={propType} onChange={(e) => setPropType(e.target.value)}>
                    <option value="Executive Residential Apartments">Executive Residential Apartments</option>
                    <option value="Luxury Serviced Suites">Luxury Serviced Suites & Airbnbs</option>
                    <option value="Commercial Office Park">Commercial Office Park</option>
                    <option value="Student Hostel / Housing">Student Hostel / Campus Housing</option>
                    <option value="Gated Community Townhouses">Gated Community Townhouses</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Marketing Tagline</label>
                  <input
                    type="text"
                    placeholder="e.g. Luxury Urban Suites & Executive Living"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Physical Street Address *</label>
                  <input
                    type="text"
                    placeholder="e.g. Plot 24, Kindaruma Road, Kilimani"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>City & County</label>
                  <input
                    type="text"
                    placeholder="e.g. Nairobi, Nairobi City County"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>

              <div className="wizard-navigation-buttons">
                <div></div>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    if (!propName || !address) {
                      alert("Please fill in property name and street address.");
                      return;
                    }
                    setWizardStep(2);
                  }}
                >
                  <span>Next: Structure & Units</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Structure & Units */}
          {wizardStep === 2 && (
            <div className="step-content animate-fade-in">
              <div className="step-intro">
                <h4>Step 2: Building Architecture & Units</h4>
                <p className="font-xs text-muted">Configure your wings, floors, and starting rent pricing.</p>
              </div>

              <div className="form-grid-2col">
                <div className="form-group">
                  <label>Wings / Blocks (Comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. Block A (Sunburst Wing), Block B (Jacaranda Wing)"
                    value={blocksInput}
                    onChange={(e) => setBlocksInput(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Number of Floors</label>
                  <input
                    type="number"
                    value={floorsCount}
                    onChange={(e) => setFloorsCount(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Total Units Capacity</label>
                  <input
                    type="number"
                    value={unitsCount}
                    onChange={(e) => setUnitsCount(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Average Monthly Rent ({currency})</label>
                  <input
                    type="number"
                    value={startingRent}
                    onChange={(e) => setStartingRent(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Monthly Service Charge ({currency})</label>
                  <input
                    type="number"
                    value={serviceCharge}
                    onChange={(e) => setServiceCharge(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Country of Operation</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>

              <div className="wizard-navigation-buttons">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setWizardStep(1)}
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setWizardStep(3)}
                >
                  <span>Next: M-Pesa & Billing</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payments & Safaricom M-Pesa */}
          {wizardStep === 3 && (
            <div className="step-content animate-fade-in">
              <div className="step-intro">
                <h4>Step 3: M-Pesa & Financial Accounting</h4>
                <p className="font-xs text-muted">Set up instant Safaricom STK checkout and commercial bank channels.</p>
              </div>

              <div className="form-grid-2col">
                <div className="form-group">
                  <label>Operating Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => {
                      setCurrency(e.target.value);
                      setCurrencySymbol(e.target.value === 'USD' ? '$' : e.target.value === 'EUR' ? '€' : 'KSh');
                    }}
                  >
                    <option value="KES">KES - Kenyan Shillings (KSh)</option>
                    <option value="USD">USD - United States Dollar ($)</option>
                    <option value="EUR">EUR - Euro (€)</option>
                    <option value="GBP">GBP - British Pound (£)</option>
                    <option value="UGX">UGX - Ugandan Shillings</option>
                    <option value="TZS">TZS - Tanzanian Shillings</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Safaricom M-Pesa Paybill *</label>
                  <input
                    type="text"
                    placeholder="e.g. 408920"
                    value={mpesaPaybill}
                    onChange={(e) => setMpesaPaybill(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>M-Pesa Buy Goods Till (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 982145"
                    value={mpesaTill}
                    onChange={(e) => setMpesaTill(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Bank Name</label>
                  <input
                    type="text"
                    placeholder="e.g. NCBA Bank Kenya"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Bank Account Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 1002938471001"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Rent Due Day (Day of Month)</label>
                  <input
                    type="number"
                    min="1"
                    max="28"
                    value={dueDay}
                    onChange={(e) => setDueDay(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Late Payment Penalty (%)</label>
                  <input
                    type="number"
                    value={lateFeePercent}
                    onChange={(e) => setLateFeePercent(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Water Sub-meter Rate ({currency}/m³)</label>
                  <input
                    type="number"
                    value={waterRate}
                    onChange={(e) => setWaterRate(e.target.value)}
                  />
                </div>
              </div>

              <div className="wizard-navigation-buttons">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setWizardStep(2)}
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setWizardStep(4)}
                >
                  <span>Next: Amenities & Contacts</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Amenities & Contacts */}
          {wizardStep === 4 && (
            <div className="step-content animate-fade-in">
              <div className="step-intro">
                <h4>Step 4: Amenities & Caretaker Directory</h4>
                <p className="font-xs text-muted">Select estate amenities and provide operational emergency contacts.</p>
              </div>

              {/* Amenities checkboxes */}
              <div className="amenities-selection-grid">
                {[
                  'High-Speed Schindler Elevators',
                  'Borehole with RO Filtration System',
                  'Standby Automatic Generator (250kVA)',
                  '24/7 Biometric Security Gate & CCTV',
                  'Rooftop Heated Pool & Fitness Gym',
                  'Solar Water Heating Backup',
                  'Dedicated Electric Vehicle Charging',
                  'High-Speed Fiber Internet Ready'
                ].map(amenity => (
                  <label
                    key={amenity}
                    className={`amenity-chip ${amenities.includes(amenity) ? 'active' : ''}`}
                    onClick={() => toggleAmenity(amenity)}
                  >
                    <input
                      type="checkbox"
                      checked={amenities.includes(amenity)}
                      onChange={() => {}}
                    />
                    <span>{amenity}</span>
                  </label>
                ))}
              </div>

              <div className="form-grid-2col" style={{ marginTop: '16px' }}>
                <div className="form-group">
                  <label>Property Manager Name</label>
                  <input
                    type="text"
                    value={managerName}
                    onChange={(e) => setManagerName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Manager Phone Number</label>
                  <input
                    type="text"
                    value={managerPhone}
                    onChange={(e) => setManagerPhone(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Resident Caretaker Name</label>
                  <input
                    type="text"
                    value={caretakerName}
                    onChange={(e) => setCaretakerName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Caretaker Mobile Phone</label>
                  <input
                    type="text"
                    value={caretakerPhone}
                    onChange={(e) => setCaretakerPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="wizard-navigation-buttons">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setWizardStep(3)}
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setWizardStep(5)}
                >
                  <span>Review & Provision</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Review & Instant Provisioning */}
          {wizardStep === 5 && (
            <div className="step-content animate-fade-in">
              <div className="step-intro">
                <div className="title-with-badge">
                  <CheckCircle2 size={20} className="text-emerald" />
                  <h4>Step 5: Review & Cloud Deployment</h4>
                </div>
                <p className="font-xs text-muted">Your customized rental management environment is ready to provision.</p>
              </div>

              <div className="review-summary-box glass-card">
                <div className="review-row">
                  <span className="lbl">Property Name:</span>
                  <strong>{propName || "AB Apartments Kilimani"}</strong>
                </div>
                <div className="review-row">
                  <span className="lbl">Client Organization:</span>
                  <span>{clientName || "Apex Property Holdings Ltd"}</span>
                </div>
                <div className="review-row">
                  <span className="lbl">Location:</span>
                  <span>{address || "Plot 24, Kindaruma Road"}, {city}</span>
                </div>
                <div className="review-row">
                  <span className="lbl">Capacity & Wings:</span>
                  <span>{unitsCount} Units across {floorsCount} Floors ({blocksInput})</span>
                </div>
                <div className="review-row">
                  <span className="lbl">Safaricom Billing:</span>
                  <strong className="text-mpesa">Paybill {mpesaPaybill} (Currency: {currency})</strong>
                </div>
                <div className="review-row">
                  <span className="lbl">Bank Gateway:</span>
                  <span>{bankName} (Acc: {bankAccount})</span>
                </div>
                <div className="review-row">
                  <span className="lbl">Caretaker Hotline:</span>
                  <span>{caretakerName} ({caretakerPhone})</span>
                </div>
              </div>

              <div className="wizard-navigation-buttons" style={{ marginTop: '20px' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setWizardStep(4)}
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  className="btn-primary btn-gold"
                  onClick={handleLaunchCustom}
                >
                  <Sparkles size={16} />
                  <span>Provision & Launch My Property Dashboard</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Instant Live Preview & Demo Estates */}
        <div className="onboarding-side-column">
          {/* Live Updating Badge Card */}
          <div className="live-preview-card glass-card">
            <div className="preview-header">
              <span className="badge badge-vacant">Live Preview Card</span>
              <span className="badge badge-mpesa">Paybill {mpesaPaybill || "408920"}</span>
            </div>

            <div className="preview-body">
              <h3>{propName || "Your Property Name"}</h3>
              <p className="preview-tagline">{tagline || "Executive Urban Residences"}</p>
              <p className="preview-loc font-xs text-muted">
                {address || "Your Address"}, {city || "Nairobi"} • {unitsCount || 48} Units
              </p>

              <div className="preview-stats-row">
                <div className="p-stat">
                  <span className="lbl">Rent / Unit</span>
                  <strong>{currency} {parseFloat(startingRent || 65000).toLocaleString()}</strong>
                </div>
                <div className="p-stat">
                  <span className="lbl">Floors</span>
                  <strong>{floorsCount || 6} Floors</strong>
                </div>
                <div className="p-stat">
                  <span className="lbl">Gate</span>
                  <strong className="text-emerald">24/7 RFID</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Demo Launch Options */}
          <div className="demo-estates-card glass-card">
            <div className="section-header">
              <div className="title-with-badge">
                <Play size={16} className="text-gold" />
                <h4>Explore Pre-Configured Demo Estates</h4>
              </div>
            </div>
            <p className="font-xs text-muted" style={{ marginBottom: '12px' }}>
              Want to see how it works first? Click any pre-loaded estate below:
            </p>

            <div className="demo-cards-list">
              {properties.map(p => (
                <div
                  key={p.id}
                  className="demo-item-card glass-card"
                  onClick={() => handleLaunchDemo(p.id)}
                >
                  <div className="demo-info">
                    <strong>{p.name}</strong>
                    <div className="font-xs text-muted">{p.city} • {p.totalUnits} Units • Paybill {p.billing.mpesaPaybill}</div>
                  </div>
                  <button className="btn-secondary btn-xs">
                    <span>Launch</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
