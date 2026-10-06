import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Receipt,
  FileText,
  Plus,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Clock,
  Printer,
  X,
  CreditCard,
  Building2,
  DollarSign
} from 'lucide-react';

export function BillingView() {
  const {
    invoices,
    generateBulkInvoices,
    launchMpesaStkPush,
    setIsAddPaymentModalOpen,
    propertyInfo,
    addToast
  } = useApp();

  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'paid' | 'overdue' | 'unpaid'
  const [selectedInvoiceForPrint, setSelectedInvoiceForPrint] = useState(null);

  const filteredInvoices = invoices.filter(inv => {
    if (statusFilter === 'all') return true;
    return inv.status === statusFilter;
  });

  const totalBilled = invoices.reduce((s, i) => s + (i.totalAmount || 0), 0);
  const totalPaid = invoices.reduce((s, i) => s + (i.amountPaid || 0), 0);
  const totalArrears = invoices.reduce((s, i) => s + (i.balance || 0), 0);

  return (
    <div className="billing-view-container animate-fade-in">
      {/* View Header */}
      <div className="view-header-bar glass-card">
        <div>
          <h2>Rent Billing & Utility Invoicing</h2>
          <p className="text-muted">
            Automated monthly billing engine for base rent, service charge, and metered borehole utilities
          </p>
        </div>

        <div className="header-actions-row">
          <button 
            className="btn-primary"
            onClick={() => generateBulkInvoices("November 2026")}
          >
            <FileText size={16} />
            <span>Generate Invoices (Nov 2026)</span>
          </button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="financial-mini-grid">
        <div className="mini-card glass-card">
          <span className="lbl">Total Invoiced (October):</span>
          <strong className="val text-blue">KES {totalBilled.toLocaleString()}</strong>
          <span className="sub">{invoices.length} Registered Bills</span>
        </div>
        <div className="mini-card glass-card">
          <span className="lbl">Total Collected:</span>
          <strong className="val text-emerald">KES {totalPaid.toLocaleString()}</strong>
          <span className="sub">{totalBilled > 0 ? ((totalPaid / totalBilled) * 100).toFixed(1) : 0}% Realized</span>
        </div>
        <div className="mini-card glass-card">
          <span className="lbl">Outstanding Arrears:</span>
          <strong className="val text-rose">KES {totalArrears.toLocaleString()}</strong>
          <span className="sub">Late Penalty Applied (5%)</span>
        </div>
      </div>

      {/* Status Filter Strip */}
      <div className="filters-strip glass-card">
        <div className="filter-group">
          <span className="filter-label">Invoice Status:</span>
          <div className="pill-buttons">
            <button
              className={`pill-btn ${statusFilter === 'all' ? 'active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              All Invoices ({invoices.length})
            </button>
            <button
              className={`pill-btn ${statusFilter === 'paid' ? 'active' : ''}`}
              onClick={() => setStatusFilter('paid')}
            >
              Paid ({invoices.filter(i => i.status === 'paid').length})
            </button>
            <button
              className={`pill-btn ${statusFilter === 'overdue' ? 'active' : ''}`}
              onClick={() => setStatusFilter('overdue')}
            >
              Overdue ({invoices.filter(i => i.status === 'overdue').length})
            </button>
            <button
              className={`pill-btn ${statusFilter === 'unpaid' ? 'active' : ''}`}
              onClick={() => setStatusFilter('unpaid')}
            >
              Unpaid ({invoices.filter(i => i.status === 'unpaid').length})
            </button>
          </div>
        </div>
      </div>

      {/* Invoices Master Table */}
      <div className="table-responsive glass-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Unit</th>
              <th>Tenant</th>
              <th>Rent (KES)</th>
              <th>Service</th>
              <th>Water (m³)</th>
              <th>Garbage</th>
              <th>Late Fee</th>
              <th className="text-right">Total Due (KES)</th>
              <th>Status</th>
              <th className="text-center">Settlement Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map(inv => {
              const isOverdue = inv.status === 'overdue';
              const isPaid = inv.status === 'paid';

              return (
                <tr key={inv.id} className={isOverdue ? 'row-warning' : ''}>
                  <td>
                    <code className="code-ref">{inv.id}</code>
                    <div className="sub-desc font-xs">{inv.month}</div>
                  </td>
                  <td>
                    <span className="unit-pill">Unit {inv.unitId}</span>
                  </td>
                  <td>
                    <strong>{inv.tenantName}</strong>
                    <div className="sub-desc font-xs">Due: {inv.dueDate}</div>
                  </td>
                  <td>{inv.baseRent?.toLocaleString()}</td>
                  <td>{inv.serviceCharge?.toLocaleString()}</td>
                  <td>
                    <span>{inv.waterUnits} m³</span>
                    <div className="sub-desc font-xs">KES {inv.waterAmount?.toLocaleString()}</div>
                  </td>
                  <td>KES {inv.garbageFee?.toLocaleString()}</td>
                  <td>
                    {inv.latePenalty > 0 ? (
                      <span className="text-rose font-semibold">+KES {inv.latePenalty.toLocaleString()}</span>
                    ) : (
                      <span className="text-muted">KES 0</span>
                    )}
                  </td>
                  <td className="text-right font-bold">
                    <span className={isPaid ? 'text-emerald' : 'text-rose'}>
                      KES {inv.totalAmount.toLocaleString()}
                    </span>
                    {inv.balance > 0 && inv.balance !== inv.totalAmount && (
                      <div className="font-xs text-rose">Bal: KES {inv.balance.toLocaleString()}</div>
                    )}
                  </td>
                  <td>
                    <span className={`badge ${isPaid ? 'badge-paid' : 'badge-overdue'}`}>
                      {inv.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="action-buttons-cell">
                      {!isPaid && (
                        <button
                          className="btn-mpesa btn-xs"
                          onClick={() => launchMpesaStkPush({
                            phone: "+254 718 902 443",
                            unitId: inv.unitId,
                            amount: inv.balance,
                            invoiceId: inv.id,
                            tenantName: inv.tenantName
                          })}
                          title="Trigger Instant Safaricom M-Pesa STK Push"
                        >
                          <Smartphone size={12} />
                          <span>STK Pay</span>
                        </button>
                      )}

                      <button
                        className="btn-secondary btn-xs"
                        onClick={() => setSelectedInvoiceForPrint(inv)}
                        title="View Detailed Bill Breakdown"
                      >
                        <Printer size={12} />
                        <span>Print Bill</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Invoice Printable Bill Modal */}
      {selectedInvoiceForPrint && (
        <div className="modal-overlay">
          <div className="modal-content invoice-print-modal animate-fade-in">
            <div className="modal-header no-print">
              <div className="header-brand">
                <Receipt size={24} className="text-emerald" />
                <h3>Monthly Billing Statement: {selectedInvoiceForPrint.id}</h3>
              </div>
              <div className="modal-actions-right">
                <button className="btn-primary btn-sm" onClick={() => window.print()}>
                  <Printer size={15} />
                  <span>Print Statement</span>
                </button>
                <button className="icon-btn" onClick={() => setSelectedInvoiceForPrint(null)}>
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="modal-body">
              <div className="printable-bill-sheet">
                <div className="bill-top-brand">
                  <div>
                    <h2>{propertyInfo.name.toUpperCase()}</h2>
                    <p className="text-muted">{propertyInfo.address}</p>
                    <p className="font-xs">Safaricom Paybill: {propertyInfo.billing.mpesaPaybill} • Acc: {selectedInvoiceForPrint.unitId}</p>
                  </div>
                  <div className="bill-ref-box">
                    <strong>BILLING STATEMENT</strong>
                    <div>Cycle: {selectedInvoiceForPrint.month}</div>
                    <div>Issue Date: {selectedInvoiceForPrint.issueDate}</div>
                    <div>Due Date: {selectedInvoiceForPrint.dueDate}</div>
                  </div>
                </div>

                <div className="bill-tenant-info glass-card">
                  <div>Billed To: <strong>{selectedInvoiceForPrint.tenantName}</strong></div>
                  <div>Residential Unit: <strong>Unit {selectedInvoiceForPrint.unitId}</strong></div>
                  <div>Status: <span className="badge badge-overdue">{selectedInvoiceForPrint.status.toUpperCase()}</span></div>
                </div>

                <table className="receipt-table" style={{ marginTop: '20px' }}>
                  <thead>
                    <tr>
                      <th>Charge Item</th>
                      <th>Quantity / Description</th>
                      <th className="text-right">Subtotal (KES)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Monthly Apartment Rent</td>
                      <td>Executive Suite Unit {selectedInvoiceForPrint.unitId}</td>
                      <td className="text-right">{selectedInvoiceForPrint.baseRent?.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>Estate Service Charge</td>
                      <td>Elevator, Security, Pool & Gym amenities</td>
                      <td className="text-right">{selectedInvoiceForPrint.serviceCharge?.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>Water Consumption Sub-metering</td>
                      <td>{selectedInvoiceForPrint.waterUnits} m³ @ KES {selectedInvoiceForPrint.waterRate || 160}/m³</td>
                      <td className="text-right">{selectedInvoiceForPrint.waterAmount?.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>Sanitary & Garbage Disposal</td>
                      <td>Nairobi County authorized collection</td>
                      <td className="text-right">{selectedInvoiceForPrint.garbageFee?.toLocaleString()}</td>
                    </tr>
                    {selectedInvoiceForPrint.latePenalty > 0 && (
                      <tr>
                        <td className="text-rose">Overdue Penalty Surcharge</td>
                        <td className="text-rose">5% late assessment applied after 5th of month</td>
                        <td className="text-right text-rose">{selectedInvoiceForPrint.latePenalty?.toLocaleString()}</td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr className="receipt-total-row">
                      <td colSpan="2">TOTAL PAYABLE AMOUNT</td>
                      <td className="text-right total-val">
                        KES {selectedInvoiceForPrint.totalAmount.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>

                <div className="bill-payment-instructions glass-card" style={{ marginTop: '24px' }}>
                  <strong>PAYMENT INSTRUCTIONS (KENYA):</strong>
                  <p>1. Go to M-PESA Menu on your phone</p>
                  <p>2. Select Lipa na M-PESA &gt; Paybill</p>
                  <p>3. Enter Business Number: <strong>{propertyInfo.billing.mpesaPaybill}</strong></p>
                  <p>4. Enter Account Number: <strong>{selectedInvoiceForPrint.unitId}</strong></p>
                  <p>5. Enter Amount: <strong>KES {selectedInvoiceForPrint.totalAmount.toLocaleString()}</strong> and enter M-Pesa PIN.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
