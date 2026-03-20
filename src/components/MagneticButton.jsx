import { useRef, useCallback } from "react";

const MagneticButton = ({
  children,
  strength = 0.38,
  className = "",
  onClick,
}) => {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);
  const bounds = useRef(null);

  const onEnter = useCallback(() => {
    bounds.current = wrapRef.current.getBoundingClientRect();
  }, []);

  const onMove = useCallback(
    (e) => {
      if (!bounds.current) return;
      const { left, top, width, height } = bounds.current;
      const dx = (e.clientX - (left + width / 2)) * strength;
      const dy = (e.clientY - (top + height / 2)) * strength;
      wrapRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
      if (innerRef.current)
        innerRef.current.style.transform = `translate(${dx * 0.25}px, ${dy * 0.25}px)`;
    },
    [strength],
  );

  const onLeave = useCallback(() => {
    wrapRef.current.style.transform = "translate(0,0)";
    if (innerRef.current) innerRef.current.style.transform = "translate(0,0)";
    bounds.current = null;
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`magnetic-wrap ${className}`}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <span
        ref={innerRef}
        style={{
          display: "block",
          transition: "transform .4s cubic-bezier(.23,1,.32,1)",
        }}
      >
        {children}
      </span>
    </div>
  );
};

export default MagneticButton;
