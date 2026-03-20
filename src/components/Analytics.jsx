import { motion } from "framer-motion";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import ControlRoom from "../scenes/ControlRoom";

// Mock data
const radarData = [
  { subject: "AI/ML", value: 85 },
  { subject: "Frontend", value: 90 },
  { subject: "Backend", value: 78 },
  {
    subject: "DevOps",
    get value() {
      return 75;
    },
  },
  { subject: "Database", value: 82 },
  { subject: "Systems", value: 72 },
];

const activityData = [
  { month: "Oct", commits: 42 },
  { month: "Nov", commits: 67 },
  { month: "Dec", commits: 38 },
  { month: "Jan", commits: 85 },
  { month: "Feb", commits: 73 },
  { month: "Mar", commits: 91 },
];

const techData = [
  { name: "Python", hours: 340 },
  { name: "React", hours: 280 },
  { name: "Java", hours: 180 },
  { name: "SQL", hours: 120 },
  { name: "CSS", hours: 90 },
];

const STATS = [
  {
    label: "Total Projects",
    value: "03",
    sub: "DEPLOYED",
    color: "#00d4ff",
    icon: "◈",
  },
  {
    label: "Technologies",
    value: "10+",
    sub: "MASTERED",
    color: "#7b2eff",
    icon: "⚡",
  },
  {
    label: "GitHub Streak",
    value: "76",
    sub: "COMMITS/MO",
    color: "#00ff88",
    icon: "🔥",
  },
  {
    label: "Certifications",
    value: "05+",
    sub: "EARNED",
    color: "#ff6b35",
    icon: "🏆",
  },
];

// Custom recharts tooltip
const CyberTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card px-3 py-2 font-mono text-xs">
        <p className="text-[#00d4ff]">{label}</p>
        <p className="text-white">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const Analytics = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section
      id="analytics"
      ref={ref}
      className="relative py-24 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#040812] via-[#020409] to-[#040812]" />
      <div className="absolute inset-0 cyber-grid-bg opacity-15" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">◈ MODULE_05 / SYSTEM ANALYTICS</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Data <span style={{ color: "#ff6b35" }}>Dashboard</span>
          </h2>
          <p className="text-[#94a3b8] font-mono text-sm">
            Real-time system metrics and performance analytics.
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-5 glass-card-hover text-center"
              style={{ borderColor: `${stat.color}20` }}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div
                className="font-mono text-3xl font-black mb-1"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-white text-sm font-semibold">
                {stat.label}
              </div>
              <div className="text-xs font-mono text-[#64748b] mt-1">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Radar chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h3 className="font-mono text-xs text-[#00d4ff] tracking-widest mb-4">
              ◈ SKILL RADAR
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(0,212,255,0.15)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 10,
                    fontFamily: "JetBrains Mono",
                  }}
                />
                <Radar
                  name="Skills"
                  dataKey="value"
                  stroke="#00d4ff"
                  fill="#00d4ff"
                  fillOpacity={0.15}
                  strokeWidth={1.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* ControlRoom 3D */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 flex flex-col"
          >
            <h3 className="font-mono text-xs text-[#7b2eff] tracking-widest mb-4">
              ◈ NEURAL CORE 3D
            </h3>
            <div className="flex-1">
              <ControlRoom />
            </div>
          </motion.div>

          {/* Tech hours bar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h3 className="font-mono text-xs text-[#00ff88] tracking-widest mb-4">
              ◈ TECH USAGE HRS
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={techData} layout="vertical">
                <XAxis
                  type="number"
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 9,
                    fontFamily: "JetBrains Mono",
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 9,
                    fontFamily: "JetBrains Mono",
                  }}
                  axisLine={false}
                  tickLine={false}
                  width={45}
                />
                <Tooltip content={<CyberTooltip />} />
                <Bar
                  dataKey="hours"
                  fill="#00ff88"
                  fillOpacity={0.8}
                  radius={[0, 3, 3, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Activity area chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="glass-card p-6"
        >
          <h3 className="font-mono text-xs text-[#ff6b35] tracking-widest mb-6">
            ◈ GITHUB ACTIVITY — LAST 6 MONTHS
          </h3>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="commitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff6b35" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ff6b35" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                tick={{
                  fill: "#94a3b8",
                  fontSize: 10,
                  fontFamily: "JetBrains Mono",
                }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{
                  fill: "#94a3b8",
                  fontSize: 10,
                  fontFamily: "JetBrains Mono",
                }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CyberTooltip />} />
              <Area
                type="monotone"
                dataKey="commits"
                stroke="#ff6b35"
                fill="url(#commitGrad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  );
};

export default Analytics;
