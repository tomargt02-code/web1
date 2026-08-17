import { Cpu, Globe2, Mic2, Waves } from "lucide-react";
import { Reveal } from "./Reveal";

const rows = [
  {
    icon: Mic2,
    label: "Voice-first interface",
    body: "Talk instead of typing — the same session continues across iOS and Android.",
  },
  {
    icon: Cpu,
    label: "Conversational core",
    body: "A context-aware model that tracks your level and rewinds when you stall.",
  },
  {
    icon: Waves,
    label: "Neural speech synthesis",
    body: "Voices with breath and hesitation, streamed as they are generated.",
  },
  {
    icon: Globe2,
    label: "Global edge delivery",
    body: "Sessions run from the region nearest you, around the clock.",
  },
];

export function TechStack() {
  return (
    <section id="tech" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <p className="eyebrow">Under the hood</p>
          <h2 className="mt-4 max-w-xl text-[clamp(2rem,4.6vw,3.25rem)] font-semibold">
            Engineered for the pace of real talk
          </h2>
        </Reveal>

        <div className="mt-14 divide-y divide-border overflow-hidden rounded-3xl border border-border">
          {rows.map((r, i) => (
            <Reveal key={r.label} delay={i * 0.05}>
              <div className="group flex flex-col gap-3 p-7 transition-colors duration-500 hover:bg-secondary/40 sm:flex-row sm:items-center sm:gap-10">
                <div className="flex items-center gap-4 sm:w-72 sm:shrink-0">
                  <span className="grid size-10 place-items-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/20">
                    <r.icon className="size-4.5" />
                  </span>
                  <h3 className="text-base font-semibold">{r.label}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {r.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
