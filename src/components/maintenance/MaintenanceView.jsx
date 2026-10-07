import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wrench,
  Plus,
  Phone,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Filter,
  Check,
  X,
  DollarSign,
  UserCheck,
  Shield,
  Send
} from 'lucide-react';

export function MaintenanceView() {
  const {
    propertyInfo,
    maintenance,
    updateMaintenanceTicket,
    setIsAddMaintenanceModalOpen,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'open' | 'in_progress' | 'resolved'
  const [selectedTicketForEdit, setSelectedTicketForEdit] = useState(null);
  const [resolveCost, setResolveCost] = useState('');
  const [resolveNotes, setResolveNotes] = useState('');

  const filteredTickets = maintenance.filter(t => {
    if (activeTab === 'open') return t.status === 'Open';
    if (activeTab === 'in_progress') return t.status === 'In Progress';
    if (activeTab === 'resolved') return t.status === 'Resolved';
    return true;
  });

  const handleOpenResolve = (ticket) => {
    setSelectedTicketForEdit(ticket);
    setResolveCost(ticket.estimatedCost ? String(ticket.estimatedCost) : '');
    setResolveNotes(ticket.resolutionNotes || '');
  };

  const handleSaveResolve = (e) => {
    e.preventDefault();
    if (!selectedTicketForEdit) return;

    updateMaintenanceTicket(selectedTicketForEdit.id, {
      status: "Resolved",
      actualCost: parseFloat(resolveCost) || 0,
      resolvedDate: new Date().toISOString().split('T')[0],
      resolutionNotes: resolveNotes || "Repair verified and approved by management"
    });

    setSelectedTicketForEdit(null);
  };

  const handleUpdateStatus = (ticketId, nextStatus) => {
    updateMaintenanceTicket(ticketId, { status: nextStatus });
  };

  return (
    <div className="maintenance-view-container animate-fade-in">
      {/* Header */}
      <div className="view-header-bar glass-card">
        <div>
          <h2>Facilities Maintenance & Contractor Work Orders</h2>
          <p className="text-muted">
            Managing preventative and tenant-reported facility repairs across {propertyInfo?.name || "your estate"}
          </p>
        </div>

        <button 
          className="btn-primary"
          onClick={() => setIsAddMaintenanceModalOpen(true)}
        >
          <Plus size={16} />
          <span>Log Work Order</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="filters-strip glass-card">
        <div className="filter-group">
          <span className="filter-label">Work Order Status:</span>
          <div className="pill-buttons">
            <button
              className={`pill-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Tickets ({maintenance.length})
            </button>
            <button
              className={`pill-btn ${activeTab === 'open' ? 'active' : ''}`}
              onClick={() => setActiveTab('open')}
            >
              Open ({maintenance.filter(t => t.status === 'Open').length})
            </button>
            <button
              className={`pill-btn ${activeTab === 'in_progress' ? 'active' : ''}`}
              onClick={() => setActiveTab('in_progress')}
            >
              In Progress ({maintenance.filter(t => t.status === 'In Progress').length})
            </button>
            <button
              className={`pill-btn ${activeTab === 'resolved' ? 'active' : ''}`}
              onClick={() => setActiveTab('resolved')}
            >
              Resolved ({maintenance.filter(t => t.status === 'Resolved').length})
            </button>
          </div>
        </div>
      </div>

      {/* Tickets Grid / List */}
      <div className="tickets-grid">
        {filteredTickets.map(ticket => {
          const isUrgent = ticket.priority === 'Urgent';
          const isResolved = ticket.status === 'Resolved';

          return (
            <div key={ticket.id} className={`ticket-card glass-card ${isUrgent ? 'border-urgent' : ''}`}>
              <div className="ticket-card-header">
                <div className="ticket-badge-group">
                  <span className="ticket-id-tag">{ticket.ticketNo}</span>
                  <span className="badge badge-vacant">{ticket.category}</span>
                </div>
                <span className={`badge ${isUrgent ? 'badge-overdue' : ticket.priority === 'High' ? 'badge-maintenance' : 'badge-paid'}`}>
                  {ticket.priority} Priority
                </span>
              </div>

              <h4 className="ticket-title">{ticket.title}</h4>
              <p className="ticket-desc">{ticket.description}</p>

              <div className="ticket-meta-grid">
                <div className="meta-box">
                  <span className="lbl">Location / Unit:</span>
                  <strong>Unit {ticket.unitId}</strong>
                </div>
                <div className="meta-box">
                  <span className="lbl">Reported By:</span>
                  <span>{ticket.reportedBy}</span>
                </div>
                <div className="meta-box">
                  <span className="lbl">Assigned Fundi / Contractor:</span>
                  <div className="contractor-val">
                    <strong>{ticket.assignedFundi || 'Unassigned'}</strong>
                    {ticket.fundiPhone && (
                      <a href={`tel:${ticket.fundiPhone}`} className="phone-link font-xs">
                        <Phone size={11} /> {ticket.fundiPhone}
                      </a>
                    )}
                  </div>
                </div>
                <div className="meta-box">
                  <span className="lbl">Cost Estimate / Actual:</span>
                  <span className="font-semibold text-emerald">
                    {ticket.actualCost ? `KES ${ticket.actualCost.toLocaleString()} (Paid)` : `Est: KES ${ticket.estimatedCost?.toLocaleString() || 0}`}
                  </span>
                </div>
              </div>

              {ticket.resolutionNotes && (
                <div className="resolution-notes-box">
                  <CheckCircle2 size={13} className="text-emerald" />
                  <span>{ticket.resolutionNotes}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="ticket-footer-actions">
                <div className="status-indicator">
                  <span className={`badge ${isResolved ? 'badge-paid' : ticket.status === 'In Progress' ? 'badge-maintenance' : 'badge-vacant'}`}>
                    {ticket.status}
                  </span>
                </div>

                <div className="action-buttons-group">
                  {ticket.status === 'Open' && (
                    <button
                      className="btn-secondary btn-xs"
                      onClick={() => handleUpdateStatus(ticket.id, 'In Progress')}
                    >
                      Assign Fundi →
                    </button>
                  )}

                  {!isResolved && (
                    <button
                      className="btn-primary btn-xs"
                      onClick={() => handleOpenResolve(ticket)}
                    >
                      <Check size={13} />
                      <span>Resolve & Log Cost</span>
                    </button>
                  )}

                  <button
                    className="btn-secondary btn-xs"
                    onClick={() => addToast("SMS Sent", `Status notification dispatched to ${ticket.reportedBy}`, "info")}
                  >
                    <Send size={11} />
                    <span>Notify Resident</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resolve Ticket Modal with Cost Linking */}
      {selectedTicketForEdit && (
        <div className="modal-overlay">
          <div className="modal-content ticket-resolve-modal animate-fade-in">
            <div className="modal-header">
              <div className="header-brand">
                <CheckCircle2 size={24} className="text-emerald" />
                <h3>Resolve Work Order: {selectedTicketForEdit.ticketNo}</h3>
              </div>
              <button className="icon-btn" onClick={() => setSelectedTicketForEdit(null)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveResolve} className="modal-body">
              <p className="text-muted">
                Resolving this ticket will record completion notes and automatically log the actual contractor labor & materials cost into the Property Operating Expenses ledger.
              </p>

              <div className="form-group" style={{ marginTop: '16px' }}>
                <label>Actual Repair Cost Paid to Contractor (KES)</label>
                <input
                  type="number"
                  value={resolveCost}
                  onChange={(e) => setResolveCost(e.target.value)}
                  placeholder="e.g. 4500"
                  required
                />
              </div>

              <div className="form-group">
                <label>Resolution Notes / Work Performed</label>
                <textarea
                  rows="3"
                  value={resolveNotes}
                  onChange={(e) => setResolveNotes(e.target.value)}
                  placeholder="Explain what Fundi repaired (e.g. replaced thermostatic cartridge and sealed pipe fitting)"
                  required
                ></textarea>
              </div>

              <div className="modal-actions-bar">
                <button type="submit" className="btn-primary">
                  Confirm Resolution & Log Expense
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setSelectedTicketForEdit(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
