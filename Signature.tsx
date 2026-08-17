import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Check, Star } from "lucide-react";
import { Reveal } from "./Reveal";
import pronunciation from "@/assets/feature-pronunciation.jpg";
import grammar from "@/assets/feature-grammar.jpg";
import translate from "@/assets/feature-translate.jpg";

const blocks = [
  {
    tag: "Only in Lumea",
    title: "Pronunciation you can\u00a0watch",
    body: "Read a passage out loud and the words light up as you land them. The ones you smudged stay dim until you try again.",
    bullets: [
      "Word-level tracking while you speak",
      "Shows the exact sounds you skipped",
      "Repeat until the whole line glows",
    ],
    img: pronunciation,
    alt: "Pronunciation practice screen with words highlighted as they are spoken",
  },
  {
    title: "Grammar that explains\u00a0itself",
    body: "After each session Lumea gathers your slips and puts the fix next to the reason — written like a friend would say it.",
    bullets: [
      "Corrections drawn from your own sentences",
      "One plain-language reason per mistake",
      "Everything saved in your session recap",
    ],
    img: grammar,
    alt: "Grammar feedback screen listing corrections and short explanations",
  },
  {
    title: "Tap a word, keep it\u00a0for good",
    body: "Stuck mid-sentence? Tap the word. Meaning, phonetics and audio land instantly, and one more tap files it in your deck.",
    bullets: [
      "Translation without leaving the chat",
      "Native audio for every entry",
      "Saved words become your review deck",
    ],
    img: translate,
    alt: "Conversation screen with a tapped word showing translation and audio",
  },
];

export function Signature() {
  return (
    <section id="features" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <p className="eyebrow">Signature features</p>
          <h2 className="mt-4 max-w-2xl text-[clamp(2rem,4.6vw,3.25rem)] font-semibold">
            The parts other apps quietly skip
          </h2>
        </Reveal>

        <div className="mt-20 space-y-28 sm:space-y-36">
          {blocks.map((b, i) => (
            <Block key={b.title} block={b} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Block({
  block,
  flip,
}: {
  block: (typeof blocks)[number];
  flip: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const rotate = useTransform(scrollYProgress, [0, 1], [flip ? 4 : -4, flip ? -3 : 3]);

  return (
    <div
      ref={ref}
      className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
    >
      <div className={flip ? "lg:order-2" : ""}>
        <Reveal>
          {block.tag && (
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.2em] text-primary uppercase">
              <Star className="size-3 fill-primary" />
              {block.tag}
            </span>
          )}
          <h3 className="mt-5 text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold">
            {block.title}
          </h3>
          <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-muted-foreground">
            {block.body}
          </p>
          <ul className="mt-7 space-y-3">
            {block.bullets.map((bl) => (
              <li key={bl} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                  <Check className="size-3" />
                </span>
                <span className="text-muted-foreground">{bl}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <motion.div
        style={{ y, rotate }}
        className={`relative mx-auto w-full max-w-[340px] ${flip ? "lg:order-1" : ""}`}
      >
        <div className="absolute inset-6 -z-10 rounded-[3rem] bg-accent/20 blur-[70px]" />
        <div className="card-soft overflow-hidden rounded-[2.5rem] p-2">
          <img
            src={block.img}
            alt={block.alt}
            loading="lazy"
            width={912}
            height={1200}
            className="w-full rounded-[2rem]"
          />
        </div>
      </motion.div>
    </div>
  );
}
