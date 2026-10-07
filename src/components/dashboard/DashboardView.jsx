import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  TrendingDown,
  Building2,
  Users,
  CreditCard,
  Wrench,
  AlertCircle,
  Clock,
  ArrowUpRight,
  Smartphone,
  Plus,
  Send,
  FileText,
  Calendar,
  CheckCircle2,
  Zap,
  Sparkles
} from 'lucide-react';

export function DashboardView() {
  const {
    propertyInfo,
    stats,
    invoices,
    payments,
    maintenance,
    tenants,
    units,
    setActiveTab,
    setIsAddPaymentModalOpen,
    launchMpesaStkPush,
    setSelectedReceipt,
    generateBulkInvoices,
    setIsBroadcastModalOpen,
    addToast
  } = useApp();

  // Filter overdue invoices
  const overdueInvoices = invoices.filter(i => i.status === 'overdue' || (i.status === 'unpaid' && i.balance > 0));

  // Urgent maintenance
  const urgentTickets = maintenance.filter(m => (m.priority === 'Urgent' || m.priority === 'High') && m.status !== 'Resolved');

  // Expiring leases (within 60 days)
  const expiringTenants = tenants.filter(t => {
    if (!t.leaseEnd) return false;
    const end = new Date(t.leaseEnd);
    const now = new Date();
    const diffDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 60;
  });

  return (
    <div className="dashboard-container animate-fade-in">
      {/* Property Hero Banner */}
      <div className="dashboard-hero glass-card">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="pulse-dot"></span>
            <span>{propertyInfo.clientName || "Executive Asset Management"}</span>
          </div>
          <h2>{propertyInfo.name}</h2>
          <p className="hero-description">
            {propertyInfo.address} • {propertyInfo.city} • {propertyInfo.totalUnits || units.length} Units {propertyInfo.blocks?.length ? `(${propertyInfo.blocks.join(' & ')})` : ''}
          </p>

          <div className="hero-quick-actions">
            <button 
              className="btn-mpesa"
              onClick={() => {
                if (tenants.length > 0) {
                  launchMpesaStkPush({
                    phone: tenants[0].phone,
                    unitId: tenants[0].unitId,
                    amount: tenants[0].baseRent || 50000,
                    tenantName: tenants[0].name
                  });
                } else {
                  launchMpesaStkPush({
                    phone: "+254 700 000 000",
                    unitId: units[0]?.id || "101",
                    amount: units[0]?.baseRent || 50000,
                    tenantName: "Resident"
                  });
                }
              }}
            >
              <Smartphone size={16} />
              <span>Express M-Pesa STK</span>
            </button>

            <button 
              className="btn-primary"
              onClick={() => setIsAddPaymentModalOpen(true)}
            >
              <Plus size={16} />
              <span>Record Rent Payment</span>
            </button>

            <button 
              className="btn-secondary"
              onClick={() => generateBulkInvoices("Current Month")}
            >
              <FileText size={16} />
              <span>Batch Billing</span>
            </button>

            <button 
              className="btn-secondary"
              onClick={() => setIsBroadcastModalOpen(true)}
            >
              <Send size={16} />
              <span>Broadcast SMS Notice</span>
            </button>
          </div>
        </div>

        {/* Hero Visual Preview */}
        <div className="hero-image-card">
          <img 
            src={propertyInfo.image || "/ab-facade.jpg"} 
            alt={propertyInfo.name} 
            className="hero-img"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="hero-image-overlay">
            <div className="overlay-pill">
              <Sparkles size={14} className="text-gold" />
              <span>{propertyInfo.city} • Paybill {propertyInfo.billing?.mpesaPaybill || "Daraja"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 KPI Metric Cards */}
      <div className="kpi-grid">
        {/* KPI 1: Rent Collections */}
        <div className="kpi-card glass-card">
          <div className="kpi-header">
            <span className="kpi-title">Monthly Collections</span>
            <div className="kpi-icon-box bg-emerald">
              <CreditCard size={18} className="text-emerald" />
            </div>
          </div>
          <div className="kpi-value">
            <span className="curr">KES</span>
            <strong>{stats.totalCollected.toLocaleString()}</strong>
          </div>
          <div className="kpi-progress-bar">
            <div 
              className="kpi-progress-fill" 
              style={{ width: `${Math.min(100, stats.collectionRate)}%` }}
            ></div>
          </div>
          <div className="kpi-meta">
            <span>Target: KES {stats.totalInvoiced.toLocaleString()}</span>
            <span className="text-emerald font-semibold">{stats.collectionRate}% In</span>
          </div>
        </div>

        {/* KPI 2: Occupancy Rate */}
        <div className="kpi-card glass-card">
          <div className="kpi-header">
            <span className="kpi-title">Occupancy Rate</span>
            <div className="kpi-icon-box bg-blue">
              <Building2 size={18} className="text-blue" />
            </div>
          </div>
          <div className="kpi-value">
            <strong>{stats.occupancyRate}%</strong>
            <span className="kpi-sub">({stats.occupiedUnits}/{stats.totalUnitsCount} Units)</span>
          </div>
          <div className="occupancy-pill-row">
            <span className="badge badge-vacant">{stats.vacantUnits} Vacant</span>
            <span className="badge badge-maintenance">{stats.maintenanceUnits} Maint</span>
            <span className="badge badge-reserved">{stats.reservedUnits} Resv</span>
          </div>
          <div className="kpi-meta">
            <span>Vacancy Loss: ~KES {(stats.vacantUnits * 85000).toLocaleString()}/mo</span>
          </div>
        </div>

        {/* KPI 3: Outstanding Arrears */}
        <div className="kpi-card glass-card">
          <div className="kpi-header">
            <span className="kpi-title">Uncollected Arrears</span>
            <div className="kpi-icon-box bg-rose">
              <AlertCircle size={18} className="text-rose" />
            </div>
          </div>
          <div className="kpi-value text-rose">
            <span className="curr">KES</span>
            <strong>{stats.totalArrears.toLocaleString()}</strong>
          </div>
          <div className="kpi-meta">
            <span className="badge badge-overdue">{overdueInvoices.length} Overdue Accounts</span>
            <button 
              className="kpi-action-link"
              onClick={() => setActiveTab('billing')}
            >
              Review Arrears →
            </button>
          </div>
        </div>

        {/* KPI 4: Net Operating Income */}
        <div className="kpi-card glass-card">
          <div className="kpi-header">
            <span className="kpi-title">Net Operating Income</span>
            <div className="kpi-icon-box bg-gold">
              <TrendingUp size={18} className="text-gold" />
            </div>
          </div>
          <div className="kpi-value">
            <span className="curr">KES</span>
            <strong>{stats.netOperatingIncome.toLocaleString()}</strong>
          </div>
          <div className="kpi-meta">
            <span>Expenses: KES {stats.totalOperatingExpenses.toLocaleString()}</span>
            <span className="text-emerald font-semibold">
              {stats.totalCollected > 0 ? ((stats.netOperatingIncome / stats.totalCollected) * 100).toFixed(0) : 0}% Net
            </span>
          </div>
        </div>

        {/* KPI 5: Maintenance Work Orders */}
        <div className="kpi-card glass-card">
          <div className="kpi-header">
            <span className="kpi-title">Work Orders</span>
            <div className="kpi-icon-box bg-blue">
              <Wrench size={18} className="text-blue" />
            </div>
          </div>
          <div className="kpi-value">
            <strong>{stats.openTickets}</strong>
            <span className="kpi-sub">Active Tickets</span>
          </div>
          <div className="kpi-meta">
            <span className={`badge ${stats.urgentTickets > 0 ? 'badge-overdue' : 'badge-paid'}`}>
              {stats.urgentTickets} Urgent
            </span>
            <button 
              className="kpi-action-link"
              onClick={() => setActiveTab('maintenance')}
            >
              View Board →
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Charts & Attention Items */}
      <div className="dashboard-grid-2col">
        {/* Left Column: Visual Analytics */}
        <div className="dashboard-analytics-section glass-card">
          <div className="section-header">
            <div>
              <h3>Revenue & Expense Cashflow</h3>
              <p className="section-sub">Monthly performance (May 2026 - October 2026)</p>
            </div>
            <span className="badge badge-mpesa">Paybill 408920 Active</span>
          </div>

          {/* SVG Cashflow Chart */}
          <div className="cashflow-chart-container">
            <div className="chart-legend">
              <div className="legend-item"><span className="color-box bg-emerald"></span> Gross Rent Collections</div>
              <div className="legend-item"><span className="color-box bg-rose"></span> Operating Expenses</div>
            </div>

            <svg viewBox="0 0 600 220" className="analytics-svg">
              {/* Grid Lines */}
              <line x1="40" y1="30" x2="580" y2="30" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
              <line x1="40" y1="80" x2="580" y2="80" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
              <line x1="40" y1="130" x2="580" y2="130" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
              <line x1="40" y1="180" x2="580" y2="180" stroke="rgba(255,255,255,0.1)" />

              {/* Data: 6 Months */}
              {/* May */}
              <rect x="70" y="55" width="28" height="125" rx="4" fill="url(#emeraldGrad)" />
              <rect x="102" y="115" width="24" height="65" rx="4" fill="url(#roseGrad)" />
              <text x="98" y="200" fill="var(--text-muted)" fontSize="11" textAnchor="middle">May</text>

              {/* Jun */}
              <rect x="155" y="48" width="28" height="132" rx="4" fill="url(#emeraldGrad)" />
              <rect x="187" y="118" width="24" height="62" rx="4" fill="url(#roseGrad)" />
              <text x="183" y="200" fill="var(--text-muted)" fontSize="11" textAnchor="middle">Jun</text>

              {/* Jul */}
              <rect x="240" y="42" width="28" height="138" rx="4" fill="url(#emeraldGrad)" />
              <rect x="272" y="110" width="24" height="70" rx="4" fill="url(#roseGrad)" />
              <text x="268" y="200" fill="var(--text-muted)" fontSize="11" textAnchor="middle">Jul</text>

              {/* Aug */}
              <rect x="325" y="38" width="28" height="142" rx="4" fill="url(#emeraldGrad)" />
              <rect x="357" y="105" width="24" height="75" rx="4" fill="url(#roseGrad)" />
              <text x="353" y="200" fill="var(--text-muted)" fontSize="11" textAnchor="middle">Aug</text>

              {/* Sep */}
              <rect x="410" y="35" width="28" height="145" rx="4" fill="url(#emeraldGrad)" />
              <rect x="442" y="108" width="24" height="72" rx="4" fill="url(#roseGrad)" />
              <text x="438" y="200" fill="var(--text-muted)" fontSize="11" textAnchor="middle">Sep</text>

              {/* Oct (Current) */}
              <rect x="495" y="45" width="28" height="135" rx="4" fill="url(#emeraldGradHighlight)" />
              <rect x="527" y="100" width="24" height="80" rx="4" fill="url(#roseGrad)" />
              <text x="523" y="200" fill="var(--emerald-400)" fontWeight="bold" fontSize="11" textAnchor="middle">Oct (Now)</text>

              {/* Gradients */}
              <defs>
                <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>
                <linearGradient id="emeraldGradHighlight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="roseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#be123c" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Unit Type Distribution */}
          <div className="unit-mix-bar-grid">
            <div className="mix-stat">
              <span className="mix-label">Studios (8)</span>
              <strong className="mix-rent">KES 50k - 52k</strong>
              <span className="mix-sub text-emerald">100% Occupied</span>
            </div>
            <div className="mix-stat">
              <span className="mix-label">1-Bedrooms (14)</span>
              <strong className="mix-rent">KES 70k - 78k</strong>
              <span className="mix-sub text-emerald">93% Occupied</span>
            </div>
            <div className="mix-stat">
              <span className="mix-label">2-Bed Deluxe (18)</span>
              <strong className="mix-rent">KES 100k - 120k</strong>
              <span className="mix-sub text-blue">89% Occupied</span>
            </div>
            <div className="mix-stat">
              <span className="mix-label">3-Bed Penthouse (8)</span>
              <strong className="mix-rent">KES 145k - 165k</strong>
              <span className="mix-sub text-emerald">100% Occupied</span>
            </div>
          </div>
        </div>

        {/* Right Column: Urgent Action Center */}
        <div className="dashboard-attention-section">
          {/* Overdue Accounts Panel */}
          <div className="attention-card glass-card">
            <div className="section-header">
              <div className="title-with-badge">
                <AlertCircle size={18} className="text-rose" />
                <h3>Rent Arrears Watchlist</h3>
              </div>
              <span className="badge badge-overdue">{overdueInvoices.length} Pending</span>
            </div>

            <div className="attention-list">
              {overdueInvoices.length === 0 ? (
                <div className="empty-state-p">No overdue accounts. All tenants up to date!</div>
              ) : (
                overdueInvoices.map(inv => (
                  <div key={inv.id} className="attention-item">
                    <div className="item-main">
                      <div className="item-unit-tag">Unit {inv.unitId}</div>
                      <div>
                        <strong className="item-name">{inv.tenantName}</strong>
                        <div className="item-meta">
                          Due: {inv.dueDate} • Late Fee: KES {inv.latePenalty.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="item-actions">
                      <strong className="item-amount text-rose">
                        KES {inv.balance.toLocaleString()}
                      </strong>
                      <button 
                        className="btn-mpesa btn-xs"
                        onClick={() => launchMpesaStkPush({
                          phone: "+254 718 902 443",
                          unitId: inv.unitId,
                          amount: inv.balance,
                          invoiceId: inv.id,
                          tenantName: inv.tenantName
                        })}
                        title="Simulate Instant STK Push to tenant's Safaricom line"
                      >
                        <Smartphone size={12} />
                        <span>Push STK</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Urgent Maintenance Work Orders */}
          <div className="attention-card glass-card">
            <div className="section-header">
              <div className="title-with-badge">
                <Wrench size={18} className="text-gold" />
                <h3>Priority Facilities Maintenance</h3>
              </div>
              <button 
                className="section-link"
                onClick={() => setActiveTab('maintenance')}
              >
                View All →
              </button>
            </div>

            <div className="attention-list">
              {urgentTickets.map(ticket => (
                <div key={ticket.id} className="attention-item">
                  <div className="item-main">
                    <span className="badge badge-maintenance">{ticket.category}</span>
                    <div>
                      <strong className="item-name">{ticket.title}</strong>
                      <div className="item-meta">
                        {ticket.unitId} • Assigned: {ticket.assignedFundi}
                      </div>
                    </div>
                  </div>
                  <span className={`badge ${ticket.priority === 'Urgent' ? 'badge-overdue' : 'badge-maintenance'}`}>
                    {ticket.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Expiring Leases */}
          {expiringTenants.length > 0 && (
            <div className="attention-card glass-card">
              <div className="section-header">
                <div className="title-with-badge">
                  <Clock size={18} className="text-blue" />
                  <h3>Upcoming Lease Expirations (60d)</h3>
                </div>
              </div>
              <div className="attention-list">
                {expiringTenants.map(t => (
                  <div key={t.id} className="attention-item">
                    <div className="item-main">
                      <div className="item-unit-tag">Unit {t.unitId}</div>
                      <div>
                        <strong className="item-name">{t.name}</strong>
                        <div className="item-meta">Expires on {t.leaseEnd}</div>
                      </div>
                    </div>
                    <button 
                      className="btn-secondary btn-xs"
                      onClick={() => addToast("Notice Sent", `Renewal offer drafted for ${t.name}`, "info")}
                    >
                      Offer Renewal
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Payments Feed */}
      <div className="recent-payments-section glass-card">
        <div className="section-header">
          <div>
            <h3>Recent Collections & M-Pesa Verifications</h3>
            <p className="section-sub">Real-time payment settlements for October 2026</p>
          </div>
          <button 
            className="btn-secondary btn-sm"
            onClick={() => setActiveTab('payments')}
          >
            <span>View Full Payment Ledger</span>
            <ArrowUpRight size={15} />
          </button>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Receipt #</th>
                <th>Apartment Unit</th>
                <th>Tenant Name</th>
                <th>Method</th>
                <th>Reference Code</th>
                <th>Date & Time</th>
                <th className="text-right">Amount (KES)</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.slice(0, 6).map(pay => (
                <tr key={pay.id}>
                  <td>
                    <span className="receipt-pill">{pay.receiptNumber}</span>
                  </td>
                  <td>
                    <span className="unit-pill">Unit {pay.unitId}</span>
                  </td>
                  <td>
                    <strong>{pay.tenantName}</strong>
                  </td>
                  <td>
                    <span className={`badge ${pay.paymentMethod.includes('mpesa') ? 'badge-mpesa' : 'badge-occupied'}`}>
                      {pay.paymentMethod.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <code className="code-ref">{pay.reference}</code>
                  </td>
                  <td className="text-muted">
                    {pay.date}
                  </td>
                  <td className="text-right font-bold text-emerald">
                    {pay.amount.toLocaleString()}
                  </td>
                  <td className="text-center">
                    <button 
                      className="btn-secondary btn-xs"
                      onClick={() => setSelectedReceipt(pay)}
                    >
                      Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
