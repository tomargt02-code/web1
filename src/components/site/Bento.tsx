import {
  AudioLines,
  BookMarked,
  FileText,
  Flame,
  History,
  Users,
} from "lucide-react";
import { Reveal } from "./Reveal";

const cells = [
  {
    icon: AudioLines,
    title: "Voice-first conversations",
    body: "Replies land in well under a second, so the rhythm never breaks.",
    span: "sm:col-span-2",
  },
  {
    icon: FileText,
    title: "Session recap",
    body: "Grammar, sounds and new words — one short page, no quiz.",
    span: "",
  },
  {
    icon: Users,
    title: "Role-play scripts",
    body: "Interviews, stand-ups, landlords, customs officers.",
    span: "",
  },
  {
    icon: Flame,
    title: "Gentle streaks",
    body: "Seven-day rhythm that nudges instead of nagging.",
    span: "",
  },
  {
    icon: History,
    title: "Every talk saved",
    body: "Scroll back and replay any conversation, word for word.",
    span: "",
  },
  {
    icon: BookMarked,
    title: "Personal dictionary",
    body: "Tapped, saved, reviewed — your own vocabulary trail.",
    span: "sm:col-span-2",
  },
];

export function Bento() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <h2 className="max-w-2xl text-[clamp(2rem,4.6vw,3.25rem)] font-semibold">
            Everything you need to sound{" "}
            <span className="text-gradient-warm">like yourself</span> in another
            language
          </h2>
        </Reveal>

        <div className="mt-14 grid auto-rows-[minmax(190px,auto)] gap-4 sm:grid-cols-4">
          {cells.map((cell, i) => (
            <Reveal key={cell.title} delay={i * 0.05} className={`h-full ${cell.span}`}>
              <article className="card-soft group relative h-full overflow-hidden rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1.5">
                <div className="aurora-blob -top-20 -right-16 size-48 bg-accent/30 opacity-0 transition-opacity duration-700 group-hover:opacity-60" />
                <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary ring-1 ring-border">
                  <cell.icon className="size-5" />
                </span>
                <h3 className="mt-6 text-lg font-semibold">{cell.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {cell.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
