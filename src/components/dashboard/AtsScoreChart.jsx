import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import { TrendingUp } from "lucide-react";

const DEFAULT_DATA = [
  { version: "V1", score: 62, label: "Initial" },
  { version: "V2", score: 71, label: "Improved" },
  { version: "V3", score: 78, label: "Optimized" },
  { version: "V4", score: 86, label: "Polished" },
];

function TooltipContent({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 px-3 py-2 rounded-xl text-xs shadow-card-lg">
      <p className="text-gray-500 font-medium">{label}</p>
      <p className="text-indigo-600 font-bold text-sm">{payload[0].value}/100</p>
    </div>
  );
}

export default function AtsScoreChart({ data = DEFAULT_DATA, currentScore = 86 }) {
  const first = data[0]?.score || 0;
  const last = data[data.length - 1]?.score || 0;
  const improvement = last - first;
  const pct = first > 0 ? Math.round((improvement / first) * 100) : 0;
  const isPositive = improvement >= 0;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
            <TrendingUp size={15} className="text-indigo-600" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">ATS Score Progress</h3>
            <p className="text-xs text-gray-500">Score across resume versions</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900 tabular-nums">{currentScore}</p>
            <p className="text-xs text-gray-500">current</p>
          </div>
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${isPositive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
            <TrendingUp size={12} strokeWidth={2.5} />
            {isPositive ? "+" : ""}{pct}%
          </div>
        </div>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
            <defs>
              <linearGradient id="atsGradientAnalytics" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366F1" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#6366F1" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" horizontal vertical={false} />
            <XAxis dataKey="version" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <Tooltip content={<TooltipContent />} cursor={{ stroke: "rgba(99,102,241,0.12)", strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#6366F1"
              strokeWidth={2.5}
              fill="url(#atsGradientAnalytics)"
              dot={{ r: 4, fill: "#6366F1", stroke: "#fff", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "#6366F1", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
