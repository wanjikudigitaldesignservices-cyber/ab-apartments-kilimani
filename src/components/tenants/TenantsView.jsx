import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  UserPlus,
  Search,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  CheckCircle2,
  FileText,
  Smartphone,
  Shield,
  CreditCard,
  Car,
  X,
  Plus,
  Send,
  Building2,
  Clock
} from 'lucide-react';

export function TenantsView() {
  const {
    tenants,
    units,
    invoices,
    payments,
    selectedTenant,
    setSelectedTenant,
    setIsAddTenantModalOpen,
    launchMpesaStkPush,
    setSelectedReceipt,
    addToast
  } = useApp();

  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'active' | 'arrears' | 'expiring'
  const [localSearch, setLocalSearch] = useState('');

  // Filtering
  const filteredTenants = tenants.filter(tenant => {
    // Search
    if (localSearch) {
      const q = localSearch.toLowerCase();
      const matchName = tenant.name.toLowerCase().includes(q);
      const matchPhone = tenant.phone.toLowerCase().includes(q);
      const matchUnit = tenant.unitId.toLowerCase().includes(q);
      const matchId = tenant.nationalId.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchUnit && !matchId) return false;
    }

    // Filter tab
    if (filterTab === 'arrears') {
      return (tenant.arrears || 0) > 0;
    }
    if (filterTab === 'expiring') {
      if (!tenant.leaseEnd) return false;
      const end = new Date(tenant.leaseEnd);
      const now = new Date();
      const diffDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
      return diffDays > 0 && diffDays <= 60;
    }
    if (filterTab === 'active') {
      return tenant.status === 'active';
    }

    return true;
  });

  return (
    <div className="tenants-view-container animate-fade-in">
      {/* Top Banner */}
      <div className="view-header-bar glass-card">
        <div>
          <h2>Tenants & Digital Lease Register</h2>
          <p className="text-muted">
            Managing executive lease contracts, biometric credentials, and residency records for AB Apartments
          </p>
        </div>

        <button 
          className="btn-primary"
          onClick={() => setIsAddTenantModalOpen(true)}
        >
          <UserPlus size={16} />
          <span>Onboard New Tenant</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="filters-strip glass-card">
        <div className="filter-group">
          <span className="filter-label">Filter:</span>
          <div className="pill-buttons">
            <button
              className={`pill-btn ${filterTab === 'all' ? 'active' : ''}`}
              onClick={() => setFilterTab('all')}
            >
              All Residents ({tenants.length})
            </button>
            <button
              className={`pill-btn ${filterTab === 'active' ? 'active' : ''}`}
              onClick={() => setFilterTab('active')}
            >
              Active Leases
            </button>
            <button
              className={`pill-btn ${filterTab === 'arrears' ? 'active' : ''}`}
              onClick={() => setFilterTab('arrears')}
            >
              In Arrears ({tenants.filter(t => (t.arrears || 0) > 0).length})
            </button>
            <button
              className={`pill-btn ${filterTab === 'expiring' ? 'active' : ''}`}
              onClick={() => setFilterTab('expiring')}
            >
              Expiring Leases (60d)
            </button>
          </div>
        </div>

        <div className="navbar-search" style={{ width: '320px' }}>
          <Search size={15} className="search-icon" />
          <input
            type="text"
            placeholder="Filter by name, unit, phone, ID..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Tenants Table */}
      <div className="table-responsive glass-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Tenant & ID</th>
              <th>Unit & Wing</th>
              <th>Contacts</th>
              <th>Lease Period</th>
              <th>Deposit Held</th>
              <th>Arrears Balance</th>
              <th className="text-center">Quick Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTenants.map(tenant => {
              const unit = units.find(u => u.id === tenant.unitId);
              const hasArrears = (tenant.arrears || 0) > 0;

              return (
                <tr key={tenant.id} className={hasArrears ? 'row-warning' : ''}>
                  <td>
                    <div className="tenant-cell">
                      <strong className="tenant-name">{tenant.name}</strong>
                      <span className="tenant-sub">{tenant.occupation}</span>
                      <span className="tenant-id-tag">ID: {tenant.nationalId}</span>
                    </div>
                  </td>
                  <td>
                    <span className="unit-pill">Unit {tenant.unitId}</span>
                    <div className="unit-sub-type">{unit?.type || 'Executive Suite'}</div>
                  </td>
                  <td>
                    <div className="contacts-cell">
                      <div className="contact-item"><Phone size={12} /> {tenant.phone}</div>
                      <div className="contact-item text-muted"><Mail size={12} /> {tenant.email}</div>
                    </div>
                  </td>
                  <td>
                    <div className="lease-dates">
                      <span>{tenant.leaseStart}</span>
                      <span className="to-arrow">→</span>
                      <strong>{tenant.leaseEnd}</strong>
                    </div>
                  </td>
                  <td>
                    <span className="text-emerald font-semibold">
                      KES {tenant.depositAmount?.toLocaleString()}
                    </span>
                    <div className="deposit-tag">Deposit Paid</div>
                  </td>
                  <td>
                    {hasArrears ? (
                      <div>
                        <strong className="text-rose">KES {tenant.arrears.toLocaleString()}</strong>
                        <div className="badge badge-overdue font-xs">Overdue</div>
                      </div>
                    ) : (
                      <div className="badge badge-paid">Settled (KES 0)</div>
                    )}
                  </td>
                  <td className="text-center">
                    <div className="action-buttons-cell">
                      <button 
                        className="btn-secondary btn-xs"
                        onClick={() => setSelectedTenant(tenant)}
                        title="View Full Tenancy Dossier"
                      >
                        Profile File
                      </button>

                      {hasArrears && (
                        <button
                          className="btn-mpesa btn-xs"
                          onClick={() => launchMpesaStkPush({
                            phone: tenant.phone,
                            unitId: tenant.unitId,
                            amount: tenant.arrears,
                            tenantId: tenant.id,
                            tenantName: tenant.name
                          })}
                          title="Trigger M-Pesa STK Demand Push"
                        >
                          <Smartphone size={12} />
                          <span>STK Pay</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Tenant Dossier / Profile Modal */}
      {selectedTenant && (
        <div className="modal-overlay">
          <div className="modal-content tenant-profile-modal animate-fade-in">
            <div className="modal-header">
              <div className="header-brand">
                <Users size={24} className="text-emerald" />
                <div>
                  <h3>Tenancy Dossier: {selectedTenant.name}</h3>
                  <p className="text-muted">Unit {selectedTenant.unitId} • Registered Resident</p>
                </div>
              </div>
              <button className="icon-btn" onClick={() => setSelectedTenant(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {/* Profile Top Stats */}
              <div className="tenant-profile-grid">
                <div className="profile-section-card glass-card">
                  <h4>Personal & Identity Record</h4>
                  <div className="detail-row">
                    <span className="lbl">Full Legal Name:</span>
                    <strong>{selectedTenant.name}</strong>
                  </div>
                  <div className="detail-row">
                    <span className="lbl">National ID / Passport:</span>
                    <code>{selectedTenant.nationalId}</code>
                  </div>
                  <div className="detail-row">
                    <span className="lbl">Phone Number:</span>
                    <span>{selectedTenant.phone}</span>
                  </div>
                  <div className="detail-row">
                    <span className="lbl">Email Address:</span>
                    <span>{selectedTenant.email}</span>
                  </div>
                  <div className="detail-row">
                    <span className="lbl">Occupation / Employer:</span>
                    <span>{selectedTenant.occupation}</span>
                  </div>
                  <div className="detail-row">
                    <span className="lbl">Vehicle Registration:</span>
                    <span className="badge badge-vacant"><Car size={13} /> {selectedTenant.vehiclePlate || 'None'}</span>
                  </div>
                </div>

                <div className="profile-section-card glass-card">
                  <h4>Lease & Tenancy Agreement</h4>
                  <div className="detail-row">
                    <span className="lbl">Allocated Residence:</span>
                    <strong>Unit {selectedTenant.unitId}</strong>
                  </div>
                  <div className="detail-row">
                    <span className="lbl">Lease Commencement:</span>
                    <span>{selectedTenant.leaseStart}</span>
                  </div>
                  <div className="detail-row">
                    <span className="lbl">Lease Expiry:</span>
                    <strong>{selectedTenant.leaseEnd}</strong>
                  </div>
                  <div className="detail-row">
                    <span className="lbl">Security Deposit Held:</span>
                    <strong className="text-emerald">KES {selectedTenant.depositAmount?.toLocaleString()}</strong>
                  </div>
                  <div className="detail-row">
                    <span className="lbl">Emergency Contact:</span>
                    <span>{selectedTenant.emergencyContact?.name} ({selectedTenant.emergencyContact?.relation})</span>
                  </div>
                  <div className="detail-row">
                    <span className="lbl">Emergency Phone:</span>
                    <span>{selectedTenant.emergencyContact?.phone}</span>
                  </div>
                </div>
              </div>

              {/* Statement of Account for this Tenant */}
              <div className="statement-section glass-card">
                <div className="statement-header">
                  <h4>Billing & Payment History</h4>
                  {(selectedTenant.arrears || 0) > 0 ? (
                    <button 
                      className="btn-mpesa btn-sm"
                      onClick={() => launchMpesaStkPush({
                        phone: selectedTenant.phone,
                        unitId: selectedTenant.unitId,
                        amount: selectedTenant.arrears,
                        tenantId: selectedTenant.id,
                        tenantName: selectedTenant.name
                      })}
                    >
                      <Smartphone size={15} />
                      <span>Collect Arrears KES {selectedTenant.arrears.toLocaleString()} via STK</span>
                    </button>
                  ) : (
                    <span className="badge badge-paid">Zero Balance (Account Current)</span>
                  )}
                </div>

                <div className="table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Billing Cycle</th>
                        <th>Invoice #</th>
                        <th>Total Billed</th>
                        <th>Paid</th>
                        <th>Balance</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.filter(i => i.tenantId === selectedTenant.id).map(inv => (
                        <tr key={inv.id}>
                          <td>{inv.month}</td>
                          <td><code>{inv.id}</code></td>
                          <td>KES {inv.totalAmount.toLocaleString()}</td>
                          <td className="text-emerald">KES {inv.amountPaid.toLocaleString()}</td>
                          <td className={inv.balance > 0 ? 'text-rose font-bold' : ''}>
                            KES {inv.balance.toLocaleString()}
                          </td>
                          <td>
                            <span className={`badge ${inv.status === 'paid' ? 'badge-paid' : 'badge-overdue'}`}>
                              {inv.status.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="modal-actions-bar">
                <button 
                  className="btn-secondary"
                  onClick={() => addToast("Notice Drafted", `Renewal confirmation sent to ${selectedTenant.name}`, "info")}
                >
                  <Send size={15} />
                  <span>Send SMS Lease Renewal</span>
                </button>
                <button className="btn-secondary" onClick={() => setSelectedTenant(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
