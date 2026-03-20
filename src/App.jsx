import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CustomCursor from "./components/CustomCursor";
import ParallaxBackground from "./scenes/ParallaxBackground";
import Navbar from "./components/Navbar";
import Hero3D from "./components/Hero3D";
import NeuralSkills from "./components/NeuralSkills";
import Projects3D from "./components/Projects3D";
import Terminal from "./components/Terminal";
import Analytics from "./components/Analytics";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    // Scroll-triggered fade for sections (skip hero — it handles its own)
    const sections = document.querySelectorAll("section:not(#hero)");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div className="relative bg-[#020409] min-h-screen overflow-x-hidden">
      {/* Custom animated cursor */}
      <CustomCursor />

      {/* Multi-layer parallax background */}
      <ParallaxBackground />

      {/* Scan line effect */}
      <div className="scanline" aria-hidden="true" />

      {/* Navigation */}
      <Navbar />

      {/* Page sections */}
      <main>
        <Hero3D />
        <NeuralSkills />
        <Projects3D />
        <Terminal />
        <Analytics />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;
