import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Target, Theater, AudioLines, ListChecks } from "lucide-react";
import { Reveal } from "./Reveal";

const steps = [
  {
    icon: Target,
    title: "Name the outcome",
    body: "Land a job abroad, survive a family dinner, pass an oral exam — tell Lumea what success looks like for you.",
  },
  {
    icon: Theater,
    title: "Pick a situation",
    body: "Salary talks, doctor visits, small talk at a conference. Scenarios you actually walk into, not vocabulary lists.",
  },
  {
    icon: AudioLines,
    title: "Talk it out",
    body: "Sub-second replies, natural pauses, and a partner that slows down the moment you start reaching for words.",
  },
  {
    icon: ListChecks,
    title: "See what to fix",
    body: "A short debrief right after: the two sounds to retrain, the tense you keep dropping, the phrase to reuse tomorrow.",
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timer.current = setInterval(
      () => setActive((a) => (a + 1) % steps.length),
      5200,
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const current = steps[active] ?? steps[0]!;
  const Active = current.icon;

  return (
    <section id="how" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <p className="eyebrow">How it works</p>
          <h2 className="mt-4 max-w-2xl text-[clamp(2rem,4.6vw,3.25rem)] font-semibold">
            Four steps to your first real conversation
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal delay={0.05}>
            <div className="card-soft relative overflow-hidden rounded-3xl p-8 sm:p-10">
              <div className="aurora-blob -top-16 -right-10 size-56 bg-primary/40" />
              <span className="font-display text-sm tracking-[0.3em] text-muted-foreground">
                {String(active + 1).padStart(2, "0")} / 04
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -14, filter: "blur(8px)" }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-6"
                >
                  <span className="grid size-14 place-items-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/25">
                    <Active className="size-6" />
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold">
                    {current.title}
                  </h3>
                  <p className="mt-3 text-[0.975rem] leading-relaxed text-muted-foreground">
                    {current.body}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 flex gap-2">
                {steps.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    aria-label={`Show step ${i + 1}`}
                    onClick={() => setActive(i)}
                    className="group h-1 flex-1 overflow-hidden rounded-full bg-border"
                  >
                    <motion.span
                      className="block h-full rounded-full bg-primary"
                      initial={false}
                      animate={{ width: i === active ? "100%" : i < active ? "100%" : "0%" }}
                      transition={{ duration: i === active ? 5 : 0.4, ease: "linear" }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <ol className="relative space-y-3">
            <span className="absolute top-4 bottom-4 left-[27px] w-px bg-border" />
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={0.06 * i}>
                <li>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={`relative flex w-full gap-5 rounded-2xl border p-5 text-left transition-all duration-500 ${
                      active === i
                        ? "border-primary/35 bg-secondary/70"
                        : "border-transparent hover:bg-secondary/40"
                    }`}
                  >
                    <span
                      className={`relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl font-display text-sm font-semibold transition-colors duration-500 ${
                        active === i
                          ? "bg-primary text-primary-foreground"
                          : "bg-surface-2 text-muted-foreground"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-lg font-semibold">
                        {step.title}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">
                        {step.body}
                      </span>
                    </span>
                  </button>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
