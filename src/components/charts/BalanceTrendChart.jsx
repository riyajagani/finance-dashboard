import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
} from 'recharts';
import { balanceTrend } from '../../data/mockData';

const CustomDot = (props) => {
  const { cx, cy, index, data } = props;
  if (index !== data.length - 1) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={6} fill="#6366f1" stroke="#0d1117" strokeWidth={2} />
      <circle cx={cx} cy={cy} r={10} fill="#6366f1" fillOpacity={0.2} />
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#161b22] border border-slate-700/80 rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-[11px] text-slate-500 mb-1.5 font-medium">{label}</p>
      <p className="text-base font-bold text-indigo-400">
        ${payload[0].value.toLocaleString()}
      </p>
      <p className="text-[11px] text-slate-600 mt-0.5">Account balance</p>
    </div>
  );
};

export default function BalanceTrendChart() {
  const min = Math.min(...balanceTrend.map(d => d.balance));
  const max = Math.max(...balanceTrend.map(d => d.balance));
  const yMin = Math.floor((min * 0.98) / 1000) * 1000;
  const yMax = Math.ceil((max * 1.01) / 1000) * 1000;

  return (
    <div className="bg-[#0d1117] border border-slate-800/70 rounded-2xl p-5 shadow-xl shadow-black/30">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-[15px] font-semibold text-slate-100">Balance Trend</h3>
          <p className="text-xs text-slate-500 mt-0.5">March 2026 — daily snapshot</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-6 h-0.5 rounded bg-indigo-500 inline-block" />
            Balance
          </span>
          <div className="bg-emerald-400/10 text-emerald-400 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-emerald-400/20">
            +$24,480
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={230}>
        <AreaChart
          data={balanceTrend}
          margin={{ top: 10, right: 8, left: -10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#6366f1" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0}    />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />

          <XAxis
            dataKey="date"
            tick={{ fill: '#475569', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            interval={2}
          />
          <YAxis
            domain={[yMin, yMax]}
            tick={{ fill: '#475569', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#334155', strokeWidth: 1, strokeDasharray: '4 2' }} />

          <Area
            type="monotoneX"
            dataKey="balance"
            stroke="#6366f1"
            strokeWidth={2.5}
            fill="url(#balanceGrad)"
            dot={false}
            activeDot={{ r: 5, fill: '#6366f1', stroke: '#0d1117', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
