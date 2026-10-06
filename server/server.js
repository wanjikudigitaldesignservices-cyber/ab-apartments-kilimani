import express from 'express';
import cors from 'cors';
import { db } from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'RentSync Universal Multi-Client Rental Engine',
    propertiesCount: db.getProperties().length
  });
});

// 1. Properties (Client Estates) Management
app.get('/api/properties', (req, res) => {
  res.json(db.getProperties());
});

app.post('/api/properties', (req, res) => {
  try {
    const newProp = db.createProperty(req.body);
    res.status(201).json(newProp);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/api/properties/:id', (req, res) => {
  const data = db.getPropertyFullData(req.params.id);
  if (!data) return res.status(404).json({ error: 'Property not found' });
  res.json(data);
});

app.put('/api/properties/:id', (req, res) => {
  const updated = db.updateProperty(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Property not found' });
  res.json(updated);
});

app.delete('/api/properties/:id', (req, res) => {
  db.deleteProperty(req.params.id);
  res.json({ success: true, message: 'Property and associated records deleted' });
});

// 2. Units Management
app.post('/api/properties/:id/units', (req, res) => {
  const unit = db.addUnit({ ...req.body, propertyId: req.params.id });
  res.status(201).json(unit);
});

app.put('/api/properties/:id/units/:unitId', (req, res) => {
  const updated = db.updateUnit(req.params.id, req.params.unitId, req.body);
  if (!updated) return res.status(404).json({ error: 'Unit not found' });
  res.json(updated);
});

// 3. Tenants & Leases
app.post('/api/properties/:id/tenants', (req, res) => {
  const tenant = db.addTenant({
    ...req.body,
    propertyId: req.params.id,
    id: "TEN-" + Math.floor(100 + Math.random() * 900)
  });
  res.status(201).json(tenant);
});

// 4. Invoicing
app.post('/api/properties/:id/invoices/generate', (req, res) => {
  const month = req.body.month || 'November 2026';
  const created = db.generateInvoices(req.params.id, month);
  res.json({ success: true, count: created.length, invoices: created });
});

// 5. Payments & M-Pesa
app.post('/api/properties/:id/payments', (req, res) => {
  const pay = db.recordPayment({
    ...req.body,
    propertyId: req.params.id,
    id: "PAY-" + Math.floor(1000 + Math.random() * 9000),
    receiptNumber: "RCPT-" + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().replace('T', ' ').slice(0, 19),
    status: 'Verified'
  });
  res.status(201).json(pay);
});

// Simulated M-Pesa Daraja STK Push
app.post('/api/properties/:id/mpesa-stk', (req, res) => {
  const { phone, unitId, amount, tenantName, invoiceId, tenantId } = req.body;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let ref = "SLK";
  for (let i = 0; i < 7; i++) ref += chars.charAt(Math.floor(Math.random() * chars.length));

  const payment = db.recordPayment({
    propertyId: req.params.id,
    id: "PAY-" + Math.floor(1000 + Math.random() * 9000),
    receiptNumber: "AB-RCPT-" + Math.floor(1000 + Math.random() * 9000),
    invoiceId,
    unitId,
    tenantId,
    tenantName: tenantName || "Resident",
    amount: parseFloat(amount) || 0,
    paymentMethod: "mpesa_stk",
    reference: ref,
    phoneNumber: phone,
    date: new Date().toISOString().replace('T', ' ').slice(0, 19),
    status: "Verified",
    description: `M-Pesa STK Push Express Checkout for Unit ${unitId}`
  });

  res.json({
    success: true,
    message: `Payment of KES ${payment.amount.toLocaleString()} received via Safaricom STK Push`,
    reference: ref,
    payment
  });
});

// 6. Maintenance Work Orders
app.post('/api/properties/:id/maintenance', (req, res) => {
  const ticket = db.addMaintenance({
    ...req.body,
    propertyId: req.params.id,
    id: "TKT-" + Math.floor(100 + Math.random() * 900),
    ticketNo: "TKT-" + Math.floor(100 + Math.random() * 900),
    reportedDate: new Date().toISOString().replace('T', ' ').slice(0, 16),
    status: "Open"
  });
  res.status(201).json(ticket);
});

app.put('/api/properties/:id/maintenance/:ticketId', (req, res) => {
  const updated = db.updateMaintenance(req.params.id, req.params.ticketId, req.body);
  if (!updated) return res.status(404).json({ error: 'Ticket not found' });
  res.json(updated);
});

// 7. Operating Expenses
app.post('/api/properties/:id/expenses', (req, res) => {
  const exp = db.addExpense({
    ...req.body,
    propertyId: req.params.id,
    id: "EXP-" + Math.floor(100 + Math.random() * 900),
    date: req.body.date || new Date().toISOString().split('T')[0],
    status: "Paid"
  });
  res.status(201).json(exp);
});

// 8. Notices
app.post('/api/properties/:id/notices', (req, res) => {
  const notice = db.addNotice({
    ...req.body,
    propertyId: req.params.id,
    id: "NOT-" + Math.floor(200 + Math.random() * 800),
    date: new Date().toISOString().split('T')[0]
  });
  res.status(201).json(notice);
});

export default app;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`RentSync Multi-Client Rental Engine API running on port ${PORT}`);
  });
}
