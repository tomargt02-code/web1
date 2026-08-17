import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Build with us — Lumea" },
      { name: "description", content: "We hire engineers and designers who care about craft and outcomes." },
      { property: "og:title", content: "Build with us — Lumea" },
      { property: "og:description", content: "We hire engineers and designers who care about craft and outcomes." },
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
        <PageHero eyebrow="Careers" title="Build with us" body="We hire engineers and designers who care about craft and outcomes." />
      </main>
      <Footer />
    </div>
  );
}
