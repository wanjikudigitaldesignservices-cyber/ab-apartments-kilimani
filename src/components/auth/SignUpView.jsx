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
  Shield,
  Layers,
  Zap,
  Phone,
  Mail,
  User,
  Lock,
  Eye,
  EyeOff,
  Check,
  Star,
  Globe,
  Sliders,
  ChevronRight,
  ShieldCheck,
  Building,
  KeyRound
} from 'lucide-react';

export function SignUpView({ initialMode = 'signup', onSuccess, onBack }) {
  const { signupUser, loginUser, switchProperty, properties } = useApp();

  const [mode, setMode] = useState(initialMode); // 'signup' | 'signin'
  const [showPassword, setShowPassword] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [accountType, setAccountType] = useState('Property Management Company');
  const [plan, setPlan] = useState('Growth Pro');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Password Strength Calculation
  const calculatePasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'None', color: 'transparent' };
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 10) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 2) return { score, label: 'Weak', color: '#ef4444' };
    if (score <= 4) return { score, label: 'Good', color: '#f59e0b' };
    return { score, label: 'Strong', color: '#10b981' };
  };

  const strength = calculatePasswordStrength(password);

  // Auto-Fill Demo Landlord Profile for instant testing
  const handleAutoFillDemo = () => {
    setFullName('Sarah Muthoni Wanjiku');
    setCompanyName('Emerald Heights Property Holdings');
    setEmail('sarah.wanjiku@emeraldheights.co.ke');
    setPhone('+254 722 450 880');
    setAccountType('Property Management Company');
    setPlan('Growth Pro');
    setPassword('RentSync@2026!');
    setConfirmPassword('RentSync@2026!');
    setAgreeTerms(true);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email) {
      alert("Please provide your full name and work email.");
      return;
    }
    if (password && confirmPassword && password !== confirmPassword) {
      alert("Passwords do not match. Please verify.");
      return;
    }
    if (!agreeTerms) {
      alert("Please accept the Terms of Service to proceed.");
      return;
    }

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (_) {}

    signupUser({
      name: fullName,
      company: companyName || `${fullName} Properties`,
      email,
      phone: phone || "+254 700 000 000",
      accountType,
      plan,
      role: accountType === 'Resident / Tenant Access' ? 'resident' : 'admin'
    });

    if (onSuccess) onSuccess();
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email address to sign in.");
      return;
    }

    loginUser(email, password);
    if (onSuccess) onSuccess();
  };

  const handleDemoLogin = (emailAddress, propId) => {
    loginUser(emailAddress, 'password');
    if (propId) switchProperty(propId);
    if (onSuccess) onSuccess();
  };

  return (
    <div className="auth-page-root animate-fade-in">
      {/* Top Header */}
      <header className="auth-header glass-card">
        <div className="brand-badge-group" onClick={onBack} style={{ cursor: 'pointer' }}>
          <div className="landing-crest">
            <Building2 size={24} />
          </div>
          <div>
            <h2 className="landing-brand-title">RentSync Universal RMS</h2>
            <span className="landing-brand-sub">Client Registration & Authentication</span>
          </div>
        </div>

        <div className="auth-header-actions">
          <button className="btn-secondary btn-sm" onClick={onBack}>
            <ArrowLeft size={14} />
            <span>Universal Home</span>
          </button>
          <button 
            className="btn-gold btn-sm"
            onClick={() => handleDemoLogin("p.kariuki@abholdings.co.ke", "prop-ab-kilimani")}
          >
            <Sparkles size={14} />
            <span>Quick Demo Login</span>
          </button>
        </div>
      </header>

      {/* Main Authentication Grid */}
      <div className="auth-main-container">
        <div className="auth-card-layout">
          {/* Left Column: Brand Value Proposition & Trust */}
          <div className="auth-showcase-panel glass-card">
            <div className="auth-pill-badge">
              <Sparkles size={13} className="text-gold" />
              <span>Universal Rental Cloud Architecture</span>
            </div>

            <h1 className="auth-showcase-heading">
              Powering Modern Landlords & Property Agencies Across Africa.
            </h1>

            <p className="auth-showcase-sub">
              Create your client account in 60 seconds to access real-time Safaricom M-Pesa STK push billing, automated metered utilities, wing floor plans, and tenant portals.
            </p>

            <div className="auth-features-list">
              <div className="auth-feature-item">
                <div className="feature-bullet bg-emerald">
                  <Smartphone size={16} className="text-emerald" />
                </div>
                <div>
                  <strong>Safaricom Daraja M-Pesa STK Push</strong>
                  <p>Auto-reconciles Paybill 408920 & Till 982145 with instant tenant SMS prompts.</p>
                </div>
              </div>

              <div className="auth-feature-item">
                <div className="feature-bullet bg-blue">
                  <Layers size={16} className="text-blue" />
                </div>
                <div>
                  <strong>Multi-Estate Portfolio Support</strong>
                  <p>Seamlessly manage multiple buildings, duplexes, and commercial complexes.</p>
                </div>
              </div>

              <div className="auth-feature-item">
                <div className="feature-bullet bg-gold">
                  <ShieldCheck size={16} className="text-gold" />
                </div>
                <div>
                  <strong>KRA & Financial Audit Statements</strong>
                  <p>Automated P&L, operating expenses (OPEX), and net operating income (NOI).</p>
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="auth-testimonial-box glass-card">
              <div className="testimonial-rating">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={13} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="testimonial-quote">
                "RentSync transformed our Kilimani apartment management. Rent collection is 99% automated with M-Pesa STK pushes, and our tenants have instant access to receipts."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">PK</div>
                <div>
                  <strong>Patrick Kariuki</strong>
                  <span>Director, AB Property Holdings Ltd</span>
                </div>
              </div>
            </div>

            <div className="auth-trust-strip font-xs text-muted">
              <span>🔒 256-Bit SSL Encryption</span> • <span>🇰🇪 Daraja M-Pesa Ready</span> • <span>⚡ Instant Activation</span>
            </div>
          </div>

          {/* Right Column: Interactive Registration & Sign-In Form */}
          <div className="auth-form-panel glass-card">
            {/* Mode Switcher Tabs */}
            <div className="auth-mode-tabs">
              <button
                className={`auth-tab-btn ${mode === 'signup' ? 'active' : ''}`}
                onClick={() => setMode('signup')}
              >
                <User size={15} />
                <span>Create Client Account</span>
              </button>
              <button
                className={`auth-tab-btn ${mode === 'signin' ? 'active' : ''}`}
                onClick={() => setMode('signin')}
              >
                <KeyRound size={15} />
                <span>Client Sign In</span>
              </button>
            </div>

            {/* SIGN UP FORM */}
            {mode === 'signup' && (
              <form onSubmit={handleSignUpSubmit} className="auth-form-body animate-fade-in">
                <div className="auth-form-header">
                  <div>
                    <h3>Setup Your RentSync Workspace</h3>
                    <p className="font-xs text-muted">Join hundreds of property owners and estate firms across Kenya</p>
                  </div>
                  <button
                    type="button"
                    className="btn-gold btn-xs"
                    onClick={handleAutoFillDemo}
                    title="Fill sample details for quick testing"
                  >
                    <Zap size={13} />
                    <span>Auto-Fill Demo</span>
                  </button>
                </div>

                <div className="form-grid-2col">
                  <div className="form-group">
                    <label>Full Legal Name *</label>
                    <div className="input-with-icon">
                      <User size={15} className="input-icon" />
                      <input
                        type="text"
                        placeholder="e.g. Sarah Muthoni Wanjiku"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Company / Organization Name</label>
                    <div className="input-with-icon">
                      <Building size={15} className="input-icon" />
                      <input
                        type="text"
                        placeholder="e.g. Emerald Heights Holdings Ltd"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Work Email Address *</label>
                    <div className="input-with-icon">
                      <Mail size={15} className="input-icon" />
                      <input
                        type="email"
                        placeholder="e.g. sarah@emeraldheights.co.ke"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Mobile Phone / WhatsApp *</label>
                    <div className="input-with-icon">
                      <Phone size={15} className="input-icon" />
                      <input
                        type="tel"
                        placeholder="e.g. +254 722 000 000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Account Category */}
                <div className="form-group" style={{ marginTop: '12px' }}>
                  <label>Client Category</label>
                  <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                    <option value="Property Management Company">🏢 Property Management Company (Multiple Estates)</option>
                    <option value="Private Landlord / Owner">🏠 Private Landlord / Building Owner</option>
                    <option value="Real Estate Investment Agency">💼 Real Estate Agency & Asset Manager</option>
                    <option value="Resident / Tenant Access">👥 Resident / Tenant Portal Access</option>
                  </select>
                </div>

                {/* Plan Tier Selector */}
                <div className="form-group" style={{ marginTop: '12px' }}>
                  <label>Select Workspace Plan</label>
                  <div className="plan-cards-selector">
                    <div
                      className={`plan-pill ${plan === 'Starter' ? 'active' : ''}`}
                      onClick={() => setPlan('Starter')}
                    >
                      <strong>Starter</strong>
                      <span>Up to 15 Units</span>
                    </div>
                    <div
                      className={`plan-pill ${plan === 'Growth Pro' ? 'active' : ''}`}
                      onClick={() => setPlan('Growth Pro')}
                    >
                      <span className="badge-popular">Popular</span>
                      <strong>Growth Pro</strong>
                      <span>16 - 80 Units</span>
                    </div>
                    <div
                      className={`plan-pill ${plan === 'Enterprise' ? 'active' : ''}`}
                      onClick={() => setPlan('Enterprise')}
                    >
                      <strong>Enterprise</strong>
                      <span>80+ Units / Multi-Wing</span>
                    </div>
                  </div>
                </div>

                {/* Password Fields */}
                <div className="form-grid-2col" style={{ marginTop: '12px' }}>
                  <div className="form-group">
                    <label>Password *</label>
                    <div className="input-with-icon">
                      <Lock size={15} className="input-icon" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="At least 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="input-trailing-btn"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                    {password && (
                      <div className="password-strength-bar">
                        <div
                          className="strength-fill"
                          style={{
                            width: `${(strength.score / 5) * 100}%`,
                            backgroundColor: strength.color
                          }}
                        ></div>
                        <span style={{ color: strength.color, fontSize: '11px' }}>
                          Strength: {strength.label}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Confirm Password *</label>
                    <div className="input-with-icon">
                      <Lock size={15} className="input-icon" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="terms-checkbox-row" style={{ marginTop: '14px' }}>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      required
                    />
                    <span>
                      I agree to the <a href="#terms">Terms of Service</a>, <a href="#privacy">Privacy Policy</a>, and consent to Kenya Data Protection Act compliance.
                    </span>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="auth-actions-group" style={{ marginTop: '20px' }}>
                  <button type="submit" className="btn-primary btn-gold btn-block">
                    <Sparkles size={16} />
                    <span>Create Client Account & Onboard Estate</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                <div className="auth-footer-note font-xs text-muted text-center" style={{ marginTop: '16px' }}>
                  Already have an account?{' '}
                  <button type="button" className="link-button" onClick={() => setMode('signin')}>
                    Sign in here
                  </button>
                </div>
              </form>
            )}

            {/* SIGN IN FORM */}
            {mode === 'signin' && (
              <form onSubmit={handleSignInSubmit} className="auth-form-body animate-fade-in">
                <div className="auth-form-header">
                  <div>
                    <h3>Sign In to Your Workspace</h3>
                    <p className="font-xs text-muted">Enter your registered client email to access your management dashboard</p>
                  </div>
                </div>

                <div className="form-group">
                  <label>Registered Email Address *</label>
                  <div className="input-with-icon">
                    <Mail size={15} className="input-icon" />
                    <input
                      type="email"
                      placeholder="e.g. p.kariuki@abholdings.co.ke"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label>Password *</label>
                    <a href="#forgot" className="font-xs text-emerald">Forgot Password?</a>
                  </div>
                  <div className="input-with-icon">
                    <Lock size={15} className="input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="input-trailing-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                {/* Quick Demo Logins */}
                <div className="quick-demo-accounts-box glass-card" style={{ marginTop: '18px' }}>
                  <span className="font-xs text-dim">Quick Test Logins (1-Click):</span>
                  <div className="demo-accounts-buttons">
                    <button
                      type="button"
                      className="btn-secondary btn-xs"
                      onClick={() => handleDemoLogin("p.kariuki@abholdings.co.ke", "prop-ab-kilimani")}
                    >
                      <span>🏢 Manager: AB Apartments</span>
                    </button>
                    <button
                      type="button"
                      className="btn-secondary btn-xs"
                      onClick={() => handleDemoLogin("amina.odhiambo@gmail.com", "prop-ab-kilimani")}
                    >
                      <span>👤 Resident: Unit A302</span>
                    </button>
                  </div>
                </div>

                {/* Action Button */}
                <div className="auth-actions-group" style={{ marginTop: '22px' }}>
                  <button type="submit" className="btn-primary btn-block">
                    <span>Sign In to Management Console</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                <div className="auth-footer-note font-xs text-muted text-center" style={{ marginTop: '18px' }}>
                  Don't have an account yet?{' '}
                  <button type="button" className="link-button" onClick={() => setMode('signup')}>
                    Register your property for free
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
