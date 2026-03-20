// ============================================================
// src/components/Contact.jsx
// Contact section with animated form and social links
// ============================================================

import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import {
  Mail,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const SOCIAL_LINKS = [
  {
    icon: Mail,
    label: "Email",
    value: "anikagangwar2005@gmail.com",
    href: "mailto:anikagangwar2005@gmail.com",
    color: "#00d4ff",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/anika0520",
    href: "https://github.com/anika0520",
    color: "#e2e8f0",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/anika-gangwar-3a10772b1/",
    href: "https://linkedin.com/in/anika-gangwar-3a10772b1/",
    color: "#0a66c2",
  },
];

const Contact = () => {
  const { ref, isVisible } = useScrollAnimation(0.15);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1500));
    setStatus("success");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  const inputClass = (field) =>
    `w-full bg-[rgba(10,15,30,0.8)] border rounded-lg px-4 py-3 text-white font-mono text-sm outline-none transition-all duration-300 ${
      focused === field
        ? "border-[#00d4ff] shadow-[0_0_15px_rgba(0,212,255,0.2)]"
        : "border-[#1a2744] hover:border-[rgba(0,212,255,0.3)]"
    }`;

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#040812] to-[#020409]" />
      <div className="absolute inset-0 cyber-grid-bg opacity-20" />

      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,212,255,0.06), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">◈ MODULE_06 / COMM LINK</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Open <span style={{ color: "#00d4ff" }}>Channel</span>
          </h2>
          <p className="text-[#94a3b8] font-mono text-sm">
            Initiate contact sequence — response guaranteed within 24h.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Social links + status */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-6">
              <h3 className="font-mono text-xs text-[#94a3b8] tracking-widest mb-6">
                ◈ DIRECT CHANNELS
              </h3>
              <div className="space-y-4">
                {SOCIAL_LINKS.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg border border-[#1a2744] hover:border-[rgba(0,212,255,0.3)] transition-all duration-300 group"
                    whileHover={{ x: 4, background: "rgba(0,212,255,0.03)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${link.color}15`,
                        border: `1px solid ${link.color}30`,
                      }}
                    >
                      <link.icon size={18} style={{ color: link.color }} />
                    </div>
                    <div>
                      <div className="font-mono text-xs text-[#64748b] mb-0.5">
                        {link.label}
                      </div>
                      <div className="text-sm text-[#94a3b8] group-hover:text-white transition-colors">
                        {link.value}
                      </div>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: link.color }}
                      />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="glass-card p-5 flex items-center gap-4">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-[#00ff88]" />
                <div className="absolute inset-0 rounded-full bg-[#00ff88] animate-ping opacity-30" />
              </div>
              <div>
                <div className="font-mono text-sm text-white font-semibold">
                  Available for Opportunities
                </div>
                <div className="font-mono text-xs text-[#64748b]">
                  Internships · Collaborations · Open Source
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="glass-card p-6">
              <h3 className="font-mono text-xs text-[#94a3b8] tracking-widest mb-6">
                ◈ COMPOSE MESSAGE
              </h3>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 gap-4 text-center"
                >
                  <CheckCircle size={48} className="text-[#00ff88]" />
                  <div className="text-white font-semibold text-lg">
                    Message Transmitted!
                  </div>
                  <div className="text-[#94a3b8] font-mono text-sm">
                    Signal received. I'll respond within 24h.
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-mono text-xs text-[#64748b] mb-2">
                      IDENTIFIER (NAME)
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      className={inputClass("name")}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-[#64748b] mb-2">
                      COMM ADDRESS (EMAIL)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      className={inputClass("email")}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-[#64748b] mb-2">
                      PAYLOAD (MESSAGE)
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      className={`${inputClass("message")} resize-none`}
                      placeholder="Your message here..."
                      rows={5}
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full btn-solid flex items-center justify-center gap-2 py-3 disabled:opacity-50"
                    whileHover={{ scale: status === "sending" ? 1 : 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === "sending" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        TRANSMITTING...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        TRANSMIT MESSAGE
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
