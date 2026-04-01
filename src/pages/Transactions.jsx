import { useMemo } from 'react';
import { Search, X, ArrowUpCircle, ArrowDownCircle, LayoutList, Plus, Download } from 'lucide-react';
import clsx from 'clsx';
import TransactionsTable from '../components/tables/TransactionsTable';
import { useFinance } from '../context/FinanceContext';
import PageLoader from '../components/ui/PageLoader';

const CATEGORIES = ['All', 'Revenue', 'Operations', 'Marketing', 'R & D', 'HR & Admin'];
const TYPES      = ['all', 'income', 'expense'];

const TYPE_LABELS = { all: 'All Types', income: 'Income', expense: 'Expense' };
const TYPE_ICONS  = {
  all:     <LayoutList     size={13} />,
  income:  <ArrowUpCircle  size={13} className="text-emerald-400" />,
  expense: <ArrowDownCircle size={13} className="text-rose-400" />,
};

function calcSummary(txns) {
  const income   = txns.filter(t => t.type === 'income' ).reduce((s, t) => s + t.amount, 0);
  const expense  = txns.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0);
  return { income, expense, count: txns.length };
}
function fmt(n) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function Transactions() {
  const { 
    role, 
    transactions,
    processedTransactions,
    search, setSearch,
    category, setCategory,
    typeFilter, setTypeFilter,
    sortConfig, hasFilters, resetFilters,
    openAdd, exportCSV, isLoading
  } = useFinance();

  const summary = useMemo(() => calcSummary(processedTransactions), [processedTransactions]);

  if (isLoading) return <PageLoader />;

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* ── Page header ─────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-600 mb-1">Finance</p>
          <div className="flex items-center gap-2 sm:gap-4">
            <h2 className="text-xl font-bold text-slate-100 tracking-tight">Transactions</h2>
            
            <div className="flex items-center gap-2">
              {transactions.length > 0 && (
                <button
                  onClick={exportCSV}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-lg transition-all active:scale-95"
                >
                  <Download size={14} />
                  Export
                </button>
              )}

              {role === 'Admin' && (
                <button
                  onClick={openAdd}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md shadow-indigo-900/40 transition-all active:scale-95"
                >
                  <Plus size={14} />
                  New
                </button>
              )}
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Browse, search and filter all your financial activity.
          </p>
        </div>

        {/* Summary strip */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-slate-600 font-semibold">Income</p>
            <p className="text-sm font-bold text-emerald-400">{fmt(summary.income)}</p>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-slate-600 font-semibold">Expenses</p>
            <p className="text-sm font-bold text-rose-400">{fmt(summary.expense)}</p>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-slate-600 font-semibold">Results</p>
            <p className="text-sm font-bold text-slate-300">{summary.count}</p>
          </div>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="bg-[#0d1117] border border-slate-800/70 rounded-2xl py-24 flex flex-col items-center justify-center text-center shadow-xl animate-fade-in mt-6">
          <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4 border border-slate-700/50">
            <LayoutList size={28} className="text-slate-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-100 mb-2">No Transactions Yet</h3>
          <p className="text-sm text-slate-500 max-w-sm">
            You don't have any transaction history. Start adding transactions to manage your finance records.
          </p>
        </div>
      ) : (
        <div className="space-y-5 animate-fade-in">
          {/* ── Filter bar ──────────────────────────────────────────── */}
          <div className="bg-[#0d1117] border border-slate-800/70 rounded-2xl p-4 space-y-3">
            {/* Row 1: Search + clear */}
            <div className="flex gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name or category…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/60 focus:bg-slate-800 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                <X size={13} />
              </button>
            )}
          </div>
          {hasFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 border border-slate-700/50 hover:border-slate-600 rounded-xl transition-all whitespace-nowrap"
            >
              <X size={12} /> Clear
            </button>
          )}
        </div>

        {/* Row 2: Category chips + Type toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5 flex-1">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-600 shrink-0">Category</span>
            <div className="flex gap-1.5">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={clsx(
                    'px-3 py-1.5 rounded-lg text-[11px] font-semibold border whitespace-nowrap transition-all duration-150',
                    category === cat
                      ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/35 shadow-sm shadow-indigo-900/30'
                      : 'text-slate-500 border-slate-700/40 hover:text-slate-300 hover:border-slate-600'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">Type</span>
            <div className="flex items-center bg-slate-800/60 border border-slate-700/50 rounded-xl p-0.5 gap-0.5">
              {TYPES.map(t => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={clsx(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-150',
                    typeFilter === t
                      ? 'bg-[#0d1117] text-slate-200 border border-slate-700/60 shadow-sm'
                      : 'text-slate-500 hover:text-slate-300'
                  )}
                >
                  {TYPE_ICONS[t]}
                  {TYPE_LABELS[t]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Sort hint bar ────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs text-slate-600">
          {processedTransactions.length > 0
            ? <><span className="text-slate-400 font-medium">{processedTransactions.length}</span> result{processedTransactions.length !== 1 ? 's' : ''} — click <span className="text-indigo-400 font-medium">Date</span> or <span className="text-indigo-400 font-medium">Amount</span> column headers to sort</>
            : 'No results match your filters'
          }
        </p>
        <p className="text-xs text-slate-600">
          Sorted by <span className="text-slate-400 font-medium capitalize">{sortConfig.field}</span>{' '}
          {sortConfig.dir === 'asc' ? '↑' : '↓'}
        </p>
      </div>

      {TransactionsTable && <TransactionsTable transactions={processedTransactions} />}
        </div>
      )}
    </div>
  );
}
