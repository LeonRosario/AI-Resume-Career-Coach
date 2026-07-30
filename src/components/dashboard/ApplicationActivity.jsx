import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from "recharts";
import { Activity } from "lucide-react";

const DEFAULT_DATA = [
  { week: "W1", Applications: 8, Interviews: 3, Shortlisted: 5, Rejected: 2 },
  { week: "W2", Applications: 12, Interviews: 5, Shortlisted: 7, Rejected: 4 },
  { week: "W3", Applications: 6, Interviews: 2, Shortlisted: 4, Rejected: 1 },
  { week: "W4", Applications: 10, Interviews: 4, Shortlisted: 6, Rejected: 3 },
  { week: "W5", Applications: 14, Interviews: 6, Shortlisted: 9, Rejected: 5 },
];

const KEYS = [
  { key: "Applications", color: "#6366F1" },
  { key: "Interviews", color: "#8B5CF6" },
  { key: "Shortlisted", color: "#10B981" },
  { key: "Rejected", color: "#EF4444" },
];

function TooltipContent({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 px-3 py-2 rounded-xl text-xs shadow-card-lg">
      <p className="text-gray-500 font-medium mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-xs font-semibold" style={{ color: p.color }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
}

function CustomBarShape(props) {
  const { x, y, width, height, fill } = props;
  return <rect x={x} y={y} width={width} height={height} rx={3} ry={3} fill={fill} />;
}

function CustomLegend({ payload }) {
  if (!payload) return null;
  return (
    <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-gray-100">
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded" style={{ background: entry.color }} />
          <span className="text-xs text-gray-500">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function ApplicationActivity({ data = DEFAULT_DATA }) {
  const totals = data.reduce(
    (acc, d) => {
      KEYS.forEach((k) => { acc[k.key] = (acc[k.key] || 0) + d[k.key]; });
      return acc;
    },
    {}
  );

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
            <Activity size={15} className="text-indigo-600" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Application Activity</h3>
            <p className="text-xs text-gray-500">Weekly tracking overview</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 text-xs">
          {KEYS.map((k) => (
            <div key={k.key} className="text-center">
              <p className="font-bold text-gray-900 tabular-nums">{totals[k.key] || 0}</p>
              <p className="text-gray-400">{k.key}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }} barGap={2} barCategoryGap="15%">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" horizontal vertical={false} />
            <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <Tooltip content={<TooltipContent />} cursor={{ fill: "rgba(99,102,241,0.04)" }} />
            <Legend content={<CustomLegend />} />
            {KEYS.map((k) => (
              <Bar key={k.key} dataKey={k.key} name={k.key} shape={<CustomBarShape />} fill={k.color} stackId="a" />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
