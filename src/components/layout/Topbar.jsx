import { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, Menu, Check, Sun, Moon } from 'lucide-react';
import clsx from 'clsx';
import { useFinance } from '../../context/FinanceContext';

const ROLES = ['Admin', 'Viewer'];

export default function Topbar({ onMobileMenuOpen, pageTitle }) {
  const { role, setRole, theme, toggleTheme } = useFinance();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="h-[60px] flex items-center px-4 md:px-6 border-b border-slate-800/70 bg-[#0d1117]/80 backdrop-blur-sm sticky top-0 z-20">
      {/* Left: hamburger + page title */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={onMobileMenuOpen}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
        >
          <Menu size={18} />
        </button>
        <div>
          <h1 className="text-[15px] font-semibold text-slate-100 leading-tight">{pageTitle}</h1>
          <p className="text-xs text-slate-500 leading-tight hidden sm:block">Welcome back, James</p>
        </div>
      </div>

      {/* Right: notification + role switcher + avatar */}
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        
        {/* Theme switcher */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Notification bell */}
        <button className="relative p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400" />
        </button>

        {/* Role switcher dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(o => !o)}
            className={clsx(
              'flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm font-medium transition-all duration-200',
              'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:border-slate-600 hover:text-slate-100'
            )}
          >
            <span className={clsx(
              'w-1.5 h-1.5 rounded-full shrink-0',
              role === 'Admin' ? 'bg-indigo-400' : 'bg-amber-400'
            )} />
            {role}
            <ChevronDown size={13} className={clsx('text-slate-500 transition-transform duration-200', dropdownOpen && 'rotate-180')} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-[#161b22] border border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-fade-in">
              {ROLES.map(r => (
                <button
                  key={r}
                  onClick={() => { setRole(r); setDropdownOpen(false); }}
                  className="flex items-center justify-between w-full px-3.5 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-slate-100 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className={clsx('w-1.5 h-1.5 rounded-full', r === 'Admin' ? 'bg-indigo-400' : 'bg-amber-400')} />
                    {r}
                  </span>
                  {role === r && <Check size={12} className="text-indigo-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-[11px] font-bold text-white cursor-pointer ring-2 ring-transparent hover:ring-indigo-500/40 transition-all">
          JD
        </div>
      </div>
    </header>
  );
}
