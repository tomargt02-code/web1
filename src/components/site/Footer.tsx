import { Hexagon, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";

const groups = [
  {
    title: "Company",
    links: [
      { label: "Who We Are", to: "/who-we-are" },
      { label: "What We Do", to: "/what-we-do" },
      { label: "Products", to: "/products" },
      { label: "Careers", to: "/careers" },
      { label: "Press", to: "/press" },
    ],
  },
  {
    title: "Resources & Legal",
    links: [
      { label: "Security", to: "/security" },
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
      { label: "Cookies", to: "/cookies" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Get a Free Demo", to: "/contact" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border px-5 pt-16 pb-10 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.4fr_2fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
              <Hexagon className="size-4" />
            </span>
            <span className="font-display text-lg font-semibold">Lumea</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            A product engineering company building SaaS platforms, custom
            software and AI-powered systems for teams that need them to work at
            scale.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 text-primary" /> hello@lumea.dev
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 text-primary" /> +1 (415) 555-0142
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="size-4 text-primary" /> Remote-first · EU & US
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {groups.map((g) => (
            <div key={g.title}>
              <h3 className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                {g.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Lumea Labs. All rights reserved.</p>
        <p>Software engineered to outlive the roadmap that started it.</p>
      </div>
    </footer>
  );
}
