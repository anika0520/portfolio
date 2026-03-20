export const projects = [
  {
    id: 1,
    name: "DamageSense AI",
    tagline: "AI-Powered Vehicle Damage Intelligence",
    description:
      "AI-powered vehicle damage assessment platform using YOLOv8 with explainable severity scoring and fraud detection. Achieves 94.7% detection accuracy with real-time processing and integrated risk analysis pipeline.",
    longDescription:
      "An advanced computer vision system that leverages YOLOv8 object detection to identify and classify vehicle damage. Features explainable AI with SHAP values, automated severity scoring, and a fraud detection module that cross-references damage patterns against known fraud signatures.",
    tech: [
      "YOLOv8",
      "FastAPI",
      "PostgreSQL",
      "React",
      "Tailwind",
      "Python",
      "SHAP",
    ],
    color: "#00d4ff",
    glowColor: "rgba(0, 212, 255, 0.3)",
    icon: "🤖",
    status: "OPERATIONAL",
    metrics: { accuracy: "94.7%", speed: "23ms", models: 3 },
    github: "https://github.com/anika0520",
    demo: "#",
    category: "AI / CV",
  },
  {
    id: 2,
    name: "Ocularis AI",
    tagline: "Real-Time Eye Health Intelligence",
    description:
      "Real-time eye health and fatigue monitoring dashboard with blink detection and analytics. Monitors cognitive load, alertness levels, and provides personalized health insights powered by computer vision.",
    longDescription:
      "A sophisticated eye-tracking system built with React and Vite, featuring real-time blink rate analysis, drowsiness detection via EAR (Eye Aspect Ratio) algorithm, and an analytics dashboard visualizing health trends over time with Recharts.",
    tech: [
      "React",
      "Vite",
      "Recharts",
      "Framer Motion",
      "MediaPipe",
      "TailwindCSS",
    ],
    color: "#7b2eff",
    glowColor: "rgba(123, 46, 255, 0.3)",
    icon: "👁️",
    status: "ACTIVE",
    metrics: { accuracy: "98.2%", speed: "16ms", models: 2 },
    github: "https://github.com/anika0520",
    demo: "https://ocularis-silk.vercel.app/",
    category: "Health Tech",
  },
  {
    id: 3,
    name: "ForkMeToFind",
    tagline: "Community Lost & Found Platform",
    description:
      "Full-stack lost & found and community lending platform for students with image uploads and chat verification. Enables real-time item matching, community trust scores, and secure handoff verification.",
    longDescription:
      "A MERN stack platform connecting students through a smart lost-and-found system. Features AI-assisted image similarity matching, real-time WebSocket chat for item verification, community trust scoring, and a lending marketplace for student resources.",
    tech: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Socket.io",
      "Cloudinary",
      "JWT",
    ],
    color: "#00ff88",
    glowColor: "rgba(0, 255, 136, 0.3)",
    icon: "🔍",
    status: "LIVE",
    metrics: { users: "500+", items: "1.2k", rating: "4.8★" },
    github: "https://github.com/anika0520",
    demo: "https://lost-and-found-platform-six.vercel.app/",
    category: "Full Stack",
  },
];

export default projects;
