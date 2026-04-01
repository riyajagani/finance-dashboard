import clsx from 'clsx';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  transactions: 'Transactions',
  insights: 'Insights',
};

export default function Layout({
  activePage,
  onNavigate,
  collapsed,
  onToggle,
  mobileOpen,
  onOpenMobile,
  onCloseMobile,
  children
}) {
  return (
    <div className="min-h-screen bg-[#080d14]">
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        collapsed={collapsed}
        onToggle={onToggle}
        mobileOpen={mobileOpen}
        onCloseMobile={onCloseMobile}
      />

      {/* Main content area — offset by sidebar width */}
      <div className={clsx(
        'transition-all duration-300 ease-in-out flex flex-col min-h-screen',
        collapsed ? 'lg:ml-[68px]' : 'lg:ml-60'
      )}>
        <Topbar
          onMobileMenuOpen={onOpenMobile}
          pageTitle={PAGE_TITLES[activePage]}
        />

        <main className="flex-1 p-4 md:p-6 animate-slide-up">
          {children}
        </main>

        <footer className="border-t border-slate-800/40 px-6 py-3 flex items-center justify-between">
          <span className="text-xs text-slate-600">© 2026 Zorvyn Finance. All rights reserved.</span>
          <span className="text-xs text-slate-700">v1.0.0</span>
        </footer>
      </div>
    </div>
  );
}
