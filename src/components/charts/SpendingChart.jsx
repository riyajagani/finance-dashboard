import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { spendingData } from '../../data/mockData';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0].payload;
  return (
    <div className="bg-[#161b22] border border-slate-700 rounded-xl px-4 py-2.5 shadow-2xl">
      <p className="text-xs text-slate-400">{name}</p>
      <p className="text-sm font-bold text-slate-100">{value}%</p>
    </div>
  );
};

export default function SpendingChart() {
  return (
    <div className="bg-[#0d1117] border border-slate-800/70 rounded-2xl p-5 shadow-xl shadow-black/30">
      <div className="mb-5">
        <h3 className="text-[15px] font-semibold text-slate-100">Spending Breakdown</h3>
        <p className="text-xs text-slate-500 mt-0.5">By category — March 2026</p>
      </div>

      <div className="flex items-center gap-4">
        <ResponsiveContainer width={120} height={120}>
          <PieChart>
            <Pie
              data={spendingData}
              cx="50%"
              cy="50%"
              innerRadius={35}
              outerRadius={54}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {spendingData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex-1 space-y-2">
          {spendingData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-slate-400 flex-1 truncate">{item.name}</span>
              <span className="text-xs font-semibold text-slate-300">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
