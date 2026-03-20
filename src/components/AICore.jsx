import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const AICore = () => {
  const coreRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);

  useEffect(() => {
    // GSAP ring animations
    if (ring1Ref.current) {
      gsap.to(ring1Ref.current, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "linear",
        transformOrigin: "50% 50%",
      });
    }
    if (ring2Ref.current) {
      gsap.to(ring2Ref.current, {
        rotation: -360,
        duration: 12,
        repeat: -1,
        ease: "linear",
        transformOrigin: "50% 50%",
      });
    }
    if (ring3Ref.current) {
      gsap.to(ring3Ref.current, {
        rotation: 360,
        duration: 16,
        repeat: -1,
        ease: "linear",
        transformOrigin: "50% 50%",
      });
    }
    // Core pulse
    if (coreRef.current) {
      gsap.to(coreRef.current, {
        scale: 1.1,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  return (
    <div className="relative w-64 h-64 flex items-center justify-center select-none">
      {/* Ring 3 - outer */}
      <svg
        ref={ring3Ref}
        className="absolute inset-0"
        viewBox="0 0 256 256"
        style={{ width: "100%", height: "100%" }}
      >
        <circle
          cx="128"
          cy="128"
          r="120"
          fill="none"
          stroke="#7b2eff"
          strokeWidth="0.8"
          strokeDasharray="20 8"
          opacity="0.4"
        />
        <circle cx="128" cy="8" r="3" fill="#7b2eff" opacity="0.8" />
        <circle cx="128" cy="248" r="3" fill="#7b2eff" opacity="0.8" />
      </svg>

      {/* Ring 2 */}
      <svg
        ref={ring2Ref}
        className="absolute"
        viewBox="0 0 256 256"
        style={{ width: "82%", height: "82%" }}
      >
        <circle
          cx="128"
          cy="128"
          r="120"
          fill="none"
          stroke="#00d4ff"
          strokeWidth="1"
          strokeDasharray="40 12"
          opacity="0.5"
        />
        <circle cx="128" cy="8" r="4" fill="#00d4ff" opacity="0.9" />
        <circle cx="248" cy="128" r="4" fill="#00d4ff" opacity="0.9" />
      </svg>

      {/* Ring 1 - inner */}
      <svg
        ref={ring1Ref}
        className="absolute"
        viewBox="0 0 256 256"
        style={{ width: "60%", height: "60%" }}
      >
        <circle
          cx="128"
          cy="128"
          r="120"
          fill="none"
          stroke="#00ff88"
          strokeWidth="1.5"
          strokeDasharray="60 20"
          opacity="0.6"
        />
        <circle cx="128" cy="8" r="5" fill="#00ff88" opacity="1" />
      </svg>

      {/* Core */}
      <motion.div
        ref={coreRef}
        className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.3) 0%, rgba(123,46,255,0.2) 50%, transparent 100%)",
          boxShadow:
            "0 0 40px rgba(0,212,255,0.5), 0 0 80px rgba(0,212,255,0.2)",
        }}
      >
        <div
          className="w-12 h-12 rounded-full"
          style={{
            background:
              "radial-gradient(circle, #00d4ff 0%, #7b2eff 60%, #020409 100%)",
            boxShadow: "0 0 20px rgba(0,212,255,0.8)",
          }}
        />
        {/* Center dot */}
        <div
          className="absolute w-3 h-3 rounded-full bg-white"
          style={{ boxShadow: "0 0 10px #00d4ff" }}
        />
      </motion.div>

      {/* Equatorial data dots */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <motion.div
          key={deg}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#00d4ff]"
          style={{
            top: "50%",
            left: "50%",
            transformOrigin: "0 0",
            transform: `rotate(${deg}deg) translateX(110px) translateY(-50%)`,
            boxShadow: "0 0 6px #00d4ff",
          }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
        />
      ))}
    </div>
  );
};

export default AICore;
