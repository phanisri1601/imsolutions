import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offline Advertising Services",
  description:
    "Explore IM Solutions offline advertising services, including outdoor media, brand activations, transit advertising, and events.",
  alternates: {
    canonical: "/services/offline",
  },
};

export default function OfflineServicesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
