import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Manifesto } from "@/components/site/Manifesto";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Signature } from "@/components/site/Signature";
import { Bento } from "@/components/site/Bento";
import { Languages } from "@/components/site/Languages";
import { TechStack } from "@/components/site/TechStack";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";
import { CircuitFrame } from "@/components/site/CircuitFrame";

const title = "Lumea — Practise speaking with an AI language tutor";
const description =
  "Lumea is a voice-first AI tutor: real conversation from day one, live pronunciation tracking, plain-language grammar fixes and a personal dictionary. 7 languages.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <CircuitFrame>
          <Manifesto />
        </CircuitFrame>
        <HowItWorks />
        <Signature />
        <CircuitFrame>
          <Bento />
        </CircuitFrame>
        <Languages />
        <TechStack />
        <CircuitFrame>
          <CTA />
        </CircuitFrame>
      </main>
      <Footer />
    </div>
  );
}
