import { useEffect, useRef } from "react";

type V3 = { x: number; y: number; z: number };

/**
 * Persistent "neural core" background: an organic morphing 3D wireframe shell
 * around a glowing core, wired into the page with thin circuit paths carrying
 * light pulses.
 *
 * - one canvas, one rAF loop, mounted once at the app shell level
 * - scroll progress drives a continuous choreography (position / scale / warp)
 * - the pointer acts as a LOCAL force field, not a global translation
 * Canvas 2D only (no 3D framework), reduced-motion aware.
 */
export function NeuralCore({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, strength: 0, ts: 0 };

    // --- geometry: fibonacci sphere shell -------------------------------
    const COUNT = coarse ? 100 : 150;
    const base: V3[] = [];
    for (let i = 0; i < COUNT; i++) {
      const k = i + 0.5;
      const phi = Math.acos(1 - (2 * k) / COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * k;
      base.push({
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi),
      });
    }

    // neighbour edges (each node linked to its nearest successors)
    const edges: [number, number][] = [];
    for (let i = 0; i < COUNT; i++) {
      const d: { j: number; v: number }[] = [];
      for (let j = 0; j < COUNT; j++) {
        if (i === j) continue;
        const a = base[i]!;
        const b = base[j]!;
        d.push({
          j,
          v: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2,
        });
      }
      d.sort((p, q) => p.v - q.v);
      for (let n = 0; n < 3; n++) {
        const j = d[n]!.j;
        if (j > i) edges.push([i, j]);
      }
    }

    // floating particles in a wider halo
    const particles = Array.from({ length: coarse ? 28 : 46 }, () => ({
      a: Math.random() * Math.PI * 2,
      b: Math.random() * Math.PI * 2,
      r: 1.25 + Math.random() * 0.85,
      s: 0.00006 + Math.random() * 0.00018,
      sz: 0.6 + Math.random() * 1.3,
    }));

    // --- circuit network -------------------------------------------------
    // normalized coordinates relative to the core (x right, y down), each path
    // is an orthogonal-ish routed polyline reaching toward page content.
    const circuits: { pts: { x: number; y: number }[]; speed: number; delay: number }[] = [
      { pts: [{ x: 0, y: -0.18 }, { x: 0, y: -0.52 }, { x: -0.34, y: -0.62 }, { x: -0.62, y: -0.62 }], speed: 0.00022, delay: 0 },
      { pts: [{ x: 0, y: -0.18 }, { x: 0.1, y: -0.46 }, { x: 0.1, y: -0.72 }, { x: 0.38, y: -0.86 }], speed: 0.00017, delay: 0.35 },
      { pts: [{ x: 0.18, y: 0 }, { x: 0.48, y: 0 }, { x: 0.62, y: 0.16 }, { x: 0.94, y: 0.16 }], speed: 0.00019, delay: 0.6 },
      { pts: [{ x: -0.18, y: 0.02 }, { x: -0.52, y: 0.02 }, { x: -0.68, y: 0.24 }, { x: -0.98, y: 0.24 }], speed: 0.00015, delay: 0.15 },
      { pts: [{ x: 0, y: 0.18 }, { x: 0, y: 0.56 }, { x: -0.26, y: 0.7 }, { x: -0.26, y: 1.0 }], speed: 0.00021, delay: 0.8 },
      { pts: [{ x: 0.08, y: 0.18 }, { x: 0.3, y: 0.5 }, { x: 0.3, y: 0.78 }, { x: 0.58, y: 0.95 }], speed: 0.00013, delay: 0.45 },
    ];

    // --- scroll choreography ------------------------------------------------
    // keyframes interpolated continuously across total scroll progress (0..1)
    type Frame = { x: number; y: number; scale: number; warp: number; tilt: number };
    const frames: Frame[] = [
      { x: 0.0, y: -0.02, scale: 1.0, warp: 1.0, tilt: 0.0 }, // hero
      { x: 0.16, y: 0.0, scale: 0.9, warp: 1.15, tilt: 0.12 }, // manifesto
      { x: -0.2, y: 0.02, scale: 1.05, warp: 0.85, tilt: -0.14 }, // how it works
      { x: 0.2, y: -0.01, scale: 0.95, warp: 1.3, tilt: 0.18 }, // signature
      { x: 0.0, y: 0.0, scale: 1.15, warp: 1.0, tilt: 0.0 }, // bento
      { x: -0.14, y: 0.01, scale: 1.0, warp: 1.1, tilt: -0.1 }, // languages / tech
      { x: 0.0, y: -0.02, scale: 1.2, warp: 0.9, tilt: 0.06 }, // cta / footer
    ];
    const cur: Frame = { ...frames[0]! };
    let scrollP = 0;

    const readScroll = () => {
      const max = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      scrollP = Math.min(Math.max(window.scrollY / max, 0), 1);
    };

    const sampleFrames = (p: number): Frame => {
      const seg = p * (frames.length - 1);
      const i = Math.min(Math.floor(seg), frames.length - 2);
      const raw = seg - i;
      const f = raw * raw * (3 - 2 * raw); // smoothstep
      const a = frames[i]!;
      const b = frames[i + 1]!;
      return {
        x: a.x + (b.x - a.x) * f,
        y: a.y + (b.y - a.y) * f,
        scale: a.scale + (b.scale - a.scale) * f,
        warp: a.warp + (b.warp - a.warp) * f,
        tilt: a.tilt + (b.tilt - a.tilt) * f,
      };
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointer = (e: PointerEvent) => {
      pointer.tx = e.clientX;
      pointer.ty = e.clientY;
      pointer.ts = performance.now();
      if (pointer.x < -1000) {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
      }
    };
    const onLeave = () => {
      pointer.ts = 0;
    };

    // cheap value noise for organic deformation
    const wobble = (p: V3, t: number, warp: number) =>
      1 +
      warp *
        (0.14 * Math.sin(p.x * 2.6 + t * 0.0007) +
          0.12 * Math.sin(p.y * 3.1 - t * 0.00055) +
          0.1 * Math.sin(p.z * 2.2 + t * 0.00042));

    const draw = (time: number) => {
      const t = reduce ? 0 : time;

      // eased scroll choreography
      const target = sampleFrames(scrollP);
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      cur.scale += (target.scale - cur.scale) * 0.06;
      cur.warp += (target.warp - cur.warp) * 0.06;
      cur.tilt += (target.tilt - cur.tilt) * 0.06;

      // pointer easing + presence (decays when idle / off-window / touch)
      const active = !coarse && !reduce && pointer.ts > 0 && time - pointer.ts < 2200;
      pointer.strength += ((active ? 1 : 0) - pointer.strength) * 0.05;
      if (pointer.tx > -1000) {
        pointer.x += (pointer.tx - pointer.x) * 0.12;
        pointer.y += (pointer.ty - pointer.y) * 0.12;
      }

      ctx.clearRect(0, 0, w, h);

      const scale = Math.min(w, h);
      const cx = w * 0.5 + cur.x * w * 0.5;
      const cy = h * 0.5 + cur.y * h;
      const R = Math.min(w, h) * 0.3 * cur.scale;

      // slow autonomous rotation only (never follows the cursor globally)
      const ry = t * 0.00009 + cur.x * 0.6;
      const rx = Math.sin(t * 0.00007) * 0.22 + cur.tilt;
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const cosX = Math.cos(rx), sinX = Math.sin(rx);

      // local force field radius, in px
      const FR = Math.min(w, h) * 0.26;

      const proj = base.map((p) => {
        const k = wobble(p, t, cur.warp);
        let x = p.x * k, y = p.y * k, z = p.z * k;
        // yaw
        const nx = x * cosY + z * sinY;
        let nz = -x * sinY + z * cosY;
        x = nx; z = nz;
        // pitch
        const ny = y * cosX - z * sinX;
        nz = y * sinX + z * cosX;
        y = ny; z = nz;
        const persp = 1 / (1 + z * 0.34);
        let sx = cx + x * R * persp;
        let sy = cy + y * R * persp;

        // localized cursor deformation: falloff-weighted attraction
        let force = 0;
        if (pointer.strength > 0.01) {
          const dx = pointer.x - sx;
          const dy = pointer.y - sy;
          const d = Math.hypot(dx, dy);
          if (d < FR) {
            const f = (1 - d / FR) ** 2 * pointer.strength;
            force = f;
            sx += dx * f * 0.34;
            sy += dy * f * 0.34;
          }
        }
        return { sx, sy, z, persp, force };
      });

      // --- circuit paths ---------------------------------------------------
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (const c of circuits) {
        const pts = c.pts.map((p) => ({
          x: cx + p.x * scale * cur.scale,
          y: cy + p.y * scale * cur.scale,
        }));

        ctx.beginPath();
        ctx.moveTo(pts[0]!.x, pts[0]!.y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i]!.x, pts[i]!.y);
        ctx.strokeStyle = "rgba(150, 130, 255, 0.16)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // junction dots
        for (let i = 1; i < pts.length; i++) {
          ctx.beginPath();
          ctx.arc(pts[i]!.x, pts[i]!.y, 1.6, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(160, 145, 255, 0.34)";
          ctx.fill();
        }

        // travelling pulse
        const segLens: number[] = [];
        let total = 0;
        for (let i = 1; i < pts.length; i++) {
          const l = Math.hypot(pts[i]!.x - pts[i - 1]!.x, pts[i]!.y - pts[i - 1]!.y);
          segLens.push(l);
          total += l;
        }
        const prog = reduce ? 0.5 : ((t * c.speed + c.delay) % 1);
        let dist = prog * total;
        let seg = 0;
        while (seg < segLens.length - 1 && dist > segLens[seg]!) {
          dist -= segLens[seg]!;
          seg++;
        }
        const a = pts[seg]!, b = pts[seg + 1]!;
        const f = segLens[seg] ? dist / segLens[seg]! : 0;
        const hx = a.x + (b.x - a.x) * f;
        const hy = a.y + (b.y - a.y) * f;

        const tail = ctx.createRadialGradient(hx, hy, 0, hx, hy, 26);
        tail.addColorStop(0, "rgba(186, 170, 255, 0.55)");
        tail.addColorStop(1, "rgba(150, 130, 255, 0)");
        ctx.fillStyle = tail;
        ctx.beginPath();
        ctx.arc(hx, hy, 26, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(hx, hy, 1.9, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(226, 218, 255, 0.9)";
        ctx.fill();
      }

      // --- wireframe shell --------------------------------------------------
      ctx.globalCompositeOperation = "lighter";
      for (const [i, j] of edges) {
        const a = proj[i]!, b = proj[j]!;
        const depth = (a.z + b.z) * 0.5;
        const local = (a.force + b.force) * 0.5;
        const alpha = 0.055 + (1 - (depth + 1) / 2) * 0.16 + local * 0.3;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.strokeStyle = `rgba(158, 138, 255, ${alpha})`;
        ctx.lineWidth = (depth < 0 ? 0.9 : 0.55) + local * 0.5;
        ctx.stroke();
      }

      for (const p of proj) {
        const alpha = 0.12 + (1 - (p.z + 1) / 2) * 0.4 + p.force * 0.4;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, (0.9 + p.force * 1.1) * p.persp, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196, 184, 255, ${alpha})`;
        ctx.fill();
      }

      // --- halo particles ----------------------------------------------------
      for (const p of particles) {
        const a = p.a + t * p.s;
        const b = p.b + t * p.s * 0.6;
        const x = Math.cos(a) * Math.sin(b) * p.r;
        const y = Math.sin(a) * Math.sin(b) * p.r;
        const z = Math.cos(b) * p.r;
        const persp = 1 / (1 + z * 0.3);
        let sx = cx + x * R * persp;
        let sy = cy + y * R * persp;
        let force = 0;
        if (pointer.strength > 0.01) {
          const dx = pointer.x - sx;
          const dy = pointer.y - sy;
          const d = Math.hypot(dx, dy);
          if (d < FR) {
            force = (1 - d / FR) ** 2 * pointer.strength;
            sx += dx * force * 0.2;
            sy += dy * force * 0.2;
          }
        }
        ctx.beginPath();
        ctx.arc(sx, sy, p.sz * persp * (1 + force * 0.6), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(190, 200, 255, ${0.1 + persp * 0.22 + force * 0.25})`;
        ctx.fill();
      }

      // --- glowing core -------------------------------------------------------
      const pulse = reduce ? 1 : 1 + Math.sin(t * 0.0013) * 0.06;
      const coreR = R * 0.42 * pulse;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      g.addColorStop(0, "rgba(198, 186, 255, 0.34)");
      g.addColorStop(0.22, "rgba(150, 120, 255, 0.32)");
      g.addColorStop(0.6, "rgba(110, 86, 220, 0.12)");
      g.addColorStop(1, "rgba(80, 60, 190, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.035 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(214, 200, 255, 0.4)";
      ctx.fill();

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };

    resize();
    readScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", readScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
