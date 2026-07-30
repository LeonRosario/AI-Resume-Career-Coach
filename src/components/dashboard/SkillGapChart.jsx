import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import { BarChart3 } from "lucide-react";

const DEFAULT_DATA = [
  { skill: "React", current: 90, required: 92 },
  { skill: "Python", current: 75, required: 85 },
  { skill: "SQL", current: 60, required: 80 },
  { skill: "AWS", current: 35, required: 75 },
  { skill: "Docker", current: 45, required: 70 },
];

function TooltipContent({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 px-3 py-2 rounded-xl text-xs shadow-card-lg">
      <p className="text-gray-500 font-medium mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="font-semibold text-sm" style={{ color: p.color || p.fill }}>
          {p.name}: {p.value}%
        </p>
      ))}
    </div>
  );
}

function CustomBarShape(props) {
  const { x, y, width, height, fill } = props;
  return <rect x={x} y={y} width={width} height={height} rx={4} ry={4} fill={fill} />;
}

export default function SkillGapChart({ data = DEFAULT_DATA }) {
  const gaps = data.filter((d) => d.current < d.required);
  const needsWork = gaps.length;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
            <BarChart3 size={15} className="text-indigo-600" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Skill Gap Analysis</h3>
            <p className="text-xs text-gray-500">Current vs target proficiency</p>
          </div>
        </div>
        {needsWork > 0 && (
          <div className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
            {needsWork} skill{needsWork > 1 ? "s" : ""} need{needsWork === 1 ? "s" : ""} improvement
          </div>
        )}
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 16, bottom: 0, left: 0 }}
            barGap={4}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" horizontal={false} vertical />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="skill" tick={{ fontSize: 12, fill: "#374151", fontWeight: 500 }} axisLine={false} tickLine={false} width={65} />
            <Tooltip content={<TooltipContent />} cursor={{ fill: "rgba(99,102,241,0.04)" }} />
            <Bar dataKey="required" name="Required" shape={<CustomBarShape />} fill="#C7D2FE" />
            <Bar dataKey="current" name="Current" shape={<CustomBarShape />} fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-indigo-500" />
          <span className="text-xs text-gray-500">Current</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-indigo-200" />
          <span className="text-xs text-gray-500">Required</span>
        </div>
      </div>
    </div>
  );
}
