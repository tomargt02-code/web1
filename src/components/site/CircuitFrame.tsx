import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * Scroll-revealed technical frame: a thin circuit-style border that is drawn
 * progressively as the section travels through the viewport, plus short
 * connector traces linking the content up/down toward the central background
 * system. Purely decorative — never intercepts pointer events.
 */
export function CircuitFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const draw = useTransform(scrollYProgress, [0, 0.28, 0.5, 0.78, 1], [0, 1, 1, 1, 0.15]);
  const glow = useTransform(scrollYProgress, [0.1, 0.4, 0.7, 0.95], [0, 0.55, 0.55, 0]);
  const connector = useTransform(scrollYProgress, [0.05, 0.35], [0, 1]);

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      <svg
        aria-hidden
        className="pointer-events-none absolute -inset-x-3 -inset-y-6 h-[calc(100%+3rem)] w-[calc(100%+1.5rem)]"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <motion.rect
          x="1"
          y="4"
          width="98"
          height="92"
          rx="1.2"
          fill="none"
          stroke="rgba(158,138,255,0.34)"
          strokeWidth="0.16"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: draw, opacity: glow }}
        />
        {/* connectors reaching toward the central background system */}
        <motion.path
          d="M 50 4 L 50 0"
          stroke="rgba(158,138,255,0.4)"
          strokeWidth="0.16"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: connector, opacity: glow }}
        />
        <motion.path
          d="M 50 96 L 50 100"
          stroke="rgba(158,138,255,0.4)"
          strokeWidth="0.16"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: connector, opacity: glow }}
        />
        <motion.circle cx="50" cy="4" r="0.5" fill="rgba(198,186,255,0.8)" style={{ opacity: glow }} />
        <motion.circle cx="50" cy="96" r="0.5" fill="rgba(198,186,255,0.8)" style={{ opacity: glow }} />
      </svg>
      {children}
    </div>
  );
}
