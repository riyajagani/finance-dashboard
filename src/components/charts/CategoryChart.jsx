import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { categorySpending } from '../../data/mockData';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, amount, color } = payload[0].payload;
  const total = categorySpending.reduce((s, d) => s + d.amount, 0);
  return (
    <div className="bg-[#161b22] border border-slate-700/80 rounded-xl px-4 py-3 shadow-2xl">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="w-2 h-2 rounded-full" style={{ background: color }} />
        <span className="text-xs text-slate-400 font-medium">{name}</span>
      </div>
      <p className="text-base font-bold text-slate-100">${amount.toLocaleString()}</p>
      <p className="text-[11px] text-slate-600 mt-0.5">{((amount / total) * 100).toFixed(1)}% of total</p>
    </div>
  );
};

const CustomBarLabel = ({ x, y, width, value }) => (
  <text
    x={x + width / 2}
    y={y - 6}
    textAnchor="middle"
    fontSize={10}
    fill="#64748b"
    fontWeight={600}
  >
    ${(value / 1000).toFixed(1)}k
  </text>
);

export default function CategoryChart() {
  const total = categorySpending.reduce((s, d) => s + d.amount, 0);

  return (
    <div className="bg-[#0d1117] border border-slate-800/70 rounded-2xl p-5 shadow-xl shadow-black/30">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-[15px] font-semibold text-slate-100">Spending by Category</h3>
          <p className="text-xs text-slate-500 mt-0.5">March 2026 — total ${total.toLocaleString()}</p>
        </div>
      </div>

      {/* Bar chart */}
      <ResponsiveContainer width="100%" height={185}>
        <BarChart
          data={categorySpending}
          margin={{ top: 20, right: 4, left: -20, bottom: 0 }}
          barSize={32}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: '#475569', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#475569', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar dataKey="amount" radius={[6, 6, 0, 0]} label={<CustomBarLabel />}>
            {categorySpending.map((entry, i) => (
              <Cell key={i} fill={entry.color} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend dots */}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
        {categorySpending.map(item => (
          <span key={item.name} className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: item.color }} />
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}
