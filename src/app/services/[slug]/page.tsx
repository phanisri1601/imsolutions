import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceData } from "@/data/servicesData";
import type { ServiceRecord } from "@/data/servicesData";
import ServiceDetailClient from "./ServiceDetailClient";

type Props = {
  params: Promise<{ slug: string }>;
};

function isServiceRecord(value: unknown): value is ServiceRecord {
  if (!value || typeof value !== "object") return false;
  const service = value as Record<string, unknown>;
  const isStringArray = (items: unknown) =>
    Array.isArray(items) && items.every((item) => typeof item === "string");
  const areFaqsValid =
    service.faqs === undefined ||
    (Array.isArray(service.faqs) &&
      service.faqs.every(
        (faq) => {
          if (!faq || typeof faq !== "object") return false;
          const faqRecord = faq as Record<string, unknown>;
          return (
            typeof faqRecord.q === "string" &&
            typeof faqRecord.a === "string"
          );
        }
      ));

  return (
    typeof service.title === "string" &&
    typeof service.description === "string" &&
    typeof service.longDescription === "string" &&
    isStringArray(service.features) &&
    isStringArray(service.benefits) &&
    (service.category === "online" || service.category === "offline") &&
    areFaqsValid
  );
}

function getService(slug: string): ServiceRecord | null {
  const service = serviceData[slug];
  if (service) return service;

  const filePath = path.join(
    process.cwd(),
    "src/data/services",
    `${slug}.json`
  );
  if (!fs.existsSync(filePath)) return null;

  const serviceFromFile: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (!isServiceRecord(serviceFromFile)) {
    throw new TypeError(`Invalid service data for "${slug}" in ${filePath}`);
  }
  return serviceFromFile;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {
      title: "Service not found | IM Solutions",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  return {
    title: `${service.title ?? "Marketing Service"} | IM Solutions`,
    description: service.description,
    alternates: {
      canonical: `/services/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return <ServiceDetailClient slug={slug} service={service} />;
}
