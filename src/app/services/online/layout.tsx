import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Marketing Services",
  description:
    "Explore IM Solutions online marketing services, including search, social media, creative, and technology solutions.",
  alternates: {
    canonical: "/services/online",
  },
};

export default function OnlineServicesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
