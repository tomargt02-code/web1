import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie policy — Lumea" },
      { name: "description", content: "How cookies and similar technologies are used on this site." },
      { property: "og:title", content: "Cookie policy — Lumea" },
      { property: "og:description", content: "How cookies and similar technologies are used on this site." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <PageHero eyebrow="Cookies" title="Cookie policy" body="How cookies and similar technologies are used on this site." />
      </main>
      <Footer />
    </div>
  );
}
