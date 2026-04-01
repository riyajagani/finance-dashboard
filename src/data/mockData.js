// ── Summary cards ────────────────────────────────────────────────
export const summaryStats = {
  balance:  { value: 142680, formatted: '$142,680', change: '+$9,870', pct: '+7.4%', up: true  },
  income:   { value: 84250,  formatted: '$84,250',  change: '+$9,310', pct: '+12.4%', up: true },
  expenses: { value: 52380,  formatted: '$52,380',  change: '+$1,620', pct: '+3.2%', up: false },
};

// ── Balance trend (daily for last 30 days) ────────────────────────
export const balanceTrend = [
  { date: 'Mar 1',  balance: 118200 },
  { date: 'Mar 3',  balance: 121500 },
  { date: 'Mar 5',  balance: 119800 },
  { date: 'Mar 7',  balance: 123400 },
  { date: 'Mar 9',  balance: 122100 },
  { date: 'Mar 11', balance: 126800 },
  { date: 'Mar 13', balance: 124300 },
  { date: 'Mar 15', balance: 131050 },
  { date: 'Mar 17', balance: 129700 },
  { date: 'Mar 19', balance: 132800 },
  { date: 'Mar 21', balance: 130200 },
  { date: 'Mar 23', balance: 135600 },
  { date: 'Mar 25', balance: 134620 },
  { date: 'Mar 27', balance: 138400 },
  { date: 'Mar 29', balance: 136900 },
  { date: 'Mar 31', balance: 142680 },
];

// ── Category spending (absolute $ amounts) ────────────────────────
export const categorySpending = [
  { name: 'Operations', amount: 19920, color: '#6366f1' },
  { name: 'Marketing',  amount: 12571, color: '#8b5cf6' },
  { name: 'R & D',      amount: 10476, color: '#06b6d4' },
  { name: 'HR & Admin', amount:  5762, color: '#10b981' },
  { name: 'Other',      amount:  3668, color: '#f59e0b' },
];

// ── Existing data kept intact ─────────────────────────────────────
export const metrics = [
  { id: 'total-revenue',   label: 'Total Revenue',   value: '$84,250', change: '+12.4%', up: true,  sub: 'vs last month', icon: 'trending-up',  accent: 'indigo'  },
  { id: 'net-profit',      label: 'Net Profit',      value: '$31,870', change: '+8.1%',  up: true,  sub: 'vs last month', icon: 'dollar-sign',  accent: 'emerald' },
  { id: 'total-expenses',  label: 'Total Expenses',  value: '$52,380', change: '-3.2%',  up: false, sub: 'vs last month', icon: 'credit-card',  accent: 'rose'    },
  { id: 'active-accounts', label: 'Active Accounts', value: '1,284',   change: '+5.9%',  up: true,  sub: 'vs last month', icon: 'users',        accent: 'violet'  },
];

export const revenueData = [
  { month: 'Oct', revenue: 52000, expenses: 38000 },
  { month: 'Nov', revenue: 61000, expenses: 42000 },
  { month: 'Dec', revenue: 59000, expenses: 40000 },
  { month: 'Jan', revenue: 67000, expenses: 45000 },
  { month: 'Feb', revenue: 72000, expenses: 48000 },
  { month: 'Mar', revenue: 84250, expenses: 52380 },
];

export const spendingData = [
  { name: 'Operations', value: 38, color: '#6366f1' },
  { name: 'Marketing',  value: 24, color: '#8b5cf6' },
  { name: 'R & D',      value: 20, color: '#06b6d4' },
  { name: 'HR & Admin', value: 11, color: '#10b981' },
  { name: 'Other',      value: 7,  color: '#f59e0b' },
];

export const transactions = [
  { id: 'txn-001', name: 'Stripe Payout',            category: 'Revenue',    type: 'income',  date: '2026-03-31', amount:  12400, status: 'completed', avatar: 'SP' },
  { id: 'txn-002', name: 'AWS Cloud Services',        category: 'Operations', type: 'expense', date: '2026-03-30', amount:  -3200, status: 'completed', avatar: 'AW' },
  { id: 'txn-003', name: 'Q1 Investor Dividend',      category: 'Revenue',    type: 'income',  date: '2026-03-28', amount:  25000, status: 'completed', avatar: 'QI' },
  { id: 'txn-004', name: 'Google Ads Campaign',       category: 'Marketing',  type: 'expense', date: '2026-03-27', amount:  -4750, status: 'completed', avatar: 'GA' },
  { id: 'txn-005', name: 'SaaS License Renewal',      category: 'Operations', type: 'expense', date: '2026-03-25', amount:   -980, status: 'pending',   avatar: 'SL' },
  { id: 'txn-006', name: 'Product Sale – Enterprise', category: 'Revenue',    type: 'income',  date: '2026-03-24', amount:   9800, status: 'completed', avatar: 'PE' },
  { id: 'txn-007', name: 'Office Lease – March',      category: 'HR & Admin', type: 'expense', date: '2026-03-20', amount:  -5600, status: 'completed', avatar: 'OL' },
  { id: 'txn-008', name: 'Freelancer Payment',        category: 'R & D',      type: 'expense', date: '2026-03-18', amount:  -1200, status: 'failed',    avatar: 'FP' },
  { id: 'txn-009', name: 'API Revenue – March',       category: 'Revenue',    type: 'income',  date: '2026-03-15', amount:   6750, status: 'completed', avatar: 'AR' },
  { id: 'txn-010', name: 'Design Tools Subscription', category: 'Operations', type: 'expense', date: '2026-03-12', amount:   -480, status: 'completed', avatar: 'DT' },
  { id: 'txn-011', name: 'Client Retainer – Acme',    category: 'Revenue',    type: 'income',  date: '2026-03-10', amount:  15000, status: 'completed', avatar: 'CA' },
  { id: 'txn-012', name: 'Legal & Compliance Fees',   category: 'HR & Admin', type: 'expense', date: '2026-03-08', amount:  -2300, status: 'completed', avatar: 'LF' },
];

export const insightKpis = [
  { label: 'Avg. Monthly Revenue', value: '$66,958', trend: '+14.2%', up: true  },
  { label: 'Revenue Growth Rate',  value: '22.6%',   trend: '+3.1pp', up: true  },
  { label: 'Expense Ratio',        value: '62.1%',   trend: '-1.8pp', up: true  },
  { label: 'Customer Acquisition', value: '$48.20',  trend: '-6.4%',  up: true  },
];

export const topChannels = [
  { name: 'Direct Sales',   revenue: 32400, share: 38 },
  { name: 'API / Platform', revenue: 21000, share: 25 },
  { name: 'Partnerships',   revenue: 16800, share: 20 },
  { name: 'Marketplace',    revenue: 14050, share: 17 },
];
