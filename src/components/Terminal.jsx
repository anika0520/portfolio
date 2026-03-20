import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { Terminal as TerminalIcon, ChevronRight } from "lucide-react";

// Command registry — all supported commands and their responses
const COMMANDS = {
  help: {
    output: [
      { text: "Available commands:", color: "#00d4ff" },
      { text: "  about      →  Learn about Anika", color: "#00ff88" },
      { text: "  skills     →  List technical skills", color: "#00ff88" },
      { text: "  projects   →  View projects", color: "#00ff88" },
      { text: "  contact    →  Get contact info", color: "#00ff88" },
      { text: "  status     →  System diagnostics", color: "#00ff88" },
      { text: "  clear      →  Clear terminal", color: "#00ff88" },
      { text: "  whoami     →  Identity check", color: "#00ff88" },
      { text: "  secret     →  Find the hidden message", color: "#7b2eff" },
    ],
  },
  about: {
    output: [
      { text: "◈ IDENTITY MODULE", color: "#00d4ff" },
      { text: "Name     : Anika Gangwar", color: "#e2e8f0" },
      {
        text: "Role     : AI Developer | Software Engineer | CSE Student",
        color: "#e2e8f0",
      },
      { text: "Status   : ACTIVE ✓", color: "#00ff88" },
      { text: "", color: "" },
      {
        text: "Anika Gangwar is a Computer Science and Engineering student",
        color: "#94a3b8",
      },
      {
        text: "passionate about AI systems, software engineering, and innovative",
        color: "#94a3b8",
      },
      {
        text: "problem solving. She builds intelligent systems that bridge the gap",
        color: "#94a3b8",
      },
      {
        text: "between cutting-edge AI research and production-grade applications.",
        color: "#94a3b8",
      },
    ],
  },
  skills: {
    output: [
      { text: "◈ SKILL MATRIX [LOADED]", color: "#00d4ff" },
      { text: "LANGUAGES  → Java Python C", color: "#ff6b35" },
      { text: "FRONTEND   → React HTML CSS", color: "#61dafb" },
      { text: "DATABASE   → SQL", color: "#00ffff" },
      { text: "DEVOPS     → Git Cloud", color: "#f05032" },
      { text: "AI/ML      → AI/ML", color: "#00ff88" },
      { text: "", color: "" },
      { text: "All modules nominal.", color: "#7b2eff" },
    ],
  },
  projects: {
    output: [
      { text: "◈ MISSION LOG", color: "#00d4ff" },
      { text: "", color: "" },
      { text: "[01] DamageSense AI", color: "#00d4ff" },
      {
        text: "     YOLOv8-powered vehicle damage assessment — STATUS: OPERATIONAL",
        color: "#94a3b8",
      },
      { text: "", color: "" },
      { text: "[02] Ocularis AI", color: "#7b2eff" },
      {
        text: "     Real-time eye health monitoring dashboard — STATUS: ACTIVE",
        color: "#94a3b8",
      },
      { text: "", color: "" },
      { text: "[03] ForkMeToFind", color: "#00ff88" },
      {
        text: "     Full-stack community lost & found platform — STATUS: LIVE",
        color: "#94a3b8",
      },
    ],
  },
  contact: {
    output: [
      { text: "◈ COMMUNICATION CHANNELS", color: "#00d4ff" },
      { text: "Email    : anikagangwar2005@gmail.com", color: "#e2e8f0" },
      { text: "GitHub   : github.com/anika0520", color: "#e2e8f0" },
      {
        text: "LinkedIn : linkedin.com/in/anika-gangwar-3a10772b1/",
        color: "#e2e8f0",
      },
      { text: "", color: "" },
      { text: "Ping me anytime. Response within 24h. ✓", color: "#00ff88" },
    ],
  },
  status: {
    output: [
      { text: "◈ SYSTEM DIAGNOSTICS", color: "#00d4ff" },
      {
        text: "CPU      : Neural Core v4.2  [████████░░] 82%",
        color: "#00ff88",
      },
      {
        text: "MEMORY   : Deep Learning     [███████░░░] 74%",
        color: "#00ff88",
      },
      {
        text: "NETWORK  : Ideas/sec         [█████████░] 91%",
        color: "#7b2eff",
      },
      {
        text: "PROJECTS : 3 Active          [██████████] 100%",
        color: "#00d4ff",
      },
      {
        text: "MOOD     : Caffeinated       [██████████] 100%",
        color: "#ff6b35",
      },
      { text: "", color: "" },
      { text: "All systems GREEN ✓", color: "#00ff88" },
    ],
  },
  whoami: {
    output: [
      { text: "anika@portfolio:~$ id", color: "#7b2eff" },
      {
        text: "uid=2026(anika) gid=cse(ai-dev) groups=builder,thinker,creator",
        color: "#e2e8f0",
      },
      { text: "", color: "" },
      {
        text: "You are looking at: Anika Gangwar's AI System",
        color: "#00d4ff",
      },
      {
        text: "Classification: HUMAN // DEVELOPER // INNOVATOR",
        color: "#94a3b8",
      },
    ],
  },
  secret: {
    output: [
      { text: "◈ ∞ HIDDEN NODE UNLOCKED ∞", color: "#7b2eff" },
      { text: "", color: "" },
      { text: '  "The best code is the code that', color: "#00ff88" },
      { text: "   makes tomorrow's impossible,", color: "#00ff88" },
      { text: "   today's ordinary.\"", color: "#00ff88" },
      { text: "", color: "" },
      { text: "    — Anika Gangwar", color: "#00d4ff" },
      { text: "", color: "" },
    ],
  },
};

const INITIAL_HISTORY = [
  {
    type: "system",
    text: "AG-SYS Terminal v2026.3.0 — Anika Gangwar's AI Portfolio",
  },
  { type: "system", text: 'Type "help" to see available commands.' },
  { type: "divider" },
];

const Terminal = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const newEntries = [{ type: "input", text: trimmed }];

    if (trimmed === "clear") {
      setHistory(INITIAL_HISTORY);
      return;
    }

    const command = COMMANDS[trimmed];
    if (command) {
      command.output.forEach((line) => {
        newEntries.push({ type: "output", text: line.text, color: line.color });
      });
    } else if (trimmed === "") {
      // empty, just add a newline
    } else {
      newEntries.push({
        type: "error",
        text: `Command not found: "${trimmed}". Type "help" for available commands.`,
      });
    }

    newEntries.push({ type: "divider" });
    setHistory((h) => [...h, ...newEntries]);
    setCmdHistory((h) => [trimmed, ...h]);
    setHistoryIdx(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(idx);
      setInput(cmdHistory[idx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(idx);
      setInput(idx === -1 ? "" : cmdHistory[idx]);
    }
  };

  return (
    <section
      id="terminal"
      ref={ref}
      className="relative py-24 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#020409] to-[#040812]" />
      <div className="absolute inset-0 cyber-grid-bg opacity-15" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="section-label mb-3">◈ MODULE_04 / COMMAND INTERFACE</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Dev <span style={{ color: "#00ff88" }}>Terminal</span>
          </h2>
          <p className="text-[#94a3b8] font-mono text-sm">
            Interactive shell — type commands to explore.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card overflow-hidden border-[rgba(0,255,136,0.15)]"
          onClick={() => inputRef.current?.focus()}
          style={{ cursor: "text" }}
        >
          {/* Terminal title bar */}
          <div className="flex items-center justify-between px-5 py-3 bg-[rgba(0,255,136,0.05)] border-b border-[rgba(0,255,136,0.12)]">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
                <div className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
              </div>
              <div className="flex items-center gap-2 text-[#00ff88]">
                <TerminalIcon size={14} />
                <span className="font-mono text-xs">anika@portfolio:~$</span>
              </div>
            </div>
            <span className="font-mono text-xs text-[#64748b]">
              bash — 80x24
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-5 font-mono text-sm min-h-[340px] max-h-[420px] overflow-y-auto">
            {history.map((entry, i) => (
              <div key={i}>
                {entry.type === "divider" ? (
                  <div className="my-2" />
                ) : entry.type === "system" ? (
                  <div className="text-[#64748b] text-xs mb-0.5">
                    {entry.text}
                  </div>
                ) : entry.type === "input" ? (
                  <div className="flex items-center gap-2 text-[#00ff88] mb-1">
                    <ChevronRight size={12} />
                    <span>{entry.text}</span>
                  </div>
                ) : entry.type === "error" ? (
                  <div className="text-red-400 text-xs mb-0.5 pl-4">
                    {entry.text}
                  </div>
                ) : (
                  <div
                    className="text-xs mb-0.5 pl-4 leading-6"
                    style={{ color: entry.color || "#94a3b8" }}
                  >
                    {entry.text || <span>&nbsp;</span>}
                  </div>
                )}
              </div>
            ))}

            {/* Input line */}
            <div className="flex items-center gap-2 text-[#00ff88] mt-2">
              <ChevronRight size={12} />
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-[#00ff88] caret-[#00ff88] font-mono text-sm"
                placeholder=""
                spellCheck={false}
                autoComplete="off"
              />
            </div>
            <div ref={bottomRef} />
          </div>
        </motion.div>

        {/* Quick command buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-2 mt-4"
        >
          {Object.keys(COMMANDS).map((cmd) => (
            <button
              key={cmd}
              onClick={() => {
                if (cmd === "clear") {
                  setHistory(INITIAL_HISTORY);
                } else {
                  executeCommand(cmd);
                }
              }}
              className="font-mono text-xs px-3 py-1.5 rounded border border-[rgba(0,255,136,0.2)] text-[#64748b] hover:text-[#00ff88] hover:border-[rgba(0,255,136,0.5)] transition-all duration-200"
            >
              {cmd}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Terminal;
