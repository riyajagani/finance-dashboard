import clsx from 'clsx';

const statusConfig = {
  completed: { label: 'Completed', classes: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  pending:   { label: 'Pending',   classes: 'text-amber-400  bg-amber-400/10  border-amber-400/20'  },
  failed:    { label: 'Failed',    classes: 'text-red-400    bg-red-400/10    border-red-400/20'     },
};

export default function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.pending;
  return (
    <span className={clsx(
      'inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border',
      cfg.classes
    )}>
      <span className={clsx('w-1 h-1 rounded-full', {
        'bg-emerald-400': status === 'completed',
        'bg-amber-400':   status === 'pending',
        'bg-red-400':     status === 'failed',
      })} />
      {cfg.label}
    </span>
  );
}
