import { Wallet, ArrowDownLeft, ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';
import clsx from 'clsx';

const cardConfig = {
  balance: {
    label: 'Total Balance',
    Icon: Wallet,
    iconBg: 'bg-indigo-500/10 border-indigo-500/20',
    iconColor: 'text-indigo-400',
    valueColor: 'text-slate-100',
    accent: 'from-indigo-600/10 to-transparent border-indigo-500/20',
    dot: 'bg-indigo-400',
  },
  income: {
    label: 'Total Income',
    Icon: ArrowUpRight,
    iconBg: 'bg-emerald-500/10 border-emerald-500/20',
    iconColor: 'text-emerald-400',
    valueColor: 'text-emerald-400',
    accent: 'from-emerald-600/8 to-transparent border-emerald-500/20',
    dot: 'bg-emerald-400',
  },
  expenses: {
    label: 'Total Expenses',
    Icon: ArrowDownLeft,
    iconBg: 'bg-rose-500/10 border-rose-500/20',
    iconColor: 'text-rose-400',
    valueColor: 'text-rose-400',
    accent: 'from-rose-600/8 to-transparent border-rose-500/20',
    dot: 'bg-rose-400',
  },
};

export default function SummaryCard({ type, data }) {
  const cfg = cardConfig[type];
  const { Icon } = cfg;

  return (
    <div className={clsx(
      'relative overflow-hidden rounded-2xl border p-5',
      'bg-gradient-to-br',
      cfg.accent,
      'bg-[#0d1117]',
      'hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-200',
      'shadow-xl shadow-black/30'
    )}>
      {/* Subtle background glow blob */}
      <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-10 blur-2xl"
        style={{ background: type === 'balance' ? '#6366f1' : type === 'income' ? '#10b981' : '#f43f5e' }}
      />

      <div className="relative">
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <div className={clsx('w-10 h-10 rounded-xl border flex items-center justify-center shrink-0', cfg.iconBg)}>
            <Icon size={18} className={cfg.iconColor} />
          </div>
          {/* Badge */}
          <span className={clsx(
            'inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full',
            data.up ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'
          )}>
            {data.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {data.pct}
          </span>
        </div>

        {/* Label */}
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
          {cfg.label}
        </p>

        {/* Value */}
        <p className={clsx('text-3xl font-bold tracking-tight leading-none mb-3', cfg.valueColor)}>
          {data.formatted}
        </p>

        {/* Bottom sub-line */}
        <div className="flex items-center gap-1.5">
          <span className={clsx('w-1.5 h-1.5 rounded-full', cfg.dot)} />
          <span className="text-xs text-slate-500">
            <span className={data.up ? 'text-emerald-400' : 'text-red-400'}>{data.change}</span>
            {' '}this month
          </span>
        </div>
      </div>
    </div>
  );
}
