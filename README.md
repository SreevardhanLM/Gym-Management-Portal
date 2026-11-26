# 🏋️ IronPulse Fitness & Gym Membership Portal

A modern, high-energy, and responsive Fitness & Gym Membership Portal built with **React 19**, **Tailwind CSS v4**, and **React Router DOM**.

This application enables prospective and active gym members to explore membership plans, check live BMI and daily calorie targets, browse a weekly workout schedule, book and manage class slots, and complete a full membership sign-up flow with client-side persistence and zero backend dependencies.

---

## 🌟 Key Features

### 1. 🏠 Home & Plans Overview (`/`)
- **Hero Banner:** Bold typography, athletic aesthetic, and key statistics (24/7 Access, 11+ Weekly Classes, Certified Coaches, 4.9★ Member Rating).
- **Dynamic Membership Pricing Toggle:**
  - Real-time **Monthly / Annual Billing toggle**.
  - Recalculates plan rates dynamically with a highlighted **“Save 20%”** badge.
  - Three structured membership tiers: **Starter**, **Pro Athlete (Popular)**, and **Elite VIP**.
  - Clicking **“Select Plan”** passes the chosen plan ID and billing mode via route parameters and navigation state to `/join/:planId`.
- **Interactive Client-Side BMI & Calorie Calculator:**
  - Enter Height (cm), Weight (kg), and select Fitness Goal (*Fat Loss*, *Maintenance*, *Muscle Gain*).
  - Instant live BMI score computation with color-coded classification (Underweight, Healthy, Overweight, Obese).
  - Target daily calorie intake (TDEE + goal modifier) and recommended daily protein targets.
- **Certified Trainers Showcase:**
  - Highlights master coaches across HIIT, Strength, CrossFit, and Power Yoga with credentials and direct links to scheduled classes.
- **Facility Amenities:** Highlighting Olympic grade equipment, keycard access, small cohorts, and recovery saunas.

### 2. 📅 Weekly Class Timetable & Slot Booking (`/classes`)
- **Multi-Filter Timetable:**
  - Filter by **Day**: `All`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`.
  - Filter by **Workout Category**: `All`, `Strength`, `HIIT`, `CrossFit`, `Power Yoga`.
- **Interactive Spot Reservation (`localStorage`):**
  - Clicking **“Book Spot”** decrements available spots count in real-time.
  - Button dynamically updates to **“Booked ✓”** (with cancellation capability).
  - Increments the live booking badge counter in the navigation header.
  - Automatically marks sessions as **“Class Full (Waitlist Only)”** when spots reach 0.
  - Persists all reserved class IDs and spot inventory in browser `localStorage`.

### 3. ✍️ Membership Enrollment & Add-on Calculation (`/join/:planId`)
- Reads selected tier from the route parameter (`/join/:planId`) with dynamic on-page tier switching.
- **Monthly / Annual Billing Toggle** with real-time recalculation.
- **Optional Personal Training Add-on (+ Rs. 1,999/mo or Rs. 1,599/mo annual)**: Checkbox that updates the live total price breakdown in real-time.
- **Member Registration Form:**
  - Fields: Full Name, Email Address, Phone Number, Start Date, Experience Level, Primary Fitness Goal, and Simulated Payment Method.
  - Inline validation ensuring clean required field submission.
  - Form submission saves order details to `localStorage` and client-side redirects to `/confirmation`.

### 4. 🎟️ Digital Confirmation Pass (`/confirmation`)
- Celebratory confirmation screen with generated unique Member Order ID (e.g., `IP-XXXXXX`).
- **Digital Membership Pass:** Athletic card graphic with QR code, activation date, and tier credentials.
- Line-item breakdown receipt showing membership tier, billing cycle, add-on inclusion, and simulated payment total.
- Quick action buttons to book weekly classes or return to home.

### 5. 📋 My Booked Classes (`/my-bookings`)
- Lists all reserved workout sessions retrieved from `localStorage`.
- Shows day, time, duration, coach, intensity, and confirmed status.
- **“Cancel Reservation”** action that restores available spots and decrements the header badge.
- Friendly empty state with a direct button to browse the weekly timetable.

---

## 🛠️ Tech Stack & Architecture

- **React 19:** Modern functional components, hooks (`useState`, `useMemo`, `useContext`, `useEffect`, `useParams`, `useNavigate`).
- **Vite:** High-performance development server and production bundler.
- **Tailwind CSS v4:** Utility-first responsive design (Mobile: 375px, Tablet: 768px, Desktop: 1280px).
- **React Router DOM v7:** Declarative client-side routing and programmatic redirects.
- **Lucide React:** Athletic and modern UI icons.
- **Browser LocalStorage:** Zero-backend data persistence for class inventory, booked slots, and membership registrations.

---

## 📂 Project Structure

```text
Gym-Management-portal/
├── src/
│   ├── components/
│   │   ├── BMICalculator.jsx    # Interactive BMI & Calorie Calculator widget
│   │   ├── ClassCard.jsx        # Individual class schedule card with booking toggle
│   │   ├── Footer.jsx           # Global portal footer with hours & links
│   │   ├── Navbar.jsx           # Sticky header with responsive drawer & live badge
│   │   └── PlanCard.jsx         # Membership tier card with dynamic pricing
│   ├── context/
│   │   └── BookingContext.jsx   # Global state for class slots & localStorage sync
│   ├── data/
│   │   ├── classes.json         # 11 weekly workout sessions with trainers & spots
│   │   └── plans.json           # 3 membership tiers with monthly & annual pricing
│   ├── pages/
│   │   ├── Classes.jsx          # Weekly filterable timetable page
│   │   ├── Confirmation.jsx     # Digital pass & enrollment receipt page
│   │   ├── Home.jsx             # Landing page, pricing, calculator & coaches
│   │   ├── Join.jsx             # Plan registration & add-on calculation page
│   │   └── MyBookings.jsx       # Saved reservations dashboard
│   ├── utils/
│   │   └── calculations.js      # BMI, TDEE, Calorie, and Protein formulas
│   ├── App.jsx                  # Route definitions & Router provider
│   ├── index.css                # Tailwind CSS imports & base styles
│   └── main.jsx                 # React root entry point
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```
