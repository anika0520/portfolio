import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart, Cpu } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[rgba(0,212,255,0.1)] bg-[#020409]">
      {/* Gradient top edge */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-30" />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-[#00d4ff] rounded flex items-center justify-center">
              <Cpu size={16} className="text-[#00d4ff]" />
            </div>
            <div>
              <div className="font-mono text-sm font-bold text-white">
                ANIKA GANGWAR
                <span className="text-[#7b2eff]"> // AI SYS</span>
              </div>
              <div className="font-mono text-xs text-[#64748b]">
                AI Developer · Software Engineer · CSE Student
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {[
              {
                icon: Github,
                href: "https://github.com/anikagangwar",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://linkedin.com/in/anikagangwar",
                label: "LinkedIn",
              },
              {
                icon: Mail,
                href: "mailto:anika.gangwar@example.com",
                label: "Email",
              },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded border border-[#1a2744] flex items-center justify-center text-[#64748b] hover:text-[#00d4ff] hover:border-[rgba(0,212,255,0.4)] transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-8 pt-6 border-t border-[#0a1422] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs text-[#64748b] flex items-center gap-2">
            <span>© {year} Anika Gangwar</span>
            <span className="text-[#1a2744]">·</span>
            <span className="flex items-center gap-1">
              Built with <Heart size={10} className="text-red-500 mx-1" /> using
              React + Three.js
            </span>
          </div>
          {/* System status */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="text-[#64748b]">ALL SYSTEMS OPERATIONAL</span>
            </div>
            <span className="text-[#1a2744]">·</span>
            <span className="text-[#64748b]">v2026.3.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
