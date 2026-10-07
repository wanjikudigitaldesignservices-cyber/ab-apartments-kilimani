import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BellRing,
  Send,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  Users,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export function NoticesView() {
  const {
    notices,
    sendNotice,
    propertyInfo,
    addToast
  } = useApp();

  const [target, setTarget] = useState('All Residents');
  const [priority, setPriority] = useState('Important');
  const [channel, setChannel] = useState('SMS & Tenant Portal');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const templates = [
    {
      title: "Monthly Rent Due Reminder",
      target: "All Residents",
      priority: "Standard",
      text: `Dear Resident of ${propertyInfo?.name || "our estate"}, kindly note that rent and service charges for the current billing cycle are due on or before 5th of the month via Safaricom Paybill ${propertyInfo?.billing?.mpesaPaybill || "Paybill"}, Account Number: [Your Unit No]. Thank you for your partnership.`
    },
    {
      title: "Rent Overdue Notice (5% Late Fee)",
      target: "Overdue Accounts",
      priority: "Urgent",
      text: `Urgent Notice: Your rent and utilities for Unit [Unit No] at ${propertyInfo?.name || "our estate"} remain outstanding past the 5th due date. A 5% late penalty has been applied to your ledger. Please settle immediately via Paybill ${propertyInfo?.billing?.mpesaPaybill || "Paybill"} to prevent utility disruption.`
    },
    {
      title: "Overhead Water Tank Cleaning Notice",
      target: "All Residents",
      priority: "Important",
      text: `Dear Residents, Davis & Shirtliff technicians will carry out scheduled sanitation of overhead reserve tanks this Saturday from 9:00 AM to 1:00 PM. Booster pumps will switch to auxiliary borehole supply. Tap water flow will remain uninterrupted.`
    },
    {
      title: "Rooftop Heated Pool & Gym Maintenance",
      target: "All Residents",
      priority: "Info",
      text: `Dear Residents, routine servicing of the rooftop infinity pool heat pumps will occur on Tuesday between 11:00 AM and 2:00 PM. The fitness gym remains open 24/7 with biometric badge access.`
    }
  ];

  const handleApplyTemplate = (tpl) => {
    setTitle(tpl.title);
    setTarget(tpl.target);
    setPriority(tpl.priority);
    setMessage(tpl.text);
    addToast("Template Applied", `Loaded "${tpl.title}" template.`, "info");
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!title || !message) {
      alert("Please provide both a title and message body");
      return;
    }

    sendNotice({
      title,
      target,
      priority,
      channel,
      message
    });

    setTitle('');
    setMessage('');
  };

  return (
    <div className="notices-view-container animate-fade-in">
      {/* Header */}
      <div className="view-header-bar glass-card">
        <div>
          <h2>Tenant Notices & Safaricom SMS Broadcast Center</h2>
          <p className="text-muted">
            Instant bulk SMS dispatches and digital resident board announcements
          </p>
        </div>
      </div>

      {/* 2-Column: Composer & Live Phone Preview */}
      <div className="notices-grid-2col">
        {/* Composer Form */}
        <div className="composer-card glass-card">
          <div className="section-header">
            <div className="title-with-badge">
              <MessageSquare size={18} className="text-emerald" />
              <h3>Compose Resident Broadcast</h3>
            </div>
            <span className="badge badge-mpesa">SMS Gateway Active</span>
          </div>

          {/* Quick Templates Selector */}
          <div className="templates-pills-row">
            <span className="font-xs text-muted">Quick Templates:</span>
            {templates.map((tpl, i) => (
              <button
                key={i}
                type="button"
                className="template-pill-btn"
                onClick={() => handleApplyTemplate(tpl)}
              >
                {tpl.title}
              </button>
            ))}
          </div>

          <form onSubmit={handleSend} className="composer-form">
            <div className="form-grid-2col">
              <div className="form-group">
                <label>Target Audience</label>
                <select value={target} onChange={(e) => setTarget(e.target.value)}>
                  <option value="All Residents">All Residents (48 Units)</option>
                  <option value="Block A (Sunburst Wing)">Block A (Sunburst Wing Only)</option>
                  <option value="Block B (Jacaranda Wing)">Block B (Jacaranda Wing Only)</option>
                  <option value="Overdue Accounts">Overdue Accounts (Late Rent)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Dispatch Priority</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="Standard">Standard Notice</option>
                  <option value="Important">Important Estate Notice</option>
                  <option value="Urgent">Urgent / Emergency Alert</option>
                  <option value="Info">General Estate Info</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Broadcast Title / Header</label>
              <input
                type="text"
                placeholder="e.g. Monthly Rent Due Reminder (October 2026)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>SMS / Announcement Body</label>
              <textarea
                rows="4"
                placeholder="Write message text or select a template above..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
              <div className="char-count font-xs text-muted">
                {message.length} characters • ~{Math.ceil(message.length / 160) || 1} SMS unit(s)
              </div>
            </div>

            <button type="submit" className="btn-primary full-width">
              <Send size={16} />
              <span>Dispatch SMS & Publish to Resident Portal</span>
            </button>
          </form>
        </div>

        {/* Live Phone SMS Preview */}
        <div className="sms-preview-device glass-card">
          <div className="phone-screen-container">
            <div className="device-header">
              <span>Safaricom 5G</span>
              <span>100%</span>
            </div>

            <div className="sms-sender-bar">
              <div className="sender-avatar">AB</div>
              <div>
                <strong>AB_APTS</strong>
                <div className="font-xs text-muted">Official Estate Shortcode</div>
              </div>
            </div>

            <div className="device-bubble-container">
              <div className="sms-chat-bubble animate-fade-in">
                <div className="bubble-header">{title || `${(propertyInfo?.name || "ESTATE").toUpperCase()} NOTICE`}</div>
                <p className="bubble-body">
                  {message || `Dear Resident, this is a live preview of how broadcast messages appear on tenant mobile devices across ${propertyInfo?.name || "our property"}.`}
                </p>
                <div className="bubble-time">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • SMS
                </div>
              </div>
            </div>

            <div className="device-input-bar">
              <span>Text Message (Reply disabled)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Broadcast History Table */}
      <div className="history-section glass-card" style={{ marginTop: '24px' }}>
        <div className="section-header">
          <h3>Broadcast History & Published Notices</h3>
          <span className="badge badge-paid">{notices.length} Published</span>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Target</th>
                <th>Priority</th>
                <th>Title</th>
                <th>Channel</th>
                <th>Message Content</th>
              </tr>
            </thead>
            <tbody>
              {notices.map(n => (
                <tr key={n.id}>
                  <td className="text-muted">{n.date}</td>
                  <td>
                    <span className="badge badge-vacant">{n.target}</span>
                  </td>
                  <td>
                    <span className={`badge ${n.priority === 'Urgent' ? 'badge-overdue' : n.priority === 'Important' ? 'badge-maintenance' : 'badge-paid'}`}>
                      {n.priority}
                    </span>
                  </td>
                  <td>
                    <strong>{n.title}</strong>
                  </td>
                  <td className="font-xs text-emerald">{n.channel}</td>
                  <td className="text-muted text-sm">{n.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
