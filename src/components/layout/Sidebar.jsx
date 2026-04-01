import {
  LayoutDashboard,
  ArrowLeftRight,
  BarChart3,
  Zap,
  ChevronLeft,
  ChevronRight,
  Settings,
} from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { id: 'dashboard',    label: 'Dashboard',    Icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', Icon: ArrowLeftRight  },
  { id: 'insights',     label: 'Insights',     Icon: BarChart3       },
];

export default function Sidebar({ activePage, onNavigate, collapsed, onToggle, mobileOpen, onCloseMobile }) {
  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={clsx(
          'fixed top-0 left-0 h-full z-40 flex flex-col',
          'bg-[#0d1117] border-r border-slate-800/70',
          'transition-all duration-300 ease-in-out',
          collapsed ? 'w-[68px]' : 'w-60',
          'lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo row */}
        <div className={clsx(
          'flex items-center h-[60px] border-b border-slate-800/70 px-4 shrink-0',
          collapsed ? 'justify-center' : 'justify-between'
        )}>
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/50 shrink-0">
              <Zap size={14} className="text-white" />
            </div>
            {!collapsed && (
              <span className="font-bold text-slate-100 tracking-tight text-[15px]">Zorvyn</span>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={onToggle}
              className="hidden lg:flex w-5 h-5 items-center justify-center rounded-md text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft size={13} />
            </button>
          )}
        </div>

        {/* Expand toggle when collapsed */}
        {collapsed && (
          <button
            onClick={onToggle}
            className="hidden lg:flex mx-auto mt-2 w-7 h-7 items-center justify-center rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
          >
            <ChevronRight size={13} />
          </button>
        )}

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-5 px-2 space-y-0.5">
          {!collapsed && (
            <p className="px-2 mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-600 select-none">
              Main Menu
            </p>
          )}
          {navItems.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => { onNavigate(id); onCloseMobile(); }}
              title={collapsed ? label : undefined}
              className={clsx(
                'flex items-center gap-3 w-full rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer',
                collapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5',
                activePage === id
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/25'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              )}
            >
              <Icon size={17} className="shrink-0" />
              {!collapsed && <span>{label}</span>}
              {!collapsed && activePage === id && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
              )}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="border-t border-slate-800/70 px-2 py-4 shrink-0 space-y-1">
          <button
            className={clsx(
              'flex items-center gap-3 w-full rounded-xl text-sm font-medium text-slate-400',
              'hover:text-slate-100 hover:bg-slate-800/60 transition-all duration-200',
              collapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5'
            )}
            title={collapsed ? 'Settings' : undefined}
          >
            <Settings size={17} className="shrink-0" />
            {!collapsed && <span>Settings</span>}
          </button>

          {!collapsed && (
            <div className="mt-3 flex items-center gap-3 px-2 py-2 rounded-xl bg-slate-800/40 border border-slate-800/70">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
                JD
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-100 truncate leading-tight">James Doe</p>
                <p className="text-xs text-slate-500 truncate">james@zorvyn.io</p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
