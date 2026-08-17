import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/what-we-do")({
  head: () => ({
    meta: [
      { title: "Design, engineering, delivery — Lumea" },
      { name: "description", content: "End-to-end product work: strategy, interface design, and production engineering." },
      { property: "og:title", content: "Design, engineering, delivery — Lumea" },
      { property: "og:description", content: "End-to-end product work: strategy, interface design, and production engineering." },
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
        <PageHero eyebrow="What We Do" title="Design, engineering, delivery" body="End-to-end product work: strategy, interface design, and production engineering." />
      </main>
      <Footer />
    </div>
  );
}
