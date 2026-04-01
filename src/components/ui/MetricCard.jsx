import { TrendingUp, TrendingDown, DollarSign, CreditCard, Users } from 'lucide-react';
import clsx from 'clsx';

const iconMap = {
  'trending-up':  TrendingUp,
  'dollar-sign':  DollarSign,
  'credit-card':  CreditCard,
  'users':        Users,
};

const accentStyles = {
  indigo:  { bg: 'bg-indigo-500/10',  icon: 'text-indigo-400',  border: 'border-indigo-500/15' },
  emerald: { bg: 'bg-emerald-500/10', icon: 'text-emerald-400', border: 'border-emerald-500/15' },
  rose:    { bg: 'bg-rose-500/10',    icon: 'text-rose-400',    border: 'border-rose-500/15'    },
  violet:  { bg: 'bg-violet-500/10',  icon: 'text-violet-400',  border: 'border-violet-500/15'  },
};

export default function MetricCard({ label, value, change, up, sub, icon, accent }) {
  const Icon = iconMap[icon] || TrendingUp;
  const style = accentStyles[accent] || accentStyles.indigo;

  return (
    <div className="bg-[#0d1117] border border-slate-800/70 rounded-2xl p-5 hover:border-slate-700 hover:-translate-y-0.5 transition-all duration-200 shadow-xl shadow-black/30">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-2">{label}</p>
          <p className="text-2xl font-bold text-slate-100 tracking-tight leading-none mb-2">{value}</p>
          <div className="flex items-center gap-1.5">
            <span className={clsx(
              'inline-flex items-center gap-1 text-[11px] font-semibold px-1.5 py-0.5 rounded-full',
              up ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'
            )}>
              {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {change}
            </span>
            <span className="text-[11px] text-slate-600">{sub}</span>
          </div>
        </div>

        <div className={clsx(
          'w-10 h-10 rounded-xl flex items-center justify-center border shrink-0',
          style.bg, style.border
        )}>
          <Icon size={18} className={style.icon} />
        </div>
      </div>
    </div>
  );
}
