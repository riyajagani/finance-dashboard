import { useEffect } from 'react';
import { CheckCircle2, Trash2, X } from 'lucide-react';
import clsx from 'clsx';

export default function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onDismiss, 3200);
    return () => clearTimeout(t);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className={clsx(
        'flex items-center gap-3 px-4 py-3.5 rounded-2xl border shadow-2xl shadow-black/50 min-w-[260px]',
        toast.type === 'error'
          ? 'bg-rose-950/80 border-rose-800/60 backdrop-blur-md'
          : toast.type === 'warning'
          ? 'bg-amber-950/80 border-amber-800/60 backdrop-blur-md'
          : 'bg-emerald-950/80 border-emerald-800/60 backdrop-blur-md'
      )}>
        {toast.type === 'error'
          ? <Trash2 size={16} className="text-rose-400 shrink-0" />
          : <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
        }
        <p className="text-sm font-medium text-slate-200 flex-1">{toast.message}</p>
        <button
          onClick={onDismiss}
          className="text-slate-500 hover:text-slate-300 transition-colors"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
}
