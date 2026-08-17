import { motion } from "motion/react";
import type { ReactNode } from "react";
import { AuroraCanvas } from "./AuroraCanvas";

export function PageHero({
  eyebrow,
  title,
  highlight,
  body,
  children,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  body: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20">
      <AuroraCanvas className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mt-5 text-[clamp(2.3rem,6vw,4rem)] font-semibold"
        >
          {title}{" "}
          {highlight && <span className="text-gradient-warm">{highlight}</span>}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-muted-foreground"
        >
          {body}
        </motion.p>
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
            className="mt-9 flex flex-wrap justify-center gap-3"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
