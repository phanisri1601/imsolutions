import AboutHero from "@/components/AboutHero";
import AboutSection from "@/components/AboutSection";
import FeaturesCards from "@/components/FeaturesCards";
import MissionVision from "@/components/MissionVision";
import { aboutImage } from "@/lib/aboutImages";

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutSection
        eyebrow="ABOUT"
        title="IM SOLUTIONS"
        subtitle="Every extraordinary brand begins with a belief."
        imageSrc={aboutImage("aboutt.jpeg")}
        description={[
          "A belief that it can inspire, influence, and leave an enduring mark.",
         "At IM Solutions, we bring that belief to life through the perfect harmony of strategy, creativity, technology, and innovation. As a full-service branding, advertising, digital marketing, and technology agency, we help ambitious businesses become brands that people recognise, remember, and trust. Every identity we design, every website we develop, every story we tell, and every campaign we launch is guided by one purposeto create meaningful growth with measurable impact. Markets evolve, technologies change, and consumer expectations shift, which is why we continuously adapt our approach to help brands stay relevant, competitive, and built for long-term success.",
          "But brands built with purpose never lose their relevance.",
          "That is the future we buildevery single day.",
        ]}
      />
      <FeaturesCards />
      <MissionVision />
    </main>
  );
}
