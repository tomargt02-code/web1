import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "Press & media — Lumea" },
      { name: "description", content: "Company information and media resources." },
      { property: "og:title", content: "Press & media — Lumea" },
      { property: "og:description", content: "Company information and media resources." },
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
        <PageHero eyebrow="Press" title="Press & media" body="Company information and media resources." />
      </main>
      <Footer />
    </div>
  );
}
