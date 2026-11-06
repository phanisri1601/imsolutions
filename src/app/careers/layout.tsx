import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at IM Solutions",
  description:
    "Explore career opportunities at IM Solutions and learn about current roles across strategy, creative, marketing, and technology.",
  alternates: {
    canonical: "/careers",
  },
};

export default function CareersLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
