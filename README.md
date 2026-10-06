# RentSync Universal - Multi-Client Rental & Property Management System
### Flagship Deployment: AB Apartments Kilimani (Nairobi, Kenya)

A state-of-the-art, multi-tenant residential and commercial property management platform engineered for property owners, estate agencies, and resident self-service across Kenya and East Africa.

---

## 🏢 Platform Highlights

- **Universal Multi-Client SaaS Architecture**:
  - Seamlessly switch between different estates (e.g. **AB Apartments Kilimani**, **Kilimani Heights Suites**, **Riverside Haven Duplexes**).
  - 1-Click Onboarding of new client estates with custom wings/blocks, floors, currencies (KES, USD, EUR), and Paybill configurations.
  - Dedicated isolated data stores, tenant directories, and financial statements per client.

- **Safaricom M-Pesa STK & Paybill Integration**:
  - Live interactive Safaricom Daraja STK Push Express checkout simulator with real PIN authorization keypad.
  - Paybill 408920 & Buy Goods Till number auto-reconciliation.
  - Instant official branded digital receipts with QR verification codes and KRA tax stamps.

- **Apartment Units & Floor Map Matrix**:
  - Interactive visual floor plan grid across Wings/Blocks (Sunburst Wing & Jacaranda Wing, Floors 1 to 6).
  - Unit filtering by Wing, Floor, and Status (Occupied, Vacant, Under Maintenance, Reserved).
  - Detailed unit drawers with square meters, KPLC token meter numbers, and water sub-meter IDs.

- **Tenants & Digital Lease Register**:
  - Comprehensive tenant dossiers with National ID / Passport, Safaricom contacts, vehicle registration for biometric gates, and Next of Kin.
  - Automated late fee calculation (5% after 5th of each month).
  - Digital lease agreements and statement of accounts.

- **Automated Billing & Invoicing Engine**:
  - 1-Click batch billing generator for upcoming months.
  - Granular charge breakdown: Base Rent + Service Charge + Metered Borehole Water + Garbage & Sanitation Fee.
  - Overdue penalty monitoring.

- **Maintenance & Contractor Dispatch**:
  - Real-time work order lifecycle (Open -> Assigned -> In Progress -> Resolved).
  - Direct fundi directory (Plumbing, Electrical, Schindler Lifts AMC, Davis & Shirtliff Water Treatment).
  - Auto-links actual repair costs directly into the Property Operating Expenses ledger upon resolution.

- **Operating Expenses & Net Operating Income (NOI)**:
  - Full tracking of 24/7 Security (Securex), KPLC common area lighting, elevator maintenance, and caretaker staff payroll.
  - Net Operating Income (NOI) calculation and executive P&L statement.

- **SMS & Resident Announcements Broadcast Hub**:
  - Pre-built Safaricom bulk SMS templates for rent due reminders, tank cleaning notices, and security advisories.
  - Live smartphone SMS preview simulator.

- **Resident Self-Service Portal**:
  - Residents can log in to view current statements, trigger instant M-Pesa STK payment, download verified past receipts, report maintenance issues, and access caretaker emergency contacts.

---

## 🚀 Technology Stack

- **Frontend**: React 19, Vite 8, Vanilla CSS Design System (Kilimani Luxury Obsidian & Emerald Glow theme, glassmorphism, responsive).
- **Backend**: Express REST API (`/api/properties`, `/api/units`, `/api/tenants`, `/api/invoices`, `/api/payments`, `/api/mpesa-stk`, `/api/maintenance`, `/api/expenses`, `/api/notices`).
- **Database**: Relational file-backed document store with ACID persistence (`server/data/store.json`).
- **Icons & Visuals**: Lucide React, Canvas Confetti.
- **Deployment**: Vercel Serverless Function API bridge (`api/index.js`, `vercel.json`).

---

## 🛠️ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start Vite frontend dev server
npm run dev

# 3. Build for production
npm run build
```

---

## 🌐 Deployed on Vercel
Built and deployed with multi-client cloud architecture for Kenya property management.
