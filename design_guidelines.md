# BetPro Exchange - Design Guidelines

## Design Approach: Reference-Based (Betting Exchange Industry)

**Primary References**: BetProExch, Betfair, Bet365 trading interfaces
**Aesthetic Foundation**: User-specified dark navy + neon green scheme for a premium sports trading platform

**Core Principle**: Professional trading interface prioritizing speed, clarity, and real-time data visibility with distinctive brand identity.

---

## Color Palette

### Dark Mode (Primary)
- **Background Primary**: 220 25% 12% (Deep navy)
- **Background Secondary**: 220 22% 16% (Lighter navy for cards)
- **Background Elevated**: 220 20% 20% (Modals, dropdowns)
- **Primary Brand**: 145 85% 45% (Neon green for CTAs, success)
- **Text Primary**: 0 0% 98% (White for headings, primary content)
- **Text Secondary**: 220 15% 70% (Muted for labels, secondary info)
- **Border**: 220 20% 25% (Subtle card borders)

### Accent Colors
- **Back Bet**: 210 100% 60% (Bright blue for backing)
- **Lay Bet**: 350 85% 55% (Vibrant pink/red for laying)
- **Success**: 145 85% 45% (Matches primary green)
- **Warning**: 38 92% 50% (Amber for alerts)
- **Error**: 0 85% 60% (Red for errors/losses)
- **Profit Green**: 145 75% 40% (For positive P&L)
- **Loss Red**: 0 75% 55% (For negative P&L)

---

## Typography

### Font Families
- **Primary**: 'Inter', system-ui, sans-serif (via Google Fonts)
- **Numeric/Data**: 'Roboto Mono', monospace (for odds, stakes, P&L)

### Type Scale
- **Hero/Dashboard Title**: text-3xl font-bold (30px)
- **Section Headers**: text-xl font-semibold (20px)
- **Card Titles**: text-lg font-medium (18px)
- **Body Text**: text-base (16px)
- **Labels/Meta**: text-sm (14px)
- **Odds/Numbers**: text-lg font-mono font-semibold
- **Small Data**: text-xs font-mono (12px for compact tables)

---

## Layout System

### Spacing Primitives
**Core Units**: 2, 4, 8, 12, 16 (Tailwind scale)
- **Component Padding**: p-4 to p-6
- **Section Spacing**: py-8 to py-12
- **Card Gaps**: gap-4 to gap-6
- **Tight Data**: p-2, gap-2 (for odds tables)

### Grid Structure
- **Dashboard**: 12-column grid with sidebar (lg:grid-cols-12)
- **Betting Cards**: 2-3 column on desktop (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- **Odds Table**: Full-width responsive tables with fixed headers
- **Container**: max-w-7xl mx-auto for main content

---

## Component Library

### Navigation
- **Top Bar**: Fixed header with logo, balance display, user menu, notifications
- **Sidebar**: Collapsible navigation (Dashboard, Live Matches, My Bets, Wallet, Reports)
- **Mobile**: Bottom tab bar for primary actions

### Live Odds Interface
- **Match Cards**: Dark navy cards with match details, live indicator dot (green pulse), odds grid
- **Odds Display**: Back (blue) and Lay (pink) buttons in 3-column grid format (Back odds | Selection | Lay odds)
- **Betting Slip**: Floating panel (right side desktop, bottom sheet mobile) showing active bets
- **Quick Stake**: Preset buttons (₹100, ₹500, ₹1000, ₹5000) with neon green active state

### Dashboard Components
- **Stat Cards**: 4-column grid showing Total Bets, Active Bets, P&L, Available Balance with large numeric values
- **Chart Section**: Chart.js line/bar charts with dark theme, neon green accent lines
- **Recent Activity**: Compact table with alternating row colors, status badges (Won/Lost/Active)
- **Quick Actions**: Neon green primary buttons for Deposit, Withdraw, Place Bet

### Data Tables
- **Match List**: Sortable columns (Match, Odds, Liquidity, Time), hover highlight
- **Transaction History**: Tabular layout with filters, pagination, color-coded types
- **P&L Reports**: Grouped by date/match with expandable rows, profit in green, loss in red

### Forms & Inputs
- **Text Inputs**: Dark background (220 20% 18%), neon green focus ring, white text
- **Dropdowns**: Custom styled with dark theme, green highlight on selection
- **Amount Inputs**: Large, monospace font with currency symbol, min/max validation
- **Buttons**: 
  - Primary: bg-[145 85% 45%] with subtle glow effect
  - Secondary: border-2 with transparent bg and green border
  - Danger: bg-[0 75% 55%] for withdrawals/cancellations

### Admin/Master Controls
- **User Management Table**: Search, filter, action buttons (Edit, Suspend, View Details)
- **Commission Settings**: Slider inputs with live preview of commission rates
- **Role Badges**: Color-coded pills (Super Admin: Gold border, Master: Silver, User: Green)

---

## Visual Enhancements

### Micro-interactions
- **Odds Update**: Subtle flash animation (green for increase, red for decrease)
- **Balance Change**: Number counting animation when balance updates
- **Bet Placement**: Success confetti animation (very brief, minimal)
- **Live Indicator**: Pulsing green dot for live matches

### Responsive Behavior
- **Desktop (lg:)**: Full sidebar + main content, multi-column cards, expanded tables
- **Tablet (md:)**: Collapsible sidebar, 2-column layouts, horizontal scroll for tables
- **Mobile (base)**: Bottom navigation, stacked cards, swipeable odds grid, full-screen betting slip

### Trust & Credibility Elements
- **SSL Badge**: Footer security indicator
- **Live Status**: Real-time connection indicator (green dot + "Live" text)
- **Balance Display**: Always visible in header with wallet icon
- **Transaction Confirmations**: Toast notifications with transaction IDs

---

## Images

### Hero Section (Login/Landing)
**Image**: Cricket stadium atmosphere shot - night game with floodlights, blurred crowd in background, focus on pitch
**Placement**: Full-width hero with gradient overlay (navy to transparent), login card overlaid on right side

### Dashboard
**No hero image** - Data-first interface with immediate access to live matches

### Marketing Pages (if applicable)
**Feature Showcases**: Screenshots of live betting interface, mobile app mockups
**Placement**: Alternating left-right layout with feature descriptions

---

## Page-Specific Layouts

### Login/Register Page
- Centered card on full-screen hero image background
- Logo at top, form fields in navy card with neon green submit button
- Footer links (Terms, Privacy, Support)

### Dashboard
- Sidebar navigation (Desktop: 240px fixed, Mobile: overlay drawer)
- Top stats grid (4 cards)
- Chart.js analytics (50% width)
- Live matches grid below
- Floating betting slip (right panel)

### Live Matches Page
- Filter bar (Sport, League, Time)
- Match cards grid with live odds
- Quick bet placement modal/drawer

### Wallet Page
- Balance overview card (large)
- Quick actions (Deposit/Withdraw buttons)
- Transaction history table
- Payment method cards

### Reports/Analytics
- Date range picker
- P&L summary cards
- Detailed charts (Bar for daily P&L, Line for balance trend)
- Exportable data table

---

**Brand Identity**: Professional sports trading platform with energetic neon accents, prioritizing speed and data clarity over decorative elements. Dark theme reduces eye strain during extended trading sessions while neon green provides clear visual hierarchy for critical actions.