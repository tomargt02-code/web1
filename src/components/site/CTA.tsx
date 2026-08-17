import { ArrowRight, CalendarClock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { AuroraCanvas } from "./AuroraCanvas";

export function CTA() {
  return (
    <section className="relative px-5 py-20 sm:px-6 sm:py-28">
      <Reveal>
        <div className="card-soft relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] px-7 py-16 text-center sm:px-16 sm:py-24">
          <AuroraCanvas className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-[clamp(2rem,4.6vw,3.25rem)] font-semibold">
              Let's build something{" "}
              <span className="text-gradient-warm">great together</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[1.02rem] leading-relaxed text-muted-foreground">
              Tell us what you are building. Within two working days you get a
              senior engineer's read on scope, architecture and timeline — no
              sales script.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_16px_40px_-16px_var(--glow)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Get a Free Demo
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-2xl border border-border bg-secondary/50 px-6 py-3.5 text-sm font-semibold backdrop-blur transition-transform duration-300 hover:-translate-y-0.5"
              >
                <CalendarClock className="size-4 text-accent" />
                Talk to Our Experts
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
