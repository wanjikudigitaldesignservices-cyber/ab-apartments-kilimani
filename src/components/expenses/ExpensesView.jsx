import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingDown,
  TrendingUp,
  Plus,
  Download,
  DollarSign,
  PieChart,
  Shield,
  Zap,
  Droplets,
  Trash2,
  Users,
  Search
} from 'lucide-react';

export function ExpensesView() {
  const {
    expenses,
    stats,
    setIsAddExpenseModalOpen,
    addToast
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExpenses = expenses.filter(exp => {
    if (categoryFilter !== 'all' && exp.category !== categoryFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        exp.description.toLowerCase().includes(q) ||
        exp.payee.toLowerCase().includes(q) ||
        exp.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const exportExpensesCSV = () => {
    const headers = ["ID", "Date", "Category", "Description", "Payee", "Amount (KES)", "Payment Method", "Reference"];
    const rows = filteredExpenses.map(e => [
      e.id,
      e.date,
      `"${e.category}"`,
      `"${e.description}"`,
      `"${e.payee}"`,
      e.amount,
      e.paymentMethod,
      e.reference
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encoded = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encoded;
    link.download = `AB_Apartments_Expenses_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast("Export Complete", "Operating expenses downloaded as CSV.", "success");
  };

  const categories = Array.from(new Set(expenses.map(e => e.category)));

  return (
    <div className="expenses-view-container animate-fade-in">
      {/* Header */}
      <div className="view-header-bar glass-card">
        <div>
          <h2>Operating Expenses & Net Operating Income (NOI)</h2>
          <p className="text-muted">
            Tracking estate operational overheads, contractor disbursements, and monthly property profitability
          </p>
        </div>

        <div className="header-actions-row">
          <button 
            className="btn-primary"
            onClick={() => setIsAddExpenseModalOpen(true)}
          >
            <Plus size={16} />
            <span>Log Operating Expense</span>
          </button>

          <button 
            className="btn-secondary"
            onClick={exportExpensesCSV}
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* P&L Financial Cards */}
      <div className="financial-mini-grid">
        <div className="mini-card glass-card">
          <span className="lbl">Gross Collections:</span>
          <strong className="val text-emerald">KES {stats.totalCollected.toLocaleString()}</strong>
          <span className="sub">Current Month Inflow</span>
        </div>
        <div className="mini-card glass-card">
          <span className="lbl">Operating Expenses (OPEX):</span>
          <strong className="val text-rose">KES {stats.totalOperatingExpenses.toLocaleString()}</strong>
          <span className="sub">
            {stats.totalCollected > 0 ? ((stats.totalOperatingExpenses / stats.totalCollected) * 100).toFixed(1) : 0}% of Gross Inflow
          </span>
        </div>
        <div className="mini-card glass-card">
          <span className="lbl">Net Operating Income (NOI):</span>
          <strong className="val text-gold">KES {stats.netOperatingIncome.toLocaleString()}</strong>
          <span className="sub">Owner's Distributable Margin</span>
        </div>
      </div>

      {/* Filter Strip */}
      <div className="filters-strip glass-card">
        <div className="filter-group">
          <span className="filter-label">Expense Category:</span>
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories ({expenses.length})</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="navbar-search" style={{ width: '320px' }}>
          <Search size={15} className="search-icon" />
          <input
            type="text"
            placeholder="Search payee, description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Expenses Table */}
      <div className="table-responsive glass-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Expense Ref</th>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Payee Vendor</th>
              <th>Payment Channel</th>
              <th className="text-right">Amount (KES)</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map(exp => (
              <tr key={exp.id}>
                <td>
                  <code className="code-ref">{exp.id}</code>
                </td>
                <td className="text-muted">{exp.date}</td>
                <td>
                  <span className="badge badge-vacant">{exp.category}</span>
                </td>
                <td>
                  <strong>{exp.description}</strong>
                </td>
                <td>{exp.payee}</td>
                <td>
                  <span className="badge badge-mpesa font-xs">
                    {exp.paymentMethod.replace('_', ' ').toUpperCase()}
                  </span>
                </td>
                <td className="text-right font-bold text-rose">
                  - KES {exp.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="receipt-total-row">
              <td colSpan="6">TOTAL OPERATING DISBURSEMENTS</td>
              <td className="text-right total-val text-rose">
                KES {filteredExpenses.reduce((s, e) => s + (e.amount || 0), 0).toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
