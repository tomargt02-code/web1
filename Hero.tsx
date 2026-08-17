import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroPlatform from "@/assets/hero-platform.jpg";
import { AuroraCanvas } from "./AuroraCanvas";

const headline = ["We", "build", "the", "software", "your business runs on."];

export function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const artY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const artScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 lg:pt-44 lg:pb-24"
    >
      <AuroraCanvas className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-80" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-background to-transparent" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <motion.div style={{ y: copyY, opacity: fade }} className="relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            <Sparkles className="size-3.5 text-primary" />
            Product engineering · SaaS · AI systems
          </motion.span>

          <h1 className="mt-6 text-[clamp(2.4rem,6.4vw,4.4rem)] font-semibold">
            {headline.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.25 + i * 0.08,
                }}
                className={`mr-[0.28em] inline-block ${i === 4 ? "text-gradient-warm" : ""}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-muted-foreground"
          >
            Lumea is a senior product engineering studio. We design, build and
            operate SaaS platforms, custom applications and AI-powered systems —
            from first architecture diagram to production traffic.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.82 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_16px_40px_-16px_var(--glow)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Get a Free Demo
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/what-we-do"
              className="inline-flex items-center gap-3 rounded-2xl border border-border bg-secondary/50 px-6 py-3.5 text-sm font-semibold backdrop-blur transition-transform duration-300 hover:-translate-y-0.5"
            >
              <MessageSquare className="size-4 text-accent" />
              See what we do
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-6 text-xs text-muted-foreground"
          >
            40+ platforms shipped · SOC 2-aligned delivery · EU & US time zones
          </motion.p>
        </motion.div>

        <motion.div
          style={{ y: artY, scale: artScale }}
          className="relative mx-auto w-full max-w-[520px]"
        >
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: 4 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="animate-float"
          >
            <div className="absolute inset-x-8 top-16 -z-10 h-72 rounded-full bg-primary/25 blur-[80px]" />
            <img
              src={heroPlatform}
              alt="Lumea-built analytics platform interface rendered as layered glass panels"
              width={1200}
              height={1200}
              className="w-full rounded-[2rem] border border-border shadow-[0_50px_80px_-40px_oklch(0_0_0/0.75)]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
