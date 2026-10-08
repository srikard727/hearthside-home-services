import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <PlaceholderPage
      eyebrow="Our services"
      title="Home help is on the way."
      description="Our service catalog will live here. Soon, customers will be able to compare repair and maintenance options before booking."
    />
  );
}
