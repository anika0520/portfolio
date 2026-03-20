import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import {
  ChevronDown,
  ExternalLink,
  Mail,
  Github,
  Code2,
  Cpu,
  Braces,
} from "lucide-react";
import EngineerScene from "../scenes/EngineerScene";
import { useTypewriter } from "../hooks/useScrollAnimation";
import MagneticButton from "./MagneticButton";

const BOOT_LINES = [
  { text: "$ initializing ANIKA_OS v4.2.0...", delay: 250 },
  { text: "$ loading neural modules...      [██████████] 100%", delay: 900 },
  { text: "$ calibrating CS interface...    [OK]", delay: 1550 },
  { text: "$ mounting algorithm library...  [OK]", delay: 2100 },
  { text: "$ activating holographic layer.. [OK]", delay: 2650 },
  { text: "$ running self-diagnostics...    [OK]", delay: 3200 },
  { text: "", delay: 3600 },
  {
    text: "  >> ANIKA GANGWAR SYSTEM — ONLINE <<",
    delay: 3900,
    highlight: true,
  },
];

const BootSequence = ({ onComplete }) => {
  const [lineCount, setLineCount] = useState(0);
  const [showBtn, setShowBtn] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timers = [];
    BOOT_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setLineCount(i + 1);
          setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
        }, line.delay),
      );
    });
    timers.push(
      setTimeout(
        () => setShowBtn(true),
        BOOT_LINES[BOOT_LINES.length - 1].delay + 600,
      ),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#020409] flex flex-col items-center justify-center overflow-y-auto px-6"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.7 }}
    >
      <div className="absolute inset-0 cyber-grid-bg pointer-events-none opacity-60" />
      <motion.div
        className="absolute left-0 right-0 h-px opacity-30"
        style={{
          background: "linear-gradient(90deg,transparent,#00d4ff,transparent)",
        }}
        animate={{ top: ["0vh", "100vh"] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
      />
      {[
        ["top-6 left-6", "border-t-2 border-l-2"],
        ["top-6 right-6", "border-t-2 border-r-2"],
        ["bottom-6 left-6", "border-b-2 border-l-2"],
        ["bottom-6 right-6", "border-b-2 border-r-2"],
      ].map(([pos, brd], i) => (
        <div
          key={i}
          className={`absolute ${pos} w-6 h-6 ${brd} border-[#00d4ff]`}
        />
      ))}

      <div className="relative w-full max-w-xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1.5">
            {["#ef4444", "#f59e0b", "#22c55e"].map((c) => (
              <div
                key={c}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: c,
                  opacity: 0.75,
                }}
              />
            ))}
          </div>
          <span className="font-mono text-[11px] text-[#94a3b8] tracking-[.15em]">
            ANIKA-SYS // BOOT_TERMINAL
          </span>
          <div className="ml-auto font-mono text-[10px] text-[#64748b]">
            {progress}%
          </div>
        </div>

        <div className="w-full h-px bg-[#1a2744] mb-5 rounded overflow-hidden">
          <motion.div
            className="h-full rounded"
            style={{
              background: "linear-gradient(90deg,#00d4ff,#7b2eff)",
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="font-mono text-sm min-h-[200px] space-y-0.5">
          {BOOT_LINES.slice(0, lineCount).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={
                line.highlight
                  ? "text-[#00d4ff] font-bold text-base text-center tracking-wider mt-2"
                  : line.text === ""
                    ? "h-3"
                    : "text-[#00ff88]"
              }
            >
              {line.text || " "}
            </motion.div>
          ))}
          {lineCount > 0 && lineCount < BOOT_LINES.length && (
            <span className="inline-block w-2 h-4 bg-[#00ff88] align-bottom animate-pulse" />
          )}
        </div>

        <AnimatePresence>
          {showBtn && (
            <motion.div
              className="mt-10 flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 font-mono text-xs text-[#64748b]">
                <div className="w-14 h-px bg-gradient-to-r from-transparent to-[#00d4ff]" />
                AUTHENTICATION COMPLETE
                <div className="w-14 h-px bg-gradient-to-l from-transparent to-[#00d4ff]" />
              </div>
              <MagneticButton strength={0.5} onClick={onComplete}>
                <button className="relative px-10 py-3.5 font-mono text-sm tracking-[.14em] overflow-hidden group">
                  <div className="absolute inset-0 border border-[#00d4ff] group-hover:border-[#a855f7] transition-colors duration-300" />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(135deg,rgba(0,212,255,.1),rgba(168,85,247,.1))",
                    }}
                  />
                  <div className="absolute top-0 left-0 w-2 h-2 bg-[#00d4ff]" />
                  <div className="absolute top-0 right-0 w-2 h-2 bg-[#00d4ff]" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#7b2eff]" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#7b2eff]" />
                  <span className="relative text-[#00d4ff] group-hover:text-white transition-colors duration-300">
                    &gt;_ ENTER SYSTEM
                  </span>
                </button>
              </MagneticButton>
              <p className="font-mono text-[10px] text-[#64748b] tracking-[.2em] animate-pulse">
                ALL SYSTEMS NOMINAL
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const TITLES = [
  "AI Developer",
  "Software Engineer",
  "CSE Student",
  "ML Enthusiast",
  "Algorithm Designer",
];

const Hero3D = () => {
  const [showBoot, setShowBoot] = useState(true);
  const [heroVisible, setHeroVisible] = useState(false);
  const heroRef = useRef(null);
  const typewriterText = useTypewriter(TITLES, 75);

  const handleBootComplete = () => {
    setShowBoot(false);
    setTimeout(() => setHeroVisible(true), 80);
  };

  useEffect(() => {
    if (heroVisible && heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll(".hero-reveal"),
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.11, ease: "power3.out" },
      );
    }
  }, [heroVisible]);

  return (
    <>
      <AnimatePresence>
        {showBoot && <BootSequence onComplete={handleBootComplete} />}
      </AnimatePresence>

      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 60% 50%, rgba(0,212,255,.04), rgba(123,46,255,.03) 40%, transparent 70%)",
        }}
      >
        {/* DNA/Circuit 3D scene */}
        <div className="absolute inset-0 z-0">
          <EngineerScene />
        </div>
        <div className="absolute inset-0 cyber-grid-bg opacity-25 pointer-events-none z-[1]" />
        <div
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-[2]"
          style={{
            background: "linear-gradient(to top, #020409, transparent)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[88vh]">
            {/* Left: text */}
            <div>
              <div
                className="hero-reveal opacity-0 inline-flex items-center gap-2.5 mb-7 px-3 py-1.5 rounded-full"
                style={{
                  border: "1px solid rgba(0,255,136,.2)",
                  background: "rgba(0,255,136,.04)",
                }}
              >
                <div className="status-dot" />
                <span className="font-mono text-[11px] text-[#00ff88] tracking-[.18em]">
                  SYSTEM ONLINE · PORTFOLIO v2026
                </span>
              </div>

              <h1
                className="hero-reveal opacity-0 leading-none mb-3"
                style={{ fontFamily: "'Orbitron',sans-serif" }}
              >
                <span className="block text-white font-black text-5xl sm:text-6xl lg:text-[72px]">
                  Anika
                </span>
                <span className="block font-black text-5xl sm:text-6xl lg:text-[72px] holo-gradient-text">
                  Gangwar
                </span>
              </h1>

              <div className="hero-reveal opacity-0 mb-5 h-8">
                <span className="font-mono text-base text-[#94a3b8]">
                  &gt;&nbsp;
                  <span className="text-[#00d4ff]">{typewriterText}</span>
                  <span className="terminal-cursor" />
                </span>
              </div>

              <div className="hero-reveal opacity-0 flex items-center gap-3 mb-6">
                <div
                  className="h-px max-w-[50px] flex-1"
                  style={{
                    background: "linear-gradient(to right,#00d4ff,transparent)",
                  }}
                />
                <div className="flex items-center gap-1.5">
                  {[Code2, Cpu, Braces].map((Icon, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded flex items-center justify-center"
                      style={{
                        border: "1px solid rgba(0,212,255,.2)",
                        background: "rgba(0,212,255,.05)",
                      }}
                    >
                      <Icon size={12} className="text-[#00d4ff] opacity-70" />
                    </div>
                  ))}
                </div>
                <div
                  className="h-px max-w-[50px] flex-1"
                  style={{
                    background: "linear-gradient(to left,#7b2eff,transparent)",
                  }}
                />
              </div>

              <p className="hero-reveal opacity-0 text-[#94a3b8] leading-relaxed mb-9 max-w-md text-[15px]">
                Passionate about building intelligent systems at the
                intersection of AI, software engineering, and human experience.
                CSE student pushing the boundaries of what&#39;s possible — one
                algorithm at a time.
              </p>

              <div className="hero-reveal opacity-0 flex flex-wrap gap-3 mb-10">
                <MagneticButton>
                  <button
                    className="btn-solid flex items-center gap-2 px-6 py-3"
                    onClick={() =>
                      document
                        .querySelector("#projects")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    <ExternalLink size={14} /> VIEW PROJECTS
                  </button>
                </MagneticButton>
                <MagneticButton>
                  <button
                    className="btn-neon flex items-center gap-2 px-6 py-3"
                    onClick={() =>
                      document
                        .querySelector("#contact")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    <Mail size={14} /> CONTACT
                  </button>
                </MagneticButton>
                <MagneticButton>
                  <a
                    href="https://github.com/anika0520"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 font-mono text-xs tracking-wider text-[#64748b] hover:text-white transition-colors rounded"
                    style={{ border: "1px solid #1a2744" }}
                  >
                    <Github size={14} /> GITHUB
                  </a>
                </MagneticButton>
              </div>

              <div className="hero-reveal opacity-0 flex flex-wrap gap-6">
                {[
                  { label: "PROJECTS", value: "03", color: "#00d4ff" },
                  { label: "SKILLS", value: "10+", color: "#7b2eff" },
                  { label: "STATUS", value: "ACTIVE", color: "#00ff88" },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <span className="font-mono text-[10px] text-[#64748b] tracking-[.15em]">
                      {s.label}
                    </span>
                    <span
                      className="font-mono text-xl font-black"
                      style={{
                        color: s.color,
                        textShadow: `0 0 16px ${s.color}88`,
                      }}
                    >
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {heroVisible && (
          <motion.button
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-[#94a3b8] hover:text-[#00d4ff] transition-colors"
            onClick={() =>
              document
                .querySelector("#skills")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="font-mono text-[10px] tracking-[.2em]">
              SCROLL
            </span>
            <ChevronDown size={16} />
          </motion.button>
        )}
      </section>
    </>
  );
};

export default Hero3D;
