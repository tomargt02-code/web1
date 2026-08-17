import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Let's talk — Lumea" },
      { name: "description", content: "Tell us about your product and we'll get back to you within one business day." },
      { property: "og:title", content: "Let's talk — Lumea" },
      { property: "og:description", content: "Tell us about your product and we'll get back to you within one business day." },
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
        <PageHero eyebrow="Contact" title="Let's talk" body="Tell us about your product and we'll get back to you within one business day." />
      </main>
      <Footer />
    </div>
  );
}
