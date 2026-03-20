import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Cpu, Wifi } from "lucide-react";
import MagneticButton from "./MagneticButton";

const NAV_ITEMS = [
  { label: "HERO", href: "#hero" },
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
  { label: "TERMINAL", href: "#terminal" },
  { label: "ANALYTICS", href: "#analytics" },
  { label: "CONTACT", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const [time, setTime] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(id);
    };
  }, []);

  const go = (href) => {
    setMenuOpen(false);
    setActive(href.slice(1));
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(2,4,9,.88)] backdrop-blur-xl border-b border-[rgba(0,212,255,.12)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <MagneticButton strength={0.4} onClick={() => go("#hero")}>
            <div className="flex items-center gap-2.5 group">
              <div
                className="relative w-8 h-8 border border-[#00d4ff] rounded flex items-center justify-center
                group-hover:border-[#7b2eff] transition-colors duration-300"
              >
                <Cpu
                  size={15}
                  className="text-[#00d4ff] group-hover:text-[#7b2eff] transition-colors duration-300"
                />
              </div>
              <span
                className="font-mono text-sm font-bold text-[#00d4ff] tracking-widest group-hover:text-white transition-colors duration-300"
                style={{ fontFamily: "'Orbitron',sans-serif" }}
              >
                AG<span className="text-[#7b2eff]">.SYS</span>
              </span>
            </div>
          </MagneticButton>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_ITEMS.map((item, i) => (
              <MagneticButton key={item.label} strength={0.25}>
                <motion.button
                  onClick={() => go(item.href)}
                  className={`relative px-3.5 py-2 text-[11px] font-mono tracking-[.15em] transition-colors duration-200 group ${
                    active === item.href.slice(1)
                      ? "text-[#00d4ff]"
                      : "text-[#64748b] hover:text-[#94a3b8]"
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.3 }}
                >
                  {active === item.href.slice(1) && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded"
                      style={{
                        background: "rgba(0,212,255,.06)",
                        border: "1px solid rgba(0,212,255,.2)",
                      }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-[#00d4ff] w-0 group-hover:w-2/3 transition-all duration-300" />
                </motion.button>
              </MagneticButton>
            ))}
            <MagneticButton className="ml-3">
              <motion.button
                onClick={() => go("#contact")}
                className="btn-neon text-[11px] px-4 py-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                INIT CONTACT
              </motion.button>
            </MagneticButton>
          </div>

          {/* Right status */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Wifi size={12} className="text-[#00ff88]" />
              <span className="font-mono text-[10px] text-[#00ff88] tracking-widest">
                ONLINE
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#64748b] tabular-nums">
              {time}
            </span>
            <div className="status-dot" />
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#00d4ff] p-2"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-40 bg-[rgba(2,4,9,.97)] backdrop-blur-xl flex flex-col items-center justify-center gap-7 md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => go(item.href)}
                className="text-2xl font-mono tracking-widest text-[#94a3b8] hover:text-[#00d4ff] transition-colors"
              >
                <span className="text-[#7b2eff]">◈ </span>
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
