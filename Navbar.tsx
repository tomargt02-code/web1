import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Hexagon } from "lucide-react";
import { Link } from "@tanstack/react-router";

const links = [
  { label: "Who We Are", to: "/who-we-are" },
  { label: "What We Do", to: "/what-we-do" },
  { label: "Products", to: "/products" },
  { label: "Contact", to: "/contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6"
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-5 ${
          scrolled
            ? "glass-panel shadow-[0_24px_60px_-32px_oklch(0_0_0/0.9)]"
            : "border border-transparent bg-transparent"
        }`}
      >
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="relative grid size-9 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
            <Hexagon className="size-4" />
            <span className="absolute inset-0 rounded-xl ring-1 ring-primary/40 [animation:pulse-ring_2.8s_ease-out_infinite]" />
          </span>
          <span className="font-display text-[1.05rem] font-semibold tracking-tight">
            Lumea
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeProps={{ className: "text-foreground" }}
                className="relative rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="hidden rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-12px_var(--glow)] transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
          >
            Get a Free Demo
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-xl border border-border md:hidden"
          >
            <span className="space-y-1.5">
              <span
                className={`block h-px w-5 bg-foreground transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`}
              />
              <span
                className={`block h-px w-5 bg-foreground transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        className={`glass-panel mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl transition-all duration-500 md:hidden ${
          open ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <ul className="p-2">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Get a Free Demo
            </Link>
          </li>
        </ul>
      </div>
    </motion.header>
  );
}
