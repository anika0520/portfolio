import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Cpu } from "lucide-react";
import MagneticButton from "./MagneticButton";

const STATUS_COLORS = {
  OPERATIONAL: "#00ff88",
  ACTIVE: "#00d4ff",
  LIVE: "#7b2eff",
};

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const shineRef = useRef(null);
  const bounds = useRef(null);
  const cur = useRef({ rx: 0, ry: 0 });
  const tgt = useRef({ rx: 0, ry: 0 });
  const rafRef = useRef(null);

  const lerp = (a, b, t) => a + (b - a) * t;

  const animate = useCallback(() => {
    cur.current.rx = lerp(cur.current.rx, tgt.current.rx, 0.09);
    cur.current.ry = lerp(cur.current.ry, tgt.current.ry, 0.09);
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(900px) rotateX(${cur.current.rx}deg) rotateY(${cur.current.ry}deg) scale3d(1.025,1.025,1.025)`;
    }
    if (
      Math.abs(cur.current.rx - tgt.current.rx) > 0.01 ||
      Math.abs(cur.current.ry - tgt.current.ry) > 0.01
    )
      rafRef.current = requestAnimationFrame(animate);
  }, []);

  const onEnter = () => {
    bounds.current = cardRef.current.getBoundingClientRect();
    rafRef.current = requestAnimationFrame(animate);
  };
  const onMove = (e) => {
    if (!bounds.current) return;
    const { left, top, width, height } = bounds.current;
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    tgt.current.ry = (x - 0.5) * 22;
    tgt.current.rx = -(y - 0.5) * 22;
    if (shineRef.current) {
      shineRef.current.style.setProperty("--mx", `${x * 100}%`);
      shineRef.current.style.setProperty("--my", `${y * 100}%`);
    }
  };
  const onLeave = () => {
    tgt.current = { rx: 0, ry: 0 };
    bounds.current = null;
    rafRef.current = requestAnimationFrame(animate);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div
        ref={cardRef}
        className="tilt-card relative h-full"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        onMouseEnter={onEnter}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {/* Shine overlay */}
        <div ref={shineRef} className="tilt-shine" />

        <div
          className="relative glass-card overflow-hidden h-full"
          style={{
            border: `1px solid ${project.color}30`,
            transition: "border-color .3s, box-shadow .3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = `${project.color}60`;
            e.currentTarget.style.boxShadow = `0 20px 60px ${project.glowColor}, 0 0 0 1px ${project.color}20`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = `${project.color}30`;
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {/* Top bar */}
          <div
            className="h-0.5 w-full"
            style={{
              background: `linear-gradient(to right, transparent, ${project.color}, transparent)`,
            }}
          />

          <div className="relative z-10 p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                  style={{
                    background: `${project.color}15`,
                    border: `1px solid ${project.color}40`,
                  }}
                >
                  {project.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: STATUS_COLORS[project.status],
                        boxShadow: `0 0 6px ${STATUS_COLORS[project.status]}`,
                      }}
                    />
                    <span
                      className="font-mono text-xs"
                      style={{ color: STATUS_COLORS[project.status] }}
                    >
                      {project.status}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[#64748b]">
                    {project.category}
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs text-[#64748b] tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Name */}
            <h3
              className="text-xl font-bold mb-1 transition-colors duration-200"
              style={{
                color: project.color,
                textShadow: `0 0 20px ${project.color}44`,
              }}
            >
              {project.name}
            </h3>
            <p className="text-xs font-mono text-[#64748b] mb-3">
              {project.tagline}
            </p>
            <p className="text-[#94a3b8] text-sm leading-relaxed mb-5">
              {project.description}
            </p>

            {/* Metrics */}
            {project.metrics && (
              <div className="flex gap-4 mb-5 py-3 border-y border-[#1a2744]">
                {Object.entries(project.metrics).map(([k, v]) => (
                  <div key={k} className="text-center">
                    <div
                      className="font-mono text-sm font-bold"
                      style={{ color: project.color }}
                    >
                      {v}
                    </div>
                    <div className="font-mono text-xs text-[#64748b] uppercase">
                      {k}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs px-2 py-1 rounded transition-all duration-200 hover:scale-105"
                  style={{
                    background: `${project.color}10`,
                    border: `1px solid ${project.color}28`,
                    color: project.color,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <MagneticButton strength={0.3} className="flex-1">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded font-mono text-xs border transition-all duration-200 w-full"
                  style={{
                    borderColor: `${project.color}40`,
                    color: project.color,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${project.color}15`;
                    e.currentTarget.style.borderColor = project.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "";
                    e.currentTarget.style.borderColor = `${project.color}40`;
                  }}
                >
                  <Github size={13} /> GITHUB
                </a>
              </MagneticButton>
              <MagneticButton strength={0.3} className="flex-1">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded font-mono text-xs transition-all duration-200 w-full hover:opacity-90"
                  style={{
                    background: `linear-gradient(135deg,${project.color}35,${project.color}15)`,
                    border: `1px solid ${project.color}50`,
                    color: "#fff",
                  }}
                >
                  <ExternalLink size={13} /> LIVE DEMO
                </a>
              </MagneticButton>
            </div>
          </div>

          <div
            className="h-px w-full"
            style={{
              background: `linear-gradient(to right,transparent,${project.color}25,transparent)`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
