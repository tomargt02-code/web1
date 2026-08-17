import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Our product suite — Lumea" },
      { name: "description", content: "Focused tools we build and operate, from conversational interfaces to delivery platforms." },
      { property: "og:title", content: "Our product suite — Lumea" },
      { property: "og:description", content: "Focused tools we build and operate, from conversational interfaces to delivery platforms." },
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
        <PageHero eyebrow="Products" title="Our product suite" body="Focused tools we build and operate, from conversational interfaces to delivery platforms." />
      </main>
      <Footer />
    </div>
  );
}
