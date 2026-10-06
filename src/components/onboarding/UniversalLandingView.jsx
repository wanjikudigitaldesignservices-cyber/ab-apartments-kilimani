import React, { useState } from 'react';
import confetti from 'canvas-confetti';
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
  Play,
  Check,
  Star,
  FileSpreadsheet,
  Wrench,
  Receipt,
  Globe,
  Sliders,
  ChevronRight,
  Plus,
  MapPin,
  CheckSquare,
  RefreshCw,
  BarChart3,
  Bell,
  ShieldCheck,
  DollarSign,
  UserPlus,
  KeyRound
} from 'lucide-react';

export function UniversalLandingView({ onEnterConsole, onOpenSignUp, onOpenSignIn }) {
  const {
    properties,
    switchProperty,
    createProperty,
    addToast
  } = useApp();

  const [wizardStep, setWizardStep] = useState(1); // 1: Identity, 2: Structure, 3: Billing & M-Pesa, 4: Amenities, 5: Review

  // Onboarding Setup Form State
  const [propName, setPropName] = useState('');
  const [clientName, setClientName] = useState('');
  const [propType, setPropType] = useState('Executive Residential Apartments');
  const [tagline, setTagline] = useState('Modern Residential Living & Suites');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Nairobi');
  const [county, setCounty] = useState('Nairobi City County');
  const [country, setCountry] = useState('Kenya');

  // Architecture & Units
  const [blocksInput, setBlocksInput] = useState('Block A (Sunburst Wing), Block B (Jacaranda Wing)');
  const [floorsCount, setFloorsCount] = useState('6');
  const [unitsCount, setUnitsCount] = useState('48');
  const [startingRent, setStartingRent] = useState('65000');
  const [serviceCharge, setServiceCharge] = useState('7500');

  // Billing & M-Pesa
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

  const handleLaunchCustomProperty = (e) => {
    if (e) e.preventDefault();
    if (!propName || !address) {
      alert("Please fill in your property name and address to provision.");
      setWizardStep(1);
      return;
    }

    const blocksList = blocksInput.split(',').map(b => b.trim()).filter(Boolean);

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (_) {}

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

    onEnterConsole();
  };

  const handleLaunchDemoProperty = (propId) => {
    switchProperty(propId);
    onEnterConsole();
  };

  return (
    <div className="universal-landing-root animate-fade-in">
      {/* Top Universal RMS Navigation Bar */}
      <nav className="universal-landing-nav glass-card">
        <div className="brand-badge-group">
          <div className="landing-crest">
            <Building2 size={24} />
          </div>
          <div>
            <h2 className="landing-brand-title">RentSync Universal RMS</h2>
            <span className="landing-brand-sub">Universal Multi-Client Property & Rental Cloud</span>
          </div>
        </div>

        <div className="landing-nav-actions">
          <div className="estate-selector-pill no-mobile">
            <Globe size={14} className="text-emerald" />
            <span>Universal Cloud Platform • Kenya & East Africa</span>
          </div>

          <button 
            className="btn-secondary btn-sm"
            onClick={onOpenSignIn}
            title="Sign In to Existing Client Workspace"
          >
            <KeyRound size={14} />
            <span>Client Sign In</span>
          </button>

          <button 
            className="btn-gold btn-sm"
            onClick={onOpenSignUp}
            title="Register a New Client Workspace"
          >
            <UserPlus size={14} />
            <span>Client Sign Up</span>
          </button>

          <button 
            className="btn-primary btn-sm"
            onClick={() => handleLaunchDemoProperty("prop-ab-kilimani")}
          >
            <span>Launch Live Console</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* Hero Showcase Section */}
      <section className="landing-hero-section">
        <div className="hero-announcement-pill">
          <Sparkles size={14} className="text-gold" />
          <span>Next-Generation Universal Rental Management Platform</span>
        </div>

        <h1 className="hero-main-heading">
          One Universal Platform.<br />
          <span className="text-gradient-emerald">Any Apartment, Estate or Commercial Client.</span>
        </h1>

        <p className="hero-lead-text">
          RentSync adapts dynamically to any landlord, property management company, or residential building. Featuring real-time Safaricom M-Pesa STK push reconciliation, automated water metering, interactive wing floor maps, and tenant self-service portals.
        </p>

        {/* Hero CTA Buttons */}
        <div className="hero-cta-buttons" style={{ marginBottom: '32px' }}>
          <button 
            className="btn-primary btn-hero-lg btn-gold"
            onClick={onOpenSignUp}
          >
            <UserPlus size={18} />
            <span>Create Client Account (Free Sign Up)</span>
          </button>

          <button 
            className="btn-secondary btn-hero-lg"
            onClick={() => {
              const el = document.getElementById('onboarding-studio');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Sliders size={18} className="text-emerald" />
            <span>Setup Property Wizard</span>
          </button>
        </div>

        {/* Live Metrics Trust Bar */}
        <div className="trust-metrics-strip glass-card">
          <div className="trust-stat">
            <strong className="text-emerald">Universal</strong>
            <span>Multi-Client Architecture</span>
          </div>
          <div className="trust-stat">
            <strong className="text-mpesa">M-Pesa STK</strong>
            <span>Daraja API Reconciled</span>
          </div>
          <div className="trust-stat">
            <strong className="text-blue">Multi-Currency</strong>
            <span>KES, USD, EUR, GBP, UGX</span>
          </div>
          <div className="trust-stat">
            <strong className="text-gold">100% Cloud</strong>
            <span>Vercel REST API + Local Sync</span>
          </div>
        </div>
      </section>

      {/* EMBEDDED ONBOARDING STUDIO (FRONT & CENTER) */}
      <section id="onboarding-studio" className="onboarding-studio-section">
        <div className="onboarding-studio-grid">
          {/* Left Column: Interactive 5-Step Guided Stepper Card */}
          <div className="onboarding-studio-card glass-card">
            <div className="wizard-progress-header">
              <div className="wizard-title-block">
                <span className="badge badge-paid">Property Setup Studio</span>
                <h3>Configure Your Rental Property</h3>
              </div>

              {/* Stepper Dots */}
              <div className="wizard-stepper-dots">
                {[1, 2, 3, 4, 5].map(step => (
                  <div
                    key={step}
                    className={`step-circle ${wizardStep === step ? 'active' : wizardStep > step ? 'completed' : ''}`}
                    onClick={() => setWizardStep(step)}
                    title={`Step ${step}`}
                  >
                    {wizardStep > step ? <Check size={14} /> : step}
                  </div>
                ))}
              </div>
            </div>

            {/* Stepper Tabs Bar */}
            <div className="wizard-step-tabs">
              <button className={`step-tab ${wizardStep === 1 ? 'active' : ''}`} onClick={() => setWizardStep(1)}>1. Identity</button>
              <button className={`step-tab ${wizardStep === 2 ? 'active' : ''}`} onClick={() => setWizardStep(2)}>2. Structure</button>
              <button className={`step-tab ${wizardStep === 3 ? 'active' : ''}`} onClick={() => setWizardStep(3)}>3. M-Pesa Billing</button>
              <button className={`step-tab ${wizardStep === 4 ? 'active' : ''}`} onClick={() => setWizardStep(4)}>4. Amenities</button>
              <button className={`step-tab ${wizardStep === 5 ? 'active' : ''}`} onClick={() => setWizardStep(5)}>5. Review & Deploy</button>
            </div>

            {/* Step 1: Identity & Location */}
            {wizardStep === 1 && (
              <div className="step-content animate-fade-in">
                <div className="step-intro">
                  <h4>Step 1: Property Identity & Location</h4>
                  <p className="font-xs text-muted">Enter the official title and physical address for your rental estate.</p>
                </div>

                <div className="form-grid-2col">
                  <div className="form-group">
                    <label>Property / Building Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Sunrise View Apartments"
                      value={propName}
                      onChange={(e) => setPropName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Client / Management Company</label>
                    <input
                      type="text"
                      placeholder="e.g. Sunrise Properties Holdings Ltd"
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
                      placeholder="e.g. Modern Residential Living & Executive Suites"
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
                        alert("Please provide the property name and physical address.");
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

            {/* Step 2: Architecture & Structure */}
            {wizardStep === 2 && (
              <div className="step-content animate-fade-in">
                <div className="step-intro">
                  <h4>Step 2: Building Architecture & Units</h4>
                  <p className="font-xs text-muted">Define your wings, floors, capacity, and baseline rental rates.</p>
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
                    <label>Average Monthly Base Rent ({currency})</label>
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
                    <span>Next: Billing & M-Pesa</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Billing & Safaricom M-Pesa */}
            {wizardStep === 3 && (
              <div className="step-content animate-fade-in">
                <div className="step-intro">
                  <h4>Step 3: Safaricom M-Pesa & Financial Accounting</h4>
                  <p className="font-xs text-muted">Configure your Paybill number for Daraja STK push and banking accounts.</p>
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
                    <span>Review & Deploy</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Review & Instant Deployment */}
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
                    <strong>{propName || "Sunrise View Apartments"}</strong>
                  </div>
                  <div className="review-row">
                    <span className="lbl">Client / Firm:</span>
                    <span>{clientName || `${propName || "Sunrise View"} Holdings Ltd`}</span>
                  </div>
                  <div className="review-row">
                    <span className="lbl">Location:</span>
                    <span>{address || "Plot 24, Kindaruma Road"}, {city}</span>
                  </div>
                  <div className="review-row">
                    <span className="lbl">Capacity & Structure:</span>
                    <span>{unitsCount} Units • {floorsCount} Floors • ({blocksInput})</span>
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
                    <span className="lbl">Caretaker Contact:</span>
                    <span>{caretakerName} ({caretakerPhone})</span>
                  </div>
                </div>

                <div className="wizard-navigation-buttons" style={{ marginTop: '22px' }}>
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
                    onClick={handleLaunchCustomProperty}
                  >
                    <Sparkles size={16} />
                    <span>Provision Property & Launch Console</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Live Reactive Preview Card & Demo Estates */}
          <div className="onboarding-side-column">
            {/* Live Updating Badge Card */}
            <div className="live-preview-card glass-card">
              <div className="preview-header">
                <span className="badge badge-paid">Live Digital Dossier</span>
                <span className="badge badge-mpesa">Paybill {mpesaPaybill || "408920"}</span>
              </div>

              <div className="preview-body">
                <h3>{propName || "Your Property Name"}</h3>
                <p className="preview-tagline">{tagline || "Modern Residential Living & Suites"}</p>
                <p className="preview-loc font-xs text-muted">
                  <MapPin size={13} className="text-emerald" style={{ display: 'inline' }} />
                  {address || "Street Address"}, {city || "Nairobi"} • {unitsCount || 48} Units
                </p>

                <div className="preview-stats-row">
                  <div className="p-stat">
                    <span className="lbl">Base Rent</span>
                    <strong>{currency} {parseFloat(startingRent || 65000).toLocaleString()}</strong>
                  </div>
                  <div className="p-stat">
                    <span className="lbl">Floors</span>
                    <strong>{floorsCount || 6} Floors</strong>
                  </div>
                  <div className="p-stat">
                    <span className="lbl">Status</span>
                    <strong className="text-emerald">Online</strong>
                  </div>
                </div>

                {amenities.length > 0 && (
                  <div className="preview-amenities-tags">
                    {amenities.slice(0, 4).map((a, i) => (
                      <span key={i} className="amenity-tag">✓ {a.split(' ')[0]}</span>
                    ))}
                    {amenities.length > 4 && (
                      <span className="amenity-tag">+{amenities.length - 4} more</span>
                    )}
                  </div>
                )}
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
                Want to test-drive an existing rental environment right away? Click any estate below:
              </p>

              <div className="demo-cards-list">
                {properties.map(p => (
                  <div
                    key={p.id}
                    className="demo-item-card glass-card"
                    onClick={() => handleLaunchDemoProperty(p.id)}
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
      </section>

      {/* Feature Pillars Grid */}
      <section className="landing-features-grid">
        <div className="feature-card glass-card">
          <div className="feature-icon-box bg-emerald">
            <Smartphone size={24} className="text-emerald" />
          </div>
          <h3>Safaricom M-Pesa Gateway</h3>
          <p>
            Interactive Daraja STK Push simulator that sends instant PIN prompts to tenant phones. Auto-reconciles Paybill 408920 and issues official branded PDF receipts with QR verification.
          </p>
        </div>

        <div className="feature-card glass-card">
          <div className="feature-icon-box bg-blue">
            <Building2 size={24} className="text-blue" />
          </div>
          <h3>Interactive Wing & Floor Maps</h3>
          <p>
            Visual matrices for Block A & B, executive studios, duplexes, and penthouses. Real-time occupancy status, sub-meter tracking for KPLC electricity and water tariffs.
          </p>
        </div>

        <div className="feature-card glass-card">
          <div className="feature-icon-box bg-gold">
            <Receipt size={24} className="text-gold" />
          </div>
          <h3>Automated Billing Engine</h3>
          <p>
            One-click bulk invoicing on the 1st of every month with itemized service charges, metered water consumption, garbage disposal fees, and automatic 5% overdue penalty calculation.
          </p>
        </div>

        <div className="feature-card glass-card">
          <div className="feature-icon-box bg-blue">
            <Users size={24} className="text-blue" />
          </div>
          <h3>Tenant Self-Service Portal</h3>
          <p>
            Residents can log in, view monthly statements, trigger direct M-Pesa payments, download past payment receipts, and submit repair requests directly to the caretaker.
          </p>
        </div>

        <div className="feature-card glass-card">
          <div className="feature-icon-box bg-rose">
            <Wrench size={24} className="text-rose" />
          </div>
          <h3>Maintenance & Fundi Dispatch</h3>
          <p>
            Track work orders from Open to Resolved. Assign specialized fundis (Plumbing, Schindler Elevators, Electricians) and automatically link repair invoices to property operating expenses.
          </p>
        </div>

        <div className="feature-card glass-card">
          <div className="feature-icon-box bg-emerald">
            <FileSpreadsheet size={24} className="text-emerald" />
          </div>
          <h3>Executive P&L & Rent Roll</h3>
          <p>
            Comprehensive financial statements computing Gross Collections, Operating Expenses (OPEX), and Net Operating Income (NOI) with exportable CSVs and printable audit reports.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer font-xs text-muted">
        <div>© 2026 RentSync Universal RMS. Built for modern property managers and landlords across Kenya & Africa.</div>
        <div className="footer-links">
          <span>Safaricom M-Pesa Ready</span> • <span>REST API Connected</span> • <span>Vercel Cloud Hosted</span>
        </div>
      </footer>
    </div>
  );
}
