import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { revenueData } from '../../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#161b22] border border-slate-700 rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-xs text-slate-400 mb-2 font-medium">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-sm font-semibold" style={{ color: entry.color }}>
          {entry.name === 'revenue' ? 'Revenue' : 'Expenses'}: ${entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export default function RevenueChart() {
  return (
    <div className="bg-[#0d1117] border border-slate-800/70 rounded-2xl p-5 shadow-xl shadow-black/30">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[15px] font-semibold text-slate-100">Revenue vs Expenses</h3>
          <p className="text-xs text-slate-500 mt-0.5">6-month overview</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />Revenue
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />Expenses
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={revenueData} margin={{ top: 0, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#f43f5e" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#334155', strokeWidth: 1 }} />
          <Area type="monotone" dataKey="revenue"  stroke="#6366f1" strokeWidth={2} fill="url(#gradRevenue)"  dot={false} activeDot={{ r: 4, fill: '#6366f1' }} />
          <Area type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={2} fill="url(#gradExpenses)" dot={false} activeDot={{ r: 4, fill: '#f43f5e' }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
