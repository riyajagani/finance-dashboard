import { useMemo } from 'react';
import { Flame, ArrowUpRight, ArrowDownLeft, Target, Wallet } from 'lucide-react';
import clsx from 'clsx';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid
} from 'recharts';
import { useFinance } from '../context/FinanceContext';
import PageLoader from '../components/ui/PageLoader';

function getCategoryColor(name) {
  const map = {
    'Operations': '#6366f1', // indigo
    'Marketing':  '#8b5cf6', // violet
    'R & D':      '#06b6d4', // cyan
    'HR & Admin': '#10b981', // emerald
    'Revenue':    '#22c55e', // green
  };
  return map[name] || '#f59e0b'; // amber fallback
}

function deriveInsights(transactions) {
  let totalIncome = 0;
  let totalExpense = 0;
  const categories = {};
  let largestTxn = null;

  transactions.forEach(t => {
    const amt = Math.abs(t.amount);
    if (t.type === 'income') {
      totalIncome += amt;
    } else {
      totalExpense += amt;

      if (!categories[t.category]) categories[t.category] = 0;
      categories[t.category] += amt;

      if (!largestTxn || amt > Math.abs(largestTxn.amount)) {
        largestTxn = { ...t, absAmount: amt };
      }
    }
  });

  const catNames = Object.keys(categories);
  const highestCatName = catNames.length > 0 
    ? catNames.reduce((a, b) => categories[a] > categories[b] ? a : b) 
    : 'None';
  
  const categoryData = catNames.map(name => ({
    name, 
    value: categories[name], 
    color: getCategoryColor(name)
  })).sort((a, b) => b.value - a.value);

  const incExpData = [
    { name: 'Income',   amount: totalIncome,  color: '#10b981' },
    { name: 'Expenses', amount: totalExpense, color: '#f43f5e' },
  ];

  return {
    totalIncome,
    totalExpense,
    net: totalIncome - totalExpense,
    highestCat: { name: highestCatName, amount: categories[highestCatName] || 0 },
    largestTxn,
    categoryData,
    incExpData
  };
}

const fmt = (n) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

const BarTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, amount, color } = payload[0].payload;
  return (
    <div className="bg-[#161b22] border border-slate-700/80 rounded-xl px-4 py-2.5 shadow-2xl">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2 h-2 rounded-full" style={{ background: color }} />
        <span className="text-xs text-slate-400 font-medium">{name}</span>
      </div>
      <p className="text-[15px] font-bold text-slate-100">{fmt(amount)}</p>
    </div>
  );
};

export default function Insights() {
  const { transactions, isLoading } = useFinance();
  const insights = useMemo(() => deriveInsights(transactions), [transactions]);

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* ── Page header ─────────────────────────────────────────── */}
      <div className="mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-600 mb-1">Analytics</p>
        <h2 className="text-xl font-bold text-slate-100 tracking-tight">Data Insights</h2>
        <p className="text-sm text-slate-500 mt-1">Smart break-downs derived entirely from your live transactions.</p>
      </div>

      {transactions.length === 0 ? (
        <div className="bg-[#0d1117] border border-slate-800/70 rounded-2xl py-24 flex flex-col items-center justify-center text-center shadow-xl animate-fade-in mt-6">
          <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4 border border-slate-700/50">
            <Target size={28} className="text-slate-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-100 mb-2">No Data to Analyze</h3>
          <p className="text-sm text-slate-500 max-w-sm">
            Insights and analytics require transaction history. Add some transactions to generate reports.
          </p>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          
          {/* ── Highlight Cards ─────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-gradient-to-br from-rose-500/10 to-[#0d1117] border border-rose-500/20 rounded-2xl p-5 relative overflow-hidden shadow-xl shadow-black/30">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl" />
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                  <Flame size={18} className="text-rose-400" />
                </div>
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-1.5 relative z-10">
                Highest Spending Category
              </p>
              <p className="text-2xl font-bold tracking-tight text-slate-100 relative z-10">
                {insights.highestCat.name}
              </p>
              <p className="text-sm text-rose-400 font-medium mt-1 relative z-10">
                {fmt(insights.highestCat.amount)} total
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-500/10 to-[#0d1117] border border-indigo-500/20 rounded-2xl p-5 relative overflow-hidden shadow-xl shadow-black/30">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl" />
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  <Wallet size={18} className="text-indigo-400" />
                </div>
                <span className={clsx("text-xs font-semibold px-2 py-0.5 rounded-full border", 
                  insights.net >= 0 ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" : "text-rose-400 bg-rose-400/10 border-rose-400/20"
                )}>
                  {insights.net >= 0 ? 'Surplus' : 'Deficit'}
                </span>
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-1.5 relative z-10">
                Net Margin (Income vs Expense)
              </p>
              <p className={clsx("text-2xl font-bold tracking-tight relative z-10", insights.net >= 0 ? "text-emerald-400" : "text-rose-400")}>
                {insights.net >= 0 ? '+' : '-'}{fmt(Math.abs(insights.net))}
              </p>
              <p className="text-sm text-slate-400 mt-1 relative z-10 flex items-center gap-1">
                 <span className="text-emerald-400">{fmt(insights.totalIncome)}</span> in / <span className="text-rose-400">{fmt(insights.totalExpense)}</span> out
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#0d1117] to-[#0d1117] border border-slate-800/70 rounded-2xl p-5 relative overflow-hidden shadow-xl shadow-black/30 hover:border-slate-700 transition-colors">
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center shrink-0">
                  <Target size={18} className="text-slate-400" />
                </div>
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-1.5 relative z-10">
                Largest Single Expense
              </p>
              <p className="text-2xl font-bold tracking-tight text-slate-100 relative z-10 truncate">
                {insights.largestTxn ? insights.largestTxn.name : 'None'}
              </p>
              <p className="text-sm text-slate-400 mt-1 relative z-10 flex items-center gap-1.5">
                <span className="text-rose-400 font-medium">
                  {insights.largestTxn ? fmt(insights.largestTxn.absAmount) : '$0'}
                </span>
                <span>in {insights.largestTxn ? insights.largestTxn.category : 'N/A'}</span>
              </p>
            </div>

          </div>

          {/* ── Charts Grid ─────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            
            <div className="bg-[#0d1117] border border-slate-800/70 rounded-2xl p-5 shadow-xl shadow-black/30">
              <div className="mb-6">
                <h3 className="text-[15px] font-semibold text-slate-100">Income vs Expenses</h3>
                <p className="text-xs text-slate-500 mt-0.5">Absolute comparison derived from all records</p>
              </div>
              
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={insights.incExpData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} width={70} />
                    <Tooltip content={<BarTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                    <Bar dataKey="amount" radius={[0, 6, 6, 0]} barSize={36}>
                      {insights.incExpData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.85} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#0d1117] border border-slate-800/70 rounded-2xl p-5 shadow-xl shadow-black/30">
              <div className="mb-6">
                <h3 className="text-[15px] font-semibold text-slate-100">Category Spending Breakdown</h3>
                <p className="text-xs text-slate-500 mt-0.5">Where your money goes, ranked</p>
              </div>

              <div className="space-y-4">
                {insights.categoryData.length === 0 ? (
                  <p className="text-sm text-slate-500 py-6 text-center">No expense data to display.</p>
                ) : (
                  insights.categoryData.map((cat) => {
                    const percent = ((cat.value / insights.totalExpense) * 100).toFixed(1);
                    return (
                      <div key={cat.name}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: cat.color }} />
                            {cat.name}
                          </span>
                          <div className="flex items-center gap-2.5">
                            <span className="text-xs text-slate-500 font-medium">{fmt(cat.value)}</span>
                            <span className="text-xs font-bold text-slate-200 w-10 text-right">{percent}%</span>
                          </div>
                        </div>
                        <div className="h-1.5 bg-slate-800/80 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${percent}%`, backgroundColor: cat.color }}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
}
