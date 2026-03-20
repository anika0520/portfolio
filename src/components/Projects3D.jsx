import { motion } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

const Projects3D = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-24 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020409] via-[#030812] to-[#020409]" />
      <div className="absolute inset-0 cyber-grid-bg opacity-15" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(123,46,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">◈ MODULE_03 / MISSION LOG</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Active <span style={{ color: "#7b2eff" }}>Projects</span>
          </h2>
          <p className="text-[#94a3b8] max-w-xl mx-auto font-mono text-sm">
            Holographic system nodes — hover to interact with project
            intelligence.
          </p>

          {/* Stats bar */}
          <div className="flex justify-center gap-8 mt-8">
            {[
              { label: "Total Builds", value: "03", color: "#00d4ff" },
              { label: "AI Powered", value: "02", color: "#7b2eff" },
              { label: "Full Stack", value: "01", color: "#00ff88" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="font-mono text-2xl font-black"
                  style={{ color: s.color }}
                >
                  {s.value}
                </div>
                <div className="font-mono text-xs text-[#64748b]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* View all on GitHub */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/anika0520"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon inline-flex items-center gap-2 text-sm"
          >
            VIEW ALL ON GITHUB →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects3D;
