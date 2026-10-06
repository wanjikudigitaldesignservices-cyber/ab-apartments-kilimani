import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  Receipt,
  Smartphone,
  Wrench,
  BellRing,
  PhoneCall,
  Printer,
  CheckCircle2,
  AlertCircle,
  Plus,
  Send,
  Building2,
  Shield,
  Sparkles,
  Zap,
  Droplets,
  Car
} from 'lucide-react';

export function TenantPortalView() {
  const {
    currentResident,
    currentResidentUnit,
    currentResidentInvoices,
    currentResidentPayments,
    currentResidentTickets,
    notices,
    propertyInfo,
    launchMpesaStkPush,
    setSelectedReceipt,
    addMaintenanceTicket,
    addToast
  } = useApp();

  // Maintenance form state
  const [ticketCategory, setTicketCategory] = useState("Plumbing");
  const [ticketPriority, setTicketPriority] = useState("Medium");
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketDesc, setTicketDesc] = useState("");

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!ticketTitle || !ticketDesc) {
      alert("Please provide an issue title and description");
      return;
    }

    addMaintenanceTicket({
      unitId: currentResidentUnit?.id || "A302",
      reportedBy: currentResident?.name || "Resident",
      category: ticketCategory,
      priority: ticketPriority,
      title: ticketTitle,
      description: ticketDesc,
      assignedFundi: "Assigned by Management",
      fundiPhone: propertyInfo.contacts.caretakerPhone,
      estimatedCost: 0
    });

    setTicketTitle("");
    setTicketDesc("");
  };

  const latestInvoice = currentResidentInvoices[0];
  const isPaid = latestInvoice?.status === 'paid';

  return (
    <div className="tenant-portal-container animate-fade-in">
      {/* Resident Welcome Hero */}
      <div className="portal-hero glass-card">
        <div className="portal-hero-text">
          <div className="portal-badge">
            <span className="pulse-dot"></span>
            <span>Resident Self-Service Dashboard</span>
          </div>
          <h2>Jambo, {currentResident?.name || "Resident"}!</h2>
          <p className="portal-sub">
            Welcome to your resident suite for <strong>Unit {currentResidentUnit?.id}</strong> ({currentResidentUnit?.block}) • {currentResidentUnit?.type}
          </p>

          <div className="portal-unit-tags">
            <span className="badge badge-paid">Floor {currentResidentUnit?.floor}</span>
            <span className="badge badge-vacant">{currentResidentUnit?.sqm} m² Living Space</span>
            <span className="badge badge-occupied"><Car size={12} /> Plate: {currentResident?.vehiclePlate || 'KDF 219Q'}</span>
          </div>
        </div>

        <div className="portal-hero-status">
          <div className="account-status-card glass-card">
            <span className="lbl">October 2026 Status:</span>
            {isPaid ? (
              <div className="status-paid-box">
                <CheckCircle2 size={24} className="text-emerald" />
                <div>
                  <strong className="text-emerald">Rent Settled</strong>
                  <div className="font-xs text-muted">Zero balance on account</div>
                </div>
              </div>
            ) : (
              <div className="status-due-box">
                <AlertCircle size={24} className="text-rose" />
                <div>
                  <strong className="text-rose">KES {latestInvoice?.balance.toLocaleString()} Due</strong>
                  <div className="font-xs text-muted">Due by 5th October</div>
                </div>
              </div>
            )}

            {!isPaid && latestInvoice && (
              <button 
                className="btn-mpesa btn-sm full-width"
                style={{ marginTop: '12px' }}
                onClick={() => launchMpesaStkPush({
                  phone: currentResident?.phone,
                  unitId: currentResidentUnit?.id,
                  amount: latestInvoice.balance,
                  invoiceId: latestInvoice.id,
                  tenantName: currentResident?.name
                })}
              >
                <Smartphone size={16} />
                <span>Pay Rent via M-Pesa STK Push</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Billing Breakdown & Raise Ticket */}
      <div className="portal-grid-2col">
        {/* Left Column: Monthly Bill Breakdown */}
        <div className="portal-section glass-card">
          <div className="section-header">
            <div className="title-with-badge">
              <Receipt size={18} className="text-emerald" />
              <h3>Current Monthly Statement (October 2026)</h3>
            </div>
            <span className={`badge ${isPaid ? 'badge-paid' : 'badge-overdue'}`}>
              {latestInvoice?.status.toUpperCase()}
            </span>
          </div>

          {latestInvoice && (
            <div className="statement-breakdown-card">
              <div className="breakdown-item">
                <span>Base Apartment Rent</span>
                <strong>KES {latestInvoice.baseRent.toLocaleString()}</strong>
              </div>
              <div className="breakdown-item">
                <span>Estate Service Charge (Gym, Pool, Elevators)</span>
                <strong>KES {latestInvoice.serviceCharge.toLocaleString()}</strong>
              </div>
              <div className="breakdown-item">
                <span>Water Consumption ({latestInvoice.waterUnits} m³ @ KES 160)</span>
                <strong>KES {latestInvoice.waterAmount.toLocaleString()}</strong>
              </div>
              <div className="breakdown-item">
                <span>Garbage & Sanitations Collection</span>
                <strong>KES {latestInvoice.garbageFee.toLocaleString()}</strong>
              </div>

              {latestInvoice.latePenalty > 0 && (
                <div className="breakdown-item text-rose">
                  <span>Late Assessment Fee (5%)</span>
                  <strong>+ KES {latestInvoice.latePenalty.toLocaleString()}</strong>
                </div>
              )}

              <div className="breakdown-total">
                <span>TOTAL BILLED:</span>
                <strong className={isPaid ? 'text-emerald' : 'text-rose'}>
                  KES {latestInvoice.totalAmount.toLocaleString()}
                </strong>
              </div>

              <div className="payment-help-box">
                <span className="font-xs text-muted">
                  Safaricom Paybill: <strong>{propertyInfo.billing.mpesaPaybill}</strong> • Account: <strong>{currentResidentUnit?.id}</strong>
                </span>
              </div>
            </div>
          )}

          {/* Past Payment Receipts for this resident */}
          <div className="resident-receipts-block" style={{ marginTop: '20px' }}>
            <h4>Your Verified Payment Receipts</h4>
            <div className="receipts-list">
              {currentResidentPayments.map(p => (
                <div key={p.id} className="resident-receipt-item glass-card">
                  <div>
                    <strong>{p.receiptNumber}</strong>
                    <div className="font-xs text-muted">{p.date} • Ref: {p.reference}</div>
                  </div>
                  <div className="receipt-right">
                    <strong className="text-emerald">KES {p.amount.toLocaleString()}</strong>
                    <button 
                      className="btn-secondary btn-xs"
                      onClick={() => setSelectedReceipt(p)}
                    >
                      <Printer size={12} />
                      <span>Receipt</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Raise Maintenance Ticket */}
        <div className="portal-section glass-card">
          <div className="section-header">
            <div className="title-with-badge">
              <Wrench size={18} className="text-blue" />
              <h3>Report Maintenance or Repair Issue</h3>
            </div>
            <span className="badge badge-vacant">Fast Caretaker Dispatch</span>
          </div>

          <form onSubmit={handleCreateTicket} className="portal-ticket-form">
            <div className="form-grid-2col">
              <div className="form-group">
                <label>Issue Category</label>
                <select value={ticketCategory} onChange={(e) => setTicketCategory(e.target.value)}>
                  <option value="Plumbing">Plumbing (Pipes, Taps, Showers)</option>
                  <option value="Electrical">Electrical (Switches, Lighting, Breaker)</option>
                  <option value="Appliances">Kitchen Cooker & Extractor</option>
                  <option value="Carpentry">Doors, Locks & Wardrobes</option>
                  <option value="Internet/TV">Fiber Internet & Intercom</option>
                </select>
              </div>

              <div className="form-group">
                <label>Urgency Level</label>
                <select value={ticketPriority} onChange={(e) => setTicketPriority(e.target.value)}>
                  <option value="Low">Low (Convenience)</option>
                  <option value="Medium">Medium (Normal)</option>
                  <option value="High">High (Affects Daily Use)</option>
                  <option value="Urgent">Urgent (Leak / Electrical Spark)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Brief Issue Summary</label>
              <input
                type="text"
                placeholder="e.g. Water heater in guest bathroom not warming up"
                value={ticketTitle}
                onChange={(e) => setTicketTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Detailed Description</label>
              <textarea
                rows="3"
                placeholder="Please describe what you observed, what time fundi can access the unit, etc."
                value={ticketDesc}
                onChange={(e) => setTicketDesc(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-primary full-width">
              <Send size={15} />
              <span>Submit Ticket to Caretaker Francis</span>
            </button>
          </form>

          {/* Active tickets for this resident */}
          <div className="resident-tickets-list" style={{ marginTop: '20px' }}>
            <h4>Your Active Requests</h4>
            {currentResidentTickets.length === 0 ? (
              <p className="font-xs text-muted">No pending issues reported.</p>
            ) : (
              currentResidentTickets.map(t => (
                <div key={t.id} className="resident-ticket-item glass-card">
                  <div>
                    <strong>{t.title}</strong>
                    <div className="font-xs text-muted">Reported: {t.reportedDate}</div>
                  </div>
                  <span className={`badge ${t.status === 'Resolved' ? 'badge-paid' : 'badge-maintenance'}`}>
                    {t.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Estate Directory & Amenities Information */}
      <div className="portal-contacts-grid glass-card" style={{ marginTop: '24px' }}>
        <div className="section-header">
          <h3>Kilimani Building Contacts & Resident Guidelines</h3>
          <span className="badge badge-mpesa">24/7 Gate Active</span>
        </div>

        <div className="contacts-cards-row">
          <div className="contact-card glass-card">
            <h4>Resident Caretaker</h4>
            <strong className="contact-name">{propertyInfo.contacts.caretaker}</strong>
            <p className="font-xs text-muted">Handles daily unit repairs, meter keys, parcel drop-off</p>
            <a href={`tel:${propertyInfo.contacts.caretakerPhone}`} className="contact-btn">
              <PhoneCall size={14} /> {propertyInfo.contacts.caretakerPhone}
            </a>
          </div>

          <div className="contact-card glass-card">
            <h4>Main Security Gate</h4>
            <strong className="contact-name">Securex 24/7 Control</strong>
            <p className="font-xs text-muted">Biometric access, visitor parking clearance, emergency gate</p>
            <a href={`tel:${propertyInfo.contacts.securityDesk}`} className="contact-btn">
              <PhoneCall size={14} /> {propertyInfo.contacts.securityDesk}
            </a>
          </div>

          <div className="contact-card glass-card">
            <h4>Management Office</h4>
            <strong className="contact-name">{propertyInfo.contacts.propertyManager}</strong>
            <p className="font-xs text-muted">Lease renewals, deposits, formal correspondence</p>
            <a href={`tel:${propertyInfo.contacts.managerPhone}`} className="contact-btn">
              <PhoneCall size={14} /> {propertyInfo.contacts.managerPhone}
            </a>
          </div>

          <div className="contact-card glass-card">
            <h4>Kilimani Police Station</h4>
            <strong className="contact-name">Emergency Dispatch</strong>
            <p className="font-xs text-muted">Direct rapid response patrol</p>
            <span className="contact-btn text-rose font-semibold">
              <PhoneCall size={14} /> {propertyInfo.contacts.policeKilimani}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
