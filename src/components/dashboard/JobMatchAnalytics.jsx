import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell
} from "recharts";
import { Briefcase } from "lucide-react";

const DEFAULT_DATA = [
  { role: "Frontend Developer", match: 92 },
  { role: "Full Stack", match: 87 },
  { role: "Backend Engineer", match: 78 },
  { role: "Data Analyst", match: 74 },
  { role: "Product Engineer", match: 68 },
];

const BAR_FILLS = ["#6366F1", "#818CF8", "#A5B4FC", "#8B5CF6", "#C4B5FD"];

function TooltipContent({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 px-3 py-2 rounded-xl text-xs shadow-card-lg">
      <p className="text-gray-500 font-medium">{label}</p>
      <p className="text-indigo-600 font-bold text-sm">{payload[0].value}% match</p>
    </div>
  );
}

function CustomBarShape(props) {
  const { x, y, width, height, fill } = props;
  return <rect x={x} y={y} width={width} height={height} rx={6} ry={6} fill={fill} />;
}

export default function JobMatchAnalytics({ data = DEFAULT_DATA }) {
  const avg = data.length > 0
    ? Math.round(data.reduce((s, d) => s + d.match, 0) / data.length)
    : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
            <Briefcase size={15} className="text-indigo-600" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Job Match Analytics</h3>
            <p className="text-xs text-gray-500">Role compatibility scores</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900 tabular-nums">{avg}%</p>
          <p className="text-xs text-gray-500">avg match</p>
        </div>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }} barCategoryGap="25%">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" horizontal vertical={false} />
            <XAxis dataKey="role" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <Tooltip content={<TooltipContent />} cursor={{ fill: "rgba(99,102,241,0.04)" }} />
            <Bar dataKey="match" shape={<CustomBarShape />}>
              {data.map((entry, i) => (
                <Cell key={i} fill={BAR_FILLS[i % BAR_FILLS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
