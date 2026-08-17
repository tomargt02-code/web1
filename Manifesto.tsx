import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const text =
  "Software is not a deliverable, it is an operating asset. We build systems that stay fast under load, cheap to change, and honest about what they do — long after the launch post.";

export function Manifesto() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.4"],
  });
  const words = text.split(" ");

  return (
    <section className="relative py-24 sm:py-32">
      <div ref={ref} className="mx-auto max-w-4xl px-5 sm:px-6">
        <p className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-1 text-center font-display text-[clamp(1.5rem,3.6vw,2.5rem)] leading-[1.25] font-medium">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return <Word key={`${word}-${i}`} range={[start, end]} progress={scrollYProgress}>{word}</Word>;
          })}
        </p>
      </div>
    </section>
  );
}

function Word({
  children,
  range,
  progress,
}: {
  children: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  );
}
