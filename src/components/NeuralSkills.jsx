import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { skills } from "../data/skills";

// Convert percentage positions to pixel positions
const getPixelPos = (xPct, yPct, w, h) => ({
  x: (xPct / 100) * w,
  y: (yPct / 100) * h,
});

const NeuralSkills = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.2);
  const svgRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [dimensions, setDimensions] = useState({ w: 800, h: 450 });

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        setDimensions({ w: rect.width || 800, h: rect.height || 450 });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Animate nodes when visible
  useEffect(() => {
    if (isVisible && svgRef.current) {
      const circles = svgRef.current.querySelectorAll(".skill-node");
      gsap.fromTo(
        circles,
        { scale: 0, opacity: 0, transformOrigin: "center center" },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "back.out(1.7)",
        },
      );
    }
  }, [isVisible]);

  const { w, h } = dimensions;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020409] via-[#040812] to-[#020409]" />
      <div className="absolute inset-0 cyber-grid-bg opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-label mb-3">◈ MODULE_02 / NEURAL INTERFACE</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Skill <span style={{ color: "#00d4ff" }}>Matrix</span>
          </h2>
          <p className="text-[#94a3b8] max-w-xl mx-auto font-mono text-sm">
            Interactive neural network visualization. Hover nodes to explore
            capabilities.
          </p>
        </motion.div>

        {/* Neural Network SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card p-6 mb-10 relative overflow-hidden"
          style={{ minHeight: "450px" }}
        >
          <svg
            ref={svgRef}
            className="w-full"
            style={{ height: "450px" }}
            viewBox={`0 0 ${w} ${h}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Connection lines */}
            {skills.map((skill) =>
              skill.connections.map((targetId) => {
                if (targetId <= skill.id) return null;
                const target = skills[targetId];
                const from = getPixelPos(skill.x, skill.y, w, h);
                const to = getPixelPos(target.x, target.y, w, h);
                const isHovered =
                  hoveredSkill === skill.id || hoveredSkill === targetId;
                return (
                  <motion.line
                    key={`${skill.id}-${targetId}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={isHovered ? skill.color : "rgba(0,212,255,0.15)"}
                    strokeWidth={isHovered ? 1.5 : 0.8}
                    strokeDasharray={isHovered ? "none" : "4 4"}
                    animate={{
                      opacity: isHovered ? 1 : 0.4,
                      strokeDashoffset: [0, -20],
                    }}
                    transition={{
                      strokeDashoffset: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      },
                    }}
                  />
                );
              }),
            )}

            {/* Nodes */}
            {skills.map((skill) => {
              const pos = getPixelPos(skill.x, skill.y, w, h);
              const isHovered = hoveredSkill === skill.id;
              return (
                <g
                  key={skill.id}
                  className="skill-node"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHoveredSkill(skill.id)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {/* Glow ring */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isHovered ? 30 : 22}
                    fill={skill.color}
                    opacity={isHovered ? 0.15 : 0.07}
                    style={{ transition: "all 0.3s ease" }}
                  />
                  {/* Main circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isHovered ? 20 : 16}
                    fill={`${skill.color}22`}
                    stroke={skill.color}
                    strokeWidth={isHovered ? 2 : 1.5}
                    style={{ transition: "all 0.3s ease" }}
                  />
                  {/* Center dot */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={4}
                    fill={skill.color}
                    opacity={isHovered ? 1 : 0.7}
                  />

                  {/* Node label */}
                  <text
                    x={pos.x}
                    y={pos.y + 34}
                    textAnchor="middle"
                    fill={isHovered ? skill.color : "#94a3b8"}
                    fontSize={isHovered ? 12 : 10}
                    fontFamily="JetBrains Mono, monospace"
                    style={{ transition: "all 0.3s ease", userSelect: "none" }}
                  >
                    {skill.name}
                  </text>

                  {/* Tooltip on hover */}
                  {isHovered && (
                    <g>
                      <rect
                        x={pos.x - 80}
                        y={pos.y - 72}
                        width={160}
                        height={52}
                        rx={6}
                        fill="#0a0f1e"
                        stroke={skill.color}
                        strokeWidth={1}
                        opacity={0.95}
                      />
                      <text
                        x={pos.x}
                        y={pos.y - 52}
                        textAnchor="middle"
                        fill={skill.color}
                        fontSize={11}
                        fontFamily="JetBrains Mono, monospace"
                        fontWeight="bold"
                      >
                        {skill.name} – {skill.level}%
                      </text>
                      <text
                        x={pos.x}
                        y={pos.y - 34}
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize={9}
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {skill.category}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* Skill bars */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.06 }}
              className="glass-card p-4 glass-card-hover group"
              onMouseEnter={() => setHoveredSkill(skill.id)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-xs font-semibold text-white group-hover:text-[#00d4ff] transition-colors">
                  {skill.name}
                </span>
                <span
                  className="font-mono text-xs"
                  style={{ color: skill.color }}
                >
                  {skill.level}%
                </span>
              </div>
              <div className="h-1 bg-[#1a2744] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(to right, ${skill.color}, ${skill.color}88)`,
                  }}
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: `${skill.level}%` } : {}}
                  transition={{
                    duration: 1,
                    delay: 0.5 + i * 0.06,
                    ease: "easeOut",
                  }}
                />
              </div>
              <span className="text-xs text-[#64748b] font-mono mt-1 block">
                {skill.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NeuralSkills;
