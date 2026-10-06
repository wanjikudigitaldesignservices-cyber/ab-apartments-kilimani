import React from 'react';
import { useApp } from '../../context/AppContext';
import { Printer, Download, X, Building2, CheckCircle2, ShieldCheck, QrCode } from 'lucide-react';

export function ReceiptModal() {
  const { selectedReceipt, setSelectedReceipt, propertyInfo } = useApp();

  if (!selectedReceipt) return null;

  const handlePrint = () => {
    window.print();
  };

  // Estimate breakdown from amount
  const baseRentEst = Math.round(selectedReceipt.amount * 0.85);
  const serviceChargeEst = Math.round(selectedReceipt.amount * 0.10);
  const waterEst = selectedReceipt.amount - baseRentEst - serviceChargeEst;

  return (
    <div className="modal-overlay">
      <div className="receipt-modal-container animate-fade-in">
        {/* Controls Bar */}
        <div className="receipt-modal-actions no-print">
          <div className="action-tag">
            <CheckCircle2 size={16} className="text-emerald" />
            <span>Official Digital Receipt</span>
          </div>
          <div className="action-btns">
            <button className="btn-primary btn-sm" onClick={handlePrint}>
              <Printer size={16} />
              <span>Print / Save as PDF</span>
            </button>
            <button className="icon-btn" onClick={() => setSelectedReceipt(null)}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Voucher Paper */}
        <div className="receipt-paper">
          {/* Header */}
          <div className="receipt-brand-header">
            <div className="receipt-brand-info">
              <div className="brand-crest">
                <Building2 size={32} />
              </div>
              <div>
                <h2>{propertyInfo.name.toUpperCase()}</h2>
                <p className="receipt-tagline">{propertyInfo.tagline}</p>
                <p className="receipt-address">{propertyInfo.address}</p>
                <p className="receipt-meta">KRA PIN: P051928490B | Reg: LR. 209/14820</p>
              </div>
            </div>
            <div className="receipt-no-box">
              <span className="badge badge-paid">PAYMENT CONFIRMED</span>
              <div className="receipt-serial">
                <span className="lbl">RECEIPT NO:</span>
                <strong>{selectedReceipt.receiptNumber}</strong>
              </div>
              <div className="receipt-date">
                <span className="lbl">DATE:</span>
                <span>{selectedReceipt.date}</span>
              </div>
            </div>
          </div>

          <div className="receipt-divider"></div>

          {/* Tenant & Transaction Summary */}
          <div className="receipt-parties-grid">
            <div className="party-card">
              <span className="party-title">RECEIVED FROM:</span>
              <strong className="party-name">{selectedReceipt.tenantName}</strong>
              <div className="party-row">
                <span>Apartment Unit:</span>
                <strong>Unit {selectedReceipt.unitId}</strong>
              </div>
              <div className="party-row">
                <span>Phone:</span>
                <span>{selectedReceipt.phoneNumber || "+254 7XX XXX XXX"}</span>
              </div>
            </div>

            <div className="party-card">
              <span className="party-title">TRANSACTION DETAILS:</span>
              <div className="party-row">
                <span>Payment Method:</span>
                <strong className="text-emerald">
                  {selectedReceipt.paymentMethod.replace('_', ' ').toUpperCase()}
                </strong>
              </div>
              <div className="party-row">
                <span>Reference Code:</span>
                <strong className="mono-text">{selectedReceipt.reference}</strong>
              </div>
              <div className="party-row">
                <span>Account Reference:</span>
                <span>Paybill {propertyInfo.billing.mpesaPaybill} (Acc: {selectedReceipt.unitId})</span>
              </div>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="receipt-table-wrapper">
            <table className="receipt-table">
              <thead>
                <tr>
                  <th>ITEM DESCRIPTION</th>
                  <th>PERIOD</th>
                  <th className="text-right">AMOUNT (KES)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Residential Unit Rent</strong>
                    <div className="sub-desc">Executive Apartment Unit {selectedReceipt.unitId}</div>
                  </td>
                  <td>Current Billing Cycle</td>
                  <td className="text-right">{baseRentEst.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Estate Service Charge & Amenities</strong>
                    <div className="sub-desc">Security, Rooftop Pool & Gym, Elevators, Cleaning</div>
                  </td>
                  <td>Standard Monthly</td>
                  <td className="text-right">{serviceChargeEst.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Utilities (Water Sub-metering & Waste)</strong>
                    <div className="sub-desc">Borehole & City Council sanitary collection</div>
                  </td>
                  <td>Metered</td>
                  <td className="text-right">{waterEst.toLocaleString()}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="receipt-total-row">
                  <td colSpan="2">TOTAL AMOUNT RECEIVED</td>
                  <td className="text-right total-val">
                    KES {selectedReceipt.amount.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Words & Digital Stamp */}
          <div className="receipt-footer-section">
            <div className="words-and-qr">
              <div className="qr-box">
                <QrCode size={56} className="qr-icon" />
                <span>Scan to Verify</span>
              </div>
              <div className="notes-box">
                <p className="note-title">TERMS & CONDITIONS</p>
                <p className="note-text">
                  This payment has been digitally reconciled with the property banking gateway. All rental charges are subject to the Kenyan Landlord and Tenant Act and tenancy agreement stipulations.
                </p>
              </div>
            </div>

            {/* Official Stamp */}
            <div className="official-stamp-container">
              <div className="official-stamp">
                <span className="stamp-line">AB APARTMENTS KILIMANI</span>
                <span className="stamp-status">★ RECEIVED & VERIFIED ★</span>
                <span className="stamp-date">{new Date().toLocaleDateString()}</span>
                <span className="stamp-auth">MANAGEMENT ACCOUNTS</span>
              </div>
              <div className="signature-area">
                <div className="signature-line"></div>
                <span>Authorized Signatory</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
