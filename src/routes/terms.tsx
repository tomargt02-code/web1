import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of service — Lumea" },
      { name: "description", content: "The terms that govern the use of our website and services." },
      { property: "og:title", content: "Terms of service — Lumea" },
      { property: "og:description", content: "The terms that govern the use of our website and services." },
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
        <PageHero eyebrow="Terms" title="Terms of service" body="The terms that govern the use of our website and services." />
      </main>
      <Footer />
    </div>
  );
}
