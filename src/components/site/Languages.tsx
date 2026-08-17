import { Reveal } from "./Reveal";

const languages = [
  { flag: "🇬🇧", name: "English" },
  { flag: "🇫🇷", name: "French" },
  { flag: "🇮🇹", name: "Italian" },
  { flag: "🇵🇹", name: "Portuguese" },
  { flag: "🇩🇪", name: "German" },
  { flag: "🇪🇸", name: "Spanish" },
  { flag: "🇯🇵", name: "Japanese" },
];

export function Languages() {
  const row = [...languages, ...languages];

  return (
    <section id="languages" className="relative overflow-hidden py-20 sm:py-24">
      <Reveal>
        <p className="eyebrow px-5 text-center">
          7 languages · more on the way
        </p>
      </Reveal>

      <div className="mask-fade-x mt-10 flex flex-col gap-4">
        {[0, 1].map((line) => (
          <div key={line} className="flex overflow-hidden">
            <div
              className="animate-marquee flex shrink-0 gap-4 pr-4"
              style={{
                animationDirection: line === 1 ? "reverse" : "normal",
                animationDuration: line === 1 ? "52s" : "42s",
              }}
            >
              {[...row, ...row].map((l, i) => (
                <span
                  key={`${line}-${l.name}-${i}`}
                  className="card-soft flex shrink-0 items-center gap-3 rounded-2xl px-6 py-4"
                >
                  <span className="text-2xl leading-none">{l.flag}</span>
                  <span className="text-sm font-medium whitespace-nowrap">
                    {l.name}
                  </span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
