import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const coreRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    const core = coreRef.current;
    const ring = ringRef.current;
    if (!core || !ring) return;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      core.style.left = e.clientX + "px";
      core.style.top = e.clientY + "px";
    };

    const onDown = () => core.classList.add("clicking");
    const onUp = () => core.classList.remove("clicking");

    // Attach hover detection after a tick
    const addHover = () => {
      document
        .querySelectorAll("a,button,.glass-card,.tilt-card,.glass-card-hover")
        .forEach((el) => {
          el.addEventListener("mouseenter", () =>
            ring.classList.add("hovering"),
          );
          el.addEventListener("mouseleave", () =>
            ring.classList.remove("hovering"),
          );
        });
    };
    setTimeout(addHover, 800);

    // Smooth lag for ring
    const animate = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.1;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.1;
      ring.style.left = ringPos.current.x + "px";
      ring.style.top = ringPos.current.y + "px";
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div id="cursor-core" ref={coreRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
};

export default CustomCursor;
