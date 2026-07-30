import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import AtsScoreChart from "./AtsScoreChart";
import SkillGapChart from "./SkillGapChart";
import JobMatchAnalytics from "./JobMatchAnalytics";
import ApplicationActivity from "./ApplicationActivity";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export default function CareerAnalytics() {
  return (
    <motion.div variants={fadeUp}>
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
          <BarChart3 size={15} className="text-indigo-600" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900">Career Analytics</h2>
          <p className="text-xs text-gray-500">Performance trends and skill insights</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <AtsScoreChart />
        <SkillGapChart />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <JobMatchAnalytics />
        <ApplicationActivity />
      </div>
    </motion.div>
  );
}
