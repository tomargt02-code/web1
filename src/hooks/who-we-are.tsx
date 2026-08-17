import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/who-we-are")({
  head: () => ({
    meta: [
      { title: "The team behind Lumea — Lumea" },
      { name: "description", content: "A product engineering studio building software that businesses run on." },
      { property: "og:title", content: "The team behind Lumea — Lumea" },
      { property: "og:description", content: "A product engineering studio building software that businesses run on." },
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
        <PageHero eyebrow="Who We Are" title="The team behind Lumea" body="A product engineering studio building software that businesses run on." />
      </main>
      <Footer />
    </div>
  );
}
