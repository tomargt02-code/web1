import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security — Lumea" },
      { name: "description", content: "Our approach to protecting data and systems." },
      { property: "og:title", content: "Security — Lumea" },
      { property: "og:description", content: "Our approach to protecting data and systems." },
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
        <PageHero eyebrow="Security" title="Security" body="Our approach to protecting data and systems." />
      </main>
      <Footer />
    </div>
  );
}
