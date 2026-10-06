import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Building2,
  Users,
  Receipt,
  CreditCard,
  Wrench,
  TrendingDown,
  BellRing,
  FileSpreadsheet,
  PhoneCall,
  Home,
  CheckCircle2,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';

export function Sidebar() {
  const {
    activeTab,
    setActiveTab,
    userRole,
    stats,
    propertyInfo,
    currentResident,
    currentResidentUnit,
    setIsReportModalOpen
  } = useApp();

  const adminNavItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'units', label: 'Units & Floor Map', icon: Building2, badge: `${stats.occupiedUnits}/${stats.totalUnitsCount}` },
    { id: 'tenants', label: 'Tenants & Leases', icon: Users, badge: stats.occupiedUnits },
    { id: 'billing', label: 'Rent Invoicing', icon: Receipt },
    { id: 'payments', label: 'Payments & M-Pesa', icon: CreditCard, badge: 'Paybill' },
    { id: 'maintenance', label: 'Maintenance Tickets', icon: Wrench, badge: stats.openTickets > 0 ? `${stats.openTickets}` : null, badgeAlert: stats.urgentTickets > 0 },
    { id: 'expenses', label: 'Operating Expenses', icon: TrendingDown },
    { id: 'notices', label: 'SMS & Announcements', icon: BellRing }
  ];

  const residentNavItems = [
    { id: 'resident-overview', label: 'My Apartment Unit', icon: Home },
    { id: 'resident-billing', label: 'Rent & Statements', icon: Receipt },
    { id: 'resident-maintenance', label: 'Report Issue', icon: Wrench },
    { id: 'resident-notices', label: 'Building Notices', icon: BellRing },
    { id: 'resident-contacts', label: 'Contacts & Amenities', icon: PhoneCall }
  ];

  const navItems = userRole === 'admin' ? adminNavItems : residentNavItems;

  return (
    <aside className="sidebar-container">
      {/* Role Context Header */}
      <div className="sidebar-role-badge">
        {userRole === 'admin' ? (
          <div className="role-chip admin">
            <span className="dot"></span>
            <span>Management Console</span>
          </div>
        ) : (
          <div className="role-chip resident">
            <span className="dot"></span>
            <span>Resident Portal: Unit {currentResidentUnit?.id || 'A302'}</span>
          </div>
        )}
      </div>

      {/* Navigation List */}
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon size={19} className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                  {item.badge && (
                    <span className={`nav-badge ${item.badgeAlert ? 'alert' : ''}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {userRole === 'admin' && (
          <div className="sidebar-extra-section">
            <button 
              className="nav-link report-trigger-btn"
              onClick={() => setIsReportModalOpen(true)}
            >
              <FileSpreadsheet size={19} className="nav-icon" />
              <span className="nav-label">Executive Reports</span>
            </button>
          </div>
        )}
      </nav>

      {/* Property Information Card in Footer */}
      <div className="sidebar-footer-card glass-card">
        <div className="footer-card-header">
          <span className="badge badge-mpesa">Paybill: {propertyInfo.billing.mpesaPaybill}</span>
        </div>
        <div className="footer-info-details">
          <div className="info-row">
            <span className="info-title">Account Ref:</span>
            <span className="info-val">Unit No (e.g. A302)</span>
          </div>
          <div className="info-row">
            <span className="info-title">Caretaker:</span>
            <span className="info-val">{propertyInfo.contacts.caretaker}</span>
          </div>
          <div className="info-row">
            <span className="info-title">Direct Line:</span>
            <span className="info-val">{propertyInfo.contacts.caretakerPhone}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
