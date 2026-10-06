import React from 'react';
import './App.css';
import { AppProvider, useApp } from './context/AppContext';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { ToastContainer } from './components/common/ToastContainer';
import { MpesaStkModal } from './components/common/MpesaStkModal';
import { ReceiptModal } from './components/common/ReceiptModal';
import { ReportsModal } from './components/reports/ReportsModal';
import { ActionModals } from './components/modals/ActionModals';

// Management Views
import { DashboardView } from './components/dashboard/DashboardView';
import { UnitsView } from './components/units/UnitsView';
import { TenantsView } from './components/tenants/TenantsView';
import { BillingView } from './components/billing/BillingView';
import { PaymentsView } from './components/payments/PaymentsView';
import { MaintenanceView } from './components/maintenance/MaintenanceView';
import { ExpensesView } from './components/expenses/ExpensesView';
import { NoticesView } from './components/notices/NoticesView';

// Resident Self-Service View
import { TenantPortalView } from './components/resident/TenantPortalView';

function AppContent() {
  const { activeTab, userRole } = useApp();

  const renderActiveView = () => {
    // If viewing in Resident Self-Service mode
    if (userRole === 'resident') {
      return <TenantPortalView />;
    }

    // Property Manager (Admin) mode
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'units':
        return <UnitsView />;
      case 'tenants':
        return <TenantsView />;
      case 'billing':
        return <BillingView />;
      case 'payments':
        return <PaymentsView />;
      case 'maintenance':
        return <MaintenanceView />;
      case 'expenses':
        return <ExpensesView />;
      case 'notices':
        return <NoticesView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area with Sidebar */}
      <div className="main-content-layout">
        <Sidebar />
        <main className="main-view-area">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Interactive Modals */}
      <MpesaStkModal />
      <ReceiptModal />
      <ReportsModal />
      <ActionModals />

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
