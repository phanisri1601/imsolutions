import AboutHero from "@/components/AboutHero";
import AboutSection from "@/components/AboutSection";
import FeaturesCards from "@/components/FeaturesCards";
import MissionVision from "@/components/MissionVision";
import FAQ from "@/components/FAQ";
import { aboutImage } from "@/lib/aboutImages";

const aboutFaqs = [
  {
    question: "What does IM Solutions do?",
    answer:
      "IM Solutions is a full-service branding, advertising, digital marketing, and technology agency based in Bangalore. We help businesses build strong brand identities, grow their online presence, and achieve measurable results through strategy, creativity, and innovation.",
  },
  {
    question: "How long has IM Solutions been in the industry?",
    answer:
      "With over 7 years of experience and 300+ satisfied clients across diverse industries, IM Solutions has established itself as one of the most trusted marketing and advertising agencies in Bangalore.",
  },
  {
    question: "What industries does IM Solutions serve?",
    answer:
      "We work with businesses across real estate, healthcare, education, hospitality, e-commerce, technology, retail, finance, and many more sectors — delivering tailored strategies for each industry's unique challenges.",
  },
  {
    question: "What makes IM Solutions different from other agencies?",
    answer:
      "Our 360° approach combines online and offline marketing under one roof. From SEO and social media to hoardings and event management, we deliver integrated campaigns that drive both brand awareness and lead generation.",
  },
  {
    question: "Does IM Solutions offer both online and offline marketing?",
    answer:
      "Yes. We provide a comprehensive suite of online services (SEO, SEM, social media, web development, app development) alongside offline services (bus branding, hoarding, BTL activation, event management, corporate training, and more).",
  },
  {
    question: "Where is IM Solutions located?",
    answer:
      "Our head office is located in Bangalore, Karnataka, India. We serve clients across India and internationally, adapting our strategies to local and global markets.",
  },
];

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
      <FAQ title="ABOUT IM SOLUTIONS — FAQ's" items={aboutFaqs} variant="plain" />
    </main>
  );
}
