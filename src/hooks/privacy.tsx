import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy — Lumea" },
      { name: "description", content: "How we collect, use, and protect information." },
      { property: "og:title", content: "Privacy policy — Lumea" },
      { property: "og:description", content: "How we collect, use, and protect information." },
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
        <PageHero eyebrow="Privacy" title="Privacy policy" body="How we collect, use, and protect information." />
      </main>
      <Footer />
    </div>
  );
}
