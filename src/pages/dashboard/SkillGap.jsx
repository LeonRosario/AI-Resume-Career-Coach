import { useState } from "react";
import RoleSelector from "../../components/dashboard/RoleSelector";
import SkillAnalysis from "../../components/dashboard/SkillAnalysis";
import { roadmapData, roleOptions, getRoleData } from "../../data/roadmapData";

export default function SkillGap() {
  const [role, setRole] = useState(roadmapData.defaultRole);
  const roleData = getRoleData(role);

  return (
    <div className="space-y-6">
      <RoleSelector role={role} options={roleOptions} onChange={setRole} />
      <SkillAnalysis role={role} roleData={roleData} />
    </div>
  );
}
