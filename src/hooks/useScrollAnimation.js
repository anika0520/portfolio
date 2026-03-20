import { useEffect, useRef, useState } from "react";

/**
 * useScrollAnimation - triggers when element enters viewport
 * @param {number} threshold
 * @param {string} rootMargin
 */
export const useScrollAnimation = (threshold = 0.1, rootMargin = "0px") => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold, rootMargin },
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, rootMargin, hasAnimated]);

  return { ref, isVisible };
};

/**
 * useMousePosition - tracks mouse position for interactive effects
 */
export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return position;
};

/**
 * useTypewriter - simulates typewriter effect
 * @param {string[]} texts
 * @param {number} speed
 */
export const useTypewriter = (texts, speed = 80) => {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < currentText.length) {
            setDisplayText(currentText.slice(0, charIndex + 1));
            setCharIndex((c) => c + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (charIndex > 0) {
            setDisplayText(currentText.slice(0, charIndex - 1));
            setCharIndex((c) => c - 1);
          } else {
            setIsDeleting(false);
            setTextIndex((i) => (i + 1) % texts.length);
          }
        }
      },
      isDeleting ? speed / 2 : speed,
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed]);

  return displayText;
};

export default useScrollAnimation;
