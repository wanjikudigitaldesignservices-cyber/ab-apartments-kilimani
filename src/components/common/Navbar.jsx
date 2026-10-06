import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Search, 
  Moon, 
  Sun, 
  Plus, 
  UserCheck, 
  ShieldCheck, 
  Smartphone, 
  RotateCcw, 
  Download,
  Settings,
  Database,
  ChevronDown,
  Layers
} from 'lucide-react';

export function Navbar() {
  const {
    properties,
    currentPropertyId,
    currentProperty,
    switchProperty,
    setIsAddPropertyModalOpen,
    setIsPropertySettingsModalOpen,
    stats,
    userRole,
    setUserRole,
    tenants,
    selectedResidentId,
    setSelectedResidentId,
    searchQuery,
    setSearchQuery,
    theme,
    setTheme,
    isBackendConnected,
    setIsAddPaymentModalOpen,
    setIsAddTenantModalOpen,
    launchMpesaStkPush,
    resetToDefault,
    exportBackup
  } = useApp();

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <header className="navbar-container">
      {/* Brand & Multi-Client Property Switcher */}
      <div className="navbar-brand">
        <div className="brand-logo-badge">
          <Building2 size={24} className="brand-icon" />
        </div>
        
        <div className="client-switcher-group">
          <div className="client-select-wrapper">
            <select
              className="client-property-select"
              value={currentPropertyId}
              onChange={(e) => {
                if (e.target.value === '__add_new__') {
                  setIsAddPropertyModalOpen(true);
                } else {
                  switchProperty(e.target.value);
                }
              }}
            >
              {properties.map(p => (
                <option key={p.id} value={p.id}>
                  🏢 {p.name} ({p.totalUnits} Units)
                </option>
              ))}
              <option value="__add_new__">+ Onboard New Client Estate...</option>
            </select>
          </div>
          <div className="brand-sub-row">
            <span className="location-pill">{currentProperty.city}, {currentProperty.county || currentProperty.country}</span>
            <span className="client-org-tag font-xs text-muted">{currentProperty.clientName}</span>
          </div>
        </div>
      </div>

      {/* Live Building Status Badge & DB Status */}
      <div className="live-status-pill no-mobile">
        <span className="pulse-dot"></span>
        <span className="status-metric"><strong>{stats.occupiedUnits}</strong>/{stats.totalUnitsCount} Occupied</span>
        <span className="status-divider">•</span>
        <span className="status-metric text-emerald"><strong>{stats.occupancyRate}%</strong> Occupancy</span>
        <span className="status-divider">•</span>
        <span className="status-metric text-blue" title="Backend DB connection">
          <Database size={11} style={{ display: 'inline', marginRight: '3px' }} />
          {isBackendConnected ? 'Cloud DB Active' : 'Universal Storage'}
        </span>
      </div>

      {/* Global Search Bar */}
      <div className="navbar-search">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          placeholder={`Search ${currentProperty.name} units, tenants, paybills...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="search-clear-btn" onClick={() => setSearchQuery("")}>×</button>
        )}
      </div>

      {/* Role Switcher & Action Controls */}
      <div className="navbar-actions">
        {/* Role Toggle: Property Manager Admin vs Resident Portal */}
        <div className="role-switcher-container">
          <div className="role-segmented-control">
            <button
              className={`role-btn ${userRole === 'admin' ? 'active' : ''}`}
              onClick={() => setUserRole('admin')}
              title="Management Administration View"
            >
              <ShieldCheck size={15} />
              <span>Manager Admin</span>
            </button>
            <button
              className={`role-btn ${userRole === 'resident' ? 'active' : ''}`}
              onClick={() => setUserRole('resident')}
              title="Tenant Self-Service Portal"
            >
              <UserCheck size={15} />
              <span>Resident Portal</span>
            </button>
          </div>

          {/* Resident Selector */}
          {userRole === 'resident' && (
            <div className="resident-selector-dropdown">
              <label htmlFor="resident-select">Resident:</label>
              <select
                id="resident-select"
                value={selectedResidentId}
                onChange={(e) => setSelectedResidentId(e.target.value)}
              >
                {tenants.map(t => (
                  <option key={t.id} value={t.id}>
                    Unit {t.unitId} - {t.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Quick Action Buttons */}
        {userRole === 'admin' && (
          <div className="quick-actions-group">
            <button 
              className="btn-mpesa btn-sm"
              onClick={() => launchMpesaStkPush({
                phone: tenants[0]?.phone || "+254 722 341 890",
                unitId: tenants[0]?.unitId || "A302",
                amount: 86420,
                tenantName: tenants[0]?.name || "Resident"
              })}
              title={`Simulate M-Pesa STK Push for Paybill ${currentProperty.billing.mpesaPaybill}`}
            >
              <Smartphone size={16} />
              <span>M-Pesa STK</span>
            </button>

            <button 
              className="btn-primary btn-sm"
              onClick={() => setIsAddPaymentModalOpen(true)}
              title="Record Payment"
            >
              <Plus size={16} />
              <span>Record Pay</span>
            </button>

            <button 
              className="btn-gold btn-sm no-mobile"
              onClick={() => setIsAddPropertyModalOpen(true)}
              title="Add New Rental Estate Client"
            >
              <Layers size={14} />
              <span>+ New Estate</span>
            </button>
          </div>
        )}

        {/* Utility & Settings Actions */}
        <div className="utility-buttons">
          <button 
            className="icon-btn"
            onClick={() => setIsPropertySettingsModalOpen(true)}
            title="Configure Estate Billing & Paybill Settings"
          >
            <Settings size={17} />
          </button>

          <button 
            className="icon-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="icon-btn no-mobile"
            onClick={exportBackup}
            title="Export Universal JSON Database Backup"
          >
            <Download size={18} />
          </button>

          <button
            className="icon-btn reset-btn no-mobile"
            onClick={() => {
              if (window.confirm("Reset all client data to defaults?")) {
                resetToDefault();
              }
            }}
            title="Reset to Factory Defaults"
          >
            <RotateCcw size={17} />
          </button>
        </div>
      </div>
    </header>
  );
}
