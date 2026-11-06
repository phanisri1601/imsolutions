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
import FeatureServices from "@/components/FeatureServices";
import Services from "@/components/Services";
import { blogPosts } from "@/data/blogPosts";
import type { Metadata } from "next";

const gridLeadSlug = "top-seo-trends-2026-what-businesses-need-to-prepare-for";
const featuredPosts = blogPosts
  .filter((p) => (p.page ?? 1) === 1 && p.slug !== gridLeadSlug)
  .slice(0, 3);

export const metadata: Metadata = {
  title: "Integrated Marketing & Advertising Agency in Bangalore",
  description:
    "IM Solutions is an integrated marketing and advertising agency in Bangalore, offering SEO, digital marketing, branding, AI advertising and creative solutions.",
  alternates: {
    canonical: "/",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.imsolutions.co/#organization",
  name: "IM Solutions",
  url: "https://www.imsolutions.co/",
  logo: "https://www.imsolutions.co/weblogo.png",
  foundingDate: "2013",
  description:
    "IM Solutions is an integrated marketing and advertising agency based in Bangalore, India. Established in 2013, the company provides digital marketing, SEO, paid advertising, branding, creative strategy, AI advertising, and offline advertising solutions.",
};

export default function Home() {
  return (
    <main style={{ backgroundColor: "#F8F4F0", paddingBottom: "3rem" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <VideoSection />
      <PhilosophySection />
      <IMSystemSection />
      <WhyIMSolutions />
      <FeatureServices />
      <EditorialBlogGallery posts={featuredPosts} contained />
      <CareerSection />
      <PartnersSection />
      <FAQ variant="plain" includeSchema />
    </main>
  );
}
