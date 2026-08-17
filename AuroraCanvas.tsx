import { useEffect, useRef } from "react";

/**
 * Lightweight WebGL-free "aurora field": animated depth layers drawn on a
 * canvas, reacting to pointer position for parallax depth.
 */
export function AuroraCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointer = (e: PointerEvent) => {
      pointer.tx = e.clientX / window.innerWidth;
      pointer.ty = e.clientY / window.innerHeight;
    };

    const blobs = [
      { r: 0.55, hue: "255, 186, 84", sx: 0.28, sy: 0.34, spd: 0.00022, depth: 26 },
      { r: 0.42, hue: "94, 219, 200", sx: 0.74, sy: 0.28, spd: 0.00031, depth: 44 },
      { r: 0.5, hue: "150, 130, 255", sx: 0.52, sy: 0.74, spd: 0.00017, depth: 34 },
    ];

    const draw = (t: number) => {
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (const b of blobs) {
        const phase = reduce ? 0 : t * b.spd;
        const cx =
          w * b.sx +
          Math.cos(phase) * w * 0.07 +
          (pointer.x - 0.5) * b.depth * 2;
        const cy =
          h * b.sy +
          Math.sin(phase * 1.3) * h * 0.09 +
          (pointer.y - 0.5) * b.depth;
        const radius = Math.max(w, h) * b.r * 0.5;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        g.addColorStop(0, `rgba(${b.hue}, 0.30)`);
        g.addColorStop(0.5, `rgba(${b.hue}, 0.09)`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
