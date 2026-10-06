import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileSpreadsheet,
  Printer,
  Download,
  X,
  Building2,
  CheckCircle2,
  TrendingUp,
  DollarSign
} from 'lucide-react';

export function ReportsModal() {
  const {
    isReportModalOpen,
    setIsReportModalOpen,
    propertyInfo,
    stats,
    units,
    tenants,
    payments,
    expenses,
    invoices
  } = useApp();

  if (!isReportModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content report-modal-container animate-fade-in">
        {/* Actions Bar */}
        <div className="receipt-modal-actions no-print">
          <div className="action-tag">
            <FileSpreadsheet size={16} className="text-emerald" />
            <span>Executive Monthly Property Performance Report</span>
          </div>
          <div className="action-btns">
            <button className="btn-primary btn-sm" onClick={() => window.print()}>
              <Printer size={15} />
              <span>Print Executive Dossier</span>
            </button>
            <button className="icon-btn" onClick={() => setIsReportModalOpen(false)}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Paper Document */}
        <div className="report-paper">
          {/* Header */}
          <div className="report-brand-header">
            <div className="brand-crest">
              <Building2 size={36} />
            </div>
            <div>
              <h2>{propertyInfo.name.toUpperCase()}</h2>
              <p className="report-tagline">MONTHLY MANAGEMENT & CASHFLOW AUDIT REPORT</p>
              <p className="font-xs text-muted">Reporting Period: 1st October 2026 - 31st October 2026 • Prepared for Property Owners</p>
            </div>
          </div>

          <div className="receipt-divider"></div>

          {/* High Level KPI Overview */}
          <div className="report-kpi-grid">
            <div className="report-kpi-box">
              <span className="lbl">Total Units</span>
              <strong>{stats.totalUnitsCount} Units</strong>
              <div className="font-xs">2 High-Rise Wings</div>
            </div>
            <div className="report-kpi-box">
              <span className="lbl">Occupancy Rate</span>
              <strong className="text-emerald">{stats.occupancyRate}%</strong>
              <div className="font-xs">{stats.occupiedUnits} Occupied / {stats.vacantUnits} Vacant</div>
            </div>
            <div className="report-kpi-box">
              <span className="lbl">Gross Invoiced</span>
              <strong>KES {stats.totalInvoiced.toLocaleString()}</strong>
              <div className="font-xs">Rent & Utilities</div>
            </div>
            <div className="report-kpi-box">
              <span className="lbl">Net Collections</span>
              <strong className="text-emerald">KES {stats.totalCollected.toLocaleString()}</strong>
              <div className="font-xs">{stats.collectionRate}% Collection Rate</div>
            </div>
            <div className="report-kpi-box">
              <span className="lbl">Operating Expenses</span>
              <strong className="text-rose">KES {stats.totalOperatingExpenses.toLocaleString()}</strong>
              <div className="font-xs">Security, Lifts, Common KPLC</div>
            </div>
            <div className="report-kpi-box">
              <span className="lbl">Net Operating Income (NOI)</span>
              <strong className="text-gold">KES {stats.netOperatingIncome.toLocaleString()}</strong>
              <div className="font-xs">Net Distributable Yield</div>
            </div>
          </div>

          {/* Section: Rent Roll Summary */}
          <div className="report-section" style={{ marginTop: '24px' }}>
            <h3>1. Active Tenancy Schedule & Rent Roll</h3>
            <table className="receipt-table" style={{ marginTop: '10px' }}>
              <thead>
                <tr>
                  <th>Unit</th>
                  <th>Tenant Name</th>
                  <th>ID / Passport</th>
                  <th>Lease Expiry</th>
                  <th>Monthly Rent</th>
                  <th>Deposit Held</th>
                  <th>Arrears</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map(t => (
                  <tr key={t.id}>
                    <td><strong>Unit {t.unitId}</strong></td>
                    <td>{t.name}</td>
                    <td><code>{t.nationalId}</code></td>
                    <td>{t.leaseEnd}</td>
                    <td>KES {t.depositAmount?.toLocaleString()}</td>
                    <td className="text-emerald">KES {t.depositAmount?.toLocaleString()}</td>
                    <td className={t.arrears > 0 ? 'text-rose font-bold' : ''}>
                      {t.arrears > 0 ? `KES ${t.arrears.toLocaleString()}` : 'KES 0'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section: Operating Expenses Breakdown */}
          <div className="report-section" style={{ marginTop: '24px' }}>
            <h3>2. Operating Overhead Disbursements</h3>
            <table className="receipt-table" style={{ marginTop: '10px' }}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Vendor / Payee</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th className="text-right">Amount (KES)</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map(exp => (
                  <tr key={exp.id}>
                    <td>{exp.date}</td>
                    <td><strong>{exp.payee}</strong></td>
                    <td>{exp.category}</td>
                    <td>{exp.description}</td>
                    <td className="text-right text-rose">- KES {exp.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="receipt-total-row">
                  <td colSpan="4">TOTAL OPERATING EXPENSES</td>
                  <td className="text-right total-val text-rose">
                    KES {stats.totalOperatingExpenses.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Signatures */}
          <div className="report-signatures-row" style={{ marginTop: '40px' }}>
            <div className="sig-block">
              <div className="sig-line"></div>
              <strong>Patrick Kariuki</strong>
              <div className="font-xs text-muted">Certified Property Manager, AB Apartments Kilimani</div>
            </div>

            <div className="sig-block">
              <div className="sig-line"></div>
              <strong>Property Owner / Investor</strong>
              <div className="font-xs text-muted">Audited & Approved</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
