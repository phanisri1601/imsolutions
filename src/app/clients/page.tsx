import ClientsShowcase from "@/components/ClientsShowcase";

export const metadata = {
  title: "Our Clients | IM Solutions",
  description:
    "Brands that trust IM Solutions for advertising, marketing, and digital growth. Explore the clients we partner with across industries.",
};

export default function ClientsPage() {
  return (
    <main>
      <ClientsShowcase />
    </main>
  );
}
