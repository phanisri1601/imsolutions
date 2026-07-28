import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import PhilosophySection from "@/components/PhilosophySection";
import IMSystemSection from "@/components/IMSystemSection";
import WhyIMSolutions from "@/components/WhyIMSolutions";
import EditorialBlogGallery from "./blog/EditorialBlogGallery";
import CareerSection from "@/components/CareerSection";
import PartnersSection from "@/components/PartnersSection";

import Clients from "@/components/Clients";
import FAQ from "@/components/FAQ";
import { blogPosts } from "@/data/blogPosts";

const gridLeadSlug = "top-seo-trends-2026-what-businesses-need-to-prepare-for";
const featuredPosts = blogPosts
  .filter((p) => (p.page ?? 1) === 1 && p.slug !== gridLeadSlug)
  .slice(0, 3);

export default function Home() {
  return (
    <main style={{ backgroundColor: "#F8F4F0" }}>
      <Hero />
      <VideoSection />
      <PhilosophySection />
      <IMSystemSection />
      <WhyIMSolutions />
      <EditorialBlogGallery posts={featuredPosts} contained />
      <CareerSection />
      <PartnersSection />
      <FAQ variant="plain" />
    </main>
  );
}
