import { useState, useEffect } from 'react';
import {
  ArrowUpRight, ArrowDownLeft,
  ChevronLeft, ChevronRight,
  ChevronsUpDown, ArrowUp, ArrowDown,
  ReceiptText, Edit2, Trash2,
} from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import clsx from 'clsx';
import { useFinance } from '../../context/FinanceContext';

const PAGE_SIZE = 8;

const avatarColors = [
  'from-indigo-500 to-violet-600',
  'from-cyan-500 to-blue-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
  'from-purple-500 to-indigo-600',
];
function getAvatarColor(initials) {
  return avatarColors[initials.charCodeAt(0) % avatarColors.length];
}
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}
function formatAmount(amount) {
  const abs = Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2, maximumFractionDigits: 2,
  });
  return amount >= 0 ? `+$${abs}` : `-$${abs}`;
}

// ── Sortable column header ────────────────────────────────────────
function SortableHeader({ label, field, sortConfig, onSort, className = '' }) {
  const active = sortConfig.field === field;
  const Icon = active
    ? sortConfig.dir === 'asc' ? ArrowUp : ArrowDown
    : ChevronsUpDown;

  return (
    <th
      onClick={() => onSort(field)}
      className={clsx(
        'px-5 py-3.5 text-[11px] font-semibold uppercase tracking-widest select-none cursor-pointer group',
        'transition-colors duration-150',
        active ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300',
        className
      )}
    >
      <span className="flex items-center gap-1.5">
        {label}
        <Icon
          size={11}
          className={clsx(
            'transition-all duration-150',
            active ? 'text-indigo-400' : 'text-slate-600 group-hover:text-slate-400'
          )}
        />
      </span>
    </th>
  );
}

// ── Empty state ───────────────────────────────────────────────────
function EmptyState({ hasFilters, onReset }) {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center">
        <ReceiptText size={28} className="text-slate-600" />
      </div>
      <div>
        <p className="text-slate-300 font-semibold text-[15px]">No transactions found</p>
        <p className="text-slate-600 text-sm mt-1">
          {hasFilters
            ? 'No results match your current filters.'
            : 'There are no transactions to display right now.'}
        </p>
      </div>
      {hasFilters && (
        <button
          onClick={onReset}
          className="mt-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 hover:border-indigo-400/50 px-4 py-2 rounded-xl transition-all"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────
export default function TransactionsTable({ transactions }) {
  const { 
    sortConfig, setSort: onSort, 
    hasFilters, resetFilters: onReset, 
    role, openEdit: onEdit, openDelete: onDelete 
  } = useFinance();
  
  const [page, setPage] = useState(1);

  // Reset to page 1 whenever the data changes (filter/sort)
  useEffect(() => { setPage(1); }, [transactions]);

  const totalPages = Math.ceil(transactions.length / PAGE_SIZE);
  const paginated = transactions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const start = transactions.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const end   = Math.min(page * PAGE_SIZE, transactions.length);

  // Income/expense badge
  const TypeBadge = ({ type }) => (
    <span className={clsx(
      'inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-semibold',
      type === 'income'
        ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
        : 'text-rose-400 bg-rose-400/10 border-rose-400/20'
    )}>
      {type === 'income'
        ? <ArrowUpRight size={10} />
        : <ArrowDownLeft size={10} />
      }
      {type === 'income' ? 'Income' : 'Expense'}
    </span>
  );

  return (
    <div className="bg-[#0d1117] border border-slate-800/70 rounded-2xl shadow-xl shadow-black/30 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">

          {/* ── Sticky header ──────────────────────────────────── */}
          <thead className="sticky top-0 z-10 bg-[#0d1117] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-slate-800/70">
            <tr>
              <th className="text-left px-5 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                Merchant
              </th>
              <th className="text-left px-5 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500 hidden md:table-cell">
                Category
              </th>
              <th className="text-left px-5 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500 hidden lg:table-cell">
                Type
              </th>
              <SortableHeader
                label="Date"
                field="date"
                sortConfig={sortConfig}
                onSort={onSort}
                className="hidden sm:table-cell text-left"
              />
              <th className="text-left px-5 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500 hidden sm:table-cell">
                Status
              </th>
              <SortableHeader
                label="Amount"
                field="amount"
                sortConfig={sortConfig}
                onSort={onSort}
                className="text-right"
              />
              {role === 'Admin' && (
                <th className="text-right px-5 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* ── Body ───────────────────────────────────────────── */}
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={role === 'Admin' ? 7 : 6}>
                  <EmptyState hasFilters={hasFilters} onReset={onReset} />
                </td>
              </tr>
            ) : (
              paginated.map((txn) => (
                <tr
                  key={txn.id}
                  className="border-b border-slate-800/40 last:border-0 hover:bg-slate-800/25 transition-colors duration-150"
                >
                  {/* Merchant */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={clsx(
                        'w-8 h-8 rounded-xl bg-gradient-to-br flex items-center justify-center',
                        'text-[10px] font-bold text-white shrink-0',
                        getAvatarColor(txn.avatar)
                      )}>
                        {txn.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-200 leading-tight truncate max-w-[160px]">
                          {txn.name}
                        </p>
                        <p className="text-xs text-slate-600 md:hidden">{txn.category}</p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <span className="text-xs font-medium text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-full border border-slate-700/40 whitespace-nowrap">
                      {txn.category}
                    </span>
                  </td>

                  {/* Type */}
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    <TypeBadge type={txn.type} />
                  </td>

                  {/* Date */}
                  <td className="px-5 py-3.5 text-sm text-slate-500 whitespace-nowrap hidden sm:table-cell">
                    {formatDate(txn.date)}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-3.5 hidden sm:table-cell">
                    <StatusBadge status={txn.status} />
                  </td>

                  {/* Amount */}
                  <td className="px-5 py-3.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      {txn.amount >= 0
                        ? <ArrowUpRight size={13} className="text-emerald-400 shrink-0" />
                        : <ArrowDownLeft size={13} className="text-rose-400 shrink-0" />
                      }
                      <span className={clsx(
                        'text-sm font-semibold tabular-nums',
                        txn.amount >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      )}>
                        {formatAmount(txn.amount)}
                      </span>
                    </div>
                  </td>

                  {/* Actions (Admin Only) */}
                  {role === 'Admin' && (
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEdit(txn)}
                          className="p-1.5 text-slate-500 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors"
                          title="Edit Transaction"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => onDelete(txn.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                          title="Delete Transaction"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ─────────────────────────────────────────── */}
      {transactions.length > 0 && (
        <div className="border-t border-slate-800/50 px-5 py-3 flex items-center justify-between gap-4">
          <p className="text-xs text-slate-500 shrink-0">
            {start}–{end} of <span className="text-slate-400 font-medium">{transactions.length}</span> transactions
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={clsx(
                  'w-7 h-7 rounded-lg text-xs font-medium transition-all duration-150',
                  p === page
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50'
                    : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800'
                )}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
