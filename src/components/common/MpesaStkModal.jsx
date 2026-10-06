import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Smartphone, CheckCircle2, Shield, X, ArrowRight, Loader2, Sparkles } from 'lucide-react';

export function MpesaStkModal() {
  const {
    isStkModalOpen,
    setIsStkModalOpen,
    stkPayload,
    propertyInfo,
    recordPayment,
    setSelectedReceipt
  } = useApp();

  const [pin, setPin] = useState("");
  const [stage, setStage] = useState("prompt"); // 'prompt' | 'processing' | 'success'
  const [txCode, setTxCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [unitId, setUnitId] = useState("");
  const [tenantName, setTenantName] = useState("");

  useEffect(() => {
    if (stkPayload) {
      setPhoneNumber(stkPayload.phone || "+254 722 341 890");
      setAmount(stkPayload.amount || 86420);
      setUnitId(stkPayload.unitId || "A302");
      setTenantName(stkPayload.tenantName || "Resident");
      setPin("");
      setStage("prompt");
    }
  }, [stkPayload, isStkModalOpen]);

  if (!isStkModalOpen) return null;

  const handleKeyPress = (num) => {
    if (pin.length < 4) {
      setPin(prev => prev + num);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleSendStk = () => {
    if (pin.length < 4) {
      alert("Please enter a 4-digit M-Pesa PIN (e.g. 1234)");
      return;
    }

    setStage("processing");

    // Realistic Safaricom Daraja API latency
    setTimeout(() => {
      // Generate realistic Safaricom transaction reference
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let code = "SLK";
      for (let i = 0; i < 7; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setTxCode(code);

      // Record payment into the system
      const newPayment = recordPayment({
        invoiceId: stkPayload?.invoiceId,
        unitId,
        tenantId: stkPayload?.tenantId,
        tenantName,
        amount: parseFloat(amount),
        paymentMethod: "mpesa_stk",
        reference: code,
        phoneNumber,
        description: `M-Pesa STK Express Checkout for Unit ${unitId} (Paybill ${propertyInfo.billing.mpesaPaybill})`
      });

      setStage("success");
    }, 1800);
  };

  const handleClose = () => {
    setIsStkModalOpen(false);
    setStage("prompt");
    setPin("");
  };

  const handleViewReceipt = () => {
    handleClose();
    // Open the receipt modal with newly created payment
    const mockPayment = {
      id: "PAY-" + Math.floor(1000 + Math.random() * 9000),
      receiptNumber: "AB-RCPT-2026-" + Math.floor(1000 + Math.random() * 9000),
      invoiceId: stkPayload?.invoiceId || `INV-${unitId}`,
      unitId,
      tenantId: stkPayload?.tenantId,
      tenantName,
      amount: parseFloat(amount),
      paymentMethod: "mpesa_stk",
      reference: txCode,
      phoneNumber,
      date: new Date().toLocaleString(),
      status: "Verified",
      description: `M-Pesa Express Checkout for Unit ${unitId}`
    };
    setSelectedReceipt(mockPayment);
  };

  return (
    <div className="modal-overlay">
      <div className="stk-phone-frame animate-fade-in">
        {/* Top Phone Notch / Speaker */}
        <div className="phone-notch">
          <div className="speaker"></div>
          <div className="camera"></div>
        </div>

        {/* Modal Close Icon */}
        <button className="phone-close-btn" onClick={handleClose}>
          <X size={18} />
        </button>

        {/* Phone Screen Body */}
        <div className="phone-screen">
          {/* Top Status Bar */}
          <div className="phone-status-bar">
            <span>Safaricom 5G</span>
            <span>SIM 1</span>
            <span>100% 🔋</span>
          </div>

          {/* STK Dialog Container */}
          <div className="stk-dialog-card">
            <div className="stk-header">
              <div className="mpesa-logo-badge">
                <span className="mpesa-text">M-PESA</span>
              </div>
              <span className="stk-service-title">Daraja Instant STK Push</span>
            </div>

            {stage === 'prompt' && (
              <div className="stk-body">
                <div className="stk-details-box">
                  <div className="stk-row">
                    <span className="label">Paybill:</span>
                    <strong className="val">{propertyInfo.billing.mpesaPaybill}</strong>
                  </div>
                  <div className="stk-row">
                    <span className="label">Account / Unit:</span>
                    <strong className="val">{unitId}</strong>
                  </div>
                  <div className="stk-row">
                    <span className="label">Merchant:</span>
                    <strong className="val">AB APARTMENTS</strong>
                  </div>
                  <div className="stk-amount-highlight">
                    <span className="currency">KES</span>
                    <span className="amount-num">{parseFloat(amount).toLocaleString()}</span>
                  </div>
                </div>

                <div className="pin-prompt-text">
                  <span>Enter M-PESA PIN to authorize transaction:</span>
                </div>

                {/* PIN Display Dots */}
                <div className="pin-dots-display">
                  {[0, 1, 2, 3].map((idx) => (
                    <div
                      key={idx}
                      className={`pin-dot ${idx < pin.length ? 'filled' : ''}`}
                    />
                  ))}
                </div>

                {/* Numeric Keypad */}
                <div className="stk-keypad">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                      key={num}
                      className="keypad-btn"
                      onClick={() => handleKeyPress(num)}
                    >
                      {num}
                    </button>
                  ))}
                  <button className="keypad-btn action cancel" onClick={handleClose}>
                    Exit
                  </button>
                  <button
                    className="keypad-btn"
                    onClick={() => handleKeyPress(0)}
                  >
                    0
                  </button>
                  <button className="keypad-btn action delete" onClick={handleBackspace}>
                    ⌫
                  </button>
                </div>

                <div className="stk-actions">
                  <button
                    className="btn-mpesa full-width"
                    onClick={handleSendStk}
                    disabled={pin.length < 4}
                  >
                    <span>Authorize Payment</span>
                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            )}

            {stage === 'processing' && (
              <div className="stk-processing-view">
                <Loader2 size={44} className="spinner text-mpesa animate-spin" />
                <h3>Connecting to Safaricom Daraja...</h3>
                <p>Verifying SIM PIN and initiating real-time balance settlement for Unit {unitId}...</p>
                <div className="security-notice">
                  <Shield size={16} />
                  <span>256-Bit Safaricom Encrypted Handshake</span>
                </div>
              </div>
            )}

            {stage === 'success' && (
              <div className="stk-success-view">
                <div className="success-icon-badge">
                  <CheckCircle2 size={48} className="text-mpesa" />
                </div>
                <h3>Payment Confirmed!</h3>
                <div className="sms-preview-card">
                  <div className="sms-header">
                    <strong>MPESA CONFIRMATION</strong>
                    <span className="sms-time">Just now</span>
                  </div>
                  <p className="sms-body">
                    {txCode} Confirmed. KES {parseFloat(amount).toLocaleString()} sent to AB APARTMENTS PAYBILL {propertyInfo.billing.mpesaPaybill} for Account {unitId} on {new Date().toLocaleDateString()}. Thank you.
                  </p>
                </div>

                <div className="stk-success-actions">
                  <button className="btn-primary full-width" onClick={handleViewReceipt}>
                    <Sparkles size={16} />
                    <span>View Official Branded Receipt</span>
                  </button>
                  <button className="btn-secondary full-width" onClick={handleClose}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
