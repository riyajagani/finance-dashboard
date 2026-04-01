import SummaryCard from '../components/ui/SummaryCard';
import BalanceTrendChart from '../components/charts/BalanceTrendChart';
import CategoryChart from '../components/charts/CategoryChart';
import TransactionsTable from '../components/tables/TransactionsTable';
import { summaryStats } from '../data/mockData';
import { ArrowRight, ReceiptText } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import PageLoader from '../components/ui/PageLoader';

export default function Dashboard() {
  const { role, transactions, isLoading } = useFinance();
  const recentTxns = transactions.slice(0, 5);
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* ── Page header ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-xs text-slate-600 font-medium mb-0.5">{today}</p>
          <h2 className="text-xl font-bold text-slate-100 tracking-tight">
            Good evening, James 👋
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Here's a complete snapshot of your finances.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-xl border ${
            role === 'Admin'
              ? 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20'
              : 'text-amber-400 bg-amber-400/10 border-amber-400/20'
          }`}>
            {role} View
          </span>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="bg-[#0d1117] border border-slate-800/70 rounded-2xl py-24 flex flex-col items-center justify-center text-center shadow-xl animate-fade-in mt-6">
          <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4 border border-slate-700/50">
            <ReceiptText size={28} className="text-slate-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-100 mb-2">No Transactions Yet</h3>
          <p className="text-sm text-slate-500 max-w-sm">
            Your dashboard will automatically populate with insights, trends, and summaries once you start adding activity.
          </p>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          {/* ── 1. Summary Cards ────────────────────────────────────────── */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-slate-600 mb-3">
              Financial Summary — March 2026
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SummaryCard type="balance"  data={summaryStats.balance}  />
              <SummaryCard type="income"   data={summaryStats.income}   />
              <SummaryCard type="expenses" data={summaryStats.expenses} />
            </div>
          </div>

          {/* ── 2. Balance Trend + Category Breakdown ───────────────────── */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-slate-600 mb-3">
              Visualizations
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-3">
                <BalanceTrendChart />
              </div>
              <div className="lg:col-span-2">
                <CategoryChart />
              </div>
            </div>
          </div>

          {/* ── 3. Recent Transactions ──────────────────────────────────── */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-widest text-slate-600 mb-0.5">
                  Recent Activity
                </h3>
                <p className="text-[15px] font-semibold text-slate-100">Latest Transactions</p>
              </div>
              <button className="flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors group">
                View all
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
            <TransactionsTable transactions={recentTxns} />
          </div>
        </div>
      )}

    </div>
  );
}
