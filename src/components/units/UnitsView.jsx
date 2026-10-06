import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Plus,
  Filter,
  CheckCircle2,
  AlertCircle,
  Wrench,
  BookmarkCheck,
  Zap,
  Droplets,
  Maximize2,
  User,
  Edit,
  X,
  Phone,
  Calendar
} from 'lucide-react';

export function UnitsView() {
  const {
    units,
    tenants,
    addUnit,
    updateUnit,
    setIsAddUnitModalOpen,
    setSelectedTenant,
    searchQuery
  } = useApp();

  const [selectedBlock, setSelectedBlock] = useState('All'); // 'All' | 'Block A' | 'Block B'
  const [selectedFloor, setSelectedFloor] = useState('All'); // 'All' | 1 | 2 | 3 | 4 | 5 | 6
  const [selectedStatus, setSelectedStatus] = useState('All'); // 'All' | 'occupied' | 'vacant' | 'maintenance' | 'reserved'
  const [activeUnitModal, setActiveUnitModal] = useState(null);
  const [isEditingUnit, setIsEditingUnit] = useState(false);
  const [editForm, setEditForm] = useState(null);

  // Filter units
  const filteredUnits = units.filter(unit => {
    // Block filter
    if (selectedBlock !== 'All' && !unit.block.includes(selectedBlock)) return false;
    // Floor filter
    if (selectedFloor !== 'All' && unit.floor !== parseInt(selectedFloor)) return false;
    // Status filter
    if (selectedStatus !== 'All' && unit.status !== selectedStatus) return false;
    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const tenantMatch = tenants.find(t => t.unitId === unit.id && t.name.toLowerCase().includes(q));
      if (!unit.id.toLowerCase().includes(q) && !unit.type.toLowerCase().includes(q) && !tenantMatch) {
        return false;
      }
    }
    return true;
  });

  const handleOpenDetail = (unit) => {
    setActiveUnitModal(unit);
    setEditForm({ ...unit });
    setIsEditingUnit(false);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editForm) return;
    updateUnit(editForm.id, {
      type: editForm.type,
      baseRent: parseFloat(editForm.baseRent),
      serviceCharge: parseFloat(editForm.serviceCharge),
      status: editForm.status,
      kplcMeter: editForm.kplcMeter,
      waterMeter: editForm.waterMeter
    });
    setActiveUnitModal({ ...editForm });
    setIsEditingUnit(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'occupied':
        return <span className="badge badge-occupied">Occupied</span>;
      case 'vacant':
        return <span className="badge badge-vacant">Vacant</span>;
      case 'maintenance':
        return <span className="badge badge-maintenance">Under Maint</span>;
      case 'reserved':
        return <span className="badge badge-reserved">Reserved</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  return (
    <div className="units-view-container animate-fade-in">
      {/* View Header with Filters */}
      <div className="view-header-bar glass-card">
        <div>
          <h2>Units & Architectural Wing Matrix</h2>
          <p className="text-muted">
            Managing 48 executive suites across Sunburst Wing (Block A) and Jacaranda Wing (Block B)
          </p>
        </div>

        <button 
          className="btn-primary"
          onClick={() => setIsAddUnitModalOpen(true)}
        >
          <Plus size={16} />
          <span>Add Custom Unit</span>
        </button>
      </div>

      {/* Filter Control Tabs */}
      <div className="filters-strip glass-card">
        {/* Block Filter */}
        <div className="filter-group">
          <span className="filter-label">Wing:</span>
          <div className="pill-buttons">
            {['All', 'Block A', 'Block B'].map(block => (
              <button
                key={block}
                className={`pill-btn ${selectedBlock === block ? 'active' : ''}`}
                onClick={() => setSelectedBlock(block)}
              >
                {block === 'All' ? 'All Wings (48)' : block}
              </button>
            ))}
          </div>
        </div>

        {/* Floor Filter */}
        <div className="filter-group">
          <span className="filter-label">Floor:</span>
          <select 
            value={selectedFloor} 
            onChange={(e) => setSelectedFloor(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Floors (1 - 6)</option>
            {[1, 2, 3, 4, 5, 6].map(fl => (
              <option key={fl} value={fl}>Floor {fl}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="filter-group">
          <span className="filter-label">Status:</span>
          <div className="pill-buttons">
            {[
              { id: 'All', label: 'All Status' },
              { id: 'occupied', label: 'Occupied' },
              { id: 'vacant', label: 'Vacant' },
              { id: 'maintenance', label: 'Maintenance' },
              { id: 'reserved', label: 'Reserved' }
            ].map(item => (
              <button
                key={item.id}
                className={`pill-btn ${selectedStatus === item.id ? 'active' : ''}`}
                onClick={() => setSelectedStatus(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Units Grid Matrix */}
      <div className="units-matrix-grid">
        {filteredUnits.map(unit => {
          const tenant = tenants.find(t => t.unitId === unit.id);
          return (
            <div 
              key={unit.id} 
              className={`unit-matrix-card glass-card status-${unit.status}`}
              onClick={() => handleOpenDetail(unit)}
            >
              <div className="unit-card-header">
                <div className="unit-id-badge">
                  <strong>{unit.id}</strong>
                  <span className="unit-block-tag">{unit.block.includes('A') ? 'Wing A' : 'Wing B'} • Fl {unit.floor}</span>
                </div>
                {getStatusBadge(unit.status)}
              </div>

              <div className="unit-type-row">
                <span className="unit-type">{unit.type}</span>
                <span className="unit-sqm">{unit.sqm} m²</span>
              </div>

              {/* Price Details */}
              <div className="unit-financial-row">
                <div className="price-item">
                  <span className="lbl">Base Rent:</span>
                  <strong>KES {unit.baseRent.toLocaleString()}</strong>
                </div>
                <div className="price-item text-right">
                  <span className="lbl">Service:</span>
                  <span>KES {unit.serviceCharge.toLocaleString()}</span>
                </div>
              </div>

              {/* Tenant or Vacancy info */}
              <div className="unit-footer-info">
                {unit.status === 'occupied' && tenant ? (
                  <div className="tenant-inline">
                    <User size={13} className="text-emerald" />
                    <span className="tenant-name-truncate">{tenant.name}</span>
                  </div>
                ) : unit.status === 'vacant' ? (
                  <div className="vacancy-inline text-blue">
                    <span>Ready for Occupancy</span>
                  </div>
                ) : unit.status === 'maintenance' ? (
                  <div className="maint-inline text-gold">
                    <Wrench size={13} />
                    <span>Inspection in progress</span>
                  </div>
                ) : (
                  <div className="reserved-inline text-purple">
                    <BookmarkCheck size={13} />
                    <span>Deposit Pending</span>
                  </div>
                )}
              </div>

              {/* Meter Tags */}
              <div className="unit-meters-bar">
                <span title={`KPLC Meter: ${unit.kplcMeter}`}><Zap size={11} /> {unit.kplcMeter.slice(-5)}</span>
                <span title={`Water Meter: ${unit.waterMeter}`}><Droplets size={11} /> {unit.waterMeter.slice(-6)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Unit Detail Drawer / Modal */}
      {activeUnitModal && (
        <div className="modal-overlay">
          <div className="modal-content unit-detail-modal animate-fade-in">
            <div className="modal-header">
              <div className="header-brand">
                <Building2 size={24} className="text-emerald" />
                <div>
                  <h3>Unit {activeUnitModal.id} Details</h3>
                  <p className="text-muted">{activeUnitModal.block} • Floor {activeUnitModal.floor}</p>
                </div>
              </div>
              <button className="icon-btn" onClick={() => setActiveUnitModal(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {/* Unit Image & Highlights */}
              <div className="unit-modal-hero">
                <img 
                  src="/ab-interior.jpg" 
                  alt="Unit interior view" 
                  className="unit-modal-hero-img" 
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="unit-hero-tags">
                  <span className="badge badge-paid">Floor {activeUnitModal.floor} Executive</span>
                  <span className="badge badge-vacant">{activeUnitModal.sqm} Square Meters</span>
                </div>
              </div>

              {!isEditingUnit ? (
                <>
                  {/* Read-Only Spec Breakdown */}
                  <div className="unit-specs-grid">
                    <div className="spec-card">
                      <span className="lbl">Unit Type:</span>
                      <strong>{activeUnitModal.type}</strong>
                    </div>
                    <div className="spec-card">
                      <span className="lbl">Status:</span>
                      <div>{getStatusBadge(activeUnitModal.status)}</div>
                    </div>
                    <div className="spec-card">
                      <span className="lbl">Monthly Base Rent:</span>
                      <strong className="text-emerald">KES {activeUnitModal.baseRent.toLocaleString()}</strong>
                    </div>
                    <div className="spec-card">
                      <span className="lbl">Monthly Service Charge:</span>
                      <strong>KES {activeUnitModal.serviceCharge.toLocaleString()}</strong>
                    </div>
                    <div className="spec-card">
                      <span className="lbl">KPLC Token Meter:</span>
                      <code>{activeUnitModal.kplcMeter}</code>
                    </div>
                    <div className="spec-card">
                      <span className="lbl">Water Sub-Meter ID:</span>
                      <code>{activeUnitModal.waterMeter}</code>
                    </div>
                  </div>

                  {/* Current Tenant Profile if occupied */}
                  {activeUnitModal.status === 'occupied' && (
                    <div className="tenant-occupant-box glass-card">
                      <h4>Current Registered Resident</h4>
                      {(() => {
                        const occupant = tenants.find(t => t.unitId === activeUnitModal.id);
                        if (!occupant) return <p className="text-muted">No tenant linked.</p>;
                        return (
                          <div className="occupant-details">
                            <div className="occupant-main">
                              <strong>{occupant.name}</strong>
                              <span className="text-muted">{occupant.occupation}</span>
                              <div className="contact-row">
                                <span><Phone size={13} /> {occupant.phone}</span>
                                <span><Calendar size={13} /> Lease: {occupant.leaseStart} to {occupant.leaseEnd}</span>
                              </div>
                            </div>
                            <button 
                              className="btn-secondary btn-sm"
                              onClick={() => {
                                setSelectedTenant(occupant);
                                setActiveUnitModal(null);
                              }}
                            >
                              Open Tenant File →
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  <div className="modal-actions-bar">
                    <button 
                      className="btn-secondary"
                      onClick={() => setIsEditingUnit(true)}
                    >
                      <Edit size={16} />
                      <span>Edit Unit Specs</span>
                    </button>
                    <button className="btn-secondary" onClick={() => setActiveUnitModal(null)}>
                      Close
                    </button>
                  </div>
                </>
              ) : (
                /* Edit Unit Form */
                <form onSubmit={handleSaveEdit} className="unit-edit-form">
                  <div className="form-grid-2col">
                    <div className="form-group">
                      <label>Unit Layout Type</label>
                      <select 
                        value={editForm.type}
                        onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                      >
                        <option value="Studio">Studio (45 m²)</option>
                        <option value="1-Bedroom">1-Bedroom Urban (68 m²)</option>
                        <option value="2-Bedroom Deluxe">2-Bedroom Deluxe En-Suite (115 m²)</option>
                        <option value="3-Bedroom Penthouse">3-Bedroom Penthouse + DSQ (185 m²)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Occupancy Status</label>
                      <select 
                        value={editForm.status}
                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                      >
                        <option value="occupied">Occupied</option>
                        <option value="vacant">Vacant</option>
                        <option value="maintenance">Under Maintenance</option>
                        <option value="reserved">Reserved</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Monthly Base Rent (KES)</label>
                      <input 
                        type="number"
                        value={editForm.baseRent}
                        onChange={(e) => setEditForm({ ...editForm, baseRent: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Monthly Service Charge (KES)</label>
                      <input 
                        type="number"
                        value={editForm.serviceCharge}
                        onChange={(e) => setEditForm({ ...editForm, serviceCharge: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>KPLC Meter Number</label>
                      <input 
                        type="text"
                        value={editForm.kplcMeter}
                        onChange={(e) => setEditForm({ ...editForm, kplcMeter: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Water Sub-meter Number</label>
                      <input 
                        type="text"
                        value={editForm.waterMeter}
                        onChange={(e) => setEditForm({ ...editForm, waterMeter: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="modal-actions-bar">
                    <button type="submit" className="btn-primary">
                      Save Changes
                    </button>
                    <button 
                      type="button" 
                      className="btn-secondary"
                      onClick={() => setIsEditingUnit(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
