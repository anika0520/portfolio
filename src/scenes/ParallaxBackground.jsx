import { useEffect, useRef } from "react";

const STARS = Array.from({ length: 130 }, (_, i) => ({
  x: (i * 137.508 + 17) % 100,
  y: (i * 91.3 + 7) % 100,
  size: (i % 3) + 1,
  opacity: 0.25 + (i % 6) * 0.12,
  color: i % 5 === 0 ? "#a855f7" : "#00d4ff",
  delay: (i % 7) * 0.4,
}));

export default function ParallaxBackground() {
  const nebulaRef = useRef(null);
  const starRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    let mx = 0,
      my = 0,
      cx = 0,
      cy = 0,
      raf;

    const onMove = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      cx += (mx - cx) * 0.055;
      cy += (my - cy) * 0.055;
      if (nebulaRef.current)
        nebulaRef.current.style.transform = `translate(${cx * 40}px, ${cy * 40}px)`;
      if (starRef.current)
        starRef.current.style.transform = `translate(${cx * 22}px, ${cy * 22}px)`;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${cx * 10}px, ${cy * 10}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-50" />

      {/* Nebula depth blobs */}
      <div
        ref={nebulaRef}
        className="absolute inset-0"
        style={{ willChange: "transform" }}
      >
        {[
          {
            size: 700,
            top: "-15%",
            left: "-10%",
            color: "rgba(0,212,255,0.045)",
          },
          {
            size: 900,
            top: "25%",
            right: "-20%",
            color: "rgba(123,46,255,0.05)",
          },
          { size: 600, top: "65%", left: "30%", color: "rgba(0,255,136,0.03)" },
        ].map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: b.size,
              height: b.size,
              top: b.top,
              left: b.left,
              right: b.right,
              background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
            }}
          />
        ))}
      </div>

      {/* Stars */}
      <div
        ref={starRef}
        className="absolute inset-0"
        style={{ willChange: "transform" }}
      >
        {STARS.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              background: s.color,
              opacity: s.opacity,
              boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
              animation: `ring-pulse ${2 + s.delay}s ease-in-out infinite`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Micro dot layer */}
      <div
        ref={dotRef}
        className="absolute inset-0"
        style={{ willChange: "transform" }}
      >
        {Array.from({ length: 22 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 47.3) % 100}%`,
              top: `${(i * 73.1) % 100}%`,
              width: 2,
              height: 2,
              background: "#00d4ff",
              opacity: 0.35,
              boxShadow: "0 0 5px #00d4ff",
            }}
          />
        ))}
      </div>

      {/* Edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, #020409 100%)",
        }}
      />
    </div>
  );
}
