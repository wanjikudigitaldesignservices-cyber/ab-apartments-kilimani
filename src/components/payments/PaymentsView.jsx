import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CreditCard,
  Smartphone,
  Plus,
  Download,
  Search,
  CheckCircle2,
  Printer,
  ShieldCheck,
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';

export function PaymentsView() {
  const {
    payments,
    propertyInfo,
    setSelectedReceipt,
    setIsAddPaymentModalOpen,
    launchMpesaStkPush,
    addToast
  } = useApp();

  const [methodFilter, setMethodFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayments = payments.filter(pay => {
    if (methodFilter !== 'all' && !pay.paymentMethod.includes(methodFilter)) {
      return false;
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        pay.tenantName.toLowerCase().includes(q) ||
        pay.unitId.toLowerCase().includes(q) ||
        pay.reference.toLowerCase().includes(q) ||
        pay.receiptNumber.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const exportToCSV = () => {
    const headers = ["Receipt Number", "Unit", "Tenant Name", "Method", "Reference", "Date", "Amount (KES)", "Status"];
    const rows = filteredPayments.map(p => [
      p.receiptNumber,
      p.unitId,
      `"${p.tenantName}"`,
      p.paymentMethod,
      p.reference,
      `"${p.date}"`,
      p.amount,
      p.status
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AB_Apartments_Payments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast("Export Complete", "Payments register downloaded as CSV.", "success");
  };

  const totalCollected = payments.reduce((s, p) => s + (p.amount || 0), 0);
  const mpesaCount = payments.filter(p => p.paymentMethod.includes('mpesa')).length;
  const bankCount = payments.filter(p => p.paymentMethod.includes('bank')).length;

  return (
    <div className="payments-view-container animate-fade-in">
      {/* Header */}
      <div className="view-header-bar glass-card">
        <div>
          <h2>Payments & Safaricom M-Pesa Gateway</h2>
          <p className="text-muted">
            Live reconciliation of Paybill <strong>{propertyInfo.billing.mpesaPaybill}</strong>, STK Push Express checkouts, and bank transfers
          </p>
        </div>

        <div className="header-actions-row">
          <button 
            className="btn-mpesa"
            onClick={() => launchMpesaStkPush({
              phone: "+254 722 341 890",
              unitId: "A302",
              amount: 86420,
              tenantName: "Sharon Akinyi Ochieng"
            })}
          >
            <Smartphone size={16} />
            <span>Simulate M-Pesa STK Push</span>
          </button>

          <button 
            className="btn-primary"
            onClick={() => setIsAddPaymentModalOpen(true)}
          >
            <Plus size={16} />
            <span>Record Payment</span>
          </button>

          <button 
            className="btn-secondary"
            onClick={exportToCSV}
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Gateway Metric Highlights */}
      <div className="financial-mini-grid">
        <div className="mini-card glass-card">
          <span className="lbl">Total Reconciled Collections:</span>
          <strong className="val text-emerald">KES {totalCollected.toLocaleString()}</strong>
          <span className="sub">{payments.length} Transactions Settled</span>
        </div>
        <div className="mini-card glass-card">
          <span className="lbl">M-Pesa Dominance:</span>
          <strong className="val text-mpesa">
            {payments.length > 0 ? ((mpesaCount / payments.length) * 100).toFixed(0) : 0}% via M-Pesa
          </strong>
          <span className="sub">Instant STK & Paybill 408920</span>
        </div>
        <div className="mini-card glass-card">
          <span className="lbl">Direct Bank Transfers:</span>
          <strong className="val text-blue">{bankCount} Wire Settlements</strong>
          <span className="sub">NCBA / KCB / Stanbic Bank</span>
        </div>
      </div>

      {/* Filters Strip */}
      <div className="filters-strip glass-card">
        <div className="filter-group">
          <span className="filter-label">Filter Gateway:</span>
          <div className="pill-buttons">
            <button
              className={`pill-btn ${methodFilter === 'all' ? 'active' : ''}`}
              onClick={() => setMethodFilter('all')}
            >
              All Methods ({payments.length})
            </button>
            <button
              className={`pill-btn ${methodFilter === 'mpesa' ? 'active' : ''}`}
              onClick={() => setMethodFilter('mpesa')}
            >
              M-Pesa Paybill / STK ({mpesaCount})
            </button>
            <button
              className={`pill-btn ${methodFilter === 'bank' ? 'active' : ''}`}
              onClick={() => setMethodFilter('bank')}
            >
              Bank Transfers ({bankCount})
            </button>
          </div>
        </div>

        <div className="navbar-search" style={{ width: '320px' }}>
          <Search size={15} className="search-icon" />
          <input
            type="text"
            placeholder="Search receipt #, ref, tenant, unit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Payments Table */}
      <div className="table-responsive glass-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Receipt #</th>
              <th>Unit</th>
              <th>Tenant Name</th>
              <th>Gateway Channel</th>
              <th>Transaction Code</th>
              <th>Settlement Timestamp</th>
              <th className="text-right">Amount (KES)</th>
              <th>Status</th>
              <th className="text-center">Official Receipt</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map(pay => {
              const isMpesa = pay.paymentMethod.includes('mpesa');

              return (
                <tr key={pay.id}>
                  <td>
                    <span className="receipt-pill">{pay.receiptNumber}</span>
                  </td>
                  <td>
                    <span className="unit-pill">Unit {pay.unitId}</span>
                  </td>
                  <td>
                    <strong>{pay.tenantName}</strong>
                    <div className="sub-desc font-xs">{pay.phoneNumber || ''}</div>
                  </td>
                  <td>
                    <span className={`badge ${isMpesa ? 'badge-mpesa' : 'badge-occupied'}`}>
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
                  <td>
                    <span className="badge badge-paid">
                      <CheckCircle2 size={12} /> {pay.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn-secondary btn-xs"
                      onClick={() => setSelectedReceipt(pay)}
                    >
                      <Printer size={12} />
                      <span>View Receipt</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
