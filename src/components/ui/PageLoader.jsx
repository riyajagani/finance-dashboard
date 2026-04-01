import { Loader2 } from 'lucide-react';

export default function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 animate-fade-in">
      <div className="p-3 bg-slate-800/40 border border-slate-700/50 rounded-2xl shadow-xl shadow-black/20">
        <Loader2 size={24} className="text-indigo-400 animate-spin" />
      </div>
      <p className="text-sm font-medium text-slate-400 animate-pulse">Loading data...</p>
    </div>
  );
}
